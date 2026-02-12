import { useState, useEffect, useCallback } from "react";
import { zonedLocalToEpoch } from "./utils/timezone";
type TimeInputProps = {
  dateEpoch: number; // selected day
  timezone: string;
  value: number | null; // full epoch with time
  onChange: (epochMs: number | null) => void;
};
export function TimeInput({
  dateEpoch,
  timezone,
  value,
  onChange,
}: TimeInputProps) {
  const [timeString, setTimeString] = useState("00:00");
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!value) return;

    const date = new Date(value);
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    setTimeString(`${hh}:${mm}`);
  }, [value]);
  const validateAndEmit = useCallback(
    (input: string) => {
      const match = /^(\d{2}):(\d{2})$/.exec(input);
      if (!match) {
        setError("Invalid format");
        onChange(null);
        return;
      }

      const hour = Number(match[1]);
      const minute = Number(match[2]);

      if (hour > 23 || minute > 59) {
        setError("Invalid time");
        onChange(null);
        return;
      }

      const baseDate = new Date(dateEpoch);

      const result = zonedLocalToEpoch(
        {
          year: baseDate.getFullYear(),
          month: baseDate.getMonth(),
          day: baseDate.getDate(),
          hour,
          minute,
        },
        timezone
      );

      if (result.invalid || result.epochMs === null) {
        setError("Time does not exist in this timezone (DST gap)");
        onChange(null);
        return;
      }

      setError(null);
      onChange(result.epochMs);
    },
    [dateEpoch, timezone, onChange]
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeString(value);
  };

  const handleBlur = () => {
    validateAndEmit(timeString);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;

    e.preventDefault();

    const match = /^(\d{2}):(\d{2})$/.exec(timeString);
    if (!match) return;

    let hour = Number(match[1]);
    let minute = Number(match[2]);

    const delta = e.key === "ArrowUp" ? 1 : -1;

    minute += delta;

    if (minute > 59) {
      minute = 0;
      hour++;
    }
    if (minute < 0) {
      minute = 59;
      hour--;
    }

    if (hour > 23) hour = 0;
    if (hour < 0) hour = 23;

    const newValue =
      String(hour).padStart(2, "0") +
      ":" +
      String(minute).padStart(2, "0");

    setTimeString(newValue);
    validateAndEmit(newValue);
  };
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">
        Time (HH:MM)
      </label>

      <input
        type="text"
        value={timeString}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-invalid={!!error}
        aria-describedby={error ? "time-error" : undefined}
        className={`
          border rounded-md px-2 py-1
          ${error ? "border-danger" : "border-gray-300"}
        `}
      />

      {error && (
        <span
          id="time-error"
          role="alert"
          className="text-sm text-danger"
        >
          {error}
        </span>
      )}
    </div>
  );
}
