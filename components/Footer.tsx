const LINK_COLUMNS = [
  {
    heading: "The Pig",
    links: ["About PointsPig", "Our Mission", "Press Kit", "Investor Relations", "Pig Careers"],
  },
  {
    heading: "Earn More",
    links: [
      "Refer a Piggy",
      "Affiliate Program",
      "Mega Bonus Tuesdays",
      "Double Points Hour",
      "Triple Points Hour",
    ],
  },
  {
    heading: "Legal",
    links: [
      "Terms of Service",
      "Privacy Policy",
      "Cookie Notice",
      "Cardholder Agreement",
      "Acceptable Pig Use",
    ],
  },
  {
    heading: "Help",
    links: ["FAQ", "Contact Pig Support", "Status", "Community Forums", "Pig Glossary"],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-plum text-cream border-t-4 border-gold-400">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="font-display uppercase text-gold-400 text-sm tracking-widest mb-3">
                {col.heading}
              </h4>
              <ul className="space-y-1.5 text-sm text-cream/80">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-pig-300 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-cream/20 text-xs text-cream/60 leading-relaxed space-y-2">
          <p className="font-display text-gold-400 text-sm uppercase tracking-widest">
            ★ Important information about your transaction ★
          </p>
          <p>
            PointsPig facilitates voluntary financial transactions for the express
            purpose of generating credit card rewards. Points and rewards are issued by
            your card issuer under the terms of your cardholder agreement; PointsPig
            does not issue points and makes no representations regarding the rewards
            you may earn. All charges are final and non-refundable. By initiating a
            transaction you acknowledge that no goods, services, or other consideration
            are provided in exchange for payment.
          </p>
          <p>
            &copy; 2010&ndash;{new Date().getFullYear()} PointsPig, Inc. All rights reserved.
            All piggies depicted are dramatizations.
          </p>
          <p className="font-mono text-cream/40">
            Visitor #00,038,294,012 &middot; Best viewed at 1024&times;768 &middot; Last updated yesterday
          </p>
        </div>
      </div>
    </footer>
  );
}
