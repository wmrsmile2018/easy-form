import React, { useEffect, useState } from "react";
// import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, fetchError, getAllUsers } from "../../model/event/reducer";
import { sagaEventCallBegan } from "../../model/saga";
// import { isEmpty } from "lodash";

// import { Events } from "./events";
// import { sagaEventCallBegan } from "../../model/saga";
// import {
//   deleteActiveEvent,
//   fetchError,
//   // getEvents,
//   getEventsFilters,
//   getInfoById,
// } from "../../model/event/reducer";
// import { useSelector } from "react-redux";
// import { EventsContext } from "./eventsContex";
// import { useDebounce } from "../../utils/useHooks";
// import dayjs from "dayjs";
import { Users } from "./users";

// const isDev = process.env.NODE_ENV === "development";

// const getUrl = ({ type, id, state }) => {
//   switch (type) {
//     case deleteActiveEvent.type:
//       return isDev ? `/events/${id}` : `/deleteActiveEvent?id=${id}`;
//     case getInfoById.type:
//       return isDev ? `/event` : `/getInfoByEventId?id=${id}`;
//     case getEventsFilters.type:
//       return isDev
//         ? `/eventsFilters`
//         : `/eventsFilter?name=${state.name}&&city=${state.city}&&area=${state.area}&&date=${state.date}&&deleted=${state.deleted}`;
//   }
// };

export const UsersController = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    login: "",
    password: "",
  });

  const isAddedUser = useSelector((state) => state.event.isAddedUser);
  const isDeletedUser = useSelector((state) => state.event.isDeletedUser);
  const users = useSelector((state) => state.event.users);
  const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.auth.status);
  const handleOnChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleOnAdd = () => {
    dispatch({
      url: `/admin/adduser`,
      type: sagaEventCallBegan.type,
      method: "post",
      onSuccess: addUser.type,
      onError: fetchError.type,
      payload: state,
      token,
    });
    setState({
      login: "",
      password: "",
    });
  };

  useEffect(() => {
    if (isAddedUser || isDeletedUser) {
      dispatch({
        url: "/admin/getusers",
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getAllUsers.type,
        onError: fetchError.type,
        token,
      });
    }
  }, [dispatch, isAddedUser, isDeletedUser, token]);

  useEffect(() => {
    dispatch({
      url: "/admin/getusers",
      type: sagaEventCallBegan.type,
      method: "get",
      onSuccess: getAllUsers.type,
      onError: fetchError.type,
      token,
    });
  }, [dispatch, token]);

  const handleOnRemove = ({ target }) => {
    dispatch({
      url: "/admin/deleteuser",
      type: sagaEventCallBegan.type,
      method: "post",
      onSuccess: deleteUser.type,
      onError: fetchError.type,
      payload: { id: target.dataset["id"] },
      token,
    });
  };

  return (
    <Users
      isValid={status !== 403}
      users={users}
      handleOnRemove={handleOnRemove}
      onChange={handleOnChange}
      onAdd={handleOnAdd}
      state={state}
    />
  );
};
