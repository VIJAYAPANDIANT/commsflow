import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';

export const Register: React.FC = () => {
  const { setCurrentView, setTempEmail } = useNavigation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Validation / Loading states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    // Name Validation
    if (!name.trim()) {
      setNameError('Full name is required');
      isValid = false;
    } else {
      setNameError('');
    }

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

    // Agree Terms
    if (!agreeTerms) {
      setTermsError('You must agree to the Terms of Service');
      isValid = false;
    } else {
      setTermsError('');
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setTempEmail(email);
        setCurrentView('verify-email');
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

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 'weak': return 'Weak (Add numbers/caps)';
      case 'medium': return 'Medium (Good)';
      case 'strong': return 'Strong (Excellent)';
      default: return '';
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Get started with your free studio workspace">
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <User className="h-4 w-4" />
            </div>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError('');
              }}
              className={`w-full pl-10 pr-4 py-2.5 bg-white/5 border rounded-lg text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-1 focus:ring-violet-500 ${
                nameError ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
              }`}
            />
          </div>
          {nameError && <p className="text-[10px] text-red-400 mt-1">{nameError}</p>}
        </div>

        {/* Email Address */}
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

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Password</label>
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
          
          {/* Password Strength Indicator Bar */}
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
              <div className="flex justify-between items-center text-[9px] font-semibold">
                <span className="text-slate-500">Strength:</span>
                <span className={
                  passwordStrength === 'weak' ? 'text-red-400' :
                  passwordStrength === 'medium' ? 'text-yellow-400' : 'text-green-400'
                }>{getStrengthText()}</span>
              </div>
            </div>
          )}
          {passwordError && <p className="text-[10px] text-red-400 mt-1">{passwordError}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Confirm Password</label>
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

        {/* Terms agreement checkbox */}
        <div className="space-y-1.5 pt-1">
          <label className="flex items-start space-x-2 text-xs text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked);
                if (termsError) setTermsError('');
              }}
              className="rounded bg-white/5 border-white/10 text-violet-600 focus:ring-violet-500 h-3.5 w-3.5 mt-0.5"
            />
            <span className="leading-tight">
              I agree to the{' '}
              <a href="#" className="text-violet-400 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-violet-400 hover:underline">Privacy Policy</a>
            </span>
          </label>
          {termsError && <p className="text-[10px] text-red-400">{termsError}</p>}
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
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-400">
        Already have an account?{' '}
        <button
          onClick={() => setCurrentView('login')}
          className="font-semibold text-violet-400 hover:text-violet-300 cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </AuthLayout>
  );
};
