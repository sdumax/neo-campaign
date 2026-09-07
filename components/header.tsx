"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/lib/useAnalytics";

import { Logo } from "@/components/logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { track } = useAnalytics();

  return (
    <header className="sticky top-0 z-50 h-24 bg-background/40 backdrop-blur-xl border-b border-border/50">
      <div className="mx-auto flex h-full container items-center md:px-24 px-6">
        <Logo className="text-xl md:text-[26px]" />
        <nav className="ml-12 hidden md:flex items-center gap-8">
          <Link
            href="/creators"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => track("click", "/creators", "nav-creators")}
          >
            Our Creators
          </Link>
          <Link
            href="/brands"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => track("click", "/brands", "nav-brands")}
          >
            Brands
          </Link>
          <Link
            href="/partners"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            onClick={() => track("click", "/partners", "nav-partners")}
          >
            Partners
          </Link>
        </nav>
        <div className="ml-auto hidden md:block">
          <Link href="/#contact">
            <Button
              onClick={() => track("click", "/", "hero-cta-get-in-touch")}
            >
              Get in touch
            </Button>
          </Link>
        </div>
        <button
          className="ml-auto p-3 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu">
          {isMenuOpen ? (
            <X size={24} className="text-foreground" />
          ) : (
            <Menu size={24} className="text-foreground" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-24 z-50 border-b border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-center gap-8 px-6 py-4">
            <Link
              href="/creators"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => {
                track("click", "/creators", "nav-creators");
                setIsMenuOpen(false);
              }}
            >
              Our Creators
            </Link>
            <Link
              href="/brands"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => {
                track("click", "/brands", "nav-brands");
                setIsMenuOpen(false);
              }}
            >
              Brands
            </Link>
            <Link
              href="/partners"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => {
                track("click", "/partners", "nav-partners");
                setIsMenuOpen(false);
              }}
            >
              Partners
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
