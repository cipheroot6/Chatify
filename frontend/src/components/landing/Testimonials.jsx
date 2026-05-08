import { SectionLabel, SectionTitle, SectionSub } from "./SectionHeading";

const TESTIMONIALS = [
  {
    rating: "4.9",
    stars: 5,
    quote:
      "Finally a chat app that respects my attention. No feeds, no stories, no dopamine traps. Just messages.",
    name: "Jordan L.",
    initials: "JL",
    from: "from-cyan-500 to-indigo-400",
  },
  {
    rating: "4.6",
    stars: 4,
    quote:
      "The keyboard sounds are a bit niche but I genuinely enjoy it. The UI is clean and fast — that's what matters.",
    name: "Maya R.",
    initials: "MR",
    from: "from-pink-400 to-orange-400",
  },
  {
    rating: "4.8",
    stars: 5,
    quote:
      "Looks like months of senior design work. Found out it's a solo side project. Respect.",
    name: "Amir K.",
    initials: "AK",
    from: "from-indigo-500 to-violet-500",
  },
  {
    rating: "4.7",
    stars: 5,
    quote:
      "Messages feel noticeably faster than what I was using before. The optimistic UI is a nice touch.",
    name: "Sophie P.",
    initials: "SP",
    from: "from-cyan-600 to-teal-400",
  },
  {
    rating: "4.5",
    stars: 4,
    quote:
      "Zero ads, no algorithmic manipulation. Would love group chats eventually but for 1-on-1 it's great.",
    name: "Tom N.",
    initials: "TN",
    from: "from-slate-500 to-slate-600",
  },
  {
    rating: "4.8",
    stars: 5,
    quote:
      "Image sharing just works. No compression artifacts, no spinner. More reliable than apps I've paid for.",
    name: "Claire W.",
    initials: "CW",
    from: "from-fuchsia-500 to-purple-500",
  },
];

function StarRow({ count }) {
  return (
    <span className="text-amber-400 text-sm tracking-tight">
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

export default function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative z-10 py-20 overflow-hidden">
      <div className="reveal text-center mb-10 px-4">
        <SectionLabel>What people are saying</SectionLabel>
        <SectionTitle>People notice the difference.</SectionTitle>
        <SectionSub className="max-w-xs mx-auto text-xs mt-3">
          * Collected from early-access beta users. Ratings are unverified.
        </SectionSub>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="w-72 flex-shrink-0 rounded-2xl border border-slate-700/30 bg-slate-800/50 p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <StarRow count={t.stars} />
                <span className="font-mono-jb text-[10px] text-slate-500">
                  {t.rating}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5 mt-4">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.from} flex items-center justify-center text-[10px] text-white font-semibold flex-shrink-0`}
                >
                  {t.initials}
                </div>
                  <div className="text-xs text-slate-200 font-medium">
                    {t.name}
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
