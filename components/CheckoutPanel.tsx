"use client";

import { useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { formatUSD } from "@/lib/format";

let stripePromise: Promise<Stripe | null> | null = null;
function getStripePromise() {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      stripePromise = Promise.resolve(null);
    } else {
      stripePromise = loadStripe(key);
    }
  }
  return stripePromise;
}

type Props = {
  clientSecret: string;
  dollars: number;
  points: number;
  onCancel: () => void;
  onSuccess: () => void;
};

export function CheckoutPanel({ clientSecret, dollars, onCancel, onSuccess }: Props) {
  const options = useMemo(
    () => ({
      clientSecret,
      appearance: {
        theme: "stripe" as const,
        variables: {
          colorPrimary: "#ec1e6a",
          colorBackground: "#ffffff",
          colorText: "#2a0d1c",
          colorDanger: "#c41257",
          fontFamily: "system-ui, sans-serif",
          borderRadius: "10px",
        },
      },
    }),
    [clientSecret],
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-plum/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl ring-1 ring-pig-200 p-8 my-8">
        <h2 className="text-2xl font-bold text-plum">Payment details</h2>
        <p className="mt-1 text-plum/70 text-sm">
          You are paying{" "}
          <span className="font-semibold text-plum">{formatUSD(dollars)}</span>.
        </p>
        <div className="mt-6">
          <Elements stripe={getStripePromise()} options={options}>
            <PaymentForm
              dollars={dollars}
              onCancel={onCancel}
              onSuccess={onSuccess}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}

function PaymentForm({
  dollars,
  onCancel,
  onSuccess,
}: {
  dollars: number;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setError(null);
    setSubmitting(true);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? "Could not submit payment details");
      setSubmitting(false);
      return;
    }
    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: typeof window !== "undefined" ? window.location.href : "",
      },
    });
    if (confirmError) {
      setError(confirmError.message ?? "Payment failed");
      setSubmitting(false);
      return;
    }
    if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess();
      return;
    }
    setError("Payment did not complete. Please try again.");
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && (
        <p className="mt-4 text-sm text-pig-700">{error}</p>
      )}
      <div className="mt-6 flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="px-5 py-2.5 rounded-lg text-plum/70 hover:text-plum font-medium disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || submitting}
          className="px-5 py-2.5 rounded-lg bg-pig-600 hover:bg-pig-700 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "Processing…" : `Pay ${formatUSD(dollars)}`}
        </button>
      </div>
    </form>
  );
}
