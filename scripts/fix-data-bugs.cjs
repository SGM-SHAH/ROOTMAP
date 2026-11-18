const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/statesData.json');
let data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

// 1. Merge Dadra and Nagar Haveli & Daman and Diu into one official UT
const dnh = data.find(d => d.id === 'dadra-and-nagar-haveli');
const dd = data.find(d => d.id === 'daman-and-diu');

const mergedUT = {
  id: "dadra-and-nagar-haveli-and-daman-and-diu",
  name: "Dadra and Nagar Haveli and Daman and Diu",
  aliases: ["DNHDD", "DNH & DD", "Dadra & Nagar Haveli", "Daman & Diu"],
  type: "Union Territory",
  capital: "Daman",
  chiefMinister: {
    name: "Union Territory Administration",
    party: "Central Administration",
    alliance: "Central Administration",
    termStart: "Direct UT Administration",
    asOf: "November 2024"
  },
  rulingParty: {
    name: "Central Administration (Union Government of India)",
    abbr: "Central",
    color: "#475569",
    assemblyStrength: "Union Territory Administration (Without Legislature)",
    asOf: "November 2024"
  },
  governor: {
    name: "Praful Khoda Patel",
    role: "Administrator",
    appointedBy: "President of India",
    asOf: "November 2024"
  },
  speaker: {
    name: "Not Applicable (UT without Legislature)",
    assembly: "Advisory Council"
  },
  homeMinister: {
    name: "Union Ministry of Home Affairs, Government of India",
    portfolio: "Union Home Affairs",
    note: "Public safety and policing report directly to the Ministry of Home Affairs, Government of India."
  },
  defensePortfolio: {
    constitutionalFact: "Under List I of the 7th Schedule of the Constitution, Defence is solely under the Union Government.",
    unionDefenseMinister: "Rajnath Singh",
    stateEquivalent: "Department of Sainik Welfare (DNH & DD)",
    note: "Indian Coast Guard Air Station Daman is the premier air station on the western seaboard operating Dornier aircraft."
  },
  educationMinister: {
    schoolEducation: "Director of Education, Administration of DNH & DD",
    higherEducation: "Department of Higher Education"
  },
  demographics: {
    population: "5.86 Lakhs",
    populationRank: "33rd by Population",
    totalDistricts: 3,
    areaSqKm: 603,
    areaRank: "32nd by Area",
    literacyRate: "77.65%",
    censusYear: "Census 2011",
    officialLanguages: ["Gujarati", "Hindi", "Marathi", "English"],
    gdp: "~$4.5 Billion"
  },
  majorDistricts: [
    {
      name: "Daman",
      type: "Capital & Historic Coastal Fort",
      coordinates: [72.8397, 20.4283],
      population: "191,173",
      highlight: "Capital city, historic Moti Daman Fort, St. Jerome Fort, and scenic Devka beach."
    },
    {
      name: "Silvassa",
      type: "Industrial & Forest Center",
      coordinates: [73.0169, 20.2763],
      population: "343,709",
      highlight: "Headquarters of Dadra and Nagar Haveli, famous for Warli tribal art, Vanganga Lake Garden, and industrial tax-free zones."
    },
    {
      name: "Diu",
      type: "Island Fortress & Beach City",
      coordinates: [70.9874, 20.7144],
      population: "52,074",
      highlight: "Diu Fort built in 1535 towering over the Arabian Sea, Naida Caves, and St. Paul's Church."
    }
  ],
  educationalTrivia: [
    "On 26 January 2020, Parliament merged Dadra and Nagar Haveli with Daman and Diu into a single consolidated Union Territory.",
    "Diu is India's first 100% solar-powered union territory, generating surplus clean renewable energy during daylight hours.",
    "The territory preserves centuries-old Portuguese colonial architecture alongside indigenous Warli tribal heritage."
  ],
  districts: [
    {
      name: "Dadra and Nagar Haveli",
      hq: "Silvassa",
      division: "Dadra & Nagar Haveli",
      highlight: "Silvassa administrative hub, Vanganga lake garden, and industrial manufacturing haven.",
      category: "Nature & Wildlife",
      knownAs: "Warli Tribal Art & Forest Valley",
      specialties: ["Silvassa Administrative Hub", "Vanganga Lake Garden", "Warli Tribal Art"],
      specialSummary: "Warli Tribal Art & Forest Valley: Silvassa administrative hub, Vanganga lake garden, and industrial manufacturing haven."
    },
    {
      name: "Daman",
      hq: "Daman",
      division: "Daman",
      highlight: "Moti Daman and Nani Daman Portuguese forts, Devka beach, and administrative capital.",
      category: "Heritage & History",
      knownAs: "Maritime Port & Portuguese Forts",
      specialties: ["Moti Daman Fort", "Nani Daman Fort", "Devka Beach"],
      specialSummary: "Maritime Port & Portuguese Forts: Moti Daman and Nani Daman Portuguese forts, Devka beach, and administrative capital."
    },
    {
      name: "Diu",
      hq: "Diu",
      division: "Diu",
      highlight: "Historic island off Saurashtra coast, 1535 Diu Fort, St. Paul's Church, and Nagoa beach.",
      category: "Heritage & History",
      knownAs: "Island Fortress & Solar Powered UT",
      specialties: ["Diu Fort (1535)", "St. Paul's Church", "Nagoa Beach"],
      specialSummary: "Island Fortress & Solar Powered UT: Historic island off Saurashtra coast, 1535 Diu Fort, St. Paul's Church, and Nagoa beach."
    }
  ],
  deputyChiefMinisters: [],
  pastChiefMinisters: [],
  lastUpdated: "November 2024",
  dataSource: "Census of India 2011, Ministry of Home Affairs (MHA), Survey of India"
};

