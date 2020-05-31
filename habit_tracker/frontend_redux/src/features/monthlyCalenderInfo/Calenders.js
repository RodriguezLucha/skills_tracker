import React from "react";
import { useSelector } from "react-redux";
import {selectCalenderEntities} from "../calender/calenderSlice";

export function Calenders({calender_ids}) {
    

    let calenderEntities = useSelector(selectCalenderEntities);


    const calenders = calender_ids.map(id => calenderEntities[id]);

    return (
        <div>
            {calenders.map(calender => {
                console.log(calender)
                return(
                <div key={calender.id}>
                    <div>{calender.name}</div>
                </div>
                )
            })}
        </div>
    )
}