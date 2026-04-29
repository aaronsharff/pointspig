const TESTIMONIALS = [
  {
    initials: "BM",
    name: "Brett M.",
    title: "Verified Piggy",
    color: "bg-pig-400",
    quote:
      "I was earning maybe 4,000 points a month before PointsPig. NOW I am earning over 4,000,000 points a month. I cannot fully explain how. I just keep moving the slider.",
    stars: 5,
  },
  {
    initials: "CR",
    name: "Cynthia R.",
    title: "Platinum Member",
    color: "bg-gold-400",
    quote:
      "My husband told me to stop using PointsPig. I have not stopped using PointsPig. The points are unbelievable. I am unbelievable.",
    stars: 5,
  },
  {
    initials: "DV",
    name: "Devonte V.",
    title: "Power User",
    color: "bg-acid",
    quote:
      "Other rewards sites give you bonus categories and rotating offers and reading. PointsPig just gives you the points. Beautiful. Simple. Pig.",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="mt-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center font-display text-3xl sm:text-4xl text-pig-700 uppercase">
          Real piggies. <span className="text-plum">Real points.</span>
        </h2>
        <p className="text-center font-script text-2xl text-pig-600 -rotate-1">
          &mdash; testimonials from our happiest earners! &mdash;
        </p>

        <div className="mt-8 grid sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.name}
              className="bg-white border-4 border-plum rounded-2xl p-5 shadow-[6px_6px_0_var(--pig-600)]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-12 w-12 rounded-full ${t.color} border-2 border-plum flex items-center justify-center font-display text-plum`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-display text-plum text-sm uppercase">{t.name}</p>
                  <p className="text-xs text-plum/60 font-semibold uppercase tracking-wider">
                    {t.title}
                  </p>
                </div>
              </div>
              <div className="mt-3 text-gold-500 text-lg" aria-label={`${t.stars} stars`}>
                {"★".repeat(t.stars)}
              </div>
              <p className="mt-2 text-plum/80 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
