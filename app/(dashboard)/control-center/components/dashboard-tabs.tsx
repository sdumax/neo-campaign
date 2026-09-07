"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResponseTable } from "./response-table";
import { AnalyticsSection } from "./analytics-section";
import { CreatorsManagement } from "./creators-management";
import { MessageSquare, Users, BarChart3 } from "lucide-react";

export function DashboardTabs() {
  return (
    <Tabs defaultValue="responses" className="w-full mt-6">
      <TabsList className="bg-card border border-border p-1 rounded-lg h-11 mb-6">
        <TabsTrigger
          value="responses"
          className="gap-2 rounded-md font-semibold text-xs h-9 px-4 normal-case"
        >
          <MessageSquare size={14} />
          <span>Responses</span>
        </TabsTrigger>
        <TabsTrigger
          value="creators"
          className="gap-2 rounded-md font-semibold text-xs h-9 px-4 normal-case"
        >
          <Users size={14} />
          <span>Creators & Partners</span>
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          className="gap-2 rounded-md font-semibold text-xs h-9 px-4 normal-case"
        >
          <BarChart3 size={14} />
          <span>Analytics</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="responses">
        <div className="rounded-lg border border-primary bg-card">
          <div className="px-6 py-4">
            <h2 className="text-base font-semibold text-foreground">Responses</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              View and manage form submissions
            </p>
          </div>
          <ResponseTable />
        </div>
      </TabsContent>

      <TabsContent value="creators">
        <div className="rounded-lg border border-primary bg-card p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-foreground">
              Partner Creators & Brand Collaborations
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Add and manage creators and past brand collaborations displayed on the Partners page.
            </p>
          </div>
          <CreatorsManagement />
        </div>
      </TabsContent>

      <TabsContent value="analytics">
        <AnalyticsSection />
      </TabsContent>
    </Tabs>
  );
}
