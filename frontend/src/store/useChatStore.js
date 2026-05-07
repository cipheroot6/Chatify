import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";
import pusher from "../lib/pusher.js";

export const useChatStore = create((set, get) => ({
  searchResult: null,
  searchError: null,
  chats: [],
  messages: [],
  onlineUsers: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) ?? true,

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newValue);
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  findUserByEmail: async (email) => {
    set({ isUsersLoading: true, searchResult: null, searchError: null });
    try {
      const res = await axiosInstance.post("/api/messages/find-user", { email });
      set({ searchResult: res.data });
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      set({ searchError: msg });
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/api/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/api/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    // Immediately update the UI with the optimistic message
    set((state) => ({ messages: [...state.messages, optimisticMessage] }));

    try {
      const res = await axiosInstance.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData,
      );

      // Replace the optimistic message with the confirmed server message
      set((state) => ({
        messages: state.messages
          .filter((m) => m._id !== tempId)
          .concat(res.data),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      // Remove the optimistic message on failure
      set((state) => ({
        messages: state.messages.filter((m) => m._id !== tempId),
      }));
    }
  },

  subscribeToMessages: (userId) => {
    const channelName = `private-user-${userId}`;
    const channel = pusher.subscribe(channelName);

    // Always unbind first to prevent duplicate handlers.
    // This is especially important in React StrictMode which
    // mounts/unmounts effects twice in development.
    channel.unbind("new-message");

    channel.unbind("new-chat-partner");

    channel.unbind("message-deleted");

    channel.unbind("messages-read");

    channel.bind("new-chat-partner", (partnerData) => {
      const { chats } = get();
      const alreadyExists = chats.some((chat) => chat._id === partnerData._id);
      if (!alreadyExists) {
        set((state) => ({ chats: [partnerData, ...state.chats] }));
      }
    });

    channel.bind("message-deleted", (data) => {
      set((state) => ({
        messages: state.messages.filter((m) => m._id !== data.messageId),
      }));
    });

    channel.bind("messages-read", (data) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.receiverId?.toString() === data.readBy?.toString()
            ? { ...msg, isRead: true }
            : msg
        ),
      }));
    });

    channel.bind("new-message", (message) => {
      const { selectedUser } = get();

      if (!selectedUser || selectedUser._id !== message.senderId) {
        if (message.sender?.fullName) {
          const preview = message.text
            ? message.text.substring(0, 30) + (message.text.length > 30 ? "..." : "")
            : "\uD83D\uDCF7 Image";
          toast.success(`${message.sender.fullName}: ${preview}`);
        }
        return;
      }

      set((state) => ({ messages: [...state.messages, message] }));
    });
  },

  deleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/api/messages/${messageId}`);
      set((state) => ({
        messages: state.messages.filter((m) => m._id !== messageId),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  },

  markMessagesAsRead: async (senderId) => {
    try {
      await axiosInstance.put(`/api/messages/read/${senderId}`);
    } catch (error) {
      // Silently fail - read receipts are non-critical
      console.log("Error marking messages as read:", error);
    }
  },

  unsubscribeFromMessages: (userId) => {
    const channelName = `private-user-${userId}`;
    const channel = pusher.channel(channelName);

    // Unbind the specific handler before unsubscribing
    if (channel) {
      channel.unbind("new-message");
      channel.unbind("new-chat-partner");
      channel.unbind("message-deleted");
      channel.unbind("messages-read");
    }

    pusher.unsubscribe(channelName);
  },
}));
