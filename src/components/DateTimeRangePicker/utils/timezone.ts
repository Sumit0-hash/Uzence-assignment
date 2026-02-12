export function formatInZone(
  epochMs: number,
  timeZone: string
): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(epochMs));
}

export function getZonedParts(
  epochMs: number,
  timeZone: string
) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date(epochMs));

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value);

  return {
    year: get("year"),
    month: get("month") - 1,
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
  };
}

export type LocalDateInput = {
  year: number;
  month: number; // 0-based
  day: number;
  hour: number;
  minute: number;
};


export function zonedLocalToEpoch(
  input: LocalDateInput,
  timeZone: string
): { epochMs: number | null; invalid: boolean } {
  // Step 1: Create a UTC date from input (pretend input is UTC)
  const utcGuess = Date.UTC(
    input.year,
    input.month,
    input.day,
    input.hour,
    input.minute,
    0
  );

  // Step 2: Get actual offset between UTC and target zone
  const zonedParts = getZonedParts(utcGuess, timeZone);

  const reconstructedUtc = Date.UTC(
    zonedParts.year,
    zonedParts.month,
    zonedParts.day,
    zonedParts.hour,
    zonedParts.minute,
    0
  );

  const offset = reconstructedUtc - utcGuess;

  const correctedEpoch = utcGuess - offset;

  // Step 3: Validate round-trip (detect DST gap)
  const verify = getZonedParts(correctedEpoch, timeZone);

  const isMatch =
    verify.year === input.year &&
    verify.month === input.month &&
    verify.day === input.day &&
    verify.hour === input.hour &&
    verify.minute === input.minute;

  if (!isMatch) {
    return { epochMs: null, invalid: true };
  }

  return { epochMs: correctedEpoch, invalid: false };
}



export function changeTimezone(
  epochMs: number,
  newZone: string
) {
  return {
    epochMs,
    timezone: newZone,
  };
}

export function getStartOfDayInZone(
  epochMs: number,
  timeZone: string
): number {
  const parts = getZonedParts(epochMs, timeZone);

  const result = zonedLocalToEpoch(
    {
      year: parts.year,
      month: parts.month,
      day: parts.day,
      hour: 0,
      minute: 0,
    },
    timeZone
  );

  if (result.invalid || result.epochMs === null) {
    throw new Error("Invalid midnight in zone");
  }

  return result.epochMs;
}
