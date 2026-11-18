import React from 'react';
import { Plus, Minus, Compass, Maximize2, RotateCcw, Eye, Play, Pause } from 'lucide-react';

export default function MapControls({
  onZoomIn,
  onZoomOut,
  onResetCamera,
  onTogglePerspective,
  isTopDown,
  autoRotate,
  onToggleAutoRotate
}) {
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.log(err));
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-2">
      <div className="glass-panel p-1 rounded-2xl flex flex-col gap-1 shadow-2xl border border-slate-800">
        <button
          onClick={onZoomIn}
          className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all active:scale-95"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all active:scale-95"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <div className="w-full h-px bg-slate-800 my-0.5" />

        <button
          onClick={onResetCamera}
          className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all active:scale-95"
          title="Reset Camera Orientation"
        >
          <Compass className="w-4 h-4 text-orange-400" />
        </button>

        <button
          onClick={onTogglePerspective}
          className={`p-2.5 rounded-xl transition-all active:scale-95 ${
            isTopDown 
              ? 'bg-blue-600/30 text-blue-400 font-bold' 
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
          title={isTopDown ? "Switch to 3D Tilted View" : "Switch to 2D Top-Down View"}
        >
          <Eye className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleAutoRotate}
          className={`p-2.5 rounded-xl transition-all active:scale-95 ${
            autoRotate 
              ? 'bg-emerald-600/30 text-emerald-400' 
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
          title={autoRotate ? "Pause Auto-Rotation" : "Enable Auto-Rotation"}
        >
          {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={handleFullscreen}
          className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all active:scale-95"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

