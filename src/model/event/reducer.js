import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSuffixExist: false,
  isUrlExist: false,
  events: [],
  deletedEvents: [],
  isCreated: false,
  event: {},
  isDeletedActive: {},
  isDeletedMarked: {},
  isRestored: {},
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
    getEvents(state, action) {
      state.events = action.payload;
    },
    getDeletedEvents(state, action) {
      state.deletedEvents = action.payload;
    },
    getQRs(state, action) {
      state.QRs = action.payload;
    },
    deleteActiveEvent(state, action) {},
    deleteMarkedEvent(state, action) {},
    restoreEvent(state, action) {},
    getInfoById(state, action) {},

    fetchError(state, action) {
      state.error = action.payload;
    },
  },
});

export default eventSlice.reducer;

export const {
  createEvent,
  checkSuffix,
  checkUrl,
  fetchError,
  getEvents,
  getDeletedEvents,
  getQRs,
  deleteActiveEvent,
  deleteMarkedEvent,
  restoreEvent,
  getInfoById,
} = eventSlice.actions;
