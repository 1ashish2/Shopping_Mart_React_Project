import React, { useEffect } from "react";
import Navigation from "./constant/Navigation.constant";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { get } from "./apis/axios-request";
import { Navigate } from "react-router-dom";
import "./App.scss";
const ProductList = React.lazy(() => import("./pages/productList.page"));
const ProductDetail = React.lazy(() => import("./pages/productDetail.page"));
const Cart = React.lazy(() => import("./pages/cart.page"));
const LoginPage = React.lazy(() => import("./pages/login.page"));

function App() {
  useEffect(() => {
    const getCsrfToken = async () => {
      await get("/csrf-token");
    };
    getCsrfToken();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <React.Suspense fallback={<div>Loading</div>}>
                <ProductList />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <React.Suspense fallback={<div>Loading</div>}>
                <Cart />
              </React.Suspense>
            }
          />
          <Route
            exact
            path="/productDetail"
            element={
              <React.Suspense fallback={<div>Loading</div>}>
                <ProductDetail />
              </React.Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<div>Loading</div>}>
                <LoginPage />
              </React.Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
