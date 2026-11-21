import React from 'react';
import { X, Shield, BookOpen, Scale, Award, CheckCircle2 } from 'lucide-react';

export default function ConstitutionalModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="constitutional-modal-title"
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 id="constitutional-modal-title" className="text-lg font-bold text-slate-900 flex items-center gap-2">
                Seventh Schedule & Cabinet Portfolios
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Article 246
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Understanding why Indian States have Home Ministers, but NOT State Defense Ministers
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Constitutional Guide"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed">
          {/* Key Takeaway Box */}
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-950 text-sm">
                  The Constitutional Principle of Unified Defense
                </h3>
                <p className="mt-1 text-xs text-slate-700">
                  Under the Constitution of India, <strong>National Defence</strong> is strictly a 
                  <span className="text-blue-700 font-semibold"> Union List (List I)</span> responsibility. 
                  Unlike the United States (which has state National Guards under state governors), India maintains a 
                  <strong> single unified military command</strong> under the President of India (Supreme Commander) 
                  and the Union Ministry of Defence. Therefore, <em>no individual Indian state possesses a "State Defense Minister"</em>.
                </p>
              </div>
            </div>
          </div>

          {/* Three Lists - Editorial Sequential Layout */}
          <div className="space-y-3">
            {/* List 1 */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/90 shadow-2xs">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                <h4 className="font-bold text-amber-900 text-sm">List I: Union List</h4>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Exclusive domain of the Parliament of India (~100 items).
              </p>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span><strong>Defence & Armed Forces</strong></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Foreign Affairs & Treaties</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Atomic Energy & Space</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Railways & Airways</span>
                </li>
              </ul>
              <div className="mt-3 pt-2.5 border-t border-amber-200 text-[11px] text-amber-800">
                Union Defence Minister: <strong>Rajnath Singh</strong>.
              </div>
            </div>

            {/* List 2 */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/90 shadow-2xs">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                <h4 className="font-bold text-emerald-900 text-sm">List II: State List</h4>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Exclusive domain of State Legislatures (~61 items).
              </p>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Public Order & Police</strong></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Public Health & Sanitation</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Prisons & Local Govt</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Agriculture & Irrigation</span>
                </li>
              </ul>
              <div className="mt-3 pt-2.5 border-t border-emerald-200 text-[11px] text-emerald-800">
                Headed by <strong>State Home Ministers</strong>.
              </div>
            </div>

            {/* List 3 */}
            <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200/90 shadow-2xs">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-500"></span>
                <h4 className="font-bold text-sky-900 text-sm">List III: Concurrent</h4>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Both Parliament & States legislate (~52 items).
              </p>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span><strong>Education</strong> (42nd Amendment)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Forests & Wildlife</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Criminal Law & Procedure</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Trade Unions & Welfare</span>
                </li>
              </ul>
              <div className="mt-3 pt-2.5 border-t border-sky-200 text-[11px] text-sky-800">
                Allows <strong>State Education Ministers</strong>.
              </div>
            </div>
          </div>

          {/* State Level Defence Equivalents */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" /> What Do States Have Instead for Defense Support?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <strong className="text-blue-700 block mb-1">1. Department of Sainik Welfare</strong>
                Every state runs a Directorate of Sainik Welfare / Rajya Sainik Board dedicated to rehabilitation, pensions, and healthcare for war veterans, widows, and ex-servicemen.
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <strong className="text-blue-700 block mb-1">2. Defence Industrial Corridors</strong>
                States like Uttar Pradesh and Tamil Nadu collaborate with the Union Ministry of Defence to develop specialized manufacturing corridors (UAVs, missiles, ammunition).
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Source: Constitution of India, Articles 245-248 & 7th Schedule</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-sm"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
