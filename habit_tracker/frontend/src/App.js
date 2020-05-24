import React, { useState, useEffect } from "react";
import { useStorageState } from 'react-storage-hooks';

import EasyEdit, {Types} from 'react-easy-edit';

import "./App.css";

const snakecase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("_");

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

function App() {
  const [days, setDays] = useState({});
  const [toggle, setToggle] = useState(true);
  const [zoomed, setZoomed] = useState(true);

  const [calenderName, setCalenderName] = useState("");
  const [currrentMonth, setMonth, writeError] = useStorageState( localStorage, 'state_month', 'May' );

  async function fetchData() {
    const res = await fetch(`calender/month/${currrentMonth}`);
    res.json().then((res) => setDays(res.data));
  }

  useEffect(() => {
    fetchData();
  }, [toggle]);

  async function myChangeHandler(event) {
    setCalenderName(event.target.value);
  }

  async function handleComplete(day_id, status) {
    const requestOptions = {
      method: "POST",
    };
    const res = await fetch(
      `calender/day/${day_id}/status?status=${status}`,
      requestOptions
    );
    setToggle(!toggle);
  }
  async function handleCalenderDelete(calender_id) {
    const requestOptions = {
      method: "DELETE",
    };
    const res = await fetch(`calender/${calender_id}`, requestOptions);
    setToggle(!toggle);
  }
  async function handleCalenderAdd() {
    const requestOptions = {
      method: "POST",
    };
    const res = await fetch(
      `calender?name=${calenderName}&year=2020`,
      requestOptions
    );
    setToggle(!toggle);
  }

  async function handleFocusOut(day_id, note) {
    const requestOptions = {
      method: "POST",
    };
    const res = await fetch(
      `calender/day/${day_id}/note?note=${note}`,
      requestOptions
    );
    setToggle(!toggle);
  }

  const props = {
    height: zoomed ? 150 : 30,
    width: zoomed ? 150 : 40,
    border: '1px solid black',
    margin: 2,
    padding: 10
  };

  return (
    <div className="App">
      <button onClick={() => setZoomed(!zoomed)}>
        <i className="fas fa-search-plus"></i>
      </button>
      <div className="month_list">
      {
        months.map(mon => <div key={mon} className="hover_over" 
        onClick={()=> {
          setMonth(mon);
          setToggle(!toggle);
        }}>{mon}</div>)
      }
      </div>

      {Object.keys(days).map((calender_id) => {
        let name = days[calender_id].name;
        let month = days[calender_id].month;
        let specific_days = Object.keys(days[calender_id].days);
        return (
          <div key={calender_id}>
            <div className="cal_header">
              <h2>{month}</h2>
              <h1>{name}</h1>
              <button onClick={() => handleCalenderDelete(calender_id)}>
                <i className="fa fa-trash"></i>
              </button>
            </div>
            <div className="days_container">
              {specific_days.map((sday) => {
                let day_obj = days[calender_id].days[sday];
                let status = snakecase(day_obj.status);
                return (
                  <div key={day_obj.day_id} style={props} className={status}>
                    <div className="one_day" key={day_obj.day_id}>
                      <div className="one_day_header">
                        <div>{day_obj.day}</div>
                        {zoomed && <div>{day_obj.day_of_week}</div>}
                      </div>

                      { zoomed &&
                      <>
                        <EasyEdit
                          type={Types.TEXT}
                          value={day_obj.note}
                          placeholder="___________________"
                          onSave={(text) => handleFocusOut(day_obj.day_id, text)}
                          saveButtonLabel="Save"
                          hideSaveButton={true}
                          hideCancelButton={true}
                          onHoverCssClass="hover_class"
                          cancelButtonLabel="Cancel"
                        />
                        <div>
                          <button onClick={() => handleComplete(day_obj.day_id, "Not Set")} > ␡ </button>
                          <button onClick={() => handleComplete(day_obj.day_id, "Complete")} > ✔ </button>
                          <button onClick={() => handleComplete(day_obj.day_id, "Incomplete") } > 𐄂 </button>
                        </div>
                      </>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div>
        <h3>New Calender</h3>
        <div>
          <input type="text" onChange={(e) => myChangeHandler(e)}></input>
          <button onClick={handleCalenderAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
