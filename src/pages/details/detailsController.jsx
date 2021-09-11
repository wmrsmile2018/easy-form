import React from "react";
import { useSelector } from "react-redux";
import { Details } from "./details";

export const DetailsController = ({ className }) => {
  const event = useSelector((state) => state.event.event);
  return <Details className={className} event={event} />;
};
