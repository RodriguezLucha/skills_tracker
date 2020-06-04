import React from "react";
import { AnimatePresence } from "framer-motion";

import { MonthlyCalenderInfo } from "./features/monthlyCalenderInfo/MonthlyCalenderInfo";
import { CalenderDetail } from "./features/calenderDetail/CalenderDetail";
import "./App.css";


import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import {Months} from "./features/months/Months";



function App() {
  
  return (
   
    <Router>
      <Route render={({location}) => {
        console.log(location)
      return (
        <AnimatePresence exitBeforeEnter initial={false}>

          <Switch location={location} key={location.pathname}>
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
        </AnimatePresence>

      )}}>

      </Route>
      </Router>

  );
}

export default App;
