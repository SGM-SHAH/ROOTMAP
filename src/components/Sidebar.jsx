import React, { useState } from 'react';
import { 
  X, ChevronRight, Crown, Shield, BookOpen, Landmark, 
  Users, MapPin, Building2, Award, Info, Compass, 
  ExternalLink, FileText, CheckCircle2, Search, Navigation
} from 'lucide-react';

export default function Sidebar({
  selectedState,
  selectedDistrict,
  onClose,
  onSelectDistrict,
  onOpenConstitutionalModal
}) {
  const [activeTab, setActiveTab] = useState('districts'); // default to 'districts' or 'cabinet'
  const [cityFilter, setCityFilter] = useState('');

  if (!selectedState) return null;

  const filteredCities = (selectedState.majorDistricts || []).filter(d => 
    !cityFilter || 
    d.name.toLowerCase().includes(cityFilter.toLowerCase()) ||
    (d.type && d.type.toLowerCase().includes(cityFilter.toLowerCase()))
  );

  return (
    <aside className="fixed top-16 right-0 bottom-0 z-30 w-full sm:w-[450px] lg:w-[480px] glass-panel bg-slate-900/95 border-l border-slate-800/90 shadow-2xl flex flex-col backdrop-blur-2xl animate-in slide-in-from-right duration-300 overflow-hidden text-slate-100">
      
      {/* State Header Banner */}
      <div className="relative p-5 pb-4 border-b border-slate-800/80 bg-gradient-to-b from-slate-800/50 via-slate-900/30 to-transparent">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          title="Close Sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* State Identity Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
          <span 
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md text-white shadow-sm"
            style={{ backgroundColor: selectedState.rulingParty?.color || '#3B82F6' }}
          >
            {selectedState.rulingParty?.abbr || selectedState.rulingParty?.name}
          </span>
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
            {selectedState.type}
          </span>
          {selectedState.demographics?.populationRank && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
              {selectedState.demographics.populationRank}
            </span>
          )}
        </div>

        {/* State Title */}
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          {selectedState.name}
        </h2>

        {/* Capital */}
        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-300">
          <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-slate-400">Capital:</span>
          <span className="font-semibold text-slate-100">{selectedState.capital}</span>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1 mt-4 p-1 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs font-medium">
          <button
            onClick={() => setActiveTab('districts')}
            className={`py-1.5 rounded-lg transition-all relative ${
              activeTab === 'districts'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cities
            {selectedState.majorDistricts?.length > 0 && (
              <span className="ml-1 text-[9px] px-1.5 py-0.2 rounded-md bg-cyan-400/30 text-cyan-200 font-bold">
                {selectedState.majorDistricts.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('cabinet')}
            className={`py-1.5 rounded-lg transition-all ${
              activeTab === 'cabinet'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cabinet
          </button>
          <button
            onClick={() => setActiveTab('demographics')}
            className={`py-1.5 rounded-lg transition-all ${
              activeTab === 'demographics'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab('trivia')}
            className={`py-1.5 rounded-lg transition-all ${
              activeTab === 'trivia'
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Trivia
          </button>
        </div>
      </div>

      {/* Scrollable Tab Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        
        {/* TAB: MAJOR CITIES & DISTRICTS (LEVEL 3 EXPLORER) */}
        {activeTab === 'districts' && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Major Cities & Centers ({selectedState.majorDistricts?.length || 0})
              </span>
              <span className="text-cyan-400 font-medium text-[11px]">Click to fly in 3D</span>
            </div>

            {/* City search filter if multiple cities */}
            {selectedState.majorDistricts && selectedState.majorDistricts.length > 3 && (
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  placeholder={`Search in ${selectedState.name}'s cities...`}
                  className="w-full h-8 pl-8 pr-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {filteredCities.length > 0 ? (
              filteredCities.map((district, idx) => {
                const isSelected = selectedDistrict?.name === district.name;
                return (
                  <div
                    key={idx}
                    onClick={() => onSelectDistrict(district)}
                    className={`p-3.5 rounded-xl transition-all cursor-pointer border group ${
                      isSelected
                        ? 'bg-cyan-950/50 border-cyan-400 shadow-glow'
                        : 'glass-card border-slate-700/60 hover:border-cyan-500/50 hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl transition-transform group-hover:scale-105 ${
                          isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-400'
                        }`}>
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                            {district.name}
                          </h4>
                          <span className="text-[11px] font-medium text-amber-300/90 block">
                            {district.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectDistrict(district);
                          }}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                            isSelected 
                              ? 'bg-cyan-500 text-slate-950 shadow-sm' 
                              : 'bg-slate-800 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700'
                          }`}
                        >
                          <Navigation className="w-3 h-3" />
                          <span>{isSelected ? 'Focused' : 'Fly 3D'}</span>
                        </button>
                        {district.population && (
                          <span className="text-[10px] text-slate-400">
                            Pop: {district.population}
                          </span>
                        )}
                      </div>
                    </div>

                    {district.highlight && (
                      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/90">
                        {district.highlight}
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-xs text-slate-400 glass-card rounded-xl">
                No matching cities found.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CABINET & EXECUTIVE OFFICIALS */}
        {activeTab === 'cabinet' && (
          <div className="space-y-3.5 animate-in fade-in duration-200">
            
            {/* 1. Chief Minister Card */}
            <div className="p-4 rounded-xl glass-card border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-800/40 to-transparent">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Chief Minister
                    </span>
                    <h3 className="font-bold text-base text-white">
                      {selectedState.chiefMinister?.name || 'N/A'}
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedState.chiefMinister?.party?.split('(')[0] || 'Executive'}
                </span>
              </div>
              {selectedState.rulingParty?.assemblyStrength && (
                <div className="mt-2.5 pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Assembly Coalition:</span>
                  <span className="font-medium text-slate-200">{selectedState.rulingParty.name}</span>
                </div>
              )}
            </div>

            {/* 2. Governor / Lt. Governor */}
            <div className="p-3.5 rounded-xl glass-card border border-slate-700/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
                  <Landmark className="w-4 h-4 text-sky-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                      {selectedState.governor?.role || 'Governor'} (Constitutional Head)
                    </span>
                    <span className="text-[9px] text-slate-400">President Appointee</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 truncate">
                    {selectedState.governor?.name || 'N/A'}
                  </h4>
                </div>
              </div>
            </div>

            {/* 3. Speaker of Legislative Assembly */}
            <div className="p-3.5 rounded-xl glass-card border border-slate-700/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    Legislative Assembly Speaker
                  </span>
                  <h4 className="font-bold text-sm text-slate-100 truncate">
                    {selectedState.speaker?.name || 'N/A'}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">
                    {selectedState.speaker?.assembly || 'Vidhan Sabha'}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. State Home Minister */}
            <div className="p-3.5 rounded-xl glass-card border border-emerald-500/30 bg-emerald-950/10">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      State Home Minister
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      Internal Security & Police
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 mt-0.5">
                    {selectedState.homeMinister?.name || 'N/A'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {selectedState.homeMinister?.note || selectedState.homeMinister?.portfolio || 'Administers state law & order, police forces, and cyber security.'}
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Defense Minister / Constitutional Context */}
            <div className="p-4 rounded-xl glass-card border border-cyan-500/40 bg-gradient-to-br from-cyan-950/30 via-slate-900/60 to-blue-950/40 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1">
                      Defence Portfolio Clarification
                    </span>
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-200 border border-cyan-500/30">
                      7th Schedule Union Subject
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                    Under the <strong>Seventh Schedule (List I)</strong> of the Constitution of India, 
                    <strong> National Defence</strong> is exclusively handled by the Union Government:
                  </p>

                  <div className="mt-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Union Defence Minister:</span>
                      <strong className="text-amber-300">
                        {selectedState.defensePortfolio?.unionDefenseMinister?.split('(')[0] || 'Rajnath Singh'}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">State-Level Body:</span>
                      <span className="text-slate-200 text-right truncate max-w-[180px]">
                        {selectedState.defensePortfolio?.stateEquivalent || 'Directorate of Sainik Welfare'}
                      </span>
                    </div>
                  </div>

                  {selectedState.defensePortfolio?.note && (
                    <p className="text-[11px] text-slate-400 mt-2 italic">
                      {selectedState.defensePortfolio.note}
                    </p>
                  )}

                  <button
                    onClick={onOpenConstitutionalModal}
                    className="mt-2.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group"
                  >
                    <span>Read Full 7th Schedule Constitutional Explainer</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 6. Education Minister */}
            <div className="p-3.5 rounded-xl glass-card border border-slate-700/70">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      State Education Minister(s)
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      Concurrent List
                    </span>
                  </div>
                  
                  <div className="mt-2 space-y-1 text-xs">
                    {selectedState.educationMinister?.schoolEducation && (
                      <div>
                        <span className="text-slate-400 text-[11px]">School Education: </span>
                        <span className="font-semibold text-slate-200">
                          {selectedState.educationMinister.schoolEducation}
                        </span>
                      </div>
                    )}
                    {selectedState.educationMinister?.higherEducation && (
                      <div>
                        <span className="text-slate-400 text-[11px]">Higher & Tech Education: </span>
                        <span className="font-semibold text-slate-200">
                          {selectedState.educationMinister.higherEducation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: DEMOGRAPHICS & GEOGRAPHY */}
        {activeTab === 'demographics' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* 4 Stats Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl glass-card border border-blue-500/20">
                <div className="flex items-center gap-2 text-blue-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Population</span>
                </div>
                <div className="font-bold text-base text-white">
                  {selectedState.demographics?.population?.split('(')[0] || 'N/A'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {selectedState.demographics?.populationRank || 'Major State'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl glass-card border border-slate-700/60">
                <div className="flex items-center gap-2 text-sky-400 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Districts</span>
                </div>
                <div className="font-bold text-base text-white">
                  {selectedState.demographics?.totalDistricts || selectedState.majorDistricts?.length || 'N/A'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Administrative Units
                </div>
              </div>

              <div className="p-3.5 rounded-xl glass-card border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <Compass className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Area</span>
                </div>
                <div className="font-bold text-base text-white">
                  {selectedState.demographics?.areaSqKm ? `${selectedState.demographics.areaSqKm.toLocaleString()} km²` : 'N/A'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {selectedState.demographics?.areaRank || 'Geographic Area'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl glass-card border border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Literacy</span>
                </div>
                <div className="font-bold text-base text-white">
                  {selectedState.demographics?.literacyRate || 'N/A'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Literacy Index
                </div>
              </div>
            </div>

            {/* Official Languages & Economy */}
            <div className="p-4 rounded-xl glass-card border border-slate-700/60 space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Official Language(s):</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedState.demographics?.officialLanguages?.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {selectedState.demographics?.gdp && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-400 block mb-1">Gross State Domestic Product (GSDP):</span>
                  <p className="font-semibold text-slate-200">{selectedState.demographics.gdp}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: EDUCATIONAL TRIVIA */}
        {activeTab === 'trivia' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2">
              <Info className="w-4 h-4" />
              <span>Educational Facts for Students</span>
            </div>

            {selectedState.educationalTrivia?.map((fact, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl glass-card border border-slate-700/60 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                  {idx + 1}
                </div>
                <p className="flex-1">{fact}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-800/90 bg-slate-950/90 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 text-[11px]">
          <span className="w-2 h-2 rounded-sm bg-emerald-400" />
          {selectedState.majorDistricts?.length || 0} Cities Indexed
        </span>
        <button
          onClick={() => {
            setActiveTab('districts');
            if (selectedState.majorDistricts?.length > 0) {
              onSelectDistrict(selectedState.majorDistricts[0]);
            }
          }}
          className="text-cyan-400 hover:text-cyan-300 font-semibold text-xs flex items-center gap-1"
        >
          <span>Explore All Cities in 3D</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </aside>
  );
}
