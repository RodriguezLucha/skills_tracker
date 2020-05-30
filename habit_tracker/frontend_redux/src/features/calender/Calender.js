import React, {useEffect } from "react";
import { useStorageState } from 'react-storage-hooks';
import { useDispatch } from "react-redux";
import {fetchCalenderByMonth} from "./calenderSlice";

export function Calender() {
  const dispatch = useDispatch();
  const [currentMonth] = useStorageState( localStorage, 'state_month', 'May' );

  useEffect(() => {
    dispatch(fetchCalenderByMonth(currentMonth))
  });

  return <div>
    Calender
  </div>;
}
