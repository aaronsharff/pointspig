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
    <section className="px-6 mt-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl ring-1 ring-pig-200 shadow-2xl shadow-pig-200/40 p-8 sm:p-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-pig-600 font-semibold">
            Your earnings
          </p>
          <p className="mt-2 text-6xl sm:text-7xl font-extrabold text-plum tabular-nums">
            {formatPoints(points)}
          </p>
          <p className="text-plum/60 mt-1 text-lg">points</p>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between text-sm text-plum/70 mb-2">
            <label htmlFor="amount" className="font-medium">
              Transaction amount
            </label>
            <span className="font-mono font-semibold text-plum">{formatUSD(dollars)}</span>
          </div>
          <input
            id="amount"
            type="range"
            min={1}
            max={10000}
            step={1}
            value={dollars}
            onChange={(e) => setDollars(parseInt(e.target.value, 10))}
            className="w-full accent-pig-600"
          />
          <div className="flex justify-between text-xs text-plum/40 mt-1 font-mono">
            <span>$1</span>
            <span>$10,000</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <label htmlFor="multiplier" className="text-sm font-medium text-plum/70">
            Your card&apos;s rewards rate
          </label>
          <select
            id="multiplier"
            value={multiplier}
            onChange={(e) => setMultiplier(parseFloat(e.target.value))}
            className="rounded-lg border border-pig-200 bg-pig-50 px-3 py-2 text-sm font-semibold text-plum focus:outline-none focus:ring-2 focus:ring-pig-500"
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
          className="mt-10 w-full rounded-xl bg-pig-600 hover:bg-pig-700 text-white font-bold text-lg py-4 transition-colors shadow-lg shadow-pig-300/50"
        >
          Generate {formatPoints(points)} points
        </button>

        {error && (
          <p className="mt-4 text-sm text-pig-700 text-center">{error}</p>
        )}
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
