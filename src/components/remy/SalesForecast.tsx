import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const data = [
  { day: "Mon", sales: 900, projection: 950 },
  { day: "Tue", sales: 1100, projection: 1200 },
  { day: "Wed", sales: 1300, projection: 1280 },
  { day: "Thu", sales: 1000, projection: 1150 },
  { day: "Fri", sales: 1600, projection: 1700 },
  { day: "Sat", sales: 1900, projection: 2000 },
  { day: "Sun", sales: 1400, projection: 1500 },
];

const SalesForecast: React.FC = () => {
  const [showProjection, setShowProjection] = React.useState(true);

  return (
    <section aria-label="Sales Forecast Chart">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Sales Forecast</CardTitle>
          <div className="flex items-center gap-2">
            <Label htmlFor="toggle-proj" className="text-sm text-muted-foreground">
              Toggle projection
            </Label>
            <Switch id="toggle-proj" checked={showProjection} onCheckedChange={setShowProjection} aria-label="Toggle projection series" />
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              sales: { label: "Sales", color: "hsl(var(--primary))" },
              projection: { label: "Projection", color: "hsl(var(--muted-foreground))" },
            }}
            className="h-64"
          >
            <ResponsiveContainer>
              <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
                {showProjection && (
                  <Line type="monotone" dataKey="projection" stroke="var(--color-projection)" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </section>
  );
};

export default SalesForecast;
