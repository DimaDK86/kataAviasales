import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./TicketList.module.scss";
// import AviasalesService from "../../services/AviasalesService";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Ticket from "../tiket/Tiket";
import { fetchTickets } from "../helpers/aviasalesApi";

// const aviasalesService = new AviasalesService();

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { stops } = useSelector((state) => state.filters);
  const activeTab = useSelector((state) => state.tabs.activeTab);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTickets();
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

    loadTickets();
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
    if (activeTab === "cheap") return a.price - b.price;
    if (activeTab === "fast") {
      const totalA = (a.durationL1 || 0) + (a.durationL2 || 0);
      const totalB = (b.durationL1 || 0) + (b.durationL2 || 0);
      return totalA - totalB;
    }
    return 0;
  });

  const displayedTickets = sortedTickets.slice(0, visibleCount);
  const noTicketsFound = !loading && !error && filteredTickets.length === 0;
  const hasTicketsToShow = !loading && !error && filteredTickets.length > 0;

  const loadMoreTickets = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className={styles.ticketList}>
      {loading && (
        <div className={styles.loader}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
          <br />
          Загрузка билетов...
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <h3>Произошла ошибка</h3>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Попробовать снова
          </button>
        </div>
      )}

      {noTicketsFound && (
        <div className={styles.noTicketsMessage}>
          Рейсов, подходящих под заданные фильтры, не найдено
        </div>
      )}

      {hasTicketsToShow && (
        <>
          {displayedTickets.map((ticket) => (
            <Ticket key={`${ticket.price}-${ticket.carrier}`} ticket={ticket} />
          ))}

          {visibleCount < filteredTickets.length && (
            <button className={styles.bigButton} onClick={loadMoreTickets}>
              Показать еще 5 билетов!
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TicketList;
