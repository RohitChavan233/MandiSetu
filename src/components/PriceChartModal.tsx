import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Commodity, Mandi, PriceHistoryPoint } from '../types';
import { generateHistory } from '../data/mockData';
import { X, TrendingUp, Download, Info } from 'lucide-react';

interface PriceChartModalProps {
  commodity: Commodity;
  mandi: Mandi;
  currentModalPrice: number;
  onClose: () => void;
}

export const PriceChartModal: React.FC<PriceChartModalProps> = ({
  commodity,
  mandi,
  currentModalPrice,
  onClose
}) => {
  const { t, language } = useApp();
  const [timeRange, setTimeRange] = useState<'30' | '90' | '365'>('30');

  const historyData = generateHistory(currentModalPrice, commodity.msp);

  // SVG dimensions
  const width = 640;
  const height = 260;
  const padding = { top: 20, right: 30, bottom: 40, left: 60 };

  const prices = historyData.map((d) => d.modalPrice);
  const minPrice = Math.min(...prices, commodity.msp || 999999) * 0.92;
  const maxPrice = Math.max(...prices, commodity.msp || 0) * 1.08;

  const getX = (index: number) => {
    return (
      padding.left +
      (index / (historyData.length - 1)) * (width - padding.left - padding.right)
    );
  };

  const getY = (price: number) => {
    return (
      height -
      padding.bottom -
      ((price - minPrice) / (maxPrice - minPrice)) * (height - padding.top - padding.bottom)
    );
  };

  // Generate path string for modal prices
  const linePoints = historyData
    .map((d, i) => `${getX(i)},${getY(d.modalPrice)}`)
    .join(' ');

  const areaPoints = `${getX(0)},${height - padding.bottom} ${linePoints} ${getX(
    historyData.length - 1
  )},${height - padding.bottom}`;

  const mspY = commodity.msp ? getY(commodity.msp) : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: 720 }}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>{commodity.icon}</span>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                {commodity.nameEn} · {mandi.nameMr} ({mandi.name})
              </h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>
              अधिकृत दैनिक सौदे आणि आवक कल (AGMARKNET डेटा)
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--rule-mid)',
              background: 'var(--paper)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Controls & Summary */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>आजचा सरासरी भाव:</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--olive)' }}>
                ₹{currentModalPrice.toLocaleString('en-IN')}{' '}
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--charcoal-soft)' }}>
                  / क्विंटल
                </span>
              </div>
            </div>

            {/* Range Toggle */}
            <div
              style={{
                display: 'flex',
                background: 'var(--band)',
                border: '1px solid var(--rule-mid)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden'
              }}
            >
              {(['30', '90', '365'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.82rem',
                    fontWeight: timeRange === r ? 700 : 500,
                    background: timeRange === r ? 'var(--olive)' : 'transparent',
                    color: timeRange === r ? '#FFF' : 'var(--charcoal)'
                  }}
                >
                  {r === '30' ? t.history30d : r === '90' ? t.history90d : t.history365d}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Price Chart */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px',
              overflowX: 'auto'
            }}
          >
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
              {/* Horizontal Grid Lines & Y Axis Labels */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const priceVal = Math.round(minPrice + (maxPrice - minPrice) * ratio);
                const yPos = getY(priceVal);
                return (
                  <g key={ratio}>
                    <line
                      x1={padding.left}
                      y1={yPos}
                      x2={width - padding.right}
                      y2={yPos}
                      stroke="var(--rule)"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={padding.left - 8}
                      y={yPos + 4}
                      textAnchor="end"
                      fontSize="11"
                      fill="var(--charcoal-soft)"
                      fontFamily="var(--font-base)"
                    >
                      ₹{priceVal}
                    </text>
                  </g>
                );
              })}

              {/* MSP Line if applicable */}
              {mspY && mspY >= padding.top && mspY <= height - padding.bottom && (
                <g>
                  <line
                    x1={padding.left}
                    y1={mspY}
                    x2={width - padding.right}
                    y2={mspY}
                    stroke="var(--rose)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={width - padding.right}
                    y={mspY - 5}
                    textAnchor="end"
                    fontSize="10"
                    fill="var(--rose)"
                    fontWeight="700"
                  >
                    हमीभाव (MSP) ₹{commodity.msp}
                  </text>
                </g>
              )}

              {/* Area Fill */}
              <polygon points={areaPoints} fill="rgba(27, 77, 62, 0.12)" />

              {/* Trend Line */}
              <polyline
                points={linePoints}
                fill="none"
                stroke="var(--olive)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {historyData.map((d, i) => {
                if (i % 5 === 0 || i === historyData.length - 1) {
                  return (
                    <g key={i}>
                      <circle
                        cx={getX(i)}
                        cy={getY(d.modalPrice)}
                        r="3.5"
                        fill="var(--olive)"
                        stroke="#FFF"
                        strokeWidth="1.5"
                      />
                      <text
                        x={getX(i)}
                        y={height - padding.bottom + 18}
                        textAnchor="middle"
                        fontSize="10"
                        fill="var(--charcoal-soft)"
                      >
                        {d.date}
                      </text>
                    </g>
                  );
                }
                return null;
              })}
            </svg>
          </div>

          {/* Key Legend */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '12px',
              fontSize: '0.78rem',
              color: 'var(--charcoal-soft)',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: 14, height: 3, background: 'var(--olive)' }}></div>
              <span>सरासरी भाव (Modal Price ₹/qtl)</span>
            </div>
            {commodity.msp > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 14, height: 2, background: 'var(--rose)', borderBottom: '1px dashed var(--rose)' }}></div>
                <span>अधिकृत हमीभाव (Govt MSP)</span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Info size={13} />
              <span>दैनिक आवक नोंदणी: १०,००० ते २२,००० क्विंटल</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
