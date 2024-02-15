import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allCategory: {},
};

export const categoriesReducer = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getAllCategory: (state, { payload }) => {
      payload.data.map((category) => {
        state.allCategory[category.id] = category.attributes.title
      });
    },
    
  },
})

export const { getAllCategory } = categoriesReducer.actions;
export default categoriesReducer.reducer

