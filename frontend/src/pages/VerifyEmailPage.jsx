import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import "./VerifyEmailPage.css";

const STATE = {
  VERIFYING: "verifying",
  SUCCESS:   "success",
  ERROR:     "error",
  NO_TOKEN:  "no_token",
};

export default function VerifyEmailPage() {
  const [searchParams]   = useSearchParams();
  const navigate         = useNavigate();
  const { verifyEmail }  = useAuthStore();

  const token = searchParams.get("token");

  const [phase, setPhase]       = useState(token ? STATE.VERIFYING : STATE.NO_TOKEN);
  const [errorMsg, setErrorMsg] = useState("");
  const calledRef               = useRef(false); // guard against StrictMode double-fire

  useEffect(() => {
    if (!token || calledRef.current) return;
    calledRef.current = true;

    verifyEmail(token)
      .then(() => {
        setPhase(STATE.SUCCESS);
        // Give the user a moment to read the success state, then redirect
        setTimeout(() => navigate("/inbox", { replace: true }), 2200);
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message ||
          "This verification link is invalid or has expired.";
        setErrorMsg(msg);
        setPhase(STATE.ERROR);
      });
  }, [token, verifyEmail, navigate]);

  return (
    <div className="vep-root">
      <div className="vep-orb vep-orb--pink" />
      <div className="vep-orb vep-orb--cyan" />
      <div className="vep-grid" />

      <div className="vep-card">

        {/* ── VERIFYING ─────────────────────────────────────────────── */}
        {phase === STATE.VERIFYING && (
          <div className="vep-state vep-state--verifying" key="verifying">
            <div className="vep-spinner-wrap">
              <div className="vep-spinner-track" />
              <div className="vep-spinner-head" />
              {/* Lock icon in the centre */}
              <svg className="vep-spinner-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="vep-heading">Verifying your email…</h1>
            <p className="vep-sub">Hang tight, this only takes a second.</p>
          </div>
        )}

        {/* ── SUCCESS ───────────────────────────────────────────────── */}
        {phase === STATE.SUCCESS && (
          <div className="vep-state vep-state--success" key="success">
            <div className="vep-icon-wrap vep-icon-wrap--success">
              <svg className="vep-checkmark" viewBox="0 0 52 52" fill="none" aria-hidden="true">
                <circle cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="2" />
                <path
                  className="vep-check-path"
                  d="M14 27 L22 35 L38 18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <h1 className="vep-heading">Email verified!</h1>
            <p className="vep-sub">
              Your account is ready. Taking you to your inbox…
            </p>
            <div className="vep-progress-bar">
              <div className="vep-progress-fill" />
            </div>
          </div>
        )}

        {/* ── ERROR ─────────────────────────────────────────────────── */}
        {(phase === STATE.ERROR || phase === STATE.NO_TOKEN) && (
          <div className="vep-state vep-state--error" key="error">
            <div className="vep-icon-wrap vep-icon-wrap--error">
              <svg className="vep-x-icon" viewBox="0 0 52 52" fill="none" aria-hidden="true">
                <circle cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M18 18 L34 34 M34 18 L18 34"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1 className="vep-heading">
              {phase === STATE.NO_TOKEN ? "No token found" : "Link expired"}
            </h1>

            <p className="vep-sub vep-sub--error">
              {phase === STATE.NO_TOKEN
                ? "This URL is missing a verification token."
                : errorMsg}
            </p>

            <div className="vep-actions">
              <Link to="/email-sent" className="vep-btn vep-btn--primary">
                Request a new link
              </Link>
              <Link to="/login" className="vep-btn vep-btn--ghost">
                Back to login
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
