import { createSlice } from '@reduxjs/toolkit';

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: 0,
    email: null,
    uid: null
  },
  reducers: {
    login: (state, action) => {
      const {email, uid, displayName} = action.payload;
      state.email = email;
      state.uid = uid;
      state.displayName = displayName;
    },
    logout: (state) => {
      state.email = null;
      state.uid = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectEmail = state => state.user.email;
export const selectUid = state => state.user.uid;

export default userSlice.reducer;
