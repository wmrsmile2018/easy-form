import { createSlice } from "@reduxjs/toolkit";
import { sagaEventCallBegan, sagaEventCallFail, sagaEventCallSuccess } from "../saga";

const initialState = {
  isSuffixExist: {
    exist: false,
  },
  isUrlExist: {
    exist: false,
  },
  events: [],
  deletedEvents: [],
  isCreated: {
    success: false,
  },
  event: {
    "name": "",
    "city": "",
    "date": "",
    "area": "",
    "peopleCount": "",
    "qrs": [],
  },
  isDeletedActive: {},
  isDeletedMarked: {},
  isRestored: {},
  error: {},
  status: false,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createEvent(state, action) {
      state.isCreated = action.payload;
    },
    editEvent(state, action) {},
    checkSuffix(state, action) {
      state.isSuffixExist = action.payload;
    },
    checkUrl(state, action) {
      state.isUrlExist = action.payload;
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
    deleteActiveEvent(state) {
      state.isDeletedActive = action.payload;
    },
    deleteMarkedEvent(state, action) {
      state.isDeletedMarked = action.payload;
    },
    restoreEvent(state, action) {
      state.isRestored = action.payload;
    },
    getInfoById(state, action) {
      state.event = action.payload;
    },
    fetchError(state, action) {
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
  editEvent,
} = eventSlice.actions;
