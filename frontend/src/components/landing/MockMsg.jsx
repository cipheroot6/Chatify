import { CheckCheckIcon } from "lucide-react";

export default function MockMsg({ from, text, time, read }) {
  const isMe = from === "me";
  return (
    <div
      className={`flex flex-col gap-1 max-w-[85%] ${
        isMe ? "self-end items-end" : "self-start"
      }`}
    >
      <div
        className={`relative text-xs rounded-2xl px-3.5 py-2 leading-relaxed ${
          isMe ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"
        }`}
      >
        <p>{text}</p>
        <div className="flex items-center justify-end gap-1 mt-1 opacity-70">
          <span className="font-mono-jb text-[9px]">{time}</span>
          {isMe && read && (
            <CheckCheckIcon className="w-3 h-3 text-cyan-300" />
          )}
        </div>
      </div>
    </div>
  );
}
