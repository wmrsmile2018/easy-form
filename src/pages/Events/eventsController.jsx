import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";

import { Events } from "./events";
import { sagaEventCallBegan } from "../../model/saga";
import {
  deleteActiveEvent,
  fetchError,
  // getEvents,
  getEventsFilters,
  getInfoById,
} from "../../model/event/reducer";
import { useSelector } from "react-redux";
import { EventsContext } from "./eventsContex";
import { useDebounce } from "../../utils/useHooks";
import dayjs from "dayjs";

const isDev = process.env.NODE_ENV !== "development";

const getUrl = ({ type, id, state }) => {
  switch (type) {
    case deleteActiveEvent.type:
      return isDev ? `/events/${id}` : `/admin/deleteActiveEvent?id=${id}`;
    case getInfoById.type:
      return isDev ? `/event` : `/admin/getInfoByEventId?id=${id}`;
    case getEventsFilters.type:
      return isDev
        ? `/eventsFilters`
        : `/admin/eventsFilter?name=${state.name}&&city=${state.city}&&area=${state.area}&&date=${state.date}&&deleted=${state.deleted}`;
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
  const [filters, setFilters] = useState({
    city: "",
    name: "",
    area: "",
    date: "",
    deleted: false,
  });
  const events = useSelector((state) => state.event.events);
  const event = useSelector((state) => state.event.event);
  const isDeletedActive = useSelector((state) => state.event.isDeletedActive);
  const token = useSelector((state) => state.auth.token);
  const debouncedFilters = useDebounce(filters, 1000);
  const handleOnAddNew = () => {
    history.push("/admin/add-event");
  };
  console.log(filters);

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
        [data.name]: data.value ? dayjs(data.value).format("DD-MM-YYYY") : "",
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
    const isEmpty = Object.values(debouncedFilters).every((x) => x === "");
    if (!isEmpty) {
      dispatch({
        url: getUrl({ type: getEventsFilters.type, state: filters }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getEventsFilters.type,
        onError: fetchError.type,
        token,
      });
    }
  }, [debouncedFilters]);

  useEffect(() => {
    if (isDeletedActive) {
      dispatch({
        url: getUrl({
          type: getEventsFilters.type,
          state: {
            city: "",
            name: "",
            area: "",
            date: "",
            deleted: false,
          },
        }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getEventsFilters.type,
        onError: fetchError.type,
        token,
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
      url: getUrl({
        type: getEventsFilters.type,
        state: {
          city: "",
          name: "",
          area: "",
          date: "",
          deleted: false,
        },
      }),
      type: sagaEventCallBegan.type,
      method: "get",
      onSuccess: getEventsFilters.type,
      onError: fetchError.type,
      token,
    });
  }, [dispatch]);

  return (
    <EventsContext.Provider
      value={{
        ...parametres,
        handleOnEdit: (e) => {
          e.stopPropagation();
          const tmpId = e.target.dataset["id"];
          console.log(tmpId);
          setPath("edit");
          setId(tmpId);
          dispatch({
            url: getUrl({ type: getInfoById.type, id: tmpId }),
            type: sagaEventCallBegan.type,
            method: "get",
            onSuccess: getInfoById.type,
            onError: fetchError.type,
            token,
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
            token,
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
            token,
          });
        },
      }}
    >
      <Events
        events={events}
        addNew={handleOnAddNew}
        handleOnChange={handleOnChange}
        handleOnChangeDate={handleOnChangeDate}
        state={filters}
        resetFilters={handleOnResetFilters}
      />
    </EventsContext.Provider>
  );
};
