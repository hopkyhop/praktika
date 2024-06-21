import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";

const TownMenu = observer(() => {
  const { course } = useContext(Context);
  return (
    <div className="ps-3">
      <h5 className="subtitle">Город</h5>
      <ul className="menu__list">
        {course.towns.map((town) => (
          <li
            className={
              town.id === course.selectedTown.id
                ? "menu__item menu__item--active"
                : "menu__item"
            }
            key={town.id}
            onClick={() => course.setSelectedTown(town)}
          >
            {town.name}
          </li>
        ))}
        <li
          className={
            course.selectedTown.id === undefined
              ? "menu__item menu__item--active"
              : "menu__item"
          }
          onClick={() => course.setSelectedTown({})}
        >
          Все
        </li>
      </ul>
    </div>
  );
});

export default TownMenu;
