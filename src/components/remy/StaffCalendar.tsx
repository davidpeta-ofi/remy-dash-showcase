import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";


const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const months = [
  "January","February","March","April","May","June","July","August","September","October","November","December"
];

const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);

const mondayFirst = (d: number) => (d + 6) % 7; // JS: Sun=0..Sat=6 -> Mon=0..Sun=6

function getMonthCells(month: number, year: number) {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const start = mondayFirst(first.getDay());
  const totalCells = Math.ceil((start + daysInMonth) / 7) * 7;
  const cells = Array.from({ length: totalCells }, (_, idx) => {
    const day = idx - start + 1;
    return day >= 1 && day <= daysInMonth ? day : null;
  });
  return { cells };
}

const seeded = (d: number, m: number, y: number, seed: number, min = 1, max = 10) => {
  const span = max - min + 1;
  const val = (d * (seed + 3) + m * 7 + y) % span;
  return min + (val < 0 ? val + span : val);
};

const StaffCalendar: React.FC = () => {
  const today = new Date();
  const [month, setMonth] = React.useState(today.getMonth());
  const [year, setYear] = React.useState(today.getFullYear());

  const { cells } = getMonthCells(month, year);

  const prevMonth = () => {
    const d = new Date(year, month - 1, 1);
    setMonth(d.getMonth());
    setYear(d.getFullYear());
  };
  const nextMonth = () => {
    const d = new Date(year, month + 1, 1);
    setMonth(d.getMonth());
    setYear(d.getFullYear());
  };

  return (
    <section aria-label="Monthly Staff Calendar" className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous month"
            onClick={prevMonth}
            className="px-2 py-1 rounded-md border border-border hover:bg-muted"
          >
            &lt;
          </button>
          <span>{months[month]} {year}</span>
          <button
            type="button"
            aria-label="Next month"
            onClick={nextMonth}
            className="px-2 py-1 rounded-md border border-border hover:bg-muted"
          >
            &gt;
          </button>
          <div className="flex items-center gap-2 ml-4">
            <Select value={`${month}`} onValueChange={(v) => setMonth(Number(v))}>
              <SelectTrigger className="w-36" aria-label="Select month">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-popover">
                {months.map((m, idx) => (
                  <SelectItem key={m} value={`${idx}`}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={`${year}`} onValueChange={(v) => setYear(Number(v))}>
              <SelectTrigger className="w-28" aria-label="Select year">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-popover">
                {years.map((y) => (
                  <SelectItem key={y} value={`${y}`}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </h2>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 text-xs border-b border-border/60">
            {daysOfWeek.map((d) => (
              <div key={d} className="px-3 py-2 text-muted-foreground font-medium">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-px bg-border/60">
            {cells.map((day, idx) => (
              <div
                key={idx}
                className="min-h-28 bg-background p-3 flex flex-col gap-1"
                aria-label={day ? `Day ${day}` : "Empty cell"}
              >
                <span className="text-xs font-medium text-muted-foreground">{day ?? ""}</span>
                {day && (
                  <div className="mt-1 space-y-1 text-sm">
                    <p>Kitchen: {seeded(day, month, year, 1, 1, 9)}</p>
                    <p>floor: {seeded(day, month, year, 2, 1, 9)}</p>
                    <p>Delivery: {seeded(day, month, year, 3, 1, 9)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};


export default StaffCalendar;
