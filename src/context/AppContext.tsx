import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['mr'];
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  verifiedLotId: string | null;
  setVerifiedLotId: (id: string | null) => void;

  // Session & Security
  isIdleWarningOpen: boolean;
  idleCountdown: number;
  resetIdleTimer: () => void;
  staySignedIn: () => void;
  logout: () => void;
  logoutAllDevices: () => void;
  switchDemoRole: (role: Role) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Domain Entities
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('mandisetu_lang') as Language) || 'mr';
  });

  const [user, setUserState] = useState<User>(DEMO_USERS.farmer);
  const [currentView, setCurrentViewState] = useState<AppView>('prices');
  const [verifiedLotId, setVerifiedLotId] = useState<string | null>(null);

  // Entities
  const [lots, setLots] = useState<Lot[]>(SEEDED_LOTS);
  const [offers, setOffers] = useState<Offer[]>(SEEDED_OFFERS);
  const [transactions, setTransactions] = useState<Transaction[]>(SEEDED_TRANSACTIONS);
  const [disputes, setDisputes] = useState<Dispute[]>(SEEDED_DISPUTES);

  // Seeded KYC Pending Users for Officer Desk
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

  // Auth & Session Security
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isIdleWarningOpen, setIsIdleWarningOpen] = useState<boolean>(false);
  const [idleCountdown, setIdleCountdown] = useState<number>(60);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'नवीन ऑफर प्राप्त!',
      message: 'सह्याद्री अ‍ॅग्रो फूड्स यांनी कांदा लॉट क्र. LOT-0841 साठी ₹२,३५०/क्विंटल प्रमाणे ऑफर दिली आहे.',
      timestamp: '२ तास आधी',
      type: 'offer',
      read: false
    },
    {
      id: 'notif_2',
      title: 'एस्क्रो सुरक्षित ठेव',
      message: 'व्यवहार क्र. TXN-7840 साठी ₹१,१७,५०० एस्क्रो खात्यात सुरक्षित लॉक झाले आहेत.',
      timestamp: '३ तास आधी',
      type: 'escrow',
      read: false
    },
    {
      id: 'notif_3',
      title: 'लासलगाव भाव तेजी इशारा',
      message: 'लासलगाव बाजारात कांद्याचे सरासरी भाव ₹२,२८० वर पोहोचले आहेत (+३.४%).',
      timestamp: '५ तास आधी',
      type: 'price',
      read: true
    }
  ]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mandisetu_lang', lang);
  };

  const setCurrentView = (view: AppView) => {
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cross-tab logout listener via BroadcastChannel
  useEffect(() => {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('mandisetu_auth_channel');
      channel.onmessage = (event) => {
        if (event.data === 'LOGOUT') {
          setCurrentViewState('signed_out');
        }
      };
      return () => channel.close();
    }
  }, []);

  // Idle session countdown simulation (triggers 60-second warning after prolonged inactivity)
  useEffect(() => {
    let idleTimer: any;
    let warningTimer: any;

    const resetActivity = () => {
      clearTimeout(idleTimer);
      // For demo testing, warn after 5 minutes of total inactivity (or can be triggered on demand)
      idleTimer = setTimeout(() => {
        setIsIdleWarningOpen(true);
        setIdleCountdown(60);
      }, 5 * 60 * 1000);
    };

    window.addEventListener('mousemove', resetActivity);
    window.addEventListener('keydown', resetActivity);
    resetActivity();

    return () => {
      clearTimeout(idleTimer);
      clearTimeout(warningTimer);
      window.removeEventListener('mousemove', resetActivity);
      window.removeEventListener('keydown', resetActivity);
    };
  }, []);

  // 60-second idle countdown
  useEffect(() => {
    let interval: any;
    if (isIdleWarningOpen && idleCountdown > 0) {
      interval = setInterval(() => {
        setIdleCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            logout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isIdleWarningOpen, idleCountdown]);

  const resetIdleTimer = () => {
    setIsIdleWarningOpen(false);
    setIdleCountdown(60);
  };

  const staySignedIn = () => {
    resetIdleTimer();
  };

  const logout = () => {
    setIsIdleWarningOpen(false);
    // Broadcast logout to other open browser tabs
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('mandisetu_auth_channel');
      channel.postMessage('LOGOUT');
      channel.close();
    }
    setCurrentViewState('signed_out');
  };

  const logoutAllDevices = () => {
    logout();
  };

  const switchDemoRole = (role: Role) => {
    const targetUser = DEMO_USERS[role];
    if (targetUser) {
      setUserState(targetUser);
      if (role === 'officer') {
        setCurrentViewState('officer_kyc');
      } else if (role === 'buyer') {
        setCurrentViewState('offers');
      } else {
        setCurrentViewState('prices');
      }
    }
  };

  const createLot = (newLot: Lot) => {
    setLots((prev) => [newLot, ...prev]);
    setCurrentViewState('lots');
  };

  const acceptOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'accepted' } : o))
    );
    const targetOffer = offers.find((o) => o.id === offerId);
    if (targetOffer) {
      // Create active transaction
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
        createdAt: '21 Sep 2026 ' + new Date().toLocaleTimeString(),
        invoiceNumber: `INV-MS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        auditTrail: [
          {
            state: 'offer_accepted',
            timestamp: new Date().toLocaleString(),
            actor: user.name,
            note: 'ऑफर स्वीकारली.'
          },
          {
            state: 'escrow_locked',
            timestamp: new Date().toLocaleString(),
            actor: 'शासकीय एस्क्रो गेटवे (MSIS Escrow)',
            note: `खरेदीदाराकडून ₹${targetOffer.totalAmount.toLocaleString('en-IN')} ची रक्कम शासकीय एस्क्रोमध्ये सुरक्षित जमा झाली.`
          }
        ]
      };
      setTransactions((prev) => [newTxn, ...prev]);
      setCurrentViewState('transactions');
    }
  };

  const counterOffer = (offerId: string, counterPrice: number) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === offerId
          ? {
              ...o,
              status: 'countered',
              counterPrice,
              totalAmount: counterPrice * o.quantityQtl
            }
          : o
      )
    );
  };

  const declineOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'declined' } : o))
    );
  };

  const advanceTransaction = (txnId: string, nextState: TransactionState, note: string) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === txnId) {
          const updatedEscrow =
            nextState === 'payment_released' || nextState === 'closed'
              ? 'released'
              : t.escrowStatus;
          return {
            ...t,
            currentState: nextState,
            escrowStatus: updatedEscrow,
            auditTrail: [
              ...t.auditTrail,
              {
                state: nextState,
                timestamp: new Date().toLocaleString('en-IN'),
                actor: user.name,
                note
              }
            ]
          };
        }
        return t;
      })
    );
  };

  const raiseDispute = (disp: Dispute) => {
    setDisputes((prev) => [disp, ...prev]);
    // update transaction
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === disp.transactionId ? { ...t, escrowStatus: 'disputed' } : t
      )
    );
    setCurrentViewState('disputes');
  };

  const resolveDispute = (dispId: string, outcome: any, notes: string) => {
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === dispId
          ? {
              ...d,
              status: 'resolved',
              outcome,
              resolutionNotes: notes,
              resolvedAt: new Date().toLocaleString('en-IN')
            }
          : d
      )
    );
  };

  const approveKyc = (userId: string) => {
    setPendingKycUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const rejectKyc = (userId: string, _reason: string) => {
    setPendingKycUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        user,
        setUser: setUserState,
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
        logout,
        logoutAllDevices,
        switchDemoRole,
        isAuthModalOpen,
        setIsAuthModalOpen,
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
        markNotificationRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
