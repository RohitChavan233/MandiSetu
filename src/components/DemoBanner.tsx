import React from 'react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';

export const DemoBanner: React.FC = () => {
  const { user, switchDemoRole, t } = useApp();

  const personas: { role: Role; label: string; short: string }[] = [
    { role: 'farmer', label: 'सुनील · शेतकरी', short: 'Farmer' },
    { role: 'fpo',    label: 'वैशाली · FPO',   short: 'FPO' },
    { role: 'buyer',  label: 'राकेश · खरेदीदार', short: 'Buyer' },
    { role: 'officer',label: 'डॉ. पाटील · अधिकारी', short: 'Officer' }
  ];

  return (
    <div style={{
      background: 'var(--band)',
      borderTop: '1px solid var(--accent)',
      borderBottom: '1px solid var(--accent)',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 8,
      height: 44,
      fontSize: '0.82rem'
    }}>

      {/* Label */}
      <span style={{ color: 'var(--dark)', fontWeight: 500 }}>
        Demo mode — all data is simulated.
      </span>

      {/* Segmented role switcher */}
      <div style={{
        display: 'flex',
        border: '1px solid var(--accent)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden'
      }}>
        {personas.map((p, i) => {
          const active = user.role === p.role;
          return (
            <button
              key={p.role}
              onClick={() => switchDemoRole(p.role)}
              style={{
                padding: '4px 12px',
                fontSize: '0.8rem',
                fontWeight: active ? 700 : 500,
                color: active ? 'var(--paper)' : 'var(--dark)',
                background: active ? 'var(--charcoal)' : 'transparent',
                borderRight: i < personas.length - 1 ? '1px solid var(--accent)' : 'none',
                cursor: 'pointer',
                transition: 'background 0.12s ease, color 0.12s ease',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-body)'
              }}
              title={p.label}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* OTP hint */}
      <span style={{ color: 'var(--charcoal-soft)', fontSize: '0.77rem' }}>
        OTP: <strong style={{ color: 'var(--dark)' }}>123456</strong>
      </span>
    </div>
  );
};
