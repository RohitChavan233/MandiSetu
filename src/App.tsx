import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
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

const AppContent: React.FC = () => {
  const { currentView, isAuthModalOpen, setIsAuthModalOpen } = useApp();

  // If in signed_out state, show dedicated signed out page
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <DemoBanner />

      <main style={{ flex: 1, paddingBottom: '30px' }}>
        {currentView === 'prices' && <PriceBoard />}
        {currentView === 'forecast' && <ForecastAdvisor />}
        {currentView === 'advisor' && <ForecastAdvisor />}
        {currentView === 'lots' && <FarmerLotsView />}
        {currentView === 'create_lot' && <LotCreationModal />}
        {currentView === 'offers' && <BuyerMatching />}
        {currentView === 'transactions' && <OfferTransactionWorkflow />}
        {currentView === 'disputes' && <DisputeDesk />}
        {currentView === 'logistics' && <LogisticsDirectory />}
        {currentView === 'officer_kyc' && <OfficerConsole />}
        {currentView === 'officer_disputes' && <DisputeDesk />}
        {currentView === 'officer_analytics' && <OfficerConsole />}
        {currentView === 'officer_pipeline' && <OfficerConsole />}
        {currentView === 'about_data' && <AboutDataModal />}
        {currentView === 'verify_lot' && <PublicVerifyView />}
      </main>

      {/* Overlays & Modals */}
      <IdleWarningModal />
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}

      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
