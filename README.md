# DateTime Range Picker

A fully accessible, timezone-aware DateTime Range Picker built from scratch using:

- React
- TypeScript
- Tailwind CSS
- Storybook

No external UI component libraries were used.

---

## ✨ Features

- Date + time range selection
- Timezone switching (instant preserved)
- DST gap detection (no silent coercion)
- Constraint enforcement (min, max, blackout, duration)
- Keyboard-only interaction
- Full ARIA grid semantics
- Relative and absolute presets
- Strict TypeScript typing
- Interaction tests (keyboard + validation)
- Accessibility validated via Storybook a11y

---

## 🧠 Architecture Overview

### Canonical Time Model

All selections are stored as:

epochMs + timezone

Timezone switching never mutates the selected instant — only presentation changes.

---

### Internal State Model

- `DateTimeRange` (committed)
- `DraftRange` (partial selection)
- Validation pipeline
- Constraint enforcement layer
- DST-safe conversion utilities

---

### Accessibility

- role="grid"
- role="row"
- role="gridcell"
- aria-selected
- aria-disabled
- Roving tabindex
- Arrow navigation
- PageUp/PageDown month navigation
- Home/End support
- Keyboard-only completion

---

## 🧪 Testing

Behavioral interaction tests cover:

- Keyboard navigation
- Enter selection
- Disabled date prevention
- Month switching via keyboard
- DST invalid time detection

Tests use:

- Vitest
- React Testing Library
- user-event
- jsdom

Run tests:

```
npm run test
```
## 📚 Storybook

Stories include:

- Default
- Constraint violations
- Blackout dates
- DST edge case
- Partial selection
- Keyboard-only usage
- High contrast mode

Run locally:



- npm run storybook
## 🏗 Technical Highlights

- Fully controlled date engine (no date libraries used)
- Custom DST-safe zoned conversion logic
- Validation pipeline separated from UI
- Stateless calendar grid component
- Range state managed via dedicated hook
- Strong separation of concerns
- Strict TypeScript enforcement


# 🚀 Getting Started

- Install dependencies:
```
npm install
```

- Run dev server:
```
npm run dev
```
## 🏗 Project Structure:-

```
src/
  components/
    DateTimeRangePicker/
      CalendarGrid.tsx
      TimeInput.tsx
      TimezoneSelector.tsx
      PresetList.tsx
      useRangeState.ts
      utils/
        dateMath.ts
        timezone.ts
        validation.ts
  test/
  ```

# 🔒 Constraints Supported

- Minimum date
- Maximum date
- Blackout dates
- Minimum duration
- Maximum duration
- All constraint violations surface explicit validation errors.

# ⚠️ Design Decisions

- No silent time correction during DST gaps

- No auto-adjusting invalid input

- Deterministic preset rounding

- Controlled + uncontrolled usage supported

- No component library dependencies

# Why This Exist
This component was built as part of an internship technical assessment to demonstrate deep understanding of timezone handling, accessibility, keyboard navigation, validation pipelines, and scalable React architecture — without relying on external component libraries.

## 📉 Dependency Philosophy

This project intentionally avoids:

- UI component libraries (Material UI, Radix, Chakra, etc.)
- Date libraries (moment, dayjs, date-fns)
- AI-based UI generators

All logic and UI primitives are built from scratch to demonstrate engineering depth.



## 🔗 Live Preview

Storybook: https://uzence-assignment-weld-ten.vercel.app/?path=/docs/components-datetimerangepicker--docs 
GitHub Repository: https://github.com/Sumit0-hash/Uzence-assignment


# 📄 License

Created as part of internship technical assessment.