// Replace DNH & DD with mergedUT
data = data.filter(d => d.id !== 'dadra-and-nagar-haveli' && d.id !== 'daman-and-diu');
data.push(mergedUT);

// Standard official ranks mapping (Census 2011 population rank, Survey of India area rank)
const officialRanks = {
  "Uttar Pradesh": { pop: "1st by Population", area: "4th by Area" },
  "Maharashtra": { pop: "2nd by Population", area: "3rd by Area" },
  "Bihar": { pop: "3rd by Population", area: "12th by Area" },
  "West Bengal": { pop: "4th by Population", area: "13th by Area" },
  "Madhya Pradesh": { pop: "5th by Population", area: "2nd by Area" },
  "Tamil Nadu": { pop: "6th by Population", area: "10th by Area" },
  "Rajasthan": { pop: "7th by Population", area: "1st by Area" },
  "Karnataka": { pop: "8th by Population", area: "6th by Area" },
  "Gujarat": { pop: "9th by Population", area: "5th by Area" },
  "Andhra Pradesh": { pop: "10th by Population", area: "7th by Area" },
  "Odisha": { pop: "11th by Population", area: "8th by Area" },
  "Telangana": { pop: "12th by Population", area: "11th by Area" },
  "Kerala": { pop: "13th by Population", area: "21st by Area" },
  "Jharkhand": { pop: "14th by Population", area: "15th by Area" },
  "Assam": { pop: "15th by Population", area: "16th by Area" },
  "Punjab": { pop: "16th by Population", area: "19th by Area" },
  "Chhattisgarh": { pop: "17th by Population", area: "9th by Area" },
  "Haryana": { pop: "18th by Population", area: "20th by Area" },
  "Delhi": { pop: "19th by Population (1st among UTs)", area: "31st by Area" },
  "Jammu and Kashmir": { pop: "20th by Population (2nd among UTs)", area: "18th by Area" },
  "Uttarakhand": { pop: "21st by Population", area: "17th by Area" },
  "Himachal Pradesh": { pop: "22nd by Population", area: "14th by Area" },
  "Tripura": { pop: "23rd by Population", area: "26th by Area" },
  "Meghalaya": { pop: "24th by Population", area: "22nd by Area" },
  "Manipur": { pop: "25th by Population", area: "23rd by Area" },
  "Nagaland": { pop: "26th by Population", area: "25th by Area" },
  "Goa": { pop: "27th by Population", area: "28th by Area (Smallest State)" },
  "Arunachal Pradesh": { pop: "28th by Population", area: "14th by Area" },
  "Puducherry": { pop: "29th by Population", area: "34th by Area" },
  "Mizoram": { pop: "30th by Population", area: "24th by Area" },
  "Chandigarh": { pop: "31st by Population", area: "35th by Area" },
  "Sikkim": { pop: "32nd by Population (Least Populous State)", area: "27th by Area" },
  "Dadra and Nagar Haveli and Daman and Diu": { pop: "33rd by Population", area: "32nd by Area" },
  "Andaman and Nicobar Islands": { pop: "34th by Population", area: "29th by Area" },
  "Ladakh": { pop: "35th by Population", area: "15th by Area" },
  "Lakshadweep": { pop: "36th by Population (Smallest UT)", area: "36th by Area (Smallest Entity)" }
};

// Apply standard metadata, ranks, and sources across all entities
data.forEach(item => {
  const ranks = officialRanks[item.name];
  if (ranks) {
    if (!item.demographics) item.demographics = {};
    item.demographics.populationRank = ranks.pop;
    item.demographics.areaRank = ranks.area;
  } else {
    // Clean up existing if not in map
    if (item.demographics?.populationRank) {
      if (!item.demographics.populationRank.toLowerCase().includes('population')) {
        item.demographics.populationRank = item.demographics.populationRank + " by Population";
      }
    }
    if (item.demographics?.areaRank) {
      if (!item.demographics.areaRank.toLowerCase().includes('area')) {
        item.demographics.areaRank = item.demographics.areaRank + " by Area";
      }
    }
  }

  // Ensure demographics context is standardized
  item.demographics.censusYear = "Census 2011";
  item.demographics.areaSource = "Survey of India";

  // Add asOf dates
  if (item.chiefMinister) {
    item.chiefMinister.asOf = "November 2024";
  }
  if (item.rulingParty) {
    item.rulingParty.asOf = "November 2024";
  }
  if (item.governor) {
    item.governor.asOf = "November 2024";
  }

  // Top-level metadata
  item.lastUpdated = "November 2024";
  item.dataSource = "Election Commission of India (ECI), Census of India 2011, Ministry of Home Affairs (MHA), Survey of India";
});

// Sort: States first alphabetically, then UTs alphabetically
const statesOnly = data.filter(d => d.type === 'State').sort((a, b) => a.name.localeCompare(b.name));
const utsOnly = data.filter(d => d.type !== 'State').sort((a, b) => a.name.localeCompare(b.name));

const finalData = [...statesOnly, ...utsOnly];

console.log('States total:', statesOnly.length);
console.log('UTs total:', utsOnly.length);
console.log('Total entities:', finalData.length);

fs.writeFileSync(dataFilePath, JSON.stringify(finalData, null, 2), 'utf8');
console.log('Successfully saved standardized statesData.json!');
