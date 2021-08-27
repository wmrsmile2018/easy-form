import React, { useState, useCallback } from "react";
import clsx from "clsx";
import key from "weak-key";
import produce from "immer";

import { Input } from "../../components/input";
import { MarginGroup } from "../../components/marginGroup/marginGroup";
import { Button } from "../../components/button";
import { InfoBlock } from "../../components/infoBlock/infoBlock";
import { Modal } from "../../components/modal";
import { Popup } from "../../components/popup/popup";

import "./addEvent.scss";

const inputFields1 = [
  { name: "city", title: "Введите город" },
  { name: "event", title: "Введите название мероприятия" },
];

const inputFields2 = [
  { name: "date", title: "Введите дату мероприятия" },
  { name: "area", title: "Введите место" },
];

export const AddEvent = React.memo(({ className, onSend, state, onUpdateState }) => {
  const [popup, setPopup] = useState({
    curSuffix: 0,
    showPopup: false,
  });
  const classes = clsx("add-event", className);
  console.log(state);
  const handleOnAddSuffix = useCallback(() => {
    onUpdateState({
      ...state,
      QRs: [
        {
          id: Date.now(),
          "suffix": "",
          "team": "no",
          "resources": [],
        },
        ...state.QRs,
      ],
    });
  }, [state, onUpdateState]);

  const handleOnShowModal = useCallback((curSuffix) => {
    setPopup({
      curSuffix,
      showPopup: true,
    });
  }, []);

  const handleOnHideModal = useCallback(
    (data) => {
      const nextState = produce(state, (draftState) => {
        const Qr = draftState.QRs.find((el) => el.id === popup.curSuffix);
        Qr.resources = [data, ...Qr.resources];
      });

      onUpdateState(nextState);

      setPopup({
        curSuffix: 0,
        showPopup: false,
      });
    },
    [state, onUpdateState, popup],
  );

  const handleOnChangeSuffix = useCallback(
    (curSuffix, { target }) => {
      const nextState = produce(state, (draftState) => {
        console.log(curSuffix, state.QRs);
        const Qr = draftState.QRs.find((el) => el.id === curSuffix);
        Qr.suffix = target.value;
      });
      onUpdateState({
        ...nextState,
      });
    },
    [state, onUpdateState],
  );

  const handleOnCheck = useCallback(
    (curSuffix, { target }) => {
      const nextState = produce(state, (draftState) => {
        console.log(curSuffix, state.QRs);
        const Qr = draftState.QRs.find((el) => el.id === curSuffix);
        Qr.team = target.checked ? "yes" : "no";
      });
      onUpdateState(nextState);
    },
    [state, onUpdateState],
  );

  const handleOnChange = useCallback(
    ({ target }) => {
      onUpdateState({
        ...state,
        [target.name]: target.value,
      });
    },
    [state, onUpdateState],
  );

  const handleOnRemoveSuffix = useCallback(
    (curSuffix) => {
      onUpdateState({
        ...state,
        QRs: state.QRs.filter((el) => el.id !== curSuffix),
      });
    },
    [state, onUpdateState],
  );

  const handleOnRemoveResource = useCallback(
    (curSuffix, curRes) => {
      console.log(curRes, curSuffix);
      const nextState = produce(state, (draftState) => {
        console.log(curSuffix, state.QRs);
        const Qr = draftState.QRs.find((el) => el.id === curSuffix);
        Qr.resources = Qr.resources.filter((el) => el.id !== curRes);
      });
      onUpdateState(nextState);
    },
    [state, onUpdateState],
  );

  return (
    <div className={classes}>
      <Modal show={popup.showPopup}>
        <Popup onAdd={handleOnHideModal} />
      </Modal>
      <MarginGroup gap={30} isColumn>
        <MarginGroup gap={30} className="add-event__input-fields">
          {inputFields1.map((el) => (
            <Input key={key(el)} name={el.name} title={el.title} onChange={handleOnChange} />
          ))}
        </MarginGroup>
        <MarginGroup gap={30} className="add-event__input-fields">
          {inputFields2.map((el) => (
            <Input key={key(el)} name={el.name} title={el.title} onChange={handleOnChange} />
          ))}
        </MarginGroup>
        <MarginGroup gap={20}>
          <Button className="add-event__add-suffix" onClick={handleOnAddSuffix}>
            Добавить суффикс на URL
          </Button>
          <Button className="add-event__send" onClick={onSend}>
            Отправить
          </Button>
        </MarginGroup>

        <MarginGroup gap={20} isColumn>
          {state.QRs.map((el) => (
            <InfoBlock
              value={el.suffix}
              key={el.id}
              onChange={(e) => handleOnChangeSuffix(el.id, e)}
              onClick={() => handleOnShowModal(el.id)}
              resources={el.resources}
              onCheck={(e) => handleOnCheck(el.id, e)}
              checked={el.team === "yes" ? true : false}
              onDelete={() => handleOnRemoveSuffix(el.id)}
              onDeleteResource={(curRes) => handleOnRemoveResource(el.id, curRes)}
            />
          ))}
        </MarginGroup>
      </MarginGroup>
    </div>
  );
});
