import React from 'react';
import { useApp } from '../context/AppContext';
import { LogIn, CheckCircle2 } from 'lucide-react';

export const SignedOutView: React.FC = () => {
  const { t, currentView, setCurrentView, setIsAuthModalOpen } = useApp();
  const isExpired = currentView === 'session_expired';

  return (
    <div style={{
      maxWidth: 480,
      margin: '80px auto',
      padding: '0 20px',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.9rem',
        fontWeight: 600,
        color: 'var(--dark)',
        marginBottom: 12,
        lineHeight: 1.2
      }}>
        {isExpired
          ? 'Session expired.'
          : 'Signed out. Your lots are safe.'}
      </h2>

      <p style={{ fontSize: '0.95rem', color: 'var(--charcoal-soft)', marginBottom: 28, lineHeight: 1.6 }}>
        {isExpired
          ? 'For your security, we sign you out after a period of inactivity. Your data is safe and untouched.'
          : t.signedOutDesc}
      </p>

      {/* Security checklist */}
      <div style={{
        background: 'var(--band)',
        border: '1px solid var(--accent)',
        borderRadius: 'var(--radius-sm)',
        padding: '16px 20px',
        textAlign: 'left',
        marginBottom: 28
      }}>
        {[
          'Server-side session terminated immediately.',
          'Secure cookies and browser cache cleared.',
          'Back button will not expose private data.'
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: i < 2 ? 10 : 0 }}>
            <CheckCircle2 size={15} color="var(--olive)" style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: '0.84rem', color: 'var(--charcoal)', lineHeight: 1.4 }}>{item}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button
          onClick={() => {
            setCurrentView('prices');
            setIsAuthModalOpen(true);
          }}
          className="btn-primary"
          style={{ padding: '10px 22px' }}
        >
          <LogIn size={15} />
          Sign In Again
        </button>
        <button
          onClick={() => setCurrentView('prices')}
          className="btn-ghost"
        >
          View Price Board →
        </button>
      </div>
    </div>
  );
};
