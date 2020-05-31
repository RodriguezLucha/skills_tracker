import React from "react";
import {Link, useParams} from "react-router-dom"
import {selectCalenderById} from "../calender/calenderSlice";

export function CalenderDetail() {
    let {id} = useParams();

    // let calender = useSelector(state => selectCalenderById(state, id));
    console.log(id);
    
    return (
        <div>
            <Link to="/">Back</Link>
            Details...
        </div>
    )
}