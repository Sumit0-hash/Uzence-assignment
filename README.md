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
# 📚 Storybook

- Stories include:

- Default

- Constraint violations

- Blackout dates

- DST edge case

- Partial selection

- Keyboard-only usage

- High contrast mode

- Run locally:

- npm run storybook

# 🚀 Getting Started

- Install dependencies:
```
npm install
```

- Run dev server:
```
npm run dev
```
# 🏗 Project Structure:-

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

# 📦 Deployment
Storybook preview is deployed via Chromatic / Vercel.

# 📄 License

Created as part of internship technical assessment.