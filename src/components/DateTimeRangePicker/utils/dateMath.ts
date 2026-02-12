// dateMath.ts

export function startOfDay(epochMs: number): number {
  const date = new Date(epochMs);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

export function addDays(epochMs: number, days: number): number {
  const date = new Date(epochMs);
  date.setDate(date.getDate() + days);
  return date.getTime();
}

export function isSameDay(a: number, b: number): boolean {
  const d1 = new Date(a);
  const d2 = new Date(b);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay(); 
  // 0 = Sunday, 6 = Saturday
}

export type CalendarCell = {
  epochMs: number;
  inCurrentMonth: boolean;
};

export function generateCalendarMatrix(
  year: number,
  month: number
): CalendarCell[][] {
  const matrix: CalendarCell[][] = [];

  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);

  const prevMonthDays = getDaysInMonth(year, month - 1);

  let currentDay = 1;
  let nextMonthDay = 1;

  for (let row = 0; row < 6; row++) {
    const week: CalendarCell[] = [];

    for (let col = 0; col < 7; col++) {
      const cellIndex = row * 7 + col;

      if (cellIndex < firstDay) {
        // previous month
        const day = prevMonthDays - firstDay + col + 1;
        const date = new Date(year, month - 1, day);

        week.push({
          epochMs: date.getTime(),
          inCurrentMonth: false,
        });
      } else if (currentDay <= daysInMonth) {
        // current month
        const date = new Date(year, month, currentDay);

        week.push({
          epochMs: date.getTime(),
          inCurrentMonth: true,
        });

        currentDay++;
      } else {
        // next month
        const date = new Date(year, month + 1, nextMonthDay);

        week.push({
          epochMs: date.getTime(),
          inCurrentMonth: false,
        });

        nextMonthDay++;
      }
    }

    matrix.push(week);
  }

  return matrix;
}
