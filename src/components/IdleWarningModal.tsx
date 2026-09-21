import React from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, CheckCircle } from 'lucide-react';

export const IdleWarningModal: React.FC = () => {
  const { isIdleWarningOpen, idleCountdown, staySignedIn, logout, t } = useApp();

  if (!isIdleWarningOpen) return null;

  const isUrgent = idleCountdown <= 30;

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div
        className="modal-content"
        style={{
          maxWidth: 400,
          padding: '32px 28px',
          textAlign: 'center',
          border: `1px solid ${isUrgent ? 'var(--rose)' : 'var(--rule-mid)'}`
        }}
      >
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.2rem',
          fontWeight: 600,
          color: 'var(--dark)',
          marginBottom: 10
        }}>
          Session timeout
        </h3>

        <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-soft)', marginBottom: 20, lineHeight: 1.5 }}>
          आपण काही वेळ निष्क्रिय आहात. पुढील वेळात आपोआप लॉगआउट होईल:
        </p>

        {/* Countdown — Fraunces 44px per spec */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3rem',
          fontWeight: 600,
          color: isUrgent ? 'var(--rose)' : 'var(--dark)',
          marginBottom: 24,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1,
          transition: 'color 0.3s ease'
        }}>
          {idleCountdown}
          <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--charcoal-soft)', marginLeft: 6 }}>
            सेकंद
          </span>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button
            onClick={staySignedIn}
            className="btn-primary"
            style={{ padding: '10px 20px' }}
          >
            <CheckCircle size={15} />
            Stay signed in
          </button>
          <button
            onClick={logout}
            className="btn-ghost"
            style={{ padding: '10px 14px' }}
          >
            <LogOut size={14} />
            Sign out now
          </button>
        </div>
      </div>
    </div>
  );
};
