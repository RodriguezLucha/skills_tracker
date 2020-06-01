import React from "react";
import { useSelector } from "react-redux";
import {selectDayEntities} from "../day/daySlice";
import styles from './Days.module.scss';
import classnames from "classnames";
import {statusToStyle} from "../../mapping";

import {Card, CardBody} from 'reactstrap';

export function Days({days_ids}) {
    let dayEntities = useSelector(selectDayEntities);

    if(!days_ids){return null}

    const days = days_ids.map(id => dayEntities[id]);

    return (
        <div className={styles.container}>
            {days.map(day => {
                let squareColorStyle = styles[statusToStyle[day.status]];
                return (
                <Card key={day.id} className={classnames(styles.square, squareColorStyle)} >
                    <CardBody className={styles.single_day}>
                        <div>{day.day}</div>
                    </CardBody>
                </Card>
                )
            })}
        </div>
    )
}