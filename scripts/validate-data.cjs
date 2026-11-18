const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/statesData.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

console.log('--- Running Enhanced Civic Data Validation Suite ---');

let errors = [];

// 1. Validate entity counts: 28 States and 8 Union Territories = 36 total
const states = data.filter(d => d.type === 'State');
const uts = data.filter(d => d.type !== 'State');

if (states.length !== 28) errors.push(`Expected 28 states, found ${states.length}`);
if (uts.length !== 8) errors.push(`Expected 8 union territories, found ${uts.length}`);
if (data.length !== 36) errors.push(`Expected 36 total entities, found ${data.length}`);

// Check for duplicate entity names
const nameSet = new Set();
data.forEach(d => {
  if (nameSet.has(d.name)) errors.push(`Duplicate state/UT name found: ${d.name}`);
  nameSet.add(d.name);
});

// 2. Validate parliamentary seats: 543 Lok Sabha seats, 233 elected Rajya Sabha seats
let totalLokSabha = 0;
let totalRajyaSabha = 0;
let totalDistrictsCount = 0;

data.forEach(d => {
  if (!d.parliamentarySeats || typeof d.parliamentarySeats.lokSabha !== 'number') {
    errors.push(`Missing or invalid Lok Sabha seats for ${d.name}`);
  } else {
    totalLokSabha += d.parliamentarySeats.lokSabha;
  }

  if (!d.parliamentarySeats || typeof d.parliamentarySeats.rajyaSabha !== 'number') {
    errors.push(`Missing or invalid Rajya Sabha seats for ${d.name}`);
  } else {
    totalRajyaSabha += d.parliamentarySeats.rajyaSabha;
  }

  // 3. Validate required fields, leader records & official provenance
  if (!d.name || !d.capital || !d.region || !d.rulingAlliance || !d.hindi?.name || !d.highCourt) {
    errors.push(`Missing core civic metadata for ${d.name}`);
  }

  if (!d.demographics?.source || !d.demographics?.sourceUrl || !d.demographics.sourceUrl.startsWith('http')) {
    errors.push(`Missing or invalid demographics source / sourceUrl for ${d.name}`);
  }

  // Ensure every entity has an executive leader record
  if (!d.chiefMinister && !d.governor) {
    errors.push(`Entity ${d.name} has neither Chief Minister nor Governor/Administrator defined.`);
  }

  if (d.governor) {
    if (!d.governor.name || !d.governor.role) {
      errors.push(`Missing governor/administrator name or role for ${d.name}`);
    }
    if (!d.governor.source || !d.governor.sourceUrl || !d.governor.sourceUrl.startsWith('http')) {
      errors.push(`Missing or invalid governor source/sourceUrl for ${d.name}`);
    }
    if (!d.governor.asOfDate || typeof d.governor.asOfDate !== 'string') {
      errors.push(`Missing or invalid governor asOfDate for ${d.name}`);
    }
  }

  if (d.chiefMinister) {
    if (!d.chiefMinister.name || !d.chiefMinister.party) {
      errors.push(`Missing CM name or party for ${d.name}`);
    }
    if (!d.chiefMinister.source || !d.chiefMinister.sourceUrl || !d.chiefMinister.sourceUrl.startsWith('http')) {
      errors.push(`Missing or invalid CM source/sourceUrl for ${d.name}`);
    }
    if (!d.chiefMinister.asOfDate || typeof d.chiefMinister.asOfDate !== 'string') {
      errors.push(`Missing or invalid CM asOfDate for ${d.name}`);
    }
    if (!d.chiefMinister.swearingInDate) {
      errors.push(`Missing CM swearingInDate for ${d.name}`);
    }
  }

  // 4. Validate districts count reconciliation
  const actualDistricts = d.districts ? d.districts.length : 0;
  if (actualDistricts === 0) {
    errors.push(`Entity ${d.name} has 0 districts defined.`);
  } else {
    totalDistrictsCount += actualDistricts;
    const districtNames = new Set();
    d.districts.forEach(dist => {
      if (districtNames.has(dist.name.toLowerCase())) {
        errors.push(`Duplicate district name '${dist.name}' in ${d.name}`);
      }
      districtNames.add(dist.name.toLowerCase());
      if (!dist.hq) errors.push(`District '${dist.name}' missing HQ in ${d.name}`);
      if (!dist.census2011Pop) errors.push(`District '${dist.name}' missing census2011Pop in ${d.name}`);
    });
  }

  // 5. Validate Census 2011 population metadata
  if (!d.demographics?.census2011Population || typeof d.demographics.census2011Population !== 'number') {
    errors.push(`Missing Census 2011 exact integer population for ${d.name}`);
  }
});

