"use client";

import Image from "next/image";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { PartnerCreator } from "./types";
import {
  HiggsfieldLogo,
  ElevenLabsLogo,
  MovaviLogo,
  MusicGPTLogo,
  HailuoAILogo,
} from "./brand-logos";

interface CreatorDetailSheetProps {
  creator: PartnerCreator | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function RenderBrandCollab({ name, logo }: { name: string; logo?: string }) {
  const lower = name.toLowerCase().trim();
  if (lower === "higgsfield") return <HiggsfieldLogo />;
  if (lower === "elevenlabs") return <ElevenLabsLogo />;
  if (lower === "movavi") return <MovaviLogo />;
  if (lower === "musicgpt") return <MusicGPTLogo />;
  if (lower === "hailuo ai" || lower === "hailuo") return <HailuoAILogo />;

  return (
    <div className="flex items-center gap-2.5 font-bold tracking-tight text-white">
      {logo && (
        <div className="relative h-7 w-20 sm:w-24">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
            unoptimized={logo.startsWith("data:")}
          />
        </div>
      )}
      <span className="text-2xl sm:text-[26px] font-bold font-sans tracking-tight">
        {name}
      </span>
    </div>
  );
}

export function CreatorDetailSheet({
  creator,
  open,
  onOpenChange,
}: CreatorDetailSheetProps) {
  if (!creator) return null;

  const hasEmail = Boolean(creator.email && creator.email.trim().length > 0);

  const handleMessageClick = () => {
    if (!creator.email) return;
    const email = creator.email.trim();
    const subject = encodeURIComponent(
      `Brand Collaboration Inquiry via NEO Campaign (${creator.name})`
    );
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl md:w-[60vw] p-5 pt-16 sm:p-8 sm:pt-8 overflow-y-auto bg-[#0f0f11] border-l border-zinc-800 text-white shadow-2xl"
      >
        {/* Cancel / Close Button: on mobile floating on top-left, on desktop on top-right */}
        <SheetClose
          className="absolute top-4 left-4 sm:left-auto sm:right-6 sm:top-6 z-50 flex items-center justify-center size-9 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white shadow-xl backdrop-blur-md transition-all cursor-pointer focus:outline-none"
          aria-label="Close modal"
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </SheetClose>

        <div className="flex flex-col gap-6">
          {/* Header Banner */}
          <div
            className={`relative w-full h-32 md:h-40 rounded-2xl overflow-hidden flex items-center justify-center border border-zinc-800 shadow-inner ${creator.bannerImage
                ? "bg-black"
                : "bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950"
              }`}
          >
            {creator.bannerImage ? (
              <Image
                src={creator.bannerImage}
                alt={creator.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1000px"
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4">
                <span className="font-mono font-bold tracking-[0.2em] text-lg md:text-2xl text-zinc-300">
                  {creator.bannerText || creator.name.toUpperCase()}
                </span>
                <span className="text-[11px] text-zinc-500 mt-1 font-mono tracking-wider">
                  OFFICIAL PARTNER CREATOR
                </span>
              </div>
            )}
          </div>

          {/* Creator Profile Info & Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative size-16 md:size-20 shrink-0 rounded-full overflow-hidden bg-zinc-900 border border-zinc-700 shadow-md">
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized={creator.avatar.startsWith("data:")}
                />
              </div>
              <div className="flex flex-col">
                <SheetTitle className="text-xl md:text-2xl font-bold text-white tracking-tight normal-case font-sans">
                  {creator.name}
                </SheetTitle>
                <div className="text-xs md:text-sm text-zinc-400 flex items-center gap-1.5 mt-0.5">
                  <span className="text-zinc-300 font-medium">
                    {creator.handle}
                  </span>
                  <span>•</span>
                  <span>{creator.subscribers} subscribers</span>
                  <span>•</span>
                  <span>{creator.videosCount} videos</span>
                </div>
                <p className="text-xs md:text-sm text-zinc-400 mt-1.5 line-clamp-1 max-w-md">
                  {creator.bio}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
              {hasEmail && (
                <Button
                  onClick={handleMessageClick}
                  className="bg-[#e50914] hover:bg-[#d00812] text-xs md:text-sm font-semibold px-5 h-9 rounded-md shadow-sm normal-case tracking-normal"
                >
                  Message
                </Button>
              )}
              <a
                href={creator.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button
                  variant="outline"
                  className="border-[#450a0a] bg-[#1a0505]/70 hover:bg-[#2a0808] text-[#ef4444] hover:text-[#ef4444] text-xs md:text-sm font-semibold px-4 h-9 rounded-md normal-case tracking-normal"
                >
                  View Channel
                </Button>
              </a>
            </div>
          </div>

          {/* Recents from Youtube */}
          <div className="mt-2">
            <h3 className="text-sm font-medium text-zinc-400 mb-3">
              Recents from Youtube
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {creator.recentVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col cursor-pointer"
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-md">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="size-8 md:size-9 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={14} className="fill-white translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                  {/* Video Metadata */}
                  <h4 className="text-xs font-semibold text-white mt-2 group-hover:text-red-400 transition-colors truncate">
                    {video.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {video.views} • {video.publishedAt}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Past Collaborations */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-zinc-400 mb-5">
              Past collaborations
            </h3>
            <div className="flex flex-wrap items-center gap-7 sm:gap-12 md:gap-14">
              {creator.collaborations && creator.collaborations.length > 0 ? (
                creator.collaborations.map((collab, index) => (
                  <RenderBrandCollab
                    key={index}
                    name={collab.name}
                    logo={collab.logo}
                  />
                ))
              ) : (
                <div className="flex flex-wrap items-center gap-7 sm:gap-12 md:gap-14">
                  <HiggsfieldLogo />
                  <ElevenLabsLogo />
                  <MovaviLogo />
                  <MusicGPTLogo />
                  <HailuoAILogo />
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
