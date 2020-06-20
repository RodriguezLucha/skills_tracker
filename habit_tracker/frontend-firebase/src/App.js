import React from 'react';
import { Counter } from './features/counter/Counter';

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
