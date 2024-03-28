import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num, decimalPlaces = 2) => {
  // Convert the number to a string with fixed decimal places
  const fixedNum = num.toFixed(decimalPlaces);
  return parseFloat(fixedNum); // Convert the string back to a number and return
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (currentItem) => currentItem._id === item._id,
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((currentItem) =>
          currentItem._id === existItem._id ? item : currentItem,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price
      state.itemPrice = addDecimals(state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
      , 0))
      // Calculate shipping price
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)
      // Calculate tax price
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice)))
      // Calculate total price
      state.totalPrice = addDecimals(
        Number(state.itemPrice) + Number(state.shippingPrice) + Number(state.taxPrice),
      );

      localStorage.setItem("cart", JSON.stringify(state));
    }
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
