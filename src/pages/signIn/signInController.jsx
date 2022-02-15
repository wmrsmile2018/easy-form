import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sagaEventCallBegan } from "../../model/saga";
import { authorisation, userFetchError } from "../../model/auth/reducer";
import { SignIn } from "./signIn";
import { useHistory } from "react-router-dom";

// const isDev = process.env.NODE_ENV === "development";

// const getUrl = ({ type, id }) => {
//   switch (type) {
//     case authorisation.type:
//       return isDev ? `/login` : `/login`;
//   }
// };

export const SignInController = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
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
  useEffect(() => {
    if (!token) {
      history.push("/admin/sign-in");
    } else {
      history.push("/admin/");
    }
  }, [token]);

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
