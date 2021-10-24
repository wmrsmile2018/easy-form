import React from "react";
import { Input } from "../../components/input/";
import key from "weak-key";

import "./signIn.scss";
import clsx from "clsx";
import { Button } from "../../components/button";
import { MarginGroup } from "../../components/marginGroup/marginGroup";

const fields = [
  { value: "Логин:", name: "login", type: "text" },
  { value: "Пароль:", name: "password", type: "password" },
];

export const SignIn = ({ onChange, state, className, onSubmit, text, onKeyDown }) => {
  const classes = clsx("sign-in", className);
  return (
    <MarginGroup isColumn gap={20} className={classes}>
      <h2>Авторизация</h2>
      <MarginGroup isColumn gap={15} className="sign-in-fields">
        {fields.map((el) => (
          <Input
            key={key(el)}
            name={el.name}
            type={el.type}
            value={state[el.name]}
            onChange={onChange}
            title={el.value}
            onKeyDown={onKeyDown}
          />
        ))}
      </MarginGroup>
      <p className="sign-in__text-error">{text}</p>
      <Button onClick={onSubmit}>Войти</Button>
    </MarginGroup>
  );
};
