import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import key from "weak-key";
import { Link, useHistory, useLocation } from "react-router-dom";

import { Button } from "../../components/button";
import { Title } from "../../components/title";
import { useEvents } from "./eventsContex";

import "./events.scss";

const Row = ({ className, name, city, index, id, date, area, peopleCount }) => {
  const classes = clsx("row", className, { "outline": index % 2 === 0 });
  const {
    status,
    handleOnEdit,
    handleOnShowQrs,
    handleOnRestore,
    handleOnRemove,
    handleOnDetails,
  } = useEvents();
  return (
    <div onClick={handleOnDetails} className={classes} data-id={id}>
      <div className="row-cells" data-id={id}>
        <span data-id={id} className="row__cell row__index">
          {index + 1}
        </span>
        <span data-id={id} className="row__cell row__name">
          {name}
        </span>
        <span data-id={id} className="row__cell row__city">
          {city}
        </span>
        <span data-id={id} className="row__cell row__date">
          {date}
        </span>
        <span data-id={id} className="row__cell row__area">
          {area}
        </span>
        <span data-id={id} className="row__cell row__personal-c ount">
          {peopleCount}
        </span>
      </div>
      <div className="row-buttons" data-id={id}>
        <Button data-id={id} onClick={handleOnRemove}>
          Удалить
        </Button>
        {status === "active" && (
          <Button data-id={id} onClick={handleOnEdit}>
            Изменить
          </Button>
        )}
        {status === "active" && (
          <Button data-id={id} onClick={handleOnShowQrs}>
            Показать Qr
          </Button>
        )}
        {status === "deleted" && (
          <Button data-id={id} onClick={handleOnRestore}>
            Восстановить
          </Button>
        )}
      </div>
    </div>
  );
};

export const Events = ({ events, className, addNew }) => {
  const classes = clsx("events", className);
  const { status } = useEvents();
  return (
    <div className={classes}>
      <Title modificators={status}>
        {status === "active" && "Список активных мероприятий"}
        {status === "deleted" && "Список удаленных мероприятий"}
      </Title>
      <div className="events-table">
        <div className="events-table-header">
          <span className="row__cell row__index header__row-cell">№</span>
          <span className="row__cell row__name header__row-cell">Наименование мероприятия</span>
          <span className="row__cell row__city header__row-cell">Город</span>
          <span className="row__cell row__date header__row-cell">Дата</span>
          <span className="row__cell row__area header__row-cell">Место</span>
          <span className="row__cell row__people-count header__row-cell">Пришло людей</span>
          <span className="row__cell row__operations header__row-cell">Операции</span>
        </div>
        <div className="events-table-content">
          {events.map((el, i) => (
            <Row
              id={el.id}
              key={key(el)}
              index={i}
              name={el.name}
              city={el.city}
              date={el.date}
              area={el.area}
              peopleCount={el.people_count}
            />
          ))}
        </div>
      </div>
      <div className="events-button">
        <Button onClick={addNew}>Добавить новое мероприятие</Button>
      </div>
    </div>
  );
};
