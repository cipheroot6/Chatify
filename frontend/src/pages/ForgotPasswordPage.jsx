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
  IDLE:      "idle",
  LOADING:   "loading",
  SENT:      "sent",
};

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState("");
  const [phase, setPhase]   = useState(PHASE.IDLE);
  const { forgotPassword }  = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || phase === PHASE.LOADING) return;

    setPhase(PHASE.LOADING);
    try {
      await forgotPassword(email.trim().toLowerCase());
    } catch {
      // Always show the same message — never reveal whether email exists
    } finally {
      setPhase(PHASE.SENT);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-md fpp-card-height">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col p-8 justify-center">

            {/* ── Header ──────────────────────────────────────────── */}
            <div className="text-center mb-8">
              <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <h2 className="text-2xl font-bold text-slate-200 mb-2">
                Forgot your password?
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {phase === PHASE.SENT
                  ? "Check your inbox for next steps."
                  : "Enter your email and we'll send you a reset link."}
              </p>
            </div>

            {/* ── SENT state ──────────────────────────────────────── */}
            {phase === PHASE.SENT ? (
              <div className="fpp-sent-block">
                {/* Icon */}
                <div className="fpp-sent-icon-wrap">
                  <SendIcon className="fpp-sent-icon" />
                </div>

                {/* Copy */}
                <p className="fpp-sent-heading">Link sent (if registered)</p>
                <p className="fpp-sent-body">
                  If an account exists for{" "}
                  <span className="fpp-sent-email">{email}</span>, a reset link
                  is on its way. Check your spam folder if it doesn't arrive
                  within a minute.
                </p>

                {/* Try a different email */}
                <button
                  type="button"
                  className="auth-btn fpp-retry-btn"
                  onClick={() => {
                    setEmail("");
                    setPhase(PHASE.IDLE);
                  }}
                >
                  Try a different email
                </button>
              </div>
            ) : (
              /* ── IDLE / LOADING state ───────────────────────────── */
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  {phase === PHASE.LOADING ? (
                    <LoaderIcon className="w-full h-5 animate-spin text-center" />
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </form>
            )}

            {/* ── Footer link ─────────────────────────────────────── */}
            <div className="mt-6 text-center">
              <Link to="/login" className="auth-link inline-flex items-center gap-1.5">
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
