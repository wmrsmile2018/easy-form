import React, { useCallback } from "react";
import clsx from "clsx";
import DatePicker from "react-date-picker";

import "./datePicker.scss";

export const InputDate = ({ title, value, name, onChange, className, ...rest }) => {
  const classes = clsx("input-date", className);

  const handleOnChange = useCallback(
    (value) => {
      onChange({ name, value });
    },
    [onChange, name],
  );

  return (
    <div className={classes}>
      <p>{title}</p>
      <DatePicker value={value} onChange={handleOnChange} {...rest} format="dd-MM-yyyy" />
    </div>
  );
};
