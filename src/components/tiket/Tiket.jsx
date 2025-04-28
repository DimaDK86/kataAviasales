import React from "react";
import styles from "./TicketList.module.scss";

const TicketSegment = ({ segment, direction }) => {
  const {
    departure,
    arrival,
    date,
    duration,
    stopsCount,
    segment: segmentInfo,
    arrivalTime,
  } = segment;

  const stopsText = () => {
    switch (stopsCount) {
      case 0:
        return "без пересадок";
      case 1:
        return "1 пересадка";
      case 2:
        return "2 пересадки";
      case 3:
        return "3 пересадки";
      default:
        return `${stopsCount} пересадок`;
    }
  };

  return (
    <div className={styles.departure}>
      <div className={styles.tyty}>
        <div>
          {departure} – {arrival}
        </div>
        <div>
          {date} – {arrivalTime}
        </div>
      </div>
      <div className={styles.tyty}>
        <div>В пути</div>
        <div>{duration}</div>
      </div>
      <div className={styles.tyty}>
        <div>{stopsText()}</div>
        <div>{stopsCount === 0 ? "прямой рейс" : segmentInfo}</div>
      </div>
    </div>
  );
};

const Ticket = ({ ticket }) => {
  return (
    <div className={styles.ticket}>
      <div className={styles.priceImg}>
        <div className={styles.price}>{ticket.price.toLocaleString()} ₽</div>
        <img
          className={styles.carrierLogo}
          src={`http://pics.avs.io/100/36/${ticket.carrier}.png`}
          alt={ticket.carrier}
        />
      </div>

      <TicketSegment
        segment={{
          departure: ticket.departureA,
          arrival: ticket.departureB,
          date: ticket.dataA,
          duration: ticket.durationAF,
          stopsCount: ticket.stopsA,
          segment: ticket.segmentA,
          arrivalTime: ticket.arrivalA,
        }}
        direction="A"
      />

      <TicketSegment
        segment={{
          departure: ticket.departureB,
          arrival: ticket.departureA,
          date: ticket.dataB,
          duration: ticket.durationBF,
          stopsCount: ticket.stopsB,
          segment: ticket.segmentB,
          arrivalTime: ticket.arrivalB,
        }}
        direction="B"
      />
    </div>
  );
};

export default Ticket;
