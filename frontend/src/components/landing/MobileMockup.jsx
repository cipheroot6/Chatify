import { ImageIcon, SendIcon, SmileIcon } from "lucide-react";
import MockMsg from "./MockMsg";

export default function MobileMockup() {
  return (
    <div className="sm:hidden reveal relative z-10 flex justify-center px-8 mb-20">
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
            text="Do you ever feel like we're just echoes of a conversation that happened eons ago? 🎙️"
            time="2:14 AM"
          />
          <MockMsg from="me" text="Living in the reverb? That's haunting." time="2:15 AM" read={true} />
          <div className="flex flex-col gap-1 max-w-[80%] self-start">
            <div className="bg-slate-800 text-slate-200 text-xs rounded-2xl px-3.5 py-2 leading-relaxed">
              <p>Every spark of joy... just a ripple in a cosmic lake.</p>
              <div className="flex items-center justify-start mt-1 opacity-70">
                <span className="font-mono-jb text-[9px]">2:17 AM</span>
              </div>
            </div>
          </div>
          <MockMsg from="me" text="Let's make the surface look interesting." time="2:18 AM" read={true} />
          
          {/* Typing indicator */}
          <div className="flex items-center gap-1.5 self-start mt-1">
            <div className="flex gap-1 bg-slate-800/80 px-2.5 py-1.5 rounded-full border border-slate-700/50">
              <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>

        {/* Input bar — matching real MessageInput */}
        <div className="flex items-center gap-2 px-3 py-3 border-t border-slate-700/30 bg-slate-900/90 backdrop-blur-md">
          <div className="flex-1 bg-slate-800/60 border border-slate-700/30 rounded-lg px-3 py-1.5 text-[10px] text-slate-500 font-mono-jb">
            Type your message...
          </div>
          <div className="flex items-center gap-1.5">
            <SmileIcon className="w-4 h-4 text-slate-400" />
            <ImageIcon className="w-4 h-4 text-slate-400" />
            <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center flex-shrink-0">
              <SendIcon className="w-3.5 h-3.5 text-white" />
            </div>
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
