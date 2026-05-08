import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";
import { SectionTitle, SectionSub } from "./SectionHeading";

export default function CTA() {
  return (
    <section className="relative z-10 py-24 px-4 text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>
      <div className="reveal relative z-10 max-w-xl mx-auto">
        <SectionTitle className="mb-5">
          Ready to
          <br />
          <span className="text-cyan-400">actually</span> chat?
        </SectionTitle>
        <SectionSub className="mb-10 max-w-sm mx-auto">
          Create a free account in under 30 seconds. No card. No catch. No
          algorithm deciding what you see.
        </SectionSub>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-medium text-sm transition-all shadow-cyan no-underline"
          >
            Create free account <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-700/60 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 text-sm transition-colors no-underline"
          >
            Sign in
          </Link>
        </div>
        <div className="font-mono-jb text-[10px] text-slate-600 tracking-widest mt-5">
          free forever · no credit card · open source stack
        </div>
      </div>
    </section>
  );
}
