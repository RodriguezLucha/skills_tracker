import React, { useState, useEffect } from "react";
import "./App.css";

const snakecase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("_");

function App() {
  const [days, setDays] = useState({});
  const [toggle, setToggle] = useState(true);

  async function fetchData() {
    const res = await fetch("calender/month/May");
    res.json().then((res) => setDays(res.data));
  }

  useEffect(() => {
    fetchData();
  }, [toggle]);

  async function handleComplete(day_id, status) {
    const requestOptions = {
      method: "POST",
    };
    ///calender/day/:day/status/:status
    const res = await fetch(
      `calender/day/${day_id}/status?status=${status}`,
      requestOptions
    );
    setToggle(!toggle);
  }

  return (
    <div className="App">
      {Object.keys(days).map((calender_id) => {
        let name = days[calender_id].name;
        let specific_days = Object.keys(days[calender_id].days);
        return (
          <div key={calender_id}>
            <h1>{name}</h1>
            <div className="days_container">
              {specific_days.map((sday) => {
                let day_obj = days[calender_id].days[sday];
                let status = snakecase(day_obj.status);
                return (
                  <div className={"one_day " + status} key={day_obj.day_id}>
                    <div>{day_obj.day}</div>
                    <div>{day_obj.day_of_week}</div>
                    <div>{day_obj.note}</div>
                    <button
                      onClick={() => handleComplete(day_obj.day_id, "Not Set")}
                    >
                      ␡
                    </button>
                    <button
                      onClick={() => handleComplete(day_obj.day_id, "Complete")}
                    >
                      ✔
                    </button>
                    <button
                      onClick={() =>
                        handleComplete(day_obj.day_id, "Incomplete")
                      }
                    >
                      𐄂
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
