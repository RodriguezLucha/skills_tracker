import React from "react";
import { MonthlyCalenderInfo } from "./features/monthlyCalenderInfo/MonthlyCalenderInfo";
import { CalenderDetail } from "./features/calenderDetail/CalenderDetail";
import "./App.css";


import {Switch, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/calender_detail/:id">
          <CalenderDetail/>
        </Route>
        <Route path="/">
          <MonthlyCalenderInfo />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
