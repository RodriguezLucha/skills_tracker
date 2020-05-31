import React from "react";
import { MonthlyCalenderInfo } from "./features/monthlyCalenderInfo/MonthlyCalenderInfo";
import { CalenderDetail } from "./features/calenderDetail/CalenderDetail";
import "./App.css";


import {Switch, Route} from "react-router-dom";
import {Months} from "./features/months/Months";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/calender_detail/:id">
          <CalenderDetail/>
        </Route>
        <Route path="/monthly_calender_info/:id">
          <MonthlyCalenderInfo />
        </Route>
        <Route path="/">
          <Months/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;