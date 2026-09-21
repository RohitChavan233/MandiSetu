import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/mockData';
import { Role } from '../types';
import {
  ShieldCheck,
  Key,
  Phone,
  Mail,
  Lock,
  Volume2,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { user, setUser, t, setCurrentView } = useApp();
  const [tab, setTab] = useState<'farmer' | 'buyer' | 'officer'>('farmer');

  // Step 1: Input mobile/email, Step 2: Input OTP
  const [authStep, setAuthStep] = useState<'credentials' | 'otp'>('credentials');
  const [mobileNum, setMobileNum] = useState<string>('9822451080');
  const [password, setPassword] = useState<string>('GovtSecure#2026');
  const [enteredOtp, setEnteredOtp] = useState<string>('');

  // Security constraints (§8.3)
  const [otpTimer, setOtpTimer] = useState<number>(300); // 5 minutes
  const [resendCooldown, setResendCooldown] = useState<number>(30); // 30s resend
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (authStep === 'otp') {
      interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [authStep]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStep('otp');
    setOtpTimer(300);
    setResendCooldown(30);
    setAttemptsLeft(3);
    setErrorMessage(null);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Test OTP is 123456 or match
    if (enteredOtp === '123456' || enteredOtp.length === 6) {
      // Login successful!
      if (tab === 'farmer') {
        setUser(DEMO_USERS.farmer);
        setCurrentView('prices');
      } else if (tab === 'buyer') {
        setUser(DEMO_USERS.buyer);
        setCurrentView('offers');
      } else {
        setUser(DEMO_USERS.officer);
        setCurrentView('officer_kyc');
      }
      onClose();
    } else {
      const nextAttempts = attemptsLeft - 1;
      setAttemptsLeft(nextAttempts);
      if (nextAttempts <= 0) {
        setErrorMessage('अति-प्रयत्नांमुळे खाते १५ मिनिटांसाठी तात्पुरते कुलूपबंद केले आहे.');
      } else {
        // Non-revealing error message (§8.3)
        setErrorMessage(`प्रविष्ट केलेला ६-अंकी OTP अवैध आहे. शिल्लक प्रयत्न: ${nextAttempts}`);
      }
    }
  };

  const playVoiceOtp = () => {
    if ('speechSynthesis' in window) {
      const text = 'तुमचा मंडी सेतू पडताळणी कोड १ २ ३ ४ ५ ६ असा आहे.';
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'mr-IN';
      window.speechSynthesis.speak(utter);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: 480, padding: '24px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={20} color="var(--olive)" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--charcoal)' }}>
                {t.signIn}
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>
              MandiSetu सुरक्षित शासकीय प्रवेश प्रणाली (Server-side Session)
            </p>
          </div>

          <button onClick={onClose} className="btn-secondary" style={{ padding: '4px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Role Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--band)', padding: '4px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
          <button
            onClick={() => {
              setTab('farmer');
              setMobileNum('9822451080');
              setAuthStep('credentials');
            }}
            style={{
              flex: 1,
              padding: '6px 8px',
              fontSize: '0.82rem',
              fontWeight: tab === 'farmer' ? 700 : 500,
              background: tab === 'farmer' ? '#FFF' : 'transparent',
              borderRadius: 'var(--radius-sm)',
              boxShadow: tab === 'farmer' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            👨‍🌾 शेतकरी / FPO
          </button>

          <button
            onClick={() => {
              setTab('buyer');
              setMobileNum('9820011234');
              setAuthStep('credentials');
            }}
            style={{
              flex: 1,
              padding: '6px 8px',
              fontSize: '0.82rem',
              fontWeight: tab === 'buyer' ? 700 : 500,
              background: tab === 'buyer' ? '#FFF' : 'transparent',
              borderRadius: 'var(--radius-sm)',
              boxShadow: tab === 'buyer' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            🏭 खरेदीदार
          </button>

          <button
            onClick={() => {
              setTab('officer');
              setMobileNum('022-22874100');
              setAuthStep('credentials');
            }}
            style={{
              flex: 1,
              padding: '6px 8px',
              fontSize: '0.82rem',
              fontWeight: tab === 'officer' ? 700 : 500,
              background: tab === 'officer' ? '#FFF' : 'transparent',
              borderRadius: 'var(--radius-sm)',
              boxShadow: tab === 'officer' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            🏛️ अधिकारी (/admin)
          </button>
        </div>

        {errorMessage && (
          <div
            style={{
              background: 'var(--rose-bg)',
              border: '1px solid var(--rose)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              marginBottom: '14px',
              fontSize: '0.82rem',
              color: 'var(--rose)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <AlertCircle size={15} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Credentials Form */}
        {authStep === 'credentials' ? (
          <form onSubmit={handleSendOtp}>
            <div style={{ marginBottom: '14px' }}>
              <label className="gov-label">
                {tab === 'buyer' ? 'ईमेल किंवा मोबाईल क्रमांक:' : 'नोंदणीकृत मोबाईल क्रमांक:'}
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={15} color="var(--charcoal-soft)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="gov-input"
                  style={{ paddingLeft: 32 }}
                  value={mobileNum}
                  onChange={(e) => setMobileNum(e.target.value)}
                  placeholder="१० अंकी मोबाईल क्रमांक"
                  required
                />
              </div>
            </div>

            {(tab === 'buyer' || tab === 'officer') && (
              <div style={{ marginBottom: '14px' }}>
                <label className="gov-label">पासवर्ड (Password):</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="var(--charcoal-soft)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="password"
                    className="gov-input"
                    style={{ paddingLeft: 32 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '10px' }}>
              <span>६-अंकी सुरक्षा OTP पाठवा (Send OTP)</span>
            </button>

            <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.78rem', color: 'var(--charcoal-soft)' }}>
              डेमो चाचणीसाठी फिक्स OTP: <strong>123456</strong>
            </div>
          </form>
        ) : (
          /* OTP Verification Form */
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="gov-label">मोबाईलवर प्राप्त ६-अंकी OTP टाका:</label>
                <span style={{ fontSize: '0.78rem', color: otpTimer > 30 ? 'var(--olive)' : 'var(--rose)', fontWeight: 600 }}>
                  मुदत: {formatTime(otpTimer)}
                </span>
              </div>

              <input
                type="text"
                maxLength={6}
                className="gov-input tabular-nums"
                style={{ fontSize: '1.4rem', letterSpacing: '0.3em', textAlign: 'center', fontWeight: 700 }}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="123456"
                autoFocus
                required
              />
            </div>

            {/* Voice OTP Readout Mock Button (§8.3) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <button
                type="button"
                onClick={playVoiceOtp}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '4px 8px' }}
              >
                <Volume2 size={13} />
                <span>फोन कॉलद्वारे OTP ऐका</span>
              </button>

              <button
                type="button"
                disabled={resendCooldown > 0}
                onClick={() => setResendCooldown(30)}
                style={{ fontSize: '0.75rem', color: resendCooldown > 0 ? 'var(--charcoal-soft)' : 'var(--olive)', fontWeight: 600 }}
              >
                {resendCooldown > 0 ? `पुन्हा पाठवा (${resendCooldown}s)` : 'OTP पुन्हा पाठवा'}
              </button>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '10px' }}>
              <span>सत्यापित करा व प्रवेश करा (Verify &amp; Sign In)</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
