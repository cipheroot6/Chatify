function ChatsList() {
  return (
    <div className="space-y-2">
      <div className="chat-item bg-slate-700/50 p-3 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="avatar online">
            <div className="w-12 h-12 rounded-full bg-slate-600"></div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-slate-200">John Doe</h3>
              <span className="text-xs text-slate-400">10:30 AM</span>
            </div>
            <p className="text-sm text-slate-400 truncate">Last message...</p>
          </div>
        </div>
      </div>
      
      <div className="chat-item p-3 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="avatar online">
            <div className="w-12 h-12 rounded-full bg-slate-600"></div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-slate-200">Jane Smith</h3>
              <span className="text-xs text-slate-400">Yesterday</span>
            </div>
            <p className="text-sm text-slate-400 truncate">Another message...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatsList;