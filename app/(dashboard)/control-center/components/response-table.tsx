"use client";

import { useEffect, useRef, useState } from "react";
import { authFetch } from "@/lib/api-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ResponseDetailPanel } from "./response-detail-panel";

type Response = {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  type: "brand" | "creator";
  company?: string;
  website?: string;
  budget?: string;
  socialMedia?: string;
  message?: string;
};

type ResponseData = {
  data: Response[];
  total: number;
  page: number;
  limit: number;
};

type Tab = "all" | "brands" | "creators";

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    contacted: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    converted: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  return (
    <Badge
      variant="outline"
      className={`capitalize ${variants[status] ?? variants.new}`}
    >
      <span className="mr-1.5 inline-block size-1.5 rounded-full bg-current" />
      {status}
    </Badge>
  );
}

function TypeBadge({ type }: { type: string }) {
  return (
    <Badge
      variant="outline"
      className={
        type === "brand"
          ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
          : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
      }
    >
      {type === "brand" ? "Brand" : "Creator"}
    </Badge>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-4 size-16 rounded-full bg-muted/50 flex items-center justify-center">
        <svg
          className="size-8 text-muted-foreground/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25-2.25M12 13.875V7.5"
          />
        </svg>
      </div>
      <p className="text-sm text-muted-foreground">No responses yet</p>
      <p className="mt-1 text-xs text-muted-foreground/60">
        Submissions will appear here
      </p>
    </div>
  );
}

function Pagination({
  page,
  total,
  limit,
  onPageChange,
}: {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-primary px-4 py-3">
      <p className="text-sm text-muted-foreground">
        Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of{" "}
        {total}
      </p>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded px-3 py-1.5 text-sm text-foreground hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
        >
          Previous
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`size-9 rounded text-sm ${
                page === pageNum
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded px-3 py-1.5 text-sm text-foreground hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function ResponseTable() {
  const [tab, setTab] = useState<Tab>("all");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(
    null
  );
  const prevTabRef = useRef(tab);
  const prevPageRef = useRef(page);

  useEffect(() => {
    const tabChanged = prevTabRef.current !== tab;
    const pageChanged = prevPageRef.current !== page;
    prevTabRef.current = tab;
    prevPageRef.current = page;

    if (tabChanged || pageChanged) {
      setData(null);
      setLoading(true);
    }

    let cancelled = false;
    const controller = new AbortController();

    authFetch(`/api/control-center/responses?type=${tab}&page=${page}&limit=10`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled && json) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [tab, page]);

  const tabs: { value: Tab; label: string }[] = [
    { value: "all", label: "All" },
    { value: "brands", label: "Brands" },
    { value: "creators", label: "Creators" },
  ];

  return (
    <div>
      <div className="flex items-center gap-1 border-b border-primary p-1">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => {
              setTab(t.value);
              setPage(1);
            }}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="space-y-3 px-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : !data || data.data.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((row) => (
                  <TableRow
                    key={`${row.type}-${row.id}`}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedResponse(row)}
                  >
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.email}
                    </TableCell>
                    <TableCell>
                      <TypeBadge type={row.type} />
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                      {row.type === "brand"
                        ? row.company || row.website
                        : row.socialMedia}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={row.status} />
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {new Date(row.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              page={data.page}
              total={data.total}
              limit={data.limit}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      <ResponseDetailPanel
        response={selectedResponse}
        onClose={() => setSelectedResponse(null)}
      />
    </div>
  );
}
