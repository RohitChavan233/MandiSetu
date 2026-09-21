export type Role = 'farmer' | 'fpo' | 'buyer' | 'officer';

export type Language = 'mr' | 'hi' | 'en';

export type KYCStatus = 'not_started' | 'submitted' | 'verified' | 'rejected';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: Role;
  language: Language;
  kycStatus: KYCStatus;
  district: string;
  taluka?: string;
  village?: string;
  fpoName?: string;
  gstin?: string;
  pan?: string;
  crops?: string[];
  landSizeAcres?: number;
  businessName?: string;
  trustScore?: number;
}

export interface Session {
  id: string;
  userId: string;
  role: Role;
  createdAt: string;
  lastSeen: string;
  expiresAt: string;
  device: string;
  ip: string;
  isCurrent: boolean;
}

export interface Mandi {
  id: string;
  name: string;
  nameMr: string;
  nameHi: string;
  district: string;
  districtMr: string;
  lat: number;
  lon: number;
  isAPMC: boolean;
}

export interface Commodity {
  id: string;
  code: string;
  nameEn: string;
  nameMr: string;
  nameHi: string;
  varieties: string[];
  grades: string[];
  msp: number; // ₹/quintal
  standardUnit: string;
  icon: string;
}

export interface PriceObservation {
  id: string;
  commodityId: string;
  mandiId: string;
  date: string;
  minPrice: number;
  modalPrice: number;
  maxPrice: number;
  arrivalsQtl: number;
  change24h: number; // percentage change vs previous day
  source: string;
  updatedAt: string;
  isDemo: boolean;
}

export interface PriceHistoryPoint {
  date: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  arrivalsQtl: number;
  msp?: number;
}

export interface ForecastBand {
  day: string;
  dateStr: string;
  p10: number; // 10th percentile (conservative)
  p50: number; // 50th percentile (median expected)
  p90: number; // 90th percentile (optimistic)
}

export interface ForecastResult {
  commodityId: string;
  mandiId: string;
  currentPrice: number;
  bands: ForecastBand[];
  horizonDays: number;
  backtestMAPE: number;
  pinballLoss: number;
  coverage80Pct: number;
  confidence: 'high' | 'medium' | 'low';
  modelVersion: string;
  generatedAt: string;
}

export type StorageType = 'none' | 'home' | 'cold_storage';

export interface AdvisorInputs {
  commodityId: string;
  mandiId: string;
  quantityQtl: number;
  currentPrice: number;
  storageType: StorageType;
  storageRatePerMonth: number; // ₹/qtl/month
  spoilageRatePerWeekPct: number; // % shrink per week
  cashNeededAmount?: number; // ₹ needed urgently
  cashNeededDays?: number; // within N days
}

export type VerdictType = 'sell_now' | 'sell_window' | 'store_part' | 'no_clear_signal';

export interface AdvisorVerdict {
  verdict: VerdictType;
  recommendedSellDate?: string;
  recommendedSellDays?: number;
  expectedNetGain: number;
  safeGainP10: number;
  costBreakdown: {
    storageCost: number;
    shrinkageCost: number;
    financeCost: number;
    totalCost: number;
    grossGain: number;
  };
  splitRecommendation?: {
    sellNowQuantity: number;
    sellNowCashGenerated: number;
    storeQuantity: number;
    storeForDays: number;
    expectedGainFromStored: number;
  };
  confidence: 'high' | 'medium' | 'low';
  plainLanguageExplanation: {
    mr: string;
    hi: string;
    en: string;
  };
}

export type LotStatus = 'draft' | 'listed' | 'offer_received' | 'sold' | 'delivered' | 'closed';

export interface Lot {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  fpoName?: string;
  commodityId: string;
  variety: string;
  quantityQtl: number;
  grade: string;
  harvestDate: string;
  district: string;
  taluka: string;
  village: string;
  askingPrice?: number;
  moisturePct?: number;
  sizeMm?: number;
  status: LotStatus;
  createdAt: string;
  photoUrl?: string;
  geoLat: number;
  geoLon: number;
  digitalSignature: string;
  qrPayload: string;
  voiceTranscript?: string;
}

export interface BuyerTrustScore {
  totalScore: number; // 0 - 100
  isNewBuyer: boolean;
  completedTransactions: number;
  onTimePaymentRate: number; // 0 - 100%
  qualityAcceptanceRate: number; // 0 - 100%
  disputeFreeRate: number; // 0 - 100%
  kycTier: number; // 1 to 3
}

export interface MatchedBuyer {
  id: string;
  name: string;
  companyName: string;
  district: string;
  distanceKm: number;
  trustScore: BuyerTrustScore;
  bidPriceQtl: number;
  preferredGrade: string;
  demandedQuantityQtl: number;
  tags: string[];
}

export type OfferStatus = 'received' | 'countered' | 'accepted' | 'declined' | 'expired';

export interface Offer {
  id: string;
  lotId: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  buyerPhone: string;
  buyerTrustScore: number;
  offeredPriceQtl: number;
  quantityQtl: number;
  totalAmount: number;
  deliveryTerms: string;
  paymentTerms: string;
  expiresAt: string;
  status: OfferStatus;
  createdAt: string;
  counterPrice?: number;
}

export type TransactionState =
  | 'offer_accepted'
  | 'escrow_locked'
  | 'pickup_scheduled'
  | 'in_transit'
  | 'delivered'
  | 'quality_confirmed'
  | 'payment_released'
  | 'closed';

export interface TransactionAuditEntry {
  state: TransactionState;
  timestamp: string;
  actor: string;
  note: string;
}

export interface Transaction {
  id: string;
  lotId: string;
  offerId: string;
  farmerId: string;
  farmerName: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  commodityName: string;
  quantityQtl: number;
  agreedPriceQtl: number;
  totalAmount: number;
  escrowStatus: 'pending' | 'locked' | 'disputed' | 'released' | 'refunded';
  currentState: TransactionState;
  auditTrail: TransactionAuditEntry[];
  pickupDate?: string;
  transporterName?: string;
  trackingNumber?: string;
  qualityPassed?: boolean;
  disputeId?: string;
  createdAt: string;
  invoiceNumber: string;
}

export type DisputeStatus = 'open' | 'under_review' | 'resolved';
export type DisputeOutcome = 'release_to_farmer' | 'partial_settlement' | 'refund_to_buyer';

export interface Dispute {
  id: string;
  transactionId: string;
  raisedBy: 'farmer' | 'buyer';
  raisedByName: string;
  reason: string;
  details: string;
  evidencePhotoUrl?: string;
  claimAmount: number;
  status: DisputeStatus;
  mediatorName?: string;
  mediatorRole?: 'officer' | 'fpo';
  outcome?: DisputeOutcome;
  resolutionNotes?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface LogisticsProvider {
  id: string;
  name: string;
  type: 'cold_storage' | 'transporter';
  district: string;
  taluka: string;
  capacity: string;
  rateDescription: string;
  phone: string;
  rating: number;
  verified: boolean;
}

export interface WeatherDay {
  dateStr: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  rainfallMm: number;
  humidityPct: number;
  condition: string;
  agriAlert?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'price' | 'offer' | 'escrow' | 'delivery' | 'dispute' | 'kyc';
  read: boolean;
}
