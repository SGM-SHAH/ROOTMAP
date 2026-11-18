import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, X, BookOpen, Sun, Moon, Landmark, 
  Map as MapIcon, List, Scale, ChevronDown, 
  ShieldCheck, History, MessageSquarePlus, Building2, 
  Users, MapPin, UserCheck 
} from 'lucide-react';

export default function Header({
  searchQuery,
  onSearchChange,
  allItems = [],
  onSelectItem,
  viewMode = 'split',
  onViewModeChange,
  onOpenCompare,
  onOpenMethodology,
  onOpenChangelog,
  onOpenCorrection,
  onOpenConstitutionalModal,
  language = 'en',
  onToggleLanguage,
  isDark = false,
  onToggleTheme,
  totalStates = 28,
  totalUTs = 8
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTrustMenuOpen, setIsTrustMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const trustMenuRef = useRef(null);
  const searchContainerRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Scroll compression
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close trust menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (trustMenuRef.current && !trustMenuRef.current.contains(e.target)) {
        setIsTrustMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target) && isMobileSearchOpen) {
        // keep open if clicking inside input
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileSearchOpen]);

  // Multi-index autocomplete results
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q || q.length < 2) return { states: [], districts: [], leaders: [] };

    const matchingStates = [];
    const matchingDistricts = [];
    const matchingLeaders = [];

    for (const item of allItems) {
      // 1. Match state name, capital, hindi
      const nameMatch = item.name.toLowerCase().includes(q) || 
                         (item.hindi?.name && item.hindi.name.toLowerCase().includes(q));
      const capMatch = item.capital && item.capital.toLowerCase().includes(q);

      if (nameMatch || capMatch) {
        matchingStates.push({
          type: 'state',
          item,
          title: language === 'hi' && item.hindi?.name ? item.hindi.name : item.name,
          subtitle: `Capital: ${language === 'hi' && item.hindi?.capital ? item.hindi.capital : item.capital} (${item.type})`
        });
      }

      // 2. Match leaders (CM, Governor)
      if (item.chiefMinister?.name && item.chiefMinister.name.toLowerCase().includes(q)) {
        matchingLeaders.push({
          type: 'leader',
          item,
          role: 'Chief Minister',
          title: item.chiefMinister.name,
          subtitle: `${item.name} (${item.rulingParty?.abbr || 'CM'})`
        });
      }
      if (item.governor?.name && item.governor.name.toLowerCase().includes(q)) {
        matchingLeaders.push({
          type: 'leader',
          item,
          role: item.governor.role || 'Governor',
          title: item.governor.name,
          subtitle: `${item.name}`
        });
      }

      // 3. Match districts
      if (item.districts) {
        for (const dist of item.districts) {
          if (matchingDistricts.length >= 6) break;
          if (
            dist.name.toLowerCase().includes(q) || 
            (dist.hq && dist.hq.toLowerCase().includes(q)) ||
            (dist.highlight && dist.highlight.toLowerCase().includes(q))
          ) {
            matchingDistricts.push({
              type: 'district',
              item,
              title: dist.name,
              subtitle: `District in ${item.name} (HQ: ${dist.hq || dist.name})`
            });
          }
        }
      }
    }

    return {
      states: matchingStates.slice(0, 4),
      districts: matchingDistricts.slice(0, 5),
      leaders: matchingLeaders.slice(0, 3)
    };
  }, [searchQuery, allItems, language]);

  const hasAutocompleteResults = 
    (isSearchFocused || isMobileSearchOpen) && 
    searchQuery.trim().length >= 2 && 
    (searchResults.states.length > 0 || searchResults.districts.length > 0 || searchResults.leaders.length > 0);

  const handleSelectAutocomplete = (item) => {
    onSelectItem(item);
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
  };

  return (
    <>
      <header 
        role="banner"
        className={`sticky top-0 z-40 px-3 sm:px-6 flex items-center justify-between bg-parchment/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-parchment-border dark:border-slate-800 transition-all duration-200 ${
          isScrolled ? 'h-13 shadow-xs' : 'h-14 shadow-2xs'
        }`}
      >
        {/* Brand Identity */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-1">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white dark:bg-slate-800 text-carto-indigo dark:text-blue-400 border border-parchment-border dark:border-slate-700 flex items-center justify-center shrink-0 shadow-2xs">
            <Landmark className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-carto-indigo dark:text-blue-400" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-xs sm:text-base font-serif font-bold tracking-tight text-ink dark:text-ink-dark truncate max-w-[170px] sm:max-w-none">
                {language === 'hi' ? 'भारत की राजनीतिक निर्देशिका' : 'Political Directory of India'}
              </h1>
              <span className="hidden xs:inline-block text-[9px] sm:text-[10px] font-sans uppercase tracking-wider px-1.5 py-0.5 rounded bg-carto-indigo/10 text-carto-indigo dark:text-blue-300 border border-carto-indigo/20 font-bold shrink-0">
                {language === 'hi' ? 'संदर्भ' : 'REFERENCE'}
              </span>
            </div>
            <p className="text-[11px] text-ink-muted dark:text-ink-dark-muted font-sans hidden sm:block truncate">
              {language === 'hi' 
                ? `${totalStates} राज्य एवं ${totalUTs} केंद्र शासित प्रदेश • जनगणना, सर्वे ऑफ इंडिया एवं ECI से संकलित`
                : `${totalStates} States & ${totalUTs} UTs • Compiled from Census of India, Survey of India & ECI`
              }
            </p>
          </div>
        </div>

        {/* Desktop Global Autocomplete Search Bar */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-md mx-3 lg:mx-6 hidden md:block">
          <label htmlFor="global-search" className="sr-only">
            Search directory by state, territory, capital, leader, or district
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" aria-hidden="true" />
            <input
              id="global-search"
              type="search"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setIsSearchFocused(true);
              }}
              placeholder={language === 'hi' ? 'राज्य, नेता खोजें…' : 'Search states, leaders…'}
              className="w-full h-10 pl-9 pr-10 rounded-lg bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark placeholder-ink-muted/70 focus:outline-none focus:border-carto-indigo dark:focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-carto-indigo focus-visible:ring-offset-1 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-0 top-0 bottom-0 min-h-[44px] min-w-[40px] flex items-center justify-center text-ink-muted hover:text-ink dark:hover:text-ink-dark focus-visible:ring-2 focus-visible:ring-carto-indigo rounded-r-lg"
                aria-label="Clear search text"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown (Desktop) */}
          {hasAutocompleteResults && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-900 border border-parchment-border dark:border-slate-700 rounded-xl shadow-float z-50 max-h-96 overflow-y-auto divide-y divide-parchment-subtle dark:divide-slate-800">
              {/* States & UTs */}
              {searchResults.states.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] font-sans uppercase tracking-wider text-ink-muted px-2 py-1 font-bold">
                    States & Territories
                  </div>
                  {searchResults.states.map(({ item, title, subtitle }) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleSelectAutocomplete(item)}
                      className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-parchment dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-carto-indigo dark:text-blue-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-ink dark:text-ink-dark group-hover:text-carto-indigo">
                            {title}
                          </div>
                          <div className="text-[11px] text-ink-muted">
                            {subtitle}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-sans font-medium px-1.5 py-0.5 rounded bg-parchment-subtle dark:bg-slate-800 text-ink-muted">
                        Select
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Leaders */}
              {searchResults.leaders.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] font-sans uppercase tracking-wider text-ink-muted px-2 py-1 font-bold">
                    Executive Leaders
                  </div>
                  {searchResults.leaders.map(({ item, title, subtitle, role }, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectAutocomplete(item)}
                      className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-parchment dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-carto-gold dark:text-amber-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-ink dark:text-ink-dark group-hover:text-carto-indigo">
                            {title}
                          </div>
                          <div className="text-[11px] text-ink-muted">
                            {subtitle} &bull; {role}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-sans font-medium px-1.5 py-0.5 rounded bg-parchment-subtle dark:bg-slate-800 text-ink-muted">
                        View
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Districts */}
              {searchResults.districts.length > 0 && (
                <div className="p-2">
                  <div className="text-[10px] font-sans uppercase tracking-wider text-ink-muted px-2 py-1 font-bold">
                    Districts
                  </div>
                  {searchResults.districts.map(({ item, title, subtitle }, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectAutocomplete(item)}
                      className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-parchment dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-ink dark:text-ink-dark group-hover:text-carto-indigo">
                            {title}
                          </div>
                          <div className="text-[11px] text-ink-muted">
                            {subtitle}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-parchment-subtle dark:bg-slate-800 text-ink-muted">
                        Open State
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation & Controls */}
        <nav aria-label="Atlas Controls" className="flex items-center gap-1.5 shrink-0">
          
          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(prev => !prev)}
            className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border transition-all ${
              isMobileSearchOpen 
                ? 'bg-carto-indigo text-white border-carto-indigo' 
                : 'bg-white dark:bg-slate-800 text-ink dark:text-ink-dark border-parchment-border dark:border-slate-700 hover:bg-parchment'
            }`}
            aria-label="Toggle Global Search"
            aria-expanded={isMobileSearchOpen}
          >
            {isMobileSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>

          {/* Desktop View Mode Switcher: Directory vs Map */}
          <div className="hidden md:flex items-center p-1 rounded-lg bg-parchment-subtle dark:bg-slate-800 border border-parchment-border dark:border-slate-700">
            <button
              type="button"
              onClick={() => onViewModeChange('split')}
              className={`min-h-[36px] px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'split' || viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-carto-indigo dark:text-blue-300 font-bold shadow-2xs'
                  : 'text-ink-muted hover:text-ink'
              }`}
              title="Directory & Details View"
            >
              <List className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'निर्देशिका' : 'Directory'}</span>
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange('map')}
              className={`min-h-[36px] px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'map'
                  ? 'bg-white dark:bg-slate-700 text-carto-indigo dark:text-blue-300 font-bold shadow-2xs'
                  : 'text-ink-muted hover:text-ink'
              }`}
              title="Interactive Cartographic Map"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'मानचित्र' : 'Map View'}</span>
            </button>
          </div>

          {/* Desktop Compare Mode Button */}
          <button
            type="button"
            onClick={onOpenCompare}
            className="hidden md:flex min-h-[44px] items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-parchment dark:hover:bg-slate-700 border border-parchment-border dark:border-slate-700 text-xs font-semibold text-ink dark:text-ink-dark transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-carto-indigo"
            aria-label="Compare 2 or 3 States side by side"
            title="Compare States Side-by-Side"
          >
            <Scale className="w-4 h-4 text-carto-indigo dark:text-blue-400 shrink-0" aria-hidden="true" />
            <span className="hidden xl:inline">{language === 'hi' ? 'तुलना करें' : 'Compare'}</span>
          </button>

          {/* Language Toggle Button (Always Available) */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="min-h-[44px] min-w-[44px] px-2.5 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-parchment dark:hover:bg-slate-700 border border-parchment-border dark:border-slate-700 text-xs font-bold text-ink dark:text-ink-dark transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-carto-indigo flex items-center justify-center"
            aria-label={language === 'en' ? 'Switch language to Hindi' : 'Switch language to English'}
            title={language === 'en' ? 'हिन्दी में देखें' : 'View in English'}
          >
            <span className="font-mono text-[11px] text-carto-indigo dark:text-blue-400">
              {language === 'en' ? 'हिन्दी' : 'ENG'}
            </span>
          </button>

          {/* Desktop Trust & Provenance Menu Dropdown */}
          <div ref={trustMenuRef} className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setIsTrustMenuOpen(!isTrustMenuOpen)}
              className="min-h-[44px] flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-parchment dark:hover:bg-slate-700 border border-parchment-border dark:border-slate-700 text-xs font-semibold text-ink dark:text-ink-dark transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-carto-indigo"
              aria-expanded={isTrustMenuOpen}
              aria-haspopup="true"
              aria-label="Data Provenance, Methodology, and Constitutional Information"
              title="Methodology, Provenance & Reports"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span className="hidden lg:inline">{language === 'hi' ? 'प्रमाणिकता' : 'Trust'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-ink-muted" />
            </button>

            {isTrustMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl bg-white dark:bg-slate-900 border border-parchment-border dark:border-slate-700 shadow-float z-50 p-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setIsTrustMenuOpen(false);
                    onOpenMethodology();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-parchment dark:hover:bg-slate-800 flex items-center gap-2.5 text-ink dark:text-ink-dark"
                >
                  <ShieldCheck className="w-4 h-4 text-carto-indigo dark:text-blue-400 shrink-0" />
                  <div>
                    <div className="font-semibold">{language === 'hi' ? 'कार्यप्रणाली एवं स्रोत' : 'Methodology & Sources'}</div>
                    <div className="text-[10px] text-ink-muted">Census 2011 & Survey of India</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsTrustMenuOpen(false);
                    onOpenConstitutionalModal();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-parchment dark:hover:bg-slate-800 flex items-center gap-2.5 text-ink dark:text-ink-dark"
                >
                  <BookOpen className="w-4 h-4 text-carto-gold dark:text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold">{language === 'hi' ? 'सातवीं अनुसूची निर्देशिका' : '7th Schedule Guide'}</div>
                    <div className="text-[10px] text-ink-muted">Union, State & Concurrent Lists</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsTrustMenuOpen(false);
                    onOpenChangelog();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-parchment dark:hover:bg-slate-800 flex items-center gap-2.5 text-ink dark:text-ink-dark"
                >
                  <History className="w-4 h-4 text-slate-500 shrink-0" />
                  <div>
                    <div className="font-semibold">{language === 'hi' ? 'अद्यतन इतिहास' : 'Changelog'}</div>
                    <div className="text-[10px] text-ink-muted">Audit trail of data revisions</div>
                  </div>
                </button>

                <div className="my-1 border-t border-parchment-subtle dark:border-slate-800" />

                <button
                  type="button"
                  onClick={() => {
                    setIsTrustMenuOpen(false);
                    onOpenCorrection();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-amber-50/60 dark:hover:bg-amber-950/40 text-amber-900 dark:text-amber-300 flex items-center gap-2.5 font-medium"
                >
                  <MessageSquarePlus className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <div>
                    <div className="font-semibold">{language === 'hi' ? 'सुधार का सुझाव दें' : 'Report a Correction'}</div>
                    <div className="text-[10px] text-ink-muted">Submit verified source feedback</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Always Available) */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-parchment dark:hover:bg-slate-700 border border-parchment-border dark:border-slate-700 text-ink dark:text-ink-dark transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-carto-indigo"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-500" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" aria-hidden="true" />
            )}
          </button>

        </nav>
      </header>

      {/* Mobile Global Autocomplete Dropdown Panel */}
      {isMobileSearchOpen && (
        <div 
          ref={mobileSearchRef}
          className="md:hidden sticky top-14 z-30 p-3 bg-white dark:bg-slate-900 border-b border-parchment-border dark:border-slate-800 shadow-float space-y-2 animate-in slide-in-from-top-2 duration-150"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" aria-hidden="true" />
            <input
              id="mobile-global-search"
              type="search"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={language === 'hi' ? 'राज्य, नेता खोजें…' : 'Search states, leaders…'}
              className="w-full h-11 pl-9 pr-10 rounded-lg bg-parchment/60 dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark placeholder-ink-muted/70 focus:outline-none focus:border-carto-indigo"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-0 top-0 bottom-0 min-h-[44px] min-w-[40px] flex items-center justify-center text-ink-muted hover:text-ink dark:hover:text-ink-dark"
                aria-label="Clear search text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Results on Mobile */}
          {hasAutocompleteResults && (
            <div className="max-h-72 overflow-y-auto divide-y divide-parchment-subtle dark:divide-slate-800 border border-parchment-border dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900">
              {/* States & UTs */}
              {searchResults.states.length > 0 && (
                <div className="p-1.5">
                  <div className="text-[10px] font-sans uppercase tracking-wider text-ink-muted px-2 py-1 font-bold">
                    States & Territories
                  </div>
                  {searchResults.states.map(({ item, title, subtitle }) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleSelectAutocomplete(item)}
                      className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-parchment dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-carto-indigo dark:text-blue-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-ink dark:text-ink-dark">{title}</div>
                          <div className="text-[11px] text-ink-muted">{subtitle}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-parchment-subtle dark:bg-slate-800 text-ink-muted">
                        Select
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Leaders */}
              {searchResults.leaders.length > 0 && (
                <div className="p-1.5">
                  <div className="text-[10px] font-sans uppercase tracking-wider text-ink-muted px-2 py-1 font-bold">
                    Executive Leaders
                  </div>
                  {searchResults.leaders.map(({ item, title, subtitle, role }, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectAutocomplete(item)}
                      className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-parchment dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-carto-gold dark:text-amber-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-ink dark:text-ink-dark">{title}</div>
                          <div className="text-[11px] text-ink-muted">{subtitle} &bull; {role}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-parchment-subtle dark:bg-slate-800 text-ink-muted">
                        View
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Districts */}
              {searchResults.districts.length > 0 && (
                <div className="p-1.5">
                  <div className="text-[10px] font-sans uppercase tracking-wider text-ink-muted px-2 py-1 font-bold">
                    Districts
                  </div>
                  {searchResults.districts.map(({ item, title, subtitle }, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectAutocomplete(item)}
                      className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-parchment dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-ink dark:text-ink-dark">{title}</div>
                          <div className="text-[11px] text-ink-muted">{subtitle}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-parchment-subtle dark:bg-slate-800 text-ink-muted">
                        Open State
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
