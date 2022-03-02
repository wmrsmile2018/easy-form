import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";

import { Popup } from "../../components/popup/popup";
// import { checkUrl, fetchError } from "../../model/event/reducer";
// import { sagaEventCallBegan } from "../../model/saga";
// import { useDebounce } from "../../utils/useHooks";

// const isDev = process.env.NODE_ENV === "development";
// const url = isDev ? "/existUrl" : `/searchUrlInDB?id=${state.id}&&suffix=${state.url}`;

// const getUrl = (state) => {
//   return isDev ? "/existUrl" : `/searchUrlInDB?id=${state.id}&&suffix=${state.url}`;
// };

// const getUrl = ({ type, state: { id, url } }) => {
//   switch (type) {
//     case checkUrl.type:
//       return isDev ? "/notExistUrl" : `/searchUrlInDB?id=${id}&&suffix=${url}`;
//   }
// };

export const PopupWrapper = ({ status, data, onAdd, onEdit, isExist, ...rest }) => {
  // const dispatch = useDispatch();
  // const [isValid, setValid] = useState(true);
  const [state, setState] = useState({
    isCommand: false,
    url: "",
    people_count: "",
    id: "",
    number: 0,
    name: "",
    additional_text: "",
    ...data,
  });

  // const [activeBtn, setActiveBtn] = useState(true);
  // const debouncedSearchTerm = useDebounce(state.url, 1000);
  const label = useMemo(
    () => (status === "edit" ? "Изменить внешний ресурс" : "Добавить внешний ресурс"),
    [status],
  );
  // const isUrlExist = useSelector((state) => state.event.isUrlExist);

  const handleOnAdd = useCallback(() => {
    const { url, people_count, number, name } = state;
    //лень рефакторить

    if (status === "add") {
      if (state.url.includes("https")) {
        onAdd({ url, people_count, name, number, id: `tmpId-${Date.now().toString()}` });
      } else {
        let isWithoutSsl = confirm("Уверены, что без ssl сертификата ?");
        if (isWithoutSsl) {
          onAdd({ url, people_count, name, number, id: `tmpId-${Date.now().toString()}` });
        }
      }
      setState({ url: "", people_count: "", id: "", number: 0, name: "" });
    }

    if (status === "edit") {
      if (state.url.includes("https")) {
        onEdit(state);
      } else {
        let isWithoutSsl = confirm("Уверены, что без ssl сертификата ?");
        if (isWithoutSsl) {
          onEdit(state);
        }
      }
    }
    if (isExist) {
      setState({ url: "", people_count: "", id: "", number: 0, name: "" });
    }
  }, [state, onAdd, onEdit, status, isExist]);

  useEffect(() => {
    setState({ ...state, ...data });
  }, [data]);

  // useEffect(() => {
  //   const { url, people_count, id } = state;
  //   const tmpId = id.split("-")[0] === "tmpId" ? "" : id;
  //   if (debouncedSearchTerm) {
  //     dispatch({
  //       url: getUrl({ type: checkUrl.type, state: { url, people_count, id: tmpId } }),
  //       type: sagaEventCallBegan.type,
  //       method: "get",
  //       onSuccess: checkUrl.type,
  //       onError: fetchError.type,
  //     });
  //   }
  // }, [debouncedSearchTerm]);

  // useEffect(() => {
  //   setValid(!isUrlExist);
  //   setActiveBtn(!isUrlExist);
  // }, [isUrlExist]);

  // useEffect(() => {
  //   setValid(!isExist);
  //   setActiveBtn(!isExist);
  // }, [isExist]);

  return (
    <Popup
      state={state}
      onAdd={handleOnAdd}
      onUpdateState={setState}
      isValid={true}
      buttunLabel={label}
      disabled={false}
      {...rest}
    />
  );
};
