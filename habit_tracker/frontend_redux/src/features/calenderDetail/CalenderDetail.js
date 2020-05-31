import React from "react";
import {Link, useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {selectCalenderById} from "../calender/calenderSlice";
import {selectDayEntities} from "../day/daySlice";

export function CalenderDetail() {
    let {id} = useParams();

    let calender = useSelector(state => selectCalenderById(state, id));
    let day_ids = calender.days;
    let dayEntities = useSelector(selectDayEntities);
    let days = day_ids.map(id => dayEntities[id]);
    
    
    return (
        <div>
            <Link to="/">Back</Link>
            <div className="days_container">
                {
                    days.map(day => {
                        return (
                        <div key={day.id} className="square_big">
                            <div className="one_day">
                                <div className="day_number">{day.day}</div>
                                <div className="day_of_week">{day.day_of_week}</div>
                                <div className="day_note">{day.note}</div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}