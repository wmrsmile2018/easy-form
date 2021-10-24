import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sagaEventCallBegan } from "../../model/saga";
import { authorisation, userFetchError } from "../../model/auth/reducer";
import { SignIn } from "./signIn";

// const isDev = process.env.NODE_ENV === "development";

// const getUrl = ({ type, id }) => {
//   switch (type) {
//     case authorisation.type:
//       return isDev ? `/login` : `/login`;
//   }
// };

export const SignInController = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    login: "",
    password: "",
  });
  const text = useSelector((state) => state.auth.text);

  const handleOnChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleOnSumbit = () => {
    dispatch({
      url: `/login`,
      type: sagaEventCallBegan.type,
      method: "post",
      onSuccess: authorisation.type,
      onError: userFetchError.type,
      payload: state,
    });
    setState({
      login: "",
      password: "",
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch({
        url: `/login`,
        type: sagaEventCallBegan.type,
        method: "post",
        onSuccess: authorisation.type,
        onError: userFetchError.type,
        payload: state,
      });
      setState({
        login: "",
        password: "",
      });
    }
  };

  return (
    <SignIn
      text={text}
      onKeyDown={handleKeyDown}
      state={state}
      onChange={handleOnChange}
      onSubmit={handleOnSumbit}
    />
  );
};
