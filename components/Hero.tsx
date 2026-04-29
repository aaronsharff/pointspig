import Image from "next/image";

export function Hero() {
  return (
    <section className="px-6 pt-12 pb-6 text-center">
      <p className="text-pig-700 font-semibold tracking-widest uppercase text-xs mb-3">
        Rewards optimization, simplified
      </p>
      <h1 className="text-5xl sm:text-6xl font-extrabold text-plum leading-tight tracking-tight">
        Generate <span className="text-pig-600">unlimited</span>
        <br className="hidden sm:block" /> credit card points.
      </h1>
      <p className="mt-5 text-lg sm:text-xl text-plum/70 max-w-2xl mx-auto">
        PointsPig is the first and only platform built around a single, elegant idea:
        the more you spend, the more points you earn. No categories. No caps. No exceptions.
      </p>
      <div className="mt-10 flex justify-center">
        <div className="relative w-full max-w-md aspect-square rounded-3xl bg-pig-100 ring-1 ring-pig-200 shadow-xl shadow-pig-200/50 overflow-hidden">
          <Image
            src="/pig.png"
            alt="A pig eating money"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 28rem"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-pig-700/50 font-mono text-sm tracking-widest">
              [ PIG ART PLACEHOLDER ]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
