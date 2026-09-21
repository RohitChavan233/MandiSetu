import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  FileCheck,
  Activity,
  BarChart3,
  Users,
  AlertTriangle,
  Scale,
  RefreshCw,
  Server
} from 'lucide-react';

export const OfficerConsole: React.FC = () => {
  const {
    user,
    t,
    currentView,
    setCurrentView,
    pendingKycUsers,
    approveKyc,
    rejectKyc
  } = useApp();

  const [activeTab, setActiveTab] = useState<'kyc' | 'analytics' | 'pipeline'>('kyc');
  const [kycSuccessMsg, setKycSuccessMsg] = useState<string | null>(null);

  const handleApprove = (userId: string, name: string) => {
    approveKyc(userId);
    setKycSuccessMsg(`अर्जदार ${name} यांची KYC यशस्वीरीत्या मंजूर झाली व डिजिटल पडताळणी शिक्का जारी झाला.`);
    setTimeout(() => setKycSuccessMsg(null), 4000);
  };

  const handleReject = (userId: string, name: string) => {
    rejectKyc(userId, 'अपुऱ्या कागदपत्रांमुळे अर्ज नाकारला.');
    setKycSuccessMsg(`अर्जदार ${name} यांची KYC नाकारण्यात आली.`);
    setTimeout(() => setKycSuccessMsg(null), 4000);
  };

  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '16px' }}>
      {/* Officer Header */}
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
              🏛️ {t.roleOfficer} डॅशबोर्ड (Maharashtra State Command Console)
            </h2>
            <span className="badge badge-olive">GOVT OF MAHARASHTRA ADMIN</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)', marginTop: 2 }}>
            महाराष्ट्र राज्य नाविन्यता सोसायटी व कौशल्य विभाग · थेट शेतकरी बाजारपेठ नियंत्रण कक्ष
          </p>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setActiveTab('kyc')}
            className={activeTab === 'kyc' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '0.85rem' }}
          >
            <FileCheck size={15} />
            <span>{t.kycQueueTitle} ({pendingKycUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '0.85rem' }}
          >
            <BarChart3 size={15} />
            <span>{t.districtAnalytics}</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={activeTab === 'pipeline' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '0.85rem' }}
          >
            <Server size={15} />
            <span>{t.pipelineHealth}</span>
          </button>
        </div>
      </div>

      {kycSuccessMsg && (
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--olive)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 16px',
            marginBottom: '16px',
            color: 'var(--dark)',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle size={18} color="var(--olive)" />
          <span>{kycSuccessMsg}</span>
        </div>
      )}

      {/* Tab 1: KYC Queue */}
      {activeTab === 'kyc' && (
        <div>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--charcoal)' }}>
              प्रलंबित खरेदीदार व FPO केवायसी अर्ज ({pendingKycUsers.length})
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>
              DPDP Act २०२३ निकषांनुसार पडताळणी
            </span>
          </div>

          {pendingKycUsers.length === 0 ? (
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
              सर्व KYC अर्ज तपासले गेले आहेत. नवीन अर्ज प्रलंबित नाहीत.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {pendingKycUsers.map((applicant) => (
                <div
                  key={applicant.id}
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--rule-mid)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '14px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <strong style={{ fontSize: '1.1rem', color: 'var(--charcoal)' }}>
                        {applicant.businessName || applicant.fpoName || applicant.name}
                      </strong>
                      <span className="badge badge-band" style={{ fontSize: '0.72rem' }}>
                        {applicant.role === 'buyer' ? 'खरेदीदार' : 'FPO संस्था'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)', marginBottom: '8px' }}>
                      संपर्क व्यक्ती: <strong>{applicant.name}</strong> · फोन: {applicant.phone} · जिल्हा: {applicant.district}
                    </div>

                    {/* Verified Documents */}
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem' }}>
                      {applicant.gstin && (
                        <div style={{ background: 'var(--band)', padding: '4px 8px', borderRadius: '4px' }}>
                          GSTIN: <strong>{applicant.gstin}</strong> (MCA Active)
                        </div>
                      )}
                      {applicant.pan && (
                        <div style={{ background: 'var(--band)', padding: '4px 8px', borderRadius: '4px' }}>
                          PAN: <strong>{applicant.pan}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleApprove(applicant.id, applicant.name)}
                      className="btn-primary"
                      style={{ padding: '8px 16px' }}
                    >
                      <CheckCircle size={16} />
                      <span>{t.approve} (Approve)</span>
                    </button>

                    <button
                      onClick={() => handleReject(applicant.id, applicant.name)}
                      className="btn-secondary"
                      style={{ padding: '8px 12px', color: 'var(--rose)' }}
                    >
                      <XCircle size={16} />
                      <span>{t.reject}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: District Analytics */}
      {activeTab === 'analytics' && (
        <div>
          {/* Key KPI Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px',
              marginBottom: '20px'
            }}
          >
            <div style={{ background: 'var(--white)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>नोंदणीकृत शेतकरी संख्या</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--dark)' }}>
                ३८,५२०
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--olive)', marginTop: 2 }}>
                ↑ १२% मागील महिन्यापेक्षा वाढ
              </div>
            </div>

            <div style={{ background: 'var(--white)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>एकूण व्यवहार झालेला शेतमाल</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--dark)' }}>
                १,२४,८०० <span style={{ fontSize: '0.85rem' }}>क्विंटल</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-soft)', marginTop: 2 }}>
                मूल्य: ₹२८.४ कोटी
              </div>
            </div>

            <div style={{ background: 'var(--white)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>सरासरी भाव वाढ (Income Uplift)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--olive)' }}>
                +१४.२%
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--dark)', marginTop: 2 }}>
                स्थानिक मध्यस्थांपेक्षा जास्त भाव
              </div>
            </div>

            <div style={{ background: 'var(--white)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>सरासरी पेमेंट निपटारा वेळ</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--charcoal)' }}>
                ३८ <span style={{ fontSize: '0.85rem' }}>तास</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--olive)', marginTop: 2 }}>
                १००% शासकीय एस्क्रो सुरक्षित
              </div>
            </div>
          </div>

          {/* District Breakdown Table */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>
              जिल्हानिहाय शेतकरी सहभाग व व्यापार उलाढाल
            </h4>
            <table className="mandi-table">
              <thead>
                <tr>
                  <th>जिल्हा</th>
                  <th>प्रमुख शेतमाल</th>
                  <th style={{ textAlign: 'right' }}>सक्रिय शेतकरी</th>
                  <th style={{ textAlign: 'right' }}>सक्रिय लॉट्स</th>
                  <th style={{ textAlign: 'right' }}>व्यापार मूल्य</th>
                  <th style={{ textAlign: 'center' }}>तक्रार दर (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>नाशिक (Nashik)</strong></td>
                  <td>कांदा, टोमॅटो, डाळिंब</td>
                  <td style={{ textAlign: 'right' }}>१४,२८०</td>
                  <td style={{ textAlign: 'right' }}>४,१२०</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>₹१२.४ कोटी</td>
                  <td style={{ textAlign: 'center' }}><span className="badge badge-olive">०.८%</span></td>
                </tr>
                <tr>
                  <td><strong>अहमदनगर (Ahmednagar)</strong></td>
                  <td>सोयाबीन, कांदा, तूर</td>
                  <td style={{ textAlign: 'right' }}>११,२००</td>
                  <td style={{ textAlign: 'right' }}>२,९५०</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>₹८.१ कोटी</td>
                  <td style={{ textAlign: 'center' }}><span className="badge badge-olive">१.१%</span></td>
                </tr>
                <tr>
                  <td><strong>पुणे (Pune)</strong></td>
                  <td>टोमॅटो, भाजीपाला, गहू</td>
                  <td style={{ textAlign: 'right' }}>९,८४०</td>
                  <td style={{ textAlign: 'right' }}>३,०४०</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>₹६.८ कोटी</td>
                  <td style={{ textAlign: 'center' }}><span className="badge badge-olive">०.५%</span></td>
                </tr>
                <tr>
                  <td><strong>लातूर (Latur)</strong></td>
                  <td>सोयाबीन, तूर (डाळ)</td>
                  <td style={{ textAlign: 'right' }}>३,२००</td>
                  <td style={{ textAlign: 'right' }}>९४०</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>₹१.१ कोटी</td>
                  <td style={{ textAlign: 'center' }}><span className="badge badge-olive">०.३%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Data Ingestion Pipeline Health (§7.9) */}
      {activeTab === 'pipeline' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {/* AGMARKNET API */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '1rem' }}>AGMARKNET / OGD API</strong>
              <span className="badge badge-olive">HEALTHY · LIVE</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)', marginBottom: '8px' }}>
              दैनिक मंडी भाव व आवक सिंक
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-soft)', lineHeight: 1.4 }}>
              <div>शेवटचा यशस्वी सिंक: <strong>२१ सप्टेंबर २०२६ १७:३० IST</strong></div>
              <div>आज संकलित केलेल्या नोंदी: <strong>४,८१२ बाजार भाव</strong></div>
              <div>अचूकता व पडताळणी: <strong>९९.९४% (Outlier checks passed)</strong></div>
            </div>
          </div>

          {/* e-NAM / MSAMB */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '1rem' }}>e-NAM / MSAMB Gateway</strong>
              <span className="badge badge-olive">HEALTHY · LIVE</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)', marginBottom: '8px' }}>
              राज्यस्तरीय व्यापार व सौदे डेटा
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-soft)', lineHeight: 1.4 }}>
              <div>शेवटचा यशस्वी सिंक: <strong>२१ सप्टेंबर २०२६ १७:१५ IST</strong></div>
              <div>सक्रिय मंड्या: <strong>३१२ बाजार समित्या</strong></div>
            </div>
          </div>

          {/* IMD Weather API */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ fontSize: '1rem' }}>IMD / Open-Meteo Weather</strong>
              <span className="badge badge-olive">HEALTHY · LIVE</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)', marginBottom: '8px' }}>
              तालुकास्तरीय ५-दिवसीय पाऊस व तापमान
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-soft)', lineHeight: 1.4 }}>
              <div>शेवटचा यशस्वी सिंक: <strong>२१ सप्टेंबर २०२६ १५:०० IST</strong></div>
              <div>कृषी सल्ला मॉडेल्स: <strong>सक्रिय</strong></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
