import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, cart: [], location: {}, email: null },
};

export const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    addUserPosition: (state, action) => {
      state.value.location = action.payload;
    },
    addToCart: (state, action) => {

      console.log("action payload", action.payload);
      state.value.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.value.cart = state.value.cart.filter((e) => {
        return e.productName !== action.payload
      }
      );
    },
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
    },
    deleteUser: (state) => {
      state.value.token = null;
      state.value.email = null;
    },
    clearStore: (state) => {
      return initialState;
    },
    incre: (state, action) => {
      console.log("action.payload", action.payload);
      state.value.cart[action.payload].quantity =
        state.value.cart[action.payload].quantity + 1;
    },
    decre: (state, action) => {
      console.log("action.payload", action.payload);
      state.value.cart[action.payload].quantity =
        state.value.cart[action.payload].quantity - 1;
    },
  },
});

export const { addUserPosition, addToCart, removeFromCart, clearStore, login, logout, incre, decre } = userSlice.actions;

export default userSlice.reducer;


