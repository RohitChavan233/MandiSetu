import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MATCHED_BUYERS } from '../data/mockData';
import { MatchedBuyer, BuyerTrustScore } from '../types';
import {
  ShieldCheck,
  CheckCircle,
  Truck,
  DollarSign,
  Info,
  Clock,
  Send,
  AlertCircle
} from 'lucide-react';

export const BuyerMatching: React.FC = () => {
  const { t, offers, acceptOffer, counterOffer, declineOffer } = useApp();
  const [selectedBuyerForScore, setSelectedBuyerForScore] = useState<MatchedBuyer | null>(null);
  const [counterInputId, setCounterInputId] = useState<string | null>(null);
  const [counterPriceVal, setCounterPriceVal] = useState<number>(2400);

  const handleSendCounter = (offerId: string) => {
    counterOffer(offerId, counterPriceVal);
    setCounterInputId(null);
  };

  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '16px' }}>
      {/* Received Offers Section */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ borderBottom: '2px solid var(--rule-mid)', paddingBottom: '10px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--charcoal)' }}>
            🤝 {t.receivedOffers} (Direct Procurement Offers)
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-soft)' }}>
            शेतमालासाठी प्राप्त झालेल्या थेट खरेदीदार ऑफर्स. स्वीकारल्यावर शासकीय एस्क्रोद्वारे पैसे सुरक्षित केले जातात.
          </p>
        </div>

        {offers.length === 0 ? (
          <div
            style={{
              background: 'var(--white)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-sm)',
              padding: '24px',
              textAlign: 'center',
              color: 'var(--charcoal-soft)'
            }}
          >
            सध्या कोणतीही ऑफर प्रलंबित नाही.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {offers.map((offer) => {
              const isAccepted = offer.status === 'accepted';
              const isCountered = offer.status === 'countered';
              const isDeclined = offer.status === 'declined';

              return (
                <div
                  key={offer.id}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--rule-mid)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--charcoal)' }}>
                        {offer.buyerCompany} ({offer.buyerName})
                      </strong>
                      <span className="badge badge-olive" style={{ fontSize: '0.72rem' }}>
                        विश्वासार्हता {offer.buyerTrustScore}/100
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>
                        ऑफर ID: {offer.id}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)', marginBottom: '6px' }}>
                      लॉट संदर्भ: <strong>{offer.lotId}</strong> · {offer.quantityQtl} क्विंटल कांदा
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)', lineHeight: 1.4 }}>
                      <div>🚚 {offer.deliveryTerms}</div>
                      <div>💳 {offer.paymentTerms}</div>
                    </div>
                  </div>

                  {/* Financials & Status */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>प्रस्तावित भाव:</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--olive)' }}>
                      ₹{offer.offeredPriceQtl.toLocaleString('en-IN')}{' '}
                      <span style={{ fontSize: '0.82rem', fontWeight: 400 }}>/ क्विंटल</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal)' }}>
                      एकूण रक्कम: ₹{offer.totalAmount.toLocaleString('en-IN')}
                    </div>

                    {isCountered && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--rose)', marginTop: 4 }}>
                        तुम्ही प्रति-ऑफर दिली आहे: ₹{offer.counterPrice}/qtl
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {isAccepted ? (
                      <span className="badge badge-olive" style={{ padding: '6px 12px' }}>
                        ✓ ऑफर स्वीकारली (एस्क्रो लॉक)
                      </span>
                    ) : isDeclined ? (
                      <span className="badge badge-rose" style={{ padding: '6px 12px' }}>
                        नाकारली
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => acceptOffer(offer.id)}
                          className="btn-primary"
                          style={{ padding: '8px 14px' }}
                        >
                          <CheckCircle size={16} />
                          <span>{t.acceptOffer}</span>
                        </button>

                        <button
                          onClick={() => setCounterInputId(offer.id)}
                          className="btn-secondary"
                          style={{ padding: '8px 12px' }}
                        >
                          <span>{t.counterOffer}</span>
                        </button>

                        <button
                          onClick={() => declineOffer(offer.id)}
                          className="btn-secondary"
                          style={{ padding: '8px 12px', color: 'var(--rose)' }}
                        >
                          <span>{t.declineOffer}</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Counter Price Input Drawer */}
                  {counterInputId === offer.id && (
                    <div
                      style={{
                        width: '100%',
                        background: 'var(--band)',
                        borderTop: '1px solid var(--rule)',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>नवीन अपेक्षित भाव (₹/क्विंटल):</span>
                      <input
                        type="number"
                        className="gov-input"
                        style={{ width: 120 }}
                        value={counterPriceVal}
                        onChange={(e) => setCounterPriceVal(Number(e.target.value))}
                      />
                      <button
                        onClick={() => handleSendCounter(offer.id)}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                      >
                        प्रति-ऑफर पाठवा
                      </button>
                      <button
                        onClick={() => setCounterInputId(null)}
                        className="btn-secondary"
                        style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                      >
                        रद्द
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Matched Buyers Directory (§7.5, §10.4) */}
      <div>
        <div style={{ borderBottom: '2px solid var(--rule-mid)', paddingBottom: '10px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--charcoal)' }}>
            🎯 {t.matchedBuyersTitle}
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-soft)' }}>
            शेतमालाची जात, प्रतवारी, अंतर आणि खरेदीदाराच्या इतिहासानुसार अल्गोरिदमने जुळवलेले खरेदीदार.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {MATCHED_BUYERS.map((buyer) => (
            <div
              key={buyer.id}
              style={{
                background: 'var(--white)',
                border: '1px solid var(--rule-mid)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                    {buyer.companyName}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)' }}>
                    {buyer.name} · {buyer.district}
                  </div>
                </div>

                {/* Trust Score Badge with Click for Breakdown */}
                <button
                  onClick={() => setSelectedBuyerForScore(buyer)}
                  style={{
                    background: buyer.trustScore.isNewBuyer ? 'var(--band)' : 'var(--paper)',
                    border: buyer.trustScore.isNewBuyer ? '1px solid var(--rule-mid)' : '1px solid var(--olive)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '4px 8px',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                  title="विश्वासार्हता स्कोअर तपशील पहा"
                >
                  <div style={{ fontSize: '0.68rem', color: 'var(--charcoal-soft)', textTransform: 'uppercase' }}>
                    {buyer.trustScore.isNewBuyer ? 'New Buyer' : 'Trust Score'}
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: buyer.trustScore.isNewBuyer ? 'var(--charcoal)' : 'var(--dark)' }}>
                    {buyer.trustScore.totalScore}/100
                  </div>
                </button>
              </div>

              {/* Reason Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {buyer.tags.map((tag, idx) => (
                  <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buying Preferences */}
              <div
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--rule)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px',
                  fontSize: '0.82rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginBottom: '14px'
                }}
              >
                <div>
                  अपेक्षित दर: <strong>₹{buyer.bidPriceQtl}/क्विंटल</strong>
                </div>
                <div>
                  आवश्यक प्रत: <strong>{buyer.preferredGrade}</strong>
                </div>
                <div>
                  मागणी: <strong>{buyer.demandedQuantityQtl} क्विंटल</strong>
                </div>
                <div>
                  अंतर: <strong>{buyer.distanceKm} किमी</strong>
                </div>
              </div>

              <button
                onClick={() => alert(`खरेदीदार ${buyer.companyName} यांना तुमच्या लॉटचा प्रस्ताव पाठवला गेला आहे.`)}
                className="btn-primary"
                style={{ width: '100%', padding: '8px' }}
              >
                <Send size={15} />
                <span>थेट संपर्क / प्रस्ताव पाठवा</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bayesian Trust Score Breakdown Modal (§10.4) */}
      {selectedBuyerForScore && (
        <div className="modal-overlay" onClick={() => setSelectedBuyerForScore(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: 520 }}
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
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                  🛡️ {t.buyerTrustScore} विश्लेषण (Bayesian Formula)
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-soft)' }}>
                  {selectedBuyerForScore.companyName}
                </div>
              </div>
              <button onClick={() => setSelectedBuyerForScore(null)} className="btn-secondary" style={{ padding: '4px' }}>
                ✕
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <div
                style={{
                  background: 'var(--band)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px',
                  marginBottom: '16px',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace'
                }}
              >
                Trust = 100 × (0.40·वेळेवर भरणा + 0.30·गुणवत्ता स्वीकार + 0.20·तक्रार-मुक्त + 0.10·KYC स्तर)
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>पूर्ण झालेले व्यवहार:</span>
                  <strong>{selectedBuyerForScore.trustScore.completedTransactions} सौदे</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t.onTimePayment}:</span>
                  <strong>{selectedBuyerForScore.trustScore.onTimePaymentRate}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t.qualityAcceptance}:</span>
                  <strong>{selectedBuyerForScore.trustScore.qualityAcceptanceRate}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t.disputeFree}:</span>
                  <strong>{selectedBuyerForScore.trustScore.disputeFreeRate}%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>KYC पडताळणी स्तर:</span>
                  <strong>Tier {selectedBuyerForScore.trustScore.kycTier} (GSTIN + PAN + Bank Active)</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
