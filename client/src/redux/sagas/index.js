import { all } from "redux-saga/effects";
import { watchUsersAsync } from "./products";

export function* rootSaga() {
    yield all([
        watchUsersAsync()
    ])
}