import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import "./checkBoxGroup.scss";

export const CheckBoxGroup = ({ className, title, children }) => {
  const classes = clsx("checkbox-group", className);

  return (
    <div className={classes}>
      <p className="checkbox__title">{title}</p>
      <div className="checkbox__content">{children}</div>
    </div>
  );
};

CheckBoxGroup.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CheckBoxGroup.defaultProps = {
  className: "",
  title: "",
};
