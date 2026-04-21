import { Link } from "react-router";
import { MessageCircleIcon } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-900">
      <div className="relative w-full max-w-md">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <MessageCircleIcon className="w-16 h-16 text-slate-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-slate-400">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-slate-200">
              Page Not Found
            </h2>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">
              Looks like this conversation doesn't exist. The page you're looking for has gone offline.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors text-sm font-medium"
          >
            <MessageCircleIcon className="w-4 h-4" />
            Back to Chats
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
