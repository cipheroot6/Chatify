import { SectionLabel, SectionTitle, SectionSub } from "./SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Create your account",
    desc: "Sign up with name, email and a password. No phone verification, no OAuth maze, no dark patterns. You're in.",
  },
  {
    n: "02",
    title: "Find your people",
    desc: "Browse the contacts directory and start a conversation with anyone on the platform. History is saved for next time.",
  },
  {
    n: "03",
    title: "Make it yours",
    desc: "Upload a profile photo in one tap. Turn on keyboard sounds. You'll think it's dumb until you can't turn it off.",
  },
  {
    n: "04",
    title: "Just chat",
    desc: "Text, images, emojis. Messages appear before you even hit send thanks to optimistic UI. It just feels better.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative z-10 max-w-2xl mx-auto px-4 py-20">
      <div className="reveal text-center mb-14">
        <SectionLabel>Getting started</SectionLabel>
        <SectionTitle>
          Zero setup.
          <br />
          Instant conversations.
        </SectionTitle>
        <SectionSub className="max-w-sm mx-auto">
          From first visit to active chat in under 60 seconds. No credit card,
          no download.
        </SectionSub>
      </div>

      <div className="relative steps-line">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className="reveal flex gap-5 items-start py-6"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="relative z-10 w-11 h-11 flex-shrink-0 rounded-full bg-slate-900 border border-cyan-500/40 flex items-center justify-center font-mono-jb text-xs text-cyan-400 shadow-cyan">
              {s.n}
            </div>
            <div className="pt-1.5">
              <div className="font-syne text-base font-bold text-slate-100 mb-1.5">
                {s.title}
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
