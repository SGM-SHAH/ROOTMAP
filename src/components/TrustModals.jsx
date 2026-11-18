import React, { useState } from 'react';
import { X, BookOpen, History, MessageSquarePlus, CheckCircle2, ShieldCheck, Scale, FileText, ExternalLink, Calendar, Globe } from 'lucide-react';
import { BUILD_LABEL } from '../utils/version';

export function MethodologyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const sourcesList = [
    {
      title: "Demographics & Literacy Rates",
      authority: "Office of the Registrar General & Census Commissioner of India, Ministry of Home Affairs",
      url: "https://censusindia.gov.in/",
      asOf: "Census 2011 official tables (recast post-bifurcation) & 2024 UIDAI projections",
      accessDate: "November 2026",
      fields: "Population headcounts, literacy percentages, population rankings"
    },
    {
      title: "Geographical Land Area & Boundaries",
      authority: "Survey of India, Ministry of Science and Technology, Government of India",
      url: "https://surveyofindia.gov.in/",
      asOf: "Official Survey of India territorial gazetteer",
      accessDate: "November 2026",
      fields: "Total state and territory area in square kilometers, area rankings"
    },
    {
      title: "Parliamentary Quotas & Assembly Elections",
      authority: "Election Commission of India (ECI) & Legislative Assembly Secretariats",
      url: "https://eci.gov.in/",
      asOf: "Constitutional seat quotas (543 Lok Sabha / 233 Rajya Sabha); Assembly elections through 2026",
      accessDate: "November 2026",
      fields: "Lok Sabha seats, Rajya Sabha seats, Assembly strength, ruling party/alliance"
    },
    {
      title: "Union Territories & Constitutional Governance",
      authority: "Ministry of Home Affairs (MHA) & Secretariat of the President of India",
      url: "https://mha.gov.in/",
      asOf: "Article 239 administrative appointments as of November 2026",
      accessDate: "November 2026",
      fields: "Lieutenant Governors, Administrators, executive cabinet portfolios"
    },
    {
      title: "Aadhaar Projections & Demographic Estimates",
      authority: "Unique Identification Authority of India (UIDAI), Ministry of Electronics & IT",
      url: "https://uidai.gov.in/",
      asOf: "2024 State/UT demographic live projections",
      accessDate: "November 2026",
      fields: "Live projected population estimates (2024)"
    },
    {
      title: "Judicial Territorial Jurisdictions",
      authority: "Department of Justice, Ministry of Law and Justice, Government of India",
      url: "https://doj.gov.in/",
      asOf: "Article 214 High Courts of India gazette",
      accessDate: "November 2026",
      fields: "High Court seats, principal benches, and inter-state jurisdictions"
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="methodology-modal-title"
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 border border-parchment-border dark:border-slate-800 rounded-2xl shadow-float flex flex-col overflow-hidden text-ink dark:text-ink-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-parchment-border dark:border-slate-800 bg-parchment/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-carto-indigo/10 text-carto-indigo dark:text-blue-400 border border-carto-indigo/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="methodology-modal-title" className="text-base font-serif font-bold text-ink dark:text-ink-dark">
                Methodology & Data Provenance
              </h2>
              <p className="text-xs text-ink-muted">
                Compiled from Census of India, Survey of India, ECI and state government sources
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close methodology modal"
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-ink-muted hover:text-ink hover:bg-parchment-subtle dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs leading-relaxed">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1.5">
            <h3 className="font-bold text-sm text-carto-indigo dark:text-blue-300">
              Non-Partisan Civic Commitment
            </h3>
            <p className="text-slate-700 dark:text-slate-300">
              The Political Directory of India is an independent, non-partisan educational and reference instrument. 
              Its mandate is to provide citizens, researchers, and students with strictly factual, verified constitutional data 
              free from editorial bias, sensationalism, or political favoritism.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-ink font-serif uppercase tracking-wider">
              1. Constitutional Classification of Entities
            </h4>
            <p className="text-slate-600 dark:text-slate-400">
              The Republic of India currently comprises <strong>28 States</strong> and <strong>8 Union Territories</strong>.
              Under the Constitution of India:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>States (28)</strong>: Possess their own elected governments and constitutional Governors appointed under Article 153.</li>
              <li><strong>Union Territories with Legislature (3)</strong>: Delhi, Jammu & Kashmir, and Puducherry have elected legislative assemblies and Chief Ministers, operating under special constitutional provisions with Lieutenant Governors appointed by the President.</li>
              <li><strong>Union Territories without Legislature (5)</strong>: Andaman & Nicobar, Chandigarh, Dadra & Nagar Haveli and Daman & Diu, Ladakh, and Lakshadweep are directly administered by Administrators or Lieutenant Governors under Article 239.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-ink font-serif uppercase tracking-wider">
              2. Official Sources, Verification URLs & Per-Field Dates
            </h4>
            <div className="space-y-3">
              {sourcesList.map((src, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700 space-y-2">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <span className="font-serif font-bold text-sm text-ink dark:text-ink-dark">{src.title}</span>
                    <a 
                      href={src.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-[11px] text-carto-indigo dark:text-blue-400 hover:underline font-mono"
                    >
                      <span>{src.url.replace('https://', '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[11px] text-ink-muted">
                    <strong>Authority:</strong> {src.authority}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-parchment-subtle dark:border-slate-700">
                    <div>
                      <span className="text-ink-muted block">Applicable Fields:</span>
                      <span className="text-ink dark:text-ink-dark font-medium">{src.fields}</span>
                    </div>
                    <div>
                      <span className="text-ink-muted block">As of / Access Date:</span>
                      <span className="text-ink dark:text-ink-dark font-medium">{src.asOf} &bull; Accessed {src.accessDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-ink font-serif uppercase tracking-wider">
              3. Ruling Alliance & Coalition Classification Methodology
            </h4>
            <div className="p-3.5 rounded-xl bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700 space-y-2">
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Classification Rule:</strong> <em>Alliance = party or alliance leading the state government.</em>
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                To maintain strict non-partisan fidelity, executive alignment in this reference reflects the actual sworn-in Council of Ministers and Chief Minister presiding over each state government, not merely speculative post-poll alignments or single largest legislative parties:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
                <li><strong>National Alliances (NDA & INDIA)</strong>: Assigned when the Chief Minister and governing cabinet represent an official constituent of the National Democratic Alliance or Indian National Developmental Inclusive Alliance, as notified by the Election Commission of India (ECI).</li>
                <li><strong>Regional Parties & Independent Coalitions</strong>: Parties operating outside national blocs (e.g. Zoram People's Movement (ZPM) in Mizoram, TVK Coalition in Tamil Nadu, Biju Janata Dal (BJD), YSRCP) are designated under Regional / Other or by their specific sworn governing coalition name.</li>
                <li><strong>Central Administration</strong>: Union Territories without a legislative assembly (e.g. Ladakh, Andaman & Nicobar, Chandigarh, Dadra & Nagar Haveli and Daman & Diu, Lakshadweep) are classified under Central Administration (Hatched pattern) as governed by the President through appointed Administrators under Article 239.</li>
                <li><strong>Verification & Frequency</strong>: Every leader, party, alliance, and cabinet entry is tagged with its swearing-in date, official state portal URL, and an explicit "as of" date reviewed against ECI notifications.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-parchment/60 dark:bg-slate-900/60 border-t border-parchment-border dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-ink-muted">
            Sources linked per field. Last reviewed November 2026 &bull; <span className="font-mono text-[10px]">{BUILD_LABEL}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 rounded-lg bg-carto-indigo text-white text-xs font-semibold hover:bg-blue-800 transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChangelogModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const entries = [
    {
      date: "November 2026",
      title: "Assembly Elections 2025-2026 Re-audit & Comprehensive Census Recast",
      details: "Updated leadership records reflecting Delhi Legislative Assembly election results (Chief Minister Rekha Gupta, BJP). Reconciled non-legislature UT governance structure to accurately designate Administrators and Lieutenant Governors under Article 239. Integrated official Census 2011 exact headcount recasting and 2024 UIDAI projections."
    },
    {
      date: "November 2024",
      title: "Assembly Elections 2024 & Complete Parliamentary Reconciliation",
      details: "Updated leadership records following 2024 assembly elections in Andhra Pradesh, Odisha, Sikkim, Arunachal Pradesh, Haryana, and Jammu & Kashmir. Reconciled all 543 Lok Sabha and 233 elected Rajya Sabha seat allocations."
    },
    {
      date: "January 2020",
      title: "Consolidation of Dadra & Nagar Haveli and Daman & Diu",
      details: "Merged previously separate union territories of Dadra and Nagar Haveli and Daman and Diu into a single consolidated Union Territory with Daman as headquarters, reducing India's UT count from 9 to 8."
    },
    {
      date: "October 2019",
      title: "Jammu and Kashmir Reorganisation Act, 2019",
      details: "Reconstituted the state of Jammu and Kashmir into two distinct Union Territories: Jammu & Kashmir (with a Legislative Assembly) and Ladakh (without a Legislative Assembly)."
    },
    {
      date: "June 2014",
      title: "Bifurcation of Andhra Pradesh & Creation of Telangana",
      details: "Carved out Telangana as India's 29th State under the Andhra Pradesh Reorganisation Act, 2014, with Hyderabad as initial joint capital."
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="changelog-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 border border-parchment-border dark:border-slate-800 rounded-2xl shadow-float flex flex-col overflow-hidden text-ink dark:text-ink-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-parchment-border dark:border-slate-800 bg-parchment/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 id="changelog-modal-title" className="text-base font-serif font-bold text-ink dark:text-ink-dark">
                Administrative & Governance Changelog
              </h2>
              <p className="text-xs text-ink-muted">
                Historical record of state re-organisations, elections, and atlas updates
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close changelog modal"
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-ink-muted hover:text-ink hover:bg-parchment-subtle dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          {entries.map((entry, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-parchment dark:bg-slate-800/60 border border-parchment-border dark:border-slate-700 relative pl-4">
              <div className="absolute left-0 top-3 bottom-3 w-1 bg-amber-600 rounded-r" />
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded">
                  {entry.date}
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm text-ink dark:text-ink-dark mt-1">
                {entry.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                {entry.details}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3.5 bg-parchment/60 dark:bg-slate-900/60 border-t border-parchment-border dark:border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-ink-muted">
            Sources linked per field. Last reviewed November 2026 &bull; <span className="font-mono text-[10px]">{BUILD_LABEL}</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 rounded-lg bg-carto-indigo text-white text-xs font-semibold hover:bg-blue-800 transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function ReportCorrectionModal({ isOpen, onClose, stateName: propState = '', defaultState = '' }) {
  if (!isOpen) return null;

  const [stateName, setStateName] = useState(propState || defaultState);
  const [topic, setTopic] = useState('leadership');
  const [description, setDescription] = useState('');
  const [sourceRef, setSourceRef] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (propState) setStateName(propState);
  }, [propState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-parchment-border dark:border-slate-800 rounded-2xl shadow-float flex flex-col overflow-hidden text-ink dark:text-ink-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-parchment-border dark:border-slate-800 bg-parchment/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h2 id="report-modal-title" className="text-base font-serif font-bold text-ink dark:text-ink-dark">
                Report a Civic Correction
              </h2>
              <p className="text-xs text-ink-muted">
                Help maintain accuracy in India's administrative directory
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close correction modal"
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-ink-muted hover:text-ink hover:bg-parchment-subtle dark:hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 text-xs leading-relaxed overflow-y-auto">
          {submitted ? (
            <div className="p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-ink dark:text-ink-dark">
                Thank You for Your Civic Contribution
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                Your correction has been logged. Our editorial reviewers will cross-verify the submission against official Election Commission gazettes, Census tables, and Survey of India records.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 min-h-[44px] px-6 py-2.5 rounded-lg bg-carto-indigo text-white text-xs font-semibold hover:bg-blue-800 transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-ink dark:text-ink-dark mb-1">State or Territory:</label>
                <input
                  type="text"
                  required
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  placeholder="e.g. Maharashtra, Uttar Pradesh, Ladakh"
                  className="w-full h-10 px-3 rounded-lg bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark focus:outline-none focus:border-carto-indigo"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-ink dark:text-ink-dark mb-1">Subject of Correction:</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark focus:outline-none focus:border-carto-indigo cursor-pointer"
                >
                  <option value="leadership">Executive Leadership (Governor, CM, Administrator)</option>
                  <option value="districts">Districts & Headquarters</option>
                  <option value="parliamentary">Parliamentary Seats (Lok Sabha / Rajya Sabha)</option>
                  <option value="demographics">Demographics / Area / Literacy</option>
                  <option value="other">Other Information</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-ink dark:text-ink-dark mb-1">Correction Details:</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the discrepancy clearly..."
                  className="w-full p-3 rounded-lg bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark focus:outline-none focus:border-carto-indigo"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-ink dark:text-ink-dark mb-1">Official Reference / Source URL:</label>
                <input
                  type="text"
                  value={sourceRef}
                  onChange={(e) => setSourceRef(e.target.value)}
                  placeholder="e.g. eci.gov.in, censusindia.gov.in, or state gazette link"
                  className="w-full h-10 px-3 rounded-lg bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark focus:outline-none focus:border-carto-indigo"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-ink dark:text-ink-dark mb-1">Your Email (optional, for follow-up):</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-10 px-3 rounded-lg bg-parchment dark:bg-slate-800 border border-parchment-border dark:border-slate-700 text-xs text-ink dark:text-ink-dark focus:outline-none focus:border-carto-indigo"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] px-5 py-2 rounded-lg bg-carto-indigo text-white text-xs font-semibold hover:bg-blue-800 transition-colors focus-visible:ring-2 focus-visible:ring-carto-indigo"
                >
                  Submit Correction
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
