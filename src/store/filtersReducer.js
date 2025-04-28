import { TOGGLE_ALL, TOGGLE_STOP } from "./actions";

const initialState = {
  allChecked: false,
  stops: {
    noStops: false,
    oneStop: false,
    twoStops: false,
    threeStops: false,
  },
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ALL:
      const newAllChecked = !state.allChecked;
      return {
        ...state,
        allChecked: newAllChecked,
        stops: {
          noStops: newAllChecked,
          oneStop: newAllChecked,
          twoStops: newAllChecked,
          threeStops: newAllChecked,
        },
      };
    case TOGGLE_STOP:
      const newStops = {
        ...state.stops,
        [action.payload]: !state.stops[action.payload],
      };
      return {
        ...state,
        allChecked: Object.values(newStops).every(Boolean),
        stops: newStops,
      };
    default:
      return state;
  }
};

export default filterReducer;
