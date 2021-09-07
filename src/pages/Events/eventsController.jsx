import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Events } from "./events";
import { sagaEventCallBegan } from "../../model/saga";
import { fetchError, getEvents } from "../../model/event/reducer";
import { useSelector } from "react-redux";

const isDev = process.env.NODE_ENV === "development";

const getUrl = () => {
  return isDev ? "/events" : `/getAllNotDeletedEvents`;
};


export const EventsController = () => {
  const dispatch = useDispatch()
  const history = useHistory();

  const events = useSelector(state => state.event.events)

  const handleOnAddNew = () => {
    history.push("/admin/add-event");
  };

  useEffect(() => {
    dispatch({
      url: getUrl(),
      type: sagaEventCallBegan.type,
      method: 'get',
      onSuccess: getEvents.type,
      onError: fetchError.type
    })
  }, [dispatch])

  return <Events events={events} addNew={handleOnAddNew} />;
};
