function NoConversationPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="mb-6">
        <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-600"></div>
        </div>
      </div>
      <h3 className="text-xl font-medium text-slate-300 mb-2">
        No conversation selected
      </h3>
      <p className="text-slate-400 max-w-md">
        Select a chat from your conversations or start a new one to begin messaging.
      </p>
    </div>
  );
}

export default NoConversationPlaceholder;