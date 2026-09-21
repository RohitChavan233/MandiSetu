import {
  Mandi,
  Commodity,
  PriceObservation,
  PriceHistoryPoint,
  ForecastResult,
  User,
  MatchedBuyer,
  Lot,
  Offer,
  Transaction,
  Dispute,
  LogisticsProvider,
  WeatherDay
} from '../types';

export const MANDIS: Mandi[] = [
  {
    id: 'mandi_lasalgaon',
    name: 'Lasalgaon APMC',
    nameMr: 'लासलगाव बाजार समिती',
    nameHi: 'लासलगांव एपीएमसी',
    district: 'Nashik',
    districtMr: 'नाशिक',
    lat: 20.1444,
    lon: 74.2253,
    isAPMC: true
  },
  {
    id: 'mandi_pune',
    name: 'Pune APMC (Gultekdi)',
    nameMr: 'पुणे बाजार समिती (गुलटेकडी)',
    nameHi: 'पुणे एपीएमसी (गुलटेकड़ी)',
    district: 'Pune',
    districtMr: 'पुणे',
    lat: 18.4975,
    lon: 73.8642,
    isAPMC: true
  },
  {
    id: 'mandi_ahmednagar',
    name: 'Ahmednagar APMC',
    nameMr: 'अहमदनगर बाजार समिती',
    nameHi: 'अहमदनगर एपीएमसी',
    district: 'Ahmednagar',
    districtMr: 'अहमदनगर',
    lat: 19.0952,
    lon: 74.7496,
    isAPMC: true
  },
  {
    id: 'mandi_latur',
    name: 'Latur APMC',
    nameMr: 'लातूर बाजार समिती',
    nameHi: 'लातूर एपीएमसी',
    district: 'Latur',
    districtMr: 'लातूर',
    lat: 18.4088,
    lon: 76.5604,
    isAPMC: true
  },
  {
    id: 'mandi_vashi',
    name: 'Navi Mumbai APMC (Vashi)',
    nameMr: 'नवी मुंबई बाजार समिती (वाशी)',
    nameHi: 'नवी मुंबई एपीएमसी (वाशी)',
    district: 'Thane',
    districtMr: 'ठाणे',
    lat: 19.0771,
    lon: 73.0033,
    isAPMC: true
  },
  {
    id: 'mandi_nagpur',
    name: 'Nagpur APMC (Kalamna)',
    nameMr: 'नागपूर बाजार समिती (कळमना)',
    nameHi: 'नागपुर एपीएमसी (कलमना)',
    district: 'Nagpur',
    districtMr: 'नागपूर',
    lat: 21.1738,
    lon: 79.1352,
    isAPMC: true
  },
  {
    id: 'mandi_kolhapur',
    name: 'Kolhapur APMC',
    nameMr: 'कोल्हापूर बाजार समिती',
    nameHi: 'कोल्हापुर एपीएमसी',
    district: 'Kolhapur',
    districtMr: 'कोल्हापूर',
    lat: 16.705,
    lon: 74.2433,
    isAPMC: true
  }
];

