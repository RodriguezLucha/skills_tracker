// require { normalize, schema } from "normalizr";
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schema = normalizr.schema

let originalData = {
  id: "May",
  calenders: [
    {
      id: "6",
      name: "Running",
      days: [
        {
          id: "1952",
          day_of_week: "Friday",
          note: "2.3 miles",
          status: "Complete"
        },
        {
          id: "1953",
          day_of_week: "Saturday",
          note: "2.3 miles",
          status: "Complete"
        }
      ]
    },
    {
      id: "7",
      name: "Music",
      days: [
        {
          id: "1956",
          day_of_week: "Friday",
          note: "30 minutes",
          status: "Complete"
        },
        {
          id: "1957",
          day_of_week: "Saturday",
          note: "20 minutes",
          status: "Complete"
        }
      ]
    }
  ]
};

const day = new schema.Entity("day");
const calender = new schema.Entity("calender", {
  days: [day]
});
const monthyCalenderInfo = new schema.Entity("monthyCalenderInfo", {
  calenders: [calender]
});

const normalizedData = normalize(originalData, monthyCalenderInfo);
console.log(JSON.stringify(normalizedData));