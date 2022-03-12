import { createSlice } from "@reduxjs/toolkit";
import { sagaEventCallBegan, sagaEventCallFail, sagaEventCallSuccess } from "../saga";

const initialState = {
  messages: {},
  error: {},
  status: false,
};

const eventSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getMessages(state, action) {
      state.messages = action.payload.reduce(
        (acc, cur) => {
          acc[cur.page] = cur.msg;
          return acc;
        },
        { ...state.messages },
      );
    },
    setMessage(state) {
      state.status = true;
    },
    clearMessage(state) {
      state.messages = {};
    },
    fetchMessageError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sagaEventCallBegan, (state) => {
      state.status = false;
    });
    builder.addCase(sagaEventCallSuccess, (state) => {
      state.status = true;
    });
    builder.addCase(sagaEventCallFail, (state) => {
      state.status = false;
    });
  },
});

export default eventSlice.reducer;

export const { getMessages, fetchMessageError, setMessage, clearMessage } = eventSlice.actions;
