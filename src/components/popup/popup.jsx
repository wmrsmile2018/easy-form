import React, { useState, useCallback } from "react";
import clsx from "clsx";

import { Button } from "../button";
import { MarginGroup } from "../marginGroup/marginGroup";
import { Input } from "../input";

import "./popup.scss";

export const Popup = React.memo(({ className, onAdd }) => {
  const [state, setState] = useState({
    url: "",
    people_count: "",
  });
  const classes = clsx("popup", className);

  const handleOnChange = useCallback(
    ({ target }) => {
      setState({ ...state, [target.name]: target.value });
    },
    [state],
  );

  const handleOnAdd = useCallback(() => {
    onAdd({ ...state, id: Date.now() });
    setState({ url: "", people_count: "" });
  }, [state, onAdd]);

  return (
    <div className={classes}>
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
      <p className="popup__prompt">Оставь пустым если неограничено</p>
      <Button onClick={handleOnAdd}> Добавить внешний ресурс </Button>
    </div>
  );
});
