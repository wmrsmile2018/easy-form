import React, { useReducer } from "react";
import clsx from "clsx";
import { Button } from "../../components/button";
import { MarginGroup } from "../../components/marginGroup/marginGroup";

import "./defaultResource.scss";
import { Input } from "../../components/input";
import { Title } from "../../components/title";

export const DefaultResource = ({ className, rsrc, defaultResource, onChange, onSubmit }) => {
  const classes = clsx("default-resource", className);
  const [toogle, dispatch] = useReducer((state) => !state, false);

  return (
    <div className={classes}>
      <Title>Общий дефолтный внешний ресурс</Title>
      <MarginGroup isColumn gap={20}>
        <MarginGroup className="default-resource-data" isColumn gap={10}>
          <div className="default-resource-url">
            <span>Общий дефолтный внешний ресурс:</span>
            {decodeURI(rsrc.defaultResource)}
          </div>
          <div className="default-resource-date">
            <span>Дата последнего изменения:</span>
            {rsrc.date}
          </div>
          <Button onClick={dispatch}>Изменить</Button>
        </MarginGroup>
        {toogle && (
          <div className="default-resource-toggleForm">
            <MarginGroup isColumn gap={10}>
              <Input
                className="default-resource__url"
                title="Дефолтный внешний ресур"
                onChange={onChange}
                value={defaultResource}
              />

              <Button onClick={onSubmit}>Изменить</Button>
            </MarginGroup>
          </div>
        )}
      </MarginGroup>
    </div>
  );
};
