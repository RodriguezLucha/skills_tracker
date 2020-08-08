import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectEmail, selectUid } from "./userSlice";
import styles from "./User.module.scss";
import { db } from "../../App";

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

export function User() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [userData, setUserData] = useState("");

  const email = useSelector(selectEmail);
  const uid = useSelector(selectUid);

  const docRef = uid ? db.collection("users").doc(uid) : null;
  if (docRef) {
    docRef.get().then(function(doc) {
      if (doc.exists) {
        let docData = doc.data();
        console.log(docData.stringExample);
        setUserData(docData.stringExample);
      }
    });
  }

  useEffect(
    () => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          let displayName = user.displayName;
          let email = user.email;
          let uid = user.uid;
          dispatch(login({ email, uid, displayName }));
        } else {
          dispatch(logout());
        }
      });
    },
    [dispatch]
  );

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .catch(function(error) {
        // Handle Errors here // var errorCode = error.code; // var errorMessage = error.message;
      });
  };
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        dispatch(logout());
        setUserData('');
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  const handleAddData = () => {
    let docData = { stringExample: data };

    db.collection("users").doc(uid).set(docData).then(function() {
      console.log("Document successfully written!");
    });
    setData("");
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
      <div className={styles.email}>
        <div>
          Logged In User Email: {email}{" "}
        </div>
      </div>
      <div>
        <label>
          User Data
          <input value={data} onChange={e => setData(e.target.value)} />
        </label>
        <button onClick={handleAddData}>Add Data</button>
        <div>
          Users Data:
          {userData}
        </div>
      </div>
    </div>
  );
}
