import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Events } from "./events";
import { sagaEventCallBegan } from "../../model/saga";
import { fetchError, getEvents } from "../../model/event/reducer";
import { useSelector } from "react-redux";
import { EventsContext } from "./eventsContex";

const isDev = process.env.NODE_ENV === "development";

const getUrl = () => {
  return isDev ? "/events" : `/getAllNotDeletedEvents`;
};

const parametres = {
  status: "active",
};

export const EventsController = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const events = useSelector((state) => state.event.events);

  const handleOnAddNew = () => {
    history.push("/admin/add-event");
  };

  useEffect(() => {
    dispatch({
      url: "/getAllNotDeletedEvents",
      type: sagaEventCallBegan.type,
      method: "get",
      onSuccess: getEvents.type,
      onError: fetchError.type,
    });
  }, [dispatch]);

  return (
    <EventsContext.Provider
      value={{
        ...parametres,
        handleOnEdit: (e) => {
          e.preventDefault();
        },
        handleOnShowQrs: (e) => {
          e.preventDefault();
        },
        handleOnRestore: (e) => {
          e.preventDefault();
        },
        handleOnRemove: (e) => {
          e.preventDefault();
        },
      }}
    >
      <Events events={events} addNew={handleOnAddNew} />
    </EventsContext.Provider>
  );
};
