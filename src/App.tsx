import React from 'react';
import { AppProvider, useApp, PUBLIC_VIEWS } from './context/AppContext';
import { Header } from './components/Header';
import { DemoBanner } from './components/DemoBanner';
import { PriceBoard } from './components/PriceBoard';
import { ForecastAdvisor } from './components/ForecastAdvisor';
import { LotCreationModal } from './components/LotCreationModal';
import { FarmerLotsView } from './components/FarmerLotsView';
import { BuyerMatching } from './components/BuyerMatching';
import { OfferTransactionWorkflow } from './components/OfferTransactionWorkflow';
import { DisputeDesk } from './components/DisputeDesk';
import { LogisticsDirectory } from './components/LogisticsDirectory';
import { OfficerConsole } from './components/OfficerConsole';
import { AboutDataModal } from './components/AboutDataModal';
import { PublicVerifyView } from './components/PublicVerifyView';
import { SignedOutView } from './components/SignedOutView';
import { IdleWarningModal } from './components/IdleWarningModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { LogIn } from 'lucide-react';

// ── Login Gate ──────────────────────────────────────────────────────────────
const LoginGate: React.FC<{ viewLabel: string }> = ({ viewLabel }) => {
  const { setIsAuthModalOpen } = useApp();
  return (
    <div style={{
      maxWidth: 480,
      margin: '80px auto',
      padding: '0 20px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🔒</div>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.6rem',
        fontWeight: 600,
        color: 'var(--dark)',
        marginBottom: 10
      }}>
        Sign in to continue
      </h2>
      <p style={{ fontSize: '0.92rem', color: 'var(--charcoal-soft)', marginBottom: 28, lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--dark)' }}>{viewLabel}</strong> requires a MandiSetu account.
        Price data and forecasts are available without login.
      </p>
      <button
        onClick={() => setIsAuthModalOpen(true)}
        className="btn-primary"
        style={{ padding: '11px 28px', fontSize: '1rem' }}
      >
        <LogIn size={16} />
        Sign In / Register
      </button>
      <div style={{ marginTop: 14, fontSize: '0.78rem', color: 'var(--charcoal-soft)' }}>
        Demo OTP: <strong style={{ color: 'var(--dark)' }}>123456</strong>
      </div>
    </div>
  );
};

// ── Main content router ─────────────────────────────────────────────────────
const AppContent: React.FC = () => {
  const { currentView, isLoggedIn, isAuthModalOpen, setIsAuthModalOpen } = useApp();

  // Signed out / expired pages — no nav
  if (currentView === 'signed_out' || currentView === 'session_expired') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <DemoBanner />
        <main style={{ flex: 1 }}>
          <SignedOutView />
        </main>
        {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
        <Footer />
      </div>
    );
  }

  // Determine if this view requires auth
  const requiresAuth = !PUBLIC_VIEWS.includes(currentView);
  const showGate = requiresAuth && !isLoggedIn;

  // View label for the gate screen
  const viewLabels: Record<string, string> = {
    lots:              'My Lots',
    create_lot:        'List Produce',
    offers:            'Buyer Matching',
    transactions:      'Transactions',
    disputes:          'Dispute Desk',
    logistics:         'Logistics Directory',
    officer_kyc:       'KYC Console',
    officer_disputes:  'Officer Disputes',
    officer_analytics: 'Analytics Dashboard',
    officer_pipeline:  'Transaction Pipeline',
    account:           'My Account'
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <DemoBanner />

      <main style={{ flex: 1, paddingBottom: 40 }}>
        {showGate ? (
          <LoginGate viewLabel={viewLabels[currentView] ?? currentView} />
        ) : (
          <>
            {currentView === 'prices'             && <PriceBoard />}
            {currentView === 'forecast'            && <ForecastAdvisor />}
            {currentView === 'advisor'             && <ForecastAdvisor />}
            {currentView === 'lots'                && <FarmerLotsView />}
            {currentView === 'create_lot'          && <LotCreationModal />}
            {currentView === 'offers'              && <BuyerMatching />}
            {currentView === 'transactions'        && <OfferTransactionWorkflow />}
            {currentView === 'disputes'            && <DisputeDesk />}
            {currentView === 'logistics'           && <LogisticsDirectory />}
            {currentView === 'officer_kyc'         && <OfficerConsole />}
            {currentView === 'officer_disputes'    && <DisputeDesk />}
            {currentView === 'officer_analytics'   && <OfficerConsole />}
            {currentView === 'officer_pipeline'    && <OfficerConsole />}
            {currentView === 'about_data'          && <AboutDataModal />}
            {currentView === 'verify_lot'          && <PublicVerifyView />}
          </>
        )}
      </main>

      {/* Overlays */}
      <IdleWarningModal />
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}

      <Footer />
    </div>
  );
};

// ── Root ────────────────────────────────────────────────────────────────────
export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
