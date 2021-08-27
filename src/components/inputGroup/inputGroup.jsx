import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import "./inputGroup.scss";

export const InputGroup = React.memo(({ className, title, children }) => {
  const classes = clsx("input-group", className);

  return (
    <div className={classes}>
      <p className="input-group__title">{title}</p>
      <div className="input-group__content">{children}</div>
    </div>
  );
});

InputGroup.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

InputGroup.defaultProps = {
  className: "",
  title: "",
};
