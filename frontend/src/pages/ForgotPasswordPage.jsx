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
import "./ForgotPasswordPage.css";

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
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      {/*
        Explicit height mirrors LoginPage exactly so BorderAnimatedContainer
        has a real height to fill and the conic border renders correctly.
      */}
      <div className="relative w-full max-w-md h-[500px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col items-center justify-center p-10">

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
              <div className="fpp-sent-block w-full">
                <div className="fpp-sent-icon-wrap">
                  <SendIcon className="fpp-sent-icon" />
                </div>

                <p className="fpp-sent-body">
                  If an account exists for{" "}
                  <span className="fpp-sent-email">{email}</span>, you'll
                  receive a link shortly. Check your spam folder if needed.
                </p>

                <button
                  type="button"
                  className="fpp-btn w-full"
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
                  className="fpp-btn w-full"
                  disabled={phase === PHASE.LOADING || !email.trim()}
                >
                  {phase === PHASE.LOADING
                    ? <LoaderIcon className="h-5 w-5 animate-spin mx-auto" />
                    : "Send reset link"}
                </button>
              </form>
            )}

            {/* ── Back link ──────────────────────────────────────────── */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="auth-link inline-flex items-center gap-1.5"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5" />
                Back to login
              </Link>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
