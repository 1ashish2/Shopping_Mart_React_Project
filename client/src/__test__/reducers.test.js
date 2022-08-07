import userReducer from "../redux/slice/login";
import * as types from "../redux/actions";
import { store } from "../store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {
  loginUserAction,
  logoutUserAction,
} from "../redux/actions/authenticateActions";
let mock;

describe("UserReducer", () => {
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });
  it("should return default state when state is not defined", () => {
    expect(userReducer(undefined, { type: "ACTION_TYPE" })).toEqual([]);
  });
  it("should return state with error when login of user is successfull", async () => {
    let returnedData = {
      success: true,
      response: {
        userId: "123",
        username: "Harshit",
      },
    };
    mock.onPost("login").reply(200, returnedData);
    await store.dispatch(
      loginUserAction({ email: "harshit@gmail.com", password: "password1" })
    );
    await new Promise((r) => setTimeout(r, 200));
    const expectedUserSuccessState = {
      response: { userId: "123", username: "Harshit" },
      error: undefined,
    };
    expect(store.getState().userReducer).toEqual(expectedUserSuccessState);
  });
  it("should return state with error when login of user is unsuccessfull", async () => {
    let returnedData = { response: "Invalid email or password" };
    mock.onPost("login").reply(203, returnedData);
    await store.dispatch(
      loginUserAction({ email: "harshit@gmail.com", password: "password" })
    );
    await new Promise((r) => setTimeout(r, 200));
    const expectedUserSuccessState = {
      error: "Invalid email or password",
    };
    expect(store.getState().userReducer).toEqual(expectedUserSuccessState);
  });
  it("should return state with error when logout of user is successfull", async () => {
    const returnedData = {
      response: {
        message: "Logout successful",
      },
    };
    mock.onPost("logout").reply(200, returnedData);
    await store.dispatch(logoutUserAction());
    await new Promise((r) => setTimeout(r, 200));
    const expectedUserSuccessState = {
      response: null,
      error: null,
    };
    expect(store.getState().userReducer).toEqual(expectedUserSuccessState);
  });
  it("should return state with error when logout of user is unsuccessfull", async () => {
    const returnedData = {
      response: {
        message: "Something went wrong",
      },
    };
    mock.onPost("logout").reply(203, returnedData);
    await store.dispatch(logoutUserAction());
    await new Promise((r) => setTimeout(r, 200));
    const expectedUserSuccessState = {
      error: {
        message: "Something went wrong",
      },
    };
    expect(store.getState().userReducer).toEqual(expectedUserSuccessState);
    // const userErrorState = {
    //   type: types.LOGOUT_USER_ERROR,
    //   error: {
    //     message: "Something went wrong",
    //   },
    // };
    // const expectedUserErrorState = {
    //   error: {
    //     message: "Something went wrong",
    //   },
    // };
    // expect(userReducer(undefined, userErrorState)).toEqual(
    //   expectedUserErrorState
    // );
  });
});

