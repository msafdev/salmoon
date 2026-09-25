"use client";

import { AnimatePresence, motion } from "motion/react";

import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { getAvailableSlots } from "@/action/calendar";
import { format } from "@/lib/date";
import { cn } from "@/lib/utils";

interface CalInputProps {
  className?: string;
  onChange?: (datetime: string) => void;
  value?: string;
}

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

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalInput({
  className = "",
  onChange,
  value,
}: CalInputProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null,
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotCache, setSlotCache] = useState<Record<string, string[]>>({});
  const [loadingSlots, setLoadingSlots] = useState(false);

  const { daysInMonth, firstDayOfMonth, startOfToday } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    return { daysInMonth, firstDayOfMonth, startOfToday };
  }, [currentDate]);

  const isCurrentMonthOrPast = useMemo(() => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const todayYear = startOfToday.getFullYear();
    const todayMonth = startOfToday.getMonth();

    return (
      currentYear < todayYear ||
      (currentYear === todayYear && currentMonth <= todayMonth)
    );
  }, [currentDate, startOfToday]);

  useEffect(() => {
    if (!value) return;

    const date = new Date(value);
    const formatted = format(date, "yyyyMMdd");

    setSelectedDate(date);
    setSelectedTime(format(date, "HH:mm"));

    setLoadingSlots(true);

    const fetchSlots = async () => {
      setAvailableSlots([]);

      setSlotCache((prev) => {
        if (prev[formatted]) {
          setAvailableSlots(prev[formatted]);
          setLoadingSlots(false);
          return prev;
        }

        getAvailableSlots(formatted)
          .then((res) => {
            const data = res.data || [];
            setAvailableSlots(data);
            setSlotCache((newPrev) => ({ ...newPrev, [formatted]: data }));
          })
          .catch(() => setAvailableSlots([]))
          .finally(() => setLoadingSlots(false));

        return prev;
      });
    };

    fetchSlots();
  }, [value]);

  const navigateMonth = (direction: "prev" | "next") => {
    setSelectedDate(null);
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  const handleDateSelect = async (day: number) => {
    const selected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    const formatted = format(selected, "yyyyMMdd");

    setSelectedDate(selected);
    setSelectedTime(null);

    if (slotCache[formatted]) {
      setAvailableSlots(slotCache[formatted]);
      return;
    }

    setLoadingSlots(true);
    try {
      const res = await getAvailableSlots(formatted);
      const data = res.data || [];
      setAvailableSlots(data);
      setSlotCache((prev) => ({ ...prev, [formatted]: data }));
    } catch (err) {
      console.error("Failed to fetch slots", err);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleTimeSelect = (time: string) => {
    if (!selectedDate || !onChange) return;

    const [hour, minute] = time.split(":");
    const finalDate = new Date(selectedDate);
    finalDate.setHours(Number(hour));
    finalDate.setMinutes(Number(minute));
    const isoString = finalDate.toISOString();

    setSelectedTime(time);
    onChange(isoString);
  };

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setAvailableSlots([]);
    if (onChange) onChange("");
  };

  const getDateMeta = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    date.setHours(0, 0, 0, 0);

    const isToday = date.getTime() === startOfToday.getTime();
    const isPast = date.getTime() < startOfToday.getTime();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isDisabled = isPast || isWeekend;

    return { isToday, isPast, isWeekend, isDisabled };
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-full" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const { isToday, isPast, isWeekend, isDisabled } = getDateMeta(day);

      days.push(
        <button
          type="button"
          key={day}
          onClick={() => !isDisabled && handleDateSelect(day)}
          disabled={isDisabled}
          className={cn(
            "relative flex aspect-square w-full flex-col items-center justify-center rounded text-xs transition-all duration-150",
            "focus-visible:ring-ring/40 outline-hidden focus-visible:ring-2",
            // Past dates: clearly faded
            isPast && "text-muted-foreground/25 cursor-default select-none",
            // Weekend dates: soft muted

            isWeekend && "text-destructive/35 cursor-default select-none",
            // Future available dates: crisp and clickable
            !isDisabled &&
              "text-foreground hover:bg-primary/10 cursor-pointer font-medium active:scale-95",
          )}
        >
          <span className="relative inline-flex flex-col items-center justify-center">
            <span>{day}</span>
            {/* Subtle red wavy indicator for Today (Now) */}
            {isToday && (
              <svg
                className="absolute -bottom-2 h-1 w-6 overflow-visible text-red-500 dark:text-red-400"
                viewBox="0 0 24 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0 3 Q 3 0, 6 3 T 12 3 T 18 3 T 24 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
        </button>,
      );
    }

    return days;
  };

  const renderTimeSlots = () => {
    if (loadingSlots) {
      return (
        <div className="grid min-h-[140px] grid-cols-2 gap-2 md:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-9 rounded" />
          ))}
        </div>
      );
    }

    if (availableSlots.length === 0) {
      return (
        <div className="flex min-h-[140px] items-center justify-center">
          <p className="text-muted-foreground text-sm">No available slots</p>
        </div>
      );
    }

    return (
      <div className="grid min-h-fit grid-cols-2 gap-2 md:grid-cols-4">
        {availableSlots.map((time) => {
          const isSelected = selectedTime === time;
          return (
            <button
              type="button"
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={cn(
                "anim h-9 w-full cursor-pointer rounded px-3 py-2 text-xs font-semibold transition-all duration-200",
                "focus-visible:ring-ring/40 outline-hidden focus-visible:ring-2",
                isSelected
                  ? "bg-primary/10 text-foreground scale-[1.02] shadow-xs"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-secondary hover:text-foreground active:scale-95",
              )}
            >
              {time}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {!selectedDate ? (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-foreground font-semibold">
                {monthNames[currentDate.getMonth()]}{" "}
                <span className="text-muted-foreground">
                  {currentDate.getFullYear()}
                </span>
              </h3>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth("prev")}
                  disabled={isCurrentMonthOrPast}
                  className="size-8 p-0 disabled:opacity-30"
                  aria-label="Previous month"
                >
                  <PiArrowLeftBold className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth("next")}
                  className="size-8 p-0"
                  aria-label="Next month"
                >
                  <PiArrowRightBold className="size-4" />
                </Button>
              </div>
            </div>

            <div className="sm:bg-muted space-y-3 sm:rounded">
              <div className="grid grid-cols-7 sm:gap-1 sm:px-2 sm:pt-4">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="flex h-6 w-full items-center justify-center"
                  >
                    <span className="text-muted-foreground text-xs font-medium uppercase">
                      {day}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 sm:gap-1 sm:p-2">
                {renderCalendarDays()}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="time-selection"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <h3 className="text-foreground leading-none font-semibold">
                  Select Time
                </h3>
                <span className="text-muted-foreground text-xs leading-none">
                  GMT+7
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className="size-8 p-0"
                aria-label="Back to calendar"
              >
                <PiArrowLeftBold className="size-4" />
              </Button>
            </div>

            {renderTimeSlots()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
