import { StatsCards } from "./components/stats-cards";
import { DashboardTabs } from "./components/dashboard-tabs";

export default function ControlCenterPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Control Center
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Campaign responses, creators CMS & analytics
        </p>
      </div>

      <StatsCards />

      <DashboardTabs />
    </main>
  );
}
