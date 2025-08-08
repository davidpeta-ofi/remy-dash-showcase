import React from "react";
import GlobalKPI from "@/components/remy/GlobalKPI";
import StaffCalendar from "@/components/remy/StaffCalendar";
import SalesForecast from "@/components/remy/SalesForecast";
import StockAlerts from "@/components/remy/StockAlerts";
import TableAllocation from "@/components/remy/TableAllocation";
import PromotionsPanel from "@/components/remy/PromotionsPanel";

const Index = () => {
  React.useEffect(() => {
    document.title = "Remy Dashboard – Restaurant Ops"; // SEO title under 60 chars
    const desc = "Remy dashboard with KPIs, calendar, sales forecast, stock alerts and more.";
    const meta = document.querySelector('meta[name="description"]') || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", desc);
    document.head.appendChild(meta);

    const link = document.querySelector('link[rel="canonical"]') || document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", window.location.href);
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GlobalKPI />
      <main className="container mx-auto py-6 space-y-6">
        <h1 className="sr-only">Remy Dashboard – Restaurant Operations</h1>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StaffCalendar />
          </div>
          <div className="space-y-6">
            <SalesForecast />
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StockAlerts />
          <TableAllocation />
        </section>

        <PromotionsPanel />
      </main>
    </div>
  );
};

export default Index;
