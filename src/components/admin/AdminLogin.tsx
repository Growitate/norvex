import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";

export function AdminLogin() {
  const { login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsSubmitting(true);
    setError(false);

    setTimeout(() => {
      const success = login(password);
      if (!success) {
        setError(true);
        setIsSubmitting(false);
      }
    }, 350);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between selection:bg-white selection:text-black font-sans relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900/60 via-black to-black pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-zinc-900/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="relative z-10 w-full border-b border-zinc-800/80 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display tracking-widest text-lg font-bold uppercase text-white">
            NORVA
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-zinc-700 bg-zinc-900/80 text-zinc-300">
            INTERNAL PORTAL
          </span>
        </div>
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>ENCRYPTED SECURE ACCESS</span>
        </div>
      </header>

      {/* Login Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-md bg-zinc-950/90 border border-zinc-800 p-8 sm:p-10 shadow-2xl backdrop-blur-md relative"
        >
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white" />

          {/* Heading */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-none bg-zinc-900 border border-zinc-800 mb-4 text-white">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="font-display text-2xl uppercase tracking-wider font-bold text-white">
              Restricted Portal
            </h1>
            <p className="text-xs font-mono text-zinc-400 mt-2 uppercase tracking-wide">
              AUTHENTICATE TO ACCESS CATALOG & ORDERS
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2 flex items-center justify-between">
                <span>Master Password</span>
                <span className="text-[10px] text-zinc-500 font-sans">
                  Single Security Passcode
                </span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Enter administrator password..."
                  autoFocus
                  required
                  className={`w-full bg-zinc-900 border ${
                    error
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-800 focus:border-white"
                  } pl-10 pr-11 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors font-mono`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs font-mono text-red-400 flex items-center gap-1.5"
                >
                  <span>✕</span> Access Denied. Invalid master password.
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !password.trim()}
              className="w-full bg-white text-black hover:bg-zinc-200 py-3.5 font-display text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>UNLOCK ADMIN CONSOLE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Helper Note for Developer/Tester */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-900/60 border border-zinc-800/80 text-[10px] font-mono text-zinc-400">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>
                DEFAULT PASSCODE: <strong className="text-zinc-200">norva@admin2026</strong>
              </span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 w-full border-t border-zinc-900 px-6 py-4 text-center text-[10px] font-mono text-zinc-600">
        NORVA STORE VAULT SYSTEM • CONFIDENTIAL & AUTHORIZED PERSONNEL ONLY
      </footer>
    </div>
  );
}
