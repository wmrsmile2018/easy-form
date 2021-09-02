import { combineReducers } from "redux";

import event from "./event/reducer";

const appReducer = combineReducers({ event });

export function rootReducer(state, action) {
  if (action.type === "CLEAR_STORE") {
    state = undefined;
  }

  return appReducer(state, action);
}
