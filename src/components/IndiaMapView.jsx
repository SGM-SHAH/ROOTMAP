import React, { useState, useEffect, useMemo, useRef } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { 
  ZoomIn, ZoomOut, RotateCcw, MapPin, Building2, Users, 
  Layers, Shield, Scale, BookOpen, ChevronRight, Award, Table
} from 'lucide-react';

const STATE_CODES = {
  'andhra pradesh': 'AP',
  'arunachal pradesh': 'AR',
  'assam': 'AS',
  'bihar': 'BR',
  'chhattisgarh': 'CG',
  'goa': 'GA',
  'gujarat': 'GJ',
  'haryana': 'HR',
  'himachal pradesh': 'HP',
  'jharkhand': 'JH',
  'karnataka': 'KA',
  'kerala': 'KL',
  'madhya pradesh': 'MP',
  'maharashtra': 'MH',
  'manipur': 'MN',
  'meghalaya': 'ML',
  'mizoram': 'MZ',
  'nagaland': 'NL',
  'odisha': 'OD',
  'punjab': 'PB',
  'rajasthan': 'RJ',
  'sikkim': 'SK',
  'tamil nadu': 'TN',
  'telangana': 'TG',
  'tripura': 'TR',
  'uttar pradesh': 'UP',
  'uttarakhand': 'UK',
  'west bengal': 'WB',
  'delhi': 'DL',
  'chandigarh': 'CH',
  'jammu and kashmir': 'JK',
  'ladakh': 'LA',
  'puducherry': 'PY',
  'lakshadweep': 'LD',
  'andaman and nicobar islands': 'AN',
  'dadra and nagar haveli and daman and diu': 'DD'
};

const UT_INSET_NAMES = [
  'Delhi',
  'Chandigarh',
  'Puducherry',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
  'Andaman and Nicobar Islands'
];

