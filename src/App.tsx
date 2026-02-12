import { generateCalendarMatrix } from "./components/DateTimeRangePicker/utils/dateMath";



export default function App() {
  const matrix = generateCalendarMatrix(2025, 2);
  console.log(matrix);
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-surface p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold text-primary">
          Tailwind Working
        </h1>
      </div>
    </div>
  );
}
