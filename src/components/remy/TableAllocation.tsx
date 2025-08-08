import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

const tables = [
  { id: 1, shape: "circle" as const, seats: 2 },
  { id: 2, shape: "circle" as const, seats: 4 },
  { id: 3, shape: "rect" as const, seats: 6 },
  { id: 4, shape: "rect" as const, seats: 4 },
  { id: 5, shape: "circle" as const, seats: 2 },
  { id: 6, shape: "rect" as const, seats: 8 },
];

const reservations = [
  { id: "r1", name: "Smith", size: 2, time: "19:00" },
  { id: "r2", name: "Lee", size: 4, time: "19:30" },
  { id: "r3", name: "Garcia", size: 3, time: "20:00" },
];

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
                  <div className="grid grid-cols-6 gap-4">
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
                          t.shape === "circle"
                            ? "h-20 w-20 rounded-full bg-card border border-border flex items-center justify-center"
                            : "h-20 w-28 rounded-md bg-card border border-border flex items-center justify-center"
                        }
                      >
                        <div className="text-sm text-muted-foreground">T{t.id} • {t.seats}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Reservations</h3>
              {reservations.map((r) => (
                <ReservationCard key={r.id} r={r} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default TableAllocation;