export const COMMODITIES: Commodity[] = [
  {
    id: 'crop_onion',
    code: 'ONION',
    nameEn: 'Onion (कांदा)',
    nameMr: 'कांदा',
    nameHi: 'प्याज',
    varieties: ['Nashik Red', 'Garva', 'Pol / Kharif', 'White Onion'],
    grades: ['Grade A (Export 55mm+)', 'Grade B (Medium 40-50mm)', 'Grade C (Small/Golta)'],
    msp: 0, // No MSP for onion; market driven
    standardUnit: '₹/quintal',
    icon: '🧅'
  },
  {
    id: 'crop_tomato',
    code: 'TOMATO',
    nameEn: 'Tomato (टोमॅटो)',
    nameMr: 'टोमॅटो',
    nameHi: 'टमाटर',
    varieties: ['Vaibhav', 'Hybrid-Abhinav', 'Desi Regular'],
    grades: ['Grade A (Firm Red)', 'Grade B (Semi-ripe)', 'Grade C (Processing)'],
    msp: 0,
    standardUnit: '₹/quintal',
    icon: '🍅'
  },
  {
    id: 'crop_soybean',
    code: 'SOYBEAN',
    nameEn: 'Soybean (सोयाबीन)',
    nameMr: 'सोयाबीन',
    nameHi: 'सोयाबीन',
    varieties: ['JS-335', 'Phule Kalyani (DS-228)', 'MACS-1188'],
    grades: ['FAQ (Moisture < 10%)', 'Grade B (Moisture 10-12%)', 'Sub-standard'],
    msp: 4892, // Official MSP ₹4,892/qtl
    standardUnit: '₹/quintal',
    icon: '🌱'
  },
  {
    id: 'crop_tur',
    code: 'TUR',
    nameEn: 'Tur / Pigeon Pea (तूर)',
    nameMr: 'तूर',
    nameHi: 'अरहर / तूर',
    varieties: ['Maruti (ICP-8863)', 'Asha (ICPL-87119)', 'White Tur'],
    grades: ['Grade A (Bold grain)', 'Grade B (Standard)', 'Grade C'],
    msp: 7550, // Official MSP ₹7,550/qtl
    standardUnit: '₹/quintal',
    icon: '🌾'
  },
  {
    id: 'crop_wheat',
    code: 'WHEAT',
    nameEn: 'Wheat (गहू)',
    nameMr: 'गहू',
    nameHi: 'गेहूं',
    varieties: ['Lokwan', 'Sharbati', 'MACS-6222'],
    grades: ['Grade A (Sharbati Lustre)', 'Grade B (Lokwan Mill)', 'Grade C (Feed)'],
    msp: 2425, // Official MSP ₹2,425/qtl
    standardUnit: '₹/quintal',
    icon: '🌾'
  },
  {
    id: 'crop_pomegranate',
    code: 'POMEGRANATE',
    nameEn: 'Pomegranate (डाळिंब)',
    nameMr: 'डाळिंब',
    nameHi: 'अनार',
    varieties: ['Bhagwa (Sindhuri)', 'Arakta', 'Ganesh'],
    grades: ['Super Grade (350g+ ruby arils)', 'Grade A (250-350g)', 'Grade B (150-250g)'],
    msp: 0,
    standardUnit: '₹/quintal',
    icon: '🍎'
  }
];

