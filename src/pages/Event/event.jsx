import React, { useState, useCallback, useRef, useEffect } from "react";
import clsx from "clsx";
import key from "weak-key";
import produce from "immer";
import dayjs from "dayjs";

import { Input } from "../../components/input";
import { MarginGroup } from "../../components/marginGroup/marginGroup";
import { Button } from "../../components/button";
import { InfoBlock } from "../../components/infoBlock/infoBlock";
import { Modal } from "../../components/modal";
import { Popup } from "../../components/popup/popup";
import { InputDate } from "../../components/datePicker/datePicker";

import { useOnClickOutside, useDebounce } from "../../utils/useHooks";

import "./event.scss";

const regex = /^[a-zA-Z]+$/;

const inputFields1 = [
  { name: "city", title: "Введите город" },
  { name: "event", title: "Введите название мероприятия" },
];

export const Event = React.memo(({ className, onSend, state, onUpdateState, status }) => {
  const ref = useRef(null);
  const classes = clsx("event", className);
  const [suffix, setSuffix] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [popup, setPopup] = useState({
    curSuffix: 0,
    showPopup: false,
    status: "add",
    isExist: false,
    state: {},
  });
  const debouncedSearchTerm = useDebounce(suffix, 500);

  useEffect(() => {
    console.log(debouncedSearchTerm);
    if (debouncedSearchTerm) {
      // ...
    }
  }, [debouncedSearchTerm]);

  useOnClickOutside(ref, () => {
    setPopup({
      curSuffix: 0,
      showPopup: false,
    });
  });

  const handleOnAddSuffix = useCallback(() => {
    onUpdateState({
      ...state,
      QRs: [
        ...state.QRs,
        {
          status,
          id: Date.now(),
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
      const tmpAllRes = state.QRs.reduce((acc, cur) => {
        const tmp = cur.resources.map((el) => el.url);
        return [...acc, ...tmp];
      }, []);
      if (!tmpAllRes.find((el) => el === data.url)) {
        const nextState = produce(state, (draftState) => {
          const Qr = draftState.QRs.find((el) => el.id === popup.curSuffix);
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

    if (isValid) {
      const nextState = produce(state, (draftState) => {
        const Qr = draftState.QRs.find((el) => el.id === curSuffix);
        Qr.suffix = target.value;
      });
      setSuffix(target.value);
      onUpdateState({
        ...nextState,
      });
    }
  };

  const handleOnCheck = (curSuffix, { target }) => {
    const nextState = produce(state, (draftState) => {
      console.log(curSuffix, state.QRs);
      const Qr = draftState.QRs.find((el) => el.id === curSuffix);
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
      QRs: state.QRs.filter((el) => el.id !== curSuffix),
    });
  };

  const handleOnRemoveResource = (curSuffix, curRes) => {
    const nextState = produce(state, (draftState) => {
      const Qr = draftState.QRs.find((el) => el.id === curSuffix);
      Qr.resources = Qr.resources.filter((el) => el.id !== curRes);
    });
    onUpdateState(nextState);
  };

  const handleOnShowEditResource = (curSuffix, curRes) => {
    const Qr = state.QRs.find((el) => el.id === curSuffix);
    const tmpResourse = Qr.resources.find((el) => el.id === curRes);
    console.log(curSuffix);
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
      const tmpAllRes = state.QRs.reduce((acc, cur) => {
        const tmp = cur.resources.map((el) => el.url);
        return [...acc, ...tmp];
      }, []);
      const curQr = state.QRs.find((el) => el.id === popup.curSuffix);
      const curRes = curQr.resources.find((el) => el.id === data.id);

      if (curRes.url === data.url || !tmpAllRes.find((el) => el === data.url)) {
        const nextState = produce(state, (draftState) => {
          const Qr = draftState.QRs.find((el) => el.id === popup.curSuffix);
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
      <Modal show={popup.showPopup}>
        <Popup
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
            <Input key={key(el)} name={el.name} title={el.title} onChange={handleOnChange} />
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
          <Input name={"area"} title={"Введите место"} onChange={handleOnChange} />
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
          {state.QRs.map((el) => (
            <InfoBlock
              isValid={isValid}
              value={el.suffix}
              key={el.id}
              onChange={(e) => handleOnChangeSuffix(el.id, e)}
              onClick={() => handleOnShowModal(el.id)}
              resources={el.resources}
              onCheck={(e) => handleOnCheck(el.id, e)}
              checked={el.team === "yes" ? true : false}
              onDelete={() => handleOnRemoveSuffix(el.id)}
              onDeleteResource={(curRes) => handleOnRemoveResource(el.id, curRes)}
              onEditResource={(curRes) => handleOnShowEditResource(el.id, curRes)}
            />
          ))}
        </MarginGroup>
      </MarginGroup>
    </div>
  );
});
