import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Events } from "./events";
import { sagaEventCallBegan } from "../../model/saga";
import {
  deleteMarkedEvent,
  fetchError,
  getDeletedEvents,
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
  const isDeletedMarked = useSelector((state) => state.event.isDeletedMarked);
  const isRestored = useSelector((state) => state.event.isRestored);

  const handleOnAddNew = () => {
    history.push("/admin/add-event");
  };

  useEffect(() => {
    if (isDeletedMarked || isRestored) {
      dispatch({
        url: getUrl({ type: getDeletedEvents.type }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getDeletedEvents.type,
        onError: fetchError.type,
      });
    }
  }, [dispatch, isDeletedMarked, isRestored]);

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
          e.stopPropagation();
          const id = e.target.dataset["id"];

          dispatch({
            url: getUrl({ type: restoreEvent.type, id }),
            type: sagaEventCallBegan.type,
            method: "put",
            onSuccess: restoreEvent.type,
            onError: fetchError.type,
          });
        },
        handleOnDetails: () => {},
        handleOnRemove: (e) => {
          e.stopPropagation();
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
