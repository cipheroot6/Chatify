export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-700/20 px-6 py-6">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <div className="font-syne font-extrabold text-slate-500 tracking-tight">
          Chatify<span className="text-cyan-400">.</span>
        </div>
        <div className="font-mono-jb text-[10px] text-slate-600 tracking-widest text-center">
          © 2025 Chatify — built with intent, not VC money.
        </div>
      </div>
    </footer>
  );
}
