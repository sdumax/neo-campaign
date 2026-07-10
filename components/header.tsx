"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 h-24 bg-background/40">
      <div className="mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="NeoCampaign Logo"
            width={40}
            height={40}
          />
          <span className="text-xl md:text-[26px] font-medium text-foreground">
            NeoCampaign
          </span>
        </div>
        <nav className="ml-12 hidden md:flex items-center gap-8">
          <a href="/creators" className="text-sm font-medium text-foreground">
            Creators
          </a>
          <a href="/brands" className="text-sm font-medium text-foreground">
            Brands
          </a>
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
            <a
              href="/creators"
              className="text-sm font-medium text-foreground"
              onClick={() => setIsMenuOpen(false)}>
              Creators
            </a>
            <a
              href="/brands"
              className="text-sm font-medium text-foreground"
              onClick={() => setIsMenuOpen(false)}>
              Brands
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
