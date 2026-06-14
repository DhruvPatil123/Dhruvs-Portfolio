import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020008]">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing aura */}
        <div className="absolute h-18 w-18 animate-pulse rounded-full bg-brand-primary opacity-20 blur-xl"></div>
        {/* Spinning border ring */}
        <div className="h-16 w-16 animate-spin rounded-full border-t-2 border-r-2 border-brand-primary border-b-transparent border-l-transparent"></div>
        {/* Innermost cyan breathing tracker */}
        <div className="absolute h-4 w-4 animate-ping rounded-full bg-brand-secondary opacity-70"></div>
      </div>
      <p className="font-display mt-6 tracking-widest text-[#f1f5f9] uppercase text-sm animate-pulse flex items-center gap-1">
        Initializing Portfolio
        <span className="inline-block animate-[bounce_1.4s_infinite_100ms]">.</span>
        <span className="inline-block animate-[bounce_1.4s_infinite_300ms]">.</span>
        <span className="inline-block animate-[bounce_1.4s_infinite_500ms]">.</span>
      </p>
    </div>
  );
}
