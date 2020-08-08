import React from "react";
import { User } from "./features/user/User";

import { firebaseConfig } from "./firebaseConfig";

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);

function App() {
  return (
    <div className="App">
      <User />
    </div>
  );
}

export default App;
