import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, Users, MapPin, Crown, Landmark, BookOpen, 
  Shield, Compass, Award, Info, ChevronLeft, Search, 
  ChevronRight, History, UserCheck, ChevronDown, ChevronUp,
  Sparkles, Tag, SearchX, Share2, Scale, MessageSquarePlus,
  Check, ExternalLink, HelpCircle
} from 'lucide-react';
import DistrictSpecialModal from './DistrictSpecialModal';
import { BUILD_LABEL } from '../utils/version';

export default function StateDetailView({
  selectedItem,
  onBackToList,
  onOpenConstitutionalModal,
  onOpenCompare,
  onOpenCorrection,
  language = 'en',
  activeTab: externalTab,
  onTabChange: externalTabChange,
  initialTab = 'districts',
  isCompact = false
}) {
  const [internalTab, setInternalTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlTab = new URLSearchParams(window.location.search).get('section') || new URLSearchParams(window.location.search).get('tab');
      if (urlTab && ['districts', 'cabinet', 'demographics', 'trivia'].includes(urlTab)) {
        return urlTab;
      }
    }
    return initialTab;
  });

  const activeTab = externalTab !== undefined ? externalTab : internalTab;
  const setActiveTab = externalTabChange !== undefined ? externalTabChange : setInternalTab;
  const [districtFilter, setDistrictFilter] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [selectedDivision, setSelectedDivision] = useState('ALL');
  const [selectedDistrictForModal, setSelectedDistrictForModal] = useState(null);
  const [isPastElectionsExpanded, setIsPastElectionsExpanded] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', newTab);
      window.history.replaceState({}, '', url.toString());
    } catch (e) {}
  };

  useEffect(() => {
    setDistrictFilter('');
    setSelectedLetter('ALL');
    setSelectedDivision('ALL');
  }, [selectedItem?.name]);

  if (!selectedItem) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center text-ink-muted bg-white dark:bg-slate-900">
        <div className="max-w-md space-y-3">
          <Building2 className="w-10 h-10 text-ink-muted mx-auto" aria-hidden="true" />
          <h3 className="text-base font-serif font-bold text-ink dark:text-ink-dark">
            {language === 'hi' ? 'राज्य या केंद्र शासित प्रदेश चुनें' : 'Select a State or Union Territory'}
          </h3>
          <p className="text-xs text-ink-muted">
            {language === 'hi'
              ? 'प्रशासनिक जिलों, कार्यकारी मंत्रिमंडल और संवैधानिक विवरण देखने के लिए सूची से चयन करें।'
              : 'Choose any state or union territory from the directory list on the left to view all its administrative districts, executive cabinet, and demographics.'}
          </p>
        </div>
      </div>
    );
  }

  const allDistricts = selectedItem.districts || [];
  const dyCMs = selectedItem.deputyChiefMinisters || [];
  const pastCMs = selectedItem.pastChiefMinisters || [];
  const displayName = language === 'hi' && selectedItem.hindi?.name ? selectedItem.hindi.name : selectedItem.name;
  const displayCapital = language === 'hi' && selectedItem.hindi?.capital ? selectedItem.hindi.capital : selectedItem.capital;
  const isState = selectedItem.type === 'State';
  const hasLegislature = !!selectedItem.legislature?.assemblySeats;
  const districtCount = allDistricts.length || selectedItem.demographics?.totalDistricts || 0;

  // Extract unique divisions for filter
  const divisions = useMemo(() => {
    const set = new Set();
    allDistricts.forEach(d => {
      if (d.division) set.add(d.division);
    });
    return Array.from(set).sort();
  }, [allDistricts]);

  // Extract available starting letters
  const availableLetters = useMemo(() => {
    const set = new Set();
    allDistricts.forEach(d => {
      const firstChar = d.name.charAt(0).toUpperCase();
      if (firstChar >= 'A' && firstChar <= 'Z') set.add(firstChar);
    });
    return Array.from(set).sort();
  }, [allDistricts]);

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'Heritage & History':
        return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
      case 'Nature & Wildlife':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
      case 'Spiritual & Pilgrimage':
        return 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800';
      case 'Industry & Tech':
        return 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800';
      case 'Agriculture & GI':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
      case 'Coastal & Maritime':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800';
      default:
        return 'bg-parchment-subtle text-ink-muted border-parchment-border dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  // Filter districts based on search query, starting letter, and division
  const filteredDistricts = useMemo(() => {
    return allDistricts.filter(d => {
      const q = districtFilter.toLowerCase().trim();
      const matchText = !q || 
        d.name.toLowerCase().includes(q) ||
        (d.hq && d.hq.toLowerCase().includes(q)) ||
        (d.division && d.division.toLowerCase().includes(q)) ||
        (d.knownAs && d.knownAs.toLowerCase().includes(q)) ||
        (d.highlight && d.highlight.toLowerCase().includes(q)) ||
        (d.specialties && d.specialties.some(s => s.toLowerCase().includes(q)));

      const matchLetter = selectedLetter === 'ALL' || d.name.toUpperCase().startsWith(selectedLetter);
      const matchDivision = selectedDivision === 'ALL' || d.division === selectedDivision;

      return matchText && matchLetter && matchDivision;
    });
  }, [allDistricts, districtFilter, selectedLetter, selectedDivision]);

  const handleShare = async () => {
    const slug = selectedItem.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const prefix = selectedItem.type === 'State' ? '/state/' : '/ut/';
    const shareUrl = `${window.location.origin}${prefix}${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${selectedItem.name} - Political Directory of India`,
          text: `Explore administrative profile, leadership, and districts of ${selectedItem.name}`,
          url: shareUrl
        });
      } catch (err) {
        copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const isFiltering = districtFilter.trim() !== '' || selectedLetter !== 'ALL' || selectedDivision !== 'ALL';

  return (
    <article 
      aria-label={`${selectedItem.name} Administrative Profile`}
      className="flex-1 flex flex-col h-full min-h-0 min-w-0 overflow-hidden max-w-full bg-white dark:bg-slate-900"
    >
      {/* Top Profile Header - Streamlined, Compact & Information-Dense */}
      <header className="p-3 sm:p-4 border-b border-parchment-border dark:border-slate-800 bg-parchment/80 dark:bg-slate-900/80 backdrop-blur-xs shrink-0 max-w-full min-w-0 overflow-hidden">
        
        {/* Mobile Back Button */}
        <button
          type="button"
          onClick={onBackToList}
          className="md:hidden flex items-center gap-1.5 text-xs text-carto-indigo dark:text-blue-400 font-semibold mb-2 px-3 py-2 min-h-[44px] rounded-lg bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 w-fit shadow-2xs focus-visible:ring-2 focus-visible:ring-carto-indigo"
          aria-label="Back to states and territories directory"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'निर्देशिका' : 'Directory'}</span>
        </button>

        <div className="flex items-start justify-between gap-2.5 sm:gap-3 min-w-0 max-w-full">
          
          {/* Main Title, Badges & Immediate Leadership */}
          <div className="min-w-0 flex-1">
            
            {/* Top Row: Entity Badges */}
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              
              {/* Neutral Party Chip */}
              <span className="inline-flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-ink dark:text-ink-dark shadow-2xs">
                <span 
                  className="w-2 h-2 rounded-full shrink-0" 
                  style={{ backgroundColor: selectedItem.rulingParty?.color || '#3B82F6' }} 
                />
                <span className="font-bold">{selectedItem.rulingParty?.abbr || selectedItem.rulingParty?.name || 'Admin'}</span>
                {selectedItem.rulingAlliance && selectedItem.rulingAlliance !== 'Other' && (
                  <span className="text-ink-muted truncate max-w-[220px]" title={selectedItem.rulingAlliance}>
                    ({selectedItem.rulingAlliance})
                  </span>
                )}
              </span>

              {/* Entity Type Badge */}
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-ink dark:text-ink-dark border border-parchment-border dark:border-slate-700 shadow-2xs">
                {selectedItem.type === 'State' 
                  ? (language === 'hi' ? 'राज्य' : 'State') 
                  : (language === 'hi' ? 'केंद्र शासित प्रदेश' : 'Union Territory')}
              </span>

              {/* Region */}
              {selectedItem.region && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-parchment-subtle dark:bg-slate-800 text-ink-muted border border-parchment-border dark:border-slate-700">
                  {selectedItem.region}
                </span>
              )}

              {/* Parliamentary Seats */}
              {selectedItem.parliamentarySeats && (
                <span 
                  className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-carto-indigo dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                  title={`${selectedItem.parliamentarySeats.lokSabha} Lok Sabha / ${selectedItem.parliamentarySeats.rajyaSabha} Rajya Sabha parliamentary seats in Parliament of India`}
                >
                  {selectedItem.parliamentarySeats.lokSabha} Lok Sabha / {selectedItem.parliamentarySeats.rajyaSabha} Rajya Sabha
                </span>
              )}
            </div>

            {/* State Name */}
            <h2 
              title={selectedItem.name}
              className="text-xl sm:text-2xl font-serif font-bold text-ink dark:text-ink-dark tracking-tight break-words"
            >
              {displayName}
              {language === 'hi' && selectedItem.name !== displayName && (
                <span className="text-xs text-ink-muted font-sans font-normal ml-2">
                  ({selectedItem.name})
                </span>
              )}
            </h2>

            {/* Direct Executive Leadership Line (Immediately Visible in Header) */}
            <div className="flex items-center gap-3 mt-1 text-xs text-ink-muted flex-wrap">
              <div className="flex items-center gap-1.5 shrink-0">
                <Building2 className="w-3.5 h-3.5 text-carto-gold shrink-0" aria-hidden="true" />
                <span>{language === 'hi' ? 'राजधानी:' : 'Capital:'}</span>
                <strong className="text-ink dark:text-ink-dark font-semibold">{displayCapital}</strong>
              </div>

              {/* Chief Minister or Governor/Administrator - ALWAYS VISIBLE */}
              <div className="flex items-center gap-1.5 shrink-0">
                <Crown className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
                <span>
                  {selectedItem.chiefMinister?.name 
                    ? (language === 'hi' ? 'मुख्यमंत्री:' : 'CM:') 
                    : (selectedItem.governor?.role ? `${selectedItem.governor.role}:` : 'Admin:')}
                </span>
                <strong className="text-ink dark:text-ink-dark font-semibold">
                  {selectedItem.chiefMinister?.name || selectedItem.governor?.name || 'Administrator'}
                </strong>
                {selectedItem.chiefMinister?.party && (
                  <span className="text-[10px] text-ink-muted">({selectedItem.chiefMinister.party.split('(')[0].trim()})</span>
                )}
                <span className="text-[10px] font-sans text-ink-muted hidden sm:inline" title={`Official record verified as of ${selectedItem.chiefMinister?.asOfDate || selectedItem.governor?.asOfDate || 'November 2026'}`}>
                  &bull; as of {selectedItem.chiefMinister?.asOfDate || selectedItem.governor?.asOfDate || 'Nov 2026'}
                </span>
              </div>

              {selectedItem.highCourt && (
                <div className="flex items-center gap-1.5 shrink-0" title={`High Court Jurisdiction: ${selectedItem.highCourt}`}>
                  <Landmark className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                  <span>{language === 'hi' ? 'न्यायपालिका:' : 'Judiciary:'}</span>
                  <strong className="text-ink dark:text-ink-dark font-semibold whitespace-normal">{selectedItem.highCourt}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Buttons: Share, Compare, Report */}
          <div className="flex items-center gap-1.5 shrink-0 self-start">
            <button
              type="button"
              onClick={handleShare}
              className="min-h-[40px] px-2.5 sm:px-3 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-parchment dark:hover:bg-slate-700 border border-parchment-border dark:border-slate-700 text-xs font-semibold text-ink dark:text-ink-dark transition-all shadow-2xs flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-carto-indigo"
              aria-label="Share permalink to this administrative profile"
              title="Share or Copy Link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold hidden sm:inline">{language === 'hi' ? 'कॉपी!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-carto-indigo dark:text-blue-400" />
                  <span className="hidden sm:inline">{language === 'hi' ? 'शेयर' : 'Share'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onOpenCompare([selectedItem])}
              className="min-h-[40px] px-2.5 sm:px-3 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-parchment dark:hover:bg-slate-700 border border-parchment-border dark:border-slate-700 text-xs font-semibold text-ink dark:text-ink-dark transition-all shadow-2xs flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-carto-indigo"
              aria-label={`Compare ${selectedItem.name} with other states`}
              title="Compare with another State"
            >
              <Scale className="w-3.5 h-3.5 text-carto-gold" />
              <span className="hidden sm:inline">{language === 'hi' ? 'तुलना' : 'Compare'}</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenCorrection(selectedItem.name)}
              className="min-h-[40px] px-2.5 sm:px-3 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-parchment-border dark:border-slate-700 text-xs font-semibold text-ink dark:text-ink-dark transition-all shadow-2xs flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-carto-indigo"
              aria-label={`Report an official correction for ${selectedItem.name}`}
              title="Report an Official Correction"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">{language === 'hi' ? 'सुधार' : 'Report'}</span>
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs with Overflow Cue */}
        <div className="relative mt-3 border-b border-parchment-border dark:border-slate-800">
          <div 
            role="tablist"
            aria-label="State Detail Views"
            className="flex items-center gap-1.5 pb-0 overflow-x-auto scrollbar-none pr-8"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'districts'}
              onClick={() => handleTabChange('districts')}
              className={`min-h-[40px] pb-2 px-3 text-xs font-semibold border-b-2 transition-all shrink-0 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-carto-indigo focus-visible:outline-none ${
                activeTab === 'districts'
                  ? 'border-carto-indigo text-carto-indigo dark:text-blue-400 font-bold'
                  : 'border-transparent text-ink-muted hover:text-ink dark:hover:text-ink-dark'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{language === 'hi' ? 'जिले' : 'Districts'} ({districtCount})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'cabinet'}
              onClick={() => handleTabChange('cabinet')}
              className={`min-h-[40px] pb-2 px-3 text-xs font-semibold border-b-2 transition-all shrink-0 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-carto-indigo focus-visible:outline-none ${
                activeTab === 'cabinet'
                  ? 'border-carto-indigo text-carto-indigo dark:text-blue-400 font-bold'
                  : 'border-transparent text-ink-muted hover:text-ink dark:hover:text-ink-dark'
              }`}
            >
              <Crown className="w-3.5 h-3.5 shrink-0 text-amber-600" aria-hidden="true" />
              <span>
                {hasLegislature 
                  ? (language === 'hi' ? 'कार्यकारी मंत्रिमंडल' : 'Executive Cabinet') 
                  : (language === 'hi' ? 'प्रशासनिक प्रमुख' : 'Executive Administration')}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'demographics'}
              onClick={() => handleTabChange('demographics')}
              className={`min-h-[40px] pb-2 px-3 text-xs font-semibold border-b-2 transition-all shrink-0 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-carto-indigo focus-visible:outline-none ${
                activeTab === 'demographics'
                  ? 'border-carto-indigo text-carto-indigo dark:text-blue-400 font-bold'
                  : 'border-transparent text-ink-muted hover:text-ink dark:hover:text-ink-dark'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 shrink-0 text-carto-gold" aria-hidden="true" />
              <span>{language === 'hi' ? 'संवैधानिक एवं सांख्यिकी' : 'Demographics'}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'trivia'}
              onClick={() => handleTabChange('trivia')}
              className={`min-h-[40px] pb-2 px-3 text-xs font-semibold border-b-2 transition-all shrink-0 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-carto-indigo focus-visible:outline-none ${
                activeTab === 'trivia'
                  ? 'border-carto-indigo text-carto-indigo dark:text-blue-400 font-bold'
                  : 'border-transparent text-ink-muted hover:text-ink dark:hover:text-ink-dark'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              <span>{language === 'hi' ? 'शैक्षणिक तथ्य' : 'Notes'}</span>
            </button>
          </div>

          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-parchment to-transparent dark:from-slate-900 sm:hidden" />
        </div>
      </header>

      {/* Main Scrollable Content Body */}
      <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden max-w-full p-4 sm:p-5 pb-24 sm:pb-6 space-y-4 bg-parchment/40 dark:bg-slate-900/40">

        {/* 4 Stat Cards - Single-line labels with linked official sources, tabular sans typography */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-ink-muted block mb-0.5">
              {language === 'hi' ? 'जिले' : 'Districts'}
            </span>
            <strong className="text-sm sm:text-base font-sans font-bold tabular-nums tracking-tight text-ink dark:text-ink-dark block">
              {districtCount}
            </strong>
            <span className="text-[10px] text-ink-muted block mt-0.5 leading-tight whitespace-normal">
              786 in India &bull; <a href="https://surveyofindia.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:underline text-carto-indigo dark:text-blue-400">Survey of India</a>
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-ink-muted block mb-0.5">
              {language === 'hi' ? 'जनसंख्या' : 'Population'}
            </span>
            <strong className="text-sm sm:text-base font-sans font-bold tabular-nums tracking-tight text-ink dark:text-ink-dark block">
              {selectedItem.demographics?.census2011Population?.toLocaleString() || selectedItem.demographics?.population?.split('(')[0] || 'N/A'}
            </strong>
            <span className="text-[10px] text-ink-muted block mt-0.5 leading-tight whitespace-normal">
              <a href="https://censusindia.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:underline text-carto-indigo dark:text-blue-400">Census 2011</a> &bull; 2024&nbsp;est.&nbsp;(<a href="https://uidai.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:underline text-carto-indigo dark:text-blue-400">UIDAI</a>):&nbsp;{selectedItem.demographics?.currentEstimate?.split('(')[0]?.trim() || 'Projected'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-ink-muted block mb-0.5">
              {language === 'hi' ? 'क्षेत्रफल' : 'Area'}
            </span>
            <strong className="text-sm sm:text-base font-sans font-bold tabular-nums tracking-tight text-ink dark:text-ink-dark block">
              {selectedItem.demographics?.areaSqKm ? `${selectedItem.demographics.areaSqKm.toLocaleString()}\u202Fkm²` : 'N/A'}
            </strong>
            <span className="text-[10px] text-ink-muted block mt-0.5 leading-tight whitespace-normal">
              {selectedItem.demographics?.areaRank || 'Official'} &bull; <a href="https://surveyofindia.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:underline text-carto-indigo dark:text-blue-400">Survey of India</a>
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-ink-muted block mb-0.5">
              {language === 'hi' ? 'साक्षरता' : 'Literacy'}
            </span>
            <strong className="text-sm sm:text-base font-sans font-bold tabular-nums tracking-tight text-ink dark:text-ink-dark block">
              {selectedItem.demographics?.literacyRate || 'N/A'}
            </strong>
            <span className="text-[10px] text-ink-muted block mt-0.5 leading-tight whitespace-normal">
              <a href="https://censusindia.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:underline text-carto-indigo dark:text-blue-400">Census of India, 2011</a>
            </span>
          </div>
        </div>
        
        {/* TAB 1: ALL DISTRICTS DIRECTORY */}
        {activeTab === 'districts' && (
          <div className="space-y-3 max-w-6xl">
            
            {/* Districts Controls Bar: Search & Division Filter */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-sm text-ink dark:text-ink-dark flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-carto-indigo dark:text-blue-400 shrink-0" aria-hidden="true" />
                    <span>{language === 'hi' ? 'प्रशासनिक जिले' : 'Administrative Districts'}</span>
                  </h3>
                  {isFiltering && (
                    <p className="text-xs text-carto-indigo dark:text-blue-400 font-medium mt-0.5">
                      Showing {filteredDistricts.length} {filteredDistricts.length === 1 ? 'district' : 'districts'}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <label htmlFor="district-search-input" className="sr-only">Search districts</label>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" aria-hidden="true" />
                    <input
                      id="district-search-input"
                      type="search"
                      value={districtFilter}
                      onChange={(e) => setDistrictFilter(e.target.value)}
                      placeholder={language === 'hi' ? 'जिला खोजें...' : 'Search districts...'}
                      className="w-full h-10 pl-9 pr-3 rounded-lg bg-parchment/60 dark:bg-slate-900 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark placeholder-ink-muted/70 focus:outline-none focus:border-carto-indigo focus-visible:ring-2 focus-visible:ring-carto-indigo"
                    />
                  </div>

                  {divisions.length > 1 && (
                    <div className="relative">
                      <label htmlFor="division-select-dropdown" className="sr-only">Filter by Division</label>
                      <select
                        id="division-select-dropdown"
                        value={selectedDivision}
                        onChange={(e) => setSelectedDivision(e.target.value)}
                        className="h-10 bg-parchment/60 dark:bg-slate-900 border border-parchment-border dark:border-slate-700 rounded-lg px-3 text-xs text-ink dark:text-ink-dark focus:outline-none focus:border-carto-indigo cursor-pointer"
                      >
                        <option value="ALL">{language === 'hi' ? 'सभी संभाग' : 'All Divisions'}</option>
                        {divisions.map(div => (
                          <option key={div} value={div}>{div} {language === 'hi' ? 'संभाग' : 'Division'}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Alphabetical Quick Jump Bar */}
              {availableLetters.length > 2 && (
                <div className="flex items-center gap-1 overflow-x-auto pt-2 border-t border-parchment-subtle dark:border-slate-700 scrollbar-none text-xs">
                  <span className="text-[10px] text-ink-muted font-sans font-bold uppercase mr-1 shrink-0">Letter:</span>
                  <button
                    type="button"
                    onClick={() => setSelectedLetter('ALL')}
                    className={`min-h-[38px] min-w-[38px] px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors shrink-0 flex items-center justify-center ${
                      selectedLetter === 'ALL'
                        ? 'bg-carto-indigo text-white'
                        : 'bg-parchment-subtle dark:bg-slate-700 text-ink-muted hover:text-ink'
                    }`}
                  >
                    All
                  </button>
                  {availableLetters.map(letter => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => setSelectedLetter(letter)}
                      className={`min-h-[38px] min-w-[34px] px-2 py-1 rounded-md text-[11px] font-semibold transition-colors shrink-0 flex items-center justify-center ${
                        selectedLetter === letter
                          ? 'bg-carto-indigo text-white'
                          : 'bg-parchment-subtle dark:bg-slate-700 text-ink-muted hover:text-ink'
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reduced Density Districts Grid: Name, HQ, 1-line description, max 2 tags */}
            <div className={`grid gap-2.5 ${isCompact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'}`}>
              {filteredDistricts.length > 0 ? (
                filteredDistricts.map((district, idx) => (
                  <div
                    key={district.name}
                    tabIndex={0}
                    role="button"
                    aria-label={`${district.name} District, Headquarters: ${district.hq || district.name}`}
                    onClick={() => setSelectedDistrictForModal(district)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedDistrictForModal(district);
                      }
                    }}
                    className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 hover:border-carto-indigo dark:hover:border-blue-400 hover:shadow-card transition-all flex flex-col justify-between space-y-2 group shadow-2xs cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-carto-indigo min-w-0 max-w-full overflow-hidden"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1.5 mb-1">
                        <h4 className="font-serif font-bold text-sm text-ink dark:text-ink-dark group-hover:text-carto-indigo dark:group-hover:text-blue-400 transition-colors truncate">
                          {district.name}
                        </h4>
                        {district.category && (
                          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-md border shrink-0 truncate max-w-[130px] ${getCategoryStyle(district.category)}`}>
                            {district.category}
                          </span>
                        )}
                      </div>

                      {/* HQ line */}
                      <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                        <span>HQ: <strong>{district.hq || district.name}</strong></span>
                        {district.division && (
                          <>
                            <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                            <span className="text-[11px] text-ink-muted">{district.division} Div.</span>
                          </>
                        )}
                      </div>

                      {/* One-line description / highlight */}
                      {(district.knownAs || district.highlight) && (
                        <p className="text-xs text-ink-muted line-clamp-1 mb-2 font-normal">
                          {district.knownAs || district.highlight}
                        </p>
                      )}

                      {/* Max 2 Tags */}
                      {district.specialties && district.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {district.specialties.slice(0, 2).map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-parchment dark:bg-slate-700 text-ink dark:text-ink-dark border border-parchment-border dark:border-slate-600 font-medium inline-flex items-center gap-1"
                            >
                              <Tag className="w-2.5 h-2.5 text-ink-muted shrink-0" aria-hidden="true" />
                              <span>{spec}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-parchment-subtle dark:border-slate-700 flex items-center justify-between text-[11px] text-ink-muted">
                      <span className="font-mono">#{idx + 1}</span>
                      <span className="text-carto-indigo dark:text-blue-400 font-medium group-hover:underline flex items-center gap-0.5">
                        <span>{language === 'hi' ? 'विवरण' : 'Details'}</span>
                        <ChevronRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full p-8 text-center bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 rounded-2xl space-y-3">
                  <SearchX className="w-8 h-8 text-ink-muted mx-auto" aria-hidden="true" />
                  <h4 className="text-sm font-serif font-bold text-ink dark:text-ink-dark">
                    {language === 'hi' ? 'कोई जिला नहीं मिला' : 'No districts match filter'}
                  </h4>
                  <p className="text-xs text-ink-muted max-w-sm mx-auto">
                    No districts found matching "{districtFilter}". Try adjusting your keywords or clearing the division filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setDistrictFilter(''); setSelectedDivision('ALL'); setSelectedLetter('ALL'); }}
                    className="min-h-[44px] px-4 py-2 rounded-lg bg-parchment-subtle hover:bg-parchment dark:bg-slate-700 text-carto-indigo dark:text-blue-300 border border-parchment-border dark:border-slate-600 text-xs font-semibold"
                  >
                    Clear search and filters
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: EXECUTIVE LEADERSHIP / CABINET */}
        {activeTab === 'cabinet' && (
          <div className="space-y-4 max-w-4xl">
            
            {/* If State or UT with Legislature: Chief Minister Card */}
            {hasLegislature ? (
              <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
                      <Crown className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-[10px] font-sans uppercase tracking-wider text-amber-700 dark:text-amber-400 block font-bold">
                        Chief Minister (Head of Government) &bull; As of {selectedItem.chiefMinister?.asOfDate || 'November 2026'}
                      </span>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-ink dark:text-ink-dark">
                        {selectedItem.chiefMinister?.name || 'N/A'}
                      </h3>
                      {selectedItem.chiefMinister?.swearingInDate && (
                        <p className="text-xs text-ink-muted font-sans mt-0.5">
                          Sworn in: <strong className="text-ink dark:text-ink-dark font-mono font-medium">{selectedItem.chiefMinister.swearingInDate}</strong>
                        </p>
                      )}
                      {selectedItem.chiefMinister?.source && (
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-ink-muted font-sans">
                          <span>Source:</span>
                          <a 
                            href={selectedItem.chiefMinister.sourceUrl || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-carto-indigo dark:text-blue-400 hover:underline inline-flex items-center gap-0.5"
                          >
                            <span>{selectedItem.chiefMinister.source}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-parchment-subtle dark:bg-slate-700 text-ink dark:text-ink-dark border border-parchment-border dark:border-slate-600 shadow-2xs">
                    {selectedItem.chiefMinister?.party?.split('(')[0] || 'Executive'}
                  </span>
                </div>
                {selectedItem.rulingParty?.assemblyStrength && (
                  <div className="mt-3 pt-2.5 border-t border-parchment-subtle dark:border-slate-700 flex items-center justify-between text-xs text-ink-muted">
                    <span>Ruling Party / Strength:</span>
                    <span className="font-semibold text-ink dark:text-ink-dark">{selectedItem.rulingParty.name} ({selectedItem.rulingParty.assemblyStrength})</span>
                  </div>
                )}
              </div>
            ) : (
              /* For UTs WITHOUT Legislature: Direct Central Governance Notice */
              <div className="p-4 sm:p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 text-carto-indigo dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-carto-indigo dark:text-blue-300 font-bold block">
                      Article 239 Administration &bull; As of November 2026
                    </span>
                    <h3 className="font-serif font-bold text-base text-ink dark:text-ink-dark">
                      Direct Central Administration
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedItem.name} does not possess an elected Legislative Assembly or Chief Minister. 
                      Under Article 239 of the Constitution of India, executive authority is vested in the President of India, 
                      administered through the appointed {selectedItem.governor?.role || 'Administrator'}.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Deputy Chief Minister(s) Card (If applicable) */}
            {hasLegislature && (
              <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-parchment-subtle dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-carto-indigo dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-ink dark:text-ink-dark">
                        Deputy Chief Minister(s)
                      </h4>
                      <span className="text-[11px] text-ink-muted">
                        State Executive Leadership
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-parchment-subtle dark:bg-slate-700 text-ink-muted border border-parchment-border dark:border-slate-600">
                    {dyCMs.length > 0 ? `${dyCMs.length} Designated` : 'None Designated'}
                  </span>
                </div>

                {dyCMs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5">
                    {dyCMs.map((dy, idx) => (
                      <div 
                        key={idx}
                        className="p-3 rounded-lg bg-parchment/60 dark:bg-slate-900 border border-parchment-border dark:border-slate-700 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1.5 mb-1">
                            <h5 className="font-serif font-bold text-sm text-ink dark:text-ink-dark">
                              {dy.name}
                            </h5>
                            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-ink-muted border border-parchment-border dark:border-slate-700 shrink-0">
                              {dy.party?.split('(')[0] || 'Dy CM'}
                            </span>
                          </div>
                          <p className="text-xs text-carto-indigo dark:text-blue-400 font-medium">
                            {dy.party}
                          </p>
                        </div>
                        {dy.portfolio && (
                          <p className="text-[11px] text-ink-muted mt-2 pt-1.5 border-t border-parchment-subtle dark:border-slate-800 leading-relaxed">
                            <strong>Portfolio:</strong> {dy.portfolio}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-ink-muted mt-1 italic">
                    No Deputy Chief Minister is designated under the current council of ministers for {selectedItem.name}.
                  </p>
                )}
              </div>
            )}

            {/* Governor / Lt. Governor / Administrator Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-carto-indigo dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-sans uppercase tracking-wider text-carto-indigo dark:text-blue-400 font-bold">
                        {selectedItem.governor?.role || (isState ? 'Governor' : 'Administrator')}
                      </span>
                      <span className="text-[9px] text-ink-muted font-mono">
                        As of {selectedItem.governor?.asOfDate || 'November 2026'}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-ink dark:text-ink-dark mt-0.5">
                      {selectedItem.governor?.name || 'N/A'}
                    </h4>
                    {selectedItem.governor?.source && (
                      <div className="flex items-center gap-1 mt-1 text-[11px] text-ink-muted font-sans">
                        <span>Source:</span>
                        <a 
                          href={selectedItem.governor.sourceUrl || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-carto-indigo dark:text-blue-400 hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>{selectedItem.governor.source}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    )}
                    <p className="text-[11px] text-ink-muted mt-1">
                      Constitutional executive representing the President of India.
                    </p>
                  </div>
                </div>
              </div>

              {selectedItem.speaker?.name ? (
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-parchment-subtle dark:bg-slate-700 text-ink-muted border border-parchment-border dark:border-slate-600 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-sans uppercase tracking-wider text-ink-muted font-bold">
                        Speaker of Legislative Assembly
                      </span>
                      <h4 className="font-serif font-bold text-sm text-ink dark:text-ink-dark mt-0.5">
                        {selectedItem.speaker.name}
                      </h4>
                      <p className="text-[11px] text-ink-muted mt-1">
                        Presides over the {selectedItem.speaker?.assembly || 'Vidhan Sabha'}.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-parchment-subtle dark:bg-slate-700 text-ink-muted border border-parchment-border dark:border-slate-600 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-sans uppercase tracking-wider text-ink-muted font-bold">
                        Legislative Status
                      </span>
                      <h4 className="font-serif font-bold text-sm text-ink dark:text-ink-dark mt-0.5">
                        No Legislative Assembly
                      </h4>
                      <p className="text-[11px] text-ink-muted mt-1">
                        Parliament of India exercises supreme legislative power over this territory.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* State Home Minister */}
            {selectedItem.homeMinister?.name && (
              <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="text-[10px] font-sans uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">
                        Home Portfolio
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-md bg-parchment-subtle dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 border border-parchment-border dark:border-slate-600 font-mono">
                        7th Schedule List II (Public Order & Police)
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-ink dark:text-ink-dark mt-1">
                      {selectedItem.homeMinister.name}
                    </h4>
                    <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">
                      {selectedItem.homeMinister?.note || selectedItem.homeMinister?.portfolio || 'Administers state law and order, police forces, criminal investigations, and civil defense.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Defence Portfolio Clarification */}
            <div className="p-4 sm:p-5 rounded-xl bg-parchment/60 dark:bg-slate-900 border border-parchment-border dark:border-slate-700 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-carto-indigo dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="text-[10px] font-sans uppercase tracking-wider text-carto-indigo dark:text-blue-400 font-bold">
                      Defence Portfolio Clarification
                    </span>
                    <span className="text-[9px] font-sans font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-carto-indigo dark:text-blue-400 border border-parchment-border dark:border-slate-700">
                      Article 246 Union Exclusive
                    </span>
                  </div>

                  <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                    Under the <strong>Seventh Schedule (List I: Union List)</strong> of the Constitution of India, 
                    <strong> National Defence</strong> is exclusively under the jurisdiction of the Union Government. 
                    No individual Indian state has a "State Defense Minister":
                  </p>

                  <div className="mt-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between text-ink-muted">
                      <span>Union Defence Minister:</span>
                      <strong className="text-ink dark:text-ink-dark">
                        {selectedItem.defensePortfolio?.unionDefenseMinister?.split('(')[0] || 'Rajnath Singh'}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-ink-muted">
                      <span>State-Level Counterpart:</span>
                      <span className="text-ink dark:text-ink-dark font-medium">
                        {selectedItem.defensePortfolio?.stateEquivalent || 'Directorate of Sainik Welfare'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenConstitutionalModal}
                    className="mt-3 text-xs text-carto-indigo dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 group"
                  >
                    <span>Read Full 7th Schedule Constitutional Explainer</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Former Chief Ministers & Last 3 Elections */}
            {pastCMs.length > 0 && (
              <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setIsPastElectionsExpanded(!isPastElectionsExpanded)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-parchment-subtle dark:bg-slate-700 text-ink-muted border border-parchment-border dark:border-slate-600 flex items-center justify-center shrink-0">
                      <History className="w-4 h-4 text-ink-muted" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-ink dark:text-ink-dark">
                        Former Chief Ministers (Last 3 Assembly Elections)
                      </h4>
                      <p className="text-[11px] text-ink-muted">
                        Historical executive leadership and election tenures
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-ink-muted">
                    <span className="text-[11px] font-medium hidden sm:inline">
                      {isPastElectionsExpanded ? 'Hide History' : 'Show History'}
                    </span>
                    {isPastElectionsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isPastElectionsExpanded && (
                  <div className="mt-4 pt-3 border-t border-parchment-subtle dark:border-slate-700 space-y-3">
                    {pastCMs.map((past, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg bg-parchment/60 dark:bg-slate-900 border border-parchment-border dark:border-slate-700 relative pl-4 hover:border-slate-400 transition-all"
                      >
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-carto-indigo rounded-r" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-serif font-bold text-ink dark:text-ink-dark">
                              {past.name}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-ink-muted border border-parchment-border dark:border-slate-700 shadow-2xs">
                              {past.party}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-carto-indigo dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              {past.electionYear}
                            </span>
                            <span className="text-[11px] font-medium text-ink-muted">
                              Term: {past.term}
                            </span>
                          </div>
                        </div>

                        {past.note && (
                          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                            {past.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* TAB 3: PARLIAMENTARY & DEMOGRAPHICS */}
        {activeTab === 'demographics' && (
          <div className="space-y-4 max-w-4xl">
            
            {/* Parliamentary & Legislative Representation Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-parchment-subtle dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-carto-indigo/10 text-carto-indigo dark:text-blue-400 border border-carto-indigo/20 flex items-center justify-center shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-ink dark:text-ink-dark">
                      Parliamentary & Legislative Representation
                    </h3>
                    <p className="text-[11px] text-ink-muted">
                      Constitutional allocation of seats under the Representation of the People Act
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-ink-muted">
                  ECI / Census 2011 Basis
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-parchment/60 dark:bg-slate-900 border border-parchment-border dark:border-slate-700">
                  <span className="text-[10px] font-sans uppercase text-carto-indigo dark:text-blue-400 font-bold block mb-1">
                    Lok Sabha (Lower House)
                  </span>
                  <div className="font-mono font-bold text-xl text-ink dark:text-ink-dark">
                    {selectedItem.parliamentarySeats?.lokSabha || 0}
                  </div>
                  <span className="text-[10px] text-ink-muted block mt-0.5">
                    out of 543 seats ({(((selectedItem.parliamentarySeats?.lokSabha || 0) / 543) * 100).toFixed(1)}% of House)
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-parchment/60 dark:bg-slate-900 border border-parchment-border dark:border-slate-700">
                  <span className="text-[10px] font-sans uppercase text-amber-700 dark:text-amber-400 font-bold block mb-1">
                    Rajya Sabha (Upper House)
                  </span>
                  <div className="font-mono font-bold text-xl text-ink dark:text-ink-dark">
                    {selectedItem.parliamentarySeats?.rajyaSabha || 0}
                  </div>
                  <span className="text-[10px] text-ink-muted block mt-0.5">
                    out of 233 elected seats
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-parchment/60 dark:bg-slate-900 border border-parchment-border dark:border-slate-700">
                  <span className="text-[10px] font-sans uppercase text-emerald-700 dark:text-emerald-400 font-bold block mb-1">
                    Legislative Assembly
                  </span>
                  <div className="font-mono font-bold text-xl text-ink dark:text-ink-dark">
                    {selectedItem.legislature?.assemblySeats || 'None'}
                  </div>
                  <span className="text-[10px] text-ink-muted block mt-0.5">
                    {selectedItem.legislature?.assemblySeats ? `${selectedItem.legislature.councilSeats ? 'Bicameral' : 'Unicameral'} &bull; ${selectedItem.legislature.assemblySeats} seats` : 'No State Assembly'}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-parchment/60 dark:bg-slate-900 border border-parchment-border dark:border-slate-700">
                  <span className="text-[10px] font-sans uppercase text-purple-700 dark:text-purple-400 font-bold block mb-1">
                    Legislative Council
                  </span>
                  <div className="font-mono font-bold text-xl text-ink dark:text-ink-dark">
                    {selectedItem.legislature?.councilSeats ? `${selectedItem.legislature.councilSeats}` : 'None'}
                  </div>
                  <span className="text-[10px] text-ink-muted block mt-0.5">
                    {selectedItem.legislature?.councilSeats ? 'Vidhan Parishad Seats (Bicameral)' : 'Unicameral Legislature'}
                  </span>
                </div>
              </div>

              {selectedItem.highCourt && (
                <div className="p-3 rounded-lg bg-parchment-subtle dark:bg-slate-900/80 border border-parchment-border dark:border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-carto-indigo dark:text-blue-400 shrink-0" />
                    <div>
                      <span className="text-ink-muted block text-[10px] uppercase font-sans font-bold">Territorial Jurisdiction</span>
                      <strong className="text-ink dark:text-ink-dark">{selectedItem.highCourt}</strong>
                    </div>
                  </div>
                  <span className="text-[10px] font-sans text-ink-muted">Article 214</span>
                </div>
              )}
            </div>

            {/* Official Languages & Economy */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs space-y-3 text-xs">
              <div>
                <span className="text-ink-muted block mb-1 font-semibold">Official Language(s):</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.demographics?.officialLanguages?.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-parchment/60 dark:bg-slate-900 text-ink dark:text-ink-dark border border-parchment-border dark:border-slate-700 font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {selectedItem.demographics?.gdp && (
                <div className="pt-2.5 border-t border-parchment-subtle dark:border-slate-700">
                  <span className="text-ink-muted block mb-1 font-semibold">Gross State Domestic Product (GSDP):</span>
                  <p className="font-serif font-bold text-ink dark:text-ink-dark text-sm">{selectedItem.demographics.gdp}</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 4: EDUCATIONAL TRIVIA */}
        {activeTab === 'trivia' && (
          <div className="space-y-3 max-w-4xl">
            <div className="flex items-center gap-2 text-xs text-carto-gold font-semibold mb-2">
              <Info className="w-4 h-4" />
              <span>Key Academic Pointers for Students & Competitive Exams</span>
            </div>

            {selectedItem.educationalTrivia?.map((fact, idx) => (
              <div 
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 shadow-2xs text-xs text-ink-muted leading-relaxed flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-md bg-parchment-subtle dark:bg-slate-700 text-carto-indigo dark:text-blue-300 flex items-center justify-center shrink-0 font-mono font-bold text-xs mt-0.5 border border-parchment-border dark:border-slate-600">
                  {idx + 1}
                </div>
                <p className="flex-1 text-ink dark:text-ink-dark leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        )}

        {/* Data Provenance & Last Updated Footer */}
        <footer className="mt-8 pt-4 border-t border-parchment-border dark:border-slate-800 text-[11px] text-ink-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            <strong>Data Sources:</strong>{' '}
            <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-carto-indigo dark:text-blue-400">ECI</a>,{' '}
            <a href="https://censusindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-carto-indigo dark:text-blue-400">Census of India</a>,{' '}
            <a href="https://www.mha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-carto-indigo dark:text-blue-400">MHA</a>,{' '}
            <a href="https://surveyofindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-carto-indigo dark:text-blue-400">Survey of India</a>,{' '}
            <a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-carto-indigo dark:text-blue-400">UIDAI</a>
          </span>
          <div className="flex items-center gap-2">
            <span>Sources linked per field. Last reviewed November 2026</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-parchment-subtle dark:bg-slate-800 border border-parchment-border dark:border-slate-700">{BUILD_LABEL}</span>
          </div>
        </footer>

      </div>

      {/* Interactive District Special Details Modal */}
      <DistrictSpecialModal
        district={selectedDistrictForModal}
        stateName={selectedItem.name}
        onClose={() => setSelectedDistrictForModal(null)}
      />

    </article>
  );
}
