import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import filterReducer from "./filtersReducer";
import tabReducer from "./tabReducer";
import ticketsReducer from "./ticketsReducer";

const rootReducer = combineReducers({
  filters: filterReducer,
  tabs: tabReducer,
  tickets: ticketsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
