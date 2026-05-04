import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  LoaderIcon,
  ArrowLeftIcon,
} from "lucide-react";
import "./ResetPasswordPage.css";

const PHASE = {
  IDLE:    "idle",
  LOADING: "loading",
  SUCCESS: "success",
};

export default function ResetPasswordPage() {
  const [searchParams]   = useSearchParams();
  const navigate         = useNavigate();
  const { resetPassword } = useAuthStore();

  const token = searchParams.get("token");

  const [form, setForm] = useState({ password: "", confirm: "" });
  const [show, setShow] = useState({ password: false, confirm: false });
  const [phase, setPhase]   = useState(token ? PHASE.IDLE : "no_token");
  const [serverError, setServerError] = useState("");

  // ── Client-side validation ──────────────────────────────────────────────
  const tooShort   = form.password.length > 0 && form.password.length < 6;
  const mismatch   = form.confirm.length > 0 && form.confirm !== form.password;
  const canSubmit  =
    form.password.length >= 6 &&
    form.confirm === form.password &&
    phase === PHASE.IDLE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setPhase(PHASE.LOADING);
    setServerError("");

    try {
      await resetPassword(token, form.password);
      setPhase(PHASE.SUCCESS);
      setTimeout(() => navigate("/login", { replace: true }), 2500);
    } catch (err) {
      setServerError(
        err?.response?.data?.message ||
        "Something went wrong. Please request a new reset link."
      );
      setPhase(PHASE.IDLE);
    }
  };

  const toggle = (field) =>
    setShow((s) => ({ ...s, [field]: !s[field] }));

  // ── No token in URL ─────────────────────────────────────────────────────
  if (phase === "no_token") {
    return (
      <div className="w-full flex items-center justify-center p-4 bg-slate-900">
        <div className="relative w-full max-w-md h-[400px]">
          <BorderAnimatedContainer>
            <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center">
              <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <h2 className="text-2xl font-bold text-slate-200 mb-2">
                Invalid link
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                This reset link is missing its token. Please request a new one.
              </p>
              <Link to="/forgot-password" className="fpp-btn rpp-btn-full">
                Request a new link
              </Link>
              <div className="mt-4">
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

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-md h-[560px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col items-center justify-center p-10">

            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="text-center mb-8 w-full">
              <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <h2 className="text-2xl font-bold text-slate-200 mb-2">
                {phase === PHASE.SUCCESS ? "Password updated!" : "Set new password"}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {phase === PHASE.SUCCESS
                  ? "Taking you to login…"
                  : "Choose a strong password — at least 6 characters."}
              </p>
            </div>

            {/* ── SUCCESS ────────────────────────────────────────────── */}
            {phase === PHASE.SUCCESS ? (
              <div className="rpp-success-block">
                <div className="rpp-success-icon-wrap">
                  <svg className="rpp-checkmark" viewBox="0 0 52 52" fill="none" aria-hidden="true">
                    <circle cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="2" />
                    <path
                      className="rpp-check-path"
                      d="M14 27 L22 35 L38 18"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <p className="rpp-success-body">
                  Your password has been changed. Redirecting to login…
                </p>
                <div className="rpp-progress-bar">
                  <div className="rpp-progress-fill" />
                </div>
              </div>
            ) : (
              /* ── FORM ──────────────────────────────────────────────── */
              <form onSubmit={handleSubmit} className="space-y-5 w-full" noValidate>

                {/* New password */}
                <div>
                  <label className="auth-input-label">New password</label>
                  <div className="relative">
                    <LockIcon className="auth-input-icon" />
                    <input
                      type={show.password ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                      className={`input pr-10 ${tooShort ? "rpp-input-error" : ""}`}
                      placeholder="Min. 6 characters"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => toggle("password")}
                      className="rpp-eye-btn"
                      tabIndex={-1}
                      aria-label={show.password ? "Hide password" : "Show password"}
                    >
                      {show.password
                        ? <EyeOffIcon className="w-4 h-4" />
                        : <EyeIcon    className="w-4 h-4" />}
                    </button>
                  </div>
                  {tooShort && (
                    <p className="rpp-field-error">Must be at least 6 characters.</p>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label className="auth-input-label">Confirm password</label>
                  <div className="relative">
                    <LockIcon className="auth-input-icon" />
                    <input
                      type={show.confirm ? "text" : "password"}
                      value={form.confirm}
                      onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
                      className={`input pr-10 ${mismatch ? "rpp-input-error" : ""}`}
                      placeholder="Repeat your password"
                    />
                    <button
                      type="button"
                      onClick={() => toggle("confirm")}
                      className="rpp-eye-btn"
                      tabIndex={-1}
                      aria-label={show.confirm ? "Hide password" : "Show password"}
                    >
                      {show.confirm
                        ? <EyeOffIcon className="w-4 h-4" />
                        : <EyeIcon    className="w-4 h-4" />}
                    </button>
                  </div>
                  {mismatch && (
                    <p className="rpp-field-error">Passwords don't match.</p>
                  )}
                </div>

                {/* Server error */}
                {serverError && (
                  <p className="rpp-server-error">{serverError}</p>
                )}

                <button
                  type="submit"
                  className="fpp-btn rpp-btn-full"
                  disabled={!canSubmit || phase === PHASE.LOADING}
                >
                  {phase === PHASE.LOADING
                    ? <LoaderIcon className="h-5 w-5 animate-spin mx-auto" />
                    : "Reset password"}
                </button>
              </form>
            )}

            {/* ── Back link ──────────────────────────────────────────── */}
            {phase !== PHASE.SUCCESS && (
              <div className="mt-6 text-center">
                <Link
                  to="/forgot-password"
                  className="auth-link inline-flex items-center gap-1.5"
                >
                  <ArrowLeftIcon className="w-3.5 h-3.5" />
                  Request a new link
                </Link>
              </div>
            )}

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
