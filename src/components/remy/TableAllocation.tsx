import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tables = Array.from({ length: 30 }, (_, i) => {
  const id = i + 1;
  const shape = id % 3 === 0 ? ("rect" as const) : ("circle" as const);
  const seats = shape === "rect" ? (id % 4 === 0 ? 6 : 4) : (id % 5 === 0 ? 2 : 4);
  return { id, shape, seats };
});


const reservations = [
  { id: "r1", name: "Smith", size: 2, time: "19:00" },
  { id: "r2", name: "Lee", size: 4, time: "19:30" },
  { id: "r3", name: "Garcia", size: 3, time: "20:00" },
];

const isReserved = (id: number, date: Date) => ((id * (date.getDate() + 3) + date.getMonth() + date.getFullYear()) % 7) === 0;

const ReservationCard: React.FC<{ r: (typeof reservations)[number] }> = ({ r }) => (
  <div
    draggable
    onDragStart={(e) => e.dataTransfer.setData("text/plain", r.id)}
    className="rounded-md border border-border p-2 bg-card text-card-foreground text-sm cursor-grab active:cursor-grabbing"
    aria-label={`Reservation ${r.name} party of ${r.size} at ${r.time}`}
  >
    <div className="font-medium">{r.name}</div>
    <div className="text-muted-foreground text-xs">{r.size} guests • {r.time}</div>
  </div>
);

const TableAllocation: React.FC = () => {
  const [zoom, setZoom] = React.useState<number[]>([100]);
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const months = [
    "January","February","March","April","May","June","July","August","September","October","November","December"
  ];
  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const goPrevDay = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1));
  const goNextDay = () => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1));

  const updateDay = (day: number) => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
  const updateMonth = (m: number) => {
    const y = selectedDate.getFullYear();
    const d = Math.min(selectedDate.getDate(), new Date(y, m + 1, 0).getDate());
    setSelectedDate(new Date(y, m, d));
  };
  const updateYear = (y: number) => {
    const m = selectedDate.getMonth();
    const d = Math.min(selectedDate.getDate(), new Date(y, m + 1, 0).getDate());
    setSelectedDate(new Date(y, m, d));
  };

  const predictedWalkIns = 5 + ((selectedDate.getDate() * 3 + selectedDate.getMonth() + selectedDate.getFullYear()) % 20);

  return (
    <section aria-label="Table Allocation View" className="space-y-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Table Allocation</CardTitle>
          <div className="flex items-center gap-3">
            <label htmlFor="zoom" className="text-sm text-muted-foreground">Zoom</label>
            <div className="w-40">
              <Slider
                id="zoom"
                value={zoom}
                onValueChange={setZoom}
                min={50}
                max={150}
                step={10}
                aria-label="Zoom floor map"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div
                className="relative border border-border rounded-lg bg-muted/20"
                style={{ height: 360 }}
              >
                <div
                  className="absolute inset-3 origin-top-left"
                  style={{ transform: `scale(${zoom[0] / 100})` }}
                >
                  <div className="grid grid-cols-5 gap-x-6 gap-y-8">
                    {tables.map((t) => (
                      <div
                        key={t.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const rid = e.dataTransfer.getData("text/plain");
                          if (rid) {
                            toast({ title: `Placed reservation on Table ${t.id}`, description: "Static demo only" });
                          }
                        }}
                        aria-label={`Table ${t.id} with ${t.seats} seats`}
                        className={
                          `${t.shape === "circle" ? "h-16 w-16 md:h-20 md:w-20 rounded-full" : "h-16 w-24 md:h-20 md:w-28 rounded-xl"} flex items-center justify-center border shadow-sm ${
                            isReserved(t.id, selectedDate)
                              ? "bg-secondary/20 border-secondary text-secondary-foreground"
                              : "bg-accent/15 border-accent text-accent-foreground"
                          }`
                        }
                      >
                        <div className="text-sm font-medium">T{t.id} • {t.seats}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Reservations</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous day"
                  onClick={goPrevDay}
                  className="px-2 py-1 rounded-md border border-border hover:bg-muted"
                >&lt;</button>
                <div className="flex items-center gap-2">
                  <Select value={`${selectedDate.getDate()}`} onValueChange={(v) => updateDay(Number(v))}>
                    <SelectTrigger className="w-20" aria-label="Select day">
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-popover">
                      {days.map((d) => (
                        <SelectItem key={d} value={`${d}`}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={`${selectedDate.getMonth()}`} onValueChange={(v) => updateMonth(Number(v))}>
                    <SelectTrigger className="w-36" aria-label="Select month">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-popover">
                      {months.map((m, idx) => (
                        <SelectItem key={m} value={`${idx}`}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={`${selectedDate.getFullYear()}`} onValueChange={(v) => updateYear(Number(v))}>
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
                <button
                  type="button"
                  aria-label="Next day"
                  onClick={goNextDay}
                  className="px-2 py-1 rounded-md border border-border hover:bg-muted"
                >&gt;</button>
              </div>

              {reservations.map((r) => (
                <ReservationCard key={r.id} r={r} />
              ))}

              <div className="pt-2 text-sm">Predicted walk-ins: {predictedWalkIns}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default TableAllocation;
