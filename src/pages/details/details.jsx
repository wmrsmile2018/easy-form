import React, { useReducer, useMemo, useCallback } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import key from "weak-key";
import { saveAs } from "file-saver";

import "./details.scss";

import { Title } from "../../components/title";
import { MarginGroup } from "../../components/marginGroup/marginGroup";
import { Button } from "../../components/button";

const Resources = React.memo(({ className, resources, defaultRsrc }) => {
  const classes = clsx("resources", className);

  return (
    <div classes={classes}>
      <div className="resources-header">
        <span className="row__cell header__row-cell row__index">№</span>
        <span className="row__cell header__row-cell row__url">Внешние ресурсы</span>
        <span className="row__cell header__row-cell row__scheduled">
          Запланированное количество человек
        </span>
        <span className="row__cell header__row-cell row__team">Перешедшее количество человек</span>
      </div>
      <div className="resources-content">
        {resources.map((el, i) => (
          <div className="row-cells" key={key(el)}>
            <span className="row__cell row__index">{i + 1}</span>
            <a
              href={decodeURI(el.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="row__cell row__url"
            >
              {decodeURI(el.url)}
            </a>
            <span className="row__cell row__scheduled">
              {el.people_count !== "0" ? el.people_count : "Бесконечное"}
            </span>
            <span className="row__cell row__team">{el.came_people_count}</span>
          </div>
        ))}
        {defaultRsrc > 0 && (
          <div className="row-cells">
            <span className="row__cell row__index">0</span>
            <span className="row__cell row__url">Дефолтный внешний ресурс</span>
            <span className="row__cell row__scheduled">0</span>
            <span className="row__cell row__team">{defaultRsrc}</span>
          </div>
        )}
      </div>
    </div>
  );
});

const Row = React.memo(
  ({ className, qrUrl, peopleCount, team, index, rsrcCount, resources, qrPath, defaultRsrc }) => {
    const [toggle, dispatch] = useReducer((state) => !state, false);
    const classes = clsx("row", className, { showDetails: toggle });
    const height = useMemo(() => (toggle ? (resources.length + 1 + !!defaultRsrc) * 51 : 0), [
      toggle,
      defaultRsrc,
    ]);

    const handleOnClick = useCallback(({ href, name }) => {
      saveAs(href, name);
    }, []);

    return (
      <div className={classes}>
        <div className="row-cells__wrapper" onClick={dispatch}>
          <div className="row-cells">
            <span className="row__cell row__index">{index + 1}</span>
            <span className="row__cell row__url">{qrUrl}</span>
            <span className="row__cell row__team">{team ? "Да" : "Нет"}</span>
            <span className="row__cell row__people-count">{peopleCount}</span>
            <span className="row__cell row__rsrc-count">{rsrcCount}</span>
            <MarginGroup className="row-qr-path row__cell" isColumn gap={20}>
              <img className="row__qr-path" src={qrPath} alt="qr code" />
              <Button onClick={() => handleOnClick({ href: qrPath, name: "qr-code" })}>
                Скачать Qr код1
              </Button>
            </MarginGroup>
          </div>
        </div>
        <div className="row-resources" style={{ height }}>
          <Resources resources={resources} defaultRsrc={defaultRsrc} />
        </div>
      </div>
    );
  },
);

export const Details = React.memo(({ className, event, setZero }) => {
  const { name, city, date, area, people_count, qrs } = event;
  const classes = clsx("details", className);
  return (
    <div className={classes}>
      <Title>Информация о мероприятии</Title>

      <MarginGroup isColumn gap={20}>
        <MarginGroup className={"details-header-group"} gap={50}>
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
          <Button onClick={setZero}>Обнулить кол-во пришедших пользователей </Button>
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
                team={el.teamForFront}
                rsrcCount={el.resources.length}
                resources={el.resources}
                qrPath={el.qrPath}
                defaultRsrc={el.default_resource_people_count}
              />
            ))}
          </div>
        </div>
      </MarginGroup>
    </div>
  );
});
