import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MANDIS, COMMODITIES, CURRENT_PRICES } from '../data/mockData';
import { X, ArrowRight, Truck, Check } from 'lucide-react';

interface MandiComparatorProps {
  onClose: () => void;
}

export const MandiComparator: React.FC<MandiComparatorProps> = ({ onClose }) => {
  const { t } = useApp();
  const [selectedCropId, setSelectedCropId] = useState<string>('crop_onion');
  const [selectedMandiIds, setSelectedMandiIds] = useState<string[]>([
    'mandi_lasalgaon',
    'mandi_pune',
    'mandi_ahmednagar',
    'mandi_vashi'
  ]);

  const selectedCrop = COMMODITIES.find((c) => c.id === selectedCropId) || COMMODITIES[0];

  const toggleMandi = (mandiId: string) => {
    if (selectedMandiIds.includes(mandiId)) {
      if (selectedMandiIds.length > 2) {
        setSelectedMandiIds(selectedMandiIds.filter((id) => id !== mandiId));
      }
    } else {
      if (selectedMandiIds.length < 4) {
        setSelectedMandiIds([...selectedMandiIds, mandiId]);
      }
    }
  };

  // Farmer's origin is Pimpalgaon / Nashik
  const distances: Record<string, number> = {
    mandi_lasalgaon: 28,
    mandi_pune: 210,
    mandi_ahmednagar: 160,
    mandi_vashi: 175,
    mandi_latur: 390,
    mandi_nagpur: 640,
    mandi_kolhapur: 440
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: 880 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--rule)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--band)'
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--charcoal)' }}>
              ⚖️ {t.compareMandis} (Multi-Mandi Arbitrage Explorer)
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>
              वाहतूक खर्च वजा जाता कोणत्या बाजारात सर्वाधिक निव्वळ भाव मिळेल? (नाशिक शेतातून अंतर)
            </p>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Crop Selector & Mandi Selector Chips */}
          <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <label className="gov-label" style={{ marginBottom: 0 }}>
              शेतमाल:
            </label>
            <select
              className="gov-input"
              style={{ width: 'auto', padding: '6px 12px' }}
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
            >
              {COMMODITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.nameEn}
                </option>
              ))}
            </select>

            <span style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)' }}>
              तुलनेसाठी मंड्या निवडा (किमान २, कमाल ४):
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {MANDIS.map((m) => {
              const isSelected = selectedMandiIds.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => toggleMandi(m.id)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 700 : 500,
                    background: isSelected ? 'var(--olive)' : 'var(--white)',
                    color: isSelected ? '#FFF' : 'var(--charcoal)',
                    border: isSelected ? '1px solid var(--dark)' : '1px solid var(--rule-mid)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {isSelected && <Check size={14} />}
                  <span>{m.nameMr}</span>
                </button>
              );
            })}
          </div>

          {/* Comparison Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${selectedMandiIds.length}, 1fr)`,
              gap: '12px',
              overflowX: 'auto'
            }}
          >
            {selectedMandiIds.map((mId) => {
              const mandi = MANDIS.find((m) => m.id === mId)!;
              const obs = CURRENT_PRICES.find(
                (p) => p.commodityId === selectedCropId && p.mandiId === mId
              ) || {
                modalPrice: 2200,
                minPrice: 1700,
                maxPrice: 2500,
                arrivalsQtl: 11000,
                change24h: 1.5,
                updatedAt: '21 Sep 2026 17:00'
              };

              const distKm = distances[mId] || 150;
              // Approximate freight: ₹35 base + ₹1.2 per km per quintal
              const freightPerQtl = Math.round(35 + distKm * 1.1);
              const netRealized = obs.modalPrice - freightPerQtl;

              return (
                <div
                  key={mId}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--rule-mid)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px',
                    minWidth: '180px'
                  }}
                >
                  <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: '8px', marginBottom: '10px' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                      {mandi.nameMr}
                    </h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-soft)' }}>
                      {mandi.districtMr} · {distKm} किमी अंतर
                    </div>
                  </div>

                  {/* Prices */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>सरासरी बाजारभाव:</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--olive)' }}>
                      ₹{obs.modalPrice.toLocaleString('en-IN')}{' '}
                      <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>/ क्विंटल</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>
                      कक्षा: ₹{obs.minPrice} - ₹{obs.maxPrice}
                    </div>
                  </div>

                  {/* Transport Freight */}
                  <div
                    style={{
                      background: 'var(--band)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px',
                      fontSize: '0.78rem',
                      marginBottom: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--charcoal-soft)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Truck size={13} /> वाहतूक खर्च:
                      </span>
                      <strong style={{ color: 'var(--rose)' }}>- ₹{freightPerQtl}/qtl</strong>
                    </div>
                  </div>

                  {/* Net Realized In Hand */}
                  <div
                    style={{
                      background: 'var(--paper)',
                      border: '1px solid var(--olive)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--dark)' }}>
                      शेतकऱ्याच्या हाती निव्वळ:
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark)' }}>
                      ₹{netRealized.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div style={{ marginTop: '10px', fontSize: '0.72rem', color: 'var(--charcoal-soft)' }}>
                    आवक: {obs.arrivalsQtl.toLocaleString('en-IN')} क्विंटल
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
