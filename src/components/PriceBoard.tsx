import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MANDIS, COMMODITIES, CURRENT_PRICES } from '../data/mockData';
import { PriceChartModal } from './PriceChartModal';
import { MandiComparator } from './MandiComparator';
import { MandiMapModal } from './MandiMapModal';
import { WeatherStrip } from './WeatherStrip';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Download,
  MapPin,
  Scale,
  LineChart,
  Bell,
  CheckCircle2
} from 'lucide-react';
import { Commodity, Mandi } from '../types';

export const PriceBoard: React.FC = () => {
  const { t, setCurrentView, language } = useApp();

  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [chartTarget, setChartTarget] = useState<{
    commodity: Commodity;
    mandi: Mandi;
    modalPrice: number;
  } | null>(null);

  const [isComparatorOpen, setIsComparatorOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [alertSuccessMsg, setAlertSuccessMsg] = useState<string | null>(null);

  const filteredPrices = CURRENT_PRICES.filter((obs) => {
    if (selectedCrop !== 'all' && obs.commodityId !== selectedCrop) return false;
    const mandi = MANDIS.find((m) => m.id === obs.mandiId);
    if (!mandi) return false;
    if (selectedDistrict !== 'all' && mandi.district !== selectedDistrict) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const commodity = COMMODITIES.find((c) => c.id === obs.commodityId);
      const matchMandi = mandi.name.toLowerCase().includes(q) || mandi.nameMr.includes(q) || (mandi.nameHi && mandi.nameHi.includes(q));
      const matchCrop = commodity?.nameEn.toLowerCase().includes(q) || commodity?.nameMr.includes(q) || (commodity?.nameHi && commodity?.nameHi.includes(q));
      if (!matchMandi && !matchCrop) return false;
    }
    return true;
  });

  const exportCsv = () => {
    const headers = 'Commodity,Mandi,District,MinPrice,ModalPrice,MaxPrice,ArrivalsQtl,Source,UpdatedAt\n';
    const rows = filteredPrices
      .map((p) => {
        const c = COMMODITIES.find((item) => item.id === p.commodityId);
        const m = MANDIS.find((item) => item.id === p.mandiId);
        return `"${c?.nameEn}","${m?.name}","${m?.district}",${p.minPrice},${p.modalPrice},${p.maxPrice},${p.arrivalsQtl},"${p.source}","${p.updatedAt}"`;
      })
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MandiSetu_Prices_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerPriceAlert = (mandiName: string, cropName: string, price: number) => {
    const msg = language === 'mr' ? `अलर्ट सेट: ${mandiName} मध्ये ${cropName} भाव ₹${price + 150} ओलांडल्यास SMS येईल.` : language === 'hi' ? `अलर्ट सेट: ${mandiName} में ${cropName} भाव ₹${price + 150} से ऊपर जाने पर SMS आएगा.` : `Alert set: SMS will be sent when ${cropName} at ${mandiName} crosses ₹${price + 150}.`;
    setAlertSuccessMsg(msg);
    setTimeout(() => setAlertSuccessMsg(null), 4000);
  };

  const districts = Array.from(new Set(MANDIS.map((m) => m.district)));

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '20px 16px' }}>

      {/* Weather Strip */}
      <WeatherStrip />

      {/* Alert confirmation */}
      {alertSuccessMsg && (
        <div style={{
          background: 'var(--olive-bg)',
          border: '1px solid var(--olive)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: 'var(--olive)',
          fontSize: '0.88rem'
        }}>
          <CheckCircle2 size={16} />
          <span>{alertSuccessMsg}</span>
        </div>
      )}

      {/* Page header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16,
        paddingBottom: 14,
        borderBottom: '1px solid var(--rule-mid)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--dark)' }}>
              {t.priceBoardTitle}
            </h2>
            <span className="badge badge-live" style={{ fontSize: '0.7rem' }}>AGMARKNET</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-soft)' }}>
            {t.priceBoardDesc}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={() => setIsComparatorOpen(true)} className="btn-secondary">
            <Scale size={14} />
            <span className="hide-mobile">{t.compareMandis}</span>
          </button>
          <button onClick={() => setIsMapOpen(true)} className="btn-secondary">
            <MapPin size={14} />
            <span className="hide-mobile">{t.viewMap}</span>
          </button>
          <button onClick={exportCsv} className="btn-secondary">
            <Download size={14} />
            <span className="hide-mobile">{t.exportCsv}</span>
          </button>
          <button onClick={() => setCurrentView('forecast')} className="btn-primary">
            <LineChart size={14} />
            <span>{t.navForecast}</span>
          </button>
        </div>
      </div>

      {/* Filter bar — blush background, charcoal outlines */}
      <div style={{
        background: 'var(--band)',
        border: '1px solid var(--accent)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 14px',
        marginBottom: 16,
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{ flex: '1 1 200px', position: 'relative' }}>
          <Search size={14} color="var(--charcoal-soft)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            type="text"
            className="gov-input"
            style={{ paddingLeft: 30, background: 'var(--white)', minHeight: 36, fontSize: '0.86rem' }}
            placeholder={language === 'mr' ? 'बाजार समिती किंवा शेतमाल शोधा...' : language === 'hi' ? 'मंडी या फसल खोजें...' : 'Search Mandi or Commodity...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Commodity */}
        <div style={{ flex: '0 1 180px' }}>
          <select
            className="gov-input"
            style={{ background: 'var(--white)', minHeight: 36, fontSize: '0.86rem' }}
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option value="all">{t.allCrops}</option>
            {COMMODITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div style={{ flex: '0 1 160px' }}>
          <select
            className="gov-input"
            style={{ background: 'var(--white)', minHeight: 36, fontSize: '0.86rem' }}
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="all">{t.allDistricts}</option>
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
          <strong style={{ color: 'var(--dark)', fontFamily: 'var(--font-display)' }}>{filteredPrices.length}</strong> नोंदी
        </div>
      </div>

      {/* Price table — ledger style, no card shadows */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--rule-mid)', borderRadius: 'var(--radius-sm)' }}>
        <table className="mandi-table">
          <thead>
            <tr>
              <th>{t.commodity}</th>
              <th>{t.mandi}</th>
              <th style={{ textAlign: 'right' }}>{t.arrivals}</th>
              <th style={{ textAlign: 'right' }}>{t.minPrice}</th>
              <th style={{ textAlign: 'right' }}>{t.modalPrice}</th>
              <th style={{ textAlign: 'right' }}>{t.maxPrice}</th>
              <th style={{ textAlign: 'right' }}>MSP</th>
              <th style={{ textAlign: 'center' }}>{t.change24h}</th>
              <th>{t.lastUpdated}</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrices.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '32px', color: 'var(--charcoal-soft)', fontSize: '0.9rem' }}>
                  कोणतीही नोंद आढळली नाही. कृपया फिल्टर तपासा.
                </td>
              </tr>
            ) : (
              filteredPrices.map((obs) => {
                const crop = COMMODITIES.find((c) => c.id === obs.commodityId)!;
                const mandi = MANDIS.find((m) => m.id === obs.mandiId)!;
                const isPositive = obs.change24h >= 0;
                const belowMsp = crop.msp > 0 && obs.modalPrice < crop.msp;

                return (
                  <tr key={obs.id} className={belowMsp ? 'below-msp' : ''}>
                    {/* Commodity */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '1.15rem' }}>{crop.icon}</span>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '0.9rem' }}>
                            {language === 'mr' ? crop.nameMr : language === 'hi' ? crop.nameHi : crop.nameEn}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-soft)' }}>
                            {language === 'en' ? crop.nameMr : crop.nameEn}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Mandi */}
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '0.9rem' }}>
                        {language === 'mr' ? mandi.nameMr : language === 'hi' ? mandi.nameHi : mandi.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-soft)' }}>
                        {language === 'mr' ? mandi.districtMr : mandi.district}
                      </div>
                    </td>

                    {/* Arrivals */}
                    <td style={{ textAlign: 'right' }} className="tabular-nums">
                      <span style={{ fontWeight: 600 }}>{obs.arrivalsQtl.toLocaleString('en-IN')}</span>{' '}
                      <span style={{ fontSize: '0.72rem', color: 'var(--charcoal-soft)' }}>क्विं.</span>
                    </td>

                    {/* Min */}
                    <td style={{ textAlign: 'right', color: 'var(--charcoal-soft)' }} className="tabular-nums">
                      ₹{obs.minPrice.toLocaleString('en-IN')}
                    </td>

                    {/* Modal — hero */}
                    <td style={{ textAlign: 'right' }} className="modal-price-cell">
                      ₹{obs.modalPrice.toLocaleString('en-IN')}
                      <span style={{ fontSize: '0.72rem', color: 'var(--charcoal-soft)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>/क्विं</span>
                    </td>

                    {/* Max */}
                    <td style={{ textAlign: 'right', color: 'var(--charcoal-soft)' }} className="tabular-nums">
                      ₹{obs.maxPrice.toLocaleString('en-IN')}
                    </td>

                    {/* MSP */}
                    <td style={{ textAlign: 'right' }} className="tabular-nums">
                      {crop.msp > 0 ? (
                        <span style={{
                          fontWeight: 600,
                          fontSize: '0.86rem',
                          color: belowMsp ? 'var(--rose)' : 'var(--charcoal-soft)'
                        }}>
                          ₹{crop.msp.toLocaleString('en-IN')}
                          {belowMsp && (
                            <span style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.02em' }}>
                              below MSP
                            </span>
                          )}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--charcoal-soft)', fontSize: '0.8rem' }}>—</span>
                      )}
                    </td>

                    {/* 24h change */}
                    <td style={{ textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 3,
                        color: isPositive ? 'var(--olive)' : 'var(--rose)',
                        fontWeight: 700,
                        fontSize: '0.84rem',
                        fontFamily: 'var(--font-display)',
                        fontVariantNumeric: 'tabular-nums'
                      }}>
                        {isPositive
                          ? <TrendingUp size={13} />
                          : <TrendingDown size={13} />}
                        {Math.abs(obs.change24h)}%
                      </span>
                    </td>

                    {/* Updated */}
                    <td style={{ fontSize: '0.76rem', color: 'var(--charcoal-soft)', whiteSpace: 'nowrap' }}>
                      <div>{obs.updatedAt}</div>
                      <div style={{ fontSize: '0.68rem', opacity: 0.7 }}>{obs.source}</div>
                    </td>

                    {/* Actions */}
                    <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'inline-flex', gap: 4 }}>
                        <button
                          onClick={() => setChartTarget({ commodity: crop, mandi, modalPrice: obs.modalPrice })}
                          className="btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '0.76rem', gap: 4 }}
                          title={t.viewChart}
                        >
                          <LineChart size={12} />
                          <span className="hide-mobile">{t.viewChart}</span>
                        </button>
                        <button
                          onClick={() => triggerPriceAlert(language === 'en' ? mandi.name : mandi.nameMr, language === 'en' ? crop.nameEn : crop.nameMr, obs.modalPrice)}
                          className="btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '0.76rem' }}
                          title={language === 'mr' ? 'अलर्ट सेट करा' : language === 'hi' ? 'अलर्ट सेट करें' : 'Set Alert'}
                        >
                          <Bell size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {chartTarget && (
        <PriceChartModal
          commodity={chartTarget.commodity}
          mandi={chartTarget.mandi}
          currentModalPrice={chartTarget.modalPrice}
          onClose={() => setChartTarget(null)}
        />
      )}
      {isComparatorOpen && <MandiComparator onClose={() => setIsComparatorOpen(false)} />}
      {isMapOpen && <MandiMapModal onClose={() => setIsMapOpen(false)} />}
    </div>
  );
};
