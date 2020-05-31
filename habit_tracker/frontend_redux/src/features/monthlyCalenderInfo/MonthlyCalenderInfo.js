import React, {useEffect } from "react";
import { useStorageState } from 'react-storage-hooks';
import { useDispatch, useSelector } from "react-redux";
import {fetchCalenderByMonth, selectCalenderInfoById} from "./monthlyCalenderInfoSlice";

export function MonthlyCalenderInfo() {
  
  const dispatch = useDispatch();

  const [currentMonth] = useStorageState( localStorage, 'state_month', 'May' );
  
  useEffect(() => {
    dispatch(fetchCalenderByMonth(currentMonth))
  }, []);

  const monthlyCalenderInfo = useSelector(state => selectCalenderInfoById(state, currentMonth));
  
  return <div>
    {monthlyCalenderInfo && monthlyCalenderInfo.id}
  </div>;
}
