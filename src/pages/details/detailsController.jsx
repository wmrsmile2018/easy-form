import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchError, getInfoById } from "../../model/event/reducer";
import { sagaEventCallBegan } from "../../model/saga";

import { Details } from "./details";

const isDev = process.env.NODE_ENV === "development";

const getUrl = ({ type, id }) => {
  switch (type) {
    case getInfoById.type:
      return isDev ? `/event` : `/getInfoByEventId?id=${id}`;
  }
};

export const DetailsController = ({ className }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event.event);

  useEffect(() => {
    const id = location.pathname.split("/")[3];
    dispatch({
      url: getUrl({ type: getInfoById.type, id }),
      type: sagaEventCallBegan.type,
      method: "get",
      onSuccess: getInfoById.type,
      onError: fetchError.type,
    });
  }, [dispatch, location]);

  return <Details className={className} event={event} />;
};
