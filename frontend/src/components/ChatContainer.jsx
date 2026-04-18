function ChatContainer() {
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="border-b border-slate-700/50 p-4">
        <div className="flex items-center gap-3">
          <div className="avatar online">
            <div className="w-10 h-10 rounded-full bg-slate-600"></div>
          </div>
          <div>
            <h3 className="font-medium text-slate-200">Chat Partner</h3>
            <p className="text-xs text-slate-400">Online</p>
          </div>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-start gap-2">
          <div className="avatar">
            <div className="w-8 h-8 rounded-full bg-slate-600"></div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3 max-w-xs">
            <p className="text-slate-200">Hello there! How are you doing today?</p>
            <span className="text-xs text-slate-400 mt-1 block">10:30 AM</span>
          </div>
        </div>
        
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-cyan-600/50 rounded-lg p-3 max-w-xs">
            <p className="text-slate-100">I'm doing great! Thanks for asking.</p>
            <span className="text-xs text-slate-300 mt-1 block">10:32 AM</span>
          </div>
          <div className="avatar">
            <div className="w-8 h-8 rounded-full bg-cyan-600"></div>
          </div>
        </div>
      </div>
      
      {/* Message input */}
      <div className="border-t border-slate-700/50 p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 input"
          />
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;