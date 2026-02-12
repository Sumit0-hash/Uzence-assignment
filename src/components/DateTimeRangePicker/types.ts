export type Timezone = string;

export type ZonedDateTime = {
  epochMs: number;   // canonical truth
  timezone: Timezone;
};

export type RangeBoundary = ZonedDateTime | null;

export type DateTimeRange = {
  start: RangeBoundary;
  end: RangeBoundary;
};

export type DraftRange = {
  selecting: "start" | "end";
  draftStart: RangeBoundary;
  draftEnd: RangeBoundary;
};

export type Constraints = {
  min?: number;
  max?: number;
  blackout?: number[];
  minDurationMs?: number;
  maxDurationMs?: number;
};

export type ValidationError =
  | "min"
  | "max"
  | "blackout"
  | "minDuration"
  | "maxDuration"
  | "invalidTime";

export type ValidationResult =
  | { valid: true }
  | { valid: false; reason: ValidationError };
