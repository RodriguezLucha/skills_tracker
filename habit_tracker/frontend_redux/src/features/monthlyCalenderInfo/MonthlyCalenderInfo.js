import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCalenderByMonth,
  selectCalenderInfoById
} from "./monthlyCalenderInfoSlice";

import { Calenders } from "./Calenders";
import { NewCalenderInput } from "./NewCalenderInput";

import { useParams } from "react-router-dom";
import { Months } from "../months/Months";
import styles from "./MonthlyCalenderInfo.module.scss";
import { motion } from "framer-motion";

export function MonthlyCalenderInfo() {
  const dispatch = useDispatch();

  //TODO:Move this into redux store now that redux store is persisted to localStorage
  //const [currentMonth] = useStorageState(localStorage, "state_month", "May");

  let { id } = useParams();

  console.log(id);

  const monthlyCalenderInfo = useSelector(state =>
    selectCalenderInfoById(state, id)
  );

  useEffect(
    () => {
      dispatch(fetchCalenderByMonth(id));
    },
    [id, dispatch]
  );

  const spring = {
    type: "spring",
    damping: 50,
    stiffness: 100
  }

  const thumbnailVariants = {
    initial: {  opacity: 0, x: "10%", transition: {duration: 0.2} },
    enter: {  opacity: 1, x: "0%" },
    exit: {
      x: "-10%",
      opacity: 0,
      transition: {duration: 0.2}
    }
  };

  if (!monthlyCalenderInfo) {
    return null;
  }
  return (
    <>
      <div>
        <div className={styles.header}>
          <h1 className="month-name">
            {monthlyCalenderInfo.id}
          </h1>
          <Months monthlyCalenderInfoId={monthlyCalenderInfo.id} />
        </div>
      </div>
      <Calenders
        calender_ids={monthlyCalenderInfo.calenders}
        monthlyCalenderInfoId={monthlyCalenderInfo.id}
      />
      <NewCalenderInput monthlyCalenderInfoId={monthlyCalenderInfo.id} />
    </>
  );
}
