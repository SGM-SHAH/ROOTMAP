const fs = require('fs');
const path = require('path');

const statesDataPath = path.join(__dirname, '../src/data/statesData.json');
const statesData = JSON.parse(fs.readFileSync(statesDataPath, 'utf8'));

const cabinetHistory = {
  "Andhra Pradesh": {
    deputyChiefMinisters: [
      { name: "Pawan Kalyan", party: "JanaSena Party (JSP)", portfolio: "Panchayati Raj, Rural Development, Environment, Forest and Science & Technology" }
    ],
    pastChiefMinisters: [
      { electionYear: "2019 Election", name: "Y.S. Jagan Mohan Reddy", party: "YSR Congress Party (YSRCP)", term: "2019 - 2024", note: "Won absolute majority of 151 out of 175 seats; governed from Amaravati." },
      { electionYear: "2014 Election", name: "N. Chandrababu Naidu", party: "Telugu Desam Party (TDP)", term: "2014 - 2019", note: "First CM of bifurcated Andhra Pradesh; TDP-BJP NDA coalition." },
      { electionYear: "2009 Election", name: "N. Kiran Kumar Reddy", party: "Indian National Congress (INC)", term: "2010 - 2014", note: "Last Chief Minister of undivided Andhra Pradesh prior to bifurcation (preceded by K. Rosaiah & Y.S. Rajasekhara Reddy)." }
    ]
  },
  "Arunachal Pradesh": {
    deputyChiefMinisters: [
      { name: "Chowna Mein", party: "Bharatiya Janata Party (BJP)", portfolio: "Finance, Power and Non-Conventional Energy" }
    ],
    pastChiefMinisters: [
      { electionYear: "2019 Election", name: "Pema Khandu", party: "Bharatiya Janata Party (BJP)", term: "2019 - 2024", note: "BJP secured clear majority of 41 of 60 seats." },
      { electionYear: "2014 Election", name: "Nabam Tuki / Pema Khandu", party: "INC / PPA / BJP", term: "2014 - 2019", note: "Congress won initially; Khandu transitioned party to PPA then BJP in 2016." },
      { electionYear: "2009 Election", name: "Dorjee Khandu / Jarbom Gamlin", party: "Indian National Congress (INC)", term: "2009 - 2014", note: "Congress won 42 seats; Dorjee Khandu served until tragic demise in 2011, succeeded by Jarbom Gamlin and Nabam Tuki." }
    ]
  },
  "Assam": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2016 Election", name: "Sarbananda Sonowal", party: "Bharatiya Janata Party (BJP)", term: "2016 - 2021", note: "Historic first BJP-led government in Northeast India, winning 86 coalition seats." },
      { electionYear: "2011 Election", name: "Tarun Gogoi", party: "Indian National Congress (INC)", term: "2011 - 2016", note: "Third consecutive term for Congress, securing 78 out of 126 seats." },
      { electionYear: "2006 Election", name: "Tarun Gogoi", party: "Indian National Congress (INC)", term: "2006 - 2011", note: "Congress-BPF coalition government with 53 Congress seats." }
    ]
  },
  "Bihar": {
    deputyChiefMinisters: [
      { name: "Samrat Choudhary", party: "Bharatiya Janata Party (BJP)", portfolio: "Finance and Commercial Taxes" },
      { name: "Vijay Kumar Sinha", party: "Bharatiya Janata Party (BJP)", portfolio: "Road Construction and Agriculture" }
    ],
    pastChiefMinisters: [
      { electionYear: "2020 Election", name: "Nitish Kumar", party: "Janata Dal (United) - JD(U)", term: "2020 - Present", note: "NDA victory; later briefly allied with Mahagathbandhan (2022-2024) before returning to NDA." },
      { electionYear: "2015 Election", name: "Nitish Kumar", party: "Janata Dal (United) - JD(U)", term: "2015 - 2020", note: "Grand Alliance (JD(U)-RJD-INC) won 178 seats; realigned with NDA in July 2017." },
      { electionYear: "2010 Election", name: "Nitish Kumar", party: "Janata Dal (United) - JD(U)", term: "2010 - 2015", note: "Landslide NDA victory with 206 of 243 seats (Jitan Ram Manjhi served as CM briefly 2014-2015)." }
    ]
  },
  "Chhattisgarh": {
    deputyChiefMinisters: [
      { name: "Arun Sao", party: "Bharatiya Janata Party (BJP)", portfolio: "Public Works Department (PWD), Public Health Engineering, and Law" },
      { name: "Vijay Sharma", party: "Bharatiya Janata Party (BJP)", portfolio: "Home, Jail, Panchayat & Rural Development, and Technical Education" }
    ],
    pastChiefMinisters: [
      { electionYear: "2018 Election", name: "Bhupesh Baghel", party: "Indian National Congress (INC)", term: "2018 - 2023", note: "Congress won landslide with 68 out of 90 assembly seats." },
      { electionYear: "2013 Election", name: "Dr. Raman Singh", party: "Bharatiya Janata Party (BJP)", term: "2013 - 2018", note: "Third consecutive term for BJP with 49 seats." },
      { electionYear: "2008 Election", name: "Dr. Raman Singh", party: "Bharatiya Janata Party (BJP)", term: "2008 - 2013", note: "BJP retained power with 50 seats; focused on PDS food security reforms." }
    ]
  },
  "Goa": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2017 Election", name: "Manohar Parrikar / Dr. Pramod Sawant", party: "Bharatiya Janata Party (BJP)", term: "2017 - 2022", note: "BJP formed coalition; Manohar Parrikar served until 2019, followed by Dr. Pramod Sawant." },
      { electionYear: "2012 Election", name: "Manohar Parrikar / Laxmikant Parsekar", party: "Bharatiya Janata Party (BJP)", term: "2012 - 2017", note: "BJP won 21 of 40 seats; Parrikar moved to Union Defense Ministry in 2014, succeeded by Parsekar." },
      { electionYear: "2007 Election", name: "Digambar Kamat", party: "Indian National Congress (INC)", term: "2007 - 2012", note: "Congress-NCP coalition completed a full 5-year tenure in Goa." }
    ]
  },
  "Gujarat": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2017 Election", name: "Vijay Rupani / Bhupendra Patel", party: "Bharatiya Janata Party (BJP)", term: "2017 - 2022", note: "BJP won 99 seats; Vijay Rupani served until Sept 2021, succeeded by Bhupendra Patel." },
      { electionYear: "2012 Election", name: "Narendra Modi / Anandiben Patel", party: "Bharatiya Janata Party (BJP)", term: "2012 - 2017", note: "Narendra Modi served until becoming Prime Minister in May 2014; succeeded by Anandiben Patel and Vijay Rupani." },
      { electionYear: "2007 Election", name: "Narendra Modi", party: "Bharatiya Janata Party (BJP)", term: "2007 - 2012", note: "BJP won decisive mandate with 117 of 182 seats on development agenda." }
    ]
  },
  "Haryana": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2019 Election", name: "Manohar Lal Khattar / Nayab Singh Saini", party: "Bharatiya Janata Party (BJP)", term: "2019 - 2024", note: "BJP-JJP coalition (Dushyant Chautala as Dy CM); Nayab Saini sworn in March 2024." },
      { electionYear: "2014 Election", name: "Manohar Lal Khattar", party: "Bharatiya Janata Party (BJP)", term: "2014 - 2019", note: "First full BJP majority government in Haryana with 47 of 90 seats." },
      { electionYear: "2009 Election", name: "Bhupinder Singh Hooda", party: "Indian National Congress (INC)", term: "2009 - 2014", note: "Congress won 40 seats, formed coalition with HJC and independents." }
    ]
  },
  "Himachal Pradesh": {
    deputyChiefMinisters: [
      { name: "Mukesh Agnihotri", party: "Indian National Congress (INC)", portfolio: "Jal Shakti, Transport, and Language & Culture" }
    ],
    pastChiefMinisters: [
      { electionYear: "2017 Election", name: "Jai Ram Thakur", party: "Bharatiya Janata Party (BJP)", term: "2017 - 2022", note: "BJP secured comfortable majority with 44 out of 68 seats." },
      { electionYear: "2012 Election", name: "Virbhadra Singh", party: "Indian National Congress (INC)", term: "2012 - 2017", note: "Congress returned with 36 seats; Virbhadra Singh's 6th term as CM." },
      { electionYear: "2007 Election", name: "Prem Kumar Dhumal", party: "Bharatiya Janata Party (BJP)", term: "2007 - 2012", note: "BJP formed government with 41 seats." }
    ]
  },
  "Jharkhand": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2019 Election", name: "Hemant Soren / Champai Soren", party: "Jharkhand Mukti Morcha (JMM)", term: "2019 - 2024", note: "JMM-Congress-RJD alliance won 47 of 81 seats; Champai Soren served briefly Feb-July 2024." },
      { electionYear: "2014 Election", name: "Raghubar Das", party: "Bharatiya Janata Party (BJP)", term: "2014 - 2019", note: "First Chief Minister in Jharkhand history to complete a full 5-year term." },
      { electionYear: "2009 Election", name: "Arjun Munda / Hemant Soren", party: "BJP / JMM", term: "2009 - 2014", note: "Coalition tenures by Shibu Soren, Arjun Munda (2010-2013), and Hemant Soren (2013-2014)." }
    ]
  },
  "Karnataka": {
    deputyChiefMinisters: [
      { name: "D.K. Shivakumar", party: "Indian National Congress (INC)", portfolio: "Major & Medium Irrigation and Bengaluru City Development" }
    ],
    pastChiefMinisters: [
      { electionYear: "2018 Election", name: "B.S. Yediyurappa / H.D. Kumaraswamy / Basavaraj Bommai", party: "JD(S)-INC / BJP", term: "2018 - 2023", note: "Kumaraswamy led coalition 2018-2019; Yediyurappa formed BJP govt 2019-2021, succeeded by Bommai." },
      { electionYear: "2013 Election", name: "Siddaramaiah", party: "Indian National Congress (INC)", term: "2013 - 2018", note: "Congress won clear majority with 122 of 224 seats; completed full 5-year tenure." },
      { electionYear: "2008 Election", name: "B.S. Yediyurappa / D.V. Sadananda Gowda / Jagadish Shettar", party: "Bharatiya Janata Party (BJP)", term: "2008 - 2013", note: "First BJP government in South India with 110 seats." }
    ]
  },
  "Kerala": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2016 Election", name: "Pinarayi Vijayan", party: "Communist Party of India (Marxist) - CPI(M)", term: "2016 - 2021", note: "LDF won decisive mandate with 91 of 140 seats." },
      { electionYear: "2011 Election", name: "Oommen Chandy", party: "Indian National Congress (INC)", term: "2011 - 2016", note: "UDF coalition formed government with 72 seats in a tightly contested election." },
      { electionYear: "2006 Election", name: "V.S. Achuthanandan", party: "Communist Party of India (Marxist) - CPI(M)", term: "2006 - 2011", note: "LDF government under veteran Marxist leader with 98 seats." }
    ]
  },
  "Madhya Pradesh": {
    deputyChiefMinisters: [
      { name: "Rajendra Shukla", party: "Bharatiya Janata Party (BJP)", portfolio: "Public Health, Medical Education, and Commercial Taxes" },
      { name: "Jagdish Devda", party: "Bharatiya Janata Party (BJP)", portfolio: "Finance, Commercial Tax, and Planning" }
    ],
    pastChiefMinisters: [
      { electionYear: "2018 Election", name: "Kamal Nath / Shivraj Singh Chouhan", party: "INC / BJP", term: "2018 - 2023", note: "Kamal Nath led Congress govt 2018-2020; Shivraj Singh Chouhan returned to power March 2020." },
      { electionYear: "2013 Election", name: "Shivraj Singh Chouhan", party: "Bharatiya Janata Party (BJP)", term: "2013 - 2018", note: "BJP won supermajority with 165 of 230 seats." },
      { electionYear: "2008 Election", name: "Shivraj Singh Chouhan", party: "Bharatiya Janata Party (BJP)", term: "2008 - 2013", note: "BJP retained power with 143 seats on agricultural growth agenda." }
    ]
  },
  "Maharashtra": {
    deputyChiefMinisters: [
      { name: "Eknath Shinde", party: "Shiv Sena", portfolio: "Urban Development, Housing and Public Works" },
      { name: "Ajit Pawar", party: "Nationalist Congress Party (NCP)", portfolio: "Finance and Planning" }
    ],
    pastChiefMinisters: [
      { electionYear: "2019 Election", name: "Uddhav Thackeray / Eknath Shinde", party: "MVA / Mahayuti", term: "2019 - 2024", note: "MVA (Sena-NCP-Cong) ruled 2019-2022; Eknath Shinde-led Mahayuti formed government in June 2022." },
      { electionYear: "2014 Election", name: "Devendra Fadnavis", party: "Bharatiya Janata Party (BJP)", term: "2014 - 2019", note: "BJP-Shiv Sena coalition; Fadnavis was first BJP CM of Maharashtra to complete full 5-year term." },
      { electionYear: "2009 Election", name: "Ashok Chavan / Prithviraj Chavan", party: "Indian National Congress (INC)", term: "2009 - 2014", note: "Congress-NCP alliance won 144 seats; Prithviraj Chavan took office Nov 2010." }
    ]
  },
  "Manipur": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2017 Election", name: "N. Biren Singh", party: "Bharatiya Janata Party (BJP)", term: "2017 - 2022", note: "First BJP-led government in Manipur (Y. Joykumar Singh as Dy CM)." },
      { electionYear: "2012 Election", name: "Okram Ibobi Singh", party: "Indian National Congress (INC)", term: "2012 - 2017", note: "Congress won clear majority with 42 of 60 seats." },
      { electionYear: "2007 Election", name: "Okram Ibobi Singh", party: "Indian National Congress (INC)", term: "2007 - 2012", note: "Ibobi Singh completed full term as head of Congress-CPI Secular Progressive Front." }
    ]
  },
  "Meghalaya": {
    deputyChiefMinisters: [
      { name: "Prestone Tynsong", party: "National People's Party (NPP)", portfolio: "Public Works Department (PWD), Parliamentary Affairs, and District Council Affairs" },
      { name: "Sniawbhalang Dhar", party: "National People's Party (NPP)", portfolio: "Commerce & Industries, Transport, and Urban Affairs" }
    ],
    pastChiefMinisters: [
      { electionYear: "2018 Election", name: "Conrad Sangma", party: "National People's Party (NPP)", term: "2018 - 2023", note: "Meghalaya Democratic Alliance (MDA) formed government with NPP, UDP, and BJP." },
      { electionYear: "2013 Election", name: "Dr. Mukul Sangma", party: "Indian National Congress (INC)", term: "2013 - 2018", note: "Congress won 29 seats and formed stable coalition." },
      { electionYear: "2008 Election", name: "D.D. Lapang / Donkupar Roy / Dr. Mukul Sangma", party: "INC / MPA", term: "2008 - 2013", note: "Coalition period; Dr. Mukul Sangma took charge in April 2010." }
    ]
  },
  "Mizoram": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2018 Election", name: "Zoramthanga", party: "Mizo National Front (MNF)", term: "2018 - 2023", note: "MNF won landslide with 26 of 40 seats." },
      { electionYear: "2013 Election", name: "Lal Thanhawla", party: "Indian National Congress (INC)", term: "2013 - 2018", note: "Congress won decisive majority with 34 seats." },
      { electionYear: "2008 Election", name: "Lal Thanhawla", party: "Indian National Congress (INC)", term: "2008 - 2013", note: "Congress returned to power winning 32 seats." }
    ]
  },
  "Nagaland": {
    deputyChiefMinisters: [
      { name: "T.R. Zeliang", party: "Nationalist Democratic Progressive Party (NDPP)", portfolio: "Planning & Transformation and National Highways" },
      { name: "Yanthungo Patton", party: "Bharatiya Janata Party (BJP)", portfolio: "Home and Border Affairs" }
    ],
    pastChiefMinisters: [
      { electionYear: "2018 Election", name: "Neiphiu Rio", party: "NDPP - BJP Alliance", term: "2018 - 2023", note: "People's Democratic Alliance (NDPP-BJP) formed government." },
      { electionYear: "2013 Election", name: "Neiphiu Rio / T.R. Zeliang", party: "Naga People's Front (NPF)", term: "2013 - 2018", note: "Rio served until Lok Sabha election 2014; T.R. Zeliang and Shurhozelie Liezietsu held office." },
      { electionYear: "2008 Election", name: "Neiphiu Rio", party: "Naga People's Front (NPF)", term: "2008 - 2013", note: "Democratic Alliance of Nagaland (DAN) coalition formed government." }
    ]
  },
  "Odisha": {
    deputyChiefMinisters: [
      { name: "Kanak Vardhan Singh Deo", party: "Bharatiya Janata Party (BJP)", portfolio: "Agriculture & Farmers' Empowerment, and Energy" },
      { name: "Pravati Parida", party: "Bharatiya Janata Party (BJP)", portfolio: "Women & Child Development, Mission Shakti, and Tourism" }
    ],
    pastChiefMinisters: [
      { electionYear: "2019 Election", name: "Naveen Patnaik", party: "Biju Janata Dal (BJD)", term: "2019 - 2024", note: "Fifth consecutive victory for Naveen Patnaik, winning 112 of 147 seats." },
      { electionYear: "2014 Election", name: "Naveen Patnaik", party: "Biju Janata Dal (BJD)", term: "2014 - 2019", note: "BJD secured massive mandate of 117 seats." },
      { electionYear: "2009 Election", name: "Naveen Patnaik", party: "Biju Janata Dal (BJD)", term: "2009 - 2014", note: "BJD parted ways with NDA, won 103 seats independently." }
    ]
  },
  "Punjab": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2017 Election", name: "Capt. Amarinder Singh / Charanjit Singh Channi", party: "Indian National Congress (INC)", term: "2017 - 2022", note: "Congress won 77 of 117 seats; Amarinder Singh served until Sept 2021, succeeded by Channi." },
      { electionYear: "2012 Election", name: "Parkash Singh Badal", party: "Shiromani Akali Dal (SAD) - BJP", term: "2012 - 2017", note: "SAD-BJP broke historical trend to win consecutive terms (Sukhbir Singh Badal was Dy CM)." },
      { electionYear: "2007 Election", name: "Parkash Singh Badal", party: "Shiromani Akali Dal (SAD) - BJP", term: "2007 - 2012", note: "SAD-BJP alliance returned with 68 seats." }
    ]
  },
  "Rajasthan": {
    deputyChiefMinisters: [
      { name: "Diya Kumari", party: "Bharatiya Janata Party (BJP)", portfolio: "Finance, Tourism, Art & Culture, and Public Works" },
      { name: "Prem Chand Bairwa", party: "Bharatiya Janata Party (BJP)", portfolio: "Technical Education, Higher Education, and Transport" }
    ],
    pastChiefMinisters: [
      { electionYear: "2018 Election", name: "Ashok Gehlot", party: "Indian National Congress (INC)", term: "2018 - 2023", note: "Congress won 100 seats (Sachin Pilot served as Dy CM 2018-2020)." },
      { electionYear: "2013 Election", name: "Vasundhara Raje", party: "Bharatiya Janata Party (BJP)", term: "2013 - 2018", note: "Landslide record mandate of 163 out of 200 assembly seats for BJP." },
      { electionYear: "2008 Election", name: "Ashok Gehlot", party: "Indian National Congress (INC)", term: "2008 - 2013", note: "Congress won 96 seats, formed government with BSP and independent legislators." }
    ]
  },
  "Sikkim": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2019 Election", name: "Prem Singh Tamang (Golay)", party: "Sikkim Krantikari Morcha (SKM)", term: "2019 - 2024", note: "SKM ended 25-year rule of SDF by winning 17 of 32 assembly seats." },
      { electionYear: "2014 Election", name: "Pawan Kumar Chamling", party: "Sikkim Democratic Front (SDF)", term: "2014 - 2019", note: "SDF won 22 seats; Chamling became India's longest-serving Chief Minister." },
      { electionYear: "2009 Election", name: "Pawan Kumar Chamling", party: "Sikkim Democratic Front (SDF)", term: "2009 - 2014", note: "Historic clean sweep winning all 32 of 32 assembly seats." }
    ]
  },
  "Tamil Nadu": {
    deputyChiefMinisters: [
      { name: "Udhayanidhi Stalin", party: "Dravida Munnetra Kazhagam (DMK)", portfolio: "Youth Welfare, Sports Development, and Special Programme Implementation" }
    ],
    pastChiefMinisters: [
      { electionYear: "2016 Election", name: "J. Jayalalithaa / Edappadi K. Palaniswami", party: "All India Anna Dravida Munnetra Kazhagam (AIADMK)", term: "2016 - 2021", note: "AIADMK won 136 seats; Jayalalithaa passed away Dec 2016; EPS served as CM with OPS as Dy CM." },
      { electionYear: "2011 Election", name: "J. Jayalalithaa", party: "All India Anna Dravida Munnetra Kazhagam (AIADMK)", term: "2011 - 2016", note: "AIADMK alliance swept with 203 of 234 seats (O. Panneerselvam served briefly 2014-2015)." },
      { electionYear: "2006 Election", name: "M. Karunanidhi", party: "Dravida Munnetra Kazhagam (DMK)", term: "2006 - 2011", note: "Democratic Progressive Alliance formed government (M.K. Stalin was appointed Dy CM in 2009)." }
    ]
  },
  "Telangana": {
    deputyChiefMinisters: [
      { name: "Bhatti Vikramarka Mallu", party: "Indian National Congress (INC)", portfolio: "Finance, Planning, and Energy" }
    ],
    pastChiefMinisters: [
      { electionYear: "2018 Election", name: "K. Chandrashekar Rao", party: "Bharat Rashtra Samithi (BRS)", term: "2018 - 2023", note: "BRS (then TRS) won landslide second term with 88 of 119 seats." },
      { electionYear: "2014 Election", name: "K. Chandrashekar Rao", party: "Bharat Rashtra Samithi (BRS)", term: "2014 - 2018", note: "Inaugural CM of Telangana post-bifurcation, winning 63 seats (Dy CMs: Mahmood Ali & Kadiyam Srihari)." },
      { electionYear: "2009 Election (United AP)", name: "N. Kiran Kumar Reddy / K. Rosaiah / YSR", party: "Indian National Congress (INC)", term: "2009 - 2014", note: "Pre-bifurcation administration of united Andhra Pradesh leading up to the AP Reorganisation Act 2014." }
    ]
  },
  "Tripura": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2018 Election", name: "Biplab Kumar Deb / Dr. Manik Saha", party: "Bharatiya Janata Party (BJP)", term: "2018 - 2023", note: "BJP-IPFT alliance ended 25 years of Left rule with 44 seats; Deb succeeded by Saha in May 2022." },
      { electionYear: "2013 Election", name: "Manik Sarkar", party: "Communist Party of India (Marxist) - CPI(M)", term: "2013 - 2018", note: "Left Front won landslide with 50 of 60 seats." },
      { electionYear: "2008 Election", name: "Manik Sarkar", party: "Communist Party of India (Marxist) - CPI(M)", term: "2008 - 2013", note: "Left Front returned to power with 49 seats." }
    ]
  },
  "Uttar Pradesh": {
    deputyChiefMinisters: [
      { name: "Keshav Prasad Maurya", party: "Bharatiya Janata Party (BJP)", portfolio: "Rural Development, Overall Village Development, and Food Processing" },
      { name: "Brajesh Pathak", party: "Bharatiya Janata Party (BJP)", portfolio: "Medical Education, Health, and Family Welfare" }
    ],
    pastChiefMinisters: [
      { electionYear: "2017 Election", name: "Yogi Adityanath", party: "Bharatiya Janata Party (BJP)", term: "2017 - 2022", note: "Historic landslide of 312 of 403 seats for BJP (Dy CMs: Keshav Prasad Maurya & Dr. Dinesh Sharma)." },
      { electionYear: "2012 Election", name: "Akhilesh Yadav", party: "Samajwadi Party (SP)", term: "2012 - 2017", note: "Samajwadi Party won absolute majority with 224 seats; Akhilesh Yadav became UP's youngest CM." },
      { electionYear: "2007 Election", name: "Mayawati", party: "Bahujan Samaj Party (BSP)", term: "2007 - 2012", note: "BSP won full majority with 206 seats, the first single-party majority in UP in 16 years." }
    ]
  },
  "Uttarakhand": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2017 Election", name: "Trivendra Singh Rawat / Pushkar Singh Dhami", party: "Bharatiya Janata Party (BJP)", term: "2017 - 2022", note: "BJP won 57 of 70 seats; Rawat served 2017-2021, succeeded by Tirath Singh Rawat & Pushkar Dhami." },
      { electionYear: "2012 Election", name: "Vijay Bahuguna / Harish Rawat", party: "Indian National Congress (INC)", term: "2012 - 2017", note: "Congress won 32 seats; Harish Rawat assumed office in Feb 2014." },
      { electionYear: "2007 Election", name: "B.C. Khanduri / Ramesh Pokhriyal Nishank", party: "Bharatiya Janata Party (BJP)", term: "2007 - 2012", note: "BJP won 35 seats; Khanduri and Nishank led successive tenures." }
    ]
  },
  "West Bengal": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2016 Election", name: "Mamata Banerjee", party: "All India Trinamool Congress (AITC)", term: "2016 - 2021", note: "Trinamool Congress won supermajority with 211 of 294 seats." },
      { electionYear: "2011 Election", name: "Mamata Banerjee", party: "All India Trinamool Congress (AITC)", term: "2011 - 2016", note: "Historical election ending 34-year uninterrupted Left Front rule, winning 227 coalition seats." },
      { electionYear: "2006 Election", name: "Buddhadeb Bhattacharjee", party: "Communist Party of India (Marxist) - CPI(M)", term: "2006 - 2011", note: "Left Front won landslide with 235 seats under Buddhadeb Bhattacharjee." }
    ]
  },
  "Delhi": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2020 Election", name: "Arvind Kejriwal / Atishi", party: "Aam Aadmi Party (AAP)", term: "2020 - Present", note: "AAP won 62 of 70 seats (Manish Sisodia Dy CM); Atishi took oath in Sept 2024." },
      { electionYear: "2015 Election", name: "Arvind Kejriwal", party: "Aam Aadmi Party (AAP)", term: "2015 - 2020", note: "Historic landslide of 67 out of 70 seats for AAP; Manish Sisodia was Deputy CM." },
      { electionYear: "2013 Election", name: "Arvind Kejriwal / Sheila Dikshit", party: "AAP / INC", term: "2013 - 2015", note: "Kejriwal formed 49-day minority government; preceded by Sheila Dikshit (3-term CM 1998-2013)." }
    ]
  },
  "Jammu and Kashmir": {
    deputyChiefMinisters: [
      { name: "Surinder Kumar Choudhary", party: "Jammu and Kashmir National Conference (JKNC)", portfolio: "Public Works Department, Industries & Commerce, Mining, and Labour & Employment" }
    ],
    pastChiefMinisters: [
      { electionYear: "2024 Election", name: "Omar Abdullah", party: "JKNC - Congress Alliance", term: "2024 - Present", note: "First legislative assembly election in 10 years and first as Union Territory; alliance won 48 seats." },
      { electionYear: "2014 Election", name: "Mufti Mohammad Sayeed / Mehbooba Mufti", party: "JKPDP - BJP Alliance", term: "2015 - 2018", note: "Sayeed served 2015-2016; Mehbooba Mufti ruled 2016-2018 with Dy CM Nirmal Singh; followed by Central Rule & Reorganisation." },
      { electionYear: "2008 Election", name: "Omar Abdullah", party: "JKNC - Congress Coalition", term: "2009 - 2015", note: "NC-Congress coalition governed full 6-year tenure with Tara Chand as Deputy CM." }
    ]
  },
  "Puducherry": {
    deputyChiefMinisters: [],
    pastChiefMinisters: [
      { electionYear: "2021 Election", name: "N. Rangaswamy", party: "All India N.R. Congress (AINRC)", term: "2021 - Present", note: "AINRC-BJP NDA alliance won 16 of 30 elected seats." },
      { electionYear: "2016 Election", name: "V. Narayanasamy", party: "Indian National Congress (INC)", term: "2016 - 2021", note: "Congress-DMK coalition won 17 seats." },
      { electionYear: "2011 Election", name: "N. Rangaswamy", party: "All India N.R. Congress (AINRC)", term: "2011 - 2016", note: "Newly formed AINRC won 15 seats and formed government with AIADMK support." }
    ]
  }
};

let updatedCount = 0;
statesData.forEach(state => {
  const history = cabinetHistory[state.name];
  if (history) {
    state.deputyChiefMinisters = history.deputyChiefMinisters || [];
    state.pastChiefMinisters = history.pastChiefMinisters || [];
    updatedCount++;
    console.log(`[OK] Updated ${state.name} with ${state.deputyChiefMinisters.length} Dy CMs and ${state.pastChiefMinisters.length} Ex-CM terms.`);
  } else {
    // UT without legislature
    state.deputyChiefMinisters = [];
    state.pastChiefMinisters = [];
    console.log(`[NOTE] ${state.name} is a UT without legislature (Direct Central Administration).`);
  }
});

fs.writeFileSync(statesDataPath, JSON.stringify(statesData, null, 2), 'utf8');
console.log(`\nSuccessfully updated statesData.json for ${updatedCount} states/UTs!`);
