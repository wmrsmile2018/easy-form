import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Events } from "./events";
import { sagaEventCallBegan } from "../../model/saga";
import { deleteActiveEvent, fetchError, getEvents, getInfoById } from "../../model/event/reducer";
import { useSelector } from "react-redux";
import { EventsContext } from "./eventsContex";

const isDev = process.env.NODE_ENV !== "development";

const getUrl = ({ type, id }) => {
  switch (type) {
    case getEvents.type:
      return isDev ? "/events" : `/getAllNotDeletedEvents`;
    case deleteActiveEvent.type:
      return isDev ? `/events/${id}` : `/deleteActiveEvent?id=${id}`;
    case getInfoById.type:
      return isDev ? `/event` : `/admin/getInfoByEventId?id=${id}`;
  }
};

const parametres = {
  status: "active",
};

export const EventsController = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [id, setId] = useState("");
  const events = useSelector((state) => state.event.events);
  const status = useSelector((state) => state.event.event);

  const handleOnAddNew = () => {
    history.push("/admin/add-event");
  };

  useEffect(() => {
    if (status && id) {
      history.push(`${location.pathname}/details/${id}`);
    }
  }, [status, id]);

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
          const tmpId = e.target.dataset["id"];
          history.push(`/admin/edit-event/${tmpId}`);
        },
        handleOnShowQrs: (e) => {
          e.preventDefault();
        },
        handleOnRestore: () => {},
        handleOnDetails: (e) => {
          const tmpId = e.target.dataset["id"];
          setId(tmpId);
          dispatch({
            url: getUrl({ type: getInfoById.type, tmpId }),
            type: sagaEventCallBegan.type,
            method: "get",
            onSuccess: getInfoById.type,
            onError: fetchError.type,
          });
        },
        handleOnRemove: (e) => {
          e.preventDefault();
          const tmpId = e.target.dataset["id"];
          dispatch({
            url: getUrl({ type: deleteActiveEvent.type, tmpId }),
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
