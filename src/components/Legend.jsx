import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MousePointer, Move, ZoomIn } from 'lucide-react';

export default function Legend() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-20 max-w-xs transition-all">
      <div className="glass-panel p-3 rounded-2xl shadow-xl border border-slate-800 text-xs text-slate-300">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full font-medium text-slate-200 hover:text-white"
        >
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-[11px] uppercase tracking-wider">3D Controls & Guide</span>
          </span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 text-[11px] animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <MousePointer className="w-3 h-3 text-cyan-400 shrink-0" />
              <span><strong>Left Click & Drag:</strong> Rotate 3D map</span>
            </div>
            <div className="flex items-center gap-2">
              <Move className="w-3 h-3 text-emerald-400 shrink-0" />
              <span><strong>Right Click & Drag:</strong> Pan camera</span>
            </div>
            <div className="flex items-center gap-2">
              <ZoomIn className="w-3 h-3 text-amber-400 shrink-0" />
              <span><strong>Scroll Wheel:</strong> Zoom in & out</span>
            </div>
            <div className="pt-2 border-t border-slate-800 text-slate-400">
              <p>Click any state to enter <strong>State View</strong> with 3D district pins and complete executive cabinet details.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

