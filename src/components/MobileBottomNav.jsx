import React, { useState } from 'react';
import { 
  List, Map as MapIcon, Scale, ShieldCheck, 
  BookOpen, History, MessageSquarePlus, X, Sun, Moon, Globe
} from 'lucide-react';

export default function MobileBottomNav({
  viewMode,
  onViewModeChange,
  isMobileDetailOpen,
  onBackToList,
  onOpenCompare,
  onOpenMethodology,
  onOpenConstitutionalModal,
  onOpenChangelog,
  onOpenCorrection,
  language = 'en',
  onToggleLanguage,
  isDark = false,
  onToggleTheme
}) {
  const [isTrustSheetOpen, setIsTrustSheetOpen] = useState(false);

  const handleDirectoryClick = () => {
    if (viewMode !== 'split') {
      onViewModeChange('split');
    } else if (isMobileDetailOpen) {
      onBackToList();
    }
  };

  const handleMapClick = () => {
    if (viewMode !== 'map') {
      onViewModeChange('map');
    }
  };

  return (
    <>
      {/* Persistent Thumb-Friendly Mobile Bottom Navigation Bar */}
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-parchment-border dark:border-slate-800 pb-[env(safe-area-inset-bottom)] shadow-float"
      >
        <div className="grid grid-cols-4 h-14">
          
          {/* 1. Directory Tab */}
          <button
            type="button"
            onClick={handleDirectoryClick}
            className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[48px] focus-visible:outline-none focus-visible:bg-parchment/60 ${
              viewMode === 'split'
                ? 'text-carto-indigo dark:text-blue-400 font-bold'
                : 'text-ink-muted hover:text-ink dark:hover:text-ink-dark'
            }`}
            aria-label={language === 'hi' ? 'निर्देशिका सूची' : 'Directory List'}
          >
            <List className="w-5 h-5" aria-hidden="true" />
            <span className="text-[11px] font-sans leading-none">
              {language === 'hi' ? 'निर्देशिका' : 'Directory'}
            </span>
            {viewMode === 'split' && (
              <span className="w-1.5 h-1.5 rounded-full bg-carto-indigo dark:bg-blue-400 -mt-0.5" />
            )}
          </button>

          {/* 2. Map View Tab */}
          <button
            type="button"
            onClick={handleMapClick}
            className={`flex flex-col items-center justify-center gap-1 transition-colors min-h-[48px] focus-visible:outline-none focus-visible:bg-parchment/60 ${
              viewMode === 'map'
                ? 'text-carto-indigo dark:text-blue-400 font-bold'
                : 'text-ink-muted hover:text-ink dark:hover:text-ink-dark'
            }`}
            aria-label={language === 'hi' ? 'मानचित्र दृश्य' : 'Map View'}
          >
            <MapIcon className="w-5 h-5" aria-hidden="true" />
            <span className="text-[11px] font-sans leading-none">
              {language === 'hi' ? 'मानचित्र' : 'Map'}
            </span>
            {viewMode === 'map' && (
              <span className="w-1.5 h-1.5 rounded-full bg-carto-indigo dark:bg-blue-400 -mt-0.5" />
            )}
          </button>

          {/* 3. Compare Tab */}
          <button
            type="button"
            onClick={onOpenCompare}
            className="flex flex-col items-center justify-center gap-1 text-ink-muted hover:text-ink dark:hover:text-ink-dark transition-colors min-h-[48px] focus-visible:outline-none focus-visible:bg-parchment/60"
            aria-label={language === 'hi' ? 'राज्यों की तुलना करें' : 'Compare States'}
          >
            <Scale className="w-5 h-5 text-carto-gold" aria-hidden="true" />
            <span className="text-[11px] font-sans leading-none">
              {language === 'hi' ? 'तुलना' : 'Compare'}
            </span>
          </button>

          {/* 4. Trust & Info Sheet Trigger */}
          <button
            type="button"
            onClick={() => setIsTrustSheetOpen(true)}
            className="flex flex-col items-center justify-center gap-1 text-ink-muted hover:text-ink dark:hover:text-ink-dark transition-colors min-h-[48px] focus-visible:outline-none focus-visible:bg-parchment/60"
            aria-label={language === 'hi' ? 'प्रमाणिकता एवं स्रोत' : 'Trust & Sources'}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span className="text-[11px] font-sans leading-none">
              {language === 'hi' ? 'प्रमाणिकता' : 'Trust'}
            </span>
          </button>

        </div>
      </nav>

      {/* Mobile Trust & Actions Bottom Sheet */}
      {isTrustSheetOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-trust-sheet-title"
          onClick={() => setIsTrustSheetOpen(false)}
        >
          <div 
            className="relative w-full bg-white dark:bg-slate-900 border-t border-parchment-border dark:border-slate-800 rounded-t-2xl shadow-float p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-10 h-1 bg-parchment-border dark:bg-slate-700 rounded-full mx-auto -mt-1 mb-2" />

            <div className="flex items-center justify-between border-b border-parchment-subtle dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 id="mobile-trust-sheet-title" className="text-sm font-serif font-bold text-ink dark:text-ink-dark">
                  {language === 'hi' ? 'प्रमाणिकता एवं संदर्भ साधन' : 'Civic Trust & Reference Tools'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTrustSheetOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-ink-muted hover:text-ink dark:hover:text-ink-dark"
                aria-label="Close Trust Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  setIsTrustSheetOpen(false);
                  onOpenMethodology();
                }}
                className="w-full min-h-[48px] px-3 py-2.5 rounded-xl hover:bg-parchment dark:hover:bg-slate-800 flex items-center gap-3 text-left transition-colors"
              >
                <ShieldCheck className="w-5 h-5 text-carto-indigo dark:text-blue-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-ink dark:text-ink-dark">
                    {language === 'hi' ? 'कार्यप्रणाली एवं डेटा स्रोत' : 'Methodology & Data Sources'}
                  </div>
                  <div className="text-[11px] text-ink-muted">
                    Census 2011, Survey of India, and ECI
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsTrustSheetOpen(false);
                  onOpenConstitutionalModal();
                }}
                className="w-full min-h-[48px] px-3 py-2.5 rounded-xl hover:bg-parchment dark:hover:bg-slate-800 flex items-center gap-3 text-left transition-colors"
              >
                <BookOpen className="w-5 h-5 text-carto-gold shrink-0" />
                <div>
                  <div className="text-xs font-bold text-ink dark:text-ink-dark">
                    {language === 'hi' ? 'सातवीं अनुसूची मार्गदर्शिका' : '7th Schedule Constitutional Guide'}
                  </div>
                  <div className="text-[11px] text-ink-muted">
                    Union, State, and Concurrent Lists (Art. 246)
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsTrustSheetOpen(false);
                  onOpenChangelog();
                }}
                className="w-full min-h-[48px] px-3 py-2.5 rounded-xl hover:bg-parchment dark:hover:bg-slate-800 flex items-center gap-3 text-left transition-colors"
              >
                <History className="w-5 h-5 text-slate-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-ink dark:text-ink-dark">
                    {language === 'hi' ? 'अद्यतन इतिहास' : 'Changelog'}
                  </div>
                  <div className="text-[11px] text-ink-muted">
                    Verified record of updates through November 2026
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsTrustSheetOpen(false);
                  onOpenCorrection();
                }}
                className="w-full min-h-[48px] px-3 py-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-900 dark:text-amber-300 flex items-center gap-3 text-left transition-colors"
              >
                <MessageSquarePlus className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold">
                    {language === 'hi' ? 'सुधार का सुझाव दें' : 'Report an Official Correction'}
                  </div>
                  <div className="text-[11px] text-ink-muted">
                    Submit verified gazette or government link
                  </div>
                </div>
              </button>
            </div>

            {/* Quick Language & Theme Row */}
            <div className="pt-2 border-t border-parchment-subtle dark:border-slate-800 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onToggleLanguage}
                className="min-h-[44px] px-3 py-2 rounded-xl bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-2 text-ink dark:text-ink-dark"
              >
                <Globe className="w-4 h-4 text-carto-indigo dark:text-blue-400" />
                <span>{language === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}</span>
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                className="min-h-[44px] px-3 py-2 rounded-xl bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-2 text-ink dark:text-ink-dark"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>लाइट मोड</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-600" />
                    <span>डार्क मोड</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
