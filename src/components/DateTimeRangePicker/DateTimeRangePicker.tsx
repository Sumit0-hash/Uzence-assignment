import { useState } from "react";
import { CalendarGrid } from "./CalendarGrid";
import { TimeInput } from "./TimeInput";
import { TimezoneSelector } from "./TimezoneSelector";
import { useRangeState } from "./useRangeState";
import { PresetList } from "./PresetList";
import type { DateTimeRange, Constraints } from "./types";
type DateTimeRangePickerProps = {
    value?: DateTimeRange;
    onChange?: (range: DateTimeRange) => void;
    constraints?: Constraints;
    initialTimezone?: string;
};
export function DateTimeRangePicker({
    value,
    onChange,
    constraints,
    initialTimezone = "UTC",
}: DateTimeRangePickerProps) {
    const [timezone, setTimezone] = useState(initialTimezone);
    const {
        range,
        draft,
        validation,
        selectDate,
        reset,
        setRange,
    } = useRangeState({
        initialValue: value,
        constraints,
    });
    if (validation.valid && onChange) {
        onChange(range);
    }
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(
        today.getFullYear()
    );
    const [currentMonth, setCurrentMonth] = useState(
        today.getMonth()
    );
    const goPrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentYear((y) => y - 1);
            setCurrentMonth(11);
        } else {
            setCurrentMonth((m) => m - 1);
        }
    };

    const goNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentYear((y) => y + 1);
            setCurrentMonth(0);
        } else {
            setCurrentMonth((m) => m + 1);
        }
    };
    return (
        <div className="flex flex-col gap-4 p-4 border rounded-md bg-white w-fit">

            {/* Timezone */}
            <TimezoneSelector
                value={timezone}
                onChange={setTimezone}
            />
            <PresetList
                timezone={timezone}
                onSelect={(presetRange) => {
                    setRange(presetRange);
                }}
            />


            {/* Month Navigation */}
            <div className="flex justify-between items-center">
                <button
                    onClick={goPrevMonth}
                    className="px-2 py-1 border rounded"
                >
                    Prev
                </button>

                <span className="font-semibold">
                    {currentYear} - {currentMonth + 1}
                </span>

                <button
                    onClick={goNextMonth}
                    className="px-2 py-1 border rounded"
                >
                    Next
                </button>
            </div>

            {/* Calendar */}
            <CalendarGrid
                year={currentYear}
                month={currentMonth}
                timezone={timezone}
                selectedStart={range.start?.epochMs ?? null}
                selectedEnd={range.end?.epochMs ?? null}
                constraints={constraints}
                onSelect={selectDate}
                onMonthChange={(year, month) => {
                    setCurrentYear(year);
                    setCurrentMonth(month);
                }}
            />

            {/* Time Inputs */}
            {range.start && (
                <TimeInput
                    dateEpoch={range.start.epochMs}
                    timezone={timezone}
                    value={range.start.epochMs}
                    onChange={(epoch) => {
                        if (!epoch) return;
                        setRange({
                            ...range,
                            start: {
                                epochMs: epoch,
                                timezone,
                            },
                        });
                    }}
                />
            )}

            {range.end && (
                <TimeInput
                    dateEpoch={range.end.epochMs}
                    timezone={timezone}
                    value={range.end.epochMs}
                    onChange={(epoch) => {
                        if (!epoch) return;
                        setRange({
                            ...range,
                            end: {
                                epochMs: epoch,
                                timezone,
                            },
                        });
                    }}
                />
            )}

            {/* Validation Error */}
            {!validation.valid && (
                <div
                    role="alert"
                    className="text-danger text-sm"
                >
                    Validation error: {validation.reason}
                </div>
            )}

            <button
                onClick={reset}
                className="px-3 py-1 border rounded"
            >
                Reset
            </button>
        </div>
    );
}
