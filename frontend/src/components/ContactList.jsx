import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { SearchIcon, UserPlusIcon, MessageSquareIcon, AlertCircleIcon } from "lucide-react";

function ContactList() {
  const [email, setEmail] = useState("");
  const { 
    findUserByEmail, 
    searchResult, 
    searchError, 
    isUsersLoading, 
    setSelectedUser,
    setActiveTab 
  } = useChatStore();
  
  const { onlineUsers } = useAuthStore();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    findUserByEmail(email.trim());
  };

  const handleStartChat = () => {
    if (searchResult) {
      setSelectedUser(searchResult);
      setActiveTab("chats");
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSearch} className="mb-6">
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Find someone by their exact email address
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-800/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              placeholder="friend@example.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isUsersLoading || !email.trim()}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex-shrink-0"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex-1 overflow-y-auto">
        {isUsersLoading ? (
          <UsersLoadingSkeleton />
        ) : searchError ? (
          <div className="flex flex-col items-center justify-center h-40 text-center px-4">
            <AlertCircleIcon className="w-10 h-10 text-slate-600 mb-3" />
            <p className="text-slate-400 text-sm">{searchError}</p>
          </div>
        ) : searchResult ? (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Result</h3>
            <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className={`avatar ${onlineUsers.includes(searchResult._id) ? "online" : "offline"}`}>
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700">
                    <img src={searchResult.profilePic || "/avatar.png"} alt={searchResult.fullName} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-slate-200 font-medium truncate">{searchResult.fullName}</h4>
                  <p className="text-slate-500 text-sm truncate">{searchResult.email}</p>
                </div>
              </div>
              <button
                onClick={handleStartChat}
                className="w-full flex items-center justify-center gap-2 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors text-sm font-medium"
              >
                <MessageSquareIcon className="w-4 h-4" />
                Start chatting
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6">
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
              <UserPlusIcon className="w-8 h-8 text-cyan-500" />
            </div>
            <h3 className="text-slate-300 font-medium mb-2">Connect with friends</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              For privacy reasons, there is no public directory. You must know someone's exact email address to find them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactList;
