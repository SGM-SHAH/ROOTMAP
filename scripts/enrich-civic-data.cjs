const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/statesData.json');
let data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

// Civic details mapping
const civicData = {
  "Andhra Pradesh": {
    hindiName: "आंध्र प्रदेश",
    hindiCapital: "अमरावती",
    region: "Southern",
    alliance: "NDA",
    legislature: { type: "Bicameral", assemblySeats: 175, councilSeats: 58 },
    parliamentarySeats: { lokSabha: 25, rajyaSabha: 11 },
    highCourt: "High Court of Andhra Pradesh (Amaravati)"
  },
  "Arunachal Pradesh": {
    hindiName: "अरुणाचल प्रदेश",
    hindiCapital: "ईटानगर",
    region: "North-Eastern",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 60, councilSeats: null },
    parliamentarySeats: { lokSabha: 2, rajyaSabha: 1 },
    highCourt: "Gauhati High Court (Itanagar Bench)"
  },
  "Assam": {
    hindiName: "असम",
    hindiCapital: "दिसपुर",
    region: "North-Eastern",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 126, councilSeats: null },
    parliamentarySeats: { lokSabha: 14, rajyaSabha: 7 },
    highCourt: "Gauhati High Court (Principal Seat, Guwahati)"
  },
  "Bihar": {
    hindiName: "बिहार",
    hindiCapital: "पटना",
    region: "Eastern",
    alliance: "NDA",
    legislature: { type: "Bicameral", assemblySeats: 243, councilSeats: 75 },
    parliamentarySeats: { lokSabha: 40, rajyaSabha: 16 },
    highCourt: "Patna High Court"
  },
  "Chhattisgarh": {
    hindiName: "छत्तीसगढ़",
    hindiCapital: "रायपुर",
    region: "Central",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 90, councilSeats: null },
    parliamentarySeats: { lokSabha: 11, rajyaSabha: 5 },
    highCourt: "High Court of Chhattisgarh (Bilaspur)"
  },
  "Goa": {
    hindiName: "गोवा",
    hindiCapital: "पणजी",
    region: "Western",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 40, councilSeats: null },
    parliamentarySeats: { lokSabha: 2, rajyaSabha: 1 },
    highCourt: "Bombay High Court (Panaji Bench)"
  },
  "Gujarat": {
    hindiName: "गुजरात",
    hindiCapital: "गांधीनगर",
    region: "Western",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 182, councilSeats: null },
    parliamentarySeats: { lokSabha: 26, rajyaSabha: 11 },
    highCourt: "Gujarat High Court (Ahmedabad)"
  },
  "Haryana": {
    hindiName: "हरियाणा",
    hindiCapital: "चंडीगढ़",
    region: "Northern",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 90, councilSeats: null },
    parliamentarySeats: { lokSabha: 10, rajyaSabha: 5 },
    highCourt: "Punjab and Haryana High Court (Chandigarh)"
  },
  "Himachal Pradesh": {
    hindiName: "हिमाचल प्रदेश",
    hindiCapital: "शिमला",
    region: "Northern",
    alliance: "INDIA",
    legislature: { type: "Unicameral", assemblySeats: 68, councilSeats: null },
    parliamentarySeats: { lokSabha: 4, rajyaSabha: 3 },
    highCourt: "High Court of Himachal Pradesh (Shimla)"
  },
  "Jharkhand": {
    hindiName: "झारखंड",
    hindiCapital: "राँची",
    region: "Eastern",
    alliance: "INDIA",
    legislature: { type: "Unicameral", assemblySeats: 81, councilSeats: null },
    parliamentarySeats: { lokSabha: 14, rajyaSabha: 6 },
    highCourt: "High Court of Jharkhand (Ranchi)"
  },
  "Karnataka": {
    hindiName: "कर्नाटक",
    hindiCapital: "बेंगलुरु",
    region: "Southern",
    alliance: "INDIA",
    legislature: { type: "Bicameral", assemblySeats: 224, councilSeats: 75 },
    parliamentarySeats: { lokSabha: 28, rajyaSabha: 12 },
    highCourt: "High Court of Karnataka (Bengaluru)"
  },
  "Kerala": {
    hindiName: "केरल",
    hindiCapital: "तिरुवनंतपुरम",
    region: "Southern",
    alliance: "INDIA",
    legislature: { type: "Unicameral", assemblySeats: 140, councilSeats: null },
    parliamentarySeats: { lokSabha: 20, rajyaSabha: 9 },
    highCourt: "High Court of Kerala (Kochi)"
  },
  "Madhya Pradesh": {
    hindiName: "मध्य प्रदेश",
    hindiCapital: "भोपाल",
    region: "Central",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 230, councilSeats: null },
    parliamentarySeats: { lokSabha: 29, rajyaSabha: 11 },
    highCourt: "High Court of Madhya Pradesh (Jabalpur)"
  },
  "Maharashtra": {
    hindiName: "महाराष्ट्र",
    hindiCapital: "मुंबई",
    region: "Western",
    alliance: "NDA",
    legislature: { type: "Bicameral", assemblySeats: 288, councilSeats: 78 },
    parliamentarySeats: { lokSabha: 48, rajyaSabha: 19 },
    highCourt: "Bombay High Court (Mumbai)"
  },
  "Manipur": {
    hindiName: "मणिपुर",
    hindiCapital: "इम्फाल",
    region: "North-Eastern",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 60, councilSeats: null },
    parliamentarySeats: { lokSabha: 2, rajyaSabha: 1 },
    highCourt: "High Court of Manipur (Imphal)"
  },
  "Meghalaya": {
    hindiName: "मेघालय",
    hindiCapital: "शिलांग",
    region: "North-Eastern",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 60, councilSeats: null },
    parliamentarySeats: { lokSabha: 2, rajyaSabha: 1 },
    highCourt: "High Court of Meghalaya (Shillong)"
  },
  "Mizoram": {
    hindiName: "मिज़ोरम",
    hindiCapital: "आइज़ोल",
    region: "North-Eastern",
    alliance: "Others",
    legislature: { type: "Unicameral", assemblySeats: 40, councilSeats: null },
    parliamentarySeats: { lokSabha: 1, rajyaSabha: 1 },
    highCourt: "Gauhati High Court (Aizawl Bench)"
  },
  "Nagaland": {
    hindiName: "नागालैंड",
    hindiCapital: "कोहिमा",
    region: "North-Eastern",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 60, councilSeats: null },
    parliamentarySeats: { lokSabha: 1, rajyaSabha: 1 },
    highCourt: "Gauhati High Court (Kohima Bench)"
  },
  "Odisha": {
    hindiName: "ओडिशा",
    hindiCapital: "भुवनेश्वर",
    region: "Eastern",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 147, councilSeats: null },
    parliamentarySeats: { lokSabha: 21, rajyaSabha: 10 },
    highCourt: "Orissa High Court (Cuttack)"
  },
  "Punjab": {
    hindiName: "पंजाब",
    hindiCapital: "चंडीगढ़",
    region: "Northern",
    alliance: "INDIA",
    legislature: { type: "Unicameral", assemblySeats: 117, councilSeats: null },
    parliamentarySeats: { lokSabha: 13, rajyaSabha: 7 },
    highCourt: "Punjab and Haryana High Court (Chandigarh)"
  },
  "Rajasthan": {
    hindiName: "राजस्थान",
    hindiCapital: "जयपुर",
    region: "Northern",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 200, councilSeats: null },
    parliamentarySeats: { lokSabha: 25, rajyaSabha: 10 },
    highCourt: "Rajasthan High Court (Jodhpur)"
  },
  "Sikkim": {
    hindiName: "सिक्किम",
    hindiCapital: "गंगटोक",
    region: "North-Eastern",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 32, councilSeats: null },
    parliamentarySeats: { lokSabha: 1, rajyaSabha: 1 },
    highCourt: "High Court of Sikkim (Gangtok)"
  },
  "Tamil Nadu": {
    hindiName: "तमिलनाडु",
    hindiCapital: "चेन्नई",
    region: "Southern",
    alliance: "INDIA",
    legislature: { type: "Unicameral", assemblySeats: 234, councilSeats: null },
    parliamentarySeats: { lokSabha: 39, rajyaSabha: 18 },
    highCourt: "Madras High Court (Chennai)"
  },
  "Telangana": {
    hindiName: "तेलंगाना",
    hindiCapital: "हैदराबाद",
    region: "Southern",
    alliance: "INDIA",
    legislature: { type: "Bicameral", assemblySeats: 119, councilSeats: 40 },
    parliamentarySeats: { lokSabha: 17, rajyaSabha: 7 },
    highCourt: "High Court for the State of Telangana (Hyderabad)"
  },
  "Tripura": {
    hindiName: "त्रिपुरा",
    hindiCapital: "अगरतला",
    region: "North-Eastern",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 60, councilSeats: null },
    parliamentarySeats: { lokSabha: 2, rajyaSabha: 1 },
    highCourt: "High Court of Tripura (Agartala)"
  },
  "Uttar Pradesh": {
    hindiName: "उत्तर प्रदेश",
    hindiCapital: "लखनऊ",
    region: "Northern",
    alliance: "NDA",
    legislature: { type: "Bicameral", assemblySeats: 403, councilSeats: 100 },
    parliamentarySeats: { lokSabha: 80, rajyaSabha: 31 },
    highCourt: "Allahabad High Court (Prayagraj)"
  },
  "Uttarakhand": {
    hindiName: "उत्तराखंड",
    hindiCapital: "देहरादून (शीतकालीन) / गैरसैंण (ग्रीष्मकालीन)",
    region: "Northern",
    alliance: "NDA",
    legislature: { type: "Unicameral", assemblySeats: 70, councilSeats: null },
    parliamentarySeats: { lokSabha: 5, rajyaSabha: 3 },
    highCourt: "High Court of Uttarakhand (Nainital)"
  },
  "West Bengal": {
    hindiName: "पश्चिम बंगाल",
    hindiCapital: "कोलकाता",
    region: "Eastern",
    alliance: "INDIA",
    legislature: { type: "Unicameral", assemblySeats: 294, councilSeats: null },
    parliamentarySeats: { lokSabha: 42, rajyaSabha: 16 },
    highCourt: "Calcutta High Court (Kolkata)"
  },

  // 8 Union Territories
  "Andaman and Nicobar Islands": {
    hindiName: "अंडमान और निकोबार द्वीप समूह",
    hindiCapital: "पोर्ट ब्लेयर (श्री विजय पुरम)",
    region: "Southern",
    alliance: "Central Administration",
    legislature: { type: "None (Direct Central Administration)", assemblySeats: 0, councilSeats: null },
    parliamentarySeats: { lokSabha: 1, rajyaSabha: 0 },
    highCourt: "Calcutta High Court (Circuit Bench at Port Blair)"
  },
  "Chandigarh": {
    hindiName: "चंडीगढ़",
    hindiCapital: "चंडीगढ़",
    region: "Northern",
    alliance: "Central Administration",
    legislature: { type: "None (Direct Central Administration)", assemblySeats: 0, councilSeats: null },
    parliamentarySeats: { lokSabha: 1, rajyaSabha: 0 },
    highCourt: "Punjab and Haryana High Court (Chandigarh)"
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    hindiName: "दादरा और नगर हवेली एवं दमन और दीव",
    hindiCapital: "दमन",
    region: "Western",
    alliance: "Central Administration",
    legislature: { type: "None (Direct Central Administration)", assemblySeats: 0, councilSeats: null },
    parliamentarySeats: { lokSabha: 2, rajyaSabha: 0 },
    highCourt: "Bombay High Court (Mumbai)"
  },
  "Delhi": {
    hindiName: "दिल्ली",
    hindiCapital: "नई दिल्ली",
    region: "Northern",
    alliance: "INDIA",
    legislature: { type: "Unicameral (UT with Legislature)", assemblySeats: 70, councilSeats: null },
    parliamentarySeats: { lokSabha: 7, rajyaSabha: 3 },
    highCourt: "Delhi High Court (New Delhi)"
  },
  "Jammu and Kashmir": {
    hindiName: "जम्मू और कश्मीर",
    hindiCapital: "श्रीनगर (ग्रीष्मकालीन) / जम्मू (शीतकालीन)",
    region: "Northern",
    alliance: "INDIA",
    legislature: { type: "Unicameral (UT with Legislature)", assemblySeats: 90, councilSeats: null },
    parliamentarySeats: { lokSabha: 5, rajyaSabha: 4 },
    highCourt: "High Court of Jammu & Kashmir and Ladakh (Srinagar/Jammu)"
  },
  "Ladakh": {
    hindiName: "लद्दाख",
    hindiCapital: "लेह / करगिल",
    region: "Northern",
    alliance: "Central Administration",
    legislature: { type: "None (Direct Central Administration)", assemblySeats: 0, councilSeats: null },
    parliamentarySeats: { lokSabha: 1, rajyaSabha: 0 },
    highCourt: "High Court of Jammu & Kashmir and Ladakh"
  },
  "Lakshadweep": {
    hindiName: "लक्षद्वीप",
    hindiCapital: "कवरत्ती",
    region: "Southern",
    alliance: "Central Administration",
    legislature: { type: "None (Direct Central Administration)", assemblySeats: 0, councilSeats: null },
    parliamentarySeats: { lokSabha: 1, rajyaSabha: 0 },
    highCourt: "High Court of Kerala (Kochi)"
  },
  "Puducherry": {
    hindiName: "पुदुचेरी",
    hindiCapital: "पुदुचेरी",
    region: "Southern",
    alliance: "NDA",
    legislature: { type: "Unicameral (UT with Legislature)", assemblySeats: 30, councilSeats: null },
    parliamentarySeats: { lokSabha: 1, rajyaSabha: 1 },
    highCourt: "Madras High Court (Chennai)"
  }
};

let enrichedCount = 0;
let totalLokSabha = 0;
let totalRajyaSabha = 0;

data.forEach(item => {
  const civic = civicData[item.name];
  if (civic) {
    enrichedCount++;
    item.hindi = {
      name: civic.hindiName,
      capital: civic.hindiCapital
    };
    item.region = civic.region;
    item.rulingAlliance = civic.alliance;
    item.legislature = civic.legislature;
    item.parliamentarySeats = civic.parliamentarySeats;
    item.highCourt = civic.highCourt;

    totalLokSabha += civic.parliamentarySeats.lokSabha;
    totalRajyaSabha += civic.parliamentarySeats.rajyaSabha;
  }
});

console.log(`Enriched ${enrichedCount} entities with civic, parliamentary, and Hindi data.`);
console.log(`Total Lok Sabha seats summed: ${totalLokSabha} (Official: 543)`);
console.log(`Total Rajya Sabha elected seats summed: ${totalRajyaSabha} (Official elected: 233 + 12 nominated = 245)`);

fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Saved enriched statesData.json successfully!');
