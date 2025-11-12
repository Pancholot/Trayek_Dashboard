import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedOut: false, //recuerda ponerlo en true
  },
  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedOut = false;
    },
    setIsLoggedOut: (state) => {
      state.isLoggedOut = true;
    },
  },
});

export const { setIsLoggedIn, setIsLoggedOut } = authSlice.actions;
export default authSlice.reducer;
