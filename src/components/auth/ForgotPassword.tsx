import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';

export const ForgotPassword: React.FC = () => {
  const { setCurrentView, setTempEmail, tempEmail } = useNavigation();
  const [email, setEmail] = useState(tempEmail || '');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validateForm = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSent(true);
        setTempEmail(email);
      }, 1500);
    }
  };

  return (
    <AuthLayout 
      title={isSent ? "Check your email" : "Reset Password"} 
      subtitle={isSent ? "We have sent recovery instructions" : "Enter your email to receive recovery instructions"}
    >
      {!isSent ? (
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* Email field */}
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

          {/* Action button */}
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full py-2.5 font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Sending Link...</span>
              </>
            ) : (
              <span>Send Reset Link</span>
            )}
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentView('login')}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center space-y-6 text-left">
          {/* Success Banner */}
          <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-slate-300 text-sm space-y-3">
            <div className="flex items-center space-x-2 text-violet-400 font-bold font-heading">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>Reset Email Sent</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              An email was dispatched to <strong className="text-white">{email}</strong> containing a secure reset link. Check your inbox and spam folders.
            </p>
          </div>

          <div className="space-y-3">
            {/* Demo Helper Button */}
            <Button
              type="button"
              variant="primary"
              onClick={() => setCurrentView('reset-password')}
              className="w-full py-2.5 font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2"
            >
              <span>Go to Reset Password (Demo)</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <button
              type="button"
              onClick={() => setIsSent(false)}
              className="w-full py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              Resend Reset Link
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentView('login')}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};
