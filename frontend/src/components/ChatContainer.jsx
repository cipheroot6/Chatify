import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col min-h-0">

      <ChatHeader />

      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-8">
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length === 0 ? (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div className={`chat-bubble ${
                  msg.senderId === authUser._id
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-200"
                }`}>
                  {msg.image && (
                    <img src={msg.image} alt="shared" className="rounded-lg h-48 object-cover mb-2" />
                  )}
                  {msg.text && <p>{msg.text}</p>}
                  <p className="text-xs mt-1 opacity-75">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        )}
      </div>

      <div className="shrink-0">
        <MessageInput />
      </div>

    </div>
  );
}

export default ChatContainer;
