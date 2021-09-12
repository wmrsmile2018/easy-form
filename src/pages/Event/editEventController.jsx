import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Event } from "./event";
import { sagaEventCallBegan } from "../../model/saga";
import { createEvent, editEvent } from "../../model/event/reducer";

const parametres = {
  status: "edit",
};

const isDev = process.env.NODE_ENV !== "development";

const getUrl = ({ type }) => {
  switch (type) {
    case editEvent.type:
      return isDev ? "/events" : `/editEvent`;
  }
};

export const EditEventController = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isCreated = useSelector((state) => state.event.isCreated);

  const [state, setState] = useState({
    event: "",
    city: "",
    date: "",
    area: "",
    QRs: [],
  });

  const handleOnSubmit = useCallback(() => {
    dispatch({
      url: getUrl({ type: editEvent.type }),
      type: sagaEventCallBegan.type,
      payload: state,
      method: "put",
      onSuccess: editEvent.type,
    });

    setState({ event: "", city: "", date: "", area: "", QRs: [] });
  }, [state]);

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
