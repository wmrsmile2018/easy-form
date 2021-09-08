import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Events } from "./events";
import { sagaEventCallBegan } from "../../model/saga";
import { deleteActiveEvent, fetchError, getEvents } from "../../model/event/reducer";
import { useSelector } from "react-redux";
import { EventsContext } from "./eventsContex";

const isDev = process.env.NODE_ENV === "development";

const getUrl = ({ type, id }) => {
  switch (type) {
    case getEvents.type:
      return isDev ? "/events" : `/getAllNotDeletedEvents`;
    case deleteActiveEvent.type:
      return isDev ? `/events/${id}` : `/deleteActiveEvent?id=${id}`;
  }
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
      url: getUrl({ type: getEvents.type }),
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
          const id = e.target.dataset["id"];
          history.push(`/admin/edit-event/${id}`);
        },
        handleOnShowQrs: (e) => {
          e.preventDefault();
          const id = e.target.dataset["id"];
        },
        handleOnRestore: () => {},
        handleOnRemove: (e) => {
          e.preventDefault();
          const id = e.target.dataset["id"];
          dispatch({
            url: getUrl({ type: deleteActiveEvent.type, id }),
            type: sagaEventCallBegan.type,
            method: "delete",
            onSuccess: deleteActiveEvent.type,
            onError: fetchError.type,
          });
        },
      }}
    >
      <Events events={events} addNew={handleOnAddNew} />
    </EventsContext.Provider>
  );
};
