import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import key from "weak-key";

import { Title } from "../../components/title";
// import { useusers } from "./usersContex";

import { MarginGroup } from "../../components/marginGroup/marginGroup";
import { Delete } from "../../icons/";
import "./users.scss";
import { Button } from "../../components/button";
import { Input } from "../../components/input";

const fields = [
  { value: "Логин:", name: "login", type: "text" },
  { value: "Пароль:", name: "password", type: "text" },
];

const Row = ({ className, login, index, handleOnRemove, id }) => {
  const classes = clsx("row", className, { "outline": index % 2 === 0 });
  // const { handleOnRemove } = useusers();
  return (
    <div className={classes}>
      <div className="row-cells">
        <span className="row__cell row__index">{index + 1}</span>
        <span className="row__cell row__name">{login}</span>
        <Delete data-id={id} className="row__cell row__operations" onClick={handleOnRemove} />
      </div>
    </div>
  );
};

export const Users = ({ users, className, handleOnRemove, state, onAdd, onChange }) => {
  const classes = clsx("users", className);

  return (
    <div className={classes}>
      <Title>Управление пользователями</Title>
      <MarginGroup gap={20} className="users-add-user">
        <MarginGroup gap={10}>
          {fields.map((el) => (
            <Input
              key={key(el)}
              name={el.name}
              type={el.type}
              value={state[el.name]}
              onChange={onChange}
              title={el.value}
            />
          ))}
        </MarginGroup>
        <Button onClick={onAdd}>Добавить новового пользователя</Button>
      </MarginGroup>
      <MarginGroup isColumn>
        <div className="users-header">
          <span className="row__cell row__index header__row-cell">№</span>
          <span className="row__cell row__name header__row-cell">Логин</span>
          <span className="row__cell row__operations header__row-cell">Операции</span>
        </div>
        <div className="users-content">
          {users.map((el, i) => (
            <Row
              key={key(el)}
              index={i}
              login={el.login}
              handleOnRemove={handleOnRemove}
              id={el.id}
            />
          ))}
        </div>
      </MarginGroup>
    </div>
  );
};