// 6. Check Key Election Outcomes (2025/2026 verification)
const delhi = data.find(d => d.name === 'Delhi');
if (!delhi || delhi.chiefMinister?.name !== 'Rekha Gupta' || delhi.chiefMinister?.party !== 'Bharatiya Janata Party (BJP)') {
  errors.push(`Delhi CM must be Rekha Gupta (BJP), found: ${delhi?.chiefMinister?.name}`);
}

const tn = data.find(d => d.name === 'Tamil Nadu');
if (!tn || tn.chiefMinister?.name !== 'C. Joseph Vijay' || tn.chiefMinister?.party !== 'Tamilaga Vettri Kazhagam (TVK)') {
  errors.push(`Tamil Nadu CM must be C. Joseph Vijay (TVK), found: ${tn?.chiefMinister?.name}`);
}
if (!tn?.rulingAlliance?.includes('TVK Coalition')) {
  errors.push(`Tamil Nadu ruling alliance must reflect sworn-in coalition (TVK Coalition), found: ${tn?.rulingAlliance}`);
}

const wb = data.find(d => d.name === 'West Bengal');
if (!wb || wb.chiefMinister?.name !== 'Suvendu Adhikari' || wb.rulingAlliance !== 'NDA') {
  errors.push(`West Bengal CM must be Suvendu Adhikari (NDA), found: ${wb?.chiefMinister?.name} (${wb?.rulingAlliance})`);
}

const kerala = data.find(d => d.name === 'Kerala');
if (!kerala || kerala.chiefMinister?.name !== 'V. D. Satheesan' || kerala.rulingAlliance !== 'INDIA') {
  errors.push(`Kerala CM must be V. D. Satheesan (INDIA), found: ${kerala?.chiefMinister?.name} (${kerala?.rulingAlliance})`);
}

const assam = data.find(d => d.name === 'Assam');
if (!assam || assam.chiefMinister?.name !== 'Dr. Himanta Biswa Sarma' || assam.rulingAlliance !== 'NDA') {
  errors.push(`Assam CM must be Dr. Himanta Biswa Sarma (NDA), found: ${assam?.chiefMinister?.name} (${assam?.rulingAlliance})`);
}

const py = data.find(d => d.name === 'Puducherry');
if (!py || py.chiefMinister?.name !== 'N. Rangasamy' || py.rulingAlliance !== 'NDA') {
  errors.push(`Puducherry CM must be N. Rangasamy (NDA), found: ${py?.chiefMinister?.name} (${py?.rulingAlliance})`);
}

// 7. Check 5 UTs without legislature have null chiefMinister
const nonLegUTs = ['Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Ladakh', 'Lakshadweep'];
nonLegUTs.forEach(utName => {
  const item = data.find(d => d.name === utName);
  if (item && item.chiefMinister !== null) {
    errors.push(`${utName} must have null chiefMinister, found: ${item.chiefMinister?.name}`);
  }
});

if (totalLokSabha !== 543) errors.push(`Total Lok Sabha seats must be 543, found ${totalLokSabha}`);
if (totalRajyaSabha !== 233) errors.push(`Total elected Rajya Sabha seats must be 233, found ${totalRajyaSabha}`);
if (totalDistrictsCount !== 786) errors.push(`Total districts must be 786, found ${totalDistrictsCount}`);

console.log(`Validated States: ${states.length}/28`);
console.log(`Validated Union Territories: ${uts.length}/8`);
console.log(`Validated Total Districts: ${totalDistrictsCount}/786`);
console.log(`Validated Lok Sabha Seats: ${totalLokSabha}/543`);
console.log(`Validated Elected Rajya Sabha Seats: ${totalRajyaSabha}/233`);

if (errors.length > 0) {
  console.error('Validation FAILED with errors:');
  console.error(errors);
  process.exit(1);
} else {
  console.log('✓ All 28 States, 8 UTs, 786 Districts, and Parliamentary allocations PASSED with 100% integrity!');
  process.exit(0);
}
