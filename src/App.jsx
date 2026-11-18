import React, { useState, useMemo, useEffect, Component } from 'react';
import Header from './components/Header';
import StateList from './components/StateList';
import StateDetailView from './components/StateDetailView';
import IndiaMapView from './components/IndiaMapView';
import CompareModal from './components/CompareModal';
import ConstitutionalModal from './components/ConstitutionalModal';
import { MethodologyModal, ChangelogModal, ReportCorrectionModal } from './components/TrustModals';
import MobileBottomNav from './components/MobileBottomNav';
import { AlertTriangle, RotateCcw, List, Map as MapIcon, X, ChevronLeft, ChevronRight, Scale } from 'lucide-react';

import statesData from './data/statesData.json';

// Split States & Union Territories dynamically from verified data
const allStates = statesData.filter(item => item.type === 'State');
const allUTs = statesData.filter(item => item.type !== 'State');

// Error Boundary for resilient failure recovery
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex items-center justify-center p-6 bg-parchment text-ink text-center">
          <div className="max-w-md p-6 bg-white border border-parchment-border rounded-2xl shadow-float space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-base font-serif font-bold text-ink">
              Something went wrong loading directory data
            </h2>
            <p className="text-xs text-ink-muted leading-relaxed">
              An unexpected display issue occurred. Please reset the view to restore the directory.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-carto-indigo text-white text-xs font-semibold hover:bg-blue-900 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Directory</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function slugify(name) {
  return name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '';
}

