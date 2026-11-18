// Color themes for states based on ruling parties or regions
export const PARTY_COLORS = {
  'BJP': '#F97316', // Saffron / Orange
  'Mahayuti': '#EA580C',
  'INC': '#2563EB', // Blue
  'DMK': '#DC2626', // Crimson Red
  'AAP': '#0284C7', // Sky Blue
  'TMC': '#059669', // Emerald Green
  'CPI(M)': '#B91C1C', // Dark Red
  'LDF': '#B91C1C',
  'JD(U)': '#10B981',
  'TDP': '#EAB308', // Yellow
  'NPP': '#8B5CF6',
  'ZPM': '#EC4899',
  'SKM': '#6366F1',
  'JKNC': '#0D9488',
  'Central Administration': '#64748B', // Slate gray for UTs
  'Default': '#3B82F6'
};

// Regional palettes for distinct visual separation in 3D
export const REGION_COLORS = {
  'North': '#38BDF8',
  'South': '#34D399',
  'West': '#F59E0B',
  'East': '#A78BFA',
  'Central': '#FB7185',
  'NorthEast': '#F472B6',
  'Islands': '#2DD4BF'
};

export const getStateColor = (state) => {
  if (!state) return '#3B82F6';
  
  // If party color exists
  const partyAbbr = state.rulingParty?.abbr || state.rulingParty?.name;
  if (partyAbbr && PARTY_COLORS[partyAbbr]) {
    return PARTY_COLORS[partyAbbr];
  }
  
  if (state.type === 'Union Territory' && !state.chiefMinister?.party?.includes('AAP')) {
    return '#64748B';
  }

  // Hash-based pleasant modern palette fallback
  const colors = [
    '#3B82F6', '#8B5CF6', '#EC4899', '#10B981', 
    '#F59E0B', '#06B6D4', '#6366F1', '#14B8A6'
  ];
  let hash = 0;
  for (let i = 0; i < state.name.length; i++) {
    hash = state.name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const formatNumber = (num) => {
  if (typeof num === 'number') {
    return num.toLocaleString('en-IN');
  }
  return num || 'N/A';
};

