import React from "react";
import {Link, useParams, useHistory} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {selectCalenderById} from "../calender/calenderSlice";
import {selectDayEntities, updateDayStatus, updateDayNote} from "../day/daySlice";
import styles from "./CalenderDetail.module.scss";
import {statusToStyle} from "../../mapping";
import classnames from "classnames";
import EasyEdit, {Types} from 'react-easy-edit';

const values = ['Not Set', 'Complete', 'Incomplete'];

function getNextStatus(status) {
    let index = values.indexOf(status);
    index++;
    if(index > values.length-1){ index = 0; }
    return values[index];
 }

export function CalenderDetail() {
    let {id} = useParams();
    let dispatch = useDispatch();

    let calender = useSelector(state => selectCalenderById(state, id));
    let day_ids = calender.days;
    let dayEntities = useSelector(selectDayEntities);
    let days = day_ids.map(id => dayEntities[id]);
    let history = useHistory();

    function handleToggle(id){
        let status = getNextStatus(dayEntities[id].status);
        dispatch(updateDayStatus({day: id, status:getNextStatus(status)}));
    }

    function handleSave(id, note){
        dispatch(updateDayNote({id, note}));
    }
    
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
                                <EasyEdit
                                      type={Types.TEXT}
                                      value={day.note}
                                      placeholder="___________________"
                                      onSave={(text) => handleSave(day.id, text)}
                                      saveButtonLabel="Save"
                                      hideSaveButton={true}
                                      hideCancelButton={true}
                                      onHoverCssClass="hover_class"
                                      cancelButtonLabel="Cancel"
                                />
                                <button onClick={() => handleToggle(day.id)}>Toggle</button>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}