export default function App() {
  const [activeTab, setActiveTab] = useState('states'); // 'states' or 'uts'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'population', 'area', 'literacy', 'districts'
  const [selectedAlliance, setSelectedAlliance] = useState('ALL');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedPopRange, setSelectedPopRange] = useState('ALL');
  const [viewMode, setViewMode] = useState('split'); // 'split' or 'map'
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'
  const [selectedItem, setSelectedItem] = useState(allStates[0]);
  const [isDark, setIsDark] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [isMobileMapDossierOpen, setIsMobileMapDossierOpen] = useState(false);
  const [isMobileMapPreviewDismissed, setIsMobileMapPreviewDismissed] = useState(false);
  const [detailSection, setDetailSection] = useState('districts');

  // Modals state
  const [showConstitutionalModal, setShowConstitutionalModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareInitialStates, setCompareInitialStates] = useState([]);
  const [showMethodologyModal, setShowMethodologyModal] = useState(false);
  const [showChangelogModal, setShowChangelogModal] = useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionTargetState, setCorrectionTargetState] = useState('');

  // 1. Parse URL Path & Query Parameters on Initial Mount
  useEffect(() => {
    try {
      const pathname = window.location.pathname.replace(/\/$/, '');
      const statePathMatch = pathname.match(/^\/state\/([a-z0-9-]+)$/i);
      const utPathMatch = pathname.match(/^\/ut\/([a-z0-9-]+)$/i);
      const flatPathMatch = pathname.match(/^\/([a-z0-9-]+)$/i);
      const targetSlug = statePathMatch ? statePathMatch[1] : (utPathMatch ? utPathMatch[1] : (flatPathMatch && !['index.html', 'state', 'ut'].includes(flatPathMatch[1]) ? flatPathMatch[1] : null));

      const params = new URLSearchParams(window.location.search);
      const stateParam = params.get('state');
      const viewParam = params.get('view');
      const langParam = params.get('lang');
      const tabParam = params.get('tab');
      const sectionParam = params.get('section') || (['cabinet', 'districts', 'demographics', 'trivia'].includes(tabParam) ? tabParam : null);
      const popParam = params.get('pop');
      const compareParam = params.get('compare');

      if (sectionParam) {
        setDetailSection(sectionParam);
      }

      if (popParam) {
        setSelectedPopRange(popParam);
      }

      if (langParam === 'hi' || langParam === 'en') {
        setLanguage(langParam);
      }

      if (viewParam === 'map') {
        setViewMode('map');
      }

      if (tabParam === 'uts') {
        setActiveTab('uts');
      }

      if (targetSlug) {
        const found = statesData.find(s => slugify(s.name) === targetSlug.toLowerCase());
        if (found) {
          setSelectedItem(found);
          setActiveTab(found.type === 'State' ? 'states' : 'uts');
          setIsMobileDetailOpen(true);
        }
      } else if (stateParam) {
        const found = statesData.find(
          s => s.name.toLowerCase() === stateParam.toLowerCase() ||
               (s.hindi?.name && s.hindi.name === stateParam) ||
               (s.aliases && s.aliases.some(a => a.toLowerCase() === stateParam.toLowerCase()))
        );
        if (found) {
          setSelectedItem(found);
          setActiveTab(found.type === 'State' ? 'states' : 'uts');
          setIsMobileDetailOpen(true);
        }
      }

      if (compareParam) {
        const names = compareParam.split(',').map(n => n.trim().toLowerCase());
        const initial = statesData.filter(s => names.includes(s.name.toLowerCase()));
        if (initial.length > 0) {
          setCompareInitialStates(initial);
          setShowCompareModal(true);
        }
      }
    } catch (e) {
      console.warn('URL parsing error:', e);
    }
  }, []);

  // 2. Synchronize URL path and search parameters seamlessly
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      
      let basePath = '/';
      if (selectedItem?.name && (!isMobile || isMobileDetailOpen || viewMode === 'map')) {
        const slug = slugify(selectedItem.name);
        basePath = selectedItem.type === 'State' ? `/state/${slug}` : `/ut/${slug}`;
        params.delete('state'); // Redirect ?state= to canonical path
      } else {
        params.delete('state');
      }

      if (viewMode === 'map') {
        params.set('view', 'map');
      } else {
        params.delete('view');
      }
      if (language === 'hi') {
        params.set('lang', 'hi');
      } else {
        params.delete('lang');
      }
      if (activeTab === 'uts') {
        params.set('tab', 'uts');
      } else {
        params.delete('tab');
      }
      if (selectedPopRange !== 'ALL') {
        params.set('pop', selectedPopRange);
      } else {
        params.delete('pop');
      }
      if (detailSection && detailSection !== 'districts') {
        params.set('section', detailSection);
      } else {
        params.delete('section');
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${basePath}?${queryString}` : basePath;
      window.history.replaceState({}, '', newUrl);
    } catch (e) {
      // Non-blocking in sandboxed environments
    }
  }, [selectedItem, viewMode, language, activeTab, selectedPopRange, detailSection, isMobileDetailOpen]);

  // Sync dark class on html root element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Dynamically update document title and meta tags per state/territory and language
  useEffect(() => {
    if (selectedItem?.name) {
      const name = language === 'hi' && selectedItem.hindi?.name ? selectedItem.hindi.name : selectedItem.name;
      const fullTitle = `${name} - ${language === 'hi' ? 'भारत की राजनीतिक निर्देशिका' : 'Political Directory of India'}`;
      document.title = fullTitle;

      const leaderRole = selectedItem.chiefMinister ? 'Chief Minister' : (selectedItem.governor?.role || 'Administrator');
      const leaderName = selectedItem.chiefMinister?.name || selectedItem.governor?.name || 'Administrator';
      const desc = `${selectedItem.name} (${selectedItem.type}): Capital ${selectedItem.capital}, ${leaderRole} ${leaderName}, ${selectedItem.districts?.length || 0} districts, Census 2011 population ${selectedItem.demographics?.census2011Population?.toLocaleString()}. Non-partisan civic reference.`;

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', desc);

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', fullTitle);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', desc);
    } else {
      document.title = language === 'hi'
        ? "भारत की राजनीतिक निर्देशिका - 28 राज्य एवं 8 केंद्र शासित प्रदेश"
        : "Political Directory of India - 28 States and 8 Union Territories";
    }
  }, [selectedItem, language]);

  // Filter & sort items based on activeTab, searchQuery, filters, and sortBy
  const displayedItems = useMemo(() => {
    const baseList = activeTab === 'states' ? allStates : allUTs;
    let list = [...baseList];

    // Text search query across all multi-indexes
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((item) => {
        const matchName = item.name.toLowerCase().includes(q) || 
                          (item.hindi?.name && item.hindi.name.toLowerCase().includes(q));
        const matchCapital = item.capital && item.capital.toLowerCase().includes(q);
        const matchCM = item.chiefMinister?.name && item.chiefMinister.name.toLowerCase().includes(q);
        const matchGovernor = item.governor?.name && item.governor.name.toLowerCase().includes(q);
        const matchParty = item.rulingParty?.name && item.rulingParty.name.toLowerCase().includes(q);
        const matchAlliance = item.rulingAlliance && item.rulingAlliance.toLowerCase().includes(q);
        const matchDistricts = item.districts && item.districts.some(
          d => d.name.toLowerCase().includes(q) || 
               (d.hq && d.hq.toLowerCase().includes(q)) ||
               (d.division && d.division.toLowerCase().includes(q)) ||
               (d.highlight && d.highlight.toLowerCase().includes(q)) ||
               (d.knownAs && d.knownAs.toLowerCase().includes(q)) ||
               (d.category && d.category.toLowerCase().includes(q)) ||
               (d.specialties && d.specialties.some(s => s.toLowerCase().includes(q)))
        );
        const matchAliases = item.aliases && item.aliases.some(a => a.toLowerCase().includes(q));

        return matchName || matchCapital || matchCM || matchGovernor || matchParty || matchAlliance || matchDistricts || matchAliases;
      });
    }

    // Alliance filter
    if (selectedAlliance !== 'ALL') {
      list = list.filter(item => {
        if (selectedAlliance === 'Central Admin') return item.rulingAlliance === 'Central' || item.type !== 'State';
        return item.rulingAlliance === selectedAlliance;
      });
    }

    // Region filter
    if (selectedRegion !== 'ALL') {
      list = list.filter(item => item.region === selectedRegion);
    }

    // Population Range filter
    if (selectedPopRange !== 'ALL') {
      list = list.filter(item => {
        const pop = item.demographics?.census2011Population || 0;
        if (selectedPopRange === 'mega') return pop > 50000000;
        if (selectedPopRange === 'major') return pop >= 10000000 && pop <= 50000000;
        if (selectedPopRange === 'small') return pop < 10000000;
        return true;
      });
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = language === 'hi' && a.hindi?.name ? a.hindi.name : a.name;
        const nameB = language === 'hi' && b.hindi?.name ? b.hindi.name : b.name;
        return nameA.localeCompare(nameB);
      }
      if (sortBy === 'population') {
        const popA = parseInt(a.demographics?.population?.replace(/[^0-9]/g, '') || '0', 10);
        const popB = parseInt(b.demographics?.population?.replace(/[^0-9]/g, '') || '0', 10);
        return popB - popA;
      }
      if (sortBy === 'area') {
        const areaA = a.demographics?.areaSqKm || 0;
        const areaB = b.demographics?.areaSqKm || 0;
        return areaB - areaA;
      }
      if (sortBy === 'literacy') {
        const litA = parseFloat(a.demographics?.literacyRate?.replace('%', '') || '0');
        const litB = parseFloat(b.demographics?.literacyRate?.replace('%', '') || '0');
        return litB - litA;
      }
      if (sortBy === 'districts') {
        const da = a.districts?.length || a.demographics?.totalDistricts || 0;
        const db = b.districts?.length || b.demographics?.totalDistricts || 0;
        return db - da;
      }
      return 0;
    });

    return list;
  }, [activeTab, searchQuery, selectedAlliance, selectedRegion, selectedPopRange, sortBy, language]);

  // Set default selection if none selected
  useEffect(() => {
    if (!selectedItem && displayedItems.length > 0) {
      setSelectedItem(displayedItems[0]);
    }
  }, [displayedItems, selectedItem]);

  // Handle switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const targetList = tab === 'states' ? allStates : allUTs;
    if (targetList.length > 0) {
      setSelectedItem(targetList[0]);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsMobileDetailOpen(true);
    setIsMobileMapPreviewDismissed(false);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedAlliance('ALL');
    setSelectedRegion('ALL');
    setSelectedPopRange('ALL');
    setSortBy('name');
  };

  const handleOpenCompareWithState = (states = []) => {
    setCompareInitialStates(states.length > 0 ? states : [selectedItem]);
    setShowCompareModal(true);
  };

  const handleOpenCorrection = (stateName = '') => {
    setCorrectionTargetState(stateName || selectedItem?.name || '');
    setShowCorrectionModal(true);
  };

  return (
    <ErrorBoundary>
      <div className={`relative w-full max-w-full h-screen h-[100dvh] max-h-screen flex flex-col overflow-hidden overflow-x-hidden ${
        isDark ? 'bg-slate-900 text-ink-dark dark' : 'bg-parchment text-ink'
      }`}>
        
        {/* Editorial Cartographic Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          allItems={statesData}
          onSelectItem={handleSelectItem}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onOpenCompare={() => handleOpenCompareWithState()}
          onOpenMethodology={() => setShowMethodologyModal(true)}
          onOpenChangelog={() => setShowChangelogModal(true)}
          onOpenCorrection={() => handleOpenCorrection()}
          onOpenConstitutionalModal={() => setShowConstitutionalModal(true)}
          language={language}
          onToggleLanguage={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          totalStates={allStates.length}
          totalUTs={allUTs.length}
        />

        {/* Main Workspace Area */}
        <main className="flex-1 flex overflow-hidden min-h-0 min-w-0 relative">
          
          {/* VIEW MODE 1: INTERACTIVE MAP VIEW */}
          {viewMode === 'map' ? (
            <div className="flex-1 flex flex-col md:flex-row h-full min-h-0 min-w-0 relative">
              {/* Map Canvas */}
              <div className="flex-1 h-full min-h-0 min-w-0 relative">
                <IndiaMapView
                  items={statesData}
                  selectedItem={selectedItem}
                  onSelectItem={(item) => {
                    setSelectedItem(item);
                    setIsMobileMapPreviewDismissed(false);
                  }}
                  language={language}
                  isDark={isDark}
                />

                {/* Mobile Floating Preview Card for Map View */}
                {selectedItem && !isMobileMapPreviewDismissed && (
                  <div className="md:hidden absolute left-3 right-3 bottom-16 z-30 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-parchment-border dark:border-slate-800 rounded-2xl shadow-float animate-in slide-in-from-bottom-2 duration-200">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-serif font-bold text-sm sm:text-base text-ink dark:text-ink-dark truncate">
                            {language === 'hi' && selectedItem.hindi?.name ? selectedItem.hindi.name : selectedItem.name}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-sans uppercase px-1.5 py-0.5 rounded bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-ink dark:text-ink-dark font-medium">
                            <span 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: selectedItem.rulingParty?.color || '#3b82f6' }} 
                            />
                            <span>{selectedItem.rulingAlliance || selectedItem.rulingParty?.abbr || 'Admin'}</span>
                          </span>
                        </div>
                        <div className="text-[11px] text-ink-muted mt-0.5 truncate">
                          {language === 'hi' ? 'राजधानी:' : 'Capital:'} <strong className="text-ink dark:text-ink-dark font-semibold">{language === 'hi' && selectedItem.hindi?.capital ? selectedItem.hindi.capital : selectedItem.capital}</strong> &bull; {selectedItem.chiefMinister?.name ? `CM: ${selectedItem.chiefMinister.name}` : (selectedItem.governor?.name || 'Administrator')}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsMobileMapPreviewDismissed(true)}
                        className="min-h-[36px] min-w-[36px] flex items-center justify-center text-ink-muted hover:text-ink dark:hover:text-ink-dark rounded-lg"
                        aria-label="Dismiss preview"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Key Stats Chips */}
                    <div className="grid grid-cols-4 gap-1 py-1.5 text-center border-t border-b border-parchment-subtle dark:border-slate-800 my-1.5">
                      <div className="p-1 rounded bg-parchment-subtle dark:bg-slate-800">
                        <span className="text-ink-muted block text-[8px] uppercase font-bold">Districts</span>
                        <strong className="font-mono text-ink dark:text-ink-dark text-xs">{selectedItem.districts?.length || selectedItem.demographics?.totalDistricts || 0}</strong>
                      </div>
                      <div className="p-1 rounded bg-parchment-subtle dark:bg-slate-800">
                        <span className="text-ink-muted block text-[8px] uppercase font-bold">Population</span>
                        <strong className="font-mono text-ink dark:text-ink-dark text-xs">{selectedItem.demographics?.population?.split('(')[0]?.trim() || 'N/A'}</strong>
                      </div>
                      <div className="p-1 rounded bg-parchment-subtle dark:bg-slate-800">
                        <span className="text-ink-muted block text-[8px] uppercase font-bold">Area</span>
                        <strong className="font-mono text-ink dark:text-ink-dark text-xs">{selectedItem.demographics?.areaSqKm ? `${selectedItem.demographics.areaSqKm.toLocaleString()}` : 'N/A'}</strong>
                      </div>
                      <div className="p-1 rounded bg-parchment-subtle dark:bg-slate-800">
                        <span className="text-ink-muted block text-[8px] uppercase font-bold">Literacy</span>
                        <strong className="font-mono text-ink dark:text-ink-dark text-xs">{selectedItem.demographics?.literacyRate || 'N/A'}</strong>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => setIsMobileMapDossierOpen(true)}
                        className="flex-1 min-h-[40px] px-3 py-1.5 rounded-lg bg-carto-indigo dark:bg-blue-600 text-white text-xs font-semibold hover:bg-blue-800 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>{language === 'hi' ? 'विवरण एवं जिले देखें' : 'View Full Dossier & Districts'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCompareWithState([selectedItem])}
                        className="min-h-[40px] px-3 py-1.5 rounded-lg bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs font-semibold text-ink dark:text-ink-dark hover:bg-parchment-subtle flex items-center gap-1"
                        aria-label="Compare state"
                      >
                        <Scale className="w-3.5 h-3.5 text-carto-gold" />
                        <span>{language === 'hi' ? 'तुलना' : 'Compare'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Full-Screen Mobile Drawer for State Detail from Map View */}
                {isMobileMapDossierOpen && selectedItem && (
                  <div 
                    className="md:hidden fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col animate-in slide-in-from-bottom duration-200"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selectedItem.name} Administrative Dossier`}
                  >
                    <div className="flex items-center justify-between p-2.5 px-3 border-b border-parchment-border dark:border-slate-800 bg-parchment dark:bg-slate-900 shrink-0">
                      <button
                        type="button"
                        onClick={() => setIsMobileMapDossierOpen(false)}
                        className="min-h-[38px] flex items-center gap-1.5 text-xs text-carto-indigo dark:text-blue-400 font-bold px-2.5 py-1 rounded-lg border border-parchment-border dark:border-slate-700 bg-white dark:bg-slate-800"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>{language === 'hi' ? 'मानचित्र पर वापस' : 'Back to Map'}</span>
                      </button>
                      <span className="text-xs font-serif font-bold text-ink dark:text-ink-dark truncate px-2">
                        {language === 'hi' && selectedItem.hindi?.name ? selectedItem.hindi.name : selectedItem.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsMobileMapDossierOpen(false)}
                        className="min-h-[38px] min-w-[38px] flex items-center justify-center text-ink-muted hover:text-ink dark:hover:text-ink-dark"
                        aria-label="Close dossier"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-1 min-h-0 overflow-hidden pb-16">
                      <StateDetailView
                        selectedItem={selectedItem}
                        onBackToList={() => setIsMobileMapDossierOpen(false)}
                        onOpenConstitutionalModal={() => setShowConstitutionalModal(true)}
                        onOpenCompare={handleOpenCompareWithState}
                        onOpenCorrection={handleOpenCorrection}
                        language={language}
                        activeTab={detailSection}
                        onTabChange={setDetailSection}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Side Dossier Panel in Map View (Desktop and Tablet landscape) */}
              <aside className="hidden md:flex flex-col w-[480px] lg:w-[540px] xl:w-[580px] max-w-[50vw] shrink-0 h-full border-l border-parchment-border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-float z-20 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between p-2.5 px-3 border-b border-parchment-border dark:border-slate-800 bg-parchment/80 dark:bg-slate-900/80 shrink-0 min-w-0">
                  <span className="text-xs font-serif font-bold text-ink dark:text-ink-dark truncate pr-2">
                    {language === 'hi' ? 'प्रशासनिक विवरण' : 'Administrative Dossier'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode('split')}
                    className="text-xs text-carto-indigo dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold shrink-0"
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'पूर्ण निर्देशिका देखें' : 'View Full Directory'}</span>
                  </button>
                </div>
                <div className="flex-1 min-h-0 min-w-0 overflow-hidden flex flex-col">
                  <StateDetailView
                    selectedItem={selectedItem}
                    onBackToList={() => {}}
                    onOpenConstitutionalModal={() => setShowConstitutionalModal(true)}
                    onOpenCompare={handleOpenCompareWithState}
                    onOpenCorrection={handleOpenCorrection}
                    language={language}
                    activeTab={detailSection}
                    onTabChange={setDetailSection}
                    isCompact={true}
                  />
                </div>
              </aside>
            </div>
          ) : (
            /* VIEW MODE 2: DIRECTORY MASTER-DETAIL SPLIT VIEW */
            <>
              {/* Left Master List Pane */}
              <section className={`w-full md:w-[380px] lg:w-[420px] shrink-0 h-full min-h-0 min-w-0 ${
                isMobileDetailOpen ? 'hidden md:flex flex-col' : 'flex flex-col'
              }`}>
                <StateList
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  items={displayedItems}
                  selectedItem={selectedItem}
                  onSelectItem={handleSelectItem}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  selectedAlliance={selectedAlliance}
                  onAllianceChange={setSelectedAlliance}
                  selectedRegion={selectedRegion}
                  onRegionChange={setSelectedRegion}
                  selectedPopRange={selectedPopRange}
                  onPopRangeChange={setSelectedPopRange}
                  statesCount={allStates.length}
                  utsCount={allUTs.length}
                  language={language}
                  onResetFilters={handleResetFilters}
                />
              </section>

              {/* Right Detail Pane */}
              <section className={`flex-1 h-full min-h-0 min-w-0 ${
                !isMobileDetailOpen ? 'hidden md:flex flex-col' : 'flex flex-col'
              }`}>
                <StateDetailView
                  selectedItem={selectedItem}
                  onBackToList={() => setIsMobileDetailOpen(false)}
                  onOpenConstitutionalModal={() => setShowConstitutionalModal(true)}
                  onOpenCompare={handleOpenCompareWithState}
                  onOpenCorrection={handleOpenCorrection}
                  language={language}
                  activeTab={detailSection}
                  onTabChange={setDetailSection}
                />
              </section>
            </>
          )}

        </main>

        {/* Comparison Matrix Modal */}
        <CompareModal
          isOpen={showCompareModal}
          onClose={() => setShowCompareModal(false)}
          allItems={statesData}
          initialStates={compareInitialStates}
          language={language}
        />

        {/* Methodology & Provenance Modal */}
        <MethodologyModal
          isOpen={showMethodologyModal}
          onClose={() => setShowMethodologyModal(false)}
        />

        {/* Changelog & Updates Modal */}
        <ChangelogModal
          isOpen={showChangelogModal}
          onClose={() => setShowChangelogModal(false)}
        />

        {/* Report a Correction Modal */}
        <ReportCorrectionModal
          isOpen={showCorrectionModal}
          onClose={() => setShowCorrectionModal(false)}
          stateName={correctionTargetState}
        />

        {/* Constitutional 7th Schedule Guide Modal */}
        <ConstitutionalModal
          isOpen={showConstitutionalModal}
          onClose={() => setShowConstitutionalModal(false)}
        />

        {/* Persistent Thumb-Friendly Mobile Bottom Navigation Bar */}
        <MobileBottomNav
          viewMode={viewMode}
          onViewModeChange={(mode) => {
            setViewMode(mode);
            if (mode === 'map') {
              setIsMobileMapPreviewDismissed(false);
            }
          }}
          isMobileDetailOpen={isMobileDetailOpen}
          onBackToList={() => setIsMobileDetailOpen(false)}
          onOpenCompare={() => handleOpenCompareWithState()}
          onOpenMethodology={() => setShowMethodologyModal(true)}
          onOpenConstitutionalModal={() => setShowConstitutionalModal(true)}
          onOpenChangelog={() => setShowChangelogModal(true)}
          onOpenCorrection={() => handleOpenCorrection()}
          language={language}
          onToggleLanguage={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
        />

      </div>
    </ErrorBoundary>
  );
}
