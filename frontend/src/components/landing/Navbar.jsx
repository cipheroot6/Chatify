import { Link } from "react-router";
import { ArrowRightIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/20">
      <Link
        to="/"
        className="flex items-center gap-2 font-syne text-xl font-extrabold tracking-tight text-slate-200 no-underline"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-dot shadow-cyan" />
        Chatify<span className="text-cyan-400">.</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {[
          ["Features", "#features"],
          ["How it works", "#how"],
          ["About", "#built-by"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors no-underline"
          >
            {label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          to="/login"
          className="hidden sm:inline-flex text-sm px-4 py-2 rounded-lg border border-slate-700/50 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors no-underline"
        >
          Sign in
        </Link>
        <Link
          to="/signup"
          className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-all no-underline shadow-cyan"
        >
          Get started <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </nav>
  );
}
