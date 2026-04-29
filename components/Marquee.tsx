const ITEMS = [
  "Linda M. just earned 7,432 points",
  "Brian S. just earned 14,002 points",
  "Cassandra T. just earned 28,910 points",
  "Devonte K. just earned 1,205 points",
  "Marcus H. just earned 92,400 points",
  "Yuki R. just earned 3,118 points",
  "Henrietta P. just earned 410,000 points",
  "Otis B. just earned 18 points",
  "Greta W. just earned 6,667 points",
  "Tomasz L. just earned 220,001 points",
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-plum text-gold-400 border-y-2 border-gold-500 overflow-hidden">
      <div className="marquee-track py-2 text-sm font-bold uppercase tracking-wider">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center px-6 whitespace-nowrap">
            <span className="text-gold-400 mr-3">★</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
