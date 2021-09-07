import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import key from "weak-key";
import { Link, useHistory, useLocation } from "react-router-dom";

import { Button } from "../../components/button";
import { Title } from "../../components/title";

import "./events.scss";



const Row = ({  className, name, city, index, id }) => {
const history = useHistory()
const location = useLocation()
  const classes = clsx("row", className, { "outline": index % 2 === 0 });

  const handleOnRemove = (e) => {
  }
  const handleOnDetails = () => {
history.push(`${location.pathname}/details/${id}`)
  }

  const handleOnEdit = () => {
    history.push(`${location.pathname}/edit/${id}`)
  }

  return (
    <div  className={classes}>
      <Link to={location => `${location.pathname}/edit-event/${id}`} className="row-cells">
        <span className="row__cell row__index">{index + 1}</span>
        <span className="row__cell row__name">{name}</span>
        <span className="row__cell row__city">{city}</span>
      </Link>
      <div className="row-buttons">
        <Button onClick={handleOnRemove}>Удалить</Button>
        <Button onClick={handleOnEdit}>Изменить</Button>
        <Button onClick={handleOnDetails}>Подробнее</Button>
      </div>
    </div>
  );
};

export const Events = ({events, className, addNew }) => {
  const classes = clsx("events", className);

  return (
    <div className={classes}>
      <Title>Список мероприятий</Title>
      <div className="events-table">
        <div className="events-table-header">
          <span className="row__cell row__index header__row-cell">№</span>
          <span className="row__cell row__name header__row-cell">Наименование мероприятия</span>
          <span className="row__cell row__city header__row-cell">Город</span>
        </div>
        <div className="events-table-content">
          {events.map((el, i) => (
            <Row id={el.id} key={key(el)} index={i} name={el.name} city={el.city} />
          ))}
        </div>
      </div>
      <div className="events-button">
        <Button onClick={addNew}>Добавить новое мероприятие</Button>
      </div>
    </div>
  );
};
