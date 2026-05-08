import { SectionLabel, SectionTitle } from "./SectionHeading";

const TECHS = [
  "React 19",
  "Vite 7",
  "Express.js",
  "MongoDB",
  "Mongoose",
  "JWT Auth",
  "Cloudinary CDN",
  "Arcjet Security",
  "Tailwind CSS",
  "Zustand",
  "React Router 7",
  "Vercel",
];

export default function TechStack() {
  return (
    <section className="reveal relative z-10 py-16 text-center px-4">
      <SectionLabel>Technology</SectionLabel>
      <SectionTitle className="mb-8">Production-grade tooling</SectionTitle>
      <div className="flex flex-wrap gap-2.5 justify-center max-w-2xl mx-auto">
        {TECHS.map((t) => (
          <span
            key={t}
            className="font-mono-jb text-xs text-slate-400 border border-slate-700/50 bg-slate-800/40 hover:border-cyan-400 hover:text-cyan-300 transition-colors px-3.5 py-1.5 rounded-full cursor-default"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
