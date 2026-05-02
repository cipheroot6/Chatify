import { useEffect } from "react";
import { Link } from "react-router";
import {
  MessageCircleIcon,
  ImageIcon,
  ShieldCheckIcon,
  Volume2Icon,
  UserCircleIcon,
  ZapIcon,
  CircleDotIcon,
  ArrowRightIcon,
  GithubIcon,
  MailIcon,
  LinkedinIcon,
} from "lucide-react";
import "./LandingPage.css";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("in-view"), i * 70);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── Shared heading components — consistent sizing everywhere ─────────────────
function SectionLabel({ children }) {
  return (
    <div className="font-mono-jb text-xs tracking-widest text-cyan-400 uppercase mb-3">
      {children}
    </div>
  );
}
function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`font-syne text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-200 leading-tight ${className}`}
    >
      {children}
    </h2>
  );
}
function SectionSub({ children, className = "" }) {
  return (
    <p
      className={`text-slate-400 mt-4 leading-relaxed text-sm sm:text-base ${className}`}
    >
      {children}
    </p>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
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

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32 pb-16">
      <div className="fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 blink" />
        <span className="font-mono-jb text-xs text-cyan-400 tracking-widest">
          v1.0 — Now live
        </span>
      </div>

      {/* Hero headline is intentionally larger than section headings */}
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

// ─── SHARED: single message bubble ────────────────────────────────────────────
function MockMsg({ from, text, time }) {
  const isMe = from === "me";
  return (
    <div
      className={`flex flex-col gap-1 max-w-[80%] ${
        isMe ? "self-end items-end" : "self-start"
      }`}
    >
      <div
        className={`text-xs rounded-2xl px-3 py-2 leading-relaxed ${
          isMe ? "bg-cyan-600 text-white" : "bg-slate-700/80 text-slate-200"
        }`}
      >
        {text}
      </div>
      <span className="font-mono-jb text-[9px] text-slate-600">{time}</span>
    </div>
  );
}

// ─── MOBILE MOCKUP — phone shell, shown only on <sm ──────────────────────────
function MobileMockup() {
  return (
    <div className="sm:hidden reveal relative z-10 flex justify-center px-8 mb-20">
      {/* Phone outer shell */}
      <div className="w-64 rounded-[2.5rem] border-2 border-slate-700/50 bg-slate-900 overflow-hidden shadow-cyan-lg">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="font-mono-jb text-[9px] text-slate-400">9:41</span>
          <div className="w-12 h-3 rounded-full bg-slate-800 border border-slate-700/50" />
          <span className="font-mono-jb text-[9px] text-slate-400">●●●</span>
        </div>

        {/* Chat header */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-slate-700/30 bg-slate-800/50">
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-400 flex items-center justify-center text-[10px] text-white font-semibold flex-shrink-0">
            AJ
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400 border border-slate-900" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">
              Alex Johnson
            </div>
            <div className="font-mono-jb text-[9px] text-green-400">online</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-3 p-3 min-h-[260px] bg-slate-900/60">
          <MockMsg
            from="them"
            text="Hey! Have you seen the new design? 🔥"
            time="10:42 AM"
          />
          <MockMsg from="me" text="Just did — clean as hell." time="10:44 AM" />
          <div className="flex flex-col gap-1.5 max-w-[80%] self-start">
            <div className="bg-slate-700/80 text-slate-200 text-xs rounded-2xl px-3 py-2 leading-relaxed">
              They even shipped image sharing —
            </div>
            <div className="w-24 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/20 flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="font-mono-jb text-[9px] text-slate-600">
              10:45 AM
            </span>
          </div>
          <MockMsg from="me" text="Switching for real. 🙌" time="10:46 AM" />
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-t border-slate-700/30 bg-slate-900/80">
          <div className="flex-1 bg-slate-800/60 border border-slate-700/30 rounded-full px-3 py-1.5 text-[10px] text-slate-500 font-mono-jb">
            Type a message...
          </div>
          <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">
            <ArrowRightIcon className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Home bar */}
        <div className="flex justify-center py-2 bg-slate-900/80">
          <div className="w-20 h-1 rounded-full bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

// ─── DESKTOP MOCKUP — macOS window, hidden on mobile, shown sm+ ───────────────
function DesktopMockup() {
  return (
    <div className="hidden sm:block reveal relative z-10 max-w-3xl mx-auto px-4 mb-28">
      <div className="mockup-border rounded-2xl overflow-hidden shadow-cyan-lg">
        {/* macOS window bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-b border-slate-700/20">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28ca41]" />
          <span className="font-mono-jb text-xs text-slate-500 ml-2">
            chatify — conversations
          </span>
        </div>

        {/* Sidebar + chat */}
        <div className="grid grid-cols-[220px_1fr] min-h-[340px] relative">
          {/* Sidebar */}
          <div className="flex flex-col gap-2 bg-slate-800/60 border-r border-slate-700/20 p-3">
            <div className="flex gap-1 mb-1">
              <div className="flex-1 text-center text-[10px] font-mono-jb py-1 rounded-md bg-cyan-500/10 text-cyan-400">
                Chats
              </div>
              <div className="flex-1 text-center text-[10px] font-mono-jb py-1 rounded-md text-slate-500">
                Contacts
              </div>
            </div>
            {[
              {
                initials: "AJ",
                name: "Alex Johnson",
                gradient: "from-cyan-500 to-indigo-400",
                online: true,
              },
              {
                initials: "SM",
                name: "Sara M.",
                gradient: "from-pink-400 to-orange-400",
                online: false,
              },
              {
                initials: "KD",
                name: "Kyle D.",
                gradient: "from-slate-500 to-slate-700",
                online: false,
              },
            ].map(({ initials, name, gradient, online }, i) => (
              <div
                key={initials}
                className={`flex items-center gap-2 px-2 py-2 rounded-lg ${
                  i === 0 ? "bg-cyan-500/10" : "opacity-40"
                }`}
              >
                <div
                  className={`relative w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-[10px] text-white font-semibold flex-shrink-0`}
                >
                  {online && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400 border border-slate-800" />
                  )}
                  {initials}
                </div>
                <span className="text-xs text-slate-300 font-medium">
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-4 p-4 pb-14">
            <MockMsg
              from="them"
              text="Hey! Have you seen the new design? 🔥"
              time="10:42 AM"
            />
            <MockMsg
              from="me"
              text="Just did — clean as hell. Love the dark theme."
              time="10:44 AM"
            />
            <div className="flex flex-col gap-2 max-w-[72%] self-start">
              <div className="bg-slate-700/80 text-slate-200 text-xs rounded-2xl px-3 py-2 leading-relaxed">
                They even shipped image sharing —
              </div>
              <div className="w-28 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/20 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-mono-jb text-[9px] text-slate-600">
                10:45 AM
              </span>
            </div>
            <MockMsg
              from="me"
              text="Okay this is actually good. Switching for real."
              time="10:46 AM"
            />
          </div>

          {/* Input bar — offset by sidebar width */}
          <div className="absolute bottom-0 left-[220px] right-0 flex items-center gap-2 px-4 py-2.5 bg-slate-900/80 border-t border-slate-700/20">
            <div className="flex-1 bg-slate-800/60 border border-slate-700/30 rounded-lg px-3 py-1.5 text-xs text-slate-500 font-mono-jb">
              Type a message...
            </div>
            <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center">
              <ArrowRightIcon className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <MessageCircleIcon className="w-5 h-5 text-cyan-400" />,
    title: "Real-time messaging",
    desc: "Messages land instantly. No polling, no lag. Your words arrive at the speed you think them.",
    tag: "// instant delivery",
    accent: "cyan",
  },
  {
    icon: <ImageIcon className="w-5 h-5 text-pink-400" />,
    title: "Image sharing",
    desc: "Send images directly in chat. Stored securely on Cloudinary CDN — fast loads, no expiry.",
    tag: "// cdn-backed",
    accent: "pink",
  },
  {
    icon: <CircleDotIcon className="w-5 h-5 text-cyan-400" />,
    title: "Online presence",
    desc: "See who's around in real time. Presence indicators update live — no refresh needed.",
    tag: "// live status",
    accent: "cyan",
  },
  {
    icon: <ShieldCheckIcon className="w-5 h-5 text-pink-400" />,
    title: "Security-first",
    desc: "JWT auth, HttpOnly cookies, bcrypt hashing, Arcjet bot protection and rate-limiting — every layer hardened.",
    tag: "// arcjet + jwt",
    accent: "pink",
  },
  {
    icon: <Volume2Icon className="w-5 h-5 text-cyan-400" />,
    title: "Keyboard sounds",
    desc: "Satisfying keystroke audio as you type. Toggle on or off. Sounds dumb until you try it — then you can't stop.",
    tag: "// optional & toggleable",
    accent: "cyan",
  },
  {
    icon: <UserCircleIcon className="w-5 h-5 text-pink-400" />,
    title: "Profile customization",
    desc: "Upload a profile picture instantly to cloud storage. One tap, no waiting.",
    tag: "// cloud avatars",
    accent: "pink",
  },
  {
    icon: <ZapIcon className="w-5 h-5 text-cyan-400" />,
    title: "Optimistic UI — messages appear before they even send",
    desc: "Unlike most apps that wait for a server round-trip, Chatify renders your message instantly and rolls back gracefully on failure. The difference is visceral — this feels alive.",
    tag: "// optimistic updates",
    accent: "cyan",
    large: true,
  },
];

function Features() {
  return (
    <section
      id="features"
      className="relative z-10 max-w-5xl mx-auto px-4 py-20"
    >
      <div className="reveal text-center mb-14">
        <SectionLabel>What makes it different</SectionLabel>
        <SectionTitle>
          Built to focus,
          <br />
          not to distract.
        </SectionTitle>
        <SectionSub className="max-w-md mx-auto">
          Every feature exists for a reason. If it doesn&apos;t help you
          communicate better, it&apos;s not here.
        </SectionSub>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className={`reveal group relative rounded-2xl border border-slate-700/30 bg-slate-800/40 p-6 overflow-hidden
              hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300
              ${f.large ? "sm:col-span-2 lg:col-span-3" : ""}`}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 border ${
                f.accent === "cyan"
                  ? "bg-cyan-500/10 border-cyan-500/20"
                  : "bg-pink-500/10 border-pink-500/20"
              }`}
            >
              {f.icon}
            </div>
            <div className="font-syne text-base font-bold text-slate-100 mb-2">
              {f.title}
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            <span className="inline-block mt-4 font-mono-jb text-[10px] tracking-wide text-cyan-400 border border-cyan-500/15 px-2 py-1 rounded">
              {f.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── TESTIMONIALS — mixed ratings, asterisk disclaimer ────────────────────────
const TESTIMONIALS = [
  {
    rating: "4.9",
    stars: 5,
    quote:
      "Finally a chat app that respects my attention. No feeds, no stories, no dopamine traps. Just messages.",
    name: "Jordan L.",
    role: "Product Designer",
    initials: "JL",
    from: "from-cyan-500 to-indigo-400",
  },
  {
    rating: "4.6",
    stars: 4,
    quote:
      "The keyboard sounds are a bit niche but I genuinely enjoy it. The UI is clean and fast — that's what matters.",
    name: "Maya R.",
    role: "Software Engineer",
    initials: "MR",
    from: "from-pink-400 to-orange-400",
  },
  {
    rating: "4.8",
    stars: 5,
    quote:
      "Looks like months of senior design work. Found out it's a solo side project. Respect.",
    name: "Amir K.",
    role: "Startup Founder",
    initials: "AK",
    from: "from-indigo-500 to-violet-500",
  },
  {
    rating: "4.7",
    stars: 5,
    quote:
      "Messages feel noticeably faster than what I was using before. The optimistic UI is a nice touch.",
    name: "Sophie P.",
    role: "Frontend Developer",
    initials: "SP",
    from: "from-cyan-600 to-teal-400",
  },
  {
    rating: "4.5",
    stars: 4,
    quote:
      "Zero ads, no algorithmic manipulation. Would love group chats eventually but for 1-on-1 it's great.",
    name: "Tom N.",
    role: "Tech Journalist",
    initials: "TN",
    from: "from-slate-500 to-slate-600",
  },
  {
    rating: "4.8",
    stars: 5,
    quote:
      "Image sharing just works. No compression artifacts, no spinner. More reliable than apps I've paid for.",
    name: "Claire W.",
    role: "UX Researcher",
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

function Testimonials() {
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
                <div>
                  <div className="text-xs text-slate-200 font-medium">
                    {t.name}
                  </div>
                  <div className="font-mono-jb text-[10px] text-slate-500">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
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

function HowItWorks() {
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

// ─── TECH STACK ───────────────────────────────────────────────────────────────
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

function TechStack() {
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

// ─── BUILT BY ─────────────────────────────────────────────────────────────────
function BuiltBy() {
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
          <div className="font-syne text-xl font-extrabold text-slate-100 mb-1">
            A Full-Stack Developer
          </div>
          <div className="font-mono-jb text-xs text-cyan-400 tracking-widest mb-5">
            // mern stack · ui design · deployment
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
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 text-sm transition-colors no-underline"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a
              href="mailto:your@email.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 text-sm transition-colors no-underline"
            >
              <MailIcon className="w-4 h-4" /> Get in touch
            </a>
            <a
              href="https://linkedin.com"
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

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
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

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
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

// ─── PAGE ROOT ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  useReveal();

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-x-hidden">
      {/* Bg decorators — same as the rest of the app */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="fixed top-0 -left-10 w-[480px] h-[480px] bg-pink-500 opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 -right-10 w-[480px] h-[480px] bg-cyan-500 opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
      <Navbar />
      <Hero />
      <MobileMockup /> {/* phone shell — <sm only */}
      <DesktopMockup /> {/* mac window  — sm+ only */}
      <Features />
      <Testimonials />
      <HowItWorks />
      <TechStack />
      <BuiltBy />
      <CTA />
      <Footer />
    </div>
  );
}
