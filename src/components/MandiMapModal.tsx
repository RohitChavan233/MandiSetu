import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MANDIS, CURRENT_PRICES, COMMODITIES } from '../data/mockData';
import L from 'leaflet';
import { X, MapPin } from 'lucide-react';

interface MandiMapModalProps {
  onClose: () => void;
}

export const MandiMapModal: React.FC<MandiMapModalProps> = ({ onClose }) => {
  const { t } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Centered on Maharashtra (coordinates: ~19.5, 75.5)
    const map = L.map(mapContainerRef.current).setView([19.2, 75.5], 7);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 14
    }).addTo(map);

    // Plot each mandi with custom circle marker and tooltip
    MANDIS.forEach((mandi) => {
      const priceObs = CURRENT_PRICES.find((p) => p.mandiId === mandi.id && p.commodityId === 'crop_onion') ||
        CURRENT_PRICES.find((p) => p.mandiId === mandi.id);

      const price = priceObs ? priceObs.modalPrice : 2200;
      const arrivals = priceObs ? priceObs.arrivalsQtl : 10000;

      // Color based on price
      const color = price >= 2400 ? '#1B4D3E' : price >= 2100 ? '#C87D20' : 'var(--rose)';

      const circle = L.circleMarker([mandi.lat, mandi.lon], {
        radius: 12,
        fillColor: color,
        color: '#FFFFFF',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(map);

      const popupContent = `
        <div style="font-family: var(--font-base); min-width: 170px; padding: 4px;">
          <h4 style="margin: 0 0 4px 0; color: #141B17; font-weight: 700; font-size: 14px;">${mandi.nameMr}</h4>
          <div style="font-size: 11px; color: #526058; margin-bottom: 6px;">${mandi.districtMr} (${mandi.name})</div>
          <div style="background: #F4F1EA; padding: 6px; border-radius: 4px; margin-bottom: 6px;">
            <div style="font-size: 11px; color: #526058;">कांदा सरासरी भाव:</div>
            <div style="font-size: 16px; font-weight: 800; color: #1B4D3E;">₹${price.toLocaleString('en-IN')} / qtl</div>
          </div>
          <div style="font-size: 11px; color: #526058;">दैनिक आवक: <strong>${arrivals.toLocaleString('en-IN')} क्विंटल</strong></div>
          <div style="font-size: 10px; color: #738077; margin-top: 4px;">स्त्रोत: AGMARKNET Live</div>
        </div>
      `;

      circle.bindPopup(popupContent);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: 880, height: '80vh', display: 'flex', flexDirection: 'column' }}
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
              🗺️ {t.viewMap} — महाराष्ट्र बाजार समिती भाव नकाशा (MapLibre / OSM)
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>
              भौगोलिक अंतरासह आजचे कांदा भाव व आवक घनता
            </p>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Map Viewport */}
        <div style={{ flex: 1, position: 'relative' }}>
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
        </div>

        {/* Footer Legend */}
        <div
          style={{
            padding: '10px 20px',
            background: 'var(--band)',
            borderTop: '1px solid var(--rule)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'var(--charcoal-soft)'
          }}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#1B4D3E' }}></div>
              <span>उच्च भाव (&gt; ₹२,४००)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#C87D20' }}></div>
              <span>मध्यम भाव (₹२,१०० - ₹२,४००)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--rose)' }}></div>
              <span>कमी भाव (&lt; ₹२,१००)</span>
            </div>
          </div>
          <div>क्लिक करून अधिक तपशील पहा</div>
        </div>
      </div>
    </div>
  );
};
