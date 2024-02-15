import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: "",
    userData: {},
    status: "nothing",
    error: "",
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserInfo: (state, { payload }) => {
      state.token = payload.jwt;
      state.userData = payload.user;
    },
    logout: (state) => {
      state.token = "";
      state.userData = "";
    },
  },
})

export const { getUserInfo, logout } = authReducer.actions;
export default authReducer.reducer