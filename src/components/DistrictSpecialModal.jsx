import React from 'react';
import { X, Building2, MapPin, Tag, Compass, Landmark, CheckCircle2, Calendar, Users, Layers, ExternalLink } from 'lucide-react';

export default function DistrictSpecialModal({ district, stateName, onClose }) {
  if (!district) return null;

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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="district-modal-title"
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-parchment-border dark:border-slate-800 rounded-2xl shadow-float flex flex-col overflow-hidden text-ink dark:text-ink-dark"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-parchment-border dark:border-slate-800 bg-parchment/60 dark:bg-slate-900/60">
          <div className="min-w-0 pr-3">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-md border font-semibold ${getCategoryStyle(district.category)}`}>
                {district.category || 'Administrative District'}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-ink-muted border border-parchment-border dark:border-slate-700">
                {stateName}
              </span>
            </div>
            <h3 id="district-modal-title" className="text-xl font-serif font-bold text-ink dark:text-ink-dark tracking-tight">
              {district.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-ink-muted mt-1 flex-wrap">
              <div className="flex items-center gap-1 text-ink dark:text-ink-dark font-medium">
                <Building2 className="w-3.5 h-3.5 text-carto-gold shrink-0" aria-hidden="true" />
                <span>Headquarters: <strong>{district.hq || district.name}</strong></span>
              </div>
              {district.division && (
                <>
                  <span className="text-parchment-border dark:text-slate-700">&bull;</span>
                  <span>{district.division} Division</span>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close district modal"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-ink-muted hover:text-ink hover:bg-parchment-subtle dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs leading-relaxed overflow-y-auto max-h-[75vh]">
          
          {/* Prominent Moniker Banner */}
          {district.knownAs && (
            <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800">
              <span className="text-[10px] uppercase font-sans font-bold text-carto-indigo dark:text-blue-300 block tracking-wider">
                Special Moniker
              </span>
              <p className="text-sm font-serif font-bold text-carto-indigo dark:text-blue-100 mt-0.5">
                {district.knownAs}
              </p>
            </div>
          )}

          {/* Structured District Facts Grid */}
          <div className="p-3.5 rounded-xl bg-parchment/60 dark:bg-slate-800/60 border border-parchment-border dark:border-slate-700 space-y-2.5">
            <h4 className="text-xs font-serif font-bold text-ink dark:text-ink-dark uppercase tracking-wider flex items-center gap-1.5 border-b border-parchment-subtle dark:border-slate-700 pb-1.5">
              <Compass className="w-3.5 h-3.5 text-carto-indigo dark:text-blue-400" />
              <span>Administrative & Geographical Profile</span>
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-white dark:bg-slate-800 border border-parchment-subtle dark:border-slate-700">
                <span className="text-[10px] text-ink-muted block font-sans">Population (Census 2011)</span>
                <strong className="text-sm font-sans font-bold text-ink dark:text-ink-dark">
                  {district.census2011Pop?.toLocaleString() || 'Official Gazetted'}
                </strong>
              </div>

              <div className="p-2 rounded bg-white dark:bg-slate-800 border border-parchment-subtle dark:border-slate-700">
                <span className="text-[10px] text-ink-muted block font-sans">Geographic Extent</span>
                <strong className="text-sm font-sans font-bold text-ink dark:text-ink-dark">
                  {district.areaSqKm ? `${district.areaSqKm.toLocaleString()}\u202Fkm²` : 'Survey of India'}
                </strong>
              </div>

              <div className="p-2 rounded bg-white dark:bg-slate-800 border border-parchment-subtle dark:border-slate-700">
                <span className="text-[10px] text-ink-muted block font-sans">Subdistricts / Mandals</span>
                <strong className="text-xs font-sans font-bold text-ink dark:text-ink-dark">
                  {district.subdistricts ? `${district.subdistricts} Tehsils / Mandals` : 'Administrative Subdivisions'}
                </strong>
              </div>

              <div className="p-2 rounded bg-white dark:bg-slate-800 border border-parchment-subtle dark:border-slate-700">
                <span className="text-[10px] text-ink-muted block font-sans">Year Formed</span>
                <strong className="text-xs font-sans font-bold text-ink dark:text-ink-dark">
                  {district.yearFormed || 1956}
                </strong>
              </div>
            </div>

            <p className="text-[10px] text-ink-muted italic pt-1">
              Source: {district.source || 'District Administration Gazette & Census of India 2011'}
            </p>
          </div>

          {/* District Highlights */}
          {district.highlight && (
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-ink-muted leading-relaxed">
              <h4 className="text-[11px] font-sans font-bold text-ink dark:text-ink-dark uppercase mb-1">
                Overview & Context
              </h4>
              <p className="text-ink dark:text-ink-dark font-normal">{district.highlight}</p>
            </div>
          )}

          {/* Known for (Renamed from Landmarks to accommodate non-landmark specialties) */}
          {district.specialties && district.specialties.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-sans font-bold text-ink dark:text-ink-dark uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-carto-indigo dark:text-blue-400" aria-hidden="true" />
                <span>Known for</span>
              </h4>
              <div className="grid grid-cols-1 gap-1.5">
                {district.specialties.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-parchment-border dark:border-slate-700 flex items-center gap-2 text-ink dark:text-ink-dark"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-parchment/60 dark:bg-slate-900 border-t border-parchment-border dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-parchment dark:hover:bg-slate-700 border border-parchment-border dark:border-slate-700 text-ink dark:text-ink-dark text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
