import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { Event } from "./event";
import { sagaEventCallBegan } from "../../model/saga";
import { editEvent, fetchError, getInfoById } from "../../model/event/reducer";

const parametres = {
  status: "edit",
};

const isDev = process.env.NODE_ENV === "development";

const getUrl = ({ type, id }) => {
  switch (type) {
    case editEvent.type:
      return isDev ? "/events" : `/editEvent`;
    case getInfoById.type:
      return isDev ? `/event` : `/getInfoByEventId?id=${id}`;
  }
};

export const EditEventController = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isCreated = useSelector((state) => state.event.isCreated);
  const event = useSelector((state) => state.event.event);

  const [state, setState] = useState({
    name: "",
    city: "",
    date: "",
    area: "",
    qrs: [],
  });

  const handleOnSubmit = useCallback(() => {
    dispatch({
      url: getUrl({ type: editEvent.type }),
      type: sagaEventCallBegan.type,
      payload: {
        ...state,
        date_picker: "",
      },
      method: "put",
      onSuccess: editEvent.type,
    });

    setState({ name: "", city: "", date: "", area: "", qrs: [] });
  }, [state]);

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
    setState({
      ...state,
      ...event,
    });
  }, [event]);

  useEffect(() => {
    if (isCreated) {
      history.push("/admin");
    }
  }, [isCreated]);
  return (
    <Event
      onUpdateState={setState}
      state={state}
      onSend={handleOnSubmit}
      title="Редактировать мероприятие"
      {...parametres}
    />
  );
});
