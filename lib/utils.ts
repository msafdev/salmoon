import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function extractCode(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractCode).join("");
  if (typeof children === "object" && children?.props?.children) {
    return extractCode(children.props.children);
  }
  return "";
}

export const formatDate = (
  dateString: string,
  format: "short" | "long" = "short",
) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid Date";

  const day = date.getDate().toString().padStart(2, "0");
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const shortYear = year.toString().slice(-2);

  if (format === "long") {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${day} ${monthNames[monthIndex]} ${year}`;
  }

  // Default to short format
  return `${day}/${monthIndex + 1}/${shortYear}`;
};

export const formatTimestamp = (timestamp: string): string => {
  const timeDiff = Date.now() - new Date(timestamp).getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const units = [
    { value: years, singular: "year", plural: "years" },
    { value: months, singular: "month", plural: "months" },
    { value: days, singular: "day", plural: "days" },
    { value: hours, singular: "hour", plural: "hours" },
    { value: minutes, singular: "minute", plural: "minutes" },
  ];

  const unit = units.find((u) => u.value > 0);
  return unit
    ? `${unit.value} ${unit.value > 1 ? unit.plural : unit.singular} ago`
    : "just now";
};
