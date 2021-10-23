import React from "react";

export const Info = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      className={`${className} info`}
      {...rest}
    >
      <path d="M4.01 3c-1.092 0-2 .905-2 1.998L2 23l4-4h14c1.093 0 2-.907 2-2V5c0-1.093-.907-2-2-2H4.01zm0 2H20v12H5.172l-1.168 1.168L4.01 5zM11 7v2h2V7h-2zm0 4v4h2v-4h-2z"></path>
    </svg>
  );
};
