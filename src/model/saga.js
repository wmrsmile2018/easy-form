import { fork, takeEvery, call, put } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
////// for testing using json server
const envBaseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCALHOST
    : process.env.REACT_APP_BASE_URL;

import { authorisationFailed } from "./auth/reducer";
// import { sagaEventCallBegan, sagaEventCallFail, sagaEventCallSuccess } from "../saga";

export const sagaEventCallBegan = createAction("saga/eventCallBegan");
export const sagaEventCallSuccess = createAction("saga/eventCallSuccess");
export const sagaEventCallFail = createAction("saga/eventCallFail");

const fetchApi = async ({ baseURL, url, method, data, token }) =>
  await axios.request({
    baseURL,
    url,
    method,
    data,
    headers: {
      authToken: token,
    },
  });

const getOptions = ({ url, method, data = null, baseURL = envBaseUrl, token = "" }) => ({
  baseURL,
  url,
  method,
  data,
  token,
});

function* requestExecutor(action) {
  const { url, method, onSuccess, onError, payload, baseURL, token } = action;
  const options = getOptions({
    baseURL,
    url,
    method,
    data: payload,
    token,
  });

  try {
    const res = yield call(fetchApi, options);
    yield put({
      type: onSuccess,
      payload: res.data,
    });
    yield put({ type: sagaEventCallSuccess.type });
  } catch (error) {
    console.log(error.response.status);
    yield put({
      type: onError,
      payload: { data: error.response.data, status: error.response.status },
    });
    yield put({ type: sagaEventCallFail.type });
    yield put({ type: authorisationFailed.type, payload: error.response.status });
    if (error.response.status === 401) {
      // yield put({ type: "CLEAR_STORE" });
    }
  }
}

function* watchEventSaga() {
  yield takeEvery(sagaEventCallBegan.type, requestExecutor);
}

export function* rootSaga() {
  yield fork(watchEventSaga);
}
