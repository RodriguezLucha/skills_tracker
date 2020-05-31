import React from "react";
import {Link, useParams, useHistory} from "react-router-dom"
import {useSelector} from "react-redux"
import {selectCalenderById} from "../calender/calenderSlice";
import {selectDayEntities} from "../day/daySlice";
import styles from "./CalenderDetail.module.scss";
import {statusToStyle} from "../../mapping";
import classnames from "classnames";

export function CalenderDetail() {
    let {id} = useParams();

    let calender = useSelector(state => selectCalenderById(state, id));
    let day_ids = calender.days;
    let dayEntities = useSelector(selectDayEntities);
    let days = day_ids.map(id => dayEntities[id]);
    let history = useHistory();
    
    
    return (
        <div>
            <header className={styles.header}>
                <button onClick={() => history.goBack() }>Back</button>
                <div className={styles.month}>{calender.name}</div>
                <div></div>
            </header>
            <div className={styles.container}>
                {
                    days.map(day => {
                        let squareColorStyle = styles[statusToStyle[day.status]];
                        return (
                        <div key={day.id} className={classnames(styles.square, squareColorStyle)}>
                            <div className={styles.one_day}>
                                <div className={styles.day_header}>
                                    <div className={styles.day}>{day.day}</div>
                                    <div className={styles.day_of_week}>{day.day_of_week}</div>
                                </div>
                                <div className="day_note">{day.note}</div>
                                <button>Toggle</button>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}