import React from "react";
import { useSelector } from "react-redux";
import {selectDayEntities} from "../day/daySlice";
import styles from './Days.module.css';
import classnames from "classnames";

const statusToStyle = {
    "Not Set" : "none",
    "Complete" : "green",
    "Incomplete" : "red"
}

export function Days({days_ids}) {
    let dayEntities = useSelector(selectDayEntities);

    if(!days_ids){return null}

    const days = days_ids.map(id => dayEntities[id]);

    return (
        <div className={styles.container}>
            {days.map(day => {
                let squareColorStyle = styles[statusToStyle[day.status]];
                return (
                <div key={day.id} className={classnames(styles.square, squareColorStyle)} >
                    <div className={styles.single_day}>
                        <div>{day.day}</div>
                    </div>
                </div>
                )
            })}
        </div>
    )
}