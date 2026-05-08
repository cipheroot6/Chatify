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

  useEffect(() => {
    if (phase === PHASE.SUCCESS) {
      const timer = setTimeout(() => navigate("/login", { replace: true }), 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setPhase(PHASE.LOADING);
    setServerError("");

    try {
      await resetPassword(token, form.password);
      setPhase(PHASE.SUCCESS);
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
      <div className="w-full flex items-center justify-center p-4 bg-transparent min-h-[calc(100vh-100px)]">
        <div className="relative w-full max-w-md">
          <BorderAnimatedContainer>
            <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center bg-slate-800/50 backdrop-blur-xl rounded-2xl">
              <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <h2 className="text-2xl font-bold text-slate-200 mb-2">
                Invalid link
              </h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                This reset link is missing its token. Please request a new one.
              </p>
              <Link to="/forgot-password" className="auth-btn text-center w-full block">
                Request a new link
              </Link>
              <div className="w-full mt-4">
                <Link to="/login" className="flex items-center justify-center gap-2 text-slate-400 hover:text-cyan-400 text-sm transition-colors py-2">
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

  return (
    <div className="w-full flex items-center justify-center p-4 bg-transparent min-h-[calc(100vh-100px)]">
      <div className="relative w-full max-w-md">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col items-center justify-center p-10 bg-slate-800/50 backdrop-blur-xl rounded-2xl">

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
              <div className="w-full flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 52 52" fill="none" aria-hidden="true">
                    <circle cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M14 27 L22 35 L38 18"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <p className="text-slate-300 text-center">
                  Your password has been changed. Redirecting to login…
                </p>
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
                      className={`input pr-10 ${tooShort ? "border-rose-500 focus:ring-rose-500" : ""}`}
                      placeholder="Min. 6 characters"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => toggle("password")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                      tabIndex={-1}
                      aria-label={show.password ? "Hide password" : "Show password"}
                    >
                      {show.password
                        ? <EyeOffIcon className="w-4 h-4" />
                        : <EyeIcon    className="w-4 h-4" />}
                    </button>
                  </div>
                  {tooShort && (
                    <p className="text-rose-400 text-xs mt-1">Must be at least 6 characters.</p>
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
                      className={`input pr-10 ${mismatch ? "border-rose-500 focus:ring-rose-500" : ""}`}
                      placeholder="Repeat your password"
                    />
                    <button
                      type="button"
                      onClick={() => toggle("confirm")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                      tabIndex={-1}
                      aria-label={show.confirm ? "Hide password" : "Show password"}
                    >
                      {show.confirm
                        ? <EyeOffIcon className="w-4 h-4" />
                        : <EyeIcon    className="w-4 h-4" />}
                    </button>
                  </div>
                  {mismatch && (
                    <p className="text-rose-400 text-xs mt-1">Passwords don't match.</p>
                  )}
                </div>

                {/* Server error */}
                {serverError && (
                  <p className="text-rose-400 text-sm text-center">{serverError}</p>
                )}

                <button
                  type="submit"
                  className="auth-btn"
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
              <div className="mt-6 w-full text-center">
                <Link
                  to="/forgot-password"
                  className="flex items-center justify-center gap-2 text-slate-400 hover:text-cyan-400 text-sm transition-colors py-2"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
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
