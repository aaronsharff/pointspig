import Image from "next/image";

export function Hero() {
  return (
    <section className="relative px-6 pt-10 pb-4">
      <div className="text-center">
        <p className="font-script text-pig-700 text-3xl -rotate-2 inline-block mb-1">
          The world&apos;s #1 rewards multiplier engine!
        </p>
        <div className="flex items-center justify-center gap-3 mb-4 text-pig-600">
          <span className="sparkle text-2xl">★</span>
          <span className="sparkle text-xl" style={{ animationDelay: "0.2s" }}>✦</span>
          <span className="sparkle text-3xl" style={{ animationDelay: "0.4s" }}>★</span>
          <span className="sparkle text-xl" style={{ animationDelay: "0.6s" }}>✦</span>
          <span className="sparkle text-2xl" style={{ animationDelay: "0.8s" }}>★</span>
        </div>
        <h1
          className="font-display text-5xl sm:text-7xl lg:text-8xl text-pig-700 leading-[0.95] uppercase"
          style={{
            textShadow:
              "3px 3px 0 #fff, 6px 6px 0 var(--gold-400), 9px 9px 0 var(--plum)",
            WebkitTextStroke: "1px var(--plum)",
          }}
        >
          Come on, piggy<span className="text-pig-600">,</span>
          <br />
          get those points!
        </h1>
        <p className="mt-8 text-xl sm:text-2xl text-plum font-extrabold uppercase tracking-wide">
          Unlimited points. <span className="text-pig-600">Unlimited</span> rewards.
          <br className="hidden sm:block" /> No caps. No categories. No nonsense.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-black uppercase">
          {[
            "Instant points",
            "100% guaranteed",
            "Earn while you sleep",
            "Points on top of points",
            "Trusted by millions",
          ].map((t) => (
            <li
              key={t}
              className="bg-gold-400 text-plum border-2 border-plum px-3 py-1 rounded-md shadow-[3px_3px_0_var(--plum)]"
            >
              ✦ {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="relative w-full max-w-md aspect-square">
          {/* spinning starburst behind the pig */}
          <div className="absolute inset-[-12%] spin-slow opacity-90">
            <div className="starburst w-full h-full" />
          </div>

          <div className="relative w-full h-full rounded-3xl bg-pig-100 ring-4 ring-plum shadow-[10px_10px_0_var(--plum)] overflow-hidden">
            <Image
              src="/pig.png"
              alt="A pig eating money"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 28rem"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-pig-700/60 font-mono text-sm tracking-widest">
                [ PIG ART PLACEHOLDER ]
              </span>
            </div>
          </div>

          {/* corner badges */}
          <div className="absolute -top-4 -left-6 wobble">
            <div className="bg-pig-600 text-white font-display text-xs px-3 py-2 rounded-md border-2 border-plum shadow-[3px_3px_0_var(--plum)] uppercase">
              As Seen On TV!
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 wobble" style={{ animationDelay: "0.4s" }}>
            <div className="bg-acid text-plum font-display text-base px-4 py-2 rounded-full border-2 border-plum shadow-[3px_3px_0_var(--plum)] uppercase">
              FREE Points!!
            </div>
          </div>
          <div className="absolute top-1/2 -right-10 -translate-y-1/2 wobble" style={{ animationDelay: "0.8s" }}>
            <div className="bg-gold-400 text-plum font-display text-xs px-3 py-2 rounded-md border-2 border-plum shadow-[3px_3px_0_var(--plum)] uppercase rotate-12">
              Limited Time!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
