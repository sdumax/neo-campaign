"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 h-24 bg-background/40">
      <div className="mx-auto flex h-full max-w-6xl items-center px-6">
        <Logo className="text-xl md:text-[26px]" />
        <nav className="ml-12 hidden md:flex items-center gap-8">
          <Link href="/creators" className="text-sm font-medium text-foreground">
            Creators
          </Link>
          <Link href="/brands" className="text-sm font-medium text-foreground">
            Brands
          </Link>
        </nav>
        <div className="ml-auto hidden md:block">
          <Button className="h-13 w-35 text-[#0a0a0a] text-sm font-medium">
            Get in touch
          </Button>
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
              className="text-sm font-medium text-foreground"
              onClick={() => setIsMenuOpen(false)}>
              Creators
            </Link>
            <Link
              href="/brands"
              className="text-sm font-medium text-foreground"
              onClick={() => setIsMenuOpen(false)}>
              Brands
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
