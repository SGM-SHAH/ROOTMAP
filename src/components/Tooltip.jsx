import React from 'react';
import { MapPin, Users, Building2, Crown } from 'lucide-react';

export default function Tooltip({ hoveredData, position }) {
  if (!hoveredData || !position) return null;

  const isDistrict = hoveredData.isDistrict;
  const { x, y } = position;

  // Offset tooltip slightly so it doesn't block cursor
  const style = {
    left: `${Math.min(x + 16, window.innerWidth - 320)}px`,
    top: `${Math.min(y + 16, window.innerHeight - 200)}px`,
    pointerEvents: 'none',
  };

  if (isDistrict) {
    const district = hoveredData.district;
    return (
      <div
        style={style}
        className="fixed z-50 w-72 glass-panel rounded-xl p-3.5 shadow-2xl border border-cyan-500/40 text-slate-100 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/60">
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
              <MapPin className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm tracking-wide text-white">
              {district.name}
            </span>
          </div>
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            {hoveredData.stateName}
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400">Classification:</span>
            <span className="font-medium text-amber-300">{district.type}</span>
          </div>
          {district.population && (
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Population:</span>
              <span className="font-medium text-slate-200">{district.population}</span>
            </div>
          )}
          {district.highlight && (
            <div className="pt-1.5 text-[11px] text-slate-300 border-t border-slate-800/80 leading-relaxed italic">
              "{district.highlight}"
            </div>
          )}
        </div>
      </div>
    );
  }

  // State Tooltip
  const state = hoveredData.state;
  if (!state) return null;

  return (
    <div
      style={style}
      className="fixed z-50 w-72 glass-panel rounded-xl p-3.5 shadow-2xl border border-blue-500/30 text-slate-100 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/60">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-sm shadow-sm"
            style={{ backgroundColor: state.rulingParty?.color || '#3B82F6' }}
          />
          <h4 className="font-bold text-sm text-white tracking-wide">{state.name}</h4>
        </div>
        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
          {state.type}
        </span>
      </div>

      <div className="space-y-1.5 text-xs text-slate-300">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-slate-400" /> Capital
          </span>
          <span className="font-medium text-slate-100 text-right truncate max-w-[140px]">
            {state.capital}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Crown className="w-3.5 h-3.5 text-amber-400" /> Chief Minister
          </span>
          <span className="font-medium text-slate-100 text-right truncate max-w-[140px]">
            {state.chiefMinister?.name || 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Users className="w-3.5 h-3.5 text-emerald-400" /> Population
          </span>
          <span className="font-medium text-slate-100">
            {state.demographics?.population?.split('(')[0] || 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-sky-400" /> Districts
          </span>
          <span className="font-medium text-slate-100">
            {state.demographics?.totalDistricts || state.majorDistricts?.length || 'N/A'}
          </span>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-blue-400 font-medium">
        <span className="flex items-center gap-1">
          <Building2 className="w-3 h-3 text-cyan-400" /> Click to view details
        </span>
        <span className="text-[10px] text-slate-400">State Details</span>
      </div>
    </div>
  );
}

