import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSuffixExist: false,
  isUrlExist: false,
  events: [],
  isCreated: false,
  error: {},
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createEvent(state, action) {
      state.isCreated = action.payload.success;
    },
    checkSuffix(state, action) {
      state.isSuffixExist = action.payload.exist;
    },
    checkUrl(state, action) {
      state.isUrlExist = action.payload.exist;
    },
    fetchError(state, action) {
      state.error = action.payload;
    },
  },
});

export default eventSlice.reducer;

export const { createEvent, checkSuffix, checkUrl, fetchError } = eventSlice.actions;
