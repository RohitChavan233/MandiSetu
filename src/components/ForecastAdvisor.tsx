import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { COMMODITIES, MANDIS, ONION_FORECAST } from '../data/mockData';
import { StorageType, AdvisorVerdict } from '../types';
import {
  TrendingUp,
  Volume2,
  Mic,
  Calculator,
  Calendar,
  DollarSign,
  Warehouse,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert
} from 'lucide-react';

export const ForecastAdvisor: React.FC = () => {
  const { t, language } = useApp();

  // Forecast state
  const [selectedCropId, setSelectedCropId] = useState<string>('crop_onion');
  const [selectedMandiId, setSelectedMandiId] = useState<string>('mandi_lasalgaon');
  const [horizon, setHorizon] = useState<number>(14);

  // Advisor input states
  const [quantityQtl, setQuantityQtl] = useState<number>(50);
  const [storageType, setStorageType] = useState<StorageType>('home');
  const [storageRatePerMonth, setStorageRatePerMonth] = useState<number>(55);
  const [urgentCashNeeded, setUrgentCashNeeded] = useState<number>(40000);
  const [urgentDaysNeeded, setUrgentDaysNeeded] = useState<number>(3);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const currentPrice = 2280; // Lasalgaon onion modal price
  const forecast = ONION_FORECAST;

  // Expected Value Optimization Logic (§10.3)
  const verdict: AdvisorVerdict = useMemo(() => {
    // Expected price around day 12
    const targetBand = forecast.bands[Math.min(horizon - 1, 11)];
    const expectedP50 = targetBand.p50;
    const safeP10 = targetBand.p10;

    // Shrinkage loss factor based on storage type
    // None = 0%, Home chawl = 0.8% per week (~1.6% in 14 days), Cold = 0.1% per week
    const shrinkRate = storageType === 'none' ? 0 : storageType === 'home' ? 0.018 : 0.003;
    const effectiveQuantity = quantityQtl * (1 - shrinkRate);

    // Monthly storage cost pro-rated
    const dailyRate = storageType === 'cold_storage' ? storageRatePerMonth / 30 : storageType === 'home' ? 8 / 30 : 0;
    const totalStorageCost = Math.round(dailyRate * quantityQtl * 12);
    const shrinkLossVal = Math.round((quantityQtl - effectiveQuantity) * expectedP50);

    // Finance cost of waiting (interest ~ 12% p.a. on tied-up working capital)
    const financeCostVal = Math.round((quantityQtl * currentPrice * 0.12 * 12) / 365);

    const grossGain = Math.round(effectiveQuantity * expectedP50 - quantityQtl * currentPrice);
    const netGain = grossGain - totalStorageCost - financeCostVal;
    const safeGainP10 = Math.round(effectiveQuantity * safeP10 - quantityQtl * currentPrice) - totalStorageCost - financeCostVal;

    // Liquidity Split optimization
    let split: any = undefined;
    if (urgentCashNeeded > 0 && urgentDaysNeeded <= 7) {
      const qtlToSellNow = Math.min(quantityQtl, Math.ceil(urgentCashNeeded / currentPrice));
      const cashGeneratedNow = qtlToSellNow * currentPrice;
      const storeQuantity = quantityQtl - qtlToSellNow;

      const storedEffective = storeQuantity * (1 - shrinkRate);
      const storedStorageCost = Math.round(dailyRate * storeQuantity * 12);
      const storedGain = Math.round(storedEffective * expectedP50 - storeQuantity * currentPrice) - storedStorageCost;

      split = {
        sellNowQuantity: qtlToSellNow,
        sellNowCashGenerated: cashGeneratedNow,
        storeQuantity,
        storeForDays: 12,
        expectedGainFromStored: storedGain
      };
    }

    const isSplitAdvised = split && split.storeQuantity > 5 && split.expectedGainFromStored > 1000;

    return {
      verdict: isSplitAdvised ? 'store_part' : netGain > 1500 && safeGainP10 >= 0 ? 'sell_window' : 'sell_now',
      recommendedSellDate: '०२ ते ०५ ऑक्टोबर २०२६',
      recommendedSellDays: 12,
      expectedNetGain: netGain,
      safeGainP10,
      costBreakdown: {
        storageCost: totalStorageCost,
        shrinkageCost: shrinkLossVal,
        financeCost: financeCostVal,
        totalCost: totalStorageCost + shrinkLossVal + financeCostVal,
        grossGain
      },
      splitRecommendation: split,
      confidence: 'high',
      plainLanguageExplanation: {
        mr: isSplitAdvised
          ? `तुमच्या ₹${urgentCashNeeded.toLocaleString('en-IN')} तातडीच्या गरजेसाठी आत्ता ${split.sellNowQuantity} क्विंटल कांदा विका (हाती मिळतील ₹${split.sellNowCashGenerated.toLocaleString('en-IN')}). उर्वरित ${split.storeQuantity} क्विंटल माल १०-१२ दिवस साठवून ठेवा, ज्यामुळे अंदाजे ₹${split.expectedGainFromStored.toLocaleString('en-IN')} चा जास्तीचा नफा होईल.`
          : netGain > 1500
          ? `कांद्याचे भाव पुढील १०-१२ दिवसांत ₹२,२८० वरून ₹२,७७० पर्यंत वाढण्याची शक्यता आहे. साठवणूक व घट खर्च वजा जाता तुम्हाला अंदाजे ₹${netGain.toLocaleString('en-IN')} चा निव्वळ नफा मिळू शकतो.`
          : `सध्याचे बाजारभाव समाधानकारक आहेत. अधिक दिवस साठवून ठेवल्यास वजनातील घट व साठवणूक खर्चामुळे नफा मर्यादित राहू शकतो. आत्ता विक्री करणे सुरक्षित ठरेल.`,
        hi: isSplitAdvised
          ? `आपकी ₹${urgentCashNeeded.toLocaleString('en-IN')} की तात्कालिक आवश्यकता हेतु अभी ${split.sellNowQuantity} क्विंटल प्याज बेचें (प्राप्त होंगे ₹${split.sellNowCashGenerated.toLocaleString('en-IN')})। शेष ${split.storeQuantity} क्विंटल प्याज 10-12 दिन भंडारित रखें, जिससे अनुमानित ₹${split.expectedGainFromStored.toLocaleString('en-IN')} का अतिरिक्त शुद्ध लाभ होगा।`
          : netGain > 1500
          ? `प्याज के भाव अगले 10-12 दिनों में ₹2,280 से बढ़कर ₹2,770 तक पहुंचने का अनुमान है। भंडारण और वजन ह्रास घटाने के बाद आपको अनुमानित ₹${netGain.toLocaleString('en-IN')} का शुद्ध लाभ होगा।`
          : `वर्तमान बाजार मूल्य अनुकूल है। भंडारण लागत और ह्रास के कारण अभी बिक्री करना सुरक्षित विकल्प है।`,
        en: isSplitAdvised
          ? `Sell ${split.sellNowQuantity} quintals now to cover your urgent ₹${urgentCashNeeded.toLocaleString('en-IN')} requirement (generates ₹${split.sellNowCashGenerated.toLocaleString('en-IN')}). Store remaining ${split.storeQuantity} quintals for 10-12 days for an estimated net gain of ₹${split.expectedGainFromStored.toLocaleString('en-IN')}.`
          : netGain > 1500
          ? `Onion prices projected to rise from ₹2,280 to ₹2,770 over the next 10-12 days. Net of storage and shrink costs, expected gain is ₹${netGain.toLocaleString('en-IN')}.`
          : `Current market prices are favorable. Higher storage and shrink risk warrants immediate sale.`
      }
    };
  }, [quantityQtl, storageType, storageRatePerMonth, urgentCashNeeded, urgentDaysNeeded, horizon]);

  // Voice speech readout using browser Web Speech API
  const speakRecommendation = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = verdict.plainLanguageExplanation[language] || verdict.plainLanguageExplanation.mr;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported on this browser.');
    }
  };

  const setVoiceQueryPreset = () => {
    setUrgentCashNeeded(40000);
    setUrgentDaysNeeded(3);
    setQuantityQtl(50);
  };

  // SVG dimensions for forecast chart
  const width = 640;
  const height = 240;
  const padding = { top: 20, right: 30, bottom: 40, left: 60 };

  const allValues = forecast.bands.flatMap((b) => [b.p10, b.p50, b.p90]);
  const minVal = Math.min(...allValues) * 0.95;
  const maxVal = Math.max(...allValues) * 1.05;

  const getX = (idx: number) =>
    padding.left + (idx / (forecast.bands.length - 1)) * (width - padding.left - padding.right);

  const getY = (val: number) =>
    height - padding.bottom - ((val - minVal) / (maxVal - minVal)) * (height - padding.top - padding.bottom);

  // Path strings
  const p50Points = forecast.bands.map((b, i) => `${getX(i)},${getY(b.p50)}`).join(' ');
  const p10Points = forecast.bands.map((b, i) => `${getX(i)},${getY(b.p10)}`).join(' ');
  const p90PointsRev = [...forecast.bands].reverse().map((b, i) => `${getX(forecast.bands.length - 1 - i)},${getY(b.p90)}`).join(' ');

  const ribbonPoints = `${forecast.bands.map((b, i) => `${getX(i)},${getY(b.p10)}`).join(' ')} ${p90PointsRev}`;

  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '16px' }}>
      {/* Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--charcoal)' }}>
              📈 {t.forecastTitle} &amp; {t.advisorTitle}
            </h2>
            <span className="badge badge-olive">P10 / P50 / P90 LightGBM</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-soft)', marginTop: 2 }}>
            {t.forecastDesc}
          </p>
        </div>

        {/* Voice Simulation Chip */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={setVoiceQueryPreset}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '6px 12px' }}
            title="व्हॉईस इनपुट चाचणी: मला ३ दिवसांत ४०,००० रुपयांची गरज आहे"
          >
            <Mic size={14} color="var(--rose)" />
            <span>{t.voiceQuerySim}</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Left Column: Quantile Forecast Chart & Model Metrics */}
        <div>
          <div
            style={{
              background: 'var(--white)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              marginBottom: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                  कांदा (लासलगाव) — पुढील १४ दिवसांचा भाव कल
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-soft)' }}>
                  आजचा सरासरी भाव: <strong>₹{currentPrice} / क्विंटल</strong>
                </span>
              </div>
              <span className="badge badge-olive">विश्वासार्हता: उच्च (High)</span>
            </div>

            {/* SVG Quantile Chart */}
            <div style={{ background: '#FFF', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '6px' }}>
              <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
                {/* Horizontal gridlines */}
                {[0, 0.33, 0.66, 1].map((r) => {
                  const val = Math.round(minVal + (maxVal - minVal) * r);
                  const y = getY(val);
                  return (
                    <g key={r}>
                      <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="var(--rule)" strokeDasharray="3 3" />
                      <text x={padding.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="var(--charcoal-soft)">
                        ₹{val}
                      </text>
                    </g>
                  );
                })}

                {/* Quantile Ribbon (P10 to P90 band) */}
                <polygon points={ribbonPoints} fill="rgba(200, 125, 32, 0.15)" />

                {/* P50 Median Line */}
                <polyline points={p50Points} fill="none" stroke="var(--olive)" strokeWidth="3" />

                {/* P10 Lower bound */}
                <polyline points={p10Points} fill="none" stroke="var(--rose)" strokeWidth="1.5" strokeDasharray="4 3" />

                {/* X-axis date labels */}
                {forecast.bands.map((b, i) => {
                  if (i % 2 === 0 || i === forecast.bands.length - 1) {
                    return (
                      <text key={i} x={getX(i)} y={height - padding.bottom + 16} textAnchor="middle" fontSize="10" fill="var(--charcoal-soft)">
                        {b.dateStr}
                      </text>
                    );
                  }
                  return null;
                })}
              </svg>
            </div>

            {/* Chart Legend */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '10px', fontSize: '0.78rem', color: 'var(--charcoal-soft)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: 14, height: 3, background: 'var(--olive)' }}></div>
                <span>{t.p50Label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: 14, height: 2, background: 'var(--rose)', borderBottom: '1px dashed' }}></div>
                <span>{t.p10Label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: 14, height: 10, background: 'rgba(200, 125, 32, 0.25)' }}></div>
                <span>८०% संभाव्य विस्तार (P10–P90 Band)</span>
              </div>
            </div>
          </div>

          {/* Model Backtest Transparency Card (§10.2 Honesty Rule) */}
          <div
            style={{
              background: 'var(--band)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              fontSize: '0.82rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '6px' }}>
              <Info size={15} color="var(--olive)" />
              <span>{t.backtestAccuracy}</span>
            </div>
            <p style={{ color: 'var(--charcoal-soft)', lineHeight: 1.4 }}>
              हे मॉडेल AGMARKNET चे मागील १० वर्षांचे सौदे, आवक, नवरात्र/दिवाळी सण आणि IMD पाऊस आकडेवारीवर आधारित आहे. जेव्हा बाजार अस्थिर असतो किंवा अंदाज कक्षा रुंद होते, तेव्हा सल्लागार सावधगिरीचा मार्ग सुचवतो.
            </p>
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>
              मॉडेल आवृत्ती: <code>{forecast.modelVersion}</code>
            </div>
          </div>
        </div>

        {/* Right Column: Sell-Window & Liquidity Advisor Inputs & Recommendation */}
        <div>
          <div
            style={{
              background: 'var(--white)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              marginBottom: '16px'
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '14px', borderBottom: '1px solid var(--rule)', paddingBottom: '8px' }}>
              ⚙️ {t.advisorTitle}
            </h3>

            {/* Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              {/* Quantity */}
              <div>
                <label className="gov-label">{t.inputQuantity}</label>
                <input
                  type="number"
                  className="gov-input"
                  value={quantityQtl}
                  onChange={(e) => setQuantityQtl(Number(e.target.value))}
                  min={1}
                />
              </div>

              {/* Storage Infrastructure */}
              <div>
                <label className="gov-label">{t.inputStorageType}</label>
                <select
                  className="gov-input"
                  value={storageType}
                  onChange={(e) => setStorageType(e.target.value as StorageType)}
                >
                  <option value="home">{t.storageHome}</option>
                  <option value="cold_storage">{t.storageCold}</option>
                  <option value="none">{t.storageNone}</option>
                </select>
              </div>

              {/* Urgent Cash Needed */}
              <div>
                <label className="gov-label">{t.inputCashNeeded}</label>
                <input
                  type="number"
                  className="gov-input"
                  value={urgentCashNeeded}
                  onChange={(e) => setUrgentCashNeeded(Number(e.target.value))}
                  step={5000}
                />
              </div>

              {/* Urgent Days Needed */}
              <div>
                <label className="gov-label">{t.inputDaysNeeded}</label>
                <input
                  type="number"
                  className="gov-input"
                  value={urgentDaysNeeded}
                  onChange={(e) => setUrgentDaysNeeded(Number(e.target.value))}
                  min={1}
                  max={21}
                />
              </div>
            </div>

            {/* Verdict Display Box */}
            <div
              style={{
                background: verdict.verdict === 'store_part' ? 'var(--band)' : 'var(--paper)',
                border: verdict.verdict === 'store_part' ? '1px solid var(--accent)' : '1px solid var(--olive)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px',
                marginBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span
                  className={verdict.verdict === 'store_part' ? 'badge badge-band' : 'badge badge-olive'}
                  style={{ fontSize: '0.85rem', padding: '4px 8px' }}
                >
                  {verdict.verdict === 'store_part' ? t.verdictStorePart : verdict.verdict === 'sell_window' ? t.verdictSellLater : t.verdictSellNow}
                </span>

                {/* Read Aloud Button */}
                <button
                  onClick={speakRecommendation}
                  className="btn-primary"
                  style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                  title="मराठीत ऑडिओ ऐका"
                >
                  <Volume2 size={15} />
                  <span>{isSpeaking ? 'वाचत आहे...' : t.listenVerdict}</span>
                </button>
              </div>

              {/* Plain language explanation */}
              <p style={{ fontSize: '0.94rem', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.45, marginBottom: '10px' }}>
                {verdict.plainLanguageExplanation[language] || verdict.plainLanguageExplanation.mr}
              </p>

              {/* Split Breakdown Details if applicable */}
              {verdict.splitRecommendation && (
                <div style={{ background: '#FFF', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '10px', fontSize: '0.82rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--rose)', marginBottom: '4px' }}>
                    विभागून विक्री आराखडा (Smart Split Strategy):
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      आत्ता विक्री: <strong>{verdict.splitRecommendation.sellNowQuantity} क्विंटल</strong> (₹{verdict.splitRecommendation.sellNowCashGenerated.toLocaleString('en-IN')})
                    </div>
                    <div>
                      साठवणूक: <strong>{verdict.splitRecommendation.storeQuantity} क्विंटल</strong> (अपेक्षित निव्वळ नफा: +₹{verdict.splitRecommendation.expectedGainFromStored.toLocaleString('en-IN')})
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Expected Gain & Cost Breakdown Table */}
            <div style={{ background: 'var(--band)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '12px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--charcoal)', marginBottom: '8px' }}>
                {t.costBreakdown}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--charcoal-soft)' }}>{t.storageCost}:</span>
                  <span>- ₹{verdict.costBreakdown.storageCost.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--charcoal-soft)' }}>{t.shrinkageCost}:</span>
                  <span>- ₹{verdict.costBreakdown.shrinkageCost.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--charcoal-soft)' }}>{t.financeCost}:</span>
                  <span>- ₹{verdict.costBreakdown.financeCost.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--rule-mid)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.88rem' }}>
                  <span>{t.expectedNetGain}:</span>
                  <span style={{ color: verdict.expectedNetGain > 0 ? 'var(--olive)' : 'var(--rose)' }}>
                    ₹{verdict.expectedNetGain.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
