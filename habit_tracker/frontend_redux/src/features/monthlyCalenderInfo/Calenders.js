import React from "react";
import { useSelector } from "react-redux";
import {selectCalenderEntities} from "../calender/calenderSlice";
import {Days} from "./Days";

export function Calenders({calender_ids}) {
    

    let calenderEntities = useSelector(selectCalenderEntities);


    const calenders = calender_ids.map(id => calenderEntities[id]);

    return (
        <div>
            {calenders.map(calender => {
                return(
                <div key={calender.id}>
                    <h5>{calender.name}</h5>
                    <Days days_ids={calender.days}/>
                </div>
                )
            })}
        </div>
    )
}