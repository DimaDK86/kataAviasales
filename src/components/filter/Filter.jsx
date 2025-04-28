import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "antd";
import { toggleAll, toggleStop } from "../../store/actions";
import styles from "./Filter.module.scss";

const Filter = () => {
  const dispatch = useDispatch();
  const { allChecked, stops } = useSelector((state) => state.filters);

  const onChangeAll = () => {
    dispatch(toggleAll());
  };

  const onChangeStop = (stopType) => {
    dispatch(toggleStop(stopType));
  };

  const stopOptions = [
    { id: "noStops", label: "Без пересадок" },
    { id: "oneStop", label: "1 пересадка" },
    { id: "twoStops", label: "2 пересадки" },
    { id: "threeStops", label: "3 пересадки" },
  ];

  return (
    <div className={styles.filter}>
      <div className={styles.h}>Количество пересадок</div>

      <Checkbox
        className={styles.checkBox}
        checked={allChecked}
        onChange={onChangeAll}
        data-testid="filter-all"
      >
        Все
      </Checkbox>

      {stopOptions.map((option) => (
        <Checkbox
          key={option.id}
          className={styles.checkBox}
          checked={stops[option.id]}
          onChange={() => onChangeStop(option.id)}
          data-testid={`filter-${option.id}`}
        >
          {option.label}
        </Checkbox>
      ))}
    </div>
  );
};

export default Filter;
