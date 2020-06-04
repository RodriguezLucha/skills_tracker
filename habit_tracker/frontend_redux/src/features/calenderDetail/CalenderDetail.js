import React from "react";
import {useParams, useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {selectCalenderById} from "../calender/calenderSlice";
import {selectDayEntities, updateDayStatus, updateDayNote} from "../day/daySlice";
import styles from "./CalenderDetail.module.scss";
import {statusToStyle} from "../../mapping";
import classnames from "classnames";
import EasyEdit, {Types} from 'react-easy-edit';
import {Button, Card, CardBody} from 'reactstrap';
import { motion } from "framer-motion";

const values = ['Not Set', 'Incomplete', 'Complete'];

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

    const spring = {
        type: "spring",
        damping: 50,
        stiffness: 50
      }
  
    const thumbnailVariants = {
        initial: {  opacity: 0, x: "-10%", transition: {duration: 0.2} },
        enter: {  opacity: 1, x: "0%" },
        exit: {
          x: "10%",
          opacity: 0,
          transition: {duration: 0.2}
        }
      };
    
    return (
        <motion.div
        initial="exit" animate="enter" exit="exit"
        variants={thumbnailVariants}
        transition={spring}
        
        >
            <header className={styles.header}>
                <Button color="primary" className={styles.back_button} onClick={() => history.goBack() }>
                    <svg className="bi bi-arrow-left-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.646 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L6.207 7.5H11a.5.5 0 0 1 0 1H6.207l2.147 2.146z"/>
                    </svg>          
                </Button>
                <h1 className={styles.month}>{calender.name}</h1>
                <div className={styles.placeholder}></div>
            </header>
            <div className={styles.container}>
                {
                    days.map(day => {
                        let squareColorStyle = styles[statusToStyle[day.status]];
                        return (
                        <Card key={day.id} className={classnames(styles.square, squareColorStyle)}>
                            <CardBody className={styles.one_day}>
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
                                <Button outline color="primary" className={styles.toggle_button} onClick={() => handleToggle(day.id)}>
                                    <svg className="bi bi-arrow-clockwise" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" d="M3.17 6.706a5 5 0 0 1 7.103-3.16.5.5 0 1 0 .454-.892A6 6 0 1 0 13.455 5.5a.5.5 0 0 0-.91.417 5 5 0 1 1-9.375.789z"/>
                                      <path fillRule="evenodd" d="M8.147.146a.5.5 0 0 1 .707 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.707-.708L10.293 3 8.147.854a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </CardBody>
                        </Card>
                        )
                    })
                }
            </div>
        </motion.div>
    )
}