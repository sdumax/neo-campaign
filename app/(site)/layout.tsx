import { AosInit } from "@/components/aos-init";
import { Header } from "@/components/header";
import { AnalyticsTracker } from "./components/analytics-tracker";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AosInit />
      <AnalyticsTracker />
      <Header />
      {children}
    </>
  );
}
