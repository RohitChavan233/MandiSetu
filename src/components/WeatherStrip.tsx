import React from 'react';
import { useApp } from '../context/AppContext';
import { TALUKA_WEATHER } from '../data/mockData';
import { CloudRain, Sun, Cloud, AlertTriangle } from 'lucide-react';

export const WeatherStrip: React.FC = () => {
  const { t } = useApp();

  const getWeatherIcon = (rainfall: number) => {
    if (rainfall > 5) return <CloudRain size={18} color="var(--charcoal-soft)" />;
    if (rainfall > 0) return <Cloud size={18} color="var(--charcoal-soft)" />;
    return <Sun size={18} color="var(--charcoal-soft)" />;
  };

  return (
    <div style={{
      marginBottom: 16,
      borderBottom: '1px solid var(--rule)'
    }}>
      {/* Strip header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 0',
        marginBottom: 10
      }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--charcoal)', letterSpacing: '0.02em' }}>
          {t.weatherAdvisory} · निफाड / नाशिक (IMD)
        </span>
        <span style={{ fontSize: '0.73rem', color: 'var(--charcoal-soft)' }}>
          {t.lastUpdated}: २१ सप्टें. २०२६
        </span>
      </div>

      {/* Horizontally scrollable day cards — hairline-separated, no shadow */}
      <div style={{
        display: 'flex',
        gap: 0,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 5%, black 92%, transparent)'
      }}>
        {TALUKA_WEATHER.map((w, idx) => (
          <div
            key={idx}
            style={{
              minWidth: 120,
              padding: '10px 14px',
              borderRight: idx < TALUKA_WEATHER.length - 1 ? '1px solid var(--rule)' : 'none',
              borderLeft: w.agriAlert ? '2.5px solid var(--rose)' : 'none',
              flexShrink: 0,
              background: idx === 0 ? 'rgba(247, 214, 208, 0.2)' : 'transparent'
            }}
          >
            <div style={{ fontSize: '0.77rem', fontWeight: 600, color: 'var(--charcoal-soft)', marginBottom: 6 }}>
              {w.dayName}
              <span style={{ fontWeight: 400, marginLeft: 4, opacity: 0.7 }}>{w.dateStr}</span>
            </div>
            <div style={{ marginBottom: 5 }}>
              {getWeatherIcon(w.rainfallMm)}
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--dark)', marginBottom: 2 }}>
              {w.tempMax}° / {w.tempMin}°
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-soft)' }}>
              {w.rainfallMm > 0 ? `${w.rainfallMm} mm` : 'उघडीप'}
            </div>
            {w.agriAlert && (
              <div style={{
                marginTop: 6,
                fontSize: '0.7rem',
                color: 'var(--rose)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 3,
                lineHeight: 1.35
              }}>
                <AlertTriangle size={10} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>{w.agriAlert}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
