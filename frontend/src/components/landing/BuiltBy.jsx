import { GithubIcon, MailIcon, LinkedinIcon } from "lucide-react";
import { SectionLabel, SectionTitle } from "./SectionHeading";

export default function BuiltBy() {
  return (
    <section
      id="built-by"
      className="relative z-10 max-w-2xl mx-auto px-4 py-20 text-center"
    >
      <div className="reveal mb-10">
        <SectionLabel>The human behind it</SectionLabel>
        <SectionTitle>
          Not a team. One dev.
          <br />
          No excuses.
        </SectionTitle>
      </div>

      <div className="reveal relative rounded-3xl border border-slate-700/30 bg-slate-800/40 p-8 sm:p-10 overflow-hidden builder-conic">
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-pink-400 flex items-center justify-center text-3xl font-syne font-extrabold text-white mb-5 shadow-cyan-lg">
            ✦
          </div>
          <div className="font-syne text-xl font-extrabold text-slate-100 mb-5">
            A Full-Stack Developer
          </div>

          <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto mb-8">
            Chatify isn&apos;t a tutorial clone. It&apos;s a production-deployed
            application with real security, real performance decisions, and a
            genuinely considered UI. If you need someone who sweats the details
            and ships things that work,{" "}
            <span className="text-slate-200 font-medium">let&apos;s talk.</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://github.com/cipheroot6"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 text-sm transition-colors no-underline"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a
              href="mailto:cipheroot@proton.me"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 text-sm transition-colors no-underline"
            >
              <MailIcon className="w-4 h-4" /> Get in touch
            </a>
            <a
              href="https://www.linkedin.com/in/cipheroot/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 text-sm transition-colors no-underline"
            >
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
