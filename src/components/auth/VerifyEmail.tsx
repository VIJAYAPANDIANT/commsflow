import React, { useState, useEffect, useRef } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { AuthLayout } from './AuthLayout';
import { Button } from '../ui/Button';

export const VerifyEmail: React.FC = () => {
  const { setCurrentView, tempEmail } = useNavigation();
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Timer state for resend code
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (val: string, index: number) => {
    const numericVal = val.replace(/[^0-9]/g, '');
    if (!numericVal) {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      return;
    }

    const singleDigit = numericVal.slice(-1);
    const newCode = [...code];
    newCode[index] = singleDigit;
    setCode(newCode);

    // Auto-focus next input
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      // If active index is empty, clear previous index and focus it
      if (code[index] === '') {
        if (index > 0) {
          const newCode = [...code];
          newCode[index - 1] = '';
          setCode(newCode);
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    
    if (pastedData.length > 0) {
      const newCode = [...code];
      for (let i = 0; i < pastedData.length; i++) {
        newCode[i] = pastedData[i];
      }
      setCode(newCode);
      
      // Focus on last pasted input or last overall input
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimeLeft(30);
      setCanResend(false);
      setCode(Array(6).fill(''));
      setErrorMsg('');
      // Simulate code resent trigger
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setErrorMsg('Please enter the full 6-digit code');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Allow any 6 digit code for demo verification
      setCurrentView('dashboard');
    }, 1500);
  };

  return (
    <AuthLayout title="Verify your email" subtitle="Enter the 6-digit code sent to your email">
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="text-center space-y-2">
          <p className="text-xs text-slate-400">
            We sent a verification code to <br />
            <strong className="text-slate-200">{tempEmail || 'your-email@company.com'}</strong>
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
            {errorMsg}
          </div>
        )}

        {/* 6 OTP boxes row */}
        <div className="flex justify-between gap-2 max-w-sm mx-auto">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el; }}
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-lg font-bold bg-white/5 border border-white/10 rounded-lg text-white transition-all focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 select-all"
            />
          ))}
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
              <span>Verifying...</span>
            </>
          ) : (
            <span>Verify & Proceed</span>
          )}
        </Button>

        {/* Resend timer */}
        <div className="text-center text-xs">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="inline-flex items-center space-x-1.5 font-semibold text-violet-400 hover:text-violet-300 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Resend verification code</span>
            </button>
          ) : (
            <span className="text-slate-500">
              Resend verification code in <strong className="text-slate-400 font-mono">{timeLeft}s</strong>
            </span>
          )}
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className="text-xs font-semibold text-slate-500 hover:text-white transition-colors cursor-pointer"
          >
            Back to Sign In
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};
