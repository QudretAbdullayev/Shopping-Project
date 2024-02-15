import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  basket: [],
  total: 0,
  totalPrice: 0,
};

const basketReducer = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    updateBasket(state, {payload}) {
      state.basket = payload;
      console.log(payload)
    },
    updateTotalBasket(state, {payload}) {
      state.total = payload;
    },
    totalBasketPrice(state, {payload}) {
      state.totalPrice += payload;
    },
   },
});

export const { updateBasket,updateTotalBasket,totalBasketPrice} = basketReducer.actions;
export default basketReducer.reducer;


