import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LotCertificate } from './LotCertificate';
import { Search, ShieldCheck, ArrowLeft } from 'lucide-react';

export const PublicVerifyView: React.FC = () => {
  const { lots, verifiedLotId, setVerifiedLotId, setCurrentView } = useApp();
  const [searchLotInput, setSearchLotInput] = useState<string>(verifiedLotId || 'LOT-MH-2026-0841');

  const currentLot = lots.find(
    (l) => l.id.toLowerCase() === (verifiedLotId || searchLotInput).trim().toLowerCase()
  ) || lots[0];

  return (
    <div style={{ maxWidth: 880, margin: '20px auto', padding: '16px' }}>
      {/* Back button & Public Verification Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <button
          onClick={() => {
            setVerifiedLotId(null);
            setCurrentView('prices');
          }}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={15} />
          <span>मुख्य पानावर जा (Back to Home)</span>
        </button>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="var(--charcoal-soft)" style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="gov-input"
              style={{ paddingLeft: 28, width: 220, fontSize: '0.85rem', padding: '5px 8px 5px 28px' }}
              value={searchLotInput}
              onChange={(e) => setSearchLotInput(e.target.value)}
              placeholder="लॉट क्रमांक टाका (उदा. LOT-0841)"
            />
          </div>
          <button
            onClick={() => setVerifiedLotId(searchLotInput)}
            className="btn-primary"
            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
          >
            पडताळा
          </button>
        </div>
      </div>

      <div
        style={{
          background: 'var(--paper)',
          border: '1px solid var(--olive)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.9rem',
          color: 'var(--dark)'
        }}
      >
        <ShieldCheck size={20} color="var(--olive)" />
        <span>
          <strong>सार्वजनिक शेतमाल सत्यता पोर्टल (/verify):</strong> हा लॉट महाराष्ट्र शासनाच्या डिजिटल शेती रजिस्ट्रीद्वारे प्रमाणित आहे.
        </span>
      </div>

      {currentLot ? (
        <LotCertificate lot={currentLot} isPublicView={true} />
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', background: '#FFF', border: '1px solid var(--rule)' }}>
          हा लॉट संदर्भ क्रमांक आढळला नाही. कृपया क्रमांक तपासून पुन्हा प्रयत्न करा.
        </div>
      )}
    </div>
  );
};
