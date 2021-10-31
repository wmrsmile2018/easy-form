import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  fetchError,
  getInfoById,
  setToZero,
  statisticStop,
  statisticUpdate,
  statisticStart,
} from "../../model/event/reducer";
import { sagaEventCallBegan } from "../../model/saga";

import { Details } from "./details";

const isDev = process.env.NODE_ENV !== "development";

const getUrl = ({ type, id }) => {
  switch (type) {
    case getInfoById.type:
      return isDev ? `/event` : `/admin/getInfoByEventId?id=${id}`;
    case setToZero.type:
      return isDev ? `/resetToZero` : `/admin/resetResources?id=${id}`;
  }
};

export const DetailsController = ({ className }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event.event);
  const resetToZero = useSelector((state) => state.event.resetToZero);
  const token = useSelector((state) => state.auth.token);
  const stop = useSelector((state) => state.event.statisticStop);
  const update = useSelector((state) => state.event.statisticUpdate);
  const start = useSelector((state) => state.event.statisticStart);

  useEffect(() => {
    const id = location.pathname.split("/")[3];
    dispatch({
      url: getUrl({ type: getInfoById.type, id }),
      type: sagaEventCallBegan.type,
      method: "get",
      onSuccess: getInfoById.type,
      onError: fetchError.type,
      token,
    });
  }, [dispatch, location, token, stop, update, start]);

  useEffect(() => {
    if (resetToZero) {
      const id = location.pathname.split("/")[3];
      dispatch({
        url: getUrl({ type: getInfoById.type, id }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getInfoById.type,
        onError: fetchError.type,
        token,
      });
    }
  }, [dispatch, location, resetToZero, token]);

  const handleOnSetZero = useCallback(() => {
    const id = location.pathname.split("/")[3];
    dispatch({
      url: getUrl({ type: setToZero.type, id }),
      type: sagaEventCallBegan.type,
      method: "put",
      onSuccess: setToZero.type,
      onError: fetchError.type,
      payload: { success: true },
      token,
    });
  }, [dispatch, token]);

  const handleStatisticStop = useCallback(
    ({ target }) => {
      const id = target.dataset["id"];
      dispatch({
        url: `/admin/statisticStop?id=${id}`,
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: statisticStop.type,
        onError: fetchError.type,
        token,
      });
    },
    [token],
  );
  const handleStatisticUpdate = useCallback(
    ({ target }) => {
      const id = target.dataset["id"];
      dispatch({
        url: `/admin/statisticUpdate?id=${id}`,
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: statisticUpdate.type,
        onError: fetchError.type,
        token,
      });
    },
    [token],
  );
  const handleStatisticStart = useCallback(
    ({ target }) => {
      const id = target.dataset["id"];
      dispatch({
        url: `/admin/statisticStart?id=${id}`,
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: statisticStart.type,
        onError: fetchError.type,
        token,
      });
    },
    [token],
  );

  return (
    <Details
      className={className}
      event={event}
      setZero={handleOnSetZero}
      handleStatisticStop={handleStatisticStop}
      handleStatisticUpdate={handleStatisticUpdate}
      handleStatisticStart={handleStatisticStart}
    />
  );
};
