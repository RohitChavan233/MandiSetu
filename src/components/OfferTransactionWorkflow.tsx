import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Transaction, TransactionState } from '../types';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  Award,
  DollarSign,
  AlertCircle,
  FileText,
  Printer,
  ChevronRight,
  Lock
} from 'lucide-react';

export const OfferTransactionWorkflow: React.FC = () => {
  const { user, t, transactions, advanceTransaction, setCurrentView } = useApp();
  const [selectedTxnId, setSelectedTxnId] = useState<string>(transactions[0]?.id || '');
  const [isInvoiceOpen, setIsInvoiceOpen] = useState<boolean>(false);

  const activeTxn = transactions.find((t) => t.id === selectedTxnId) || transactions[0];

  const statesOrder: { state: TransactionState; label: string; icon: string }[] = [
    { state: 'offer_accepted', label: 'ऑफर स्वीकृत', icon: '📝' },
    { state: 'escrow_locked', label: 'एस्क्रो सुरक्षित ठेव', icon: '🔒' },
    { state: 'pickup_scheduled', label: 'उचल नियोजित', icon: '📅' },
    { state: 'in_transit', label: 'वाहतुकीत (In Transit)', icon: '🚚' },
    { state: 'delivered', label: 'पोहोच पावती (Delivered)', icon: '📦' },
    { state: 'quality_confirmed', label: 'गुणवत्ता पडताळणी', icon: '🔍' },
    { state: 'payment_released', label: 'पैसे जमा (Released)', icon: '💰' },
    { state: 'closed', label: 'व्यवहार पूर्ण', icon: '✅' }
  ];

  const getCurrentStateIndex = (curr: TransactionState) => {
    return statesOrder.findIndex((s) => s.state === curr);
  };

  const handleNextStep = () => {
    if (!activeTxn) return;
    const currIdx = getCurrentStateIndex(activeTxn.currentState);
    if (currIdx < statesOrder.length - 1) {
      const nextState = statesOrder[currIdx + 1].state;
      const note = `व्यवहार टप्पा ${currIdx + 2}: ${statesOrder[currIdx + 1].label} पूर्ण झाला.`;

      advanceTransaction(activeTxn.id, nextState, note);

      // Trigger celebration if payment released!
      if (nextState === 'payment_released') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  if (!activeTxn) {
    return (
      <div style={{ maxWidth: 1140, margin: '20px auto', padding: '16px', textAlign: 'center' }}>
        सध्या कोणताही सक्रिय व्यवहार नाही.
      </div>
    );
  }

  const currStepIdx = getCurrentStateIndex(activeTxn.currentState);

  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '16px' }}>
      {/* Page Header */}
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
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--charcoal)' }}>
              🔒 {t.transactionWorkflow}
            </h2>
            <span className="badge badge-olive">GOVT SIMULATED ESCROW</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-soft)', marginTop: 2 }}>
            ऑफर स्वीकृतीपासून थेट बँक खात्यात पैसे जमा होईपर्यंत प्रत्येक टप्प्याची कायदेशीर पारदर्शकता.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsInvoiceOpen(true)}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
          >
            <FileText size={15} />
            <span>{t.downloadInvoice}</span>
          </button>

          <button
            onClick={() => setCurrentView('disputes')}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.85rem', color: 'var(--rose)' }}
          >
            <AlertCircle size={15} />
            <span>{t.raiseDispute}</span>
          </button>
        </div>
      </div>

      {/* Main 8-Stage Progress Stepper */}
      <div
        style={{
          background: 'var(--white)',
          border: '1px solid var(--rule-mid)',
          borderRadius: 'var(--radius-sm)',
          padding: '20px',
          marginBottom: '20px'
        }}
      >
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '16px' }}>
          व्यवहार स्थिती: {activeTxn.id} · {activeTxn.commodityName} ({activeTxn.quantityQtl} क्विंटल)
        </div>

        {/* Stepper Timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))',
            gap: '8px',
            position: 'relative',
            marginBottom: '20px'
          }}
        >
          {statesOrder.map((step, idx) => {
            const isCompleted = idx < currStepIdx;
            const isCurrent = idx === currStepIdx;

            return (
              <div
                key={step.state}
                style={{
                  background: isCurrent
                    ? 'var(--band)'
                    : isCompleted
                    ? 'var(--paper)'
                    : 'var(--band)',
                  border: isCurrent
                    ? '2px solid var(--olive)'
                    : isCompleted
                    ? '1px solid var(--olive)'
                    : '1px solid var(--rule)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 8px',
                  textAlign: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>
                  {isCompleted ? '✓' : step.icon}
                </div>
                <div
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: isCurrent || isCompleted ? 700 : 500,
                    color: isCurrent ? 'var(--dark)' : isCompleted ? 'var(--dark)' : 'var(--charcoal-soft)',
                    lineHeight: 1.2
                  }}
                >
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Escrow Status Summary Banner */}
        <div
          style={{
            background: 'var(--band)',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
              <Lock size={15} color="var(--olive)" />
              <span>
                शासकीय एस्क्रो खात्यात सुरक्षित ठेव: <strong>₹{activeTxn.totalAmount.toLocaleString('en-IN')}</strong>
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-soft)', marginTop: 2 }}>
              खरेदीदार: {activeTxn.buyerCompany} ({activeTxn.buyerName}) · शेतकरी: {activeTxn.farmerName}
            </div>
          </div>

          {/* Stepper Advance Button for Demo Walkthrough */}
          {currStepIdx < statesOrder.length - 1 ? (
            <button onClick={handleNextStep} className="btn-primary" style={{ padding: '8px 16px' }}>
              <span>पुढील टप्प्यावर जा ({statesOrder[currStepIdx + 1].label})</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <span className="badge badge-olive" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              ✓ व्यवहार यशस्वीरीत्या पूर्ण व निधी वर्ग झाला
            </span>
          )}
        </div>
      </div>

      {/* Two Column Details: Logistics Tracking & Immutable Audit Log */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Logistics & Pickup Card */}
        <div
          style={{
            background: 'var(--white)',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid var(--rule)', paddingBottom: '8px' }}>
            <Truck size={18} color="var(--olive)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--charcoal)' }}>
              वाहतूक व शेतातून माल उचल तपशील
            </h3>
          </div>

          <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px 0', color: 'var(--charcoal-soft)' }}>नियोजित उचल तारीख:</td>
                <td style={{ padding: '6px 0', fontWeight: 600 }}>{activeTxn.pickupDate || 'नियोजित होत आहे'}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', color: 'var(--charcoal-soft)' }}>वाहतूकदार:</td>
                <td style={{ padding: '6px 0', fontWeight: 600 }}>{activeTxn.transporterName || 'सह्याद्री कृषी लॉजिस्टिक्स'}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', color: 'var(--charcoal-soft)' }}>ट्रॅकिंग क्रमांक:</td>
                <td style={{ padding: '6px 0', fontFamily: 'monospace' }}>{activeTxn.trackingNumber || 'TRK-NSK-99021'}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 0', color: 'var(--charcoal-soft)' }}>गुणवत्ता पडताळणी:</td>
                <td style={{ padding: '6px 0' }}>
                  <span className="badge badge-olive">Agmark Grade A उत्तीर्ण</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Immutable Audit Ledger Card (§7.6 TX-7) */}
        <div
          style={{
            background: 'var(--white)',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid var(--rule)', paddingBottom: '8px' }}>
            <Award size={18} color="var(--olive)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--charcoal)' }}>
              अखंडित ऑडिट नोंदवही (Immutable Audit Log)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: 220, overflowY: 'auto' }}>
            {activeTxn.auditTrail.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--band)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 10px',
                  fontSize: '0.78rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--charcoal-soft)', marginBottom: 2 }}>
                  <span>{entry.timestamp}</span>
                  <strong>{entry.actor}</strong>
                </div>
                <div style={{ color: 'var(--charcoal)', fontWeight: 500 }}>{entry.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Printable Formal Tax Invoice Modal */}
      {isInvoiceOpen && (
        <div className="modal-overlay" onClick={() => setIsInvoiceOpen(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: 680, padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: 'center', borderBottom: '2px solid var(--rule-mid)', paddingBottom: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--dark)' }}>
                महाराष्ट्र शासन मान्यताप्राप्त कृषी विक्री बिल (FARMER SALE INVOICE)
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>MandiSetu e-Invoice &amp; Settlement Bill</h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>
                बिल क्र.: {activeTxn.invoiceNumber} · तारीख: २१ सप्टेंबर २०२६
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px', fontSize: '0.85rem' }}>
              <div>
                <strong>विक्रेता शेतकरी:</strong>
                <div>{activeTxn.farmerName}</div>
                <div style={{ color: 'var(--charcoal-soft)' }}>पत्ता: पिंपळगाव बसवंत, जि. नाशिक</div>
              </div>
              <div>
                <strong>खरेदीदार कंपनी:</strong>
                <div>{activeTxn.buyerCompany}</div>
                <div style={{ color: 'var(--charcoal-soft)' }}>GSTIN: 27AAECM4451Q1ZK</div>
              </div>
            </div>

            <table className="mandi-table" style={{ marginBottom: '16px' }}>
              <thead>
                <tr>
                  <th>तपशील</th>
                  <th style={{ textAlign: 'right' }}>प्रमाण</th>
                  <th style={{ textAlign: 'right' }}>दर (₹/क्विंटल)</th>
                  <th style={{ textAlign: 'right' }}>एकूण रक्कम</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{activeTxn.commodityName}</td>
                  <td style={{ textAlign: 'right' }}>{activeTxn.quantityQtl} qtl</td>
                  <td style={{ textAlign: 'right' }}>₹{activeTxn.agreedPriceQtl.toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>₹{activeTxn.totalAmount.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => window.print()} className="btn-primary" style={{ padding: '6px 14px' }}>
                <Printer size={15} />
                <span>प्रिंट करा</span>
              </button>
              <button onClick={() => setIsInvoiceOpen(false)} className="btn-secondary" style={{ padding: '6px 14px' }}>
                बंद करा
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
