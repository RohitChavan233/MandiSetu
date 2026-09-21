import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  User,
  Role,
  Language,
  Lot,
  Offer,
  Transaction,
  Dispute,
  TransactionState,
  NotificationItem
} from '../types';
import {
  DEMO_USERS,
  SEEDED_LOTS,
  SEEDED_OFFERS,
  SEEDED_TRANSACTIONS,
  SEEDED_DISPUTES
} from '../data/mockData';
import { translations } from '../i18n/translations';

// ── View types ─────────────────────────────────────────────────────────────
export type AppView =
  | 'prices'
  | 'forecast'
  | 'advisor'
  | 'lots'
  | 'create_lot'
  | 'offers'
  | 'transactions'
  | 'disputes'
  | 'logistics'
  | 'officer_kyc'
  | 'officer_disputes'
  | 'officer_analytics'
  | 'officer_pipeline'
  | 'about_data'
  | 'account'
  | 'verify_lot'
  | 'signed_out'
  | 'session_expired';

// Views that do NOT require login
export const PUBLIC_VIEWS: AppView[] = ['prices', 'forecast', 'about_data', 'verify_lot'];

// ── Session storage helpers ─────────────────────────────────────────────────
const SESSION_KEY = 'mandisetu_session';
const LANG_KEY    = 'mandisetu_lang';

interface StoredSession {
  userId: string;
  role: Role;
  loggedInAt: number;
}

