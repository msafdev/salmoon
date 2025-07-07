/**
 * Add time to a Date object.
 */
export function add(
  date: Date,
  duration: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  },
): Date {
  const result = new Date(date);
  if (duration.days) result.setDate(result.getDate() + duration.days);
  if (duration.hours) result.setHours(result.getHours() + duration.hours);
  if (duration.minutes)
    result.setMinutes(result.getMinutes() + duration.minutes);
  if (duration.seconds)
    result.setSeconds(result.getSeconds() + duration.seconds);
  return result;
}

/**
 * Format a date using Intl.DateTimeFormat with fallback to ISO if no options provided.
 */
export function format(
  date: Date,
  formatOrOptions?: string | Intl.DateTimeFormatOptions,
  locale = "en-US",
): string {
  if (!formatOrOptions) return date.toISOString();

  if (typeof formatOrOptions === "string") {
    // Handle basic string patterns manually
    const pad = (n: number) => n.toString().padStart(2, "0");

    switch (formatOrOptions) {
      case "HH:mm":
        return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
      case "yyyy-MM-dd":
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
      case "yyyyMMdd":
        return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
      default:
        console.warn(`Unsupported format string: ${formatOrOptions}`);
        return date.toISOString();
    }
  }

  // Use Intl.DateTimeFormat if an options object is passed
  return new Intl.DateTimeFormat(locale, formatOrOptions).format(date);
}

/**
 * Format to ISO string in UTC (like date-fns formatISO).
 */
export function formatISO(date: Date): string {
  return date.toISOString();
}

/**
 * Parse a date string into a Date object. Supports ISO, RFC2822, or fallback to Date parsing.
 */
export function parse(
  dateString: string,
  format: "yyyyMMdd" | "yyyy-MM-dd",
): Date {
  if (format === "yyyyMMdd") {
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1; // 0-based
    const day = parseInt(dateString.slice(6, 8), 10);
    return new Date(year, month, day);
  }

  if (format === "yyyy-MM-dd") {
    const [yearStr, monthStr, dayStr] = dateString.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const day = parseInt(dayStr, 10);
    return new Date(year, month, day);
  }

  // Fallback
  return new Date(dateString);
}

/**
 * Returns true if the first date is after the second.
 */
export function isAfter(date: Date, comparison: Date): boolean {
  return date.getTime() > comparison.getTime();
}

/**
 * Returns true if the first date is before the second.
 */
export function isBefore(date: Date, comparison: Date): boolean {
  return date.getTime() < comparison.getTime();
}

/**
 * Convert a date into the equivalent time in a given timezone.
 * Returns a **local-looking date**, not a true Date object in that zone (JS doesn't support that).
 */
export function toZonedTime(date: Date | string, timeZone: string): Date {
  const utcDate = typeof date === "string" ? new Date(date) : date;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(utcDate);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value || "00";

  return new Date(
    `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}`,
  );
}

/**
 * Alias for toZonedTime (for API compatibility).
 */
export const fromZonedTime = toZonedTime;

/**
 * Format a date in a specific timezone using Intl.
 */
export function formatInTimeZone(
  date: Date | string,
  timeZone: string,
  options?: Intl.DateTimeFormatOptions,
  locale = "en-US",
): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  }).format(new Date(date));
}
