import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./TicketList.module.scss";
import AviasalesService from "../../services/AviasalesService";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const aviasalesService = new AviasalesService();

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { stops } = useSelector((state) => state.filters);
  const activeTab = useSelector((state) => state.tabs.activeTab);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await aviasalesService.fetchTickets();
        if (Array.isArray(data)) {
          setTickets(data);
        } else {
          throw new Error("Полученные данные не являются массивом");
        }
      } catch (err) {
        console.error("Ошибка при получении билетов:", err);
        setError(err.message || "Произошла ошибка при загрузке билетов");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    if (stops.allChecked) return true;
    if (stops.noStops && ticket.stopsA === 0 && ticket.stopsB === 0)
      return true;
    if (stops.oneStop && (ticket.stopsA === 1 || ticket.stopsB === 1))
      return true;
    if (stops.twoStops && (ticket.stopsA === 2 || ticket.stopsB === 2))
      return true;
    if (stops.threeStops && (ticket.stopsA === 3 || ticket.stopsB === 3))
      return true;
    return false;
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (activeTab === "cheap") {
      return a.price - b.price;
    } else if (activeTab === "fast") {
      const totalA = (a.durationL1 || 0) + (a.durationL2 || 0);
      const totalB = (b.durationL1 || 0) + (b.durationL2 || 0);
      return totalA - totalB;
    }
    return 0;
  });

  const displayedTickets = sortedTickets.slice(0, visibleCount);
  const noTicketsFound = !loading && !error && filteredTickets.length === 0;

  return (
    <div>
      {loading ? (
        <>
          {" "}
          <div className={styles.loader}>
            <div>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
              />
            </div>
            <br />
            Загрузка билетов...
          </div>
        </>
      ) : error ? (
        <div className={styles.error}>
          <h3>Произошла ошибка</h3>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Попробовать снова
          </button>
        </div>
      ) : noTicketsFound ? (
        <div className={styles.noTicketsMessage}>
          Рейсов, подходящих под заданные фильтры, не найдено
        </div>
      ) : (
        <>
          {displayedTickets.map((item, index) => (
            <div key={index} className={styles.ticket}>
              <div className={styles.priceImg}>
                <div className={styles.price}>
                  {item.price.toLocaleString()} ₽
                </div>
                <div>
                  <img
                    className="image"
                    src={`http://pics.avs.io/100/36/${item.carrier}.png`}
                    alt={item.carrier}
                  />
                </div>
              </div>
              <div className={styles.departure}>
                <div className={styles.tyty}>
                  <div>
                    {item.departureA} – {item.departureB}
                  </div>
                  <div>
                    {item.dataA} – {item.arrivalA}
                  </div>
                </div>
                <div className={styles.tyty}>
                  <div>В пути</div>
                  <div>{item.durationAF}</div>
                </div>
                <div className={styles.tyty}>
                  {item.stopsA === 0 ? (
                    <>
                      <div>без пересадок</div>
                      <div>прямой рейс</div>
                    </>
                  ) : item.stopsA === 1 ? (
                    <div>1 пересадка</div>
                  ) : item.stopsA === 2 ? (
                    <div>2 пересадки</div>
                  ) : (
                    <div>3 пересадки</div>
                  )}
                </div>
              </div>
              <div className={styles.departure}>
                <div className={styles.tyty}>
                  <div>
                    {item.departureB} – {item.departureA}
                  </div>
                  <div>
                    {item.dataB} – {item.arrivalB}
                  </div>
                </div>
                <div className={styles.tyty}>
                  <div>В пути</div>
                  <div>{item.durationBF}</div>
                </div>
                <div className={styles.tyty}>
                  {item.stopsB === 0 ? (
                    <>
                      <div>без пересадок</div>
                      <div>прямой рейс</div>
                    </>
                  ) : item.stopsB === 1 ? (
                    <div>1 пересадка</div>
                  ) : item.stopsB === 2 ? (
                    <div>2 пересадки</div>
                  ) : (
                    <div>3 пересадки</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {visibleCount < filteredTickets.length && (
            <button
              className={styles.bigButton}
              onClick={() => setVisibleCount((prev) => prev + 5)}
            >
              Показать еще 5 билетов!
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TicketList;
