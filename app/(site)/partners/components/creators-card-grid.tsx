"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { partnerCreatorsData } from "./data";
import { PartnerCreator } from "./types";
import { CreatorDetailSheet } from "./creator-detail-sheet";

interface CreatorsCardGridProps {
  initialCreators?: PartnerCreator[] | null;
}

export function CreatorsCardGrid({ initialCreators }: CreatorsCardGridProps) {
  const [selectedCreator, setSelectedCreator] = useState<PartnerCreator | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const creators =
    initialCreators && initialCreators.length > 0
      ? initialCreators
      : partnerCreatorsData;

  const handleOpenCreator = (creator: PartnerCreator) => {
    setSelectedCreator(creator);
    setIsSheetOpen(true);
  };

  return (
    <section className="relative py-8">
      <div className="mx-auto container md:px-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator, index) => (
            <div
              key={creator.id}
              onClick={() => handleOpenCreator(creator)}
              data-aos="fade-up"
              data-aos-delay={String(index * 100)}
              className="group cursor-pointer rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-between"
            >
              <div>
                {/* Banner Area */}
                <div
                  className={`relative h-28 sm:h-32 w-full overflow-hidden flex items-center justify-center font-heading font-extrabold tracking-wider uppercase text-base sm:text-lg px-4 text-center transition-transform duration-300 group-hover:scale-[1.01] ${
                    creator.bannerImage
                      ? "bg-black"
                      : creator.bannerBg || "bg-zinc-800 text-zinc-200"
                  }`}
                >
                  {creator.bannerImage ? (
                    <Image
                      src={creator.bannerImage}
                      alt={creator.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span>{creator.bannerText || creator.name}</span>
                  )}
                </div>

                {/* Profile Header & Info */}
                <div className="p-5 sm:p-6 pt-0">
                  <div className="flex items-start gap-4 -mt-7 mb-4">
                    <div className="relative size-16 sm:size-20 shrink-0 rounded-full border-3 border-card overflow-hidden bg-background shadow-md">
                      <Image
                        src={creator.avatar}
                        alt={creator.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="80px"
                        unoptimized={creator.avatar.startsWith("data:")}
                      />
                    </div>
                    <div className="mt-7">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">
                        {creator.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {creator.handle}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Badge Row */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground/90 mb-3">
                    <span className="font-semibold text-foreground">
                      {creator.subscribers}
                    </span>
                    <span className="text-muted-foreground">Subscribers</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="font-semibold text-foreground">
                      {creator.videosCount}
                    </span>
                    <span className="text-muted-foreground">Videos</span>
                  </div>

                  {/* Bio Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {creator.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center justify-between border-t border-border/40 mt-2">
                <span
                  className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary inline-flex items-center gap-1 transition-colors"
                >
                  <span>See more</span>
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Creator Detail Sheet */}
      <CreatorDetailSheet
        creator={selectedCreator}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </section>
  );
}
