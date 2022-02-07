import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import produce from "immer";

import { Event } from "./event";
import { sagaEventCallBegan } from "../../model/saga";
import { editEvent, fetchError, getInfoById } from "../../model/event/reducer";

const parametres = {
  status: "edit",
  teamName: "team",
};

const isDev = process.env.NODE_ENV === "development";

const getUrl = ({ type, id }) => {
  switch (type) {
    case editEvent.type:
      return isDev ? "/events" : `/admin/editEvent`;
    case getInfoById.type:
      return isDev ? `/event` : `/admin/getInfoByEventId?id=${id}`;
  }
};

export const EditEventController = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isUpdated = useSelector((state) => state.event.isUpdated);
  const event = useSelector((state) => state.event.event);
  const token = useSelector((state) => state.auth.token);

  const [state, setState] = useState({
    name: "",
    city: "",
    date: "",
    area: "",
    qrs: [],
  });

  const [access, setAccess] = useState({
    "group_access": false,
    "group_password": "",
    "personal_access": false,
    "personal_access_template": "",
    "personal_access_length": 0,
    "personal_access_quantity": 0,
    "personal_access_count": 0,
  });

  const handleOnChangeAccess = ({ target }) => {
    setAccess({
      ...access,
      [target.name]: target.checked,
    });
  };

  const handleOnChangeFieldsAccess = ({ target }) => {
    setAccess({
      ...access,
      [target.name]: target.value,
    });
  };

  const handleOnSubmit = useCallback(() => {
    const nextState = produce(state, (draftState) => {
      const qrs = draftState.qrs.map((qr) => {
        qr.id = qr.id.split("-")[0] === "tmpId" ? "add" : qr.id;
        qr.resources.map((rsc) => {
          rsc.id = rsc.id.split("-")[0] === "tmpId" ? "add" : rsc.id;
          return rsc;
        });
        return qr;
      });
      draftState.qrs = qrs;
    });

    // console.log(state);
    // console.log(nextState);

    dispatch({
      url: getUrl({ type: editEvent.type }),
      type: sagaEventCallBegan.type,
      payload: {
        ...nextState,
        ...access,
        date_picker: "",
      },
      method: "put",
      onSuccess: editEvent.type,
      token,
    });

    setState({ name: "", city: "", date: "", area: "", qrs: [] });
  }, [state]);

  useEffect(() => {
    if (!event.name) {
      const id = location.pathname.split("/")[3];
      dispatch({
        url: getUrl({ type: getInfoById.type, id }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getInfoById.type,
        onError: fetchError.type,
        token,
      });
    }
  }, [dispatch, location, event]);

  useEffect(() => {
    if (event.name) {
      const {
        group_access,
        group_password,
        personal_access,
        personal_access_template,
        personal_access_length,
        personal_access_quantity,
        personal_access_count,
      } = event;
      setState({
        ...state,
        ...event,
        date_picker: new Date(event.unixtime * 1000),
      });

      setAccess({
        group_access,
        group_password,
        personal_access,
        personal_access_template,
        personal_access_length,
        personal_access_quantity,
        personal_access_count,
      });
    }
  }, [event]);

  useEffect(() => {
    if (isUpdated) {
      history.push("/admin");
    }
  }, [isUpdated]);

  return (
    <Event
      onUpdateState={setState}
      state={state}
      onSend={handleOnSubmit}
      title="Редактировать мероприятие"
      access={access}
      onUpdateAccess={handleOnChangeAccess}
      onUpdateAccessFields={handleOnChangeFieldsAccess}
      {...parametres}
    />
  );
});
