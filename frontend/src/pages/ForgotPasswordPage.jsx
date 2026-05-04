import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  MailIcon,
  LoaderIcon,
  ArrowLeftIcon,
  SendIcon,
} from "lucide-react";

const PHASE = {
  IDLE:    "idle",
  LOADING: "loading",
  SENT:    "sent",
};

export default function ForgotPasswordPage() {
  const [email, setEmail]  = useState("");
  const [phase, setPhase]  = useState(PHASE.IDLE);
  const { forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || phase === PHASE.LOADING) return;

    setPhase(PHASE.LOADING);
    try {
      await forgotPassword(email.trim().toLowerCase());
    } catch {
      // Always show sent — never reveal whether the email exists
    } finally {
      setPhase(PHASE.SENT);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-transparent min-h-[calc(100vh-100px)]">
      <div className="relative w-full max-w-md">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col items-center justify-center p-10 bg-slate-800/50 backdrop-blur-xl rounded-2xl">

            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="text-center mb-8 w-full">
              <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <h2 className="text-2xl font-bold text-slate-200 mb-2">
                {phase === PHASE.SENT
                  ? "Check your inbox"
                  : "Forgot your password?"}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {phase === PHASE.SENT
                  ? "A reset link is on its way if that address is registered."
                  : "Enter your email and we'll send you a reset link."}
              </p>
            </div>

            {/* ── SENT state ─────────────────────────────────────────── */}
            {phase === PHASE.SENT ? (
              <div className="w-full flex flex-col items-center">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6">
                  <SendIcon className="w-8 h-8 text-cyan-400" />
                </div>

                <p className="text-slate-300 text-center mb-8 leading-relaxed">
                  If an account exists for{" "}
                  <span className="text-cyan-400 font-medium">{email}</span>, you'll
                  receive a link shortly. Check your spam folder if needed.
                </p>

                <button
                  type="button"
                  className="auth-btn"
                  onClick={() => { setEmail(""); setPhase(PHASE.IDLE); }}
                >
                  Try a different email
                </button>
              </div>
            ) : (
              /* ── IDLE / LOADING ──────────────────────────────────────── */
              <form onSubmit={handleSubmit} className="space-y-5 w-full">
                <div>
                  <label className="auth-input-label">Email address</label>
                  <div className="relative">
                    <MailIcon className="auth-input-icon" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                      placeholder="johndoe@gmail.com"
                      autoFocus
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="auth-btn"
                  disabled={phase === PHASE.LOADING || !email.trim()}
                >
                  {phase === PHASE.LOADING
                    ? <LoaderIcon className="h-5 w-5 animate-spin mx-auto" />
                    : "Send reset link"}
                </button>
              </form>
            )}

            {/* ── Back link ──────────────────────────────────────────── */}
            <div className="mt-6 w-full text-center">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-slate-400 hover:text-cyan-400 text-sm transition-colors py-2"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back to login
              </Link>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
