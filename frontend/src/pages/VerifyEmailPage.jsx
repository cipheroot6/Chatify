import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { CheckCircle2Icon, XCircleIcon, LoaderIcon, ArrowLeftIcon, SearchXIcon } from "lucide-react";

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
  const calledRef               = useRef(false);

  useEffect(() => {
    if (phase === STATE.SUCCESS) {
      const timer = setTimeout(() => navigate("/inbox", { replace: true }), 2200);
      return () => clearTimeout(timer);
    }
  }, [phase, navigate]);

  useEffect(() => {
    if (!token || calledRef.current) return;
    calledRef.current = true;

    verifyEmail(token)
      .then(() => {
        setPhase(STATE.SUCCESS);
      })
      .catch((err) => {
        const msg = err?.response?.data?.message || "This verification link is invalid or has expired.";
        setErrorMsg(msg);
        setPhase(STATE.ERROR);
      });
  }, [token, verifyEmail]);

  return (
    <div className="w-full flex items-center justify-center p-4 bg-transparent min-h-[calc(100vh-100px)]">
      <div className="relative w-full max-w-md">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center bg-slate-800/50 backdrop-blur-xl rounded-2xl">

            {/* ── VERIFYING ─────────────────────────────────────────────── */}
            {phase === STATE.VERIFYING && (
              <>
                <LoaderIcon className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                <h2 className="text-2xl font-bold text-slate-200 mb-2">Verifying your email...</h2>
                <p className="text-slate-400 text-sm">Hang tight, this only takes a second.</p>
              </>
            )}

            {/* ── SUCCESS ───────────────────────────────────────────────── */}
            {phase === STATE.SUCCESS && (
              <>
                <CheckCircle2Icon className="w-16 h-16 text-emerald-400 mb-4" />
                <h2 className="text-2xl font-bold text-slate-200 mb-2">Email verified!</h2>
                <p className="text-slate-400 text-sm">Your account is ready. Taking you to your inbox...</p>
              </>
            )}

            {/* ── ERROR / NO_TOKEN ──────────────────────────────────────── */}
            {(phase === STATE.ERROR || phase === STATE.NO_TOKEN) && (
              <>
                {phase === STATE.NO_TOKEN ? (
                  <SearchXIcon className="w-16 h-16 text-rose-400 mb-4" />
                ) : (
                  <XCircleIcon className="w-16 h-16 text-rose-400 mb-4" />
                )}
                
                <h2 className="text-2xl font-bold text-slate-200 mb-2">
                  {phase === STATE.NO_TOKEN ? "No token found" : "Link expired"}
                </h2>
                
                <p className="text-slate-400 text-sm mb-8">
                  {phase === STATE.NO_TOKEN
                    ? "This URL is missing a verification token."
                    : errorMsg}
                </p>

                <div className="flex flex-col gap-3 w-full">
                  <Link to="/email-sent" className="auth-btn text-center w-full block">
                    Request a new link
                  </Link>
                  <div className="mt-2 w-full">
                    <Link to="/login" className="flex items-center justify-center gap-2 text-slate-400 hover:text-cyan-400 text-sm transition-colors py-2 w-full">
                      <ArrowLeftIcon className="w-4 h-4" />
                      Back to login
                    </Link>
                  </div>
                </div>
              </>
            )}

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
