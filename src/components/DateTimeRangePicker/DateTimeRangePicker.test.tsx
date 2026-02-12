import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { DateTimeRangePicker } from "./DateTimeRangePicker";

describe("DateTimeRangePicker", () => {
  it("renders calendar grid", () => {
    render(<DateTimeRangePicker />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("selects a start and end date when clicked twice", async () => {
    render(<DateTimeRangePicker />);

    const selectableCells = screen
      .getAllByRole("gridcell")
      .filter(
        (cell) =>
          cell.getAttribute("aria-disabled") !== "true"
      );

    const first = selectableCells[0] as HTMLElement;
    const second = selectableCells[1] as HTMLElement;

    await userEvent.click(first);
    await userEvent.click(second);

    expect(first).toHaveAttribute(
      "aria-selected",
      "true"
    );

    expect(second).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("disables dates before min constraint", () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // 6th day of current month
    const minDate = new Date(
      currentYear,
      currentMonth,
      6
    ).getTime();

    render(
      <DateTimeRangePicker
        constraints={{ min: minDate }}
      />
    );

    const cells = screen.getAllByRole("gridcell");

    const disabledCells = cells.filter(
      (cell) =>
        Number(cell.getAttribute("data-epoch")) <
        minDate
    );

    expect(disabledCells.length).toBeGreaterThan(0);

    disabledCells.forEach((cell) =>
      expect(cell).toHaveAttribute(
        "aria-disabled",
        "true"
      )
    );
  });
});
