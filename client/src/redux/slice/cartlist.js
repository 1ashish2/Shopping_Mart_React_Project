import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cartproducts",
  initialState: {
    cartItemList: [],
  },
  reducers: {
    getCartlistSlice(state, action) {
      let data =
        state.cartItemList.length > 0
          ? state.cartItemList.filter((list) => list.id === action.payload.id)
          : [];
      if (data.length > 0) {
        return {
          ...state,
          cartItemList: state.cartItemList.map((ele) => {
            if (ele.id === action.payload.id) {
              return { ...ele, count: action.payload.input, show: true };
            }
            return ele;
          }),
        };
      } else {
        return {
          ...state,
          cartItemList: state.cartItemList.concat({
            ...action.payload,
            count: action.payload.input,
            show: true,
          }),
        };
      }
    },
    removeCartlistSlice(state, action) {
      let remainingList = state.cartItemList.filter(
        (e) => e.id !== action.payload
      );
      return { ...state, cartItemList: [...remainingList] };
    },
    removeAllCartListItemSlice: (state) => {
      return { ...state, cartItemList: [] };
    },
    decreaseCartSlice: (state, action) => {
      const itemFound = state.cartItemList.find(
        (element) => element.id === action.payload
      );
      if (itemFound && itemFound.count === 1) {
        return {
          ...state,
          cartItemList: state.cartItemList.filter(
            (item) => item.id !== action.payload
          ),
        };
      } else if (itemFound && itemFound.count > 1) {
        return {
          ...state,
          cartItemList: state.cartItemList.map((item) => {
            if (item.id === action.payload) {
              return {
                ...item,
                // stock: item.stock + 1,
                count: item.count - 1,
              };
            }
            return item;
          }),
        };
      } else {
        console.log("Item not found !");
        return { ...state };
      }
    },
    increaseCartSlice: (state, action) => {
      let tempCarts = state.cartItemList.map((cartItem) => {
        if (cartItem.id === action.payload) {
          cartItem = {
            ...cartItem,
            // stock: cartItem.stock - 1,
            count: cartItem.count + 1,
          };
        }

        return cartItem;
      });
      return { ...state, cartItemList: [...tempCarts] };
    },
    totalProductPriceSlice: (state) => {
      let { total, count } = state.cartItemList.reduce(
        (cartTotal, cartItem) => {
          const { price, count } = cartItem;
          cartTotal.count += count;
          cartTotal.total += count * price;
          return cartTotal;
        },
        {
          count: 0,
          total: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, count };
    },
  },
});
export const {
  getCartlistSlice,
  removeCartlistSlice,
  removeAllCartListItemSlice,
  increaseCartSlice,
  decreaseCartSlice,
  totalProductPriceSlice,
} = cart.actions;
export default cart.reducer;
