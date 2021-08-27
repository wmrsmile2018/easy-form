import React from "react";
import clsx from "clsx";

import "./marginGroup.scss";

export const MarginGroup = React.memo(({ gap, className, children, isColumn }) => {
  const classes = clsx("margin-group", className);
  const style = {
    gap,
    flexDirection: isColumn ? "column" : "",
  };

  return (
    <div style={style} className={classes}>
      {children}
    </div>
  );
});
