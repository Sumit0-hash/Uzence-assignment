import { getStartOfDayInZone } from "./utils/timezone";
import type{ DateTimeRange } from "./types";
type PresetListProps = {
  timezone: string;
  onSelect: (range: DateTimeRange) => void;
};
function nowEpoch(): number {
  return Date.now();
}
function getTodayRange(timezone: string): DateTimeRange {
  const now = nowEpoch();

  const start = getStartOfDayInZone(now, timezone);
  const end = start + 24 * 60 * 60 * 1000 - 1;

  return {
    start: { epochMs: start, timezone },
    end: { epochMs: end, timezone },
  };
}
function getLast7DaysRange(timezone: string): DateTimeRange {
  const now = nowEpoch();

  const todayStart = getStartOfDayInZone(now, timezone);
  const start =
    todayStart - 6 * 24 * 60 * 60 * 1000;

  const end =
    todayStart + 24 * 60 * 60 * 1000 - 1;

  return {
    start: { epochMs: start, timezone },
    end: { epochMs: end, timezone },
  };
}
function getThisMonthRange(timezone: string): DateTimeRange {
  const now = nowEpoch();
  const parts = new Date(now);

  const monthStart = getStartOfDayInZone(
    new Date(parts.getFullYear(), parts.getMonth(), 1).getTime(),
    timezone
  );

  const nextMonthStart = getStartOfDayInZone(
    new Date(parts.getFullYear(), parts.getMonth() + 1, 1).getTime(),
    timezone
  );

  return {
    start: { epochMs: monthStart, timezone },
    end: {
      epochMs: nextMonthStart - 1,
      timezone,
    },
  };
}
export function PresetList({
  timezone,
  onSelect,
}: PresetListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() =>
          onSelect(getTodayRange(timezone))
        }
        className="px-2 py-1 border rounded text-sm"
      >
        Today
      </button>

      <button
        onClick={() =>
          onSelect(getLast7DaysRange(timezone))
        }
        className="px-2 py-1 border rounded text-sm"
      >
        Last 7 Days
      </button>

      <button
        onClick={() =>
          onSelect(getThisMonthRange(timezone))
        }
        className="px-2 py-1 border rounded text-sm"
      >
        This Month
      </button>
    </div>
  );
}
