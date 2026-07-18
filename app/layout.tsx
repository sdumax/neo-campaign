import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans, Inter, Poppins } from "next/font/google";
import "aos/dist/aos.css";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-accent",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEO Campaign",
  description: "Build, manage, and optimize campaigns at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "scroll-smooth", "antialiased", geistSans.variable, geistMono.variable, inter.variable, poppins.variable, instrumentSans.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
