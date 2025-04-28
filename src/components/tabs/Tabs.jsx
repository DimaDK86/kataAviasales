import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../store/actions";
import styles from "./Tabs.module.scss";

const tabs = [
  { id: "cheap", label: "Самый дешевый" },
  { id: "fast", label: "Самый быстрый" },
  { id: "optimal", label: "Оптимальный", disabled: true },
];

const Tabs = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tabs.activeTab);

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeTab === tab.id ? styles.activeButton : styles.button}
          onClick={() => !tab.disabled && dispatch(setActiveTab(tab.id))}
          disabled={tab.disabled}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
