import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Event } from "./event";
import { sagaEventCallBegan } from "../../model/saga";
import { createEvent } from "../../model/event/reducer";
import dayjs from "dayjs";

const parametres = {
  status: "add",
  teamName: "team",
};

const isDev = process.env.NODE_ENV === "development";

const getUrl = ({ type }) => {
  switch (type) {
    case createEvent.type:
      return isDev ? "/events" : `/admin/addEvent`;
  }
};

export const AddEventController = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isCreated = useSelector((state) => state.event.isCreated);
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

  const handleOnSubmit = useCallback(() => {
    dispatch({
      type: sagaEventCallBegan.type,
      payload: {
        ...state,
        ...access,
        date_picker: "",
      },
      url: getUrl({ type: createEvent.type }),
      method: "post",
      onSuccess: createEvent.type,
      token,
    });

    setState({ name: "", city: "", date: "", area: "", qrs: [] });
  }, [state]);

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

  useEffect(() => {
    if (isCreated) {
      history.push("/admin");
    }
  }, [isCreated]);

  return (
    <Event
      onUpdateState={setState}
      state={state}
      onSend={handleOnSubmit}
      title="Новое мероприятие"
      access={access}
      onUpdateAccess={handleOnChangeAccess}
      onUpdateAccessFields={handleOnChangeFieldsAccess}
      {...parametres}
    />
  );
});
