"use client";

import {
  PiArrowClockwiseBold,
  PiArrowElbowDownLeftBold,
  PiDiceSixDuotone,
} from "react-icons/pi";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import noteMutation from "@/mutation/note.mutation";
import { ColorOption, DatabaseColor } from "@/types/note.types";

const COLOR_CLASSES: Record<DatabaseColor, ColorOption> = {
  red: "bg-red-200",
  pink: "bg-pink-200",
  blue: "bg-blue-200",
  sky: "bg-sky-200",
  green: "bg-green-200",
  emerald: "bg-emerald-200",
  purple: "bg-purple-200",
  yellow: "bg-yellow-200",
  orange: "bg-orange-200",
};

const COLORS: DatabaseColor[] = [
  "red",
  "pink",
  "blue",
  "sky",
  "green",
  "emerald",
  "purple",
  "yellow",
  "orange",
];

function ColorDot({ color }: { color: DatabaseColor }) {
  return (
    <span
      className={`inline-block size-2 rounded-full ${COLOR_CLASSES[color]}`}
      aria-hidden
    />
  );
}

type NoteFormProps = {
  onClose?: () => void; // <-- add this
};

const NoteForm = ({ onClose }: NoteFormProps) => {
  const [form, setForm] = useState<{ note: string; color: DatabaseColor }>({
    note: "",
    color: "red",
  });

  const { addNoteMutation } = noteMutation();

  const submit = async () => {
    if (!form.note.trim() || addNoteMutation.isPending) return;

    try {
      await addNoteMutation.mutateAsync({
        note: form.note.trim(),
        color: form.color,
      });
      // success → reset and close
      setForm((prev) => ({ ...prev, note: "" }));
      onClose?.();
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      await submit();
    }
  };

  const cycleColor = () => {
    setForm((prev) => {
      const idx = COLORS.indexOf(prev.color);
      return { ...prev, color: COLORS[(idx + 1) % COLORS.length] };
    });
  };

  return (
    <form
      id="note-form"
      onSubmit={handleSubmit}
      className="xs:grid-cols-7 grid w-full max-w-lg gap-4"
    >
      <div className="xs:col-span-2 flex flex-col items-center gap-4">
        <div
          aria-hidden
          className={[
            "not-xs:hidden aspect-square w-full rounded",
            COLOR_CLASSES[form.color],
          ].join(" ")}
        />

        <div className="xs:hidden w-full">
          <Select
            value={form.color}
            onValueChange={(v) =>
              setForm((prev) => ({ ...prev, color: v as DatabaseColor }))
            }
          >
            <SelectTrigger className="justify-start gap-2">
              <SelectValue placeholder="Pick a color" />
            </SelectTrigger>
            <SelectContent>
              {COLORS.map((c) => (
                <SelectItem key={c} value={c} className="gap-2">
                  <div className="flex items-center gap-2">
                    <ColorDot color={c} />
                    <span className="capitalize">{c}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="xs:inline-flex hidden w-full gap-2"
          onClick={cycleColor}
        >
          <PiDiceSixDuotone className="size-4" />
          Change
        </Button>
      </div>

      <div className="xs:col-span-5 flex flex-col gap-2">
        <Textarea
          id="note"
          name="note"
          value={form.note}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, note: e.target.value }))
          }
          onKeyDown={handleKeyDown}
          placeholder="Leave a message…"
          className="h-auto w-full grow text-sm"
          disabled={addNoteMutation.isPending}
          maxLength={100}
        />
      </div>

      <Button
        disabled={addNoteMutation.isPending || !form.note.trim()}
        type="submit"
        size="sm"
        variant="secondary"
        className="col-span-full w-full gap-2"
      >
        {addNoteMutation.isPending ? (
          <>
            <PiArrowClockwiseBold className="size-4 animate-spin" />
            <span>Saving…</span>
          </>
        ) : (
          <>
            <span>Enter</span>
            <PiArrowElbowDownLeftBold className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export default NoteForm;
