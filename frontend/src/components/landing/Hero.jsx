import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32 pb-16">
      <div className="fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 blink" />
        <span className="font-mono-jb text-xs text-cyan-400 tracking-widest">
          v1.0 — Now live
        </span>
      </div>

      <h1 className="fade-up fade-up-1 font-syne text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] text-slate-200 max-w-3xl">
        Messaging that
        <br />
        doesn&apos;t get in
        <br />
        your <span className="text-cyan-400">way.</span>
      </h1>

      <p className="fade-up fade-up-2 mt-6 text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
        Chatify strips away the noise. No algorithm. No ads. No dark patterns.
        Just fast, clean, private conversations — the way it should have always
        been.
      </p>

      <div className="fade-up fade-up-3 flex flex-wrap gap-3 justify-center mt-9">
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-sm transition-all shadow-cyan no-underline"
        >
          Start for free <ArrowRightIcon className="w-4 h-4" />
        </Link>
        <a
          href="#features"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700/60 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 text-sm transition-colors no-underline"
        >
          See what&apos;s inside
        </a>
      </div>

      <div className="fade-up fade-up-4 flex flex-wrap gap-10 justify-center mt-14">
        {[
          ["100%", "free to use"],
          ["< 1s", "message delivery"],
          ["0", "ads, ever"],
        ].map(([num, label]) => (
          <div key={label} className="text-center">
            <div className="font-syne text-2xl sm:text-3xl font-extrabold text-slate-200">
              {num}
            </div>
            <div className="font-mono-jb text-[10px] text-slate-500 tracking-widest mt-1">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
