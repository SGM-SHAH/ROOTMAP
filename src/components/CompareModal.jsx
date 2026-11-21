import React, { useState } from 'react';
import { X, Scale, Plus, Trash2, ArrowRight, Building2, Users, Compass, Award, Landmark, Crown, Shield } from 'lucide-react';

export default function CompareModal({ isOpen, onClose, allItems, initialStates = [], language = 'en' }) {
  if (!isOpen) return null;

  const [selectedNames, setSelectedNames] = useState(() => {
    if (initialStates.length >= 2) return initialStates.map(s => s.name);
    if (initialStates.length === 1) {
      const second = allItems.find(i => i.name !== initialStates[0].name)?.name;
      return [initialStates[0].name, second].filter(Boolean);
    }
    return [allItems[0]?.name, allItems[1]?.name].filter(Boolean);
  });

  const selectedItems = selectedNames.map(name => allItems.find(i => i.name === name)).filter(Boolean);

  const handleStateChange = (index, newName) => {
    const updated = [...selectedNames];
    updated[index] = newName;
    setSelectedNames(updated);
  };

  const handleAddState = () => {
    if (selectedNames.length >= 3) return;
    const remaining = allItems.find(i => !selectedNames.includes(i.name));
    if (remaining) {
      setSelectedNames([...selectedNames, remaining.name]);
    }
  };

  const handleRemoveState = (index) => {
    if (selectedNames.length <= 2) return;
    const updated = selectedNames.filter((_, i) => i !== index);
    setSelectedNames(updated);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
    >
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-white dark:bg-slate-900 border border-parchment-border dark:border-slate-800 rounded-2xl shadow-float flex flex-col overflow-hidden text-ink dark:text-ink-dark"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-parchment-border dark:border-slate-800 bg-parchment/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-carto-indigo/10 text-carto-indigo dark:text-blue-400 border border-carto-indigo/20 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="compare-modal-title" className="text-base font-serif font-bold text-ink dark:text-ink-dark">
                {language === 'hi' ? 'राज्यों का तुलनात्मक अध्ययन' : 'Civic Comparison Matrix'}
              </h2>
              <p className="text-xs text-ink-muted dark:text-ink-dark-muted">
                Side-by-side constitutional and administrative comparison of up to 3 States & Union Territories
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {selectedNames.length < 3 && (
              <button
                type="button"
                onClick={handleAddState}
                className="min-h-[44px] flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-carto-indigo dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold hover:bg-blue-100 transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add State (Max 3)</span>
                <span className="sm:hidden">Add State</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close comparison modal"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-ink-muted hover:text-ink hover:bg-parchment-subtle dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Matrix Table Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-6">
          <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
            <div className={selectedItems.length >= 3 ? "min-w-[560px] sm:min-w-0 space-y-6" : "min-w-[340px] sm:min-w-0 space-y-6"}>
          
              {/* Selectors Bar */}
              <div className={`grid gap-3 ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {selectedNames.map((name, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-parchment dark:bg-slate-800/60 border border-parchment-border dark:border-slate-700 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-sans font-semibold text-ink-muted">
                  <span>State {String.fromCharCode(65 + idx)}</span>
                  {selectedNames.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveState(idx)}
                      className="text-red-600 hover:text-red-700 p-1 rounded"
                      title="Remove column"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <select
                  value={name}
                  onChange={(e) => handleStateChange(idx, e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs font-bold text-ink dark:text-ink-dark focus:outline-none focus:border-carto-indigo cursor-pointer shadow-subtle"
                >
                  {allItems.map(item => (
                    <option key={item.name} value={item.name} disabled={selectedNames.includes(item.name) && item.name !== name}>
                      {language === 'hi' && item.hindi?.name ? `${item.hindi.name} (${item.name})` : item.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Metric Comparison Cards */}
          <div className="space-y-4">
            
            {/* Section 1: Demographics & Geography */}
            <div className="rounded-xl border border-parchment-border dark:border-slate-800 overflow-hidden">
              <div className="bg-parchment-subtle dark:bg-slate-800/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-ink font-serif border-b border-parchment-border dark:border-slate-800 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-carto-indigo" />
                <span>Demographics & Geography (Census of India / Survey of India)</span>
              </div>
              <div className="divide-y divide-parchment-border dark:divide-slate-800 text-xs">
                {/* Population Row */}
                <div className={`grid p-3 items-center ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {selectedItems.map((s, i) => (
                    <div key={i} className="space-y-0.5">
                      <span className="text-[10px] text-ink-muted font-medium block">Population</span>
                      <strong className="text-sm font-bold text-ink dark:text-ink-dark">{s.demographics?.population || 'N/A'}</strong>
                      <span className="text-[10px] text-blue-600 block">{s.demographics?.populationRank}</span>
                    </div>
                  ))}
                </div>

                {/* Area Row */}
                <div className={`grid p-3 items-center ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {selectedItems.map((s, i) => (
                    <div key={i} className="space-y-0.5">
                      <span className="text-[10px] text-ink-muted font-medium block">Geographic Area</span>
                      <strong className="text-sm font-bold text-ink dark:text-ink-dark">
                        {s.demographics?.areaSqKm ? `${s.demographics.areaSqKm.toLocaleString()}\u202Fkm²` : 'N/A'}
                      </strong>
                      <span className="text-[10px] text-emerald-600 block">{s.demographics?.areaRank}</span>
                    </div>
                  ))}
                </div>

                {/* Literacy Row */}
                <div className={`grid p-3 items-center ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {selectedItems.map((s, i) => (
                    <div key={i} className="space-y-0.5">
                      <span className="text-[10px] text-ink-muted font-medium block">Literacy Rate</span>
                      <strong className="text-sm font-bold text-ink dark:text-ink-dark">{s.demographics?.literacyRate || 'N/A'}</strong>
                      <span className="text-[10px] text-ink-muted block">Census 2011</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Parliamentary & Legislative Seats */}
            <div className="rounded-xl border border-parchment-border dark:border-slate-800 overflow-hidden">
              <div className="bg-parchment-subtle dark:bg-slate-800/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-ink font-serif border-b border-parchment-border dark:border-slate-800 flex items-center gap-2">
                <Landmark className="w-3.5 h-3.5 text-amber-600" />
                <span>Parliamentary & Legislative Representation</span>
              </div>
              <div className="divide-y divide-parchment-border dark:divide-slate-800 text-xs">
                {/* Lok Sabha Seats */}
                <div className={`grid p-3 items-center ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {selectedItems.map((s, i) => (
                    <div key={i} className="space-y-0.5">
                      <span className="text-[10px] text-ink-muted font-medium block">Lok Sabha (Lower House)</span>
                      <strong className="text-base font-bold text-carto-indigo dark:text-blue-400">
                        {s.parliamentarySeats?.lokSabha ?? 'N/A'} Seats
                      </strong>
                      <span className="text-[10px] text-ink-muted block">out of 543 nationally</span>
                    </div>
                  ))}
                </div>

                {/* Rajya Sabha Seats */}
                <div className={`grid p-3 items-center ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {selectedItems.map((s, i) => (
                    <div key={i} className="space-y-0.5">
                      <span className="text-[10px] text-ink-muted font-medium block">Rajya Sabha (Council of States)</span>
                      <strong className="text-base font-bold text-amber-700 dark:text-amber-400">
                        {s.parliamentarySeats?.rajyaSabha ?? 'N/A'} Seats
                      </strong>
                      <span className="text-[10px] text-ink-muted block">out of 245 nationally</span>
                    </div>
                  ))}
                </div>

                {/* State Assembly Seats */}
                <div className={`grid p-3 items-center ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {selectedItems.map((s, i) => (
                    <div key={i} className="space-y-0.5">
                      <span className="text-[10px] text-ink-muted font-medium block">Legislative Assembly (Vidhan Sabha)</span>
                      <strong className="text-sm font-bold text-ink dark:text-ink-dark">
                        {s.legislature?.assemblySeats ? `${s.legislature.councilSeats ? 'Bicameral' : 'Unicameral'} &bull; ${s.legislature.assemblySeats} seats` : 'No Assembly'}
                      </strong>
                      <span className="text-[10px] text-ink-muted block">
                        {s.legislature?.assemblySeats ? 'Elected House' : 'Article 239 Administration'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Legislative Council */}
                <div className={`grid p-3 items-center ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {selectedItems.map((s, i) => (
                    <div key={i} className="space-y-0.5">
                      <span className="text-[10px] text-ink-muted font-medium block">Legislative Council (Vidhan Parishad)</span>
                      <strong className="text-sm font-bold text-ink dark:text-ink-dark">
                        {s.legislature?.councilSeats ? `${s.legislature.councilSeats} Members` : 'None (Unicameral)'}
                      </strong>
                      <span className="text-[10px] text-ink-muted block">
                        {s.legislature?.councilSeats ? 'Upper House active' : 'Unicameral State'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Executive Leadership & Governance */}
            <div className="rounded-xl border border-parchment-border dark:border-slate-800 overflow-hidden">
              <div className="bg-parchment-subtle dark:bg-slate-800/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-ink font-serif border-b border-parchment-border dark:border-slate-800 flex items-center gap-2">
                <Crown className="w-3.5 h-3.5 text-emerald-600" />
                <span>Executive Leadership (as of November 2026)</span>
              </div>
              <div className="divide-y divide-parchment-border dark:divide-slate-800 text-xs">
                {/* Chief Minister / Executive */}
                <div className={`grid p-3 items-center ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {selectedItems.map((s, i) => (
                    <div key={i} className="space-y-0.5">
                      <span className="text-[10px] text-ink-muted font-medium block">
                        {s.chiefMinister?.name ? 'Chief Minister' : (s.governor?.role || 'Administrator')}
                      </span>
                      <strong className="text-sm font-bold text-ink dark:text-ink-dark block">
                        {s.chiefMinister?.name || s.governor?.name || 'Administrator'}
                      </strong>
                      <span className="text-[10px] text-ink-muted block">
                        {s.rulingParty?.abbr || s.rulingParty?.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Governor / Lt. Governor */}
                <div className={`grid p-3 items-center ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {selectedItems.map((s, i) => (
                    <div key={i} className="space-y-0.5">
                      <span className="text-[10px] text-ink-muted font-medium block">{s.governor?.role || 'Governor'}</span>
                      <strong className="text-sm font-bold text-ink dark:text-ink-dark block">
                        {s.governor?.name || 'N/A'}
                      </strong>
                      <span className="text-[10px] text-ink-muted block">Appointed by President of India</span>
                    </div>
                  ))}
                </div>

                {/* Total Districts */}
                <div className={`grid p-3 items-center ${selectedItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {selectedItems.map((s, i) => (
                    <div key={i} className="space-y-0.5">
                      <span className="text-[10px] text-ink-muted font-medium block">Administrative Districts</span>
                      <strong className="text-sm font-bold text-ink dark:text-ink-dark">
                        {s.districts?.length || s.demographics?.totalDistricts || 0} Districts
                      </strong>
                      <span className="text-[10px] text-ink-muted block">{s.highCourt || 'Jurisdiction'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

        {/* Footer */}
        <div className="p-3.5 bg-parchment/60 dark:bg-slate-900/60 border-t border-parchment-border dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-ink-muted">
            Compiled from Census of India, Survey of India, ECI and state government sources.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 rounded-lg bg-carto-indigo text-white text-xs font-semibold hover:bg-blue-800 transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
          >
            Close Matrix
          </button>
        </div>

      </div>
    </div>
  );
}
