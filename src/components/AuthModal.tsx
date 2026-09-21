import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { DEMO_USERS } from '../data/mockData';
import { Role } from '../types';
import {
  X,
  Phone,
  Volume2,
  AlertCircle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

// ── Role persona rows ───────────────────────────────────────────────────────
const ROLES: {
  role: Role;
  icon: string;
  titleMr: string;
  titleEn: string;
  desc: string;
  phone: string;
}[] = [
  {
    role: 'farmer',
    icon: '👨‍🌾',
    titleMr: 'शेतकरी',
    titleEn: 'Farmer',
    desc: 'Individual smallholder — list lots, view offers, track payments',
    phone: '9822451080'
  },
  {
    role: 'fpo',
    icon: '👩‍💼',
    titleMr: 'FPO व्यवस्थापक',
    titleEn: 'FPO Manager',
    desc: 'Farmer Producer Organization — bulk lot management for member farmers',
    phone: '9423189022'
  },
  {
    role: 'buyer',
    icon: '🏭',
    titleMr: 'खरेदीदार',
    titleEn: 'Buyer / Trader',
    desc: 'Processor, exporter or trader — browse lots, submit offers',
    phone: '9820011234'
  },
  {
    role: 'officer',
    icon: '🏛️',
    titleMr: 'अधिकारी',
    titleEn: 'Govt. Officer',
    desc: 'APMC / MSIS official — KYC review, dispute mediation, analytics',
    phone: '022-22874100'
  }
];

const DEMO_OTP = '123456';

// ── Component ───────────────────────────────────────────────────────────────
export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login, t } = useApp();

  type Step = 'role' | 'phone' | 'otp';
  const [step, setStep]           = useState<Step>('role');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [phone, setPhone]         = useState<string>('');
  const [otp, setOtp]             = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError]         = useState<string | null>(null);
  const [success, setSuccess]     = useState<boolean>(false);

  // OTP timer
  const [otpExpiry, setOtpExpiry] = useState<number>(300); // 5 min
  const [resendCooldown, setResendCooldown] = useState<number>(30);
  const [attempts, setAttempts]   = useState<number>(3);
  const [locked, setLocked]       = useState<boolean>(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Pre-fill phone when role is selected
  useEffect(() => {
    if (selectedRole) {
      const p = ROLES.find((r) => r.role === selectedRole);
      setPhone(p?.phone ?? '');
    }
  }, [selectedRole]);

  // OTP countdown
  useEffect(() => {
    if (step !== 'otp') return;
    const iv = setInterval(() => {
      setOtpExpiry((p) => (p > 0 ? p - 1 : 0));
      setResendCooldown((p) => (p > 0 ? p - 1 : 0));
    }, 1000);
    return () => clearInterval(iv);
  }, [step]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setError(null);
    setStep('phone');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < 7) {
      setError('कृपया वैध मोबाईल क्रमांक टाका.');
      return;
    }
    setError(null);
    setOtp(['', '', '', '', '', '']);
    setOtpExpiry(300);
    setResendCooldown(30);
    setAttempts(3);
    setLocked(false);
    setStep('otp');
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (idx: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    setError(null);
    if (digit && idx < 5) {
      otpRefs.current[idx + 1]?.focus();
    }
    // Auto-submit when all 6 digits filled
    if (next.every((d) => d !== '') && digit) {
      verifyOtp(next.join(''));
    }
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const next = pasted.split('');
      setOtp(next);
      verifyOtp(pasted);
    }
    e.preventDefault();
  };

  const verifyOtp = (code: string) => {
    if (locked) return;
    if (code === DEMO_OTP || code.length === 6) {
      // Success
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        login(selectedRole!);
        onClose();
      }, 600);
    } else {
      const next = attempts - 1;
      setAttempts(next);
      if (next <= 0) {
        setLocked(true);
        setError('अधिक चुकीच्या प्रयत्नांमुळे खाते १५ मिनिटांसाठी कुलूपबंद आहे.');
      } else {
        setError(`OTP चुकीचा आहे. शिल्लक प्रयत्न: ${next}`);
      }
      // Shake and clear
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setOtp(['', '', '', '', '', '']);
    setOtpExpiry(300);
    setResendCooldown(30);
    setError(null);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const playVoiceOtp = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(
        Object.assign(new SpeechSynthesisUtterance('तुमचा मंडी सेतू पडताळणी कोड १ २ ३ ४ ५ ६ आहे.'), { lang: 'mr-IN' })
      );
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{ alignItems: 'flex-start', paddingTop: '10vh' }}
    >
      <div
        className="modal-content"
        style={{ maxWidth: 440 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal header (blush strip) ──────────────────────────────── */}
        <div className="modal-header">
          <div>
            <div className="modal-title">
              {step === 'role' ? 'Sign in to MandiSetu' : step === 'phone' ? 'Enter your phone number' : 'Enter OTP'}
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-soft)', marginTop: 3 }}>
              {step === 'role' && 'Choose your role to continue'}
              {step === 'phone' && `Signing in as ${ROLES.find(r => r.role === selectedRole)?.titleEn}`}
              {step === 'otp' && `OTP sent to +91 ${phone}`}
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--charcoal)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 0 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px 24px 24px' }}>

          {/* ── Step 1: Role selection ────────────────────────────────── */}
          {step === 'role' && (
            <div>
              <div style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)', marginBottom: 14 }}>
                Select how you use MandiSetu — your navigation and features will be personalised.
              </div>
              {ROLES.map((r, i) => (
                <button
                  key={r.role}
                  onClick={() => handleSelectRole(r.role)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '13px 14px',
                    marginBottom: i < ROLES.length - 1 ? 8 : 0,
                    border: '1px solid var(--rule-mid)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--white)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    transition: 'border-color 0.12s ease, background 0.12s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.background = 'rgba(247,214,208,0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'var(--rule-mid)';
                    e.currentTarget.style.background = 'var(--white)';
                  }}
                >
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{r.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '0.92rem' }}>
                      {r.titleMr} · {r.titleEn}
                    </div>
                    <div style={{ fontSize: '0.77rem', color: 'var(--charcoal-soft)', marginTop: 2 }}>
                      {r.desc}
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--charcoal-soft)" style={{ flexShrink: 0 }} />
                </button>
              ))}
              <div style={{ marginTop: 16, fontSize: '0.77rem', color: 'var(--charcoal-soft)', textAlign: 'center' }}>
                Demo OTP is <strong style={{ color: 'var(--dark)' }}>123456</strong> for any phone number.
              </div>
            </div>
          )}

          {/* ── Step 2: Phone number ──────────────────────────────────── */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp}>
              {/* Back */}
              <button
                type="button"
                onClick={() => { setStep('role'); setError(null); }}
                className="btn-ghost"
                style={{ padding: '0 0 14px 0', fontSize: '0.82rem', gap: 4 }}
              >
                ← Back to role selection
              </button>

              {/* Role badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 12px',
                background: 'var(--band)',
                border: '1px solid var(--accent)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 16
              }}>
                <span style={{ fontSize: '1.2rem' }}>{ROLES.find(r => r.role === selectedRole)?.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--dark)' }}>
                    {ROLES.find(r => r.role === selectedRole)?.titleEn}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--charcoal-soft)' }}>
                    {DEMO_USERS[selectedRole!]?.name}
                  </div>
                </div>
              </div>

              <label className="gov-label">नोंदणीकृत मोबाईल क्रमांक</label>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <div style={{
                  padding: '10px 12px',
                  background: 'var(--band)',
                  border: '1px solid var(--rule-mid)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  color: 'var(--charcoal)',
                  whiteSpace: 'nowrap'
                }}>
                  +91
                </div>
                <input
                  type="tel"
                  className="gov-input"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setError(null); }}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  autoFocus
                  required
                />
              </div>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--rose)', fontSize: '0.82rem', marginBottom: 10 }}>
                  <AlertCircle size={13} />
                  {error}
                </div>
              )}

              <div style={{ fontSize: '0.76rem', color: 'var(--charcoal-soft)', marginBottom: 16 }}>
                Demo phone is pre-filled. You can use any number — OTP is always <strong>123456</strong>.
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '11px', justifyContent: 'center' }}>
                <Phone size={15} />
                Send OTP
              </button>
            </form>
          )}

          {/* ── Step 3: OTP entry ─────────────────────────────────────── */}
          {step === 'otp' && (
            <div>
              {/* Back */}
              <button
                type="button"
                onClick={() => { setStep('phone'); setError(null); setOtp(['','','','','','']); }}
                className="btn-ghost"
                style={{ padding: '0 0 14px 0', fontSize: '0.82rem', gap: 4 }}
              >
                ← Change phone number
              </button>

              {/* Timer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)' }}>
                  +91 {phone}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontVariantNumeric: 'tabular-nums',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  color: otpExpiry < 60 ? 'var(--rose)' : 'var(--olive)'
                }}>
                  {fmt(otpExpiry)}
                </span>
              </div>

              {/* Success state */}
              {success && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px 0',
                  gap: 10
                }}>
                  <CheckCircle2 size={40} color="var(--olive)" />
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--dark)', fontWeight: 600 }}>
                    Verified! Signing you in…
                  </div>
                </div>
              )}

              {/* 6-box OTP input */}
              {!success && (
                <>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 14 }}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => { otpRefs.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        onPaste={idx === 0 ? handleOtpPaste : undefined}
                        disabled={locked}
                        style={{
                          width: 46,
                          height: 54,
                          textAlign: 'center',
                          fontSize: '1.4rem',
                          fontWeight: 700,
                          fontFamily: 'var(--font-display)',
                          fontVariantNumeric: 'tabular-nums',
                          border: `1.5px solid ${error ? 'var(--rose)' : digit ? 'var(--accent)' : 'var(--rule-mid)'}`,
                          borderRadius: 'var(--radius-sm)',
                          background: digit ? 'rgba(247,214,208,0.25)' : 'var(--white)',
                          outline: 'none',
                          color: 'var(--dark)',
                          transition: 'border-color 0.12s ease, background 0.12s ease'
                        }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 2.5px rgba(226,180,189,0.35)'; }}
                        onBlur={(e) => { e.target.style.boxShadow = 'none'; if (!e.target.value) e.target.style.borderColor = 'var(--rule-mid)'; }}
                      />
                    ))}
                  </div>

                  {/* Error */}
                  {error && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      color: 'var(--rose)',
                      fontSize: '0.82rem',
                      marginBottom: 12,
                      background: 'var(--rose-bg)',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      <AlertCircle size={14} />
                      {error}
                    </div>
                  )}

                  {/* Voice + resend row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <button
                      type="button"
                      onClick={playVoiceOtp}
                      className="btn-secondary"
                      style={{ padding: '5px 10px', fontSize: '0.77rem', gap: 4 }}
                    >
                      <Volume2 size={13} />
                      OTP ऐका (Voice)
                    </button>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendCooldown > 0 || locked}
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: resendCooldown > 0 ? 'var(--charcoal-soft)' : 'var(--olive)',
                        background: 'none',
                        border: 'none',
                        cursor: resendCooldown > 0 ? 'default' : 'pointer'
                      }}
                    >
                      {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={otp.some((d) => !d) || locked}
                    onClick={() => verifyOtp(otp.join(''))}
                    className="btn-primary"
                    style={{ width: '100%', padding: '11px', justifyContent: 'center', opacity: otp.some(d => !d) ? 0.5 : 1 }}
                  >
                    Verify &amp; Sign In
                  </button>

                  <div style={{ marginTop: 12, textAlign: 'center', fontSize: '0.76rem', color: 'var(--charcoal-soft)' }}>
                    Demo OTP is <strong style={{ color: 'var(--dark)' }}>123456</strong>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
