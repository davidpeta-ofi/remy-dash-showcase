import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const sampleDayInfo = (day: number) => ({
  staff: "5 staff: 2 kitchen, 2 floor, 1 delivery",
  sales: "€1.2K",
  guests: "45 guests",
  shifts: day % 3 === 0 ? ["AM", "PM"] : day % 2 === 0 ? ["AM"] : ["PM"],
});

const staffRoles = ["All", "Kitchen", "Floor", "Delivery"];

const ShiftBadge: React.FC<{ label: string }> = ({ label }) => (
  <span
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData("text/plain", label);
    }}
    className="cursor-grab active:cursor-grabbing inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
    aria-label={`Shift ${label}`}
  >
    {label}
  </span>
);

const StaffCalendar: React.FC = () => {
  const [role, setRole] = React.useState("All");

  return (
    <section aria-label="Monthly Staff Calendar" className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Monthly Staff Calendar</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground" htmlFor="filter-role">
            Filter by role
          </label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger id="filter-role" className="w-40" aria-label="Filter by role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {staffRoles.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
            {Array.from({ length: 35 }).map((_, idx) => {
              const day = idx + 1 - 4; // simple offset to mimic month start mid-week
              const valid = day > 0 && day <= 30;
              const info = valid ? sampleDayInfo(day) : null;
              return (
                <div
                  key={idx}
                  className="min-h-32 bg-background p-3 flex flex-col gap-1"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    // static UI: no state updates, just prevent default
                    e.preventDefault();
                  }}
                  aria-label={valid ? `Day ${day}` : "Empty cell"}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      {valid ? day : ""}
                    </span>
                    {valid && (
                      <div className="flex gap-1">
                        {info?.shifts.map((s) => (
                          <Badge key={s} variant="outline" className="text-[10px]">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  {valid && (
                    <>
                      <p className="text-sm">{info?.staff}</p>
                      <p className="text-sm text-muted-foreground">{info?.sales}</p>
                      <p className="text-sm text-muted-foreground">{info?.guests}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <ShiftBadge label="AM" />
                        <ShiftBadge label="PM" />
                        <ShiftBadge label="Split" />
                      </div>
                      <div className="mt-2 border border-dashed border-border/70 rounded-md p-2 text-xs text-muted-foreground">
                        Drag shifts here
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default StaffCalendar;
