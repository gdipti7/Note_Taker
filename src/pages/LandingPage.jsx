import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl">
        <h1 className="text-6xl font-extrabold text-emerald-400 tracking-tight mb-4">
          Note Taker
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          Capture your ideas, organize your thoughts, and never lose track of
          what matters. Simple, fast, and always with you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-colors w-full sm:w-auto"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-transparent border border-slate-600 hover:border-emerald-400 text-slate-200 font-semibold px-8 py-3 rounded-xl transition-colors w-full sm:w-auto"
          >
            Register
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-emerald-400 font-semibold mb-1">Organize</h3>
            <p className="text-slate-400 text-sm">
              Sort notes by category — Work, Personal, Study, and Health.
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-emerald-400 font-semibold mb-1">Search</h3>
            <p className="text-slate-400 text-sm">
              Quickly find any note by searching through your titles.
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-emerald-400 font-semibold mb-1">Secure</h3>
            <p className="text-slate-400 text-sm">
              Your notes are private and protected behind your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}