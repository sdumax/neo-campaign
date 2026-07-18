import { StatsCards } from "./components/stats-cards";
import { ResponseTable } from "./components/response-table";
import { AnalyticsSection } from "./components/analytics-section";

export default function ControlCenterPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Control Center
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Campaign responses & analytics
        </p>
      </div>

      <StatsCards />

      <div className="mt-8 rounded-lg border border-primary bg-card">
        <div className="px-6 py-4">
          <h2 className="text-base font-semibold text-foreground">
            Responses
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            View and manage form submissions
          </p>
        </div>
        <ResponseTable />
      </div>

      <AnalyticsSection />
    </main>
  );
}