function saveSession(user: User) {
  const session: StoredSession = {
    userId: user.id,
    role:   user.role,
    loggedInAt: Date.now()
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function loadSession(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s: StoredSession = JSON.parse(raw);
    // Session max age: 8 hours
    if (Date.now() - s.loggedInAt > 8 * 60 * 60 * 1000) {
      clearSession();
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

// ── Context shape ───────────────────────────────────────────────────────────
interface AppContextType {
  // Auth
  isLoggedIn: boolean;
  user: User;
  login: (role: Role) => void;
  logout: () => void;
  logoutAllDevices: () => void;
  switchDemoRole: (role: Role) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['mr'];

  // View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  verifiedLotId: string | null;
  setVerifiedLotId: (id: string | null) => void;

  // Session security
  isIdleWarningOpen: boolean;
  idleCountdown: number;
  resetIdleTimer: () => void;
  staySignedIn: () => void;

  // Domain entities
  lots: Lot[];
  createLot: (lot: Lot) => void;
  offers: Offer[];
  acceptOffer: (offerId: string) => void;
  counterOffer: (offerId: string, counterPrice: number) => void;
  declineOffer: (offerId: string) => void;
  transactions: Transaction[];
  advanceTransaction: (txnId: string, nextState: TransactionState, note: string) => void;
  disputes: Dispute[];
  raiseDispute: (disp: Dispute) => void;
  resolveDispute: (dispId: string, outcome: any, notes: string) => void;

  // Officer KYC
  pendingKycUsers: User[];
  approveKyc: (userId: string) => void;
  rejectKyc: (userId: string, reason: string) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;

  // Legacy compat
  setUser: (user: User) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ── Provider ────────────────────────────────────────────────────────────────
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // ── Language ──────────────────────────────────────────────────────────────
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem(LANG_KEY) as Language) || 'mr'
  );
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANG_KEY, lang);
  };

  // ── Auth state ────────────────────────────────────────────────────────────
  const resolveInitialUser = (): { user: User; loggedIn: boolean } => {
    const session = loadSession();
    if (session) {
      const u = DEMO_USERS[session.role];
      if (u) return { user: u, loggedIn: true };
    }
    return { user: DEMO_USERS.farmer, loggedIn: false };
  };

  const initial = resolveInitialUser();
  const [user, setUserState] = useState<User>(initial.user);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initial.loggedIn);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // ── View ──────────────────────────────────────────────────────────────────
  const [currentView, setCurrentViewState] = useState<AppView>('prices');
  const [verifiedLotId, setVerifiedLotId] = useState<string | null>(null);

  const setCurrentView = (view: AppView) => {
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Domain entities ───────────────────────────────────────────────────────
  const [lots, setLots]               = useState<Lot[]>(SEEDED_LOTS);
  const [offers, setOffers]           = useState<Offer[]>(SEEDED_OFFERS);
  const [transactions, setTransactions] = useState<Transaction[]>(SEEDED_TRANSACTIONS);
  const [disputes, setDisputes]       = useState<Dispute[]>(SEEDED_DISPUTES);

  const [pendingKycUsers, setPendingKycUsers] = useState<User[]>([
    {
      id: 'kyc_buyer_99',
      name: 'सतीश अगरवाल (Satish Agarwal)',
      phone: '9822334455',
      email: 'satish@agarwaltraders.com',
      role: 'buyer',
      language: 'hi',
      kycStatus: 'submitted',
      district: 'Pune',
      businessName: 'अगरवाल ट्रेडिंग कंपनी प्रा. लि.',
      gstin: '27AAACA9921B1Z2',
      pan: 'AAACA9921B'
    },
    {
      id: 'kyc_fpo_88',
      name: 'गोदावरी किसान उत्पादक संस्था',
      phone: '9422001188',
      email: 'godavari.fpo@gmail.com',
      role: 'fpo',
      language: 'mr',
      kycStatus: 'submitted',
      district: 'Nashik',
      fpoName: 'गोदावरी शेतकरी गट (९५ सदस्य)',
      taluka: 'Dindori'
    }
  ]);

  // ── Notifications ─────────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'नवीन ऑफर प्राप्त!',
      message: 'सह्याद्री अ‍ॅग्रो फूड्स यांनी कांदा लॉट क्र. LOT-0841 साठी ₹२,३५०/क्विंटल ऑफर दिली.',
      timestamp: '२ तास आधी',
      type: 'offer',
      read: false
    },
    {
      id: 'notif_2',
      title: 'एस्क्रो सुरक्षित ठेव',
      message: 'व्यवहार क्र. TXN-7840 साठी ₹१,१७,५०० एस्क्रोमध्ये लॉक झाले.',
      timestamp: '३ तास आधी',
      type: 'escrow',
      read: false
    },
    {
      id: 'notif_3',
      title: 'लासलगाव भाव तेजी',
      message: 'कांद्याचे सरासरी भाव ₹२,२८० (+३.४%).',
      timestamp: '५ तास आधी',
      type: 'price',
      read: true
    }
  ]);

  // ── Idle session timer ────────────────────────────────────────────────────
  const [isIdleWarningOpen, setIsIdleWarningOpen] = useState<boolean>(false);
  const [idleCountdown, setIdleCountdown]         = useState<number>(60);

  useEffect(() => {
    if (!isLoggedIn) return; // Only track idle when logged in
    let idleTimer: ReturnType<typeof setTimeout>;

    const resetActivity = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsIdleWarningOpen(true);
        setIdleCountdown(60);
      }, 5 * 60 * 1000);
    };

    window.addEventListener('mousemove', resetActivity);
    window.addEventListener('keydown', resetActivity);
    window.addEventListener('touchstart', resetActivity);
    resetActivity();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetActivity);
      window.removeEventListener('keydown', resetActivity);
      window.removeEventListener('touchstart', resetActivity);
    };
  }, [isLoggedIn]);

  // Idle countdown tick
  useEffect(() => {
    if (!isIdleWarningOpen) return;
    const interval = setInterval(() => {
      setIdleCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          logout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isIdleWarningOpen]);

  // Cross-tab logout
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const ch = new BroadcastChannel('mandisetu_auth');
    ch.onmessage = (e) => {
      if (e.data === 'LOGOUT') {
        setIsLoggedIn(false);
        clearSession();
        setCurrentViewState('signed_out');
      }
    };
    return () => ch.close();
  }, []);

  // ── Auth actions ──────────────────────────────────────────────────────────
  const login = useCallback((role: Role) => {
    const u = DEMO_USERS[role];
    if (!u) return;
    setUserState(u);
    setIsLoggedIn(true);
    saveSession(u);
    setIsAuthModalOpen(false);
    // Route to role's home view
    if (role === 'officer') setCurrentViewState('officer_kyc');
    else if (role === 'buyer') setCurrentViewState('offers');
    else setCurrentViewState('prices');
  }, []);

  const logout = useCallback(() => {
    setIsIdleWarningOpen(false);
    setIsLoggedIn(false);
    clearSession();
    if (typeof BroadcastChannel !== 'undefined') {
      const ch = new BroadcastChannel('mandisetu_auth');
      ch.postMessage('LOGOUT');
      ch.close();
    }
    setCurrentViewState('signed_out');
  }, []);

  const logoutAllDevices = useCallback(() => logout(), [logout]);

  const resetIdleTimer = useCallback(() => {
    setIsIdleWarningOpen(false);
    setIdleCountdown(60);
  }, []);

  const staySignedIn = useCallback(() => resetIdleTimer(), [resetIdleTimer]);

  const switchDemoRole = useCallback((role: Role) => {
    const u = DEMO_USERS[role];
    if (!u) return;
    setUserState(u);
    setIsLoggedIn(true);
    saveSession(u);
    if (role === 'officer') setCurrentViewState('officer_kyc');
    else if (role === 'buyer') setCurrentViewState('offers');
    else setCurrentViewState('prices');
  }, []);

  // ── Domain actions ────────────────────────────────────────────────────────
  const createLot = (newLot: Lot) => {
    setLots((prev) => [newLot, ...prev]);
    setCurrentViewState('lots');
  };

  const acceptOffer = (offerId: string) => {
    setOffers((prev) => prev.map((o) => o.id === offerId ? { ...o, status: 'accepted' } : o));
    const targetOffer = offers.find((o) => o.id === offerId);
    if (targetOffer) {
      const newTxn: Transaction = {
        id: `TXN-MH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        lotId: targetOffer.lotId,
        offerId: targetOffer.id,
        farmerId: user.id,
        farmerName: user.name,
        buyerId: targetOffer.buyerId,
        buyerName: targetOffer.buyerName,
        buyerCompany: targetOffer.buyerCompany,
        commodityName: 'Nashik Red Onion (Grade A)',
        quantityQtl: targetOffer.quantityQtl,
        agreedPriceQtl: targetOffer.offeredPriceQtl,
        totalAmount: targetOffer.totalAmount,
        escrowStatus: 'locked',
        currentState: 'escrow_locked',
        createdAt: new Date().toLocaleString('en-IN'),
        invoiceNumber: `INV-MS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        auditTrail: [
          { state: 'offer_accepted', timestamp: new Date().toLocaleString(), actor: user.name, note: 'ऑफर स्वीकारली.' },
          { state: 'escrow_locked',  timestamp: new Date().toLocaleString(), actor: 'MSIS Escrow Gateway', note: `₹${targetOffer.totalAmount.toLocaleString('en-IN')} एस्क्रोमध्ये जमा झाले.` }
        ]
      };
      setTransactions((prev) => [newTxn, ...prev]);
      setCurrentViewState('transactions');
    }
  };

  const counterOffer = (offerId: string, counterPrice: number) => {
    setOffers((prev) => prev.map((o) =>
      o.id === offerId ? { ...o, status: 'countered', counterPrice, totalAmount: counterPrice * o.quantityQtl } : o
    ));
  };

  const declineOffer = (offerId: string) => {
    setOffers((prev) => prev.map((o) => o.id === offerId ? { ...o, status: 'declined' } : o));
  };

  const advanceTransaction = (txnId: string, nextState: TransactionState, note: string) => {
    setTransactions((prev) => prev.map((t) => {
      if (t.id !== txnId) return t;
      const updatedEscrow = (nextState === 'payment_released' || nextState === 'closed') ? 'released' : t.escrowStatus;
      return {
        ...t,
        currentState: nextState,
        escrowStatus: updatedEscrow,
        auditTrail: [...t.auditTrail, { state: nextState, timestamp: new Date().toLocaleString('en-IN'), actor: user.name, note }]
      };
    }));
  };

  const raiseDispute = (disp: Dispute) => {
    setDisputes((prev) => [disp, ...prev]);
    setTransactions((prev) => prev.map((t) => t.id === disp.transactionId ? { ...t, escrowStatus: 'disputed' } : t));
    setCurrentViewState('disputes');
  };

  const resolveDispute = (dispId: string, outcome: any, notes: string) => {
    setDisputes((prev) => prev.map((d) =>
      d.id === dispId ? { ...d, status: 'resolved', outcome, resolutionNotes: notes, resolvedAt: new Date().toLocaleString('en-IN') } : d
    ));
  };

  const approveKyc = (userId: string) => setPendingKycUsers((prev) => prev.filter((u) => u.id !== userId));
  const rejectKyc  = (userId: string, _reason: string) => setPendingKycUsers((prev) => prev.filter((u) => u.id !== userId));

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const t = translations[language];

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      user,
      login,
      logout,
      logoutAllDevices,
      switchDemoRole,
      isAuthModalOpen,
      setIsAuthModalOpen,
      language,
      setLanguage,
      t,
      currentView,
      setCurrentView,
      verifiedLotId,
      setVerifiedLotId,
      isIdleWarningOpen,
      idleCountdown,
      resetIdleTimer,
      staySignedIn,
      lots,
      createLot,
      offers,
      acceptOffer,
      counterOffer,
      declineOffer,
      transactions,
      advanceTransaction,
      disputes,
      raiseDispute,
      resolveDispute,
      pendingKycUsers,
      approveKyc,
      rejectKyc,
      notifications,
      markNotificationRead,
      // Legacy compat
      setUser: (u: User) => { setUserState(u); }
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
