import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import "./button.scss";

export const Button = ({ className, children, color, ...rest }) => {
  const classes = clsx("button", className, { "disabled": rest.disabled }, color);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  colro: PropTypes.string,
};

Button.defaultProps = {
  className: "",
  color: "green",
};
