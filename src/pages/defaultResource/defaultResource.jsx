import React, { useReducer } from "react";
import clsx from "clsx";
import { Button } from "../../components/button";
import { MarginGroup } from "../../components/marginGroup/marginGroup";

export const DefaultResource = ({ className, rsrc, defaultResource, onChange, onSubmit }) => {
  const classes = clsx("default-resource", className);
  const [toogle, dispatch] = useReducer((state) => !state, false);

  return (
    <div className={classes}>
      <MarginGroup isColumn gap={10}>
        <div className="default-resource__url">
          <span>Дефолтный внешний ресур:</span>
          {rsrc}
        </div>

        <Button onClick={dispatch}>Изменить</Button>
      </MarginGroup>
      {toogle && (
        <div className="default-resource-toggleForm">
          <MarginGroup>
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
    </div>
  );
};
