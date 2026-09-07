export function HiggsfieldLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight text-[#b8f020] ${className}`}>
      <svg className="size-7 sm:size-8 shrink-0 fill-current" viewBox="0 0 24 24">
        <path d="M4 14.5C4 11.5 6.5 9 9.5 9C11.5 9 13.2 10.1 14.1 11.7C14.7 10.7 15.8 10 17 10C18.7 10 20 11.3 20 13C20 14.7 18.7 16 17 16C15.8 16 14.7 15.3 14.1 14.3C13.2 15.9 11.5 17 9.5 17C6.5 17 4 14.5 4 14.5Z" />
        <path d="M7 8C8.5 6 11 5 13.5 5.5C16.5 6.1 18.8 8.5 19.5 11.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
      <span className="text-2xl sm:text-[26px] font-bold font-sans tracking-tight text-[#c6f828]">Higgsfield</span>
    </div>
  );
}

export function ElevenLabsLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight text-white ${className}`}>
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-6 sm:h-7 bg-white rounded-full" />
        <div className="w-1.5 h-6 sm:h-7 bg-white rounded-full" />
      </div>
      <span className="text-2xl sm:text-[26px] font-bold font-sans tracking-tight">ElevenLabs</span>
    </div>
  );
}

export function MovaviLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight text-white ${className}`}>
      <div className="relative size-6 sm:size-7 flex items-center justify-center shrink-0">
        <span className="absolute size-2.5 bg-white rounded-full top-0 left-2" />
        <span className="absolute size-2.5 bg-white rounded-full bottom-0 left-2" />
        <span className="absolute size-2.5 bg-white rounded-full top-2 left-0" />
        <span className="absolute size-2.5 bg-white rounded-full top-2 right-0" />
      </div>
      <span className="text-2xl sm:text-[26px] font-bold font-sans tracking-tight lowercase">movavi</span>
    </div>
  );
}

export function MusicGPTLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight text-white ${className}`}>
      <svg className="size-7 sm:size-8 shrink-0" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="url(#musicgpt-grad-lg)" strokeWidth="2.5" />
        <circle cx="12" cy="12" r="5" stroke="#f97316" strokeWidth="2" />
        <defs>
          <linearGradient id="musicgpt-grad-lg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f43f5e" />
            <stop offset="0.5" stopColor="#fb923c" />
            <stop offset="1" stopColor="#eab308" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-2xl sm:text-[26px] font-bold font-sans tracking-tight">MusicGPT</span>
    </div>
  );
}

export function HailuoAILogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight text-white ${className}`}>
      <svg className="size-7 sm:size-8 shrink-0" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#fb7185" strokeWidth="2.5" />
        <path d="M8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 13.5 15 14.8 13.7 15.5" stroke="#fda4af" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="#f43f5e" />
      </svg>
      <span className="text-2xl sm:text-[26px] font-bold font-sans tracking-tight">
        Hailuo <span className="text-gray-300 font-medium text-xl sm:text-2xl">AI</span>
      </span>
    </div>
  );
}