describe("getCartlistSlice", () => {
  it("Should initially set cart item list to an empty array", () => {
    const state = store.getState();
    expect(state.cartlist.cartItemList).toEqual([]);
  });
  it("should return state with added item (Empty initial state)", () => {
    const detail = {
      amountQty: 4,
      id: "5b6c6aeb01a7c38429530884",
      input: 1,
      name: "Apple - Washington, Regular, 4 pcs",
      price: 187,
      stock: 50,
      totalStock: 50,
    };
    store.dispatch({ type: types.GET_CART_LIST_PRODUCT, detail });
    const state = store.getState();
    const expectedListData = {
      cartItemList: [
        {
          count: 1,
          show: true,
          amountQty: 4,
          id: "5b6c6aeb01a7c38429530884",
          input: 1,
          name: "Apple - Washington, Regular, 4 pcs",
          price: 187,
          stock: 50,
          totalStock: 50,
        },
      ],
    };
    expect(state.cartlist).toEqual(expectedListData);
  });
  it("should return state with added item (state with product)", () => {
    const detail = {
      amountQty: 4,
      id: "5b6c6aeb01a7c38429530884",
      input: 1,
      name: "Apple - Washington, Regular, 4 pcs",
      price: 187,
      stock: 50,
      totalStock: 50,
    };
    store.dispatch({ type: types.GET_CART_LIST_PRODUCT, detail });
    store.dispatch({ type: types.GET_CART_LIST_PRODUCT, detail });
    const state = store.getState();
    const expectedListData = {
      cartItemList: [
        {
          count: 1,
          show: true,
          amountQty: 4,
          id: "5b6c6aeb01a7c38429530884",
          input: 1,
          name: "Apple - Washington, Regular, 4 pcs",
          price: 187,
          stock: 50,
          totalStock: 50,
        },
      ],
    };
    expect(state.cartlist).toEqual(expectedListData);
  });
  it("should return state with removed item", () => {
    const expectedState = {
      cartItemList: [],
    };
    const detail = {
      amountQty: 4,
      id: "5b6c6aeb01a7c38429530884",
      input: 1,
      name: "Apple - Washington, Regular, 4 pcs",
      price: 187,
      stock: 50,
      totalStock: 50,
    };
    store.dispatch({ type: types.GET_CART_LIST_PRODUCT, detail });
    store.dispatch({
      type: types.REMOVE_CART_LIST_PRODUCT,
      id: "5b6c6aeb01a7c38429530884",
    });
    const actualState = store.getState();
    expect(actualState.cartlist).toEqual(expectedState);
  });
  it("Remove All Cart Items", () => {
    const detail = {
      amountQty: 4,
      id: "5b6c6aeb01a7c38429530884",
      input: 1,
      name: "Apple - Washington, Regular, 4 pcs",
      price: 187,
      stock: 50,
      totalStock: 50,
    };
    const expectedState = {
      cartItemList: [],
    };
    store.dispatch({ type: types.GET_CART_LIST_PRODUCT, detail });
    store.dispatch({ type: types.REMOVE_ALL_CART_LIST_PRODUCT });
    const state = store.getState();
    expect(state.cartlist).toEqual(expectedState);
  });
  it("Decrease Item Count(No data found)", () => {
    const expectedData = {
      cartItemList: [
        {
          count: 1,
          show: true,
          amountQty: 4,
          id: "5b6c6aeb01a7c38429530884",
          input: 1,
          name: "Apple - Washington, Regular, 4 pcs",
          price: 187,
          stock: 50,
          totalStock: 50,
        },
      ],
    };
    const detail = {
      amountQty: 4,
      id: "5b6c6aeb01a7c38429530884",
      input: 1,
      name: "Apple - Washington, Regular, 4 pcs",
      price: 187,
      stock: 50,
      totalStock: 50,
    };
    store.dispatch({ type: types.GET_CART_LIST_PRODUCT, detail });
    store.dispatch({
      type: types.DEC_CART_LIST_PRODUCT,
      id: "5b6c6aeb01a7c38429530883",
    });
    const actualState = store.getState();
    expect(actualState.cartlist).toEqual(expectedData);
  });
  it("Decrease Item Count(Only 1 amount available for the specified data)", () => {
    const expectedData = {
      cartItemList: [],
    };
    const detail = {
      amountQty: 4,
      id: "5b6c6aeb01a7c38429530884",
      input: 1,
      name: "Apple - Washington, Regular, 4 pcs",
      price: 187,
      stock: 50,
      totalStock: 50,
    };
    store.dispatch({ type: types.GET_CART_LIST_PRODUCT, detail });
    store.dispatch({
      type: types.DEC_CART_LIST_PRODUCT,
      id: "5b6c6aeb01a7c38429530884",
    });
    const actualState = store.getState();
    expect(actualState.cartlist).toEqual(expectedData);
  });
  it("Decrease Item Count(More than 1 amount available for the specified data)", () => {
    const expectedData = {
      cartItemList: [
        {
          count: 1,
          show: true,
          amountQty: 4,
          id: "5b6c6aeb01a7c38429530884",
          input: 2,
          name: "Apple - Washington, Regular, 4 pcs",
          price: 187,
          stock: 50,
          totalStock: 50,
        },
      ],
    };
    const detail = {
      amountQty: 4,
      id: "5b6c6aeb01a7c38429530884",
      input: 2,
      name: "Apple - Washington, Regular, 4 pcs",
      price: 187,
      stock: 50,
      totalStock: 50,
    };
    store.dispatch({ type: types.GET_CART_LIST_PRODUCT, detail });
    store.dispatch({
      type: types.DEC_CART_LIST_PRODUCT,
      id: "5b6c6aeb01a7c38429530884",
    });
    const actualState = store.getState();
    expect(actualState.cartlist).toEqual(expectedData);
  });
  it("Increase Item Count", () => {
    const expectedData = {
      cartItemList: [
        {
          count: 3,
          show: true,
          amountQty: 4,
          id: "5b6c6aeb01a7c38429530884",
          input: 2,
          name: "Apple - Washington, Regular, 4 pcs",
          price: 187,
          stock: 50,
          totalStock: 50,
        },
      ],
    };
    const detail = {
      amountQty: 4,
      id: "5b6c6aeb01a7c38429530884",
      input: 2,
      name: "Apple - Washington, Regular, 4 pcs",
      price: 187,
      stock: 50,
      totalStock: 50,
    };
    store.dispatch({ type: types.GET_CART_LIST_PRODUCT, detail });
    store.dispatch({
      type: types.INC_CART_LIST_PRODUCT,
      id: "5b6c6aeb01a7c38429530884",
    });
    const actualState = store.getState();
    expect(actualState.cartlist).toEqual(expectedData);
  });
  it("Total Cost Item", () => {
    const expectedData = {
      cartItemList: [
        {
          amountQty: 4,
          id: "5b6c6aeb01a7c38429530884",
          input: 2,
          name: "Apple - Washington, Regular, 4 pcs",
          price: 187,
          show: true,
          stock: 50,
          totalStock: 50,
          count: 1,
        },
      ],
      count: 1,
      total: 187,
    };
    const detail = {
      amountQty: 4,
      id: "5b6c6aeb01a7c38429530884",
      input: 1,
      name: "Apple - Washington, Regular, 4 pcs",
      price: 187,
      stock: 50,
      totalStock: 50,
    };

    store.dispatch({ type: types.GET_CART_LIST_PRODUCT, detail });
    store.dispatch({ type: types.TOTAL_CART_LIST_PRICE });
    const actualState = store.getState();
    expect(actualState.cartlist).toEqual(expectedData);
  });
});

