import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMMODITIES } from '../data/mockData';
import { Lot } from '../types';
import { LotCertificate } from './LotCertificate';
import {
  Mic,
  MicOff,
  Camera,
  CheckCircle,
  FileCheck,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const LotCreationModal: React.FC = () => {
  const { user, t, createLot, setCurrentView } = useApp();

  const [activeTab, setActiveTab] = useState<'voice' | 'form'>('voice');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechTranscript, setSpeechTranscript] = useState<string>('');

  // Structured form fields
  const [commodityId, setCommodityId] = useState<string>('crop_onion');
  const [variety, setVariety] = useState<string>('Nashik Red (Garva)');
  const [quantityQtl, setQuantityQtl] = useState<number>(50);
  const [grade, setGrade] = useState<string>('Grade A (Export 55mm+)');
  const [harvestDate, setHarvestDate] = useState<string>('2026-09-20');
  const [moisturePct, setMoisturePct] = useState<number>(8.5);
  const [sizeMm, setSizeMm] = useState<number>(56);
  const [askingPrice, setAskingPrice] = useState<number>(2380);

  // Completed lot state
  const [createdLot, setCreatedLot] = useState<Lot | null>(null);

  // Voice recording & simulation
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setSpeechTranscript('ऐकत आहे... (Listening in Marathi/Hindi)...');

      // Simulate voice capture and entity extraction
      setTimeout(() => {
        const transcript = '५० क्विंटल नाशिक लाल कांदा, ग्रेड ए, ओलावा ८.५ टक्के, काल काढणी केली, अपेक्षित भाव २४०० रुपये.';
        setSpeechTranscript(transcript);
        setIsRecording(false);

        // Auto-populate parsed entities
        setCommodityId('crop_onion');
        setVariety('Nashik Red (Garva)');
        setQuantityQtl(50);
        setGrade('Grade A (Export 55mm+)');
        setMoisturePct(8.5);
        setSizeMm(56);
        setAskingPrice(2400);
      }, 2500);
    }
  };

  const handlePublishLot = (e: React.FormEvent) => {
    e.preventDefault();
    const newLotId = `LOT-MH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLot: Lot = {
      id: newLotId,
      farmerId: user.id,
      farmerName: user.name,
      farmerPhone: user.phone,
      fpoName: user.fpoName,
      commodityId,
      variety,
      quantityQtl,
      grade,
      harvestDate,
      district: user.district || 'Nashik',
      taluka: user.taluka || 'Niphad',
      village: user.village || 'Pimpalgaon Baswant',
      askingPrice,
      moisturePct,
      sizeMm,
      status: 'listed',
      createdAt: new Date().toLocaleString('en-IN'),
      photoUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
      geoLat: 20.1742,
      geoLon: 74.0321,
      digitalSignature: `ed25519:${Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('')}`,
      qrPayload: `https://mandisetu.maharashtra.gov.in/verify/${newLotId}`,
      voiceTranscript: speechTranscript || undefined
    };

    createLot(newLot);
    setCreatedLot(newLot);
  };

  if (createdLot) {
    return (
      <div style={{ maxWidth: 840, margin: '20px auto', padding: '16px' }}>
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--olive)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={20} color="var(--olive)" />
            <span style={{ fontWeight: 700, color: 'var(--dark)' }}>
              लॉट यशस्वीरीत्या नोंदवला गेला व QR प्रमाणपत्र जारी झाले!
            </span>
          </div>
          <button onClick={() => setCreatedLot(null)} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
            दुसरा लॉट नोंदवा
          </button>
        </div>

        <LotCertificate lot={createdLot} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 780, margin: '20px auto', padding: '16px' }}>
      <div
        style={{
          background: 'var(--white)',
          border: '1px solid var(--rule)',
          borderRadius: 'var(--radius-sm)',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ borderBottom: '2px solid var(--rule-mid)', paddingBottom: '12px', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--charcoal)' }}>
            🏷️ {t.createLotTitle}
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-soft)' }}>
            आवाज किंवा फॉर्मद्वारे शेतमालाची गुणवत्ता व प्रमाण नोंदवून शासन-प्रमाणित डिजिटल QR प्रमाणपत्र मिळवा.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('voice')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              fontWeight: activeTab === 'voice' ? 700 : 500,
              background: activeTab === 'voice' ? 'var(--olive)' : 'var(--band)',
              color: activeTab === 'voice' ? '#FFF' : 'var(--charcoal)',
              border: '1px solid var(--rule-mid)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Mic size={16} />
            <span>{t.voiceLotTitle}</span>
          </button>

          <button
            onClick={() => setActiveTab('form')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              fontWeight: activeTab === 'form' ? 700 : 500,
              background: activeTab === 'form' ? 'var(--olive)' : 'var(--band)',
              color: activeTab === 'form' ? '#FFF' : 'var(--charcoal)',
              border: '1px solid var(--rule-mid)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileCheck size={16} />
            <span>{t.formLotTitle}</span>
          </button>
        </div>

        {/* Voice Section */}
        {activeTab === 'voice' && (
          <div
            style={{
              background: 'var(--band)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-sm)',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '20px'
            }}
          >
            <button
              onClick={toggleRecording}
              style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: isRecording ? 'var(--rose)' : 'var(--olive)',
                color: '#FFF',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isRecording ? '0 0 0 10px rgba(185, 28, 28, 0.2)' : '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease',
                marginBottom: '12px'
              }}
            >
              {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
            </button>

            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--charcoal)' }}>
              {isRecording ? 'रेकॉर्डिंग सुरू आहे... स्पष्ट आवाजात बोला' : 'माईक दाबा आणि बोला'}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)', marginTop: 4 }}>
              {t.voiceLotDesc}
            </p>

            {speechTranscript && (
              <div
                style={{
                  marginTop: '14px',
                  background: '#FFF',
                  border: '1px solid var(--rule-mid)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  fontSize: '0.86rem',
                  color: 'var(--dark)',
                  fontStyle: 'italic',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>
                  <Sparkles size={13} color="var(--accent)" />
                  स्वयंचलित मजकूर व माहिती निष्कर्षण:
                </div>
                "{speechTranscript}"
              </div>
            )}
          </div>
        )}

        {/* Structured Form Fields */}
        <form onSubmit={handlePublishLot}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
            {/* Commodity */}
            <div>
              <label className="gov-label">{t.commodity}:</label>
              <select
                className="gov-input"
                value={commodityId}
                onChange={(e) => setCommodityId(e.target.value)}
              >
                {COMMODITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Variety */}
            <div>
              <label className="gov-label">{t.cropVariety}</label>
              <input
                type="text"
                className="gov-input"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="gov-label">{t.inputQuantity}</label>
              <input
                type="number"
                className="gov-input"
                value={quantityQtl}
                onChange={(e) => setQuantityQtl(Number(e.target.value))}
                min={1}
                required
              />
            </div>

            {/* Agmark Grade */}
            <div>
              <label className="gov-label">{t.gradeScheme}</label>
              <select
                className="gov-input"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="Grade A (Export 55mm+)">{t.gradeA}</option>
                <option value="Grade B (Medium 40-50mm)">{t.gradeB}</option>
                <option value="Grade C (Small / Processing)">{t.gradeC}</option>
              </select>
            </div>

            {/* Harvest Date */}
            <div>
              <label className="gov-label">{t.harvestDate}</label>
              <input
                type="date"
                className="gov-input"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                required
              />
            </div>

            {/* Asking Price */}
            <div>
              <label className="gov-label">{t.askingPrice}</label>
              <input
                type="number"
                className="gov-input"
                value={askingPrice}
                onChange={(e) => setAskingPrice(Number(e.target.value))}
                step={50}
              />
            </div>

            {/* Moisture Content */}
            <div>
              <label className="gov-label">{t.moistureContent}</label>
              <input
                type="number"
                className="gov-input"
                value={moisturePct}
                onChange={(e) => setMoisturePct(Number(e.target.value))}
                step={0.1}
              />
            </div>

            {/* Bulb Size */}
            <div>
              <label className="gov-label">आकार (Size mm):</label>
              <input
                type="number"
                className="gov-input"
                value={sizeMm}
                onChange={(e) => setSizeMm(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Photo Geotag Preview */}
          <div
            style={{
              background: 'var(--band)',
              border: '1px dashed var(--rule-mid)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}
          >
            <Camera size={24} color="var(--olive)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.capturePhoto}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>
                GPS: 20.1742° N, 74.0321° E (पिंपळगाव बसवंत, नाशिक) · कॅमेरा वेळ आपोआप प्रमाणित केली जाते
              </div>
            </div>
            <span className="badge badge-olive" style={{ fontSize: '0.7rem' }}>
              GEOTAG VALID
            </span>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '11px', fontSize: '1rem' }}>
            <span>{t.publishLot}</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
