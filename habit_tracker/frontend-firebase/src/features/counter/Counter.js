import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {login, logout} from "../user/userSlice";

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";


export function Counter() {
  const dispatch = useDispatch();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(
    () => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

          let displayName = user.displayName;
          let email = user.email;
          let uid = user.uid;
          dispatch(login({email, uid, displayName}))

        } else {
          dispatch(logout());
        }
      });
    },
    [dispatch]
  );


  const handleLogin = () => {
    // debugger;
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ...
      });
  };
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        dispatch(logout());
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <label>
        Username
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password
        <input
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
