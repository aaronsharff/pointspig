import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const MIN_DOLLARS = 1;
const MAX_DOLLARS = 10_000;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const amount =
    typeof body === "object" && body !== null && "amount" in body
      ? (body as { amount: unknown }).amount
      : undefined;

  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    return NextResponse.json({ error: "amount must be a number" }, { status: 400 });
  }

  const dollars = Math.floor(amount);
  if (dollars < MIN_DOLLARS || dollars > MAX_DOLLARS) {
    return NextResponse.json(
      { error: `amount must be between $${MIN_DOLLARS} and $${MAX_DOLLARS}` },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripe();
    const intent = await stripe.paymentIntents.create({
      amount: dollars * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      description: `PointsPig transaction — $${dollars}`,
    });
    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
