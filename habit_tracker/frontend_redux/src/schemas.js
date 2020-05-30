import { normalize, schema } from "normalizr";
export const day = new schema.Entity("day");
export const calender = new schema.Entity("calender", {
  days: [day]
});
export const monthyCalenderInfo = new schema.Entity("monthyCalenderInfo", {
  calenders: [calender]
});