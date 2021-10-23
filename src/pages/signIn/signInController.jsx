import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sagaEventCallBegan } from "../../model/saga";
import { authorisation, fetchError } from "../../model/auth/reducer";
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

  const handleOnChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleOnSumbit = () => {
    dispatch({
      url: `/login`,
      type: sagaEventCallBegan.type,
      method: "get",
      onSuccess: authorisation.type,
      onError: fetchError.type,
    });
  };

  return <SignIn state={state} onChange={handleOnChange} onSubmit={handleOnSumbit} />;
};
