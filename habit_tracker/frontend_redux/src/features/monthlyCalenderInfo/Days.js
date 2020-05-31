import React from "react";
import { useSelector } from "react-redux";
import {selectDayEntities} from "../day/daySlice";

export function Days({days_ids}) {

    
    let dayEntities = useSelector(selectDayEntities);

    if(!days_ids){return null}

    const days = days_ids.map(id => dayEntities[id]);

    return (
        <div className="days_container">
            {days.map(day => {
                return (

                <div key={day.id} className="square" >
            
                        <div className="one_day">
                            <div>{day.day}</div>
                            <div>{day.day_of_week}</div>
                        </div>
                        
          

                </div>
                )
            })}
        </div>
    )
}