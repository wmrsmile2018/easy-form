import React from "react";
import clsx from "clsx";

import "./modal.scss";

export const Modal = React.memo(({ className, show, children }) => {
  const classes = clsx("modal", className, { hidden: !show });
  return <div className={classes}>{children}</div>;
});
