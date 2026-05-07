import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser, subscribeToGlobalEvents, unsubscribeFromGlobalEvents } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (!authUser?._id) return;
    subscribeToGlobalEvents(authUser._id);
    return () => unsubscribeFromGlobalEvents(authUser._id);
  }, [authUser?._id, subscribeToGlobalEvents, unsubscribeFromGlobalEvents]);

  return (
    // h-[100dvh] instead of h-screen so mobile browser chrome + virtual keyboard
    // don't push the input bar off screen
    <div className="h-[100dvh] flex bg-slate-900">
      {/* Sidebar */}
      <div className={`
        ${selectedUser ? "hidden md:flex" : "flex"}
        shrink-0 w-full md:w-96 flex-col h-full bg-slate-800/50 overflow-hidden
      `}>
        <ProfileHeader />
        <ActiveTabSwitch />
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatsList /> : <ContactList />}
        </div>
      </div>

      {/* Right panel */}
      <div className={`
        ${selectedUser ? "flex" : "hidden md:flex"}
        flex-1 min-w-0 flex-col h-full overflow-hidden bg-slate-900/50
      `}>
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </div>
  );
}

export default ChatPage;