export const CURRENT_PRICES: PriceObservation[] = [
  {
    id: 'price_1',
    commodityId: 'crop_onion',
    mandiId: 'mandi_lasalgaon',
    date: '2026-09-21',
    minPrice: 1650,
    modalPrice: 2280,
    maxPrice: 2620,
    arrivalsQtl: 18450,
    change24h: 3.4,
    source: 'AGMARKNET (API Live)',
    updatedAt: '21 Sep 2026 17:30 IST',
    isDemo: false
  },
  {
    id: 'price_2',
    commodityId: 'crop_onion',
    mandiId: 'mandi_pune',
    date: '2026-09-21',
    minPrice: 1800,
    modalPrice: 2450,
    maxPrice: 2800,
    arrivalsQtl: 12300,
    change24h: 2.1,
    source: 'AGMARKNET (API Live)',
    updatedAt: '21 Sep 2026 17:15 IST',
    isDemo: false
  },
  {
    id: 'price_3',
    commodityId: 'crop_onion',
    mandiId: 'mandi_ahmednagar',
    date: '2026-09-21',
    minPrice: 1550,
    modalPrice: 2150,
    maxPrice: 2480,
    arrivalsQtl: 9200,
    change24h: -1.2,
    source: 'AGMARKNET (API Live)',
    updatedAt: '21 Sep 2026 16:45 IST',
    isDemo: false
  },
  {
    id: 'price_4',
    commodityId: 'crop_onion',
    mandiId: 'mandi_vashi',
    date: '2026-09-21',
    minPrice: 2100,
    modalPrice: 2750,
    maxPrice: 3200,
    arrivalsQtl: 14600,
    change24h: 4.8,
    source: 'e-NAM / MSAMB',
    updatedAt: '21 Sep 2026 17:00 IST',
    isDemo: false
  },
  {
    id: 'price_5',
    commodityId: 'crop_tomato',
    mandiId: 'mandi_pune',
    date: '2026-09-21',
    minPrice: 1200,
    modalPrice: 1850,
    maxPrice: 2400,
    arrivalsQtl: 8400,
    change24h: -4.5,
    source: 'AGMARKNET',
    updatedAt: '21 Sep 2026 17:15 IST',
    isDemo: false
  },
  {
    id: 'price_6',
    commodityId: 'crop_tomato',
    mandiId: 'mandi_lasalgaon',
    date: '2026-09-21',
    minPrice: 1050,
    modalPrice: 1620,
    maxPrice: 2100,
    arrivalsQtl: 4200,
    change24h: -2.8,
    source: 'AGMARKNET',
    updatedAt: '21 Sep 2026 17:30 IST',
    isDemo: false
  },
  {
    id: 'price_7',
    commodityId: 'crop_soybean',
    mandiId: 'mandi_latur',
    date: '2026-09-21',
    minPrice: 4650,
    modalPrice: 4950,
    maxPrice: 5120,
    arrivalsQtl: 24500,
    change24h: 0.8,
    source: 'AGMARKNET',
    updatedAt: '21 Sep 2026 16:30 IST',
    isDemo: false
  },
  {
    id: 'price_8',
    commodityId: 'crop_soybean',
    mandiId: 'mandi_ahmednagar',
    date: '2026-09-21',
    minPrice: 4500,
    modalPrice: 4820,
    maxPrice: 4980,
    arrivalsQtl: 6800,
    change24h: 0.2,
    source: 'AGMARKNET',
    updatedAt: '21 Sep 2026 16:45 IST',
    isDemo: false
  },
  {
    id: 'price_9',
    commodityId: 'crop_tur',
    mandiId: 'mandi_latur',
    date: '2026-09-21',
    minPrice: 9200,
    modalPrice: 10400,
    maxPrice: 11200,
    arrivalsQtl: 5600,
    change24h: 1.5,
    source: 'AGMARKNET',
    updatedAt: '21 Sep 2026 16:30 IST',
    isDemo: false
  },
  {
    id: 'price_10',
    commodityId: 'crop_wheat',
    mandiId: 'mandi_nagpur',
    date: '2026-09-21',
    minPrice: 2650,
    modalPrice: 2950,
    maxPrice: 3300,
    arrivalsQtl: 7800,
    change24h: -0.5,
    source: 'AGMARKNET',
    updatedAt: '21 Sep 2026 15:50 IST',
    isDemo: false
  },
  {
    id: 'price_11',
    commodityId: 'crop_pomegranate',
    mandiId: 'mandi_kolhapur',
    date: '2026-09-21',
    minPrice: 8500,
    modalPrice: 12500,
    maxPrice: 16500,
    arrivalsQtl: 1400,
    change24h: 5.2,
    source: 'e-NAM',
    updatedAt: '21 Sep 2026 16:10 IST',
    isDemo: false
  }
];

// 30-Day Historical Timeseries Generator
export const generateHistory = (basePrice: number, msp: number = 0): PriceHistoryPoint[] => {
  const points: PriceHistoryPoint[] = [];
  const today = new Date('2026-09-21');
  
  for (let i = 30; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    
    // Controlled seasonal fluctuation
    const factor = Math.sin(i / 4.5) * 120 + Math.cos(i / 2.2) * 60 + ((30 - i) * 15);
    const modal = Math.round(basePrice - 180 + factor);
    const min = Math.round(modal * 0.78);
    const max = Math.round(modal * 1.16);
    const arrivals = Math.round(14000 + Math.cos(i / 3) * 4500);

    points.push({
      date: dateStr,
      modalPrice: modal,
      minPrice: min,
      maxPrice: max,
      arrivalsQtl: arrivals,
      msp: msp > 0 ? msp : undefined
    });
  }
  return points;
};

export const ONION_HISTORY = generateHistory(2280, 0);
export const SOYBEAN_HISTORY = generateHistory(4950, 4892);
export const TUR_HISTORY = generateHistory(10400, 7550);

