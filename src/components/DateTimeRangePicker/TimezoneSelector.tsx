import { useMemo } from "react";
type TimezoneSelectorProps = {
  value: string;
  onChange: (zone: string) => void;
};
export function TimezoneSelector({
  value,
  onChange,
}: TimezoneSelectorProps) {
  const zones = useMemo(() => {
    if (typeof Intl.supportedValuesOf === "function") {
      return Intl.supportedValuesOf("timeZone");
    }

    // Fallback minimal list
    return [
      "UTC",
      "America/New_York",
      "Europe/London",
      "Asia/Kolkata",
      "Asia/Tokyo",
    ];
  }, []);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">
        Timezone
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md px-2 py-1"
      >
        {zones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
    </div>
  );
}
