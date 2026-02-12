import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateTimeRangePicker } from "./DateTimeRangePicker";
import type { DateTimeRange } from "./types";

const meta = {
  title: "Components/DateTimeRangePicker",
  component: DateTimeRangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DateTimeRangePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

/* ---------------------------------- */
/* Controlled Wrapper */
/* ---------------------------------- */

function ControlledWrapper(props: any) {
  const [value, setValue] = useState<DateTimeRange | undefined>(
    props.value
  );

  return (
    <DateTimeRangePicker
      {...props}
      value={value}
      onChange={(range) => {
        setValue(range);
      }}
    />
  );
}

/* ---------------------------------- */
/* Default */
/* ---------------------------------- */

export const Default: Story = {
  render: (args) => <ControlledWrapper {...args} />,
};

/* ---------------------------------- */
/* With Min / Max Constraints */
/* ---------------------------------- */

export const WithMinMaxConstraints: Story = {
  render: (args) => <ControlledWrapper {...args} />,
  args: {
    constraints: {
      min: new Date(2025, 0, 5).getTime(),
      max: new Date(2025, 0, 25).getTime(),
    },
  },
};

/* ---------------------------------- */
/* With Blackout Dates */
/* ---------------------------------- */

export const WithBlackoutDates: Story = {
  render: (args) => <ControlledWrapper {...args} />,
  args: {
    constraints: {
      blackout: [
        new Date(2025, 0, 10).getTime(),
        new Date(2025, 0, 15).getTime(),
      ],
    },
  },
};

/* ---------------------------------- */
/* DST Edge Case */
/* ---------------------------------- */

export const DSTSpringForward: Story = {
  render: (args) => <ControlledWrapper {...args} />,
  args: {
    initialTimezone: "America/New_York",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Select March 9, 2025 and try entering 02:30 to trigger DST gap validation.",
      },
    },
  },
};

/* ---------------------------------- */
/* Keyboard Only */
/* ---------------------------------- */

export const KeyboardOnly: Story = {
  render: (args) => <ControlledWrapper {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "Complete full selection using Tab, Arrow keys, PageUp/PageDown, and Enter only.",
      },
    },
  },
};

/* ---------------------------------- */
/* Partial Selection */
/* ---------------------------------- */

export const PartialSelection: Story = {
  render: (args) => <ControlledWrapper {...args} />,
  args: {
    value: {
      start: {
        epochMs: new Date(2025, 0, 12).getTime(),
        timezone: "UTC",
      },
      end: null,
    },
  },
};

/* ---------------------------------- */
/* High Contrast Mode */
/* ---------------------------------- */

export const HighContrast: Story = {
  render: (args) => (
    <div className="bg-black text-white p-6">
      <ControlledWrapper {...args} />
    </div>
  ),
};
