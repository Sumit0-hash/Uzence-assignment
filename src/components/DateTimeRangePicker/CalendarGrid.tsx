import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { generateCalendarMatrix } from "./utils/dateMath";
import type { Constraints, ZonedDateTime } from "./types";

type CalendarGridProps = {
  year: number;
  month: number;
  timezone: string;
  selectedStart?: number | null;
  selectedEnd?: number | null;
  constraints?: Constraints;
  onSelect: (date: ZonedDateTime) => void;
  onMonthChange: (year: number, month: number) => void;
};

export function CalendarGrid({
  year,
  month,
  timezone,
  selectedStart,
  selectedEnd,
  constraints,
  onSelect,
  onMonthChange,
}: CalendarGridProps) {
  const matrix = useMemo(() => {
    return generateCalendarMatrix(year, month);
  }, [year, month]);

  const [focusedIndex, setFocusedIndex] = useState(0);

  const cellRefs = useRef<(HTMLButtonElement | null)[]>(
    Array(42).fill(null)
  );

  const moveFocus = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= 42) return;
    setFocusedIndex(newIndex);
  }, []);

  const isInRange = useCallback(
    (epoch: number) => {
      if (selectedStart == null || selectedEnd == null)
        return false;

      const start = Math.min(selectedStart, selectedEnd);
      const end = Math.max(selectedStart, selectedEnd);

      return epoch > start && epoch < end;
    },
    [selectedStart, selectedEnd]
  );

  const isDisabled = useCallback(
    (epoch: number) => {
      if (!constraints) return false;

      if (
        constraints.min !== undefined &&
        epoch < constraints.min
      )
        return true;

      if (
        constraints.max !== undefined &&
        epoch > constraints.max
      )
        return true;

      if (constraints.blackout?.includes(epoch))
        return true;

      return false;
    },
    [constraints]
  );

  const changeMonth = useCallback(
    (delta: number) => {
      let newMonth = month + delta;
      let newYear = year;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      onMonthChange(newYear, newMonth);
    },
    [month, year, onMonthChange]
  );

  const handleKeyDown = useCallback(
    (
      e: React.KeyboardEvent<HTMLButtonElement>,
      index: number
    ) => {
      const row = Math.floor(index / 7);
      const col = index % 7;
      const cell = matrix[row][col];

      const disabled = isDisabled(cell.epochMs);

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          moveFocus(index + 1);
          break;

        case "ArrowLeft":
          e.preventDefault();
          moveFocus(index - 1);
          break;

        case "ArrowDown":
          e.preventDefault();
          moveFocus(index + 7);
          break;

        case "ArrowUp":
          e.preventDefault();
          moveFocus(index - 7);
          break;

        case "PageUp":
          e.preventDefault();
          if (e.shiftKey) {
            onMonthChange(year - 1, month);
          } else {
            changeMonth(-1);
          }
          break;

        case "PageDown":
          e.preventDefault();
          if (e.shiftKey) {
            onMonthChange(year + 1, month);
          } else {
            changeMonth(1);
          }
          break;

        case "Home":
          e.preventDefault();
          moveFocus(index - col);
          break;

        case "End":
          e.preventDefault();
          moveFocus(index + (6 - col));
          break;

        case "Enter":
        case " ":
          e.preventDefault();
          if (!disabled) {
            onSelect({
              epochMs: cell.epochMs,
              timezone,
            });
          }
          break;
      }
    },
    [
      matrix,
      moveFocus,
      onSelect,
      timezone,
      isDisabled,
      changeMonth,
      year,
      month,
      onMonthChange,
    ]
  );

  useEffect(() => {
    const node = cellRefs.current[focusedIndex];
    node?.focus();
  }, [focusedIndex]);

  return (
    <div
      role="grid"
      aria-label="Calendar"
      className="grid grid-rows-6 gap-1"
    >
      {matrix.map((week, rowIndex) => (
        <div
          key={rowIndex}
          role="row"
          className="grid grid-cols-7 gap-1"
        >
          {week.map((cell, colIndex) => {
            const index = rowIndex * 7 + colIndex;

            const isSelected =
              cell.epochMs === selectedStart ||
              cell.epochMs === selectedEnd;

            const inRange = isInRange(cell.epochMs);

            const disabled = isDisabled(cell.epochMs);

            return (
              <button
                key={cell.epochMs}
                data-epoch={cell.epochMs}
                ref={(el) => {
                  cellRefs.current[index] = el;
                }}
                role="gridcell"
                tabIndex={
                  index === focusedIndex ? 0 : -1
                }
                aria-selected={isSelected}
                aria-disabled={disabled}
                aria-label={new Date(
                  cell.epochMs
                ).toDateString()}
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                onClick={() => {
                  if (disabled) return;

                  onSelect({
                    epochMs: cell.epochMs,
                    timezone,
                  });
                }}
                className={`
                  h-10 w-10 rounded-md text-sm
                  ${
                    cell.inCurrentMonth
                      ? "bg-white"
                      : "bg-gray-100"
                  }
                  ${inRange ? "bg-blue-100" : ""}
                  ${
                    isSelected
                      ? "bg-primary text-white"
                      : ""
                  }
                  ${
                    disabled
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-gray-200"
                  }
                `}
              >
                {new Date(
                  cell.epochMs
                ).getDate()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
