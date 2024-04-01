import { ORDERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

// THIS IS FOR THE SERVER
const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;

export default ordersApiSlice.reducer;
