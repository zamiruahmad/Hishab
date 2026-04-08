import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Loader2, AlertCircle, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { supabase } from './supabaseClient';

interface AuthViewProps {
  onSuccess: (isNewUser: boolean, session?: any) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onSuccess(false, data.session);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        if (data.session) {
          onSuccess(true, data.session);
        } else {
          setMessage('Account created! Please check your email for the confirmation link.');
        }
      }
    } catch (err: any) {
      let errorMessage = err.message || 'An error occurred during authentication';
      if (errorMessage === 'Failed to fetch') {
        errorMessage = 'Failed to connect to Supabase. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correctly set in the Secrets panel and prefixed with VITE_.';
      } else if (errorMessage.toLowerCase().includes('email not confirmed')) {
        errorMessage = 'Please check your email and click the confirmation link before signing in.';
      } else if (errorMessage.toLowerCase().includes('invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please try again.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo / Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30 rotate-3">
              <ShieldCheck size={40} className="text-white -rotate-3" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md animate-bounce" style={{ animationDuration: '3s' }}>
              <Sparkles size={16} className="text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-slate-500">
              {isLogin ? 'Enter your details to access your account' : 'Start managing your finances today'}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-600">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </motion.div>
            )}

            {message && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 text-emerald-600">
                  <Check size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:scale-100 active:scale-[0.98] mt-2 shadow-lg shadow-slate-900/20"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm font-medium">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
              >
                {isLogin ? 'Sign up now' : 'Sign in instead'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

