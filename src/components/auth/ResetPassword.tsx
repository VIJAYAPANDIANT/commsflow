import React, { useState, useEffect } from 'react';
import { Lock, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';

export const ResetPassword: React.FC = () => {
  const { setCurrentView } = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Validation / Loading states
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState<'none' | 'weak' | 'medium' | 'strong'>('none');

  useEffect(() => {
    if (!password) {
      setPasswordStrength('none');
      return;
    }

    let points = 0;
    if (password.length >= 8) points++;
    if (/[A-Z]/.test(password)) points++;
    if (/[0-9]/.test(password)) points++;
    if (/[^A-Za-z0-9]/.test(password)) points++;

    if (points <= 1) {
      setPasswordStrength('weak');
    } else if (points === 2 || points === 3) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  }, [password]);

  const validateForm = () => {
    let isValid = true;

    // Password Validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Confirm Password
    if (!confirmPassword) {
      setConfirmError('Please confirm your password');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-white/10';
    }
  };

  return (
    <AuthLayout 
      title={isSuccess ? "Password Reset" : "Choose new password"} 
      subtitle={isSuccess ? "Reset successful" : "Please enter your new secure password"}
    >
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* New Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                placeholder="Min. 8 characters"
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
            
            {/* Strength indicator */}
            {passwordStrength !== 'none' && (
              <div className="space-y-1 mt-2">
                <div className="flex h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{
                      width: 
                        passwordStrength === 'weak' ? '33.33%' : 
                        passwordStrength === 'medium' ? '66.66%' : '100%'
                    }}
                  />
                </div>
              </div>
            )}
            {passwordError && <p className="text-[10px] text-red-400 mt-1">{passwordError}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmError) setConfirmError('');
                }}
                className={`w-full pl-10 pr-4 py-2.5 bg-white/5 border rounded-lg text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500 ${
                  confirmError ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
                }`}
              />
            </div>
            {confirmError && <p className="text-[10px] text-red-400 mt-1">{confirmError}</p>}
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
                <span>Resetting...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </Button>
        </form>
      ) : (
        <div className="text-center space-y-6">
          {/* Success Banner */}
          <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-slate-300 text-sm space-y-2">
            <div className="flex items-center space-x-2 text-violet-400 font-bold font-heading">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>Password Changed</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 text-left">
              Your password has been successfully modified. You can now use your new password to sign into your CommsFlow Studio workspace.
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            onClick={() => setCurrentView('login')}
            className="w-full py-2.5 font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2"
          >
            <span>Proceed to Sign In</span>
          </Button>
        </div>
      )}
    </AuthLayout>
  );
};
