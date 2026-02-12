import { useState, useCallback } from "react";
import type {
    DateTimeRange,
    DraftRange,
    ZonedDateTime,
    Constraints,
    ValidationResult,
} from "./types";
import { validateRange } from "./utils/validation";

type UseRangeStateProps = {
    initialValue?: DateTimeRange;
    constraints?: Constraints;
};

export function useRangeState({
    initialValue,
    constraints,
}: UseRangeStateProps) {


    const [range, setRange] = useState<DateTimeRange>(
        initialValue ?? { start: null, end: null }
    );

    const [draft, setDraft] = useState<DraftRange>({
        selecting: "start",
        draftStart: null,
        draftEnd: null,
    });

    const [validation, setValidation] =
        useState<ValidationResult>({ valid: true });

    const selectDate = useCallback(
        (date: ZonedDateTime) => {
            if (draft.selecting === "start") {
                setDraft({
                    selecting: "end",
                    draftStart: date,
                    draftEnd: null,
                });
            } else {
                const newRange: DateTimeRange = {
                    start: draft.draftStart,
                    end: date,
                };

                const result = validateRange(newRange, constraints);

                setValidation(result);

                if (result.valid) {
                    setRange(newRange);
                }

                setDraft({
                    selecting: "start",
                    draftStart: null,
                    draftEnd: null,
                });
            }
        },
        [draft, constraints]
    );

    const reset = useCallback(() => {
        setRange({ start: null, end: null });
        setDraft({
            selecting: "start",
            draftStart: null,
            draftEnd: null,
        });
        setValidation({ valid: true });
    }, []);

    return {
        range,
        draft,
        validation,
        selectDate,
        reset,
        setRange,
    };
}
