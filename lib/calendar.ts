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
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return availableTimeStrings.map((slot) => {
    const [hours, minutes] = slot.split(":");
    const hh = hours.padStart(2, "0");
    const mm = minutes.padStart(2, "0");
    // Asia/Jakarta is UTC+07:00
    const isoWithTz = `${year}-${month}-${day}T${hh}:${mm}:00+07:00`;
    return new Date(isoWithTz);
  });
};
