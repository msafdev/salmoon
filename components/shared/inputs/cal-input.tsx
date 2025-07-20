"use client";

import { AnimatePresence, motion } from "framer-motion";

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

  const { daysInMonth, firstDayOfMonth, today } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const today = new Date();
    return { daysInMonth, firstDayOfMonth, today };
  }, [currentDate]);

  useEffect(() => {
    if (!value) return;

    const date = new Date(value);
    const formatted = format(date, "yyyyMMdd");

    setSelectedDate(date);
    setSelectedTime(format(date, "HH:mm"));

    if (slotCache[formatted]) {
      setAvailableSlots(slotCache[formatted]);
      return;
    }

    setLoadingSlots(true);
    getAvailableSlots(formatted)
      .then((res) => {
        const data = res.data || [];
        setAvailableSlots(data);
        setSlotCache((prev) => ({ ...prev, [formatted]: data }));
      })
      .catch(() => setAvailableSlots([]))
      .finally(() => setLoadingSlots(false));
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

  const isDateDisabled = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-full" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day);
      const isSelected = isDateSelected(day);
      days.push(
        <button
          type="button"
          key={day}
          onClick={() => !isDisabled && handleDateSelect(day)}
          disabled={isDisabled}
          className={cn(
            "aspect-square w-full rounded text-xs font-medium",
            "outline-none hover:bg-primary/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
            isDisabled && "text-muted-foreground",
            isSelected && "bg-primary/10 text-foreground",
            !isSelected && !isDisabled && "text-foreground",
          )}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  const renderTimeSlots = () => {
    if (loadingSlots) {
      return (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-9 rounded" />
          ))}
        </div>
      );
    }

    if (availableSlots.length === 0) {
      return (
        <p className="text-sm text-muted-foreground">No available slots</p>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {availableSlots.map((time) => (
          <Button
            type="button"
            key={time}
            variant="secondary"
            size="sm"
            onClick={() => handleTimeSelect(time)}
            className={cn(
              "anim text-xs hover:bg-primary/10 dark:hover:bg-primary/20",
              selectedTime === time &&
                "bg-primary/10 text-foreground hover:bg-primary/10 dark:bg-primary/20 dark:hover:bg-primary/20",
            )}
          >
            {time}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait">
        {!selectedDate ? (
          <motion.div
            key="calendar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
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
                  className="size-8 p-0"
                >
                  <PiArrowLeftBold className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth("next")}
                  className="size-8 p-0"
                >
                  <PiArrowRightBold className="size-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 sm:rounded sm:bg-muted">
              <div className="grid grid-cols-7 sm:gap-1 sm:px-2 sm:pt-4">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="flex h-6 w-full items-center justify-center"
                  >
                    <span className="text-xs font-medium uppercase text-muted-foreground">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Select Time</h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className="size-8 p-0"
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
