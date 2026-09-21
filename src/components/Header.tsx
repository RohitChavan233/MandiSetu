import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, LogOut, LogIn, Menu, X, Database } from 'lucide-react';
import { Language } from '../types';

export const Header: React.FC = () => {
  const {
    user,
    isLoggedIn,
    language,
    setLanguage,
    t,
    currentView,
    setCurrentView,
    logout,
    notifications,
    markNotificationRead,
    setIsAuthModalOpen
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNavClick = (view: any) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsNotifOpen(false);
  };

  const isActive = (view: string) => currentView === view;

  const notifColor: Record<string, string> = {
    price: 'var(--accent)',
    offer: 'var(--accent)',
    escrow: 'var(--olive)',
    delivery: 'var(--olive)',
    dispute: 'var(--rose)',
    kyc: 'var(--charcoal-soft)'
  };

  const navBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '13px 15px',
    color: active ? 'var(--dark)' : 'var(--charcoal-soft)',
    fontWeight: active ? 600 : 500,
    fontSize: '0.875rem',
    background: 'transparent',
    borderBottom: active ? '1.5px solid var(--accent)' : '1.5px solid transparent',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    transition: 'color 0.12s ease, border-color 0.12s ease',
    letterSpacing: '0.01em'
  });

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 245, 245, 0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--rule-mid)'
    }}>

      {/* ── Main Brand Row ── */}
      <div style={{
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 64
      }}>

        {/* Logo */}
        <div
          onClick={() => handleNavClick('prices')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>🌾</span>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--dark)',
                letterSpacing: '-0.02em'
              }}>
                MandiSetu
              </span>
              {/* Live dot accent */}
              <span style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'inline-block',
                animation: 'live-pulse 2s ease-in-out infinite',
                flexShrink: 0
              }} />
            </div>
            <div style={{ fontSize: '0.73rem', color: 'var(--charcoal-soft)', letterSpacing: '0.02em' }}>
              {t.appName} · SIH26132
            </div>
          </div>
        </div>

        {/* Right cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

          {/* Language switcher: मर · हि · EN */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid var(--rule-mid)',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            marginRight: 4
          }}>
            {(['mr', 'hi', 'en'] as Language[]).map((lang, i) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                style={{
                  padding: '5px 10px',
                  fontSize: '0.8rem',
                  fontWeight: language === lang ? 700 : 400,
                  color: language === lang ? 'var(--paper)' : 'var(--charcoal-soft)',
                  background: language === lang ? 'var(--charcoal)' : 'transparent',
                  borderRight: i < 2 ? '1px solid var(--rule-mid)' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.12s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {lang === 'mr' ? 'मर' : lang === 'hi' ? 'हि' : 'EN'}
              </button>
            ))}
          </div>

          {/* About data */}
          <button
            onClick={() => handleNavClick('about_data')}
            className="btn-secondary hide-mobile"
            style={{ padding: '6px 12px', fontSize: '0.82rem', gap: 5 }}
          >
            <Database size={14} />
            {t.navAboutData}
          </button>

          {/* Notification bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setIsNotifOpen(!isNotifOpen); }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--rule-mid)',
                background: isNotifOpen ? 'var(--band)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'background 0.12s ease'
              }}
              aria-label="Notifications"
            >
              <Bell size={16} color="var(--charcoal)" />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  background: 'var(--rose)',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  width: 17,
                  height: 17,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-body)'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {isNotifOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: 44,
                width: 360,
                background: 'var(--white)',
                border: '1px solid var(--rule-mid)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-float)',
                zIndex: 300,
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--rule)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--dark)' }}>
                    सूचना
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--charcoal-soft)' }}>
                    {unreadCount} नवीन
                  </span>
                </div>
                <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--charcoal-soft)', fontSize: '0.88rem' }}>
                      कोणत्याही सूचना नाहीत
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        style={{
                          padding: '10px 16px',
                          borderLeft: `3px solid ${notifColor[n.type] || 'var(--rule-mid)'}`,
                          borderBottom: '1px solid var(--rule)',
                          background: n.read ? 'transparent' : 'rgba(247, 214, 208, 0.2)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: 8
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.84rem', color: 'var(--dark)', marginBottom: 2 }}>
                            {n.title}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-soft)', lineHeight: 1.4 }}>
                            {n.message}
                          </div>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--charcoal-soft)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                          {n.timestamp}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User avatar / Sign-in button */}
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 6, borderLeft: '1px solid var(--rule-mid)', marginLeft: 2 }}>
              {/* Avatar */}
              <div style={{
                width: 32,
                height: 32,
                background: 'var(--charcoal)',
                color: 'var(--paper)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                flexShrink: 0
              }}>
                {user.name.charAt(0)}
              </div>
              <div className="hide-mobile" style={{ lineHeight: 1.2 }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--dark)' }}>{user.name.split('(')[0].trim()}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--charcoal-soft)' }}>
                  {user.role === 'farmer' ? t.roleFarmer : user.role === 'fpo' ? t.roleFpo : user.role === 'buyer' ? t.roleBuyer : t.roleOfficer}
                </div>
              </div>
              <button onClick={logout} className="btn-ghost hide-mobile" style={{ padding: '6px 10px', fontSize: '0.82rem' }} title={t.signOut}>
                <LogOut size={14} />
                <span>{t.signOut}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="btn-primary"
              style={{ padding: '7px 14px', fontSize: '0.85rem', gap: 6, marginLeft: 4 }}
            >
              <LogIn size={14} />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="show-mobile-only"
            style={{
              width: 36,
              height: 36,
              border: '1px solid var(--rule-mid)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={18} color="var(--charcoal)" /> : <Menu size={18} color="var(--charcoal)" />}
          </button>
        </div>
      </div>

      {/* ── Navigation Bar ── */}
      <nav style={{
        background: 'var(--white)',
        borderTop: '1px solid var(--rule)',
        padding: '0 20px',
        display: isMobileMenuOpen ? 'none' : 'flex',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {/* Universal */}
        <button onClick={() => handleNavClick('prices')} style={navBtnStyle(isActive('prices'))}>
          {t.navPrices}
        </button>
        <button onClick={() => handleNavClick('forecast')} style={navBtnStyle(isActive('forecast'))}>
          {t.navForecast}
        </button>
        <button onClick={() => handleNavClick('advisor')} style={navBtnStyle(isActive('advisor'))}>
          {t.navAdvisor}
        </button>

        {/* Farmer / FPO */}
        {(user.role === 'farmer' || user.role === 'fpo') && (
          <>
            <button onClick={() => handleNavClick('lots')} style={navBtnStyle(isActive('lots') || isActive('create_lot'))}>
              {t.navLots}
            </button>
            <button onClick={() => handleNavClick('create_lot')} style={navBtnStyle(isActive('create_lot'))}>
              + {t.navCreateLot}
            </button>
          </>
        )}

        {/* All roles */}
        <button onClick={() => handleNavClick('offers')} style={navBtnStyle(isActive('offers'))}>
          {t.navOffers}
        </button>
        <button onClick={() => handleNavClick('transactions')} style={navBtnStyle(isActive('transactions'))}>
          {t.navTransactions}
        </button>
        <button onClick={() => handleNavClick('disputes')} style={navBtnStyle(isActive('disputes'))}>
          {t.navDisputes}
        </button>
        <button onClick={() => handleNavClick('logistics')} style={navBtnStyle(isActive('logistics'))}>
          {t.navLogistics}
        </button>

        {/* Officer */}
        {user.role === 'officer' && (
          <>
            <button onClick={() => handleNavClick('officer_kyc')} style={navBtnStyle(isActive('officer_kyc'))}>
              {t.navOfficerKyc}
            </button>
            <button onClick={() => handleNavClick('officer_disputes')} style={navBtnStyle(isActive('officer_disputes'))}>
              {t.navOfficerDisputes}
            </button>
            <button onClick={() => handleNavClick('officer_analytics')} style={navBtnStyle(isActive('officer_analytics'))}>
              {t.navOfficerAnalytics}
            </button>
            <button onClick={() => handleNavClick('officer_pipeline')} style={navBtnStyle(isActive('officer_pipeline'))}>
              {t.pipelineHealth}
            </button>
          </>
        )}
      </nav>

      {/* ── Mobile full-height menu ── */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          top: 64,
          background: 'var(--paper)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}>
          {[
            { view: 'prices', label: t.navPrices },
            { view: 'forecast', label: t.navForecast },
            { view: 'advisor', label: t.navAdvisor },
            ...(user.role === 'farmer' || user.role === 'fpo' ? [
              { view: 'lots', label: t.navLots },
              { view: 'create_lot', label: '+ ' + t.navCreateLot }
            ] : []),
            { view: 'offers', label: t.navOffers },
            { view: 'transactions', label: t.navTransactions },
            { view: 'disputes', label: t.navDisputes },
            { view: 'logistics', label: t.navLogistics },
            ...(user.role === 'officer' ? [
              { view: 'officer_kyc', label: t.navOfficerKyc },
              { view: 'officer_disputes', label: t.navOfficerDisputes },
              { view: 'officer_analytics', label: t.navOfficerAnalytics },
              { view: 'officer_pipeline', label: t.pipelineHealth }
            ] : [])
          ].map(({ view, label }) => (
            <button
              key={view}
              onClick={() => handleNavClick(view)}
              style={{
                textAlign: 'left',
                padding: '16px 24px',
                fontSize: '1.15rem',
                fontWeight: isActive(view) ? 700 : 400,
                color: isActive(view) ? 'var(--dark)' : 'var(--charcoal)',
                borderBottom: '1px solid var(--rule)',
                borderLeft: isActive(view) ? '3px solid var(--accent)' : '3px solid transparent',
                background: isActive(view) ? 'rgba(247, 214, 208, 0.3)' : 'transparent',
                fontFamily: 'var(--font-body)'
              }}
            >
              {label}
            </button>
          ))}
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--rule-mid)', display: 'flex', gap: 12 }}>
            <button onClick={logout} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
              <LogOut size={14} /> {t.signOut}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
