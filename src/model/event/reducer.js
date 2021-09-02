import { takeEvery, call, put } from "redux-saga/effects";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { sagaEventCallBegan, sagaEventCallSuccess, sagaEventCallFailed } from "./saga";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

const envBaseUrl = process.env.REACT_APP_BASE_URL;

const initialState = {
  isSuffixValid: false,
  isUrlValid: false,
};

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

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createEvent(state, action) {
      console.log(action);
    },
    checkSuffix(state, action) {
      console.log("hello", action.payload);
    },
    checkUrl(state, action) {},
    fetchError(state, action) {
      console.log("error");
    },
  },
});

export default eventSlice.reducer;

export const { createEvent, checkSuffix, checkUrl, fetchError } = eventSlice.actions;

function* api(action) {
  const { url, method, onSuccess, payload, baseURL } = action;

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
    yield put(fetchError("error"));
  }
}

export function* watchEventSaga() {
  yield takeEvery(sagaEventCallBegan.type, api);
}
