import React from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import PropTypes from "prop-types";

import "./modal.scss";

export const Modal = React.memo(({ className, show, children, idNode, ...rest }) => {
  const classes = clsx("modal", className, { hidden: !show });
  const el = document.getElementById(idNode || "root");

  return ReactDOM.createPortal(
    <div id="portal" className={classes} {...rest}>
      {children}
    </div>,
    el,
  );
});

// const Modal = ({ className, children, idNode }) => {
//   const el = document.getElementById(idNode);

//   return ReactDOM.createPortal(
//     <div id="portal" className={`modal ${className}`}>
//       {children}
//     </div>,
//     el,
//   );
// };

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  idNode: PropTypes.string,
};

Modal.defaultProps = {
  className: "",
  idNode: "",
};