// 14-Day Quantile Forecast Distribution (P10, P50, P90)
export const ONION_FORECAST: ForecastResult = {
  commodityId: 'crop_onion',
  mandiId: 'mandi_lasalgaon',
  currentPrice: 2280,
  horizonDays: 14,
  backtestMAPE: 6.2,
  pinballLoss: 14.8,
  coverage80Pct: 84.5,
  confidence: 'high',
  modelVersion: 'LightGBM-QRF-v2.4.1 (Lagged Arrivals + Festivals + Rainfall)',
  generatedAt: '21 Sep 2026 17:45 IST',
  bands: [
    { day: 'Day 1', dateStr: '22 Sep', p10: 2240, p50: 2310, p90: 2380 },
    { day: 'Day 2', dateStr: '23 Sep', p10: 2260, p50: 2340, p90: 2420 },
    { day: 'Day 3', dateStr: '24 Sep', p10: 2290, p50: 2390, p90: 2490 },
    { day: 'Day 4', dateStr: '25 Sep', p10: 2310, p50: 2430, p90: 2540 },
    { day: 'Day 5', dateStr: '26 Sep', p10: 2340, p50: 2470, p90: 2600 },
    { day: 'Day 6', dateStr: '27 Sep', p10: 2360, p50: 2510, p90: 2650 },
    { day: 'Day 7', dateStr: '28 Sep', p10: 2390, p50: 2560, p90: 2710 },
    { day: 'Day 8', dateStr: '29 Sep', p10: 2410, p50: 2600, p90: 2770 },
    { day: 'Day 9', dateStr: '30 Sep', p10: 2440, p50: 2640, p90: 2830 },
    { day: 'Day 10', dateStr: '01 Oct', p10: 2460, p50: 2690, p90: 2890 },
    { day: 'Day 11', dateStr: '02 Oct', p10: 2480, p50: 2730, p90: 2950 },
    { day: 'Day 12', dateStr: '03 Oct', p10: 2500, p50: 2770, p90: 3010 },
    { day: 'Day 13', dateStr: '04 Oct', p10: 2510, p50: 2800, p90: 3060 },
    { day: 'Day 14', dateStr: '05 Oct', p10: 2520, p50: 2820, p90: 3100 }
  ]
};

// Demo Users for the 4 Key Roles
export const DEMO_USERS: Record<string, User> = {
  farmer: {
    id: 'usr_sunil_farmer',
    name: 'सुनील तात्याराव पाटील (Sunil Patil)',
    phone: '9822451080',
    role: 'farmer',
    language: 'mr',
    kycStatus: 'verified',
    district: 'Nashik',
    taluka: 'Niphad',
    village: 'Pimpalgaon Baswant',
    crops: ['Onion', 'Tomato'],
    landSizeAcres: 5.5
  },
  fpo: {
    id: 'usr_vaishali_fpo',
    name: 'वैशाली देशमुख (Vaishali Deshmukh)',
    phone: '9423189022',
    email: 'contact@sahaydriagro-fpo.in',
    role: 'fpo',
    language: 'mr',
    kycStatus: 'verified',
    district: 'Ahmednagar',
    taluka: 'Sangamner',
    fpoName: 'सह्याद्री शेतकरी उत्पादक कंपनी लि. (120 सभासद)',
    crops: ['Soybean', 'Tur', 'Onion']
  },
  buyer: {
    id: 'usr_rakesh_buyer',
    name: 'राकेश मेहता (Rakesh Mehta)',
    phone: '9820011234',
    email: 'procurement@maharashtrafoods.co.in',
    role: 'buyer',
    language: 'en',
    kycStatus: 'verified',
    district: 'Pune',
    businessName: 'Maharashtra Agri Foods & Export Pvt Ltd',
    gstin: '27AAECM4451Q1ZK',
    pan: 'AAECM4451Q',
    trustScore: 94
  },
  officer: {
    id: 'usr_patil_officer',
    name: 'डॉ. आनंद पाटील (Dr. A. Patil, IAS)',
    phone: '022-22874100',
    email: 'officer.agri@maharashtra.gov.in',
    role: 'officer',
    language: 'en',
    kycStatus: 'verified',
    district: 'Mumbai / State Headquarters'
  }
};

