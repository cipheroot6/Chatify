import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import "./EmailSentPage.css";

export default function EmailSentPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "your inbox";

  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const { resendVerification } = useAuthStore();

  // Tick down the cooldown timer
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
    <div className="esp-root">
      {/* Ambient orbs — matches app's pink/cyan decorators */}
      <div className="esp-orb esp-orb--pink" />
      <div className="esp-orb esp-orb--cyan" />

      {/* Grid overlay — matches app's grid background */}
      <div className="esp-grid" />

      <div className="esp-card-wrap">
        {/* Animated border card — mirrors BorderAnimatedContainer */}
        <div className="esp-card">

          {/* ── ICON AREA ─────────────────────────────────────────── */}
          <div className="esp-icon-ring">
            <div className="esp-icon-pulse" />
            <div className="esp-icon-inner">
              {/* Envelope SVG */}
              <svg
                className="esp-envelope"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Envelope body */}
                <rect
                  x="4" y="12" width="40" height="28"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Envelope flap (V chevron) */}
                <path
                  d="M4 16 L24 30 L44 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* Animated dot — "new mail" indicator */}
                <circle
                  className="esp-dot"
                  cx="38" cy="14" r="6"
                  fill="#22d3ee"
                />
              </svg>
            </div>
          </div>

          {/* ── COPY ──────────────────────────────────────────────── */}
          <div className="esp-copy">
            <h1 className="esp-heading">Check your inbox</h1>

            <p className="esp-subtext">
              We sent a verification link to
            </p>
            <div className="esp-email-pill">
              <span className="esp-email-at">@</span>
              <span className="esp-email-text">{email}</span>
            </div>
            <p className="esp-subtext esp-subtext--small">
              Click the link inside to activate your account.
              It expires in&nbsp;<strong>24 hours</strong>.
            </p>
          </div>

          {/* ── DIVIDER ───────────────────────────────────────────── */}
          <div className="esp-divider" />

          {/* ── RESEND SECTION ────────────────────────────────────── */}
          <div className="esp-resend-block">
            <p className="esp-resend-label">Didn't get it?</p>

            <button
              className="esp-resend-btn"
              onClick={handleResend}
              disabled={resendCooldown > 0 || isResending}
            >
              {isResending ? (
                <span className="esp-spinner" />
              ) : resendCooldown > 0 ? (
                <>
                  <span className="esp-countdown">{resendCooldown}s</span>
                  Resend available in&nbsp;{resendCooldown}s
                </>
              ) : (
                "Resend verification email"
              )}
            </button>

            {resendCount > 0 && (
              <p className="esp-resend-note">
                Email sent {resendCount > 1 ? `${resendCount} times` : "again"}.
                Check your spam folder if it's not showing up.
              </p>
            )}
          </div>

          {/* ── CHECKLIST ─────────────────────────────────────────── */}
          <div className="esp-tips">
            <p className="esp-tips-title">No email yet? Try these:</p>
            <ul className="esp-tips-list">
              {[
                "Check your spam or junk folder",
                "Make sure you used the correct email",
                "Wait a minute — delivery can take a moment",
                "Add us to your contacts to avoid spam filters",
              ].map((tip) => (
                <li key={tip} className="esp-tip-item">
                  <span className="esp-tip-dot" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* ── FOOTER LINKS ──────────────────────────────────────── */}
          <div className="esp-footer">
            <Link to="/login" className="esp-footer-link">
              ← Back to login
            </Link>
            <span className="esp-footer-sep" />
            <Link to="/signup" className="esp-footer-link">
              Wrong email? Sign up again
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
