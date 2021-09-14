import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";

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
      return isDev ? `/event` : `/getInfoByEventId?id=${id}`;
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
  const [path, setPath] = useState("");
  const events = useSelector((state) => state.event.events);
  const event = useSelector((state) => state.event.event);
  const isDeletedActive = useSelector((state) => state.event.isDeletedActive);

  const handleOnAddNew = () => {
    history.push("/admin/add-event");
  };

  useEffect(() => {
    if (isDeletedActive) {
      dispatch({
        url: getUrl({ type: getEvents.type }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getEvents.type,
        onError: fetchError.type,
      });
    }
  }, [isDeletedActive, dispatch]);

  useEffect(() => {
    if (!isEmpty(event) && id) {
      switch (path) {
        case "details":
          history.push(`${location.pathname}/details/${id}`);
          break;
        case "edit":
          history.push(`/admin/edit-event/${id}`);
          break;
        default:
          break;
      }
    }
  }, [event, id]);

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
          e.stopPropagation();
          const tmpId = e.target.dataset["id"];
          setPath("edit");
          setId(tmpId);
          dispatch({
            url: getUrl({ type: getInfoById.type, id: tmpId }),
            type: sagaEventCallBegan.type,
            method: "get",
            onSuccess: getInfoById.type,
            onError: fetchError.type,
          });
        },
        handleOnRestore: () => {},
        handleOnDetails: (e) => {
          e.stopPropagation();
          const tmpId = e.target.dataset["id"];
          setPath("details");
          setId(tmpId);
          dispatch({
            url: getUrl({ type: getInfoById.type, id: tmpId }),
            type: sagaEventCallBegan.type,
            method: "get",
            onSuccess: getInfoById.type,
            onError: fetchError.type,
          });
        },
        handleOnRemove: (e) => {
          e.stopPropagation();
          const tmpId = e.target.dataset["id"];
          dispatch({
            url: getUrl({ type: deleteActiveEvent.type, id: tmpId }),
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
