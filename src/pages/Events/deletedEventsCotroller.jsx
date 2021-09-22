import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";

import { Events } from "./events";
import { sagaEventCallBegan } from "../../model/saga";
import {
  deleteMarkedEvent,
  fetchError,
  // getDeletedEvents,
  getEventsFilters,
  getInfoById,
  restoreEvent,
} from "../../model/event/reducer";
import { useSelector } from "react-redux";
import { EventsContext } from "./eventsContex";
import { useDebounce } from "../../utils/useHooks";
import dayjs from "dayjs";

const isDev = process.env.NODE_ENV === "development";

const getUrl = ({ type, id, state }) => {
  switch (type) {
    case restoreEvent.type:
      return isDev ? `/events/${id}` : `/restoreEvent?id=${id}`;
    case deleteMarkedEvent.type:
      return isDev ? `/events/${id}` : `/deleteMarkedEvent?id=${id}`;
    case getInfoById.type:
      return isDev ? `/event` : `/getInfoByEventId?id=${id}`;
    case getEventsFilters.type:
      return isDev
        ? `/eventsFilters`
        : `/eventsFilter?name=${state.name}&&city=${state.city}&&area=${state.area}&&date=${state.date}&&deleted=${state.deleted}`;
  }
};

const parametres = {
  status: "deleted",
};

export const DeletedEventsController = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [path, setPath] = useState("");
  const [id, setId] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    name: "",
    area: "",
    date: "",
    deleted: true,
  });
  const events = useSelector((state) => state.event.events);
  const isDeletedMarked = useSelector((state) => state.event.isDeletedMarked);
  const isRestored = useSelector((state) => state.event.isRestored);
  const event = useSelector((state) => state.event.event);
  const debouncedFilters = useDebounce(filters, 1000);

  const handleOnAddNew = () => {
    history.push("/admin/add-event");
  };

  const handleOnChange = useCallback(
    ({ target }) => {
      setFilters({
        ...filters,
        [target.name]: target.value,
      });
    },
    [filters],
  );

  const handleOnChangeDate = useCallback(
    (data) => {
      setFilters({
        ...filters,
        [data.name]: dayjs(data.value).format("DD-MM-YYYY"),
        [`${data.name}_picker`]: data.value,
      });
    },
    [filters],
  );

  const handleOnResetFilters = useCallback(() => {
    setFilters({
      ...filters,
      city: "",
      name: "",
      area: "",
      date: "",
    });
  }, []);

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
    const isEmpty = Object.values(debouncedFilters).every((x) => x === "");
    if (!isEmpty) {
      dispatch({
        url: getUrl({ type: getEventsFilters.type, state: filters }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getEventsFilters.type,
        onError: fetchError.type,
      });
    }
  }, [debouncedFilters]);

  useEffect(() => {
    if (isDeletedMarked || isRestored) {
      dispatch({
        url: getUrl({
          type: getEventsFilters.type,
          state: {
            city: "",
            name: "",
            area: "",
            date: "",
            deleted: true,
          },
        }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getEventsFilters.type,
        onError: fetchError.type,
      });
    }
  }, [dispatch, isDeletedMarked, isRestored]);

  useEffect(() => {
    dispatch({
      url: getUrl({
        type: getEventsFilters.type,
        state: {
          city: "",
          name: "",
          area: "",
          date: "",
          deleted: true,
        },
      }),
      type: sagaEventCallBegan.type,
      method: "get",
      onSuccess: getEventsFilters.type,
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
        handleOnRestore: (e) => {
          e.stopPropagation();
          const tmpId = e.target.dataset["id"];

          dispatch({
            url: getUrl({ type: restoreEvent.type, id: tmpId }),
            type: sagaEventCallBegan.type,
            method: "put",
            onSuccess: restoreEvent.type,
            onError: fetchError.type,
          });
        },
        handleOnDetails: (e) => {
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
            url: getUrl({ type: deleteMarkedEvent.type, id: tmpId }),
            type: sagaEventCallBegan.type,
            method: "delete",
            onSuccess: deleteMarkedEvent.type,
            onError: fetchError.type,
          });
        },
      }}
    >
      <Events
        events={events}
        addNew={handleOnAddNew}
        handleOnChange={handleOnChange}
        state={filters}
        handleOnChangeDate={handleOnChangeDate}
        resetFilters={handleOnResetFilters}
      />
    </EventsContext.Provider>
  );
};
