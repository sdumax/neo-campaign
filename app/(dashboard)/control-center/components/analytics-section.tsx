"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AnalyticsData = {
  total: { pageviews: number; clicks: number };
  last7Days: { pageviews: number; clicks: number };
  last30Days: { pageviews: number };
  byPage: { page: string; count: number }[];
  byAction: { action: string; count: number }[];
  recent: {
    id: number;
    event: string;
    page: string;
    meta: string | null;
    createdAt: string;
  }[];
};

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div className="rounded-lg border border-primary bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={`mt-2 text-3xl font-bold tracking-tight ${
          accent ?? "text-foreground"
        }`}
      >
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export function AnalyticsSection() {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    authFetch("/api/control-center/analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data || !data.total) {
    return (
      <div className="mt-8 rounded-lg border border-primary bg-card p-6">
        <div className="mb-4 h-5 w-32 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-lg border border-primary bg-card"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-lg border border-primary bg-card">
      <div className="px-6 py-4">
        <h2 className="text-base font-semibold text-foreground">Analytics</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Page views and user interactions
        </p>
      </div>

      <div className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard label="Total Pageviews" value={data.total.pageviews} />
          <MetricCard label="Total Clicks" value={data.total.clicks} accent="text-violet-400" />
          <MetricCard label="Pageviews (7d)" value={data.last7Days.pageviews} accent="text-blue-400" />
          <MetricCard label="Clicks (7d)" value={data.last7Days.clicks} accent="text-cyan-400" />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">
              Top Pages
            </h3>
            {data.byPage.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data yet</p>
            ) : (
              <div className="space-y-2">
                {data.byPage.slice(0, 5).map((item) => (
                  <div
                    key={item.page}
                    className="flex items-center justify-between rounded-md border border-primary px-3 py-2"
                  >
                    <span className="text-sm text-foreground font-mono">
                      {item.page}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-foreground">
              Top Actions
            </h3>
            {data.byAction.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data yet</p>
            ) : (
              <div className="space-y-2">
                {data.byAction.slice(0, 5).map((item) => (
                  <div
                    key={item.action}
                    className="flex items-center justify-between rounded-md border border-primary px-3 py-2"
                  >
                    <span className="text-sm text-foreground">{item.action}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Recent Events
          </h3>
          {data.recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No events yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Page</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recent.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <span
                        className={`inline-block size-1.5 rounded-full mr-2 ${
                          event.event === "pageview"
                            ? "bg-blue-400"
                            : "bg-violet-400"
                        }`}
                      />
                      {event.event}
                    </TableCell>
                    <TableCell className="font-mono text-muted-foreground text-sm">
                      {event.page}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {event.meta ?? "-"}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {new Date(event.createdAt).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