// Seeded Matched Buyers with Transparent Bayesian Trust Score Breakdown
export const MATCHED_BUYERS: MatchedBuyer[] = [
  {
    id: 'buyer_1',
    name: 'राकेश मेहता (Procurement Head)',
    companyName: 'सह्याद्री अ‍ॅग्रो फूड्स (Pune)',
    district: 'Pune',
    distanceKm: 42,
    bidPriceQtl: 2350,
    preferredGrade: 'Grade A',
    demandedQuantityQtl: 80,
    tags: ['कांदा ग्रेड A खरेदीदार', '४२ किमी अंतर', '४८ तासांत खात्रीशीर बिलिंग'],
    trustScore: {
      totalScore: 94,
      isNewBuyer: false,
      completedTransactions: 38,
      onTimePaymentRate: 97,
      qualityAcceptanceRate: 95,
      disputeFreeRate: 98,
      kycTier: 3
    }
  },
  {
    id: 'buyer_2',
    name: 'प्रशांत चोखानी (Wholesaler)',
    companyName: 'चोखानी कमोडिटीज (Vashi APMC)',
    district: 'Navi Mumbai',
    distanceKm: 148,
    bidPriceQtl: 2420,
    preferredGrade: 'Grade A',
    demandedQuantityQtl: 120,
    tags: ['मोठी खरेदी', 'वाशी थेट निर्यात', '२४ तासांत एस्क्रो पेमेंट'],
    trustScore: {
      totalScore: 89,
      isNewBuyer: false,
      completedTransactions: 19,
      onTimePaymentRate: 92,
      qualityAcceptanceRate: 90,
      disputeFreeRate: 94,
      kycTier: 3
    }
  },
  {
    id: 'buyer_3',
    name: 'समीर खान (Local Retail Aggregator)',
    companyName: 'ग्रीन फ्रेश व्हेंडर्स (Nashik)',
    district: 'Nashik',
    distanceKm: 16,
    bidPriceQtl: 2280,
    preferredGrade: 'Grade B',
    demandedQuantityQtl: 40,
    tags: ['स्थानिक व्यापारी', '१६ किमी अंतर', 'शेतकऱ्याकडून थेट उचल'],
    trustScore: {
      totalScore: 78,
      isNewBuyer: true,
      completedTransactions: 3,
      onTimePaymentRate: 85,
      qualityAcceptanceRate: 82,
      disputeFreeRate: 100,
      kycTier: 2
    }
  }
];

// Seeded Produce Lots with Verifiable Cryptographic Signatures
export const SEEDED_LOTS: Lot[] = [
  {
    id: 'LOT-MH-2026-0841',
    farmerId: 'usr_sunil_farmer',
    farmerName: 'सुनील पाटील (Sunil Patil)',
    farmerPhone: '9822451080',
    commodityId: 'crop_onion',
    variety: 'Nashik Red (Garva)',
    quantityQtl: 50,
    grade: 'Grade A (Export 55mm+)',
    harvestDate: '2026-09-18',
    district: 'Nashik',
    taluka: 'Niphad',
    village: 'Pimpalgaon Baswant',
    askingPrice: 2400,
    moisturePct: 8.2,
    sizeMm: 58,
    status: 'offer_received',
    createdAt: '2026-09-19 10:30 IST',
    photoUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
    geoLat: 20.1742,
    geoLon: 74.0321,
    digitalSignature: 'ed25519:7a8f9c2d1e4b3a5f6e8d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f',
    qrPayload: 'https://mandisetu.maharashtra.gov.in/verify/LOT-MH-2026-0841',
    voiceTranscript: '५० क्विंटल नाशिक लाल कांदा, ग्रेड ए, ओलावा ८ टक्के, काल काढणी'
  },
  {
    id: 'LOT-MH-2026-0842',
    farmerId: 'usr_vaishali_fpo',
    farmerName: 'सह्याद्री शेतकरी उत्पादक कंपनी',
    farmerPhone: '9423189022',
    fpoName: 'सह्याद्री FPO (120 शेतकरी)',
    commodityId: 'crop_soybean',
    variety: 'JS-335 (पिवळा)',
    quantityQtl: 150,
    grade: 'FAQ (Moisture < 10%)',
    harvestDate: '2026-09-17',
    district: 'Ahmednagar',
    taluka: 'Sangamner',
    village: 'Gunjalwadi',
    askingPrice: 5100,
    moisturePct: 9.5,
    status: 'sold',
    createdAt: '2026-09-18 14:15 IST',
    photoUrl: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=600&auto=format&fit=crop&q=80',
    geoLat: 19.5761,
    geoLon: 74.2091,
    digitalSignature: 'ed25519:3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b',
    qrPayload: 'https://mandisetu.maharashtra.gov.in/verify/LOT-MH-2026-0842'
  }
];

