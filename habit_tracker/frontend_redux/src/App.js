import React from "react";
import { Counter } from "./features/counter/Counter";
import { MonthlyCalenderInfo } from "./features/monthlyCalenderInfo/MonthlyCalenderInfo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <MonthlyCalenderInfo />
    </div>
  );
}

export default App;
