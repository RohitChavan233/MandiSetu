import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Dispute, DisputeOutcome } from '../types';
import {
  AlertTriangle,
  Scale,
  ShieldCheck,
  CheckCircle,
  FileText,
  Camera,
  XCircle,
  HelpCircle
} from 'lucide-react';

export const DisputeDesk: React.FC = () => {
  const { user, t, disputes, raiseDispute, resolveDispute } = useApp();

  const [isFilingOpen, setIsFilingOpen] = useState(false);
  const [reasonCategory, setReasonCategory] = useState<string>('गुणवत्ता निकषात तफावत (Quality Mismatch)');
  const [detailsText, setDetailsText] = useState<string>('');
  const [claimAmount, setClaimAmount] = useState<number>(15000);

  // Resolution modal state for Officer
  const [resolvingDisputeId, setResolvingDisputeId] = useState<string | null>(null);
  const [resolutionChoice, setResolutionChoice] = useState<DisputeOutcome>('partial_settlement');
  const [resolutionNotes, setResolutionNotes] = useState<string>('दोन्ही पक्षांचे म्हणणे व तपासणी अहवाल विचारात घेऊन ५०-५० तडजोड मंजूर करण्यात आली.');

  const handleSubmitDispute = (e: React.FormEvent) => {
    e.preventDefault();
    const newDisp: Dispute = {
      id: `DISP-2026-${Math.floor(100 + Math.random() * 900)}`,
      transactionId: 'TXN-MH-2026-7840',
      raisedBy: user.role === 'buyer' ? 'buyer' : 'farmer',
      raisedByName: user.name,
      reason: reasonCategory,
      details: detailsText,
      claimAmount,
      status: 'under_review',
      mediatorName: 'डॉ. आनंद पाटील (शासकीय तालुका कृषी अधिकारी)',
      mediatorRole: 'officer',
      createdAt: new Date().toLocaleString('en-IN')
    };

    raiseDispute(newDisp);
    setIsFilingOpen(false);
    setDetailsText('');
  };

  const handleResolveSubmit = (dispId: string) => {
    resolveDispute(dispId, resolutionChoice, resolutionNotes);
    setResolvingDisputeId(null);
  };

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--charcoal)' }}>
              ⚖️ {t.navOfficerDisputes} (Grievance &amp; Mediation Desk)
            </h2>
            <span className="badge badge-band">कायदेशीर लवाद प्रक्रिया</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-soft)', marginTop: 2 }}>
            गुणवत्ता, वाहतूक किंवा पेमेंट संबंधित तक्रारींचे शासकीय कृषी अधिकारी व FPO प्रतिनिधींद्वारे निपक्षपाती निवारण.
          </p>
        </div>

        <button onClick={() => setIsFilingOpen(true)} className="btn-primary">
          <AlertTriangle size={16} />
          <span>{t.raiseDispute}</span>
        </button>
      </div>

      {/* Disputes List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {disputes.length === 0 ? (
          <div
            style={{
              background: 'var(--white)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-sm)',
              padding: '30px',
              textAlign: 'center',
              color: 'var(--charcoal-soft)'
            }}
          >
            कोणतीही प्रलंबित तक्रार नाही. सर्व व्यवहार सुरळीत पार पडत आहेत.
          </div>
        ) : (
          disputes.map((disp) => {
            const isResolved = disp.status === 'resolved';

            return (
              <div
                key={disp.id}
                style={{
                  background: 'var(--white)',
                  border: isResolved ? '1px solid var(--olive)' : '1px solid var(--accent)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '18px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={isResolved ? 'badge badge-olive' : 'badge badge-band'}>
                        {isResolved ? '✓ तक्रार निकाली काढली' : '⚠️ सुनावणी व पडताळणी सुरू'}
                      </span>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--charcoal)' }}>
                        तक्रार ID: {disp.id}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--charcoal-soft)' }}>
                        व्यवहार संदर्भ: {disp.transactionId}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--charcoal)', marginTop: 6 }}>
                      कारण: {disp.reason}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-soft)' }}>दावा केलेली रक्कम:</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--rose)' }}>
                      ₹{disp.claimAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)', marginBottom: '12px' }}>
                  तपशील: "{disp.details}"
                </p>

                {/* Evidence Photo Preview if any */}
                {disp.evidencePhotoUrl && (
                  <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--charcoal-soft)' }}>
                    <Camera size={15} color="var(--olive)" />
                    <span>जिओ-टॅग पंचनामा फोटो संलग्न केला आहे</span>
                    <a
                      href={disp.evidencePhotoUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--olive)', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      फोटो पहा
                    </a>
                  </div>
                )}

                {/* Mediator Info & Resolution Log */}
                <div
                  style={{
                    background: 'var(--band)',
                    border: '1px solid var(--rule)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 14px',
                    fontSize: '0.82rem',
                    marginBottom: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>नियुक्त लवाद अधिकारी: <strong>{disp.mediatorName}</strong></span>
                    <span style={{ color: 'var(--charcoal-soft)' }}>दाखल: {disp.createdAt}</span>
                  </div>

                  {isResolved && disp.resolutionNotes && (
                    <div style={{ borderTop: '1px solid var(--rule-mid)', paddingTop: 6, marginTop: 6, color: 'var(--dark)' }}>
                      <strong>अधिकारी निकाल ({disp.resolvedAt}):</strong> {disp.resolutionNotes}
                    </div>
                  )}
                </div>

                {/* Officer Action */}
                {user.role === 'officer' && !isResolved && (
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <button
                      onClick={() => setResolvingDisputeId(disp.id)}
                      className="btn-primary"
                      style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                    >
                      <Scale size={15} />
                      <span>{t.settleDispute} (Mediate &amp; Settle)</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* File Dispute Modal */}
      {isFilingOpen && (
        <div className="modal-overlay" onClick={() => setIsFilingOpen(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: 560, padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ borderBottom: '2px solid var(--rule)', paddingBottom: '10px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>⚠️ {t.raiseDispute}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>
                शासकीय एस्क्रो खात्यातील रक्कम वादाचा निकाल लागेपर्यंत सुरक्षितपणे गोठवली जाईल.
              </p>
            </div>

            <form onSubmit={handleSubmitDispute}>
              <div style={{ marginBottom: '14px' }}>
                <label className="gov-label">{t.disputeReason}</label>
                <select
                  className="gov-input"
                  value={reasonCategory}
                  onChange={(e) => setReasonCategory(e.target.value)}
                >
                  <option value="गुणवत्ता निकषात तफावत (Quality Mismatch)">गुणवत्ता निकषात तफावत (Quality Mismatch)</option>
                  <option value="वजनात तफावत (Short Weight)">वजनात तफावत (Short Weight)</option>
                  <option value="वाहतूक विलंब व मालाची नासाडी (Delayed Pickup/Transit)">वाहतूक विलंब व मालाची नासाडी</option>
                  <option value="पेमेंट विलंबाबाबत आक्षेप (Payment Withheld)">पेमेंट विलंबाबाबत आक्षेप</option>
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label className="gov-label">तक्रारीचे सविस्तर वर्णन:</label>
                <textarea
                  className="gov-input"
                  rows={3}
                  value={detailsText}
                  onChange={(e) => setDetailsText(e.target.value)}
                  placeholder="उदा. ठरलेल्या निकषापेक्षा कांद्याचा आकार लहान व ओलावा जास्त आढळला..."
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="gov-label">दावा केलेली तफावत रक्कम (₹):</label>
                <input
                  type="number"
                  className="gov-input"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(Number(e.target.value))}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsFilingOpen(false)} className="btn-secondary">
                  रद्द करा
                </button>
                <button type="submit" className="btn-primary">
                  {t.submitDispute}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Officer Resolution Modal */}
      {resolvingDisputeId && (
        <div className="modal-overlay" onClick={() => setResolvingDisputeId(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: 560, padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ borderBottom: '2px solid var(--rule)', paddingBottom: '10px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>⚖️ शासकीय अधिकारी लवाद निकाल (Mediation Order)</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>
                तक्रार क्र.: {resolvingDisputeId} वर अंतिम निर्णय नोंदवा.
              </p>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label className="gov-label">निर्णय प्रकार (Settlement Decision):</label>
              <select
                className="gov-input"
                value={resolutionChoice}
                onChange={(e) => setResolutionChoice(e.target.value as DisputeOutcome)}
              >
                <option value="partial_settlement">दोन्ही बाजूंनी ५०-५० तडजोड (Partial Settlement)</option>
                <option value="release_to_farmer">शेतकऱ्याच्या बाजूने निकाल (Release 100% to Farmer)</option>
                <option value="refund_to_buyer">खरेदीदाराच्या बाजूने निकाल (Refund Claim to Buyer)</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="gov-label">शासकीय आदेश व स्पष्टीकरण नोंदवा:</label>
              <textarea
                className="gov-input"
                rows={3}
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => setResolvingDisputeId(null)} className="btn-secondary">
                रद्द
              </button>
              <button onClick={() => handleResolveSubmit(resolvingDisputeId)} className="btn-primary">
                आदेश जारी करा
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
