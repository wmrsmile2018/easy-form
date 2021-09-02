import { all } from "redux-saga/effects";

import { watchEventSaga } from "./event/reducer";

export function* rootSaga() {
  yield all([watchEventSaga()]);
}
