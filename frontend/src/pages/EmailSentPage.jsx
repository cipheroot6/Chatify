import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MailIcon, LoaderIcon, ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function EmailSentPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "your inbox";

  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const { resendVerification } = useAuthStore();

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setInterval(() => setResendCooldown((n) => n - 1), 1000);
    return () => clearInterval(id);
  }, [resendCooldown]);

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    try {
      await resendVerification(email);
      setResendCount((n) => n + 1);
      setResendCooldown(60);
      toast.success("Verification email sent!");
    } catch {
      toast.error("Failed to resend. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-transparent min-h-[calc(100vh-100px)]">
      <div className="relative w-full max-w-md">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col items-center justify-center p-10 bg-slate-800/50 backdrop-blur-xl rounded-2xl">
            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="text-center mb-8 w-full">
              <MailIcon className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
              <h2 className="text-2xl font-bold text-slate-200 mb-2">
                Check your inbox
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                We sent a verification link to
              </p>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/50">
                <span className="text-cyan-400 font-medium">{email}</span>
              </div>
              <p className="text-slate-500 text-xs mt-4">
                Click the link inside to activate your account. It expires in 24 hours.
              </p>
            </div>

            {/* ── RESEND SECTION ────────────────────────────────────── */}
            <div className="w-full mb-6">
              <button
                className="auth-btn w-full flex items-center justify-center gap-2"
                onClick={handleResend}
                disabled={resendCooldown > 0 || isResending}
              >
                {isResending ? (
                  <LoaderIcon className="h-5 w-5 animate-spin mx-auto" />
                ) : resendCooldown > 0 ? (
                  `Resend available in ${resendCooldown}s`
                ) : (
                  "Resend verification email"
                )}
              </button>

              {resendCount > 0 && (
                <p className="text-slate-400 text-xs text-center mt-3">
                  Email sent {resendCount > 1 ? `${resendCount} times` : "again"}.
                  Check your spam folder.
                </p>
              )}
            </div>

            {/* ── FOOTER LINKS ──────────────────────────────────────── */}
            <div className="mt-6 text-center w-full pt-4 border-t border-slate-700/50 flex flex-col gap-3">
              <Link to="/login" className="flex items-center justify-center gap-2 text-slate-400 hover:text-cyan-400 text-sm transition-colors w-full">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to login
              </Link>
              <Link to="/signup" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors mt-2">
                Wrong email? Sign up again
              </Link>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
