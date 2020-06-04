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

  const monthlyCalenderInfo = useSelector(state =>
    selectCalenderInfoById(state, id)
  );

  useEffect(
    () => {
      dispatch(fetchCalenderByMonth(id));
    },
    [id, dispatch]
  );
  const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };
  const thumbnailVariants = {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: { duration: 0.1, ...transition }
    }
  };

  if (!monthlyCalenderInfo) {
    return null;
  }
  return (
    <motion.div
      initial="exit"
      animate="enter"
      exit="exit"
      variants={thumbnailVariants}
    >
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
    </motion.div>
  );
}
