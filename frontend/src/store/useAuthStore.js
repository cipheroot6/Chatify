import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import pusher from "../lib/pusher.js";

const PRESENCE_CHANNEL = "presence-online";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogingIn: false,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check");
      set({ authUser: res.data });
      pusher.signin();
      get().subscribeToPresence();
    } catch (error) {
      console.log("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  subscribeToPresence: () => {
    const existing = pusher.channel(PRESENCE_CHANNEL);
    if (existing) return; // already subscribed

    const channel = pusher.subscribe(PRESENCE_CHANNEL);

    channel.bind("pusher:subscription_succeeded", (members) => {
      const { authUser } = get();
      const ids = [];
      members.each((member) => {
        // Exclude self from the list
        if (member.id !== authUser?._id?.toString()) {
          ids.push(member.id);
        }
      });
      set({ onlineUsers: ids });
    });

    channel.bind("pusher:member_added", (member) => {
      set((state) => ({
        onlineUsers: [...state.onlineUsers, member.id],
      }));
    });

    channel.bind("pusher:member_removed", (member) => {
      set((state) => ({
        onlineUsers: state.onlineUsers.filter((id) => id !== member.id),
      }));
    });
  },

  unsubscribeFromPresence: () => {
    const channel = pusher.channel(PRESENCE_CHANNEL);
    if (channel) {
      channel.unbind_all();
      pusher.unsubscribe(PRESENCE_CHANNEL);
    }
    set({ onlineUsers: [] });
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      await axiosInstance.post("/api/auth/sign-up", data);
      toast.success("Account created. Please check your email.");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  verifyEmail: async (token) => {
    const res = await axiosInstance.get(`/api/auth/verify-email?token=${token}`);
    set({ authUser: res.data });
  },

  resendVerification: async (email) => {
    await axiosInstance.post("/api/auth/resend-verification", { email });
  },

  forgotPassword: async (email) => {
    await axiosInstance.post("/api/auth/forgot-password", { email });
  },

  resetPassword: async (token, password) => {
    await axiosInstance.post("/api/auth/reset-password", { token, password });
  },

  login: async (data) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", data);
      set({ authUser: res.data });
      pusher.signin();
      get().subscribeToPresence();
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isLogingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      get().unsubscribeFromPresence();
      set({ authUser: null });
      pusher.disconnect();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log("Error logging out:", error);
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/api/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
}));
