import { getProductListsAPI, getSingleProductAPI } from "../../apis/index";
import { getProductlistSlice } from "../slice/productlist";
import * as types from "../actions";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { getSingleProductSlice } from "../slice/singleProductlist";
import { loginSaga, logoutSaga } from "./authenticationSaga";
import {
  removeAllCartListItemSlice,
  decreaseCartSlice,
  getCartlistSlice,
  increaseCartSlice,
  removeCartlistSlice,
  totalProductPriceSlice,
} from "../slice/cartlist";

export function* getProductListsSaga() {
  const users = yield getProductListsAPI();
  yield put(getProductlistSlice(users.data));
}

export function* getSingleProductSaga(action) {
  const products = yield getSingleProductAPI(action.id);
  yield put(getSingleProductSlice(products.data));
}

export function* getCartListProductSaga(action) {
  yield put(getCartlistSlice(action.detail));
}
export function* removeCartListProductSaga(action) {
  yield put(removeCartlistSlice(action.id));
}

export function* removeAllCartListProduct() {
  yield put(removeAllCartListItemSlice());
}
export function* incCartListProductSaga(action) {
  yield put(increaseCartSlice(action.id));
}

export function* decCartListProductSaga(action) {
  yield put(decreaseCartSlice(action.id));
}
export function* totalCartListPriceSaga() {
  yield put(totalProductPriceSlice());
}

export function* watchUsersAsync() {
  yield takeEvery(types.GET_PRODUCT_LISTS, getProductListsSaga);
  yield takeEvery(types.GET_SINGLE_PRODUCT, getSingleProductSaga);
  yield takeEvery(types.GET_CART_LIST_PRODUCT, getCartListProductSaga);
  yield takeEvery(types.REMOVE_CART_LIST_PRODUCT, removeCartListProductSaga);
  yield takeEvery(types.INC_CART_LIST_PRODUCT, incCartListProductSaga);
  yield takeEvery(types.DEC_CART_LIST_PRODUCT, decCartListProductSaga);
  yield takeEvery(types.TOTAL_CART_LIST_PRICE, totalCartListPriceSaga);
  yield takeLatest(
    types.REMOVE_ALL_CART_LIST_PRODUCT,
    removeAllCartListProduct
  );
  yield takeLatest(types.LOGIN_USER, loginSaga);
  yield takeLatest(types.LOGOUT_USER, logoutSaga);
}
