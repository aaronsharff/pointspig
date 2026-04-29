const OUTLETS = [
  "DAILY PIGGY",
  "POINT WEEKLY",
  "REWARDS DIGEST",
  "THE SWINE JOURNAL",
  "CARD QUARTERLY",
];

export function TrustBadges() {
  return (
    <section className="mt-12 px-6">
      <div className="max-w-4xl mx-auto bg-plum/95 text-cream rounded-2xl border-4 border-gold-400 shadow-[8px_8px_0_var(--pig-700)] py-6 px-6 text-center">
        <p className="font-display uppercase text-gold-400 text-sm tracking-widest">
          ★ ★ ★  As featured in  ★ ★ ★
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-3 items-center">
          {OUTLETS.map((o) => (
            <span
              key={o}
              className="font-display uppercase text-base sm:text-lg text-cream/90"
              style={{ letterSpacing: "0.04em" }}
            >
              {o}
            </span>
          ))}
        </div>
        <p className="mt-5 font-script text-gold-300 text-2xl">
          &ldquo;A points-earning miracle.&rdquo; — DAILY PIGGY
        </p>
      </div>
    </section>
  );
}
