import { createSlice } from '@reduxjs/toolkit'
import { getReviews } from '../../actions/review';
const initialState = {
    data: [],
    error: null,
    loading: false,
};

export const reviewsReducer = createSlice({
  name: "reviews",
  initialState,
  reducers: {
  },
  reducers: {
    addReview: (state, { payload }) => {
      state.data.push(payload);
    },
    deleteReview: (state, { payload }) => {
      state.data = state.data.filter(item => item.id !== payload);
    },
  },
  extraReducers: {
    [getReviews.pending]: (state) =>{
      state.loading = true
    },
    [getReviews. rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [getReviews.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.data = payload;
    },
  },
})

export const { addReview,deleteReview } = reviewsReducer.actions;
export default reviewsReducer.reducer

