"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

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

function FieldRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 py-3 border-b border-primary last:border-0">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm text-foreground break-words">{value}</span>
    </div>
  );
}

export function ResponseDetailPanel({
  response,
  onClose,
}: {
  response: Response | null;
  onClose: () => void;
}) {
  if (!response) return null;

  const statusVariant: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    contacted: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    converted: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  return (
    <Sheet open onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-primary">
          <SheetTitle className="flex items-center gap-3">
            <span>{response.name}</span>
            <Badge
              variant="outline"
              className={
                response.type === "brand"
                  ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                  : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
              }
            >
              {response.type === "brand" ? "Brand" : "Creator"}
            </Badge>
            <Badge
              variant="outline"
              className={`capitalize ${
                statusVariant[response.status] ?? statusVariant.new
              }`}
            >
              <span className="mr-1.5 inline-block size-1.5 rounded-full bg-current" />
              {response.status}
            </Badge>
          </SheetTitle>
          <p className="text-xs text-muted-foreground">
            Submitted{" "}
            {new Date(response.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </SheetHeader>

        <div className="py-2">
          <FieldRow label="Name" value={response.name} />
          <FieldRow label="Email" value={response.email} />
          {response.type === "brand" && (
            <>
              <FieldRow label="Company" value={response.company} />
              <FieldRow label="Website" value={response.website} />
              <FieldRow label="Budget" value={response.budget} />
            </>
          )}
          {response.type === "creator" && (
            <FieldRow label="Social Media" value={response.socialMedia} />
          )}
          <FieldRow label="Message" value={response.message} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