// Seeded Offers
export const SEEDED_OFFERS: Offer[] = [
  {
    id: 'OFFER-2026-309',
    lotId: 'LOT-MH-2026-0841',
    buyerId: 'usr_rakesh_buyer',
    buyerName: 'राकेश मेहता',
    buyerCompany: 'सह्याद्री अ‍ॅग्रो फूड्स',
    buyerPhone: '9820011234',
    buyerTrustScore: 94,
    offeredPriceQtl: 2350,
    quantityQtl: 50,
    totalAmount: 117500,
    deliveryTerms: 'खेत खळ्यावरून स्वतःची गाडी पाठवून उचल (Farmgate pickup)',
    paymentTerms: 'शासकीय एस्क्रो खात्यात १००% रक्कम अगोदर जमा (Escrow Locked)',
    expiresAt: '22 Sep 2026 18:00 IST',
    status: 'received',
    createdAt: '21 Sep 2026 11:20 IST'
  }
];

// Seeded Active Transaction in 8-Stage Escrow Flow
export const SEEDED_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-MH-2026-7840',
    lotId: 'LOT-MH-2026-0841',
    offerId: 'OFFER-2026-309',
    farmerId: 'usr_sunil_farmer',
    farmerName: 'सुनील पाटील',
    buyerId: 'usr_rakesh_buyer',
    buyerName: 'राकेश मेहता',
    buyerCompany: 'सह्याद्री अ‍ॅग्रो फूड्स',
    commodityName: 'Nashik Red Onion (Grade A)',
    quantityQtl: 50,
    agreedPriceQtl: 2350,
    totalAmount: 117500,
    escrowStatus: 'locked',
    currentState: 'escrow_locked',
    pickupDate: '23 Sep 2026 सकाळी १० वाजता',
    transporterName: 'सह्याद्री कृषी लॉजिस्टिक्स (MH-15-EG-4421)',
    trackingNumber: 'TRK-NSK-99021',
    createdAt: '21 Sep 2026 14:00 IST',
    invoiceNumber: 'INV-MS-2026-0921-88',
    auditTrail: [
      {
        state: 'offer_accepted',
        timestamp: '21 Sep 2026 13:45 IST',
        actor: 'सुनील पाटील (शेतकरी)',
        note: 'शेतकऱ्याने ₹२,३५०/क्विंटल प्रमाणे ५० क्विंटलची ऑफर स्वीकारली.'
      },
      {
        state: 'escrow_locked',
        timestamp: '21 Sep 2026 14:00 IST',
        actor: 'शासकीय एस्क्रो गेटवे (MSIS Escrow)',
        note: 'खरेदीदाराने ₹१,१७,५०० रक्कम एस्क्रोमध्ये सुरक्षित जमा केली. व्यवहार कोड: ESC-77291.'
      }
    ]
  }
];

// Seeded Dispute for Officer Mediation Demo
export const SEEDED_DISPUTES: Dispute[] = [
  {
    id: 'DISP-2026-104',
    transactionId: 'TXN-MH-2026-7712',
    raisedBy: 'buyer',
    raisedByName: 'अग्रवाल ट्रेडिंग कंपनी (पुणे)',
    reason: 'आर्द्रता व लहान आकाराचे प्रमाण ठरलेल्या निकषापेक्षा जास्त (Quality Mismatch)',
    details: 'लॉटमध्ये ग्रेड ए (५५ मिमी) सांगण्यात आला होता, प्रत्यक्षात ३०% माल ४० मिमीचा आढळला.',
    evidencePhotoUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
    claimAmount: 18000,
    status: 'under_review',
    mediatorName: 'डॉ. आनंद पाटील (तालुका कृषी अधिकारी, निफाड)',
    mediatorRole: 'officer',
    createdAt: '20 Sep 2026 16:30 IST'
  }
];

