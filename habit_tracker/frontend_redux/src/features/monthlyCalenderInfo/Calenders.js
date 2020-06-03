import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {selectCalenderEntities, deleteCalender} from "../calender/calenderSlice";
import {Days} from "./Days";
import {Link} from "react-router-dom";
import styles from "./Calender.module.scss";
import {Button} from "reactstrap";
import {fetchCalenderByMonth} from "./monthlyCalenderInfoSlice";

export function Calenders({calender_ids, monthlyCalenderInfoId}) {
    
    let calenderEntities = useSelector(selectCalenderEntities);

    const calenders = calender_ids.map(id => calenderEntities[id]);

    let dispatch = useDispatch();

    function handleDelete(id){
        
        dispatch(deleteCalender(id)).then(
            dispatch(fetchCalenderByMonth(monthlyCalenderInfoId))
        )
    }

    return (
        <div>
            {calenders.map(calender => {
                let id = calender.id;
                
                return(
                <div key={id}>
                    <div className={styles.header}>
                        <Link to={`/calender_detail/${id}`}>
                            <h5 className={styles.month_name}>{calender.name}</h5>
                        </Link>
                        <Button 
                            outline
                            onClick={()=>handleDelete(id)}
                            color="primary" 
                            className={styles.trash_icon}>
                            <svg className="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </Button>
                    </div>
                    <Days days_ids={calender.days}/>
                </div>
                )
            })}
        </div>
    )
}