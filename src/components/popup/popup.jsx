import React, { useEffect, useState, useCallback } from "react";
import clsx from "clsx";

import { Button } from "../button";
import { MarginGroup } from "../marginGroup/marginGroup";
import { Input } from "../input";

import "./popup.scss";

export const Popup = React.memo(({ className, onAdd, onEdit, popupRef, status, data, isExist }) => {
  const [state, setState] = useState({
    url: "",
    people_count: "",
    status,
    ...data,
  });
  const classes = clsx("popup", className);

  const handleOnChange = useCallback(
    ({ target }) => {
      setState({ ...state, [target.name]: target.value });
    },
    [state],
  );

  const handleOnAdd = useCallback(() => {
    const { url, people_count } = state;
    if (status === "add") onAdd({ url, people_count, id: Date.now().toString() });
    if (status === "edit") onEdit(state);

    if (isExist) {
      setState({ url: "", people_count: "" });
    }
  }, [state, onAdd, onEdit, status, isExist]);

  useEffect(() => {
    setState({ ...state, ...data });
  }, [data]);

  return (
    <div className={classes} ref={popupRef}>
      <h2>Popup</h2>
      <MarginGroup isColumn gap={20}>
        <Input
          type="text"
          onChange={handleOnChange}
          name="url"
          title={"Введите ссылку на внешний ресурс"}
          value={state.url}
        />
        <Input
          type="text"
          onChange={handleOnChange}
          name="people_count"
          title={"Введите количество человек"}
          value={state.people_count}
        />
      </MarginGroup>
      <MarginGroup isColumn gap={10} className="popup-warning">
        <p className="popup__prompt">Оставь пустым если неограничено</p>
        {isExist && <p className="popup__invalid">Данный внешний ресурс уже существует</p>}
      </MarginGroup>
      <Button onClick={handleOnAdd}>
        {status === "edit" && "Изменить внешний ресурс"}
        {status === "add" && "Добавить внешний ресурс"}
      </Button>
    </div>
  );
});
