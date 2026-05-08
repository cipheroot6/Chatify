export function SectionLabel({ children }) {
  return (
    <div className="font-mono-jb text-xs tracking-widest text-cyan-400 uppercase mb-3">
      {children}
    </div>
  );
}

export function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`font-syne text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-200 leading-tight ${className}`}
    >
      {children}
    </h2>
  );
}

export function SectionSub({ children, className = "" }) {
  return (
    <p
      className={`text-slate-400 mt-4 leading-relaxed text-sm sm:text-base ${className}`}
    >
      {children}
    </p>
  );
}
