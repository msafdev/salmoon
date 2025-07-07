"use server";

import { Contact } from "@/types/contact-types";
import { add, format, formatISO, isAfter, isBefore, parse } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { google } from "googleapis";

import { revalidatePath } from "next/cache";

import { calendar_v3 as googleCalendar } from "@googleapis/calendar";

import { TIMEZONE, buildDateSlots } from "@/lib/calendar";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

const calendarId = process.env.GOOGLE_CALENDAR_ID!;

const initGoogleCalendar = async () => {
  try {
    const credentials = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    };

    const auth = new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
    return google.calendar({ version: "v3", auth });
  } catch (error) {
    console.error("❌ Failed to initialize Google Calendar API:", error);
    return null;
  }
};

export const getAvailableSlots = async (date: string) => {
  try {
    const calendar = await initGoogleCalendar();
    if (!calendar) return { error: "❌ Calendar not initialized" };

    const dayDate = parse(date, "yyyyMMdd", new Date());
    const dateSlots = buildDateSlots(dayDate);

    const { data } = await calendar.events.list({
      calendarId,
      eventTypes: ["default"],
      timeMin: dayDate.toISOString(),
      timeMax: add(dayDate, { days: 1 }).toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = data.items || [];

    const availableSlots = dateSlots.filter((slot) => {
      const slotEnd = add(slot, { minutes: 20 });

      return !events.some((event: googleCalendar.Schema$Event) => {
        const eventStart = new Date(event.start?.dateTime || "");
        const eventEnd = new Date(event.end?.dateTime || "");
        return isBefore(slot, eventEnd) && isAfter(slotEnd, eventStart);
      });
    });

    const formattedSlots = availableSlots.map((slot) =>
      format(toZonedTime(slot, TIMEZONE), "HH:mm"),
    );

    return { data: formattedSlots };
  } catch (error) {
    console.error("❌ Error getting available slots:", error);
    return { error: "❌ Failed to fetch available slots" };
  }
};

export const createMeeting = async (formData: Contact) => {
  try {
    const calendar = await initGoogleCalendar();
    if (!calendar) return { error: "❌ Calendar not initialized" };

    const {
      name,
      email,
      phone,
      message,
      budget,
      service_type,
      meeting_date,
      user_type,
    } = formData;

    const localDate = fromZonedTime(meeting_date, TIMEZONE);
    const start = new Date(localDate.toUTCString());
    const end = add(start, { minutes: 60 });

    const description = `
👤 Name: ${name}
📞 Phone: ${phone}
🧑‍💼 User Type: ${user_type}
💰 Budget Range: ${budget.join(" - ")}
🛠️ Services Needed: ${service_type.join(", ")}

📝 Message:
${message}
`.trim();

    const event = {
      summary: `Meeting with ${name} | ${email}`,
      description,
      start: { dateTime: formatISO(start), timeZone: "UTC" },
      end: { dateTime: formatISO(end), timeZone: "UTC" },
      reminders: {
        useDefault: false,
        overrides: [{ method: "email", minutes: 30 }],
      },
    };

    const { data: meeting, status } = await calendar.events.insert({
      calendarId,
      requestBody: event,
      conferenceDataVersion: 1,
    });

    revalidatePath("/contact");

    if (status === 200 && meeting) {
      return { data: "💯 Meeting successfully scheduled!" };
    }

    return { error: "❌ Failed to create meeting" };
  } catch (error) {
    console.error("❌ An unexpected error occurred: ", error);
    return { error: "❌ An unexpected error occurred" };
  }
};
