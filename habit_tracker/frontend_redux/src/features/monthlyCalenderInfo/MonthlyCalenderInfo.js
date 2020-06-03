import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCalenderByMonth,
  selectCalenderInfoById
} from "./monthlyCalenderInfoSlice";

import {Calenders} from "./Calenders";
import {NewCalenderInput} from "./NewCalenderInput";

import {useParams} from "react-router-dom";
import {Months} from "../months/Months";
import styles from "./MonthlyCalenderInfo.module.scss";

export function MonthlyCalenderInfo() {
  const dispatch = useDispatch();

  //TODO:Move this into redux store now that redux store is persisted to localStorage
  //const [currentMonth] = useStorageState(localStorage, "state_month", "May");

  let {id} = useParams();

  const monthlyCalenderInfo = useSelector(state =>
    selectCalenderInfoById(state, id)
  );

  useEffect(() => {
    dispatch(fetchCalenderByMonth(id));
  }, [id, dispatch]);


  if (!monthlyCalenderInfo) {
    return null;
  }
  return (
    <div>
      <div>
        <div className={styles.header}>
          <h1 className="month-name">
            {monthlyCalenderInfo.id}
          </h1>
          <Months monthlyCalenderInfoId={monthlyCalenderInfo.id}/>
        </div>
      </div>
      <Calenders calender_ids={monthlyCalenderInfo.calenders} monthlyCalenderInfoId={monthlyCalenderInfo.id}/>
      <NewCalenderInput monthlyCalenderInfoId={monthlyCalenderInfo.id}/>
    </div>
  );
}


