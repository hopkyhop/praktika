import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";

const FormBar = observer(() => {
  const { course } = useContext(Context);
  return (
    <div className="ps-3">
      <h5 className="subtitle">Форма обучения</h5>
      <ul className="menu__list mb-4">
        {course.forms.map((form) => (
          <li
            className={
              form.id === course.selectedForm.id
                ? "menu__item menu__item--active"
                : "menu__item"
            }
            key={form.id}
            onClick={() => course.setSelectedForm(form)}
          >
            {form.name}
          </li>
        ))}
        <li
          className={
            course.selectedForm.id === undefined
              ? "menu__item menu__item--active"
              : "menu__item"
          }
          onClick={() => course.setSelectedForm({})}
        >
          Все
        </li>
      </ul>
    </div>
  );
});

export default FormBar;
