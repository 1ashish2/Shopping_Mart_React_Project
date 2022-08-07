import { put, call } from "redux-saga/effects";
import {
  loginUserService,
  logoutUserService,
} from "../../services/authentication.service";

import * as types from "../actions";

export function* loginSaga(payload) {
  try {
    console.log("payload", payload);
    const response = yield call(loginUserService, payload);
    console.log(response);
    yield put({ type: types.LOGIN_USER_SUCCESS, response });
  } catch (error) {
    console.log(error);
    yield put({ type: types.LOGIN_USER_ERROR, error });
  }
}

export function* logoutSaga() {
  try {
    const response = yield call(logoutUserService);
    console.log(response);
    yield put({ type: types.LOGOUT_USER_SUCCESS, response });
  } catch (error) {
    console.log(error);
    yield put({ type: types.LOGOUT_USER_ERROR, error });
  }
}
