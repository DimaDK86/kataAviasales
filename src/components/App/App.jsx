import React from "react";
import { Provider } from "react-redux";
import store from "../../store/store";
import "../App/App.css";
import Filter from "../filter/Filter";
import TicketList from "../ticketList/TicketList";
import Tabs from "../tabs/Tabs";
import Logo from "../../img/Logo.png";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <header className="header">
          <img src={Logo} alt="logo" />
        </header>
        <div className="main">
          <Filter />
          <div className="ticked">
            <Tabs />
            <TicketList />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
