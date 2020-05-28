import React, { useState, useEffect } from "react";
import { useStorageState } from 'react-storage-hooks';
import { useDispatch } from "react-redux";
import styles from "./Calender.module.css";

export function Calender() {
  const dispatch = useDispatch();

  const [days, setDays] = useState({});

  const [currrentMonth, setMonth, writeError] = useStorageState( localStorage, 'state_month', 'May' );

  async function fetchData() {
    const res = await fetch(`calender/month/${currrentMonth}`);
    res.json().then((res) => setDays(res.data));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <div>
    Calender
  </div>;
}
