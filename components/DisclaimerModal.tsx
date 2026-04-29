"use client";

import { useState } from "react";
import { formatUSD } from "@/lib/format";

type Props = {
  dollars: number;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DisclaimerModal({ dollars, loading, onCancel, onConfirm }: Props) {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum/60 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl ring-1 ring-pig-200 p-8">
        <h2 id="disclaimer-title" className="text-2xl font-bold text-plum">
          What are you doing?
        </h2>
        <p className="mt-2 text-plum/70">
        </p>
        <ul className="mt-5 space-y-3 text-sm text-plum/80 list-disc pl-5">
          <li>
            You are about to be charged{" "}
            <span className="font-semibold text-plum">{formatUSD(dollars)}</span>{" "}
            to your credit card
          </li>
          <li>
            In real money
          </li>
          <li>
            All you will get in return is points. Not from us. From your credit card company.
          </li>
          <li>
            You will get nothing else. We will keep your money.
          </li>
          <li>
            Are you sure you want to do this?
          </li>
        </ul>

        <label className="mt-6 flex items-start gap-3 text-sm text-plum/80 cursor-pointer">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-1 h-4 w-4 accent-pig-600"
          />
          <span>
            Yes, yes, yes!
          </span>
        </label>

        <div className="mt-8 flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg text-plum/70 hover:text-plum font-medium disabled:opacity-50"
          >
            Go back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!acknowledged || loading}
            className="px-5 py-2.5 rounded-lg bg-pig-600 hover:bg-pig-700 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Preparing…" : "Feed the pig!"}
          </button>
        </div>
      </div>
    </div>
  );
}
