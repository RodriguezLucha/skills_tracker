import React from "react";
import {Link} from "react-router-dom";
import styles from "./Months.module.css";

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  

export function Months() {
    return (
        <div className={styles.container}>
        {
            months.map(month => (
                <Link key={month}
                      className={styles.month}
                      to={`/monthly_calender_info/${month}`}>
                    {month}
                </Link>
            ))
        }
        </div>
    )
}