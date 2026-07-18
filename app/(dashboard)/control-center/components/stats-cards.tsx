"use client";

import { useEffect, useState } from "react";

type Stats = {
  total: { brands: number; creators: number };
  byStatus: { new: number; contacted: number; converted: number };
};

function StatCard({
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
      <p className={`mt-2 text-3xl font-bold tracking-tight ${accent ?? "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

export function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/control-center/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  if (!stats) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-lg border border-primary bg-card"
          />
        ))}
      </div>
    );
  }

  const total = stats.total.brands + stats.total.creators;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard label="Total Responses" value={total} />
      <StatCard
        label="Brands"
        value={stats.total.brands}
        accent="text-violet-400"
      />
      <StatCard
        label="Creators"
        value={stats.total.creators}
        accent="text-cyan-400"
      />
      <StatCard
        label="New"
        value={stats.byStatus.new}
        accent="text-blue-400"
      />
    </div>
  );
}
