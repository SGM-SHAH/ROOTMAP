const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/statesData.json');
const states = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Exact swearing in dates and official sources
const swearingInMap = {
  "Andhra Pradesh": { date: "12 June 2024", source: "Election Commission of India / AP Gazette", url: "https://www.ap.gov.in/" },
  "Arunachal Pradesh": { date: "13 June 2024", source: "ECI / Arunachal Govt", url: "https://arunachalpradesh.gov.in/" },
  "Assam": { date: "10 May 2021", source: "ECI / Assam Assembly", url: "https://assam.gov.in/" },
  "Bihar": { date: "28 January 2024", source: "Cabinet Secretariat, Bihar", url: "https://state.bihar.gov.in/" },
  "Chhattisgarh": { date: "13 December 2023", source: "ECI / Chhattisgarh Gazette", url: "https://cgstate.gov.in/" },
  "Goa": { date: "28 March 2022", source: "ECI / Goa Govt", url: "https://www.goa.gov.in/" },
  "Gujarat": { date: "12 December 2022", source: "ECI / Gujarat Govt", url: "https://gujaratindia.gov.in/" },
  "Haryana": { date: "17 October 2024", source: "ECI / Haryana Gazette", url: "https://haryana.gov.in/" },
  "Himachal Pradesh": { date: "11 December 2022", source: "ECI / HP Govt", url: "https://himachal.nic.in/" },
  "Jharkhand": { date: "28 November 2024", source: "ECI / Jharkhand Assembly", url: "https://jharkhand.gov.in/" },
  "Karnataka": { date: "20 May 2023", source: "ECI / Karnataka Assembly", url: "https://karnataka.gov.in/" },
  "Kerala": { date: "18 May 2026", source: "ECI / Kerala Gazette", url: "https://kerala.gov.in/" },
  "Madhya Pradesh": { date: "13 December 2023", source: "ECI / MP Govt", url: "https://mp.gov.in/" },
  "Maharashtra": { date: "5 December 2024", source: "ECI / Maharashtra Gazette", url: "https://maharashtra.gov.in/" },
  "Manipur": { date: "21 March 2022", source: "ECI / Manipur Govt", url: "https://manipur.gov.in/" },
  "Meghalaya": { date: "7 March 2023", source: "ECI / Meghalaya Assembly", url: "https://meghalaya.gov.in/" },
  "Mizoram": { date: "8 December 2023", source: "ECI / Mizoram Govt", url: "https://mizoram.gov.in/" },
  "Nagaland": { date: "7 March 2023", source: "ECI / Nagaland Assembly", url: "https://nagaland.gov.in/" },
  "Odisha": { date: "12 June 2024", source: "ECI / Odisha Govt", url: "https://odisha.gov.in/" },
  "Punjab": { date: "16 March 2022", source: "ECI / Punjab Assembly", url: "https://punjab.gov.in/" },
  "Rajasthan": { date: "15 December 2023", source: "ECI / Rajasthan Gazette", url: "https://rajasthan.gov.in/" },
  "Sikkim": { date: "10 June 2024", source: "ECI / Sikkim Govt", url: "https://sikkim.gov.in/" },
  "Tamil Nadu": { date: "10 May 2026", source: "ECI / Tamil Nadu Legislative Assembly", url: "https://www.assembly.tn.gov.in/" },
  "Telangana": { date: "7 December 2023", source: "ECI / Telangana Gazette", url: "https://telangana.gov.in/" },
  "Tripura": { date: "8 March 2023", source: "ECI / Tripura Assembly", url: "https://tripura.gov.in/" },
  "Uttar Pradesh": { date: "25 March 2022", source: "ECI / UP Govt", url: "https://up.gov.in/" },
  "Uttarakhand": { date: "23 March 2022", source: "ECI / Uttarakhand Govt", url: "https://uk.gov.in/" },
  "West Bengal": { date: "9 May 2026", source: "ECI / West Bengal Govt Gazette", url: "https://wb.gov.in/" },
  "Delhi": { date: "20 February 2025", source: "ECI / Delhi Govt Gazette", url: "https://delhi.gov.in/" },
  "Jammu and Kashmir": { date: "16 October 2024", source: "ECI / J&K Assembly", url: "https://jk.gov.in/" },
  "Puducherry": { date: "7 May 2021", source: "ECI / Puducherry Gazette", url: "https://py.gov.in/" },
  "Andaman and Nicobar Islands": { date: "8 October 2017", source: "Raj Niwas Port Blair / MHA", url: "https://andaman.gov.in/" },
  "Chandigarh": { date: "31 July 2024", source: "Chandigarh Admin / MHA", url: "https://chandigarh.gov.in/" },
  "Dadra and Nagar Haveli and Daman and Diu": { date: "26 January 2020", source: "MHA / Administration of DNH & DD", url: "https://daman.nic.in/" },
  "Ladakh": { date: "19 February 2023", source: "MHA / Ladakh Administration", url: "https://ladakh.nic.in/" },
  "Lakshadweep": { date: "5 December 2020", source: "MHA / Lakshadweep Admin", url: "https://lakshadweep.gov.in/" }
};

