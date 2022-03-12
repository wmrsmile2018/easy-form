import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import produce from "immer";

import { Event } from "./event";
import { sagaEventCallBegan } from "../../model/saga";
import { editEvent, fetchError, getInfoById } from "../../model/event/reducer";
import { clearMessage, fetchMessageError, getMessages } from "../../model/messages/reducer";
import { isEmpty } from "lodash";

const parametres = {
  status: "edit",
  teamName: "team",
};

const isDev = process.env.NODE_ENV !== "development";

const getUrl = ({ type, id }) => {
  switch (type) {
    case editEvent.type:
      return isDev ? "/events" : `/admin/editEvent`;
    case getInfoById.type:
      return isDev ? `/event` : `/admin/getInfoByEventId?id=${id}`;
    case getMessages.type:
      return isDev ? "/messages" : " /admin/gms?suffix=${id}";
  }
};

export const EditEventController = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isUpdated = useSelector((state) => state.event.isUpdated);
  const event = useSelector((state) => state.event.event);
  const token = useSelector((state) => state.auth.token);
  const messages = useSelector((state) => state.messages.messages);

  const [state, setState] = useState({
    name: "",
    city: "",
    date: "",
    area: "",
    qrs: [],
  });

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

    dispatch({
      url: getUrl({ type: editEvent.type }),
      type: sagaEventCallBegan.type,
      payload: {
        ...nextState,
        date_picker: "",
      },
      method: "put",
      onSuccess: editEvent.type,
      token,
    });

    setState({ name: "", city: "", date: "", area: "", qrs: [] });
  }, [state, token]);

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
  }, [dispatch, location, event, token]);

  useEffect(() => {
    if (!isEmpty(messages)) {
      const newEvent = produce(event, (draftEvent) => {
        for (let qr of draftEvent.qrs) {
          for (let rsrc of qr.resources) {
            if (decodeURI(rsrc.url).includes("qrga.me/b/")) {
              for (let msg in messages) {
                if (rsrc.url.includes(msg)) {
                  rsrc.msg = messages[msg];
                }
              }
            }
          }
        }
      });
      setState({
        ...state,
        ...newEvent,
      });
    }
  }, [messages, event]);

  useEffect(() => {
    const [day, months, years] = event.date.split("-");
    const date = `${months}-${day}-${years}`;
    const qrs = [...state.qrs, ...event.qrs].map((qr) => {
      return {
        ...qr,
        resources: qr.resources
          .map((rsrc, i) => {
            return {
              ...rsrc,
              number: i + 1,
              isCommand: qr.team,
            };
          })
          .sort((a, b) => a.number - b.number),
      };
    });
    if (event.name) {
      setState({
        ...state,
        ...event,
        qrs,
        date_picker: new Date(date),
      });
    }
    for (let qr of event.qrs) {
      dispatch({
        url: getUrl({ type: getMessages.type, id: qr.qr_suffix }),
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: getMessages.type,
        onError: fetchMessageError.type,
        token,
      });
    }
  }, [event]);

  useEffect(() => {
    if (isUpdated) {
      history.push("/admin");
    }
  }, [isUpdated]);

  useEffect(() => {
    return () => {
      dispatch({
        type: clearMessage.type,
      });
    };
  }, []);

  return (
    <Event
      onUpdateState={setState}
      state={state}
      onSend={handleOnSubmit}
      title="Редактировать мероприятие"
      {...parametres}
    />
  );
});
