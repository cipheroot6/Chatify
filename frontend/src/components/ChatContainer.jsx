import { useEffect, useRef } from "react";
import { CheckIcon, CheckCheckIcon, Trash2Icon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages, deleteMessage, markMessagesAsRead } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  useEffect(() => {
    if (!selectedUser) return;
    subscribeToMessages(authUser._id);
    return () => {
      unsubscribeFromMessages(authUser._id);
    };
  }, [selectedUser, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (selectedUser) {
      markMessagesAsRead(selectedUser._id);
    }
  }, [selectedUser, markMessagesAsRead]);

  useEffect(() => {
    if (selectedUser && messages.length > 0) {
      const hasUnreadFromSender = messages.some(
        (msg) => msg.senderId === selectedUser._id && !msg.isRead
      );
      if (hasUnreadFromSender) {
        markMessagesAsRead(selectedUser._id);
      }
    }
  }, [messages, selectedUser, markMessagesAsRead]);

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
                  {msg.senderId === authUser._id ? (
                    <div className="group relative">
                      {msg.image && (
                        <img src={msg.image} alt="shared" className="rounded-lg h-48 object-cover mb-2" />
                      )}
                      {msg.text && <p>{msg.text}</p>}
                      <button
                        onClick={() => deleteMessage(msg._id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        type="button"
                      >
                        <Trash2Icon className="w-3 h-3" />
                      </button>
                      <div className="flex items-center gap-1 mt-1">
                        <p className="text-xs opacity-75">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        {msg.isRead ? (
                          <CheckCheckIcon className="w-3.5 h-3.5 text-cyan-400" />
                        ) : (
                          <CheckIcon className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
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
