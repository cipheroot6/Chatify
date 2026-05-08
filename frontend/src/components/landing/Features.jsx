import {
  MessageCircleIcon,
  ImageIcon,
  ShieldCheckIcon,
  Volume2Icon,
  UserCircleIcon,
  ZapIcon,
  CircleDotIcon,
} from "lucide-react";
import { SectionLabel, SectionTitle, SectionSub } from "./SectionHeading";

const FEATURES = [
  {
    icon: <MessageCircleIcon className="w-5 h-5 text-cyan-400" />,
    title: "Real-time messaging",
    desc: "Messages land instantly. No polling, no lag. Your words arrive at the speed you think them.",
    accent: "cyan",
  },
  {
    icon: <ImageIcon className="w-5 h-5 text-pink-400" />,
    title: "Image sharing",
    desc: "Send images directly in chat. Stored securely on Cloudinary CDN — fast loads, no expiry.",
    accent: "pink",
  },
  {
    icon: <CircleDotIcon className="w-5 h-5 text-cyan-400" />,
    title: "Online presence",
    desc: "See who's around in real time. Presence indicators update live — no refresh needed.",
    accent: "cyan",
  },
  {
    icon: <ShieldCheckIcon className="w-5 h-5 text-pink-400" />,
    title: "Security-first",
    desc: "JWT auth, HttpOnly cookies, bcrypt hashing, Arcjet bot protection and rate-limiting — every layer hardened.",
    accent: "pink",
  },
  {
    icon: <Volume2Icon className="w-5 h-5 text-cyan-400" />,
    title: "Keyboard sounds",
    desc: "Satisfying keystroke audio as you type. Toggle on or off. Sounds dumb until you try it — then you can't stop.",
    accent: "cyan",
  },
  {
    icon: <UserCircleIcon className="w-5 h-5 text-pink-400" />,
    title: "Profile customization",
    desc: "Upload a profile picture instantly to cloud storage. One tap, no waiting.",
    accent: "pink",
  },
  {
    icon: <ZapIcon className="w-5 h-5 text-cyan-400" />,
    title: "Optimistic UI — messages appear before they even send",
    desc: "Unlike most apps that wait for a server round-trip, Chatify renders your message instantly and rolls back gracefully on failure. The difference is visceral — this feels alive.",
    accent: "cyan",
    large: true,
  },
];

export default function Features() {
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
          </div>
        ))}
      </div>
    </section>
  );
}
