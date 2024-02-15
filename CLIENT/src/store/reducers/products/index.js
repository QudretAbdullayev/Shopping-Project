import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
};

export const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {},
})

export default productsReducer.reducer