import type{ DateTimeRange, Constraints, ValidationResult } from "../types";

export function validateRange(
  range: DateTimeRange,
  constraints?: Constraints
): ValidationResult {
  if (!range.start || !range.end) {
    return { valid: true };
  }

  const start = range.start.epochMs;
  const end = range.end.epochMs;

  if (start > end) {
    return { valid: false, reason: "minDuration" };
  }

  if (!constraints) {
    return { valid: true };
  }

  if (constraints.min !== undefined && start < constraints.min) {
    return { valid: false, reason: "min" };
  }

  if (constraints.max !== undefined && end > constraints.max) {
    return { valid: false, reason: "max" };
  }

  if (constraints.blackout) {
    const overlapsBlackout = constraints.blackout.some(
      (b) => b >= start && b <= end
    );

    if (overlapsBlackout) {
      return { valid: false, reason: "blackout" };
    }
  }

  const duration = end - start;

  if (
    constraints.minDurationMs !== undefined &&
    duration < constraints.minDurationMs
  ) {
    return { valid: false, reason: "minDuration" };
  }

  if (
    constraints.maxDurationMs !== undefined &&
    duration > constraints.maxDurationMs
  ) {
    return { valid: false, reason: "maxDuration" };
  }

  return { valid: true };
}
