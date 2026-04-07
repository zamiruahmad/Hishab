import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Loader2, AlertCircle, Check } from 'lucide-react';
import { supabase } from './supabaseClient';

interface AuthViewProps {
  onSuccess: () => void;
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
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onSuccess();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        
        if (data.session) {
          onSuccess();
        } else {
          setMessage('Account created! Please check your email for the confirmation link.');
        }
      }
    } catch (err: any) {
      let errorMessage = err.message || 'An error occurred during authentication';
      if (errorMessage === 'Failed to fetch') {
        errorMessage = 'Failed to connect to Supabase. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correctly set in the Secrets panel and prefixed with VITE_.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-500 mt-2">
            {isLogin ? 'Sign in to access your account' : 'Sign up to get started'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-600">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-600">
            <Check size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm">{message}</p>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={20} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-600 font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
