import Pusher from "pusher-js";
import { axiosInstance } from "./axios.js"; // <-- Make sure this path is correct for your file structure!

const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,

  // 1. Override Channel Auth to use Axios
  channelAuthorization: {
    customHandler: async (params, callback) => {
      try {
        const { data } = await axiosInstance.post("/api/auth/pusher/auth", {
          socket_id: params.socketId,
          channel_name: params.channelName,
        });
        callback(null, data);
      } catch (error) {
        console.error("Pusher Channel Auth Failed", error);
        callback(error, null);
      }
    },
  },

  // 2. Override User Auth to use Axios
  userAuthentication: {
    customHandler: async (params, callback) => {
      try {
        const { data } = await axiosInstance.post(
          "/api/auth/pusher/user-auth",
          {
            socket_id: params.socketId,
          },
        );
        callback(null, data);
      } catch (error) {
        console.error("Pusher User Auth Failed", error);
        callback(error, null);
      }
    },
  },
});

export default pusher;
