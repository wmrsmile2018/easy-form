import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Events } from "./events";
import { sagaEventCallBegan } from "../../model/saga";
import {
  deleteMarkedEvent,
  fetchError,
  getDeletedEvents,
  getEvents,
  restoreEvent,
} from "../../model/event/reducer";
import { useSelector } from "react-redux";
import { EventsContext } from "./eventsContex";

const isDev = process.env.NODE_ENV === "development";

const getUrl = ({ type, id }) => {
  switch (type) {
    case getDeletedEvents.type:
      return isDev ? "/events" : `/getAllDeletedEvents`;
    case restoreEvent.type:
      return isDev ? `/events/${id}` : `/restoreEvent?id=${id}`;
    case deleteMarkedEvent.type:
      return isDev ? `/events/${id}` : `/deleteMarkedEvent?id=${id}`;
  }
};

const parametres = {
  status: "deleted",
};

export const DeletedEventsController = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const events = useSelector((state) => state.event.deletedEvents);

  const handleOnAddNew = () => {
    history.push("/admin/add-event");
  };

  useEffect(() => {
    dispatch({
      url: getUrl({ type: getDeletedEvents.type }),
      type: sagaEventCallBegan.type,
      method: "get",
      onSuccess: getDeletedEvents.type,
      onError: fetchError.type,
    });
  }, [dispatch]);

  return (
    <EventsContext.Provider
      value={{
        ...parametres,
        handleOnEdit: (e) => {},
        handleOnShowQrs: (e) => {},
        handleOnRestore: (e) => {
          e.preventDefault();
          const id = e.target.dataset["id"];

          dispatch({
            url: getUrl({ type: restoreEvent.type, id }),
            type: sagaEventCallBegan.type,
            method: "put",
            onSuccess: restoreEvent.type,
            onError: fetchError.type,
          });
        },
        handleOnDetails: () => {
          location.pathname;
        },
        handleOnRemove: (e) => {
          e.preventDefault();
          const id = e.target.dataset["id"];

          dispatch({
            url: getUrl({ type: deleteMarkedEvent.type, id }),
            type: sagaEventCallBegan.type,
            method: "delete",
            onSuccess: deleteMarkedEvent.type,
            onError: fetchError.type,
          });
        },
      }}
    >
      <Events events={events} addNew={handleOnAddNew} />
    </EventsContext.Provider>
  );
};
