import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as reactRedux from "react-redux";
import ProductDetail from "../../pages/productDetail.page";
import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";

afterEach(() => {
  cleanup();
});
const middlewares = [];
const mockStore = configureStore(middlewares);
describe("Navigation container Component", () => {
  let initialState = {
    singleProductlist: {
      0: [
        {
          name: "Fresho Kiwi - Green, 3 pcs",
          imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
          description:
            "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
          price: 87,
          stock: 90,
          totalStock: 90,
          amountQty: 3,
          qty: "pcs",
          count: 10,
          category: "5b6899953d1a866534f516e2",
          sku: "fnw-kiwi-3",
          id: "5b6c6a7f01a7c38429530883",
        },
      ],
    },
    userReducer: {
      response: {
        userId: "122",
        username: "Harshit",
      },
    },
    cartlist: {
      cartItemList: [
        {
          name: "Fresho Kiwi - Green, 3 pcs",
          imageURL: "/static/images/products/fruit-n-veg/kiwi-green.jpg",
          description:
            "Kiwis are oval shaped with a brownish outer skin. The flesh is bright green and juicy with tiny, edible black seeds.",
          price: 87,
          stock: 90,
          totalStock: 90,
          amountQty: 3,
          qty: "pcs",
          count: 90,
          category: "5b6899953d1a866534f516e2",
          sku: "fnw-kiwi-3",
          id: "5b6c6a7f01a7c38429530883",
        },
      ],
    },
  };

  it("product detail page empty cart testing", () => {
    const initialState = {
      singleProductlist: { 0: [] },
      userReducer: {
        response: {
          userId: "122",
          username: "Harshit",
        },
      },
      cartlist: { cartItemList: [] },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ProductDetail />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    const addProduct = screen.getByTestId("addProduct");
    fireEvent.click(addProduct);
  });

  it("product detail page testing", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ProductDetail />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    const addProduct = screen.getByTestId("addProduct");
    fireEvent.click(addProduct);
  });

  it("input field check in product detail page", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <ProductDetail />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    const inputEl = screen.getByTestId("input");
    fireEvent.change(inputEl, { target: { value: 110 } });
    expect(inputEl.value).toBe("110");
  });
});
