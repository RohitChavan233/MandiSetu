import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setCurrentView } = useApp();

  const linkStyle: React.CSSProperties = {
    color: 'rgba(255,245,245,0.6)',
    textAlign: 'left',
    fontSize: '0.82rem',
    lineHeight: 1.8,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: 'var(--font-body)',
    textDecoration: 'none',
    display: 'block'
  };

  const linkHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = 'var(--paper)';
  };
  const linkOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,245,245,0.6)';
  };

  return (
    <footer style={{
      background: 'var(--charcoal)',
      color: 'rgba(255,245,245,0.7)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '36px 20px 20px',
      marginTop: 48,
      fontSize: '0.84rem',
      lineHeight: 1.6
    }}>
      <div style={{
        maxWidth: 1240,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 32,
        marginBottom: 28
      }}>

        {/* Col 1: Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: '1.2rem' }}>🌾</span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--paper)'
            }}>MandiSetu</span>
          </div>
          <div style={{ fontSize: '0.8rem', lineHeight: 1.9, color: 'rgba(255,245,245,0.55)' }}>
            मंडी सेतू<br />
            मंडी सेतू<br />
            <span style={{ opacity: 0.7 }}>महाराष्ट्र शासन</span>
          </div>
          <div style={{ marginTop: 10, fontSize: '0.73rem', color: 'rgba(255,245,245,0.35)' }}>
            SIH26132 · MSIS
          </div>
        </div>

        {/* Col 2: Quick links */}
        <div>
          <h4 style={{ color: 'var(--paper)', fontSize: '0.82rem', fontWeight: 600, marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Quick Links
          </h4>
          <button style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut} onClick={() => setCurrentView('prices')}>APMC Price Board</button>
          <button style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut} onClick={() => setCurrentView('forecast')}>7–21d Price Forecast</button>
          <button style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut} onClick={() => setCurrentView('advisor')}>Sell Advisor</button>
          <button style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut} onClick={() => setCurrentView('verify_lot')}>Verify a Lot</button>
          <button style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut} onClick={() => setCurrentView('about_data')}>About the Data</button>
        </div>

        {/* Col 3: Data sources */}
        <div>
          <h4 style={{ color: 'var(--paper)', fontSize: '0.82rem', fontWeight: 600, marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Data Sources
          </h4>
          <div style={{ fontSize: '0.8rem', lineHeight: 2.1, color: 'rgba(255,245,245,0.55)' }}>
            Agmarknet (NIC / DAC&FW)<br />
            eNAM · Electronic APMC<br />
            IMD · Open-Meteo API<br />
            Ed25519 digital signatures
          </div>
          <div style={{ marginTop: 10, fontSize: '0.73rem', color: 'rgba(255,245,245,0.35)', lineHeight: 1.6 }}>
            DPDP Act 2023 · GIGW · WCAG 2.1 AA
          </div>
        </div>

        {/* Col 4: Support */}
        <div>
          <h4 style={{ color: 'var(--paper)', fontSize: '0.82rem', fontWeight: 600, marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            शेतकरी साहाय्यता
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Phone size={13} color="var(--accent)" />
              <span><strong style={{ color: 'var(--paper)' }}>1800-120-8040</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Mail size={13} color="var(--accent)" />
              <span style={{ fontSize: '0.76rem' }}>support.mandisetu@maharashtra.gov.in</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: 16,
        maxWidth: 1240,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
        fontSize: '0.76rem',
        color: 'rgba(255,245,245,0.35)'
      }}>
        <div>© २०२६ महाराष्ट्र शासन · MandiSetu v1.0</div>
        <div>Rates are indicative. Verify with APMC before trading.</div>
      </div>
    </footer>
  );
};
