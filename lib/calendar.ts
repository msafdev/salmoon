import { fromZonedTime } from "./date";

export const TIMEZONE = "Asia/Jakarta";

const availableTimeStrings = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export const buildDateSlots = (date: Date) => {
  return availableTimeStrings.map((slot) => {
    const [hours, minutes] = slot.split(":").map(Number);
    const dateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    return fromZonedTime(dateTime, TIMEZONE);
  });
};
