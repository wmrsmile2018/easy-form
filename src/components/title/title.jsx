import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import "./title.scss";

export const Title = ({ className, children, modificators }) => {
  const classes = clsx("title", className, modificators);
  return <h2 className={classes}>{children}</h2>;
};
