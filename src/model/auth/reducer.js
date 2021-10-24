import { createSlice } from "@reduxjs/toolkit";
// import { sagaEventCallBegan, sagaEventCallFail, sagaEventCallSuccess } from "../saga";

const initialState = {
  token: "",
  success: "",
  text: "",
  error: {},
  status: "",
};

const authSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    authorisation(state, action) {
      state.token = action.payload.token;
      state.text = action.payload.text;
      state.success = action.payload.success;
      state.role = action.payload.role;
      state.status = action.payload.role;
    },
    authorisationFailed(state, action) {
      state.status = action.payload;
    },
    fetchError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(sagaEventCallBegan, (state) => {});
    // builder.addCase(sagaEventCallSuccess, (state) => {});
    // builder.addCase(sagaEventCallFail, (state) => {});
  },
});

export default authSlice.reducer;

export const { fetchError, authorisation, authorisationFailed } = authSlice.actions;
