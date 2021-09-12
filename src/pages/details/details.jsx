import React, { useReducer, useMemo } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import key from "weak-key";

import "./details.scss";

import { Title } from "../../components/title";
import { MarginGroup } from "../../components/marginGroup/marginGroup";

const Resources = React.memo(({ className, resources }) => {
  const classes = clsx("resources", className);

  return (
    <div classes={classes}>
      <div className="resources-header">
        <span className="row__cell header__row-cell row__index">№</span>
        <span className="row__cell header__row-cell row__url">Внешние ресурсы</span>
        <span className="row__cell header__row-cell row__scheduled">
          Запланированное количество человек
        </span>
        <span className="row__cell header__row-cell row__team">Перешеднее количество человек</span>
      </div>
      <div className="resources-content">
        {resources.map((el, i) => (
          <div className="row-cells" key={key(el)}>
            <span className="row__cell row__index">{i + 1}</span>
            <span className="row__cell row__url">{el.url}</span>
            <span className="row__cell row__scheduled">
              {el.people_count ? el.people_count : "Бесконечное"}
            </span>
            <span className="row__cell row__team">{el.came_people_count}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

const Row = React.memo(
  ({ className, qrUrl, peopleCount, team, index, rsrcCount, resources, qrPath }) => {
    const [toggle, dispatch] = useReducer((state) => !state, false);
    const classes = clsx("row", className, { showDetails: toggle });
    const height = useMemo(() => (toggle ? (resources.length + 1) * 51 : 0), [toggle]);
    return (
      <div className={classes}>
        <div className="row-cells__wrapper" onClick={dispatch}>
          <div className="row-cells">
            <span className="row__cell row__index">{index + 1}</span>
            <span className="row__cell row__url">{qrUrl}</span>
            <span className="row__cell row__team">{team ? "Да" : "Нет"}</span>
            <span className="row__cell row__people-count">{peopleCount}</span>
            <span className="row__cell row__rsrc-count">{rsrcCount}</span>
            <img className="row__cell row__qr-path" src={qrPath.path} alt="qr code" />
          </div>
        </div>
        <div className="row-resources" style={{ height }}>
          <Resources resources={resources} />
        </div>
      </div>
    );
  },
);

export const Details = React.memo(({ className, event }) => {
  const { name, city, date, area, people_count, qrs } = event;
  const classes = clsx("details", className);
  return (
    <div className={classes}>
      <Title>Информация о мероприятии</Title>

      <MarginGroup isColumn gap={20}>
        <MarginGroup className="details-header" isColumn gap={5}>
          <p>
            Наименование мероприятия:<span>{name}</span>
          </p>
          <p>
            Город:<span>{city}</span>
          </p>
          <p>
            Дата:<span>{date}</span>
          </p>
          <p>
            Место:<span>{area}</span>
          </p>
          <p>
            Пришло людей:<span>{people_count}</span>
          </p>
        </MarginGroup>

        <div className="details-table">
          <div className="details-table-header">
            <span className="row__cell header__row-cell row__index">№</span>
            <span className="row__cell header__row-cell row__url">Url QR кода</span>
            <span className="row__cell header__row-cell row__team">Командный QR</span>
            <span className="row__cell header__row-cell row__people-count">Перешло людей</span>
            <span className="row__cell header__row-cell row__rsrc-count">
              Количество внешних ресурсов
            </span>
            <span className="row__cell header__row-cell row__qr-path">Qr код</span>
          </div>
          <div className="details-table-content">
            {qrs.map((el, i) => (
              <Row
                key={key(el)}
                index={i}
                qrUrl={el.qr_url}
                peopleCount={el.people_count}
                team={el.team}
                rsrcCount={el.resources.length}
                resources={el.resources}
                qrPath={el.qrPath}
              />
            ))}
          </div>
        </div>
      </MarginGroup>
    </div>
  );
});
