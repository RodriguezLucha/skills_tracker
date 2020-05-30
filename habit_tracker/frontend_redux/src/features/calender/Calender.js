import React, { useState, useEffect } from "react";
import { useStorageState } from 'react-storage-hooks';
import { useDispatch } from "react-redux";
import styles from "./Calender.module.css";
import {fetchCalenderByMonth} from "./calenderSlice";

export function Calender() {
  const dispatch = useDispatch();

  const [days, setDays] = useState({});

  const [currentMonth, setMonth, writeError] = useStorageState( localStorage, 'state_month', 'May' );

  useEffect(() => {
    dispatch(fetchCalenderByMonth(currentMonth))
  }, []);

  return <div>
    Calender
  </div>;
}
