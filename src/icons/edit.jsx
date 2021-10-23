import React from "react";

export const Edit = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`${className} edit`}
      {...rest}
    >
      <path
        {...rest}
        d="M7.127 22.562L0 24l1.438-7.128 5.689 5.69zm1.414-1.414L19.769 9.923l-5.69-5.692L2.852 15.458l5.689 5.69zM18.309 0l-2.816 2.817 5.691 5.691L24 5.689 18.309 0z"
      ></path>
    </svg>
  );
};
