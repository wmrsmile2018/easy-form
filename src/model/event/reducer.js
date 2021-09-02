import { takeEvery, call, put } from "redux-saga/effects";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { sagaEventCallBegan } from "./saga";

const envBaseUrl = process.env.REACT_APP_BASE_URL;

const initialState = {
  isSuffixExist: false,
  isUrlExist: false,
  events: [],
  isCreated: false,
  error: {},
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
      state.isCreated = action.payload.success;
    },
    checkSuffix(state, action) {
      state.isSuffixValid = action.payload.exist;
    },
    checkUrl(state, action) {
      state.isUrlValid = action.payload.exist;
    },
    fetchError(state, action) {
      state.error = action.payload;
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
    yield put(fetchError({ payload: error.response }));
  }
}

export function* watchEventSaga() {
  yield takeEvery(sagaEventCallBegan.type, api);
}