// Seeded Cold Storage & Transporters
export const LOGISTICS_PROVIDERS: LogisticsProvider[] = [
  {
    id: 'prov_1',
    name: 'निफाड तालुका कोल्ड स्टोरेज व वेअरहाऊस',
    type: 'cold_storage',
    district: 'Nashik',
    taluka: 'Niphad',
    capacity: '५,००० टन उपलब्ध (कांदा व फळे)',
    rateDescription: '₹५५ प्रति क्विंटल दर महिना',
    phone: '02550-241200',
    rating: 4.8,
    verified: true
  },
  {
    id: 'prov_2',
    name: 'सह्याद्री अ‍ॅग्रो व्हेंचर्स शीतगृह',
    type: 'cold_storage',
    district: 'Nashik',
    taluka: 'Dindori',
    capacity: '१०,००० टन सीए कोल्ड स्टोरेज',
    rateDescription: '₹६० प्रति क्विंटल दर महिना',
    phone: '02557-222800',
    rating: 4.9,
    verified: true
  },
  {
    id: 'prov_3',
    name: 'महाराष्ट्र किसान ट्रान्सपोर्ट नेटवर्क (१०-टायर व पिकअप)',
    type: 'transporter',
    district: 'Nashik',
    taluka: 'Panchavati',
    capacity: '५०+ पिकअप (१.५ टन) व आयशर (३.५ टन)',
    rateDescription: '₹३५ प्रति किलोमीटर (स्थानिक) / ₹२८ (लांब पल्ला)',
    phone: '9822019944',
    rating: 4.7,
    verified: true
  },
  {
    id: 'prov_4',
    name: 'पुणे-नाशिक कृषी एक्स्प्रेस लॉजिस्टिक्स',
    type: 'transporter',
    district: 'Pune',
    taluka: 'Haveli',
    capacity: '२० रेफ्रिजरेटेड कंटेनर व्हॅन',
    rateDescription: '₹४२ प्रति किलोमीटर (शीत साखळी)',
    phone: '9881023311',
    rating: 4.9,
    verified: true
  }
];

// 5-Day Taluka Weather Strip (IMD / Open-Meteo Integration)
export const TALUKA_WEATHER: WeatherDay[] = [
  {
    dateStr: '21 Sep',
    dayName: 'आज',
    tempMax: 31,
    tempMin: 22,
    rainfallMm: 2.1,
    humidityPct: 68,
    condition: 'अंशतः ढगाळ',
    agriAlert: 'कांदा काढणी व सुकवणीसाठी हवामान अनुकूल आहे.'
  },
  {
    dateStr: '22 Sep',
    dayName: 'उद्या',
    tempMax: 32,
    tempMin: 23,
    rainfallMm: 0,
    humidityPct: 62,
    condition: 'निरभ्र सूर्यप्रकाश'
  },
  {
    dateStr: '23 Sep',
    dayName: 'बुधवार',
    tempMax: 30,
    tempMin: 21,
    rainfallMm: 12.4,
    humidityPct: 78,
    condition: 'हलक्या ते मध्यम सरी',
    agriAlert: 'काढलेला शेतमाल सुरक्षित शेडखाली झाकून ठेवा.'
  },
  {
    dateStr: '24 Sep',
    dayName: 'गुरुवार',
    tempMax: 29,
    tempMin: 21,
    rainfallMm: 6.0,
    humidityPct: 74,
    condition: 'ढगाळ'
  },
  {
    dateStr: '25 Sep',
    dayName: 'शुक्रवार',
    tempMax: 31,
    tempMin: 22,
    rainfallMm: 0,
    humidityPct: 65,
    condition: 'उघडीप'
  }
];
