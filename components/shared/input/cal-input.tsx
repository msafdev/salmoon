"use client";

import { getAvailableSlots } from "@/action/calendar";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

interface CalInputProps {
  className?: string;
  onChange?: (datetime: string) => void;
  value?: string;
}

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
  const [loadingSlots, setLoadingSlots] = useState(false);

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

  const { daysInMonth, firstDayOfMonth, today } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const today = new Date();
    return { daysInMonth, firstDayOfMonth, today };
  }, [currentDate]);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setSelectedTime(format(date, "HH:mm"));

      const formatted = format(date, "yyyyMMdd");

      getAvailableSlots(formatted)
        .then((res) => setAvailableSlots(res.data || []))
        .catch(() => setAvailableSlots([]))
        .finally(() => setLoadingSlots(false));
    }
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

    setSelectedDate(selected);
    setSelectedTime(null);
    setLoadingSlots(true);

    const formatted = format(selected, "yyyyMMdd");

    try {
      const res = await getAvailableSlots(formatted);
      setAvailableSlots(res.data || []);
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
            "outline-none focus-visible:ring-2 focus-visible:ring-border",
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {availableSlots.map((time) => (
          <Button
            type="button"
            key={time}
            variant="secondary"
            size="sm"
            onClick={() => handleTimeSelect(time)}
            className={cn(
              "anim text-xs hover:bg-primary/10",
              selectedTime === time &&
                "bg-primary/10 text-foreground hover:bg-primary/10",
            )}
          >
            {time}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          {monthNames[currentDate.getMonth()]}{" "}
          <span className="text-muted-foreground">
            {currentDate.getFullYear()}
          </span>
        </h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth("prev")}
            className="size-8 p-0"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateMonth("next")}
            className="size-8 p-0"
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Body */}
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

      {/* Time Slots: only shown if a date is selected */}
      {selectedDate && renderTimeSlots()}
    </div>
  );
}
