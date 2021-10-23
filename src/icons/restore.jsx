import React from "react";

export const Restore = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="18"
      viewBox="0 0 21 18"
      className={`${className} restore`}
      {...rest}
    >
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-577 -553)">
          <g transform="translate(100 100)">
            <g transform="translate(476 450)">
              <path d="M0 0L24 0 24 24 0 24z"></path>
              <path
                fill="#1D1D1D"
                d="M13 3a9 9 0 00-9 9H1l4 3.99L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21a9 9 0 000-18zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
