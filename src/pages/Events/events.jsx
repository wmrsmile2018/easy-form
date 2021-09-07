import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import key from "weak-key";
import { Link } from "react-router-dom";

import { Button } from "../../components/button";
import { Title } from "../../components/title";

import "./events.scss";

const events = [
  {
    "id": "164",
    "name": "Поход",
    "city": "Москва",
    "date": "2021-09-16 00:00:00.0",
    "area": "Лес",
    "people_count": "0",
    "deleted": "false",
    "qrs": [
      {
        "id": "236",
        "qr_suffix": "troparevo",
        "event_id": "164",
        "people_count": "0",
        "qr_url": "http:localhost/troparevo",
        "team": "true",
        "deleted": "false",
        "qrPath": {
          "id": "141",
          "qr_id": "236",
          "path": "QRs/Поход/troparevo.png",
          "deleted": "false",
        },
        "resources": [
          {
            "id": "374",
            "qr_id": "236",
            "qr_suffix": "troparevo",
            "infinity": "false",
            "url": "https://geekbrains.ru/certificates/688426#",
            "people_count": "0",
            "came_people_count": "0",
            "deleted": "false",
          },
          {
            "id": "375",
            "qr_id": "236",
            "qr_suffix": "troparevo",
            "infinity": "true",
            "url": "https://geekbrains.ru/certificates/681154",
            "people_count": "0",
            "came_people_count": "0",
            "deleted": "false",
          },
        ],
      },
      {
        "id": "237",
        "qr_suffix": "bitcevskiy",
        "event_id": "164",
        "people_count": "0",
        "qr_url": "http:localhost/bitcevskiy",
        "team": "false",
        "deleted": "false",
        "qrPath": {
          "id": "142",
          "qr_id": "237",
          "path": "QRs/Поход/bitcevskiy.png",
          "deleted": "false",
        },
        "resources": [
          {
            "id": "376",
            "qr_id": "237",
            "qr_suffix": "bitcevskiy",
            "infinity": "false",
            "url": "https://geekbrains.ru/certificates/762129",
            "people_count": "0",
            "came_people_count": "0",
            "deleted": "false",
          },
        ],
      },
    ],
  },
  {
    "id": "165",
    "name": "Рыбалка",
    "city": "",
    "date": "2021-09-16 00:00:00.0",
    "area": "Пруд",
    "people_count": "0",
    "deleted": "false",
    "qrs": [
      {
        "id": "238",
        "qr_suffix": "fish",
        "event_id": "165",
        "people_count": "0",
        "qr_url": "http:localhost/fish",
        "team": "false",
        "deleted": "false",
        "qrPath": {
          "id": "143",
          "qr_id": "238",
          "path": "QRs/Рыбалка/fish.png",
          "deleted": "false",
        },
        "resources": [
          {
            "id": "377",
            "qr_id": "238",
            "qr_suffix": "fish",
            "infinity": "false",
            "url": "https://geekbrains.ru/certificates/234223",
            "people_count": "0",
            "came_people_count": "0",
            "deleted": "false",
          },
          {
            "id": "378",
            "qr_id": "238",
            "qr_suffix": "fish",
            "infinity": "false",
            "url": "https://geekbrains.ru/certificates/660680#",
            "people_count": "0",
            "came_people_count": "0",
            "deleted": "false",
          },
          {
            "id": "379",
            "qr_id": "238",
            "qr_suffix": "fish",
            "infinity": "true",
            "url": "https://geekbrains.ru/certificates/762155",
            "people_count": "0",
            "came_people_count": "0",
            "deleted": "false",
          },
        ],
      },
    ],
  },
];

const Row = ({ className, name, city, index, id }) => {
  console.log(id);
  const classes = clsx("row", className, { "outline": index % 2 === 0 });
  return (
    <Link to={location => `${location.pathname}/edit-event/${id}`} className={classes}>
      <div className="row-cells">
        <span className="row__cell row__name">{name}</span>
        <span className="row__cell row__city">{city}</span>
      </div>
      <div className="row-buttons">
        <Button>Удалить</Button>
        <Button>Изменить</Button>
        <Button>Подробнее</Button>
      </div>
    </Link>
  );
};

export const Events = ({ className, addNew }) => {
  const classes = clsx("events", className);

  return (
    <div className={classes}>
      <Title>Список мероприятий</Title>
      <div className="events-table">
        <div className="events-table-header">
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
