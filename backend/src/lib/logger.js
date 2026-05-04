const isDev = process.env.NODE_ENV !== "production";

const fmt = (level, ...args) => {
  const ts = new Date().toISOString();
  if (isDev) {
    console[level === "error" ? "error" : "log"](`[${ts}] [${level.toUpperCase()}]`, ...args);
  } else {
    // In production, output JSON for log aggregators
    process.stdout.write(JSON.stringify({ ts, level, msg: args.join(" ") }) + "\n");
  }
};

export const logger = {
  info:  (...args) => fmt("info", ...args),
  warn:  (...args) => fmt("warn", ...args),
  error: (...args) => fmt("error", ...args),
  debug: (...args) => isDev && fmt("debug", ...args),
};
