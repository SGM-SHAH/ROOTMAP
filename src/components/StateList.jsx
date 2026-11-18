import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, Search, ArrowUpDown, ChevronRight, 
  SearchX, Filter, RotateCcw, Landmark, Users, X, ChevronDown 
} from 'lucide-react';
import { BUILD_LABEL } from '../utils/version';

export default function StateList({
  activeTab,
  onTabChange,
  items,
  selectedItem,
  onSelectItem,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedAlliance = 'ALL',
  onAllianceChange,
  selectedRegion = 'ALL',
  onRegionChange,
  selectedPopRange = 'ALL',
  onPopRangeChange,
  statesCount,
  utsCount,
  language = 'en',
  onResetFilters
}) {
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  const filterPopoverRef = useRef(null);

  // Close filter popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterPopoverRef.current && !filterPopoverRef.current.contains(e.target)) {
        setIsFilterPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const regions = [
    { id: 'ALL', label: language === 'hi' ? 'सभी क्षेत्र' : 'All Regions' },
    { id: 'Northern', label: language === 'hi' ? 'उत्तरी' : 'Northern' },
    { id: 'Southern', label: language === 'hi' ? 'दक्षिणी' : 'Southern' },
    { id: 'Eastern', label: language === 'hi' ? 'पूर्वी' : 'Eastern' },
    { id: 'Western', label: language === 'hi' ? 'पश्चिमी' : 'Western' },
    { id: 'Central', label: language === 'hi' ? 'मध्य' : 'Central' },
    { id: 'North-Eastern', label: language === 'hi' ? 'पूर्वोत्तर' : 'North-Eastern' }
  ];

  const alliances = [
    { id: 'ALL', label: language === 'hi' ? 'सभी दल / गठबंधन' : 'All Alliances' },
    { id: 'NDA', label: 'NDA' },
    { id: 'INDIA', label: 'INDIA' },
    { id: 'Regional/Other', label: language === 'hi' ? 'क्षेत्रीय दल' : 'Regional / Other' },
    { id: 'Central Admin', label: language === 'hi' ? 'केंद्र शासित' : 'Central Admin' }
  ];

  const popRanges = [
    { id: 'ALL', label: language === 'hi' ? 'सभी जनसंख्या' : 'All Populations' },
    { id: 'mega', label: language === 'hi' ? '> 5 करोड़ (विशाल)' : '> 50M (Mega)' },
    { id: 'major', label: language === 'hi' ? '1 से 5 करोड़ (मध्यम)' : '10M - 50M (Major)' },
    { id: 'small', label: language === 'hi' ? '< 1 करोड़ (छोटे)' : '< 10M (Small)' }
  ];

  // Active filters count
  const activeFiltersCount = 
    (selectedRegion !== 'ALL' ? 1 : 0) + 
    (selectedAlliance !== 'ALL' ? 1 : 0) + 
    (selectedPopRange !== 'ALL' ? 1 : 0);

  const getRegionLabel = (id) => regions.find(r => r.id === id)?.label || id;
  const getAllianceLabel = (id) => alliances.find(a => a.id === id)?.label || id;
  const getPopLabel = (id) => popRanges.find(p => p.id === id)?.label || id;

  return (
    <aside 
      aria-label="States and Territories Directory"
      className="flex flex-col h-full min-h-0 min-w-0 bg-parchment/60 dark:bg-slate-900/60 border-r border-parchment-border dark:border-slate-800"
    >
      {/* Category Tabs & Filter Controls */}
      <div className="p-3 border-b border-parchment-border dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
        
        {/* Category Tabs: States vs Union Territories */}
        <div 
          role="tablist"
          aria-label="Category Selection"
          className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-parchment-subtle dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs font-semibold"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'states'}
            onClick={() => onTabChange('states')}
            className={`min-h-[44px] py-2 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-carto-indigo focus-visible:outline-none ${
              activeTab === 'states'
                ? 'bg-white dark:bg-slate-700 text-carto-indigo dark:text-blue-300 shadow-2xs font-bold'
                : 'text-ink-muted hover:text-ink hover:bg-parchment dark:hover:bg-slate-700/50'
            }`}
          >
            <span>{language === 'hi' ? 'राज्य' : 'States'}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold ${
              activeTab === 'states' 
                ? 'bg-blue-50 dark:bg-blue-900/60 text-carto-indigo dark:text-blue-300 border border-blue-200 dark:border-blue-800' 
                : 'bg-parchment-subtle dark:bg-slate-800 text-ink-muted'
            }`}>
              {statesCount}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'uts'}
            onClick={() => onTabChange('uts')}
            className={`min-h-[44px] py-2 px-3 rounded-md transition-all flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-carto-indigo focus-visible:outline-none ${
              activeTab === 'uts'
                ? 'bg-white dark:bg-slate-700 text-carto-indigo dark:text-blue-300 shadow-2xs font-bold'
                : 'text-ink-muted hover:text-ink hover:bg-parchment dark:hover:bg-slate-700/50'
            }`}
          >
            <span>{language === 'hi' ? 'केंद्र शासित प्रदेश' : 'Union Territories'}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold ${
              activeTab === 'uts' 
                ? 'bg-blue-50 dark:bg-blue-900/60 text-carto-indigo dark:text-blue-300 border border-blue-200 dark:border-blue-800' 
                : 'bg-parchment-subtle dark:bg-slate-800 text-ink-muted'
            }`}>
              {utsCount}
            </span>
          </button>
        </div>

        {/* Mobile Search Input */}
        <div className="block md:hidden relative">
          <label htmlFor="mobile-directory-search" className="sr-only">
            Search {activeTab === 'states' ? 'states' : 'union territories'}
          </label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" aria-hidden="true" />
          <input
            id="mobile-directory-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={language === 'hi' ? 'राज्य, नेता खोजें…' : 'Search states, leaders…'}
            className="w-full h-11 pl-9 pr-9 rounded-lg bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark placeholder-ink-muted/70 focus:outline-none focus:border-carto-indigo focus-visible:ring-2 focus-visible:ring-carto-indigo"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-0 top-0 bottom-0 min-h-[44px] min-w-[36px] flex items-center justify-center text-ink-muted hover:text-ink dark:hover:text-ink-dark"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Unified Filters Popover Button & Sort Selector Row */}
        <div className="flex items-center gap-2 relative">
          
          {/* Filters Popover Trigger */}
          <div ref={filterPopoverRef} className="relative flex-1">
            <button
              type="button"
              onClick={() => setIsFilterPopoverOpen(!isFilterPopoverOpen)}
              className={`w-full min-h-[44px] px-3 py-2 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                activeFiltersCount > 0
                  ? 'bg-blue-50/80 dark:bg-blue-950/40 border-carto-indigo text-carto-indigo dark:text-blue-300 shadow-2xs'
                  : 'bg-parchment/60 dark:bg-slate-800 border-parchment-border dark:border-slate-700 text-ink dark:text-ink-dark hover:bg-parchment'
              }`}
              aria-expanded={isFilterPopoverOpen}
              aria-label="Filter states and territories"
            >
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'फ़िल्टर' : 'Filters'}</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-carto-indigo text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isFilterPopoverOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Filters Popover Dropdown */}
            {isFilterPopoverOpen && (
              <div className="absolute left-0 right-0 sm:w-72 top-full mt-1.5 bg-white dark:bg-slate-900 border border-parchment-border dark:border-slate-700 rounded-xl shadow-float z-30 p-3 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-parchment-subtle dark:border-slate-800 pb-2">
                  <span className="font-serif font-bold text-ink dark:text-ink-dark">
                    {language === 'hi' ? 'फ़िल्टर विकल्प' : 'Filter Directory'}
                  </span>
                  {activeFiltersCount > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        onAllianceChange('ALL');
                        onRegionChange('ALL');
                        onPopRangeChange('ALL');
                      }}
                      className="text-[11px] text-carto-indigo dark:text-blue-400 hover:underline font-semibold"
                    >
                      {language === 'hi' ? 'रीसेट' : 'Clear All'}
                    </button>
                  )}
                </div>

                {/* Region Select */}
                <div>
                  <label htmlFor="popover-region" className="block text-[11px] font-sans font-semibold text-ink-muted mb-1">
                    {language === 'hi' ? 'भौगोलिक क्षेत्र' : 'Geographic Region'}
                  </label>
                  <select
                    id="popover-region"
                    value={selectedRegion}
                    onChange={(e) => onRegionChange(e.target.value)}
                    className="w-full h-8 px-2 rounded-md bg-parchment/60 dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark focus:outline-none focus:border-carto-indigo cursor-pointer"
                  >
                    {regions.map(r => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>

                {/* Ruling Alliance Select */}
                <div>
                  <label htmlFor="popover-alliance" className="block text-[11px] font-sans font-semibold text-ink-muted mb-1">
                    {language === 'hi' ? 'सत्तारूढ़ दल / गठबंधन' : 'Ruling Alliance / Party'}
                  </label>
                  <select
                    id="popover-alliance"
                    value={selectedAlliance}
                    onChange={(e) => onAllianceChange(e.target.value)}
                    className="w-full h-8 px-2 rounded-md bg-parchment/60 dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark focus:outline-none focus:border-carto-indigo cursor-pointer"
                  >
                    {alliances.map(a => (
                      <option key={a.id} value={a.id}>{a.label}</option>
                    ))}
                  </select>
                </div>

                {/* Population Scale Select */}
                <div>
                  <label htmlFor="popover-popscale" className="block text-[11px] font-sans font-semibold text-ink-muted mb-1">
                    {language === 'hi' ? 'जनसंख्या पैमाना' : 'Population Scale'}
                  </label>
                  <select
                    id="popover-popscale"
                    value={selectedPopRange}
                    onChange={(e) => onPopRangeChange(e.target.value)}
                    className="w-full h-8 px-2 rounded-md bg-parchment/60 dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark focus:outline-none focus:border-carto-indigo cursor-pointer"
                  >
                    {popRanges.map(p => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 border-t border-parchment-subtle dark:border-slate-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsFilterPopoverOpen(false)}
                    className="min-h-[32px] px-3 py-1 rounded-md bg-carto-indigo text-white text-[11px] font-semibold hover:bg-blue-800"
                  >
                    {language === 'hi' ? 'लागू करें' : 'Done'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sort Selector Dropdown */}
          <div className="flex-1">
            <label htmlFor="sort-dropdown" className="sr-only">Sort directory</label>
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full min-h-[44px] bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold text-ink dark:text-ink-dark focus:outline-none focus:border-carto-indigo cursor-pointer shadow-2xs"
            >
              <option value="name">{language === 'hi' ? 'नाम (अ से ज्ञ)' : 'Name (A to Z)'}</option>
              <option value="population">{language === 'hi' ? 'जनसंख्या (अधिक)' : 'Population (High)'}</option>
              <option value="area">{language === 'hi' ? 'क्षेत्रफल (बड़ा)' : 'Area (Large)'}</option>
              <option value="literacy">{language === 'hi' ? 'साक्षरता (उच्च)' : 'Literacy (High)'}</option>
              <option value="districts">{language === 'hi' ? 'जिले (अधिक)' : 'Districts (High)'}</option>
            </select>
          </div>
        </div>

        {/* Active Filter Removable Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {selectedRegion !== 'ALL' && (
              <span className="inline-flex items-center gap-1 text-[10px] font-sans px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-carto-indigo dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <span>{getRegionLabel(selectedRegion)}</span>
                <button
                  type="button"
                  onClick={() => onRegionChange('ALL')}
                  className="hover:text-red-600 focus:outline-none"
                  aria-label="Remove region filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedAlliance !== 'ALL' && (
              <span className="inline-flex items-center gap-1 text-[10px] font-sans px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-carto-indigo dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <span>{getAllianceLabel(selectedAlliance)}</span>
                <button
                  type="button"
                  onClick={() => onAllianceChange('ALL')}
                  className="hover:text-red-600 focus:outline-none"
                  aria-label="Remove alliance filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedPopRange !== 'ALL' && (
              <span className="inline-flex items-center gap-1 text-[10px] font-sans px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-carto-indigo dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <span>{getPopLabel(selectedPopRange)}</span>
                <button
                  type="button"
                  onClick={() => onPopRangeChange('ALL')}
                  className="hover:text-red-600 focus:outline-none"
                  aria-label="Remove population filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={onResetFilters}
              className="text-[10px] text-ink-muted hover:text-red-600 underline font-sans ml-1"
            >
              {language === 'hi' ? 'सभी हटाएं' : 'Reset'}
            </button>
          </div>
        )}

        {/* Count Bar */}
        <div className="flex items-center justify-between text-xs px-0.5 text-ink-muted">
          <span className="font-sans text-[11px]">
            {items.length} {activeTab === 'states' ? (language === 'hi' ? 'राज्य' : 'States') : (language === 'hi' ? 'प्रदेश' : 'Territories')}
          </span>
        </div>
      </div>

      {/* Scrollable Items List */}
      <nav aria-label="States and Territories List" className="flex-1 overflow-y-auto p-2.5 pb-20 md:pb-3 space-y-2">
        {items.length > 0 ? (
          items.map((item) => {
            const isSelected = selectedItem?.name === item.name;
            const partyAbbr = item.rulingParty?.abbr || 'Admin';
            const alliance = item.rulingAlliance || 'Other';
            const displayName = language === 'hi' && item.hindi?.name ? item.hindi.name : item.name;
            const displayCapital = language === 'hi' && item.hindi?.capital ? item.hindi.capital : item.capital;
            const districtCount = item.districts?.length || item.demographics?.totalDistricts || 0;

            // Correct Constitutional Leadership Label
            let leaderTitle = language === 'hi' ? 'मुख्यमंत्री:' : 'CM:';
            let leaderName = item.chiefMinister?.name;

            if (!leaderName) {
              if (item.governor?.role?.includes('Administrator')) {
                leaderTitle = language === 'hi' ? 'प्रशासक:' : 'Administrator:';
                leaderName = item.governor.name;
              } else if (item.governor?.role?.includes('Lieutenant Governor')) {
                leaderTitle = language === 'hi' ? 'उपराज्यपाल:' : 'Lt. Governor:';
                leaderName = item.governor.name;
              } else {
                leaderTitle = language === 'hi' ? 'संवैधानिक प्रमुख:' : 'Executive Head:';
                leaderName = item.governor?.name || 'Central Administration';
              }
            }

            return (
              <div
                key={item.name}
                tabIndex={0}
                role="button"
                title={`${item.name} (Capital: ${item.capital})`}
                aria-pressed={isSelected}
                aria-label={`${item.name}, Capital: ${item.capital}, ${districtCount} ${districtCount === 1 ? 'District' : 'Districts'}`}
                onClick={() => onSelectItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectItem(item);
                  }
                }}
                className={`min-h-[64px] p-3 rounded-xl border transition-all cursor-pointer text-left relative group focus-visible:ring-2 focus-visible:ring-carto-indigo focus-visible:outline-none ${
                  isSelected
                    ? 'bg-white border-parchment-border md:bg-blue-50/70 md:border-carto-indigo md:shadow-xs md:ring-1 md:ring-carto-indigo/20 dark:md:bg-blue-950/40 dark:md:border-blue-600'
                    : 'bg-white dark:bg-slate-800/80 border-parchment-border dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-parchment/60 dark:hover:bg-slate-800 shadow-2xs'
                }`}
              >
                {/* Active Indicator Bar on left edge - visible ONLY on md+ screens */}
                {isSelected && (
                  <div className="hidden md:block absolute left-0 top-2 bottom-2 w-1 bg-carto-indigo rounded-r-md" />
                )}

                <div className="flex items-start justify-between gap-2 pl-1">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
                      <span className="font-serif font-bold text-sm text-ink dark:text-ink-dark group-hover:text-carto-indigo dark:group-hover:text-blue-400 transition-colors">
                        {displayName}
                      </span>
                      {language === 'hi' && item.hindi?.name && (
                        <span className="text-[10px] text-ink-muted">
                          ({item.name})
                        </span>
                      )}

                      {/* Small Non-Partisan Neutral Indicator Chip */}
                      <span className="inline-flex items-center gap-1 text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-md bg-parchment dark:bg-slate-700 border border-parchment-border dark:border-slate-600 text-ink dark:text-ink-dark font-medium">
                        <span 
                          className="w-1.5 h-1.5 rounded-full shrink-0" 
                          style={{ backgroundColor: item.rulingParty?.color || '#3B82F6' }} 
                        />
                        <span>{partyAbbr}</span>
                        {alliance && alliance !== 'Other' && (
                          <span className="text-[9px] text-ink-muted">({alliance})</span>
                        )}
                      </span>
                    </div>

                    {/* Capital */}
                    <div className="flex items-center gap-1.5 text-xs text-ink-muted mb-1">
                      <Building2 className="w-3.5 h-3.5 text-carto-gold shrink-0" aria-hidden="true" />
                      <span className="break-words">
                        {language === 'hi' ? 'राजधानी:' : 'Capital:'} {displayCapital}
                      </span>
                    </div>

                    {/* Executive Leader (CM, Administrator, or Lt. Governor) */}
                    <p className="text-xs text-ink dark:text-ink-dark leading-snug break-words" title={`${leaderTitle} ${leaderName}`}>
                      <span className="text-ink-muted">{leaderTitle} </span>
                      <strong className="font-semibold">{leaderName}</strong>
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between shrink-0 self-stretch">
                    {/* Correctly pluralized district count */}
                    <span className="text-[10px] font-sans px-2 py-0.5 rounded-md bg-parchment-subtle dark:bg-slate-700 text-ink dark:text-ink-dark border border-parchment-border dark:border-slate-600">
                      {districtCount} {districtCount === 1 ? (language === 'hi' ? 'जिला' : 'District') : (language === 'hi' ? 'जिले' : 'Districts')}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                      isSelected ? 'text-carto-indigo dark:text-blue-400' : 'text-ink-muted'
                    }`} aria-hidden="true" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 rounded-2xl space-y-3">
            <SearchX className="w-8 h-8 text-ink-muted mx-auto" />
            <div className="text-xs font-serif font-bold text-ink dark:text-ink-dark">
              {language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No records match filters'}
            </div>
            <p className="text-[11px] text-ink-muted">
              {language === 'hi' 
                ? 'वर्तमान खोज या फ़िल्टर मानदंड से कोई राज्य या केंद्र शासित प्रदेश मेल नहीं खाता।'
                : 'No state or territory matches the specified query and regional/alliance/population filters.'
              }
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-parchment-subtle hover:bg-parchment dark:bg-slate-700 text-carto-indigo dark:text-blue-300 border border-parchment-border dark:border-slate-600 text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset All Filters'}</span>
            </button>
          </div>
        )}
      </nav>

      {/* Directory Footer with Build Version and Date */}
      <footer className="p-2.5 px-3 border-t border-parchment-border dark:border-slate-800 bg-parchment/60 dark:bg-slate-900/60 text-[10px] text-ink-muted flex items-center justify-between shrink-0">
        <span>Sources linked per field &bull; Last reviewed: <strong className="text-ink dark:text-ink-dark font-sans font-semibold">November 2026</strong></span>
        <span className="font-mono text-[9px] bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-parchment-border dark:border-slate-700">{BUILD_LABEL}</span>
      </footer>
    </aside>
  );
}
