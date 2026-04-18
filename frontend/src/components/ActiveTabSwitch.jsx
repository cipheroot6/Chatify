function ActiveTabSwitch() {
  return (
    <div className="flex items-center justify-center p-2">
      <div className="bg-slate-800 rounded-lg p-1 flex">
        <button className="px-4 py-2 rounded-md bg-slate-700 text-white">
          Chats
        </button>
        <button className="px-4 py-2 rounded-md text-slate-300">
          Contacts
        </button>
      </div>
    </div>
  );
}

export default ActiveTabSwitch;