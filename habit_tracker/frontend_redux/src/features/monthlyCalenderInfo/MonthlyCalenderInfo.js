import React, { useEffect } from "react";
import { useStorageState } from "react-storage-hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCalenderByMonth,
  selectCalenderInfoById
} from "./monthlyCalenderInfoSlice";

import {Calenders} from "./Calenders";


export function MonthlyCalenderInfo() {
  const dispatch = useDispatch();

  const [currentMonth] = useStorageState(localStorage, "state_month", "May");

  useEffect(() => {
    dispatch(fetchCalenderByMonth(currentMonth));
  }, []);

  const monthlyCalenderInfo = useSelector(state =>
    selectCalenderInfoById(state, currentMonth)
  );

  console.log(monthlyCalenderInfo);
  if (!monthlyCalenderInfo) {
    return null;
  }
  return (
    <div>
      <h1 className="month-name">
        {monthlyCalenderInfo.id}
      </h1>
      <Calenders calender_ids={monthlyCalenderInfo.calenders}/>
    </div>
  );
}


