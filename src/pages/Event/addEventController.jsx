import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Event } from "./event";
import { sagaEventCallBegan } from "../../model/saga";
import { createEvent } from "../../model/event/reducer";

const parametres = {
  status: "add",
};

const isDev = process.env.NODE_ENV !== "development";

const getUrl = ({ type }) => {
  switch (type) {
    case createEvent.type:
      return isDev ? "/events" : `/addEvent`;
  }
};

export const AddEventController = React.memo(() => {
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
    console.log(state);
    dispatch({
      type: sagaEventCallBegan.type,
      payload: state,
      url: getUrl({ type: createEvent.type }),
      method: "post",
      onSuccess: createEvent.type,
    });

    setState({ event: "", city: "", date: "", area: "", QRs: [] });
  }, [state]);

  useEffect(() => {
    if (isCreated) {
      // history.push("/admin");
    }
  }, [isCreated]);
  // console.log(state);
  return (
    <Event
      onUpdateState={setState}
      state={state}
      onSend={handleOnSubmit}
      title="Новое мероприятие"
      {...parametres}
    />
  );
});
