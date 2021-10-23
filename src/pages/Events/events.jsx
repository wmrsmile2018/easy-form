import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import key from "weak-key";

import { Button } from "../../components/button";
import { Title } from "../../components/title";
import { useEvents } from "./eventsContex";

import { Input } from "../../components/input";
import { MarginGroup } from "../../components/marginGroup/marginGroup";
import { InputDate } from "../../components/datePicker/datePicker";
import { Delete, Info, Edit, Restore } from "../../icons/";
import "./events.scss";

const inputFields = [
  { name: "name", title: "Название мероприятия" },
  { name: "city", title: "Город" },
  { name: "area", title: "Место" },
];

const Row = ({ className, name, city, index, id, date, area, peopleCount }) => {
  const classes = clsx("row", className, { "outline": index % 2 === 0 });
  const { status, handleOnEdit, handleOnRestore, handleOnRemove, handleOnDetails } = useEvents();
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
        <Delete data-id={id} onClick={handleOnRemove} />
        <Info data-id={id} onClick={handleOnDetails} />
        <Edit data-id={id} onClick={handleOnEdit} />

        {status === "deleted" && <Restore data-id={id} onClick={handleOnRestore} />}
      </div>
    </div>
  );
};

export const Events = ({
  events,
  className,
  addNew,
  handleOnChange,
  handleOnChangeDate,
  state,
  resetFilters,
}) => {
  const classes = clsx("events", className);

  const { status } = useEvents();
  return (
    <div className={classes}>
      <Title modificators={status}>
        {status === "active" && "Список активных мероприятий"}
        {status === "deleted" && "Список удаленных мероприятий"}
      </Title>
      <MarginGroup gap={20} isColumn>
        <MarginGroup className="events-filters" isColumn>
          <MarginGroup isColumn gap={10} style={{ width: 880 }}>
            <p style={{ fontWeight: "bold", fontSize: 19 }}>Фильтры</p>
            <MarginGroup gap={10} style={{ alignItems: "flex-end" }}>
              {inputFields.map((el) => (
                <Input
                  key={key(el)}
                  name={el.name}
                  title={el.title}
                  onChange={handleOnChange}
                  value={state[el.name]}
                />
              ))}
              <InputDate
                title="Введите дату мероприятия"
                onChange={handleOnChangeDate}
                format="dd-MM-yyyy"
                value={state.date_picker}
                name={"date"}
              />
              <Button style={{ minWidth: 150, height: 35 }} onClick={resetFilters}>
                Сбросить фильтр
              </Button>
            </MarginGroup>
          </MarginGroup>
        </MarginGroup>
        <div className="events-table">
          <div className="events-table-header">
            <span className="row__cell row__index header__row-cell">№</span>
            <span className="row__cell row__name header__row-cell">
              Наименование
              <br />
              мероприятия
            </span>
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
      </MarginGroup>
    </div>
  );
};
