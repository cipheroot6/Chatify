import { useAuthStore } from "../store/useAuthStore";

function ChatPage({ myName }) {
    const { authUser, isloading, login } = useAuthStore();
  return <div> chatify </div>;
}

export default ChatPage;
