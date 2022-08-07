import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productlist from "./redux/slice/productlist";
import singleProductlist from "./redux/slice/singleProductlist";
import cartlist from "./redux/slice/cartlist";
import userReducer from "./redux/slice/login";
import createSagaMiddleware from "@redux-saga/core";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { rootSaga } from "./redux/sagas";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  productlist,
  singleProductlist,
  cartlist,
  userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(
      sagaMiddleware
    ),
});
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
