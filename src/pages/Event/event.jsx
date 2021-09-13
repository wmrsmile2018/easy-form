import React, { useState, useCallback, useRef, useEffect } from "react";
import clsx from "clsx";
import key from "weak-key";
import produce from "immer";
import dayjs from "dayjs";

import { Input } from "../../components/input";
import { MarginGroup } from "../../components/marginGroup/marginGroup";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Popup } from "../../components/popup/popup";
import { InputDate } from "../../components/datePicker/datePicker";

import { useOnClickOutside } from "../../utils/useHooks";

import "./event.scss";
import { InfoBlockWrapper } from "./infoBlockWrapper";
import { PopupWrapper } from "./popupWrapper";
import { Title } from "../../components/title";

const regex = /^[a-zA-Z\d]+$/;

const inputFields1 = [
  { name: "city", title: "Введите город" },
  { name: "name", title: "Введите название мероприятия" },
];

export const Event = React.memo(({ className, onSend, state, onUpdateState, status, title }) => {
  const ref = useRef(null);
  const classes = clsx("event", className);
  // const [suffix, setSuffix] = useState({ id: "", value: "" });
  const [popup, setPopup] = useState({
    curSuffix: 0,
    showPopup: false,
    status: "add",
    isExist: false,
    state: {},
  });

  useOnClickOutside(ref, () => {
    setPopup({
      curSuffix: 0,
      showPopup: false,
    });
  });

  const handleOnAddSuffix = useCallback(() => {
    onUpdateState({
      ...state,
      qrs: [
        ...state.qrs,
        {
          status,
          id: Date.now().toString(),
          "suffix": "",
          "team": "no",
          "resources": [],
        },
      ],
    });
  }, [state, onUpdateState, status]);

  const handleOnShowModal = (curSuffix) => {
    setPopup({
      curSuffix,
      showPopup: true,
      status,
      state: {},
    });
  };

  const handleOnHideModal = useCallback(
    (data) => {
      const tmpAllRes = state.qrs.reduce((acc, cur) => {
        const tmp = cur.resources.map((el) => el.url);
        return [...acc, ...tmp];
      }, []);
      if (!tmpAllRes.find((el) => el === data.url)) {
        const nextState = produce(state, (draftState) => {
          const Qr = draftState.qrs.find((el) => el.id === popup.curSuffix);
          Qr.resources = [...Qr.resources, data];
        });

        onUpdateState(nextState);

        setPopup({
          curSuffix: 0,
          showPopup: false,
        });
      } else {
        setPopup({
          ...popup,
          isExist: true,
        });
      }
    },
    [state, onUpdateState, popup],
  );

  const handleOnChangeSuffix = (curSuffix, { target }) => {
    const isValid = regex.test(target.value);
    console.log(isValid, target.value, regex);
    if (target.value === "" || isValid) {
      const nextState = produce(state, (draftState) => {
        const Qr = draftState.qrs.find((el) => el.id === curSuffix);
        Qr.suffix = target.value;
      });
      onUpdateState({
        ...nextState,
      });
      console.log("i am here", target.value === "" || isValid);
    }
  };

  const handleOnCheck = (curSuffix, { target }) => {
    const nextState = produce(state, (draftState) => {
      const Qr = draftState.qrs.find((el) => el.id === curSuffix);
      Qr.team = target.checked ? "yes" : "no";
    });
    onUpdateState(nextState);
  };

  const handleOnChange = useCallback(
    ({ target }) => {
      onUpdateState({
        ...state,
        [target.name]: target.value,
      });
    },
    [state, onUpdateState],
  );

  const handleOnRemoveSuffix = (curSuffix) => {
    onUpdateState({
      ...state,
      qrs: state.qrs.filter((el) => el.id !== curSuffix),
    });
  };

  const handleOnRemoveResource = (curSuffix, curRes) => {
    const nextState = produce(state, (draftState) => {
      const Qr = draftState.qrs.find((el) => el.id === curSuffix);
      Qr.resources = Qr.resources.filter((el) => el.id !== curRes);
    });
    onUpdateState(nextState);
  };

  const handleOnShowEditResource = (curSuffix, curRes) => {
    const Qr = state.qrs.find((el) => el.id === curSuffix);
    const tmpResourse = Qr.resources.find((el) => el.id === curRes);
    setPopup({
      ...popup,
      curSuffix,
      showPopup: true,
      status: "edit",
      state: tmpResourse,
    });
  };

  const handleOnEditResource = useCallback(
    (data) => {
      const tmpAllRes = state.qrs.reduce((acc, cur) => {
        const tmp = cur.resources.map((el) => el.url);
        return [...acc, ...tmp];
      }, []);
      const curQr = state.qrs.find((el) => el.id === popup.curSuffix);
      const curRes = curQr.resources.find((el) => el.id === data.id);

      if (curRes.url === data.url || !tmpAllRes.find((el) => el === data.url)) {
        const nextState = produce(state, (draftState) => {
          const Qr = draftState.qrs.find((el) => el.id === popup.curSuffix);
          const resource = Qr.resources.find((el) => el.id === data.id);
          resource.url = data.url;
          resource.people_count = data.people_count;
        });

        onUpdateState(nextState);
        setPopup({
          curSuffix: 0,
          showPopup: false,
        });
      } else {
        setPopup({
          ...popup,
          isExist: true,
        });
      }
    },
    [popup, state, onUpdateState],
  );

  const handleOnDatePicked = useCallback(
    (data) => {
      onUpdateState({
        ...state,
        [data.name]: dayjs(data.value).format("DD-MM-YYYY"),
        [`${data.name}_picker`]: data.value,
      });
    },
    [state, onUpdateState],
  );

  return (
    <div className={classes}>
      <Title>{title}</Title>
      <Modal show={popup.showPopup}>
        <PopupWrapper
          popupRef={ref}
          onAdd={handleOnHideModal}
          onEdit={handleOnEditResource}
          status={popup.status}
          data={popup.state}
          isExist={popup.isExist}
        />
      </Modal>
      <MarginGroup gap={30} isColumn>
        <MarginGroup gap={30} className="event__input-fields">
          {inputFields1.map((el) => (
            <Input
              key={key(el)}
              name={el.name}
              title={el.title}
              onChange={handleOnChange}
              value={state[el.name]}
            />
          ))}
        </MarginGroup>
        <MarginGroup gap={30} className="event__input-fields">
          <InputDate
            style={popup.showPopup ? { zIndex: -1 } : { zIndex: 0 }}
            title="Введите дату мероприятия"
            onChange={handleOnDatePicked}
            format="dd-MM-yyyy"
            value={state.date_picker}
            name={"date"}
          />
          <Input
            name={"area"}
            title={"Введите место"}
            onChange={handleOnChange}
            value={state.area}
          />
        </MarginGroup>

        <MarginGroup gap={20}>
          <Button className="event__suffix" onClick={handleOnAddSuffix}>
            Добавить суффикс на URL
          </Button>
          <Button className="event__send" onClick={onSend}>
            Отправить
          </Button>
        </MarginGroup>

        <MarginGroup gap={20} isColumn>
          {state.qrs.map((el) => (
            <InfoBlockWrapper
              id={el.id}
              key={el.id}
              qrs={state.qrs}
              suffix={el.qr_suffix}
              value={el.qr_suffix}
              resources={el.resources}
              checked={el.team === "yes" ? true : false}
              onClick={() => handleOnShowModal(el.id)}
              onCheck={(e) => handleOnCheck(el.id, e)}
              onDelete={() => handleOnRemoveSuffix(el.id)}
              onChange={(e) => handleOnChangeSuffix(el.id, e)}
              onDeleteResource={(curRes) => handleOnRemoveResource(el.id, curRes)}
              onEditResource={(curRes) => handleOnShowEditResource(el.id, curRes)}
            />
          ))}
        </MarginGroup>
      </MarginGroup>
    </div>
  );
});
