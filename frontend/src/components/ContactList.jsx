function ContactList() {
  return (
    <div className="space-y-2">
      <div className="contact-item p-3 rounded-lg hover:bg-slate-700/50 cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="avatar online">
            <div className="w-12 h-12 rounded-full bg-slate-600"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-slate-200">Alice Johnson</h3>
            <p className="text-sm text-slate-400">Online</p>
          </div>
        </div>
      </div>
      
      <div className="contact-item p-3 rounded-lg hover:bg-slate-700/50 cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="avatar offline">
            <div className="w-12 h-12 rounded-full bg-slate-600"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-slate-200">Bob Williams</h3>
            <p className="text-sm text-slate-400">Offline</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactList;