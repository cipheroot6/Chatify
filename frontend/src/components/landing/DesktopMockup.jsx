import { ImageIcon, SendIcon, SmileIcon } from "lucide-react";
import MockMsg from "./MockMsg";

export default function DesktopMockup() {
  return (
    <div className="hidden sm:block reveal relative z-10 max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 mb-28">
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
        <div className="grid grid-cols-[220px_1fr] min-h-[400px] lg:min-h-[520px] relative">
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
              text="Do you ever feel like we're just echoes of a conversation that happened eons ago? 🎙️"
              time="2:14 AM"
            />
            <MockMsg
              from="me"
              text="Like we're living in the reverb? That's a haunting thought."
              time="2:15 AM"
              read={true}
            />
            <div className="flex flex-col gap-1 max-w-[72%] self-start">
              <div className="bg-slate-800 text-slate-200 text-xs rounded-2xl px-3.5 py-2 leading-relaxed">
                <p>Exactly. Every spark of joy... just a ripple in a cosmic lake that's already gone still.</p>
                <div className="flex items-center justify-start mt-1 opacity-70">
                  <span className="font-mono-jb text-[9px]">2:17 AM</span>
                </div>
              </div>
            </div>
            <MockMsg
              from="me"
              text="If we're just ripples, I hope we make the surface look interesting while we last."
              time="2:18 AM"
              read={true}
            />
            <MockMsg
              from="them"
              text="We will. Even the smallest ripple eventually touches the shore of something greater. 🌊"
              time="2:19 AM"
            />
            <MockMsg
              from="me"
              text="Maybe that's what art is. Just us trying to stay visible in the dark."
              time="2:21 AM"
              read={true}
            />
            <MockMsg
              from="them"
              text="Maybe the silence of space is just the universe holding its breath, waiting for us to say something meaningful."
              time="2:24 AM"
            />
            
            {/* Typing indicator */}
            <div className="flex items-center gap-1.5 self-start mt-2">
              <div className="flex gap-1 bg-slate-800/80 px-3 py-2 rounded-full border border-slate-700/50">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>

          {/* Input bar — matching real MessageInput */}
          <div className="absolute bottom-0 left-[220px] right-0 flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-t border-slate-700/50 backdrop-blur-md">
            <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2 text-xs text-slate-400 font-mono-jb">
              Type your message...
            </div>
            <div className="flex items-center gap-1.5">
              <div className="p-2 rounded-lg bg-slate-800/50 text-slate-400">
                <SmileIcon className="w-4 h-4" />
              </div>
              <div className="p-2 rounded-lg bg-slate-800/50 text-slate-400">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div className="p-2 rounded-lg bg-cyan-500 text-white shadow-cyan-sm">
                <SendIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
