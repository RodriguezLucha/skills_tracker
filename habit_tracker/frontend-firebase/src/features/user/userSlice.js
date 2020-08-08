import { createSlice } from '@reduxjs/toolkit';

import * as firebase from "firebase/app";
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
      console.log(action);
    },
    logout: (state) => {
      state.email = null;
      state.uid = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectCount = state => state.user.value;

export default userSlice.reducer;
