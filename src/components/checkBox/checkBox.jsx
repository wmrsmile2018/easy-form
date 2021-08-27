import React, { useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import parse from "html-react-parser";
import key from "weak-key";

import "./checkBox.scss";

export const CheckBox = ({ className, title, ...rest }) => {
  const classes = clsx(
    "checkbox",
    className,
    { "checked": rest.checked },
    { "disabled": rest.disabled },
  );
  const id = useMemo(() => key({ [`checkbox-${Date.now()}`]: `checkbox-${Date.now()}` }), []);
  return (
    <label htmlFor={id} className={classes}>
      <input id={id} type="checkbox" style={{ display: "none" }} {...rest} />
      <span className="checkbox__box"></span>
      <span className="checkbox__title">{parse(title)}</span>
    </label>
  );
};

CheckBox.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

CheckBox.defaultProps = {
  className: "",
  title: "",
};
