import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import styles from "./NewCalenderInput.module.scss";
import {addNewCalender} from "../calender/calenderSlice";


export function NewCalenderInput() {

    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleChange(e){
        setName(e.target.value);
    }
    
    function handleSubmit(){
        dispatch(addNewCalender(name));
        setName("");
    }

    return (
        <div className={styles.container}>
            <div className={styles.empty}></div>
            <InputGroup>
                <Input onChange={(e) => handleChange(e)} />
                <InputGroupAddon addonType="prepend">
                    <Button onClick={handleSubmit}>
                        Add Calender
                    </Button>
                </InputGroupAddon>
            </InputGroup>
            <div className={styles.empty}></div>
        </div>
    )
}