import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Popup } from "../../components/popup/popup";
import { checkUrl, fetchError } from "../../model/event/reducer";
import { sagaEventCallBegan } from "../../model/saga";
import { useDebounce } from "../../utils/useHooks";

const isDev = process.env.NODE_ENV === "development";
// const url = isDev ? "/existUrl" : `/searchUrlInDB?id=${state.id}&&suffix=${state.url}`;

const getUrl = (state) => {
  return isDev ? "/existUrl" : `/searchUrlInDB?id=${state.id}&&suffix=${state.url}`;
};

export const PopupWrapper = ({ status, data, onAdd, onEdit, isExist, ...rest }) => {
  const dispatch = useDispatch();
  const [isValid, setValid] = useState(true);
  const [state, setState] = useState({
    url: "",
    people_count: "",
    id: "",
    ...data,
  });
  const [activeBtn, setActiveBtn] = useState(true);
  const debouncedSearchTerm = useDebounce(state.url, 1000);
  const label = useMemo(
    () => (status === "edit" ? "Изменить внешний ресурс" : "Добавить внешний ресурс"),
    [status],
  );
  const isUrlExist = useSelector((state) => state.event.isUrlExist);

  const handleOnAdd = useCallback(() => {
    const { url, people_count } = state;
    if (status === "add") onAdd({ url, people_count, id: Date.now().toString() });
    if (status === "edit") onEdit(state);

    if (isExist) {
      setState({ url: "", people_count: "" });
    }
  }, [state, onAdd, onEdit, status, isExist]);

  useEffect(() => {
    setState({ ...state, ...data });
  }, [data]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch({
        url: `/searchUrlInDB?id=${state.id}&&suffix=${state.url}`,
        type: sagaEventCallBegan.type,
        method: "get",
        onSuccess: checkUrl.type,
        onError: fetchError.type,
      });
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setValid(!isUrlExist);
    setActiveBtn(!isUrlExist);
  }, [isUrlExist]);

  useEffect(() => {
    setValid(!isExist);
    setActiveBtn(!isExist);
  }, [isExist]);

  return (
    <Popup
      state={state}
      onAdd={handleOnAdd}
      onUpdateState={setState}
      isValid={isValid}
      buttunLabel={label}
      disabled={!activeBtn}
      {...rest}
    />
  );
};
