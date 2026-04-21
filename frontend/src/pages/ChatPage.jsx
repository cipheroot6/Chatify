import { useChatStore } from "../store/useChatStore";
import BoarderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900 md:p-4">
      <div className="w-full h-full md:max-w-6xl md:h-[calc(100vh-2rem)]">
        <BoarderAnimatedContainer>

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

        </BoarderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage;