export default function IndiaMapView({
  items,
  selectedItem,
  onSelectItem,
  language = 'en',
  isDark = false
}) {
  const [geoData, setGeoData] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [focusedStateName, setFocusedStateName] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [colorBy, setColorBy] = useState('alliance'); // 'alliance', 'population', 'area', 'literacy'
  const [showTableView, setShowTableView] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsTouchDevice(
      typeof window !== 'undefined' &&
      (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))
    );
  }, []);

  // Map projection configured for Indian sub-continent (width 600, height 700)
  const projection = useMemo(() => {
    return geoMercator()
      .center([82.5, 22.5])
      .scale(1020)
      .translate([300, 360]);
  }, []);

  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  // Load GeoJSON data from public folder
  useEffect(() => {
    fetch('/data/india-states.json')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error('Error loading India GeoJSON:', err));
  }, []);

  // Quick lookup dictionary from GeoJSON st_nm to statesData item
  const stateLookup = useMemo(() => {
    const map = new Map();
    items.forEach(item => {
      map.set(item.name.toLowerCase(), item);
      if (item.aliases) {
        item.aliases.forEach(a => map.set(a.toLowerCase(), item));
      }
    });
    // Ensure both separate features in GeoJSON resolve to DNHDD
    const dnhdd = items.find(i => i.name.toLowerCase().includes('daman') || i.name.toLowerCase().includes('dadra'));
    if (dnhdd) {
      map.set('dadra and nagar haveli', dnhdd);
      map.set('daman and diu', dnhdd);
    }
    return map;
  }, [items]);

  // Lookup for UT inset items
  const utInsetItems = useMemo(() => {
    return UT_INSET_NAMES.map(name => {
      return items.find(i => i.name.toLowerCase() === name.toLowerCase()) || null;
    }).filter(Boolean);
  }, [items]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (delta) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.75), 3));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Color generator for Choropleth
  const getStateFill = (item, isSelected, isHovered) => {
    // When selected: do NOT replace alliance fill! Keep the alliance/metric fill intact.
    // If hovered and NOT selected: give subtle ambient highlight
    if (isHovered && !isSelected) {
      return isDark ? '#78350f' : '#fef08a';
    }
    if (!item) {
      return isDark ? '#1e293b' : '#f8f9fa';
    }

    if (colorBy === 'alliance') {
      const alliance = item.rulingAlliance || '';
      const isCentral = item.type !== 'State' && (!item.chiefMinister || alliance === 'Central');
      if (isCentral) {
        return 'url(#central-hatch)';
      }
      if (alliance === 'NDA') {
        return isDark ? '#1e40af' : '#60a5fa'; // Strong Accessible Royal Blue
      }
      if (alliance === 'INDIA') {
        return isDark ? '#065f46' : '#34d399'; // Strong Accessible Emerald Green
      }
      // Regional/Other, TVK Coalition, ZPM, etc.
      return isDark ? '#92400e' : '#fbbf24'; // Strong Accessible Warm Amber
    }

    if (colorBy === 'population') {
      const pop = item.demographics?.census2011Population || 0;
      if (pop > 80000000) return isDark ? '#1e3a8a' : '#60a5fa';
      if (pop > 40000000) return isDark ? '#1e40af' : '#93c5fd';
      if (pop > 15000000) return isDark ? '#312e81' : '#bfdbfe';
      if (pop > 5000000) return isDark ? '#1e293b' : '#dbeafe';
      return isDark ? '#0f172a' : '#eff6ff';
    }

    if (colorBy === 'area') {
      const area = item.demographics?.areaSqKm || 0;
      if (area > 200000) return isDark ? '#7c2d12' : '#fb923c';
      if (area > 100000) return isDark ? '#9a3412' : '#fdba74';
      if (area > 50000) return isDark ? '#78350f' : '#fed7aa';
      if (area > 10000) return isDark ? '#451a03' : '#ffedd5';
      return isDark ? '#1e293b' : '#fef3c7';
    }

    if (colorBy === 'literacy') {
      const lit = parseFloat(item.demographics?.literacyRate?.replace('%', '') || '0');
      if (lit >= 85) return isDark ? '#064e3b' : '#34d399';
      if (lit >= 80) return isDark ? '#065f46' : '#6ee7b7';
      if (lit >= 75) return isDark ? '#047857' : '#a7f3d0';
      if (lit >= 70) return isDark ? '#1e293b' : '#cbf7ee';
      return isDark ? '#451a03' : '#fef9c3';
    }

    return isDark ? '#1e293b' : '#ffffff';
  };

  const getStateStroke = (item, isSelected, isHovered) => {
    if (isSelected) {
      return isDark ? '#93c5fd' : '#1e3a8a';
    }
    if (isHovered) {
      return isDark ? '#fbbf24' : '#b45309';
    }
    const isCentral = item && item.type !== 'State' && (!item.chiefMinister || item.rulingAlliance === 'Central');
    return isCentral ? (isDark ? '#94a3b8' : '#475569') : (isDark ? '#334155' : '#64748b');
  };

  const getStrokeDashArray = (item, isSelected) => {
    if (isSelected) return undefined;
    const isCentral = item && item.type !== 'State' && (!item.chiefMinister || item.rulingAlliance === 'Central');
    return isCentral ? '4 2' : undefined;
  };

  const getStrokeWidth = (isSelected, isHovered) => {
    if (isSelected) return '3.5';
    if (isHovered) return '1.75';
    return '0.85';
  };

  // Sort features so that selected state renders on top (last in SVG paint order)
  const sortedFeatures = useMemo(() => {
    if (!geoData?.features) return [];
    if (!selectedItem) return geoData.features;
    return [...geoData.features].sort((a, b) => {
      const rawA = a.properties.st_nm.toLowerCase();
      const rawB = b.properties.st_nm.toLowerCase();
      const matchA = stateLookup.get(rawA);
      const matchB = stateLookup.get(rawB);
      const isA = matchA && matchA.name === selectedItem.name;
      const isB = matchB && matchB.name === selectedItem.name;
      if (isA) return 1;
      if (isB) return -1;
      return 0;
    });
  }, [geoData, selectedItem, stateLookup]);

  if (!geoData) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-parchment dark:bg-parchment-dark text-ink-muted">
        <div className="flex items-center gap-2 text-xs font-serif">
          <div className="w-4 h-4 rounded border-2 border-carto-indigo border-t-transparent animate-spin" />
          <span>{language === 'hi' ? 'मानचित्र लोड हो रहा है...' : 'Loading Cartographic Map of India...'}</span>
        </div>
      </div>
    );
  }

  const actionVerb = isTouchDevice 
    ? (language === 'hi' ? 'टैप' : 'Tap') 
    : (language === 'hi' ? 'क्लिक' : 'Click');

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-parchment dark:bg-parchment-dark select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Top Left: Title & Survey of India Attribution (Solid Card preventing overlap with map) */}
      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-4 z-10 bg-white dark:bg-slate-900 p-2.5 px-3 rounded-xl border border-parchment-border dark:border-slate-800 shadow-2xs max-w-[200px] sm:max-w-md pointer-events-auto">
        <span className="text-[9px] sm:text-[10px] font-sans tracking-widest uppercase text-carto-indigo dark:text-blue-400 font-bold block">
          Survey of India Reference
        </span>
        <h2 className="text-xs sm:text-sm font-serif font-bold text-ink dark:text-ink-dark truncate">
          {language === 'hi' ? 'भारत का प्रशासनिक मानचित्र' : 'Administrative Map of India'}
        </h2>
        <p className="text-[10px] text-ink-muted font-sans mt-0.5 leading-tight">
          Boundaries as per Survey of India. Illustrative, not to scale.
        </p>
      </div>

      {/* Top Right: Color By Selector & Zoom Controls */}
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-4 z-10 flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-2">
        {/* Accessible Table Toggle Button */}
        <button
          type="button"
          onClick={() => setShowTableView(prev => !prev)}
          className="min-h-[38px] px-2.5 py-1 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-ink dark:text-ink-dark flex items-center gap-1.5 shadow-2xs hover:bg-parchment transition-all focus-visible:ring-2 focus-visible:ring-carto-indigo"
          aria-label={showTableView ? "Switch back to graphical map view" : "View administrative data as an accessible table"}
        >
          <Table className="w-3.5 h-3.5 text-carto-indigo dark:text-blue-400" />
          <span>{showTableView ? (language === 'hi' ? 'मानचित्र' : 'Show Map') : (language === 'hi' ? 'तालिका रूप' : 'Show as table')}</span>
        </button>

        {/* Color By Selector */}
        {!showTableView && (
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 px-2 py-1 rounded-lg border border-parchment-border dark:border-slate-700 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-carto-indigo dark:text-blue-400 shrink-0" aria-hidden="true" />
            <label htmlFor="color-by-selector" className="text-[10px] font-semibold text-ink-muted shrink-0 hidden xs:inline">
              {language === 'hi' ? 'रंग आधार:' : 'Color by:'}
            </label>
            <select
              id="color-by-selector"
              value={colorBy}
              onChange={(e) => setColorBy(e.target.value)}
              className="h-7 text-xs bg-transparent text-ink dark:text-ink-dark font-medium focus:outline-none cursor-pointer"
              aria-label="Color map by attribute"
            >
              <option value="alliance">{language === 'hi' ? 'सत्तारूढ़ गठबंधन' : 'Ruling Alliance'}</option>
              <option value="population">{language === 'hi' ? 'जनसंख्या (Census 2011)' : 'Population'}</option>
              <option value="area">{language === 'hi' ? 'क्षेत्रफल (किमी²)' : 'Area'}</option>
              <option value="literacy">{language === 'hi' ? 'साक्षरता दर (%)' : 'Literacy'}</option>
            </select>
          </div>
        )}

        {/* Zoom & Reset Controls */}
        {!showTableView && (
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-parchment-border dark:border-slate-700 shadow-2xs">
            <button
              type="button"
              onClick={() => handleZoom(0.25)}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-md hover:bg-parchment-subtle dark:hover:bg-slate-700 text-ink dark:text-ink-dark focus-visible:ring-2 focus-visible:ring-carto-indigo"
              aria-label="Zoom In"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(-0.25)}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-md hover:bg-parchment-subtle dark:hover:bg-slate-700 text-ink dark:text-ink-dark focus-visible:ring-2 focus-visible:ring-carto-indigo"
              aria-label="Zoom Out"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-md hover:bg-parchment-subtle dark:hover:bg-slate-700 text-ink dark:text-ink-dark focus-visible:ring-2 focus-visible:ring-carto-indigo"
              aria-label="Reset Map View"
              title="Reset Map View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Accessible Table Alternative View */}
      {showTableView ? (
        <div className="w-full h-full pt-16 pb-24 sm:pb-8 px-3 sm:px-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 border border-parchment-border dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
            <div className="p-3 bg-parchment-subtle dark:bg-slate-800 border-b border-parchment-border dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-serif font-bold text-ink dark:text-ink-dark">
                  {language === 'hi' ? 'समस्त 28 राज्य एवं 8 केंद्र शासित प्रदेश - डेटा तालिका' : 'All 28 States & 8 Union Territories - Accessible Directory Table'}
                </h3>
                <p className="text-[11px] text-ink-muted">
                  Official figures from Census of India, Survey of India, and Election Commission of India
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTableView(false)}
                className="text-xs text-carto-indigo dark:text-blue-400 font-semibold hover:underline"
              >
                {language === 'hi' ? 'मानचित्र पर लौटें' : 'Return to Map'}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <caption className="sr-only">Directory of Indian States and Union Territories with Leadership, Seats, and Demographics</caption>
                <thead>
                  <tr className="border-b border-parchment-border dark:border-slate-800 bg-parchment/40 dark:bg-slate-900/60 text-ink-muted text-[10px] font-mono uppercase tracking-wider">
                    <th scope="col" className="p-2.5 font-bold">State / Territory</th>
                    <th scope="col" className="p-2.5 font-bold">Type</th>
                    <th scope="col" className="p-2.5 font-bold">Capital</th>
                    <th scope="col" className="p-2.5 font-bold">Executive Leader (CM / Admin)</th>
                    <th scope="col" className="p-2.5 font-bold">Ruling Alliance</th>
                    <th scope="col" className="p-2.5 font-bold text-right">Districts</th>
                    <th scope="col" className="p-2.5 font-bold text-right">Census 2011 Population</th>
                    <th scope="col" className="p-2.5 font-bold text-right">Area (km²)</th>
                    <th scope="col" className="p-2.5 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-parchment-subtle dark:divide-slate-800">
                  {items.map((it) => {
                    const isSelected = selectedItem?.name === it.name;
                    return (
                      <tr 
                        key={it.name}
                        className={`hover:bg-parchment/50 dark:hover:bg-slate-800/60 transition-colors ${
                          isSelected ? 'bg-blue-50/70 dark:bg-blue-950/40 font-semibold' : ''
                        }`}
                      >
                        <td className="p-2.5 font-serif font-bold text-ink dark:text-ink-dark">
                          {language === 'hi' && it.hindi?.name ? it.hindi.name : it.name}
                        </td>
                        <td className="p-2.5 text-[11px] text-ink-muted">
                          {it.type === 'State' ? 'State' : 'UT'}
                        </td>
                        <td className="p-2.5 text-ink dark:text-ink-dark">
                          {language === 'hi' && it.hindi?.capital ? it.hindi.capital : it.capital}
                        </td>
                        <td className="p-2.5 text-ink dark:text-ink-dark">
                          {it.chiefMinister?.name ? `CM: ${it.chiefMinister.name}` : (it.governor?.name || 'Administrator')}
                        </td>
                        <td className="p-2.5">
                          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700">
                            <span 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: it.rulingParty?.color || '#3b82f6' }}
                            />
                            <span>{it.rulingAlliance || it.rulingParty?.abbr || 'Admin'}</span>
                          </span>
                        </td>
                        <td className="p-2.5 font-mono text-right">
                          {it.districts?.length || it.demographics?.totalDistricts || 0}
                        </td>
                        <td className="p-2.5 font-mono text-right">
                          {it.demographics?.census2011Population?.toLocaleString() || it.demographics?.population?.split('(')[0] || 'N/A'}
                        </td>
                        <td className="p-2.5 font-mono text-right">
                          {it.demographics?.areaSqKm ? `${it.demographics.areaSqKm.toLocaleString()}` : 'N/A'}
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectItem(it);
                              setShowTableView(false);
                            }}
                            className="px-2 py-1 text-[11px] font-sans font-semibold rounded bg-carto-indigo dark:bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                          >
                            Open Dossier
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Interactive SVG Canvas */
        <svg
          viewBox="0 0 600 720"
          className="w-full h-full max-h-[92vh] cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
        >
          <defs>
            {/* Color-blind Accessible Central Admin Hatch Pattern */}
            <pattern id="central-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="8" height="8" fill={isDark ? '#334155' : '#e2e8f0'} />
              <line x1="0" y1="0" x2="0" y2="8" stroke={isDark ? '#94a3b8' : '#64748b'} strokeWidth="2.5" />
            </pattern>
            {/* Selected State High-Contrast Outer Glow Filter */}
            <filter id="selected-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor={isDark ? '#93c5fd' : '#1e3a8a'} floodOpacity="0.85" />
            </filter>
          </defs>
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {sortedFeatures.map((feature, idx) => {
              const rawName = feature.properties.st_nm;
              const matchedItem = stateLookup.get(rawName.toLowerCase()) || 
                items.find(i => i.name.toLowerCase().includes(rawName.toLowerCase()) || rawName.toLowerCase().includes(i.name.toLowerCase()));
              
              const isSelected = selectedItem && matchedItem && selectedItem.name === matchedItem.name;
              const isFocused = focusedStateName === matchedItem?.name;
              const isActive = isSelected || isFocused;
              const isHovered = hoveredState && matchedItem && hoveredState.name === matchedItem.name;
              const pathD = pathGenerator(feature);
              const centroid = pathGenerator.centroid(feature);

              if (!pathD) return null;

              const fillColor = getStateFill(matchedItem, isSelected, isHovered);
              const strokeColor = getStateStroke(matchedItem, isActive, isHovered);
              const strokeWidth = getStrokeWidth(isActive, isHovered);
              const strokeDash = getStrokeDashArray(matchedItem, isActive);
              const stateCode = matchedItem ? (STATE_CODES[matchedItem.name.toLowerCase()] || matchedItem.name.slice(0, 2).toUpperCase()) : '';

              return (
                <g key={matchedItem?.name || rawName || idx}>
                  <path
                    d={pathD}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDash}
                    filter={isActive ? 'url(#selected-glow)' : undefined}
                    tabIndex={0}
                    role="button"
                    style={{ outline: 'none' }}
                    aria-label={matchedItem ? `${matchedItem.name}, ${matchedItem.type}, Capital: ${matchedItem.capital}, CM/Admin: ${matchedItem.chiefMinister?.name || matchedItem.governor?.name || 'Administrator'}, Alliance: ${matchedItem.rulingAlliance || 'N/A'}` : rawName}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (matchedItem) onSelectItem(matchedItem);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (matchedItem) onSelectItem(matchedItem);
                      }
                    }}
                    onFocus={(e) => {
                      if (matchedItem) {
                        setFocusedStateName(matchedItem.name);
                        setHoveredState(matchedItem);
                        const rect = e.target.getBoundingClientRect();
                        setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
                      }
                    }}
                    onBlur={() => {
                      setFocusedStateName(null);
                      setHoveredState(null);
                    }}
                    onMouseEnter={(e) => {
                      if (matchedItem) {
                        setHoveredState(matchedItem);
                        setTooltipPos({ x: e.clientX, y: e.clientY });
                      }
                    }}
                    onMouseMove={(e) => {
                      setTooltipPos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => setHoveredState(null)}
                    className="transition-colors duration-150 cursor-pointer outline-none focus:outline-none focus-visible:outline-none focus-visible:stroke-blue-700 dark:focus-visible:stroke-blue-300"
                  />

                  {/* State Label on Zoom */}
                  {zoom >= 1.25 && centroid && centroid[0] && !isNaN(centroid[0]) && (
                    <text
                      x={centroid[0]}
                      y={centroid[1]}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none fill-ink dark:fill-ink-dark font-mono text-[9px] font-bold select-none opacity-80"
                    >
                      {stateCode}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      )}

      {/* Floating Dynamic Legend */}
      <div className="absolute bottom-12 left-3 sm:left-4 z-10 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-parchment-border dark:border-slate-700 shadow-2xs text-[11px] max-w-[210px] hidden sm:block">
        <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-ink-muted block mb-1.5">
          {colorBy === 'alliance' ? (language === 'hi' ? 'गठबंधन' : 'Alliance') :
           colorBy === 'population' ? (language === 'hi' ? 'जनसंख्या (Census 2011)' : 'Population') :
           colorBy === 'area' ? (language === 'hi' ? 'क्षेत्रफल' : 'Area') :
           (language === 'hi' ? 'साक्षरता दर' : 'Literacy Rate')}
        </span>

        {colorBy === 'alliance' && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md border border-blue-600 bg-[#60a5fa] dark:bg-[#1e40af] shrink-0" />
              <span className="text-ink dark:text-ink-dark font-medium">NDA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md border border-emerald-600 bg-[#34d399] dark:bg-[#065f46] shrink-0" />
              <span className="text-ink dark:text-ink-dark font-medium">INDIA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md border border-amber-600 bg-[#fbbf24] dark:bg-[#92400e] shrink-0" />
              <span className="text-ink dark:text-ink-dark font-medium">{language === 'hi' ? 'क्षेत्रीय / अन्य' : 'Regional / Other'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span 
                className="w-5 h-5 rounded-md border-2 border-dashed border-slate-500 shrink-0" 
                style={{
                  backgroundImage: isDark 
                    ? 'repeating-linear-gradient(45deg, #334155, #334155 2px, #64748b 2px, #64748b 4px)' 
                    : 'repeating-linear-gradient(45deg, #cbd5e1, #cbd5e1 2px, #94a3b8 2px, #94a3b8 4px)'
                }}
              />
              <span className="text-ink dark:text-ink-dark font-medium">{language === 'hi' ? 'केंद्र शासित (हैट्च)' : 'Central Admin (Hatched)'}</span>
            </div>

            <div className="pt-2 mt-1.5 border-t border-parchment-border dark:border-slate-800 text-[10px] text-ink-muted leading-tight">
              <span className="font-semibold text-ink dark:text-ink-dark">Rule:</span> Alliance = party or alliance leading the state government.
            </div>
          </div>
        )}

        {colorBy === 'population' && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-blue-300 dark:bg-blue-900 border border-blue-400" />
              <span className="text-ink dark:text-ink-dark">&gt; 80M (विशाल)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-blue-200 dark:bg-blue-800 border border-blue-300" />
              <span className="text-ink dark:text-ink-dark">40M - 80M</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-blue-100 dark:bg-indigo-950 border border-blue-200" />
              <span className="text-ink dark:text-ink-dark">15M - 40M</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-slate-100 dark:bg-slate-800 border border-slate-300" />
              <span className="text-ink dark:text-ink-dark">&lt; 15M (छोटे)</span>
            </div>
          </div>
        )}

        {colorBy === 'area' && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-orange-300 dark:bg-orange-900 border border-orange-400" />
              <span className="text-ink dark:text-ink-dark">&gt; 200k{"\u202F"}km²</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-orange-200 dark:bg-orange-800 border border-orange-300" />
              <span className="text-ink dark:text-ink-dark">100k - 200k{"\u202F"}km²</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-amber-100 dark:bg-amber-950 border border-amber-300" />
              <span className="text-ink dark:text-ink-dark">50k - 100k{"\u202F"}km²</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-stone-100 dark:bg-slate-800 border border-stone-300" />
              <span className="text-ink dark:text-ink-dark">&lt; 50k{"\u202F"}km²</span>
            </div>
          </div>
        )}

        {colorBy === 'literacy' && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-emerald-200 dark:bg-emerald-900 border border-emerald-400" />
              <span className="text-ink dark:text-ink-dark">&gt; 85%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-emerald-100 dark:bg-emerald-950 border border-emerald-300" />
              <span className="text-ink dark:text-ink-dark">80% - 85%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-teal-50 dark:bg-slate-800 border border-teal-200" />
              <span className="text-ink dark:text-ink-dark">75% - 80%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-yellow-100 dark:bg-yellow-950 border border-yellow-300" />
              <span className="text-ink dark:text-ink-dark">&lt; 75%</span>
            </div>
          </div>
        )}
      </div>

      {/* Union Territories Insets Box */}
      <div className="absolute bottom-12 right-3 sm:right-4 z-10 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-parchment-border dark:border-slate-700 shadow-2xs text-[11px] max-w-[230px]">
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-ink-muted">
            {language === 'hi' ? 'केंद्र शासित प्रदेश' : 'UT Insets'}
          </span>
          <span className="text-[9px] text-ink-muted">(Enclaves)</span>
        </div>

        <div className="grid grid-cols-1 gap-1">
          {utInsetItems.map((ut) => {
            const isSelected = selectedItem && selectedItem.name === ut.name;
            const isAndaman = ut.name.toLowerCase().includes('andaman');
            const isDNH = ut.name.toLowerCase().includes('daman') || ut.name.toLowerCase().includes('dadra');
            const utDisplayName = language === 'hi'
              ? (isAndaman ? 'अंडमान व निकोबार' : (isDNH ? 'दा. एवं न. हवेली, दमन-दीव' : (ut.hindi?.name || ut.name)))
              : (isAndaman ? 'A&N Islands' : (isDNH ? 'DNH & DD' : ut.name));
            return (
              <button
                key={ut.name}
                type="button"
                onClick={() => onSelectItem(ut)}
                title={ut.name}
                className={`text-left px-2 py-1 rounded-md text-xs font-medium transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-carto-indigo text-white font-bold shadow-2xs'
                    : 'bg-parchment-subtle dark:bg-slate-800 hover:bg-parchment dark:hover:bg-slate-700 text-ink dark:text-ink-dark border border-parchment-border dark:border-slate-700'
                }`}
                aria-label={`Select ${ut.name}`}
              >
                <span className="truncate" title={ut.name}>{utDisplayName}</span>
                <span className={`text-[10px] font-sans ml-1.5 shrink-0 ${isSelected ? 'text-blue-100' : 'text-ink-muted'}`}>
                  {ut.districts?.length || ut.demographics?.totalDistricts} {(ut.districts?.length || ut.demographics?.totalDistricts) === 1 ? 'district' : 'districts'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cartographic Floating Hover Tooltip */}
      {hoveredState && (
        <div
          className="fixed z-50 pointer-events-none p-3 rounded-xl bg-white dark:bg-slate-900 border border-parchment-border dark:border-slate-700 shadow-card text-xs min-w-[220px]"
          style={{
            left: `${Math.min(tooltipPos.x + 16, window.innerWidth - 240)}px`,
            top: `${Math.max(tooltipPos.y - 60, 20)}px`
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-sans uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/60 text-carto-indigo dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {hoveredState.type}
            </span>
            <span className="text-[10px] text-ink-muted font-medium">
              {hoveredState.region} India
            </span>
          </div>

          <h3 className="font-serif font-bold text-sm text-ink dark:text-ink-dark">
            {language === 'hi' && hoveredState.hindi?.name ? hoveredState.hindi.name : hoveredState.name}
          </h3>

          <div className="space-y-1.5 mt-2 text-[11px] text-ink dark:text-slate-200">
            {/* Capital */}
            <div>
              <span className="text-ink-muted">Capital: </span>
              <strong>{language === 'hi' && hoveredState.hindi?.capital ? hoveredState.hindi.capital : hoveredState.capital}</strong>
            </div>

            {/* CM or Administrator */}
            <div>
              <span className="text-ink-muted">
                {hoveredState.chiefMinister?.name 
                  ? `CM: ` 
                  : (hoveredState.governor?.title ? `${hoveredState.governor.title}: ` : 'Administrator: ')}
              </span>
              <strong>
                {hoveredState.chiefMinister?.name || hoveredState.governor?.name || 'Administrator'}
              </strong>
            </div>

            {/* Ruling Party & Alliance */}
            <div>
              <span className="text-ink-muted">Party: </span>
              <strong>{hoveredState.rulingParty?.abbr || hoveredState.rulingParty?.name || 'Admin'}</strong>
              {hoveredState.rulingAlliance && (
                <span className="text-ink-muted ml-1">({hoveredState.rulingAlliance})</span>
              )}
            </div>

            {/* Districts Count */}
            <div>
              <span className="text-ink-muted">Districts: </span>
              <strong>{hoveredState.districts?.length || hoveredState.demographics?.totalDistricts || 0}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-2 text-center pointer-events-none">
        <span className="text-[10px] font-sans font-medium text-ink-muted dark:text-ink-dark-muted bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-parchment-border dark:border-slate-700">
          {actionVerb} {language === 'hi' ? 'करके प्रशासनिक विवरण देखें' : 'any state or territory to open civic dossier'}
        </span>
      </div>
    </div>
  );
}
