import React from 'react';
import { useApp } from '../context/AppContext';
import { Database, ShieldAlert, CheckCircle, ExternalLink, X } from 'lucide-react';

export const AboutDataModal: React.FC = () => {
  const { t, setCurrentView } = useApp();

  return (
    <div style={{ maxWidth: 880, margin: '20px auto', padding: '16px' }}>
      <div
        style={{
          background: 'var(--white)',
          border: '1px solid var(--rule-mid)',
          borderRadius: 'var(--radius-sm)',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ borderBottom: '2px solid var(--rule-mid)', paddingBottom: '12px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={22} color="var(--olive)" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--charcoal)' }}>
              {t.navAboutData} (Open Agriculture Data Transparency Sheet)
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-soft)', marginTop: 2 }}>
            MandiSetu व्यासपीठावर वापरल्या जाणाऱ्या सर्व माहिती स्त्रोतांची अधिकृतता आणि ताजेपणा.
          </p>
        </div>

        {/* Sources Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {/* AGMARKNET */}
          <div style={{ background: 'var(--band)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--dark)' }}>१. AGMARKNET</strong>
              <span className="badge badge-olive">LIVE API</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)', lineHeight: 1.4 }}>
              भारत सरकारचे कृषी विपणन व पाहणी संचालनालय (DMI). महाराष्ट्रातील ३१२ बाजार समित्यांचे दैनिक कमाल, किमान व सरासरी भाव आणि आवक आकडेवारी.
            </p>
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>
              अद्यतन वेळ: दररोज संध्याकाळी ६:०० वाजता
            </div>
          </div>

          {/* e-NAM */}
          <div style={{ background: 'var(--band)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--dark)' }}>२. e-NAM / MSAMB</strong>
              <span className="badge badge-olive">VERIFIED</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)', lineHeight: 1.4 }}>
              राष्ट्रीय कृषी बाजार (e-NAM) आणि महाराष्ट्र राज्य कृषी पणन मंडळ (MSAMB). गुणवत्ता तपासणी निकष व इलेक्ट्रॉनिक व्यापार माहिती.
            </p>
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>
              अद्यतन वेळ: दैनंदिन सौदे संपल्यावर
            </div>
          </div>

          {/* IMD Weather */}
          <div style={{ background: 'var(--band)', border: '1px solid var(--rule)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ fontSize: '1rem', color: 'var(--dark)' }}>३. IMD / Open-Meteo</strong>
              <span className="badge badge-olive">HOURLY SYNC</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--charcoal-soft)', lineHeight: 1.4 }}>
              भारतीय हवामान विभाग आणि उच्च अचूकतेचे स्थानिक तालुकास्तरीय पाऊस, तापमान व आर्द्रता अंदाज.
            </p>
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>
              अद्यतन वेळ: दर ६ तासांनी
            </div>
          </div>
        </div>

        {/* Honesty & Demonstration Disclosures (§10.1) */}
        <div
          style={{
            background: 'var(--band)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px',
            marginBottom: '20px'
          }}
        >
          <div style={{ fontWeight: 700, color: 'var(--rose)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <ShieldAlert size={18} />
            पारदर्शकता व डेमो डेटा खुलासा (SIH Prototype Disclaimer):
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal)', lineHeight: 1.5 }}>
            या प्रोटोटाइपमध्ये लासलगाव, पुणे, अहमदनगर व लातूर या प्रमुख बाजार समित्यांचे आजचे सौदे अधिकृत API वरून घेतले आहेत. ज्या दिवशी बाजार बंद असतो किंवा तांत्रिक अडचणींमुळे डेटा उपलब्ध नसतो, तिथे स्पष्टपणे <strong>"डेमो डेटा" (Demo Data)</strong> असा शिक्का लावला जातो, जेणेकरून कोणत्याही शेतकऱ्याची किंवा परीक्षकाची दिशाभूल होणार नाही.
          </p>
        </div>

        <button onClick={() => setCurrentView('prices')} className="btn-primary" style={{ padding: '8px 18px' }}>
          बाजारभाव फलकाकडे परत जा
        </button>
      </div>
    </div>
  );
};
