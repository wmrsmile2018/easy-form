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
    "default_resource_people_count": "",
    "qrs": [],
    "general_default_resource_people_count": "",
    "default_resource_people_count": "",
    "deleted": false,
    "id": "",
  },
  isDeletedActive: true,
  isDeletedMarked: true,
  isRestored: false,
  error: {},
  status: false,
  resetToZero: false,
  defaultResource: "",
  users: [],
  isAddedUser: false,
  isDeletedUser: false,
  statisticStop: false,
  statisticUpdate: false,
  statisticStart: false,
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
    statisticStop(state) {
      state.statisticStop = true;
    },
    statisticUpdate(state) {
      state.statisticUpdate = true;
    },
    statisticStart(state) {
      state.statisticStart = true;
    },
    getDefaultResource(state, action) {
      state.defaultResource = action.payload;
    },
    updateDefaultResource(state, action) {
      state.defaultResource = action.payload;
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
    addUser(state, action) {
      state.isAddedUser = action.payload.success;
    },
    deleteUser(state, action) {
      state.isDeletedUser = action.payload.success;
    },
    getAllUsers(state, action) {
      state.users = action.payload;
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
      state.isAddedUser = false;
      state.isDeletedUser = false;
      // state.isSuffixExist = false;
      // state.isUrlExist = false;
      state.isDeletedActive = false;
      state.isDeletedMarked = false;
      state.isRestored = false;
      state.statisticStop = false;
      state.statisticUpdate = false;
      state.statisticStart = false;
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
  addUser,
  deleteUser,
  getAllUsers,
  statisticStop,
  statisticUpdate,
  statisticStart,
} = eventSlice.actions;
