import { fetchTickets as fetchTicketsHelper } from "../components/helpers/aviasalesApi"; // Импортируйте новый хелпер

export const FETCH_TICKETS_REQUEST = "FETCH_TICKETS_REQUEST";
export const FETCH_TICKETS_SUCCESS = "FETCH_TICKETS_SUCCESS";
export const FETCH_TICKETS_FAILURE = "FETCH_TICKETS_FAILURE";

export const TOGGLE_ALL = "TOGGLE_ALL";
export const TOGGLE_STOP = "TOGGLE_STOP";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

export const fetchTickets = () => async (dispatch) => {
  dispatch({ type: FETCH_TICKETS_REQUEST });

  try {
    const tickets = await fetchTicketsHelper(); // Используйте новый хелпер вместо сервиса
    dispatch({ type: FETCH_TICKETS_SUCCESS, payload: tickets });
  } catch (error) {
    dispatch({ type: FETCH_TICKETS_FAILURE, payload: error.message });
  }
};

export const toggleAll = () => ({ type: TOGGLE_ALL });
export const toggleStop = (stopType) => ({
  type: TOGGLE_STOP,
  payload: stopType,
});
export const setActiveTab = (tab) => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
});
