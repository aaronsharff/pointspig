# PointsPig

A single-page rewards-optimization platform. Move the slider, pick your card's
multiplier, and PointsPig charges your card so you can earn the credit card
points your issuer awards for the transaction.

Built with Next.js 16 (App Router), Tailwind v4, and Stripe (embedded Payment Element).

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the env template and fill in your Stripe **test** keys
   (https://dashboard.stripe.com/test/apikeys):
   ```bash
   cp .env.local.example .env.local
   ```
   - `STRIPE_SECRET_KEY` — server-only, used by `app/api/create-payment-intent`.
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — used by the embedded Payment Element.
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 and test the flow with Stripe's test card
   `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP.

## Project structure

- `app/page.tsx` — landing page (server component shell).
- `app/api/create-payment-intent/route.ts` — creates the Stripe PaymentIntent. The
  multiplier is purely cosmetic and never sent to the server; only the dollar
  amount is charged.
- `components/PointsCalculator.tsx` — orchestrator: slider, multiplier dropdown,
  and stage transitions (idle → disclaimer → checkout → success).
- `components/DisclaimerModal.tsx` — pre-checkout acknowledgment.
- `components/CheckoutPanel.tsx` — Stripe `Elements` + `PaymentElement`.
- `components/SuccessOverlay.tsx` — confetti and points celebration.
- `lib/stripe.ts` — server-side Stripe SDK singleton.
- `public/pig.png` — placeholder. Drop the real pig artwork in here at the same path.

## Deploy to Vercel

1. Push to GitHub (already configured to `aaronsharff/pointspig`).
2. Import the repo at https://vercel.com/new.
3. Set the two environment variables in **Project Settings → Environment Variables**:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. To go live, swap the test keys for live keys (`sk_live_...` / `pk_live_...`)
   in Vercel — no code changes needed.
