import { createSlice } from "@reduxjs/toolkit";
import { sagaEventCallBegan, sagaEventCallFail, sagaEventCallSuccess } from "../saga";

const initialState = {
  isSuffixExist: {},
  isUrlExist: false,
  events: [],
  deletedEvents: [],
  isCreated: false,
  isUpdated: false,
  event: {
    "name": "",
    "city": "",
    "date": "",
    "area": "",
    "peopleCount": "",
    "qrs": [],
  },
  isDeletedActive: true,
  isDeletedMarked: true,
  isRestored: false,
  error: {},
  status: false,
  resetToZero: false,
  isUpdatedDefaultResource: false,
  defaultResource: "",
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    createEvent(state, action) {
      state.isCreated = action.payload.success;
    },
    getEventsFilters(state, action) {
      state.events = action.payload;
    },
    editEvent(state, action) {
      state.isUpdated = action.payload.success;
    },
    checkSuffix(state, action) {
      state.isSuffixExist = {
        ...state.isSuffixExist,
        [action.payload.suffix]: action.payload.exist,
      };
    },
    setToZero(state, action) {
      state.resetToZero = action.payload.success;
    },
    checkUrl(state, action) {
      state.isUrlExist = action.payload.exist;
    },
    // getEvents(state, action) {
    //   state.events = action.payload;
    // },
    // getDeletedEvents(state, action) {
    //   state.deletedEvents = action.payload;
    // },
    getDefaultResource(state, action) {
      state.defaultResource = action.payload.defaultResource;
    },
    updateDefaultResource(state, action) {
      state.isUpdatedDefaultResource = action.payload.success;
    },
    getQRs(state, action) {
      state.QRs = action.payload;
    },
    deleteActiveEvent(state, action) {
      state.isDeletedActive = action.payload.success;
    },
    deleteMarkedEvent(state, action) {
      state.isDeletedMarked = action.payload.success;
    },
    restoreEvent(state, action) {
      state.isRestored = action.payload.success;
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
      state.isCreated = false;
      state.isUpdated = false;
      state.isUpdatedDefaultResource = false;

      // state.isSuffixExist = false;
      // state.isUrlExist = false;
      state.isDeletedActive = false;
      state.isDeletedMarked = false;
      state.isRestored = false;
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
  // getEvents,
  // getDeletedEvents,
  getQRs,
  deleteActiveEvent,
  deleteMarkedEvent,
  restoreEvent,
  getInfoById,
  editEvent,
  setToZero,
  getEventsFilters,
  getDefaultResource,
  updateDefaultResource,
} = eventSlice.actions;
