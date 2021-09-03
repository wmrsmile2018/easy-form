import React, { useEffect, useState, useCallback } from "react";
import clsx from "clsx";

import { Button } from "../button";
import { MarginGroup } from "../marginGroup/marginGroup";
import { Input } from "../input";

import "./popup.scss";

export const Popup = React.memo(
  ({ state, onUpdateState, className, onAdd, isValid, popupRef, buttunLabel, disabled }) => {
    const classes = clsx("popup", className);

    const handleOnChange = useCallback(
      ({ target }) => {
        onUpdateState({ ...state, [target.name]: target.value });
      },
      [state],
    );
    console.log("disabled", disabled);
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
          {!isValid && <p className="popup__invalid">Данный внешний ресурс уже существует</p>}
        </MarginGroup>
        <Button onClick={onAdd} disabled={disabled}>
          {buttunLabel}
        </Button>
      </div>
    );
  },
);
