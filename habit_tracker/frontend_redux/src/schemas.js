import { schema } from "normalizr";
export const day = new schema.Entity("day");
export const calender = new schema.Entity("calender", {
  days: [day]
});
export const monthlyCalenderInfo = new schema.Entity("monthlyCalenderInfo", {
  calenders: [calender]
});