import { fork, takeEvery, call, put } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

////// for testing using json server
const envBaseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCALHOST
    : process.env.REACT_APP_BASE_URL;

export const sagaEventCallBegan = createAction("saga/eventCallBegan");

const fetchApi = async ({ baseURL, url, method, data }) =>
  await axios.request({
    baseURL,
    url,
    method,
    data,
  });

const getOptions = ({ url, method, data = null, baseURL = envBaseUrl }) => ({
  baseURL,
  url,
  method,
  data,
});

function* requestExecutor(action) {
  const { url, method, onSuccess, onError, payload, baseURL } = action;

  const options = getOptions({
    baseURL,
    url,
    method,
    data: payload,
  });

  try {
    const res = yield call(fetchApi, options);
    yield put({
      type: onSuccess,
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: onError,
      payload: error.response,
    });
  }
}

function* watchEventSaga() {
  yield takeEvery(sagaEventCallBegan.type, requestExecutor);
}

export function* rootSaga() {
  yield fork(watchEventSaga);
}
