const fs = require('fs');
const path = require('path');

const south = require('./districts/south.cjs');
const westCentral = require('./districts/west_central.cjs');
const north = require('./districts/north.cjs');
const eastNortheast = require('./districts/east_northeast.cjs');

const allDistrictsMap = {
  ...south,
  ...westCentral,
  ...north,
  ...eastNortheast
};

const statesDataPath = path.join(__dirname, '../src/data/statesData.json');
const statesData = JSON.parse(fs.readFileSync(statesDataPath, 'utf8'));

let totalDistrictsAcrossIndia = 0;
let missingStates = [];

statesData.forEach(state => {
  // Check exact name match or alias
  let districtList = allDistrictsMap[state.name];

  if (!districtList && state.name === "Dadra and Nagar Haveli") {
    districtList = [
      { name: "Dadra and Nagar Haveli", hq: "Silvassa", division: "Western", highlight: "Silvassa administrative hub, Vanganga lake, and industrial tax-free haven." }
    ];
  } else if (!districtList && state.name === "Daman and Diu") {
    districtList = [
      { name: "Daman", hq: "Daman", division: "Western", highlight: "Moti Daman and Nani Daman Portuguese forts, Devka beach." },
      { name: "Diu", hq: "Diu", division: "Western", highlight: "Historic island off Saurashtra coast, Diu Fort, St. Paul's Church, and Nagoa beach." }
    ];
  }

  if (districtList && districtList.length > 0) {
    state.districts = districtList;
    if (!state.demographics) state.demographics = {};
    state.demographics.totalDistricts = districtList.length;
    totalDistrictsAcrossIndia += districtList.length;
    console.log(`[OK] ${state.name.padEnd(32)}: ${districtList.length} districts loaded.`);
  } else {
    missingStates.push(state.name);
    console.error(`[MISSING] No districts found for: ${state.name}`);
  }
});

console.log('\n--- Summary ---');
console.log('Total States/UTs processed:', statesData.length);
console.log('Total Districts across India:', totalDistrictsAcrossIndia);
console.log('Missing States count:', missingStates.length);

if (missingStates.length === 0) {
  fs.writeFileSync(statesDataPath, JSON.stringify(statesData, null, 2), 'utf8');
  console.log('Successfully updated statesData.json with ALL districts!');
} else {
  console.error('Errors found in missing states:', missingStates);
}
