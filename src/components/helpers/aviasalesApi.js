const baseUrl = "https://aviasales-test-api.kata.academy";

export const getSearchId = async () => {
  try {
    const response = await fetch(`${baseUrl}/search`);
    if (!response.ok) {
      throw new Error(
        `Ошибка при получении searchId, статус: ${response.status}`,
      );
    }
    const data = await response.json();
    return data.searchId;
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};

export const getTickets = async (searchId) => {
  try {
    const response = await fetch(`${baseUrl}/tickets?searchId=${searchId}`);
    if (!response.ok) {
      throw new Error(
        `Ошибка при получении билетов, статус: ${response.status}`,
      );
    }
    const data = await response.json();
    return data.tickets.map(transformTicket);
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};

export const fetchTickets = async () => {
  try {
    const searchId = await getSearchId();
    return await getTickets(searchId);
  } catch (error) {
    console.error("Ошибка при получении билетов:", error);
  }
};

const transformTicket = (data) => {
  const { carrier, price, segments } = data;

  const transformSegment = (segment) => {
    const { origin, destination, date, duration, stops } = segment;
    return {
      origin,
      destination,
      date: formatDate(date),
      duration: formatDuration(duration),
      durationL1: duration,
      stopsCount: stops.length,
      stopsList: stops.join(", "),
      arrival: formatArrival(date, duration),
    };
  };

  const segmentA = transformSegment(segments[0]);
  const segmentB = transformSegment(segments[1]);

  return {
    carrier,
    price,
    departureA: segmentA.origin,
    departureB: segmentA.destination,
    dataA: segmentA.date,
    dataB: segmentB.date,
    durationAF: segmentA.duration,
    durationBF: segmentB.duration,
    arrivalA: segmentA.arrival,
    arrivalB: segmentB.arrival,
    stopsA: segmentA.stopsCount,
    segmentA: segmentA.stopsList,
    stopsB: segmentB.stopsCount,
    segmentB: segmentB.stopsList,
    durationL1: segmentA.durationL1,
    durationL2: segmentB.durationL1,
  };
};

const formatArrival = (dateString, duration) => {
  const date = new Date(dateString);
  const newDate = new Date(date.getTime() + duration * 60 * 1000);
  return formatDate(newDate.toISOString());
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleTimeString("ru-RU", options);
};

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}ч ${minutes}м`;
};
