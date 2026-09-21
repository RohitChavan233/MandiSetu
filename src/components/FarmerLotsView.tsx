import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lot } from '../types';
import { LotCertificate } from './LotCertificate';
import { Plus, QrCode, Eye, CheckCircle2, Clock } from 'lucide-react';

export const FarmerLotsView: React.FC = () => {
  const { lots, user, t, setCurrentView } = useApp();
  const [inspectLot, setInspectLot] = useState<Lot | null>(null);

  // Filter lots belonging to current user or all demo lots
  const userLots = lots;

  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '16px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '2px solid var(--rule-mid)',
          paddingBottom: '12px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--charcoal)' }}>
            🏷️ {t.navLots} (Certified Produce Lots)
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-soft)', marginTop: 2 }}>
            तुमचे नोंदणीकृत, जिओ-टॅग प्रमाणित शेतमाल लॉट्स व डिजिटल QR प्रमाणपत्रे.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('create_lot')}
          className="btn-primary"
          style={{ padding: '8px 16px' }}
        >
          <Plus size={16} />
          <span>{t.navCreateLot}</span>
        </button>
      </div>

      {/* Lots Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {userLots.map((lot) => (
          <div
            key={lot.id}
            style={{
              background: 'var(--white)',
              border: '1px solid var(--rule-mid)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <span className="badge badge-olive" style={{ fontSize: '0.7rem' }}>
                    {lot.grade}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: 4 }}>
                    {lot.variety}
                  </h3>
                </div>

                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--dark)' }}>
                  {lot.id}
                </span>
              </div>

              <div
                style={{
                  background: 'var(--band)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px',
                  fontSize: '0.82rem',
                  marginBottom: '12px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '6px'
                }}
              >
                <div>
                  वजन: <strong>{lot.quantityQtl} क्विंटल</strong>
                </div>
                <div>
                  अपेक्षित भाव: <strong>₹{lot.askingPrice || 2400}/qtl</strong>
                </div>
                <div>
                  काढणी: <strong>{lot.harvestDate}</strong>
                </div>
                <div>
                  स्थान: <strong>{lot.village}</strong>
                </div>
              </div>

              {lot.photoUrl && (
                <div style={{ marginBottom: '12px', overflow: 'hidden', borderRadius: '4px', height: 120 }}>
                  <img
                    src={lot.photoUrl}
                    alt={lot.variety}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setInspectLot(lot)}
                className="btn-primary"
                style={{ flex: 1, padding: '7px', fontSize: '0.82rem' }}
              >
                <QrCode size={15} />
                <span>QR प्रमाणपत्र पहा</span>
              </button>

              <button
                onClick={() => setCurrentView('offers')}
                className="btn-secondary"
                style={{ padding: '7px 12px', fontSize: '0.82rem' }}
              >
                <Eye size={15} />
                <span>ऑफर्स पहा</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Certificate Modal */}
      {inspectLot && (
        <div className="modal-overlay" onClick={() => setInspectLot(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: 760, padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <LotCertificate lot={inspectLot} onClose={() => setInspectLot(null)} />
          </div>
        </div>
      )}
    </div>
  );
};