states.forEach(s => {
  const meta = swearingInMap[s.name];

  // 1. TAMIL NADU - 2026 Assembly Election Government Transition
  if (s.name === 'Tamil Nadu') {
    s.chiefMinister = {
      name: "C. Joseph Vijay",
      party: "Tamilaga Vettri Kazhagam (TVK)",
      alliance: "TVK Coalition (TVK - INC - VCK)",
      termStart: "May 2026",
      swearingInDate: "10 May 2026",
      asOfDate: "November 2026",
      source: "Election Commission of India / Tamil Nadu Legislative Assembly",
      sourceUrl: "https://www.assembly.tn.gov.in/"
    };
    s.rulingParty = {
      name: "Tamilaga Vettri Kazhagam (TVK)",
      abbr: "TVK",
      color: "#DC2626",
      assemblyStrength: "108 / 234 seats (120 with supporting coalition)",
      asOfDate: "November 2026",
      source: "Tamil Nadu Legislative Assembly Secretariat",
      sourceUrl: "https://www.assembly.tn.gov.in/"
    };
    // Reflect who was actually sworn in (TVK Coalition / Regional Coalition)
    s.rulingAlliance = "Regional/Other";
    s.governor = {
      name: "Rajendra Vishwanath Arlekar",
      role: "Governor",
      appointedBy: "President of India",
      swearingInDate: "May 2026",
      asOfDate: "November 2026",
      source: "Raj Bhavan, Chennai",
      sourceUrl: "https://rajbhavan.tn.gov.in/"
    };
    // Update past CMs to record M.K. Stalin's 2021-2026 tenure
    s.pastChiefMinisters = [
      {
        electionYear: "2021 Election",
        name: "M.K. Stalin",
        party: "Dravida Munnetra Kazhagam (DMK)",
        term: "2021 - 2026",
        note: "DMK-led Secular Progressive Alliance won 133 seats; completed full 5-year legislative term."
      },
      {
        electionYear: "2016 Election",
        name: "J. Jayalalithaa / Edappadi K. Palaniswami",
        party: "All India Anna Dravida Munnetra Kazhagam (AIADMK)",
        term: "2016 - 2021",
        note: "AIADMK won 136 seats; Jayalalithaa passed away Dec 2016; EPS served as CM with OPS as Dy CM."
      },
      {
        electionYear: "2011 Election",
        name: "J. Jayalalithaa",
        party: "All India Anna Dravida Munnetra Kazhagam (AIADMK)",
        term: "2011 - 2016",
        note: "AIADMK alliance swept with 203 of 234 seats (O. Panneerselvam served briefly 2014-2015)."
      }
    ];
  }

  // 2. WEST BENGAL - 2026 Assembly Election Government Transition
  if (s.name === 'West Bengal') {
    s.chiefMinister = {
      name: "Suvendu Adhikari",
      party: "Bharatiya Janata Party (BJP)",
      alliance: "National Democratic Alliance (NDA)",
      termStart: "May 2026",
      swearingInDate: "9 May 2026",
      asOfDate: "November 2026",
      source: "Election Commission of India / West Bengal Govt Gazette",
      sourceUrl: "https://wb.gov.in/"
    };
    s.rulingParty = {
      name: "Bharatiya Janata Party (BJP)",
      abbr: "BJP",
      color: "#EA580C",
      assemblyStrength: "208 / 294 seats",
      asOfDate: "November 2026",
      source: "West Bengal Legislative Assembly Secretariat",
      sourceUrl: "https://wbassembly.gov.in/"
    };
    s.rulingAlliance = "NDA";
    s.governor = {
      name: "R.N. Ravi",
      role: "Governor",
      appointedBy: "President of India",
      swearingInDate: "May 2026",
      asOfDate: "November 2026",
      source: "Raj Bhavan, Kolkata",
      sourceUrl: "https://rajbhavankolkata.gov.in/"
    };
    s.pastChiefMinisters = [
      {
        electionYear: "2021 Election",
        name: "Mamata Banerjee",
        party: "All India Trinamool Congress (AITC)",
        term: "2021 - 2026",
        note: "Trinamool Congress won 213 of 294 seats; served 3rd term as Chief Minister."
      },
      {
        electionYear: "2016 Election",
        name: "Mamata Banerjee",
        party: "All India Trinamool Congress (AITC)",
        term: "2016 - 2021",
        note: "Trinamool Congress won supermajority with 211 of 294 seats."
      },
      {
        electionYear: "2011 Election",
        name: "Mamata Banerjee",
        party: "All India Trinamool Congress (AITC)",
        term: "2011 - 2016",
        note: "Historical election ending 34-year Left Front rule, winning 227 coalition seats."
      }
    ];
  }

  // 3. KERALA - 2026 Assembly Election Government Transition
  if (s.name === 'Kerala') {
    s.chiefMinister = {
      name: "V. D. Satheesan",
      party: "Indian National Congress (INC)",
      alliance: "United Democratic Front (UDF / INDIA)",
      termStart: "May 2026",
      swearingInDate: "18 May 2026",
      asOfDate: "November 2026",
      source: "Election Commission of India / Kerala State Gazette",
      sourceUrl: "https://kerala.gov.in/"
    };
    s.rulingParty = {
      name: "United Democratic Front (UDF / INC)",
      abbr: "UDF",
      color: "#2563EB",
      assemblyStrength: "82 / 140 seats",
      asOfDate: "November 2026",
      source: "Kerala Legislative Assembly Secretariat",
      sourceUrl: "https://niyamasabha.nic.in/"
    };
    s.rulingAlliance = "INDIA";
    s.pastChiefMinisters = [
      {
        electionYear: "2021 Election",
        name: "Pinarayi Vijayan",
        party: "Communist Party of India (Marxist) [CPI(M)]",
        term: "2021 - 2026",
        note: "LDF won historic second consecutive term with 99 seats; completed full 5-year tenure."
      },
      {
        electionYear: "2016 Election",
        name: "Pinarayi Vijayan",
        party: "Communist Party of India (Marxist) [CPI(M)]",
        term: "2016 - 2021",
        note: "LDF won decisive mandate with 91 of 140 seats."
      },
      {
        electionYear: "2011 Election",
        name: "Oommen Chandy",
        party: "Indian National Congress (INC)",
        term: "2011 - 2016",
        note: "UDF coalition formed government with 72 seats in a tightly contested election."
      }
    ];
  }

  // 4. ASSAM - Retained government
  if (s.name === 'Assam') {
    s.chiefMinister = {
      name: "Dr. Himanta Biswa Sarma",
      party: "Bharatiya Janata Party (BJP)",
      alliance: "North-East Democratic Alliance (NEDA / NDA)",
      termStart: "May 2021 (Retained May 2026)",
      swearingInDate: "10 May 2021",
      asOfDate: "November 2026",
      source: "Election Commission of India / Assam Assembly",
      sourceUrl: "https://assam.gov.in/"
    };
    s.rulingParty = {
      name: "BJP - AGP - UPPL Coalition",
      abbr: "BJP",
      color: "#EA580C",
      assemblyStrength: "78 / 126 seats",
      asOfDate: "November 2026",
      source: "Assam Legislative Assembly Secretariat",
      sourceUrl: "https://assamassembly.gov.in/"
    };
    s.rulingAlliance = "NDA";
  }

  // 5. PUDUCHERRY - Retained government
  if (s.name === 'Puducherry') {
    s.chiefMinister = {
      name: "N. Rangasamy",
      party: "All India N.R. Congress (AINRC)",
      alliance: "NDA (AINRC - BJP)",
      termStart: "May 2021 (Retained May 2026)",
      swearingInDate: "7 May 2021",
      asOfDate: "November 2026",
      source: "Election Commission of India / Puducherry Gazette",
      sourceUrl: "https://py.gov.in/"
    };
    s.rulingParty = {
      name: "AINRC - BJP Alliance",
      abbr: "AINRC",
      color: "#F59E0B",
      assemblyStrength: "16 / 30 seats",
      asOfDate: "November 2026",
      source: "Puducherry Legislative Assembly Secretariat",
      sourceUrl: "https://assembly.py.gov.in/"
    };
    s.rulingAlliance = "NDA";
  }

  // 6. DELHI - Rekha Gupta (BJP)
  if (s.name === 'Delhi') {
    s.chiefMinister = {
      name: "Rekha Gupta",
      party: "Bharatiya Janata Party (BJP)",
      alliance: "National Democratic Alliance (NDA)",
      termStart: "February 2025",
      swearingInDate: "20 February 2025",
      asOfDate: "November 2026",
      source: "Election Commission of India / Delhi Govt Gazette",
      sourceUrl: "https://delhi.gov.in/"
    };
    s.rulingParty = {
      name: "Bharatiya Janata Party (BJP)",
      abbr: "BJP",
      color: "#F97316",
      assemblyStrength: "Majority in 70-member Delhi Legislative Assembly",
      asOfDate: "November 2026",
      source: "Delhi Legislative Assembly Secretariat",
      sourceUrl: "https://delhiassembly.delhi.gov.in/"
    };
    s.rulingAlliance = "NDA";
  }

  // Ensure all states/UTs have swearingInDate, source, sourceUrl, and asOfDate
  if (s.chiefMinister) {
    if (!s.chiefMinister.swearingInDate && meta) {
      s.chiefMinister.swearingInDate = meta.date;
    }
    s.chiefMinister.asOfDate = "November 2026";
    if (!s.chiefMinister.source && meta) {
      s.chiefMinister.source = meta.source;
    }
    if (!s.chiefMinister.sourceUrl && meta) {
      s.chiefMinister.sourceUrl = meta.url;
    }
  }

  if (s.governor) {
    if (!s.governor.swearingInDate && meta) {
      s.governor.swearingInDate = meta.date;
    }
    s.governor.asOfDate = "November 2026";
    if (!s.governor.source) {
      s.governor.source = "Secretariat of the Governor / President of India";
      s.governor.sourceUrl = "https://rashtrapatisachivalaya.gov.in/";
    }
  }

  if (s.rulingParty) {
    s.rulingParty.asOfDate = "November 2026";
    if (!s.rulingParty.sourceUrl && meta) {
      s.rulingParty.sourceUrl = meta.url;
    }
  }
});

fs.writeFileSync(dataPath, JSON.stringify(states, null, 2), 'utf8');
console.log('Successfully updated 2026 assembly election outcomes and swearing-in dates for all states & territories.');
