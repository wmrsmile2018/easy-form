import React from "react";
import clsx from "clsx";

import "./marginGroup.scss";

export const MarginGroup = React.memo(({ gap, className, children, isColumn, style }) => {
  const classes = clsx("margin-group", className);
  const styleComponent = {
    gap,
    flexDirection: isColumn ? "column" : "",
    ...style,
  };

  return (
    <div style={styleComponent} className={classes}>
      {children}
    </div>
  );
});
