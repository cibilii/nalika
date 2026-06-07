"use client";

import { useState, useEffect } from "react";
import Button from "./Button";

export default function PortfolioFlipCard({ item, onRequest }) {
  const [flipped, setFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile safely
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const handleToggle = () => {
    if (isMobile) {
      setFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className="group relative h-[420px] w-72 shrink-0 [perspective:2000px]"
      onMouseEnter={() => !isMobile && setFlipped(true)}
      onMouseLeave={() => !isMobile && setFlipped(false)}
      onClick={handleToggle}
    >
      <div
        className={`relative h-full w-full rounded-[28px] transition-all duration-700 [transform-style:preserve-3d]
        ${flipped ? "[transform:rotateY(180deg)]" : ""}
      `}
      >
        {/* FRONT */}
        <div className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900 [backface-visibility:hidden] shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* glow effect */}
          <div className="absolute -bottom-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-pink-500/30 blur-3xl" />

          {/* content */}
          <div className="absolute bottom-0 p-5">
            <span className="mb-2 inline-block rounded-full border border-pink-500/30 bg-black/30 px-3 py-1 text-xs text-pink-300 backdrop-blur-xl">
              {item.category}
            </span>

            <h3 className="text-xl font-bold text-white">
              {item.title}
            </h3>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex h-full flex-col justify-between rounded-[28px]
          border border-pink-500/20 bg-zinc-950/95 p-5 backdrop-blur-2xl
          [transform:rotateY(180deg)] [backface-visibility:hidden]
          shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
        >
          <div>
            <span className="inline-block rounded-full bg-pink-500/10 px-3 py-1 text-xs text-pink-300">
              {item.category}
            </span>

            <h3 className="mt-4 text-2xl font-bold text-white">
              {item.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              {item.description || "طراحی لوکس و حرفه‌ای برای زیبایی خاص دستان شما"}
            </p>
          </div>

          <div className="space-y-3">
            <Button
              variant="primary"
              className="w-full rounded-2xl"
              onClick={(e) => {
                e.stopPropagation();
                onRequest(item);
              }}
            >
              رزرو این طرح
            </Button>

            <p className="text-center text-xs text-zinc-500">
              برای دیدن جزئیات دوباره لمس کنید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}