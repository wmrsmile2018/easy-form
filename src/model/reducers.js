import { combineReducers } from "redux";

import event from "./event/reducer";
import auth from "./auth/reducer";
import messages from "./messages/reducer";

const appReducer = combineReducers({ event, auth, messages });

export function rootReducer(state, action) {
  if (action.type === "CLEAR_STORE") {
    state = undefined;
  }

  return appReducer(state, action);
}
