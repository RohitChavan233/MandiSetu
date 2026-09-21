import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LOGISTICS_PROVIDERS } from '../data/mockData';
import { LogisticsProvider } from '../types';
import {
  Warehouse,
  Truck,
  Calculator,
  Phone,
  Star,
  CheckCircle,
  MapPin,
  Calendar,
  Send
} from 'lucide-react';

export const LogisticsDirectory: React.FC = () => {
  const { t } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'cold_storage' | 'transporter'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Freight Estimator calculator state
  const [distanceKm, setDistanceKm] = useState<number>(45);
  const [vehicleType, setVehicleType] = useState<'pickup' | 'eicher' | 'truck'>('pickup');
  const [lotQuantityQtl, setLotQuantityQtl] = useState<number>(50);

  // Booking Modal
  const [bookingProvider, setBookingProvider] = useState<LogisticsProvider | null>(null);
  const [bookingSlotDate, setBookingSlotDate] = useState<string>('2026-09-24');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Freight calculation:
  // Pickup (1.5T = 15 qtl): ₹30/km base
  // Eicher (3.5T = 35 qtl): ₹40/km base
  // Truck (10T = 100 qtl): ₹65/km base
  const ratePerKm = vehicleType === 'pickup' ? 32 : vehicleType === 'eicher' ? 42 : 68;
  const totalFreight = Math.round(distanceKm * ratePerKm);
  const freightPerQtl = Math.round(totalFreight / Math.max(1, lotQuantityQtl));

  const filteredProviders = LOGISTICS_PROVIDERS.filter((p) => {
    if (filterType !== 'all' && p.type !== filterType) return false;
    if (selectedDistrict !== 'all' && p.district !== selectedDistrict) return false;
    return true;
  });

  const handleBookSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingProvider) return;
    setBookingSuccess(`बुकिंग विनंती यशस्वी! ${bookingProvider.name} कडून स्लॉट तारीख ${bookingSlotDate} साठी पुष्टीकरण कॉल येईल.`);
    setBookingProvider(null);
    setTimeout(() => setBookingSuccess(null), 5000);
  };

  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '16px' }}>
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
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--charcoal)' }}>
              🚚 {t.navLogistics} (Cold Storage &amp; Transport Directory)
            </h2>
            <span className="badge badge-olive">शासकीय नोंदणीकृत</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-soft)', marginTop: 2 }}>
            स्थानिक कृषी शीतगृहे, गोदामे आणि मालवाहतूकदारांचे थेट संपर्क व अंतरानुसार भाडे अंदाज.
          </p>
        </div>
      </div>

      {bookingSuccess && (
        <div
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--olive)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            marginBottom: '16px',
            color: 'var(--dark)',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle size={18} color="var(--olive)" />
          <span>{bookingSuccess}</span>
        </div>
      )}

      {/* Distance-Based Freight Estimator Tool Card */}
      <div
        style={{
          background: 'var(--white)',
          border: '1px solid var(--rule-mid)',
          borderRadius: 'var(--radius-sm)',
          padding: '16px',
          marginBottom: '24px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Calculator size={18} color="var(--olive)" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--charcoal)' }}>
            वाहतूक खर्च अंदाज कॅल्क्युलेटर (Route Freight Estimator)
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
          <div>
            <label className="gov-label">शेतापासून अंतर (किमी):</label>
            <input
              type="number"
              className="gov-input"
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              min={1}
            />
          </div>

          <div>
            <label className="gov-label">गाडीचा प्रकार (Vehicle Type):</label>
            <select
              className="gov-input"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as any)}
            >
              <option value="pickup">पिकअप व्हॅन (१.५ टन / १५ क्विंटल)</option>
              <option value="eicher">आयशर / छोटा टेम्पो (३.५ टन / ३५ क्विंटल)</option>
              <option value="truck">मोठा ट्रक / १०-टायर (१० टन / १०० क्विंटल)</option>
            </select>
          </div>

          <div>
            <label className="gov-label">मालाचे एकूण वजन (क्विंटल):</label>
            <input
              type="number"
              className="gov-input"
              value={lotQuantityQtl}
              onChange={(e) => setLotQuantityQtl(Number(e.target.value))}
              min={1}
            />
          </div>

          <div
            style={{
              background: 'var(--band)',
              border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-soft)' }}>अपेक्षित एकूण भाडे:</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--olive)' }}>
              ₹{totalFreight.toLocaleString('en-IN')}{' '}
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--charcoal-soft)' }}>
                (~₹{freightPerQtl}/qtl)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Filter Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={() => setFilterType('all')}
          className={filterType === 'all' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '6px 12px', fontSize: '0.85rem' }}
        >
          सर्व सेवा (All)
        </button>
        <button
          onClick={() => setFilterType('cold_storage')}
          className={filterType === 'cold_storage' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '6px 12px', fontSize: '0.85rem' }}
        >
          <Warehouse size={15} />
          <span>शीतगृहे (Cold Storages)</span>
        </button>
        <button
          onClick={() => setFilterType('transporter')}
          className={filterType === 'transporter' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '6px 12px', fontSize: '0.85rem' }}
        >
          <Truck size={15} />
          <span>वाहतूकदार (Transporters)</span>
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label className="gov-label" style={{ marginBottom: 0 }}>जिल्हा:</label>
          <select
            className="gov-input"
            style={{ width: 140, padding: '4px 8px', fontSize: '0.85rem' }}
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="all">सर्व जिल्हे</option>
            <option value="Nashik">नाशिक</option>
            <option value="Pune">पुणे</option>
          </select>
        </div>
      </div>

      {/* Providers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {filteredProviders.map((prov) => (
          <div
            key={prov.id}
            style={{
              background: 'var(--white)',
              border: '1px solid var(--rule-mid)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                    {prov.name}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>
                    {prov.taluka}, जि. {prov.district}
                  </div>
                </div>

                <span className="badge badge-olive" style={{ fontSize: '0.72rem' }}>
                  ★ {prov.rating}
                </span>
              </div>

              <div
                style={{
                  background: 'var(--band)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px',
                  fontSize: '0.82rem',
                  marginBottom: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div>
                  क्षमता: <strong>{prov.capacity}</strong>
                </div>
                <div>
                  दर: <strong>{prov.rateDescription}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--charcoal-soft)' }}>
                  <Phone size={12} />
                  <span>{prov.phone}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setBookingProvider(prov)}
              className="btn-primary"
              style={{ width: '100%', padding: '8px', fontSize: '0.88rem' }}
            >
              <Calendar size={15} />
              <span>स्लॉट बुक करा (Book Slot)</span>
            </button>
          </div>
        ))}
      </div>

      {/* Slot Booking Modal */}
      {bookingProvider && (
        <div className="modal-overlay" onClick={() => setBookingProvider(null)}>
          <div
            className="modal-content"
            style={{ maxWidth: 480, padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ borderBottom: '2px solid var(--rule)', paddingBottom: '10px', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                {bookingProvider.type === 'cold_storage' ? 'शीतगृह' : 'वाहतूक'} स्लॉट आरक्षण
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--charcoal-soft)' }}>
                {bookingProvider.name}
              </p>
            </div>

            <form onSubmit={handleBookSlot}>
              <div style={{ marginBottom: '14px' }}>
                <label className="gov-label">आरक्षण तारीख निवडा:</label>
                <input
                  type="date"
                  className="gov-input"
                  value={bookingSlotDate}
                  onChange={(e) => setBookingSlotDate(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label className="gov-label">अपेक्षित वजन (क्विंटल):</label>
                <input
                  type="number"
                  className="gov-input"
                  defaultValue={50}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setBookingProvider(null)} className="btn-secondary">
                  रद्द
                </button>
                <button type="submit" className="btn-primary">
                  विनंती पाठवा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
