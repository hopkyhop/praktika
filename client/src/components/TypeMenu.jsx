import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";

const TypeBar = observer(() => {
  const { course } = useContext(Context);

  return (
    <div className="ps-3">
      <h5 className="subtitle">Меганаправление</h5>
      <ul className="menu__list mb-4">
        {course.types.map((type) => (
          <li
            className={
              type.id === course.selectedType.id
                ? "menu__item menu__item--active"
                : "menu__item"
            }
            key={type.id}
            onClick={() => course.setSelectedType(type)}
          >
            {type.name}
          </li>
        ))}
        <li
          className={
            course.selectedType.id === undefined
              ? "menu__item menu__item--active"
              : "menu__item"
          }
          onClick={() => course.setSelectedType({})}
        >
          Все
        </li>
      </ul>
    </div>
  );
});

export default TypeBar;
