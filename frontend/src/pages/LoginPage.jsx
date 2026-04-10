import { useAuthStore } from "../store/useAuthStore";

function LoginPage({ myName }) {
  const { authUser, isloading, login } = useAuthStore();

  return <div> LoginPage </div>;
}

export default LoginPage;
