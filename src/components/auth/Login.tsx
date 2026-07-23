import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';

export const Login: React.FC = () => {
  const { setCurrentView, setTempEmail } = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation / Loading states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    // Email Validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password Validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (validateForm()) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setIsLoading(false);
        // Direct simulation check
        if (email.toLowerCase() === 'admin@commsflow.ai' && password === 'password123') {
          setTempEmail(email);
          setCurrentView('dashboard');
        } else {
          // Allow any login for demo purposes, but notify user
          setTempEmail(email);
          setCurrentView('dashboard');
        }
      }, 1500);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTempEmail(`${provider.toLowerCase()}.user@commsflow.ai`);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentView('dashboard');
    }, 1200);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your studio workspace">
      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        {authError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              className={`w-full pl-10 pr-4 py-2.5 bg-white/5 border rounded-lg text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500 ${
                emailError ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
              }`}
            />
          </div>
          {emailError && <p className="text-[10px] text-red-400 mt-1">{emailError}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <button
              type="button"
              onClick={() => setCurrentView('forgot-password')}
              className="text-[11px] font-semibold text-violet-400 hover:text-violet-300 cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              className={`w-full pl-10 pr-4 py-2.5 bg-white/5 border rounded-lg text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500 ${
                passwordError ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
              }`}
            />
          </div>
          {passwordError && <p className="text-[10px] text-red-400 mt-1">{passwordError}</p>}
        </div>

        {/* Remember me */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center space-x-2 text-xs text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded bg-white/5 border-white/10 text-violet-600 focus:ring-violet-500 h-3.5 w-3.5"
            />
            <span>Remember for 30 days</span>
          </label>
        </div>

        {/* Action Button */}
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full py-2.5 font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 mt-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Signing In...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center justify-between my-6">
        <div className="w-[40%] h-px bg-white/5" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Or continue with</span>
        <div className="w-[40%] h-px bg-white/5" />
      </div>

      {/* Social Login Hub */}
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          aria-label="Google Login"
          onClick={() => handleSocialLogin('Google')}
          className="flex items-center justify-center p-2.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-colors text-slate-300 hover:text-white cursor-pointer"
        >
          <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2-3.518 0-6.388-2.87-6.388-6.388s2.87-6.388 6.388-6.388c1.678 0 3.197.648 4.354 1.716l3.055-3.055C19.345 2.585 15.997 1.5 12.24 1.5c-5.795 0-10.5 4.705-10.5 10.5s4.705 10.5 10.5 10.5c5.31 0 10.022-3.818 10.022-10.215 0-.69-.086-1.164-.23-1.5H12.24z"/>
          </svg>
        </button>
        <button
          type="button"
          aria-label="GitHub Login"
          onClick={() => handleSocialLogin('GitHub')}
          className="flex items-center justify-center p-2.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-colors text-slate-300 hover:text-white cursor-pointer"
        >
          <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
        </button>
        <button
          type="button"
          aria-label="Microsoft Login"
          onClick={() => handleSocialLogin('Microsoft')}
          className="flex items-center justify-center p-2.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-colors text-slate-300 hover:text-white cursor-pointer"
        >
          <svg className="h-4.5 w-4.5" viewBox="0 0 23 23">
            <path fill="#f35325" d="M0 0h11v11H0z"/>
            <path fill="#81bc06" d="M12 0h11v11H12z"/>
            <path fill="#05a6f0" d="M0 12h11v11H0z"/>
            <path fill="#ffba08" d="M12 12h11v11H12z"/>
          </svg>
        </button>
      </div>

      <div className="mt-8 text-center text-xs text-slate-400">
        Don't have an account?{' '}
        <button
          onClick={() => setCurrentView('register')}
          className="font-semibold text-violet-400 hover:text-violet-300 cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </AuthLayout>
  );
};
