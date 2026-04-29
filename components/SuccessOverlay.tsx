"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { formatPoints } from "@/lib/format";

type Props = {
  points: number;
  onReset: () => void;
};

export function SuccessOverlay({ points, onReset }: Props) {
  useEffect(() => {
    const duration = 1800;
    const end = Date.now() + duration;
    const colors = ["#ff3d83", "#ec1e6a", "#ff9ec1", "#ffe1ec"];
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum/60 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl ring-1 ring-pig-200 p-10 text-center">
        <p className="text-sm uppercase tracking-widest text-pig-600 font-semibold">
          Transaction complete
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-plum">
          You earned
        </h2>
        <p className="mt-4 text-7xl font-extrabold text-pig-600 tabular-nums">
          {formatPoints(points)}
        </p>
        <p className="mt-1 text-plum/60 text-lg">points</p>
        <p className="mt-6 text-plum/70 text-sm">
          Your card issuer will post the rewards to your account according to its standard schedule.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-8 w-full rounded-xl bg-pig-600 hover:bg-pig-700 text-white font-bold text-lg py-4 transition-colors"
        >
          Generate more points
        </button>
      </div>
    </div>
  );
}
