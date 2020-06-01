import React from "react";
import { useSelector } from "react-redux";
import {selectCalenderEntities} from "../calender/calenderSlice";
import {Days} from "./Days";
import {Link} from "react-router-dom";
import styles from "./Calender.module.scss";

export function Calenders({calender_ids}) {
    

    let calenderEntities = useSelector(selectCalenderEntities);


    const calenders = calender_ids.map(id => calenderEntities[id]);

    return (
        <div>
            {calenders.map(calender => {
                return(
                <div key={calender.id}>
                    <Link to={`/calender_detail/${calender.id}`}>
                        <h5 className={styles.month_name}>{calender.name}</h5>
                    </Link>
                    <Days days_ids={calender.days}/>
                </div>
                )
            })}
        </div>
    )
}