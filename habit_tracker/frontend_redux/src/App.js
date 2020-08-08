import React from "react";
import { AnimatePresence } from "framer-motion";

import { MonthlyCalenderInfo } from "./features/monthlyCalenderInfo/MonthlyCalenderInfo";
import { CalenderDetail } from "./features/calenderDetail/CalenderDetail";
import "./App.css";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Months } from "./features/months/Months";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/calender_detail/:id">
          <CalenderDetail />
        </Route>
        <Route exact path="/monthly_calender_info/:id">
          <MonthlyCalenderInfo />
        </Route>
        <Route exact path="/">
          <Months />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
