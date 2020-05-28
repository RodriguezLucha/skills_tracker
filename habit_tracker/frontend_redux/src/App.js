import React from "react";
import { Counter } from "./features/counter/Counter";
import { Calender } from "./features/calender/Calender";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Calender />
      <Counter />
    </div>
  );
}

export default App;