describe("Get Product List", () => {
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });
  it("Product List", async () => {
    const data = [
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
        id: "5b6c6a7f01a7c38429530883",
      },
      {
        name: "Apple - Washington, Regular, 4 pcs",
        imageURL: "/static/images/products/fruit-n-veg/apple.jpg",
        description:
          "The bright red coloured and heart shaped Washington apples are crunchy, juicy and slightly sweet. Washington Apples are a natural source of fibre and are fat free.",
        price: 187,
        stock: 50,
        totalStock: 50,
        amountQty: 4,
        qty: "pcs",
        id: "5b6c6aeb01a7c38429530884",
      },
    ];
    mock.onGet("productlist").reply(200, data);
    await store.dispatch({ type: types.GET_PRODUCT_LISTS });
    await new Promise((r) => setTimeout(r, 200));

    const actualState = store.getState().productlist;
    expect(actualState).toEqual(data);
  });
  it("Single Product List", async () => {
    const pathRegex = new RegExp(`\productlist\/*`);
    const expectedData = {
      name: "Apple - Washington, Regular, 4 pcs",
      imageURL: "/static/images/products/fruit-n-veg/apple.jpg",
      description:
        "The bright red coloured and heart shaped Washington apples are crunchy, juicy and slightly sweet. Washington Apples are a natural source of fibre and are fat free.",
      price: 187,
      stock: 50,
      totalStock: 50,
      amountQty: 4,
      qty: "pcs",
      id: "5b6c6aeb01a7c38429530884",
    };

    mock.onGet(pathRegex).reply(200, expectedData);
    store.dispatch({
      type: types.GET_SINGLE_PRODUCT,
      id: "5b6c6aeb01a7c38429530884",
    });
    await new Promise((r) => setTimeout(r, 200));

    const actualState = store.getState();
    expect(actualState.singleProductlist).toEqual(expectedData);
    //   expect(actualState).toEqual(data);
  });
});
