"use client";

import { useMemo, useState } from "react";
import { formatPoints, formatUSD } from "@/lib/format";
import { DisclaimerModal } from "./DisclaimerModal";
import { CheckoutPanel } from "./CheckoutPanel";
import { SuccessOverlay } from "./SuccessOverlay";

const MULTIPLIERS = [1, 1.5, 2, 2.5, 3, 4, 5];

type Stage = "idle" | "disclaimer" | "checkout" | "success";

export function PointsCalculator() {
  const [dollars, setDollars] = useState(100);
  const [multiplier, setMultiplier] = useState(1);
  const [stage, setStage] = useState<Stage>("idle");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const points = useMemo(() => Math.floor(dollars * multiplier), [dollars, multiplier]);

  async function handleConfirm() {
    setError(null);
    setCreating(true);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: dollars }),
      });
      const data = await res.json();
      if (!res.ok || !data.clientSecret) {
        throw new Error(data.error || "Could not initialize payment");
      }
      setClientSecret(data.clientSecret);
      setStage("checkout");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setCreating(false);
    }
  }

  function reset() {
    setStage("idle");
    setClientSecret(null);
    setError(null);
  }

  return (
    <section className="px-6 mt-14 mb-4">
      <div className="relative max-w-2xl mx-auto">
        {/* Floating bonus sticker */}
        <div className="absolute -top-8 -right-6 z-10 wobble">
          <div className="bg-acid text-plum font-display text-sm px-4 py-2 rounded-full border-2 border-plum shadow-[3px_3px_0_var(--plum)] uppercase">
            +Bonus Points!!
          </div>
        </div>

        <div className="bg-white rounded-3xl border-4 border-plum shadow-[10px_10px_0_var(--pig-700)] p-7 sm:p-10">
          <div className="text-center">
            <div className="inline-block bg-gold-400 text-plum font-display text-xs px-3 py-1 rounded border-2 border-plum uppercase tracking-widest">
              ★ Points Generator™ ★
            </div>
            <p className="mt-4 font-script text-pig-600 text-2xl -rotate-1">
              You are about to earn...
            </p>
            <p
              className="mt-2 font-display text-pig-600 text-7xl sm:text-8xl tabular-nums leading-none"
              style={{
                textShadow:
                  "3px 3px 0 #fff, 5px 5px 0 var(--gold-400), 7px 7px 0 var(--plum)",
                WebkitTextStroke: "1px var(--plum)",
              }}
            >
              {formatPoints(points)}
            </p>
            <p className="mt-2 font-display text-plum uppercase tracking-widest">
              POINTS!!!
            </p>
          </div>

          <div className="mt-10 bg-pig-50 border-2 border-plum rounded-xl p-5">
            <div className="flex items-center justify-between text-sm text-plum mb-2">
              <label htmlFor="amount" className="font-display uppercase">
                Transaction Amount
              </label>
              <span className="font-display text-pig-700 text-xl">
                {formatUSD(dollars)}
              </span>
            </div>
            <input
              id="amount"
              type="range"
              min={1}
              max={10000}
              step={1}
              value={dollars}
              onChange={(e) => setDollars(parseInt(e.target.value, 10))}
              className="w-full accent-pig-600 h-3"
            />
            <div className="flex justify-between text-xs text-plum/50 mt-1 font-mono">
              <span>$1</span>
              <span>$10,000</span>
            </div>
          </div>

          <div className="mt-5 bg-pig-50 border-2 border-plum rounded-xl p-5 flex items-center justify-between gap-4">
            <label htmlFor="multiplier" className="font-display text-sm uppercase text-plum">
              Your Card&apos;s Rewards Rate
            </label>
            <select
              id="multiplier"
              value={multiplier}
              onChange={(e) => setMultiplier(parseFloat(e.target.value))}
              className="rounded-lg border-2 border-plum bg-white px-3 py-2 text-base font-display text-plum focus:outline-none focus:ring-2 focus:ring-pig-500"
            >
              {MULTIPLIERS.map((m) => (
                <option key={m} value={m}>
                  {m}x
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setStage("disclaimer")}
            className="shine mt-10 w-full rounded-xl text-white font-display uppercase text-2xl py-5 border-4 border-plum shadow-[6px_6px_0_var(--plum)] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_var(--plum)] transition-transform"
            style={{
              background:
                "linear-gradient(180deg, var(--pig-400) 0%, var(--pig-600) 50%, var(--pig-700) 100%)",
              textShadow: "2px 2px 0 var(--plum)",
            }}
          >
            ★ Get {formatPoints(points)} Points NOW*** ★
          </button>

          <p className="mt-2 text-center text-xs text-plum/70 italic">
            ***Points provided by your credit card company, by paying us {formatUSD(dollars)}.
          </p>

          <p className="mt-3 text-center font-script text-pig-700 text-xl -rotate-1">
            Don&apos;t wait! Piggy is hungry!
          </p>

          {error && (
            <p className="mt-4 text-sm text-pig-700 text-center font-bold">{error}</p>
          )}
        </div>
      </div>

      {stage === "disclaimer" && (
        <DisclaimerModal
          dollars={dollars}
          loading={creating}
          onCancel={() => setStage("idle")}
          onConfirm={handleConfirm}
        />
      )}

      {stage === "checkout" && clientSecret && (
        <CheckoutPanel
          clientSecret={clientSecret}
          dollars={dollars}
          points={points}
          onCancel={reset}
          onSuccess={() => setStage("success")}
        />
      )}

      {stage === "success" && (
        <SuccessOverlay points={points} onReset={reset} />
      )}
    </section>
  );
}
