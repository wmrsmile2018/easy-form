import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { fetchError, getInfoById, setToZero } from "../../model/event/reducer";
import { sagaEventCallBegan } from "../../model/saga";

import { Details } from "./details";

const isDev = process.env.NODE_ENV === "development";

const getUrl = ({ type, id }) => {
  switch (type) {
    case getInfoById.type:
      return isDev ? `/event` : `/getInfoByEventId?id=${id}`;
    case setToZero.type:
      return isDev ? `/resetToZero` : `/resetResources?id=${id}`;
  }
};

export const DetailsController = ({ className }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event.event);
  const resetToZero = useSelector((state) => state.event.resetToZero);

  useEffect(() => {
    if (!event.name) {
      const id = location.pathname.split("/")[3];
      dispatch({
        url: getUrl({ type: getInfoById.type, id }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getInfoById.type,
        onError: fetchError.type,
      });
    }
  }, [dispatch, location, event]);

  useEffect(() => {
    if (resetToZero) {
      const id = location.pathname.split("/")[3];
      dispatch({
        url: getUrl({ type: getInfoById.type, id }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getInfoById.type,
        onError: fetchError.type,
      });
    }
  }, [dispatch, location, resetToZero]);

  const handleOnSetZero = useCallback(() => {
    const id = location.pathname.split("/")[3];
    dispatch({
      url: getUrl({ type: setToZero.type, id }),
      type: sagaEventCallBegan.type,
      method: "put",
      onSuccess: setToZero.type,
      onError: fetchError.type,
      payload: { success: true },
    });
  }, [dispatch]);

  return <Details className={className} event={event} setZero={handleOnSetZero} />;
};
