import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const items = [
  { id: 1, name: "Pumpkin Soup", currentPrice: 6.5 },
  { id: 2, name: "Quinoa Salad", currentPrice: 9.0 },
  { id: 3, name: "Veggie Lasagna", currentPrice: 11.5 },
];

const PromotionsPanel: React.FC = () => {
  return (
    <section aria-label="Promotions" className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle>Promotions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.map((it) => (
              <div key={it.id} className="rounded-lg border border-border p-4 bg-card text-card-foreground space-y-3">
                <div>
                  <p className="font-medium">{it.name}</p>
                  <p className="text-xs text-muted-foreground">Current: €{it.currentPrice.toFixed(2)}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`discount-${it.id}`}>Discount %</Label>
                  <Input id={`discount-${it.id}`} type="number" min={0} max={100} placeholder="e.g. 15" aria-label={`Discount percent for ${it.name}`} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`schedule-${it.id}`}>Schedule promo</Label>
                  <Input id={`schedule-${it.id}`} type="date" aria-label={`Schedule date for ${it.name}`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PromotionsPanel;
