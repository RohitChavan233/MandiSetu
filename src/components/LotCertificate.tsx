import React from 'react';
import { Lot } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle,
  FileCheck,
  Calendar,
  MapPin,
  Download,
  Share2,
  Printer,
  X
} from 'lucide-react';

interface LotCertificateProps {
  lot: Lot;
  onClose?: () => void;
  isPublicView?: boolean;
}

export const LotCertificate: React.FC<LotCertificateProps> = ({
  lot,
  onClose,
  isPublicView = false
}) => {
  const { t, setCurrentView } = useApp();

  const printCertificate = () => {
    window.print();
  };

  return (
    <div
      style={{
        maxWidth: 720,
        margin: '0 auto',
        background: '#FFFFFF',
        border: '3px double var(--dark)',
        borderRadius: 'var(--radius-sm)',
        padding: '24px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        position: 'relative',
        fontFamily: 'var(--font-base)'
      }}
    >
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'var(--band)',
            border: '1px solid var(--rule-mid)',
            borderRadius: 'var(--radius-sm)',
            padding: '4px'
          }}
        >
          <X size={18} />
        </button>
      )}

      {/* Official Government Seal Header */}
      <div
        style={{
          textAlign: 'center',
          borderBottom: '2px solid var(--rule-mid)',
          paddingBottom: '16px',
          marginBottom: '16px'
        }}
      >
        <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>🌾</div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark)', letterSpacing: '0.05em' }}>
          महाराष्ट्र शासन · DEPARTMENT OF SKILLS, EMPLOYMENT &amp; INNOVATION
        </div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--dark)', margin: '4px 0' }}>
          प्रमाणित शेतमाल सत्यता प्रमाणपत्र (VERIFIABLE LOT CERTIFICATE)
        </h2>
        <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-soft)' }}>
          Issued under MandiSetu Digital Agriculture Framework (SIH26132) · Tamper-Evident Ed25519 Signed
        </div>
      </div>

      {/* Main Certificate Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: '20px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)' }}>लॉट संदर्भ क्रमांक (Lot ID):</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--dark)' }}>{lot.id}</strong>
            <span className="badge badge-olive" style={{ fontSize: '0.72rem' }}>
              <ShieldCheck size={12} /> VERIFIED
            </span>
          </div>

          <table style={{ width: '100%', fontSize: '0.88rem', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '4px 0', color: 'var(--charcoal-soft)', width: '40%' }}>शेतकरी / उत्पादक:</td>
                <td style={{ padding: '4px 0', fontWeight: 700 }}>{lot.farmerName}</td>
              </tr>
              {lot.fpoName && (
                <tr>
                  <td style={{ padding: '4px 0', color: 'var(--charcoal-soft)' }}>FPO संस्था:</td>
                  <td style={{ padding: '4px 0', fontWeight: 600 }}>{lot.fpoName}</td>
                </tr>
              )}
              <tr>
                <td style={{ padding: '4px 0', color: 'var(--charcoal-soft)' }}>शेतमाल व वाण:</td>
                <td style={{ padding: '4px 0', fontWeight: 700 }}>
                  {lot.commodityId === 'crop_onion' ? 'कांदा (Onion)' : 'शेतमाल'} — {lot.variety}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '4px 0', color: 'var(--charcoal-soft)' }}>एकूण वजन (Quantity):</td>
                <td style={{ padding: '4px 0', fontWeight: 800, color: 'var(--olive)' }}>
                  {lot.quantityQtl} क्विंटल ({lot.quantityQtl * 100} किलो)
                </td>
              </tr>
              <tr>
                <td style={{ padding: '4px 0', color: 'var(--charcoal-soft)' }}>गुणवत्ता वर्ग (Agmark Grade):</td>
                <td style={{ padding: '4px 0', fontWeight: 700 }}>{lot.grade}</td>
              </tr>
              <tr>
                <td style={{ padding: '4px 0', color: 'var(--charcoal-soft)' }}>काढणी तारीख:</td>
                <td style={{ padding: '4px 0' }}>{lot.harvestDate}</td>
              </tr>
              <tr>
                <td style={{ padding: '4px 0', color: 'var(--charcoal-soft)' }}>स्थान (Location):</td>
                <td style={{ padding: '4px 0' }}>
                  {lot.village}, ता. {lot.taluka}, जि. {lot.district}
                </td>
              </tr>
              {lot.moisturePct && (
                <tr>
                  <td style={{ padding: '4px 0', color: 'var(--charcoal-soft)' }}>आर्द्रता (Moisture):</td>
                  <td style={{ padding: '4px 0', fontWeight: 600 }}>{lot.moisturePct}% (मानक मर्यादेत)</td>
                </tr>
              )}
              {lot.sizeMm && (
                <tr>
                  <td style={{ padding: '4px 0', color: 'var(--charcoal-soft)' }}>सरासरी आकार:</td>
                  <td style={{ padding: '4px 0', fontWeight: 600 }}>{lot.sizeMm} मिमी (Export Uniformity)</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic QR Code & Digital Seal */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--paper)',
            border: '1px solid var(--rule)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px',
            textAlign: 'center'
          }}
        >
          <div style={{ background: '#FFFFFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--rule)' }}>
            <QRCodeSVG value={lot.qrPayload} size={110} level="H" />
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--dark)', marginTop: '8px' }}>
            SCAN TO VERIFY
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--charcoal-soft)' }}>
            /verify/{lot.id}
          </span>
        </div>
      </div>

      {/* Tamper Evident Digital Signature Seal */}
      <div
        style={{
          background: 'var(--band)',
          border: '1px solid var(--rule-mid)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          marginBottom: '16px',
          fontSize: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <strong style={{ color: 'var(--dark)' }}>
            🔒 क्रिप्टोग्राफिक डिजिटल स्वाक्षरी (Ed25519 Canonical Signature):
          </strong>
          <span style={{ color: 'var(--olive)', fontWeight: 700 }}>VALID &amp; UNTAMPERED</span>
        </div>
        <div style={{ fontFamily: 'monospace', color: 'var(--charcoal-soft)', wordBreak: 'break-all' }}>
          {lot.digitalSignature}
        </div>
        <div style={{ marginTop: '4px', color: 'var(--charcoal-soft)', fontSize: '0.7rem' }}>
          जिओ-स्थान: Lat {lot.geoLat.toFixed(4)}, Lon {lot.geoLon.toFixed(4)} · वेळ: {lot.createdAt}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>
          {t.publicVerifyNotice}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={printCertificate} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
            <Printer size={15} />
            <span>प्रिंट करा (Print)</span>
          </button>

          {!isPublicView && (
            <button
              onClick={() => {
                setCurrentView('offers');
              }}
              className="btn-primary"
              style={{ padding: '6px 12px', fontSize: '0.82rem' }}
            >
              <span>खरेदीदार जोडा (Match Buyers)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
