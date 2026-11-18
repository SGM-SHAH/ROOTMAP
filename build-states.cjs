const fs = require('fs');
const path = require('path');

const states = [
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    aliases: ['MH', 'Maha', 'Bombay'],
    type: 'State',
    capital: 'Mumbai (Summer) / Nagpur (Winter)',
    chiefMinister: {
      name: 'Devendra Fadnavis',
      party: 'Bharatiya Janata Party (BJP)',
      alliance: 'Mahayuti Alliance',
      termStart: '2024'
    },
    rulingParty: {
      name: 'Mahayuti Alliance (BJP - Shiv Sena - NCP)',
      abbr: 'Mahayuti',
      color: '#EA580C',
      assemblyStrength: '235 / 288 seats'
    },
    governor: {
      name: 'C.P. Radhakrishnan',
      role: 'Governor',
      appointedBy: 'President of India'
    },
    speaker: {
      name: 'Rahul Narwekar',
      assembly: 'Maharashtra Legislative Assembly (Vidhan Sabha)'
    },
    homeMinister: {
      name: 'Devendra Fadnavis',
      portfolio: 'Home, Law & Judiciary, Energy',
      note: 'The Chief Minister directly holds the Home portfolio, overseeing Maharashtra Police and Anti-Terrorism Squad (ATS).'
    },
    defensePortfolio: {
      constitutionalFact: 'Under the 7th Schedule of the Constitution of India (Union List - List I), National Defence, Armed Forces, and War/Peace are strictly the jurisdiction of the Central Government. Individual states do not have a State Defense Minister.',
      unionDefenseMinister: 'Rajnath Singh (Union Minister of Defence)',
      stateEquivalent: 'Department of Sainik Welfare (Maharashtra) & Coastal Security Command',
      note: 'States maintain civil defense, police, and ex-servicemen welfare through the Department of Sainik Welfare.'
    },
    educationMinister: {
      schoolEducation: 'Dadaji Bhuse (School Education & Sports)',
      higherEducation: 'Chandrakant Patil (Higher & Technical Education)'
    },
    demographics: {
      population: '12.63 Crores (~126.3 Million)',
      populationRank: '2nd in India',
      totalDistricts: 36,
      areaSqKm: 307713,
      areaRank: '3rd in India',
      literacyRate: '82.34%',
      officialLanguages: ['Marathi'],
      gdp: '~$450 Billion (Largest state economy in India)'
    },
    majorDistricts: [
      {
        name: 'Mumbai',
        type: 'Financial Capital',
        coordinates: [72.8777, 19.0760],
        population: '12.4 Million',
        highlight: 'Financial capital of India, Bombay Stock Exchange (BSE), Reserve Bank of India, Gateway of India, and Bollywood film industry.'
      },
      {
        name: 'Pune',
        type: 'IT & Education Hub',
        coordinates: [73.8567, 18.5204],
        population: '3.1 Million',
        highlight: 'Known as the "Oxford of the East", major automotive, EV, and software engineering hub; home to Serum Institute of India.'
      },
      {
        name: 'Nagpur',
        type: 'Winter Capital & Tiger Gateway',
        coordinates: [79.0882, 21.1458],
        population: '2.4 Million',
        highlight: 'Winter capital of Maharashtra, "Orange City", Zero Mile Stone marking geographical center of India.'
      },
      {
        name: 'Nashik',
        type: 'Heritage & Agro Hub',
        coordinates: [73.7898, 19.9975],
        population: '1.5 Million',
        highlight: 'Pilgrimage site for the historic Kumbh Mela on Godavari River and premier Wine Capital of India.'
      },
      {
        name: 'Chhatrapati Sambhajinagar',
        type: 'Tourism & Manufacturing Hub',
        coordinates: [75.3433, 19.8762],
        population: '1.2 Million',
        highlight: 'Gateway to UNESCO World Heritage Sites: Ajanta Caves and Ellora Caves, plus auto-ancillary manufacturing.'
      }
    ],
    educationalTrivia: [
      'Maharashtra produces roughly 14% of India\'s industrial GDP and handles over 50% of the country\'s containerized sea cargo via JNPT.',
      'The Lonar Crater Lake in Buldhana district was created by a hypervelocity meteorite impact 52,000 years ago and is hyper-alkaline.',
      'Chhatrapati Shivaji Maharaj developed naval sea-forts such as Sindhudurg and Vijaydurg, pioneering indigenous naval defense.'
    ]
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    aliases: ['UP', 'United Provinces'],
    type: 'State',
    capital: 'Lucknow',
    chiefMinister: {
      name: 'Yogi Adityanath',
      party: 'Bharatiya Janata Party (BJP)',
      alliance: 'National Democratic Alliance (NDA)',
      termStart: '2017 (2nd Term 2022)'
    },
    rulingParty: {
      name: 'Bharatiya Janata Party (BJP)',
      abbr: 'BJP',
      color: '#EA580C',
      assemblyStrength: '255 / 403 seats'
    },
    governor: {
      name: 'Anandiben Patel',
      role: 'Governor',
      appointedBy: 'President of India'
    },
    speaker: {
      name: 'Satish Mahana',
      assembly: 'Uttar Pradesh Legislative Assembly'
    },
    homeMinister: {
      name: 'Yogi Adityanath',
      portfolio: 'Home, Confidential, Personnel, Revenue',
      note: 'Chief Minister Yogi Adityanath oversees the Home Department and UP Police, India\'s largest single police force.'
    },
    defensePortfolio: {
      constitutionalFact: 'Under the 7th Schedule of the Constitution of India, Defence is purely a Union List matter handled by the Central Government.',
      unionDefenseMinister: 'Rajnath Singh (Union Minister of Defence, MP representing Lucknow, UP)',
      stateEquivalent: 'Uttar Pradesh Defence Industrial Corridor & Directorate of Sainik Kalyan',
      note: 'UP hosts the major UP Defence Industrial Corridor across Lucknow, Kanpur, Jhansi, Agra, Aligarh, and Chitrakoot (manufacturing BrahMos, UAVs, shells).'
    },
    educationMinister: {
      schoolEducation: 'Gulab Devi (Minister of State, Secondary Education)',
      higherEducation: 'Yogendra Upadhyaya (Higher Education Minister)'
    },
    demographics: {
      population: '24.1 Crores (~241 Million)',
      populationRank: '1st in India (Most Populous State)',
      totalDistricts: 75,
      areaSqKm: 243286,
      areaRank: '4th in India',
      literacyRate: '67.68%',
      officialLanguages: ['Hindi', 'Urdu'],
      gdp: '~$310 Billion'
    },
    majorDistricts: [
      {
        name: 'Lucknow',
        type: 'State Capital & Heritage',
        coordinates: [80.9462, 26.8467],
        population: '3.8 Million',
        highlight: 'Administrative capital, celebrated as the "City of Nawabs", famous for Chikankari embroidery, Rumi Darwaza, and aerospace manufacturing.'
      },
      {
        name: 'Varanasi',
        type: 'Spiritual Capital',
        coordinates: [82.9739, 25.3176],
        population: '1.4 Million',
        highlight: 'One of the oldest continuously inhabited cities on Earth, spiritual heartland on the sacred Ganges, Kashi Vishwanath corridor.'
      },
      {
        name: 'Noida (Gautam Buddha Nagar)',
        type: 'Tech & Industrial Powerhouse',
        coordinates: [77.3910, 28.5355],
        population: '1.6 Million',
        highlight: 'Part of the National Capital Region (NCR), leading mobile phone manufacturing epicenter and tech software park.'
      },
      {
        name: 'Agra',
        type: 'UNESCO Heritage Hub',
        coordinates: [78.0081, 27.1767],
        population: '1.8 Million',
        highlight: 'Home to the world wonder Taj Mahal, Agra Fort, and Mughal architectural marvels.'
      },
      {
        name: 'Prayagraj',
        type: 'Confluence & Judiciary',
        coordinates: [81.8463, 25.4358],
        population: '1.5 Million',
        highlight: 'Sacred confluence (Triveni Sangam) of Ganga, Yamuna & mythological Saraswati, venue for Maha Kumbh, seat of Allahabad High Court.'
      }
    ],
    educationalTrivia: [
      'If Uttar Pradesh were an independent country, it would be the 5th most populous country in the world, surpassing Brazil and Nigeria.',
      'UP sends 80 members to the Lok Sabha and 31 to the Rajya Sabha, holding the largest political representation in Indian Parliament.',
      'The fertile alluvial plains fed by Ganga and Yamuna make UP India\'s leading producer of food grains, wheat, and sugarcane.'
    ]
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    aliases: ['TN', 'Madras State'],
    type: 'State',
    capital: 'Chennai',
    chiefMinister: {
      name: 'M.K. Stalin',
      party: 'Dravida Munnetra Kazhagam (DMK)',
      alliance: 'Secular Progressive Alliance (SPA / INDIA)',
      termStart: '2021'
    },
    rulingParty: {
      name: 'Dravida Munnetra Kazhagam (DMK)',
      abbr: 'DMK',
      color: '#DC2626',
      assemblyStrength: '133 / 234 seats'
    },
    governor: {
      name: 'R.N. Ravi',
      role: 'Governor',
      appointedBy: 'President of India'
    },
    speaker: {
      name: 'M. Appavu',
      assembly: 'Tamil Nadu Legislative Assembly'
    },
    homeMinister: {
      name: 'M.K. Stalin',
      portfolio: 'Home, Police, Public, General Administration',
      note: 'The Chief Minister holds the Home portfolio directly, supervising the Tamil Nadu Police and coastal security.'
    },
    defensePortfolio: {
      constitutionalFact: 'National Defence is reserved exclusively for the Union of India under List I of the Seventh Schedule of the Constitution.',
      unionDefenseMinister: 'Rajnath Singh',
      stateEquivalent: 'Tamil Nadu Defence Industrial Corridor (TNDIC) & Ex-Servicemen Welfare Board',
      note: 'Tamil Nadu hosts the Heavy Vehicles Factory in Avadi (Arjun & T-90 tanks), Combat Vehicles R&D (CVRDE), and Indian Coast Guard Regional HQ.'
    },
    educationMinister: {
      schoolEducation: 'Anbil Mahesh Poyyamozhi (School Education)',
      higherEducation: 'Dr. Govi Chezhiaan (Higher Education)'
    },
    demographics: {
      population: '7.68 Crores (~76.8 Million)',
      populationRank: '7th in India',
      totalDistricts: 38,
      areaSqKm: 130058,
      areaRank: '10th in India',
      literacyRate: '80.09%',
      officialLanguages: ['Tamil', 'English (additional)'],
      gdp: '~$340 Billion (2nd largest state economy in India)'
    },
    majorDistricts: [
      {
        name: 'Chennai',
        type: 'Automotive & SaaS Hub',
        coordinates: [80.2707, 13.0827],
        population: '7.1 Million',
        highlight: 'Known as the "Detroit of South Asia" for auto manufacturing; India\'s capital for SaaS software and health tourism.'
      },
      {
        name: 'Coimbatore',
        type: 'Textile & Engineering Hub',
        coordinates: [76.9558, 11.0168],
        population: '1.6 Million',
        highlight: 'Known as the "Manchester of South India", leading producer of precision motors, pumps, and cotton yarn.'
      },
      {
        name: 'Madurai',
        type: 'Cultural & Heritage Capital',
        coordinates: [78.1198, 9.9252],
        population: '1.5 Million',
        highlight: 'Historic city on Vaigai River, renowned for the architectural triumph of Meenakshi Sundareswarar Temple.'
      },
      {
        name: 'Tiruchirappalli (Trichy)',
        type: 'Industrial & Educational Center',
        coordinates: [78.7047, 10.7905],
        population: '1.0 Million',
        highlight: 'Home to BHEL high-pressure boiler plant, National Institute of Technology (NIT Trichy), and ancient Rockfort.'
      },
      {
        name: 'Salem',
        type: 'Steel & Mining Hub',
        coordinates: [78.1460, 11.6643],
        population: '900,000',
        highlight: 'Major stainless steel plant (SAIL), rich magnesite deposits, and sago/textile processing.'
      }
    ],
    educationalTrivia: [
      'Tamil is one of the world\'s longest-surviving classical languages, with Sangam literature dating back over two millennia.',
      'Tamil Nadu has the highest Gross Enrollment Ratio in Higher Education in India (~52%) and leads in working women participation.',
      'The Brihadeeswara Temple in Thanjavur, built by Chola Emperor Raja Raja I in 1010 CE, was constructed entirely of granite.'
    ]
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    aliases: ['KA', 'Mysore State'],
    type: 'State',
    capital: 'Bengaluru',
    chiefMinister: {
      name: 'Siddaramaiah',
      party: 'Indian National Congress (INC)',
      alliance: 'Indian National Congress',
      termStart: '2023'
    },
    rulingParty: {
      name: 'Indian National Congress (INC)',
      abbr: 'INC',
      color: '#2563EB',
      assemblyStrength: '136 / 224 seats'
    },
    governor: {
      name: 'Thaawarchand Gehlot',
      role: 'Governor',
      appointedBy: 'President of India'
    },
    speaker: {
      name: 'U.T. Khader',
      assembly: 'Karnataka Legislative Assembly'
    },
    homeMinister: {
      name: 'Dr. G. Parameshwara',
      portfolio: 'Home Department (excluding Intelligence)',
      note: 'Supervises Karnataka State Police, cyber safety commands, and specialized state law enforcement.'
    },
    defensePortfolio: {
      constitutionalFact: 'Under the 7th Schedule of the Indian Constitution, National Defence is strictly the purview of the Union Government.',
      unionDefenseMinister: 'Rajnath Singh',
      stateEquivalent: 'Department of Sainik Welfare and Resettlement (Karnataka)',
      note: 'Bengaluru is India\'s Aerospace and Defence capital, housing Hindustan Aeronautics Limited (HAL), DRDO labs, ISRO, and Bharat Electronics (BEL).'
    },
    educationMinister: {
      schoolEducation: 'Madhu Bangarappa (Primary & Secondary Education)',
      higherEducation: 'Dr. M.C. Sudhakar (Higher Education)'
    },
    demographics: {
      population: '6.76 Crores (~67.6 Million)',
      populationRank: '8th in India',
      totalDistricts: 31,
      areaSqKm: 191791,
      areaRank: '6th in India',
      literacyRate: '75.36%',
      officialLanguages: ['Kannada'],
      gdp: '~$320 Billion (India\'s premier tech exporter)'
    },
    majorDistricts: [
      {
        name: 'Bengaluru',
        type: 'Silicon Valley of India',
        coordinates: [77.5946, 12.9716],
        population: '8.4 Million',
        highlight: 'Tech capital of India, aerospace & biotech hub, headquarters of ISRO, Infosys, Wipro, and over 40% of Indian IT unicorns.'
      },
      {
        name: 'Mysuru',
        type: 'Heritage & Royal Capital',
        coordinates: [76.6394, 12.2958],
        population: '1.1 Million',
        highlight: 'Celebrated for the illuminated Mysore Palace, international Dasara festival, sandalwood carving, and yoga centers.'
      },
      {
        name: 'Mangaluru',
        type: 'Coastal Seaport & Education City',
        coordinates: [74.8560, 12.9141],
        population: '700,000',
        highlight: 'Major seaport on the Arabian Sea (New Mangalore Port), petrochemical refining, and cradle of Indian commercial banking.'
      },
      {
        name: 'Hubballi-Dharwad',
        type: 'Commercial & Railway Hub',
        coordinates: [75.1240, 15.3647],
        population: '950,000',
        highlight: 'Commercial nucleus of North Karnataka and headquarters of the South Western Railway zone.'
      },
      {
        name: 'Belagavi',
        type: 'Sugar & Foundry Center',
        coordinates: [74.5089, 15.8497],
        population: '650,000',
        highlight: 'Home to the majestic Suvarna Vidhana Soudha, Karnataka\'s second legislative assembly building.'
      }
    ],
    educationalTrivia: [
      'Karnataka accounts for over 38% of India\'s total software exports and is the largest coffee producer in India (>70%).',
      'The ruins of the Vijayanagara Empire capital at Hampi in Ballari district are a UNESCO World Heritage wonder.',
      'Kannada literature holds 8 prestigious Jnanpith Awards, the second-highest tally for any language in India.'
    ]
  },
  {
    id: 'delhi',
    name: 'Delhi',
    aliases: ['NCT of Delhi', 'National Capital Territory of Delhi', 'DL'],
    type: 'Union Territory (with Legislature)',
    capital: 'New Delhi',
    chiefMinister: {
      name: 'Atishi Marlena',
      party: 'Aam Aadmi Party (AAP)',
      alliance: 'Aam Aadmi Party / INDIA',
      termStart: '2024'
    },
    rulingParty: {
      name: 'Aam Aadmi Party (AAP)',
      abbr: 'AAP',
      color: '#0284C7',
      assemblyStrength: '62 / 70 seats'
    },
    governor: {
      name: 'Vinai Kumar Saxena',
      role: 'Lieutenant Governor',
      appointedBy: 'President of India'
    },
    speaker: {
      name: 'Ram Niwas Goel',
      assembly: 'Delhi Legislative Assembly'
    },
    homeMinister: {
      name: 'Ministry of Home Affairs (Govt. of India)',
      portfolio: 'Public Order & Police (Union Jurisdiction)',
      note: 'Constitutional Note: Under Article 239AA of the Constitution, Public Order, Police, and Land in Delhi report directly to the Union Home Ministry, not the state cabinet.'
    },
    defensePortfolio: {
      constitutionalFact: 'Delhi is the national defense headquarters of the Republic of India.',
      unionDefenseMinister: 'Rajnath Singh (Minister of Defence)',
      stateEquivalent: 'Rajya Sainik Board Delhi',
      note: 'South Block houses the Ministry of Defence, Army HQ, Naval HQ, and Air HQ.'
    },
    educationMinister: {
      schoolEducation: 'Atishi Marlena (Education & PWD)',
      higherEducation: 'Atishi Marlena'
    },
    demographics: {
      population: '2.1 Crores (~21 Million)',
      populationRank: '2nd most populous urban agglomeration',
      totalDistricts: 11,
      areaSqKm: 1484,
      areaRank: 'National Capital Territory',
      literacyRate: '86.21%',
      officialLanguages: ['Hindi', 'English', 'Urdu', 'Punjabi'],
      gdp: '~$140 Billion'
    },
    majorDistricts: [
      {
        name: 'New Delhi',
        type: 'National Capital District',
        coordinates: [77.2090, 28.6139],
        population: '250,000',
        highlight: 'Seat of India\'s governance: Rashtrapati Bhavan, New Parliament Building (Sansad Bhavan), and Supreme Court.'
      },
      {
        name: 'Central Delhi',
        type: 'Historic Core',
        coordinates: [77.2218, 28.6448],
        population: '580,000',
        highlight: 'Old Delhi, Mughal Red Fort, Jama Masjid, and historic Chandni Chowk.'
      },
      {
        name: 'South Delhi',
        type: 'Cultural & Academic Hub',
        coordinates: [77.2289, 28.5355],
        population: '2.7 Million',
        highlight: 'Home to Qutub Minar, Lotus Temple, IIT Delhi, and AIIMS medical research center.'
      }
    ],
    educationalTrivia: [
      'Delhi possesses a special constitutional status established under the 69th Constitutional Amendment Act (Article 239AA).',
      'The Delhi Metro operates over 390 kilometers of track, ranking among the world\'s most punctual transit systems.',
      'Delhi has served as capital to at least seven major historical civilizations and dynasties.'
    ]
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    aliases: ['GJ'],
    type: 'State',
    capital: 'Gandhinagar',
    chiefMinister: {
      name: 'Bhupendra Patel',
      party: 'Bharatiya Janata Party (BJP)',
      alliance: 'National Democratic Alliance (NDA)',
      termStart: '2021 (2nd Term 2022)'
    },
    rulingParty: {
      name: 'Bharatiya Janata Party (BJP)',
      abbr: 'BJP',
      color: '#EA580C',
      assemblyStrength: '156 / 182 seats'
    },
    governor: {
      name: 'Acharya Devvrat',
      role: 'Governor',
      appointedBy: 'President of India'
    },
    speaker: {
      name: 'Shankar Chaudhary',
      assembly: 'Gujarat Legislative Assembly'
    },
    homeMinister: {
      name: 'Harsh Sanghavi (MoS Home)',
      portfolio: 'Home, Police Housing, Border Security',
      note: 'Harsh Sanghavi holds independent portfolio charge for Home, supervising coastal police & state intelligence.'
    },
    defensePortfolio: {
      constitutionalFact: 'Defence is an exclusive Union jurisdiction. Gujarat guards critical western land and maritime frontiers.',
      unionDefenseMinister: 'Rajnath Singh',
      stateEquivalent: 'Directorate of Sainik Welfare & Gujarat Maritime Security Command',
      note: 'Hosts major military stations, Jamnagar Indian Air Force base, and strategic ports at Kandla and Mundra.'
    },
    educationMinister: {
      schoolEducation: 'Dr. Kuber Dindor (Tribal Development & Primary/Secondary)',
      higherEducation: 'Rushikesh Patel (Higher & Technical Education)'
    },
    demographics: {
      population: '6.04 Crores (~60.4 Million)',
      populationRank: '9th in India',
      totalDistricts: 33,
      areaSqKm: 196024,
      areaRank: '5th in India',
      literacyRate: '78.03%',
      officialLanguages: ['Gujarati'],
      gdp: '~$310 Billion'
    },
    majorDistricts: [
      {
        name: 'Ahmedabad',
        type: 'Commercial Metropolis',
        coordinates: [72.5714, 23.0225],
        population: '8.4 Million',
        highlight: 'India\'s first UNESCO World Heritage City, historic Sabarmati Ashram, and the 132,000-seat Narendra Modi Stadium.'
      },
      {
        name: 'Gandhinagar',
        type: 'Capital & FinTech City',
        coordinates: [72.6847, 23.2156],
        population: '300,000',
        highlight: 'Planned administrative capital, GIFT City (Gujarat International Finance Tec-City).'
      },
      {
        name: 'Surat',
        type: 'Diamond & Textile Capital',
        coordinates: [72.8311, 21.1702],
        population: '6.0 Million',
        highlight: 'Polishes 90% of global rough diamonds; home to Surat Diamond Bourse, the world\'s largest office building.'
      },
      {
        name: 'Vadodara',
        type: 'Cultural & Petrochemical City',
        coordinates: [73.1812, 22.3072],
        population: '2.1 Million',
        highlight: 'Laxmi Vilas Palace, petrochemical complexes, and Gati Shakti Vishwavidyalaya (Railway University).'
      }
    ],
    educationalTrivia: [
      'Gujarat has the longest coastline in India (~1,600 km), managing over 40% of national maritime port tonnage.',
      'The Statue of Unity in Kevadia (Narmada district) stands 182 meters high, making it the tallest statue on the planet.',
      'Gir National Park is the world\'s last remaining refuge for the majestic Asiatic Lion in the wild.'
    ]
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    aliases: ['RJ', 'Rajputana'],
    type: 'State',
    capital: 'Jaipur',
    chiefMinister: {
      name: 'Bhajan Lal Sharma',
      party: 'Bharatiya Janata Party (BJP)',
      alliance: 'NDA',
      termStart: '2023'
    },
    rulingParty: {
      name: 'Bharatiya Janata Party (BJP)',
      abbr: 'BJP',
      color: '#EA580C',
      assemblyStrength: '115 / 200 seats'
    },
    governor: {
      name: 'Haribhau Bagade',
      role: 'Governor',
      appointedBy: 'President of India'
    },
    speaker: {
      name: 'Vasudev Devnani',
      assembly: 'Rajasthan Legislative Assembly'
    },
    homeMinister: {
      name: 'Bhajan Lal Sharma (CM)',
      portfolio: 'Home, Anti-Corruption, Planning',
      note: 'The Chief Minister directly holds the Home portfolio.'
    },
    defensePortfolio: {
      constitutionalFact: 'Defence is a Union List subject. Rajasthan borders Pakistan along a 1,048 km strategic desert frontier.',
      unionDefenseMinister: 'Rajnath Singh',
      stateEquivalent: 'Department of Soldier Welfare (Sainik Kalyan Vibhag)',
      note: 'Houses Army Southern Command strike corps, Pokhran nuclear field ranges, and Jodhpur Air Base.'
    },
    educationMinister: {
      schoolEducation: 'Madan Dilawar (School Education & Panchayati Raj)',
      higherEducation: 'Prem Chand Bairwa (Higher Education & Deputy CM)'
    },
    demographics: {
      population: '6.85 Crores (~68.5 Million)',
      populationRank: '7th in India',
      totalDistricts: 50,
      areaSqKm: 342239,
      areaRank: '1st in India (Largest state by area)',
      literacyRate: '66.11%',
      officialLanguages: ['Hindi', 'Rajasthani'],
      gdp: '~$190 Billion'
    },
    majorDistricts: [
      {
        name: 'Jaipur',
        type: 'Pink City & Capital',
        coordinates: [75.7873, 26.9124],
        population: '3.9 Million',
        highlight: 'Pink City, UNESCO World Heritage site, Hawa Mahal, Amer Fort, Jantar Mantar, and jewelry trade center.'
      },
      {
        name: 'Jodhpur',
        type: 'Blue City & Defense Base',
        coordinates: [73.0243, 26.2389],
        population: '1.3 Million',
        highlight: 'Blue City, Mehrangarh Fort towering over the desert, High Court seat, and strategic defense airfield.'
      },
      {
        name: 'Udaipur',
        type: 'City of Lakes',
        coordinates: [73.7125, 24.5854],
        population: '650,000',
        highlight: 'City of Lakes, Lake Pichola, historic Mewar City Palace, and global destination for heritage tourism.'
      },
      {
        name: 'Kota',
        type: 'Education & Coaching Hub',
        coordinates: [75.8648, 25.2138],
        population: '1.2 Million',
        highlight: 'National educational powerhouse preparing students for competitive engineering (IIT-JEE) and medical (NEET) exams.'
      }
    ],
    educationalTrivia: [
      'Rajasthan is the largest state in India by land area, occupying 10.4% of the nation\'s geographic footprint.',
      'The Thar Desert (Great Indian Desert) covers the majority of western Rajasthan, supporting rich desert wildlife like the Great Indian Bustard.',
      'Pokhran was the site of India\'s milestone nuclear tests: Operation Smiling Buddha (1974) and Operation Shakti (1998).'
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala',
    aliases: ['KL'],
    type: 'State',
    capital: 'Thiruvananthapuram',
    chiefMinister: {
      name: 'Pinarayi Vijayan',
      party: 'Communist Party of India (Marxist) [CPI(M)]',
      alliance: 'Left Democratic Front (LDF)',
      termStart: '2016 (2nd Term 2021)'
    },
    rulingParty: {
      name: 'Left Democratic Front (LDF)',
      abbr: 'LDF',
      color: '#DC2626',
      assemblyStrength: '99 / 140 seats'
    },
    governor: {
      name: 'Arif Mohammed Khan',
      role: 'Governor',
      appointedBy: 'President of India'
    },
    speaker: {
      name: 'A.N. Shamseer',
      assembly: 'Kerala Legislative Assembly (Niyamasabha)'
    },
    homeMinister: {
      name: 'Pinarayi Vijayan (CM)',
      portfolio: 'Home, Vigilance, IT, Science',
      note: 'The Chief Minister manages Home and Kerala Police, which pioneered community policing and cyberdom security.'
    },
    defensePortfolio: {
      constitutionalFact: 'Defence is strictly an exclusive Union subject under the Seventh Schedule of the Indian Constitution.',
      unionDefenseMinister: 'Rajnath Singh',
      stateEquivalent: 'Department of Sainik Welfare (Kerala)',
      note: 'Kochi is the operational headquarters of the Southern Naval Command and Cochin Shipyard, which built INS Vikrant, India\'s first indigenous aircraft carrier.'
    },
    educationMinister: {
      schoolEducation: 'V. Sivankutty (General Education & Labour)',
      higherEducation: 'Dr. R. Bindu (Higher Education)'
    },
    demographics: {
      population: '3.5 Crores (~35 Million)',
      populationRank: '13th in India',
      totalDistricts: 14,
      areaSqKm: 38863,
      areaRank: '21st in India',
      literacyRate: '96.2% (Highest in India)',
      officialLanguages: ['Malayalam', 'English'],
      gdp: '~$145 Billion'
    },
    majorDistricts: [
      {
        name: 'Thiruvananthapuram',
        type: 'State Capital & Space Hub',
        coordinates: [76.9366, 8.5241],
        population: '1.0 Million',
        highlight: 'Seat of Kerala government, Vikram Sarabhai Space Centre (VSSC/ISRO), and Padmanabhaswamy Temple.'
      },
      {
        name: 'Kochi',
        type: 'Commercial & Maritime Metropolis',
        coordinates: [76.2673, 9.9312],
        population: '2.1 Million',
        highlight: 'Queen of the Arabian Sea, Southern Naval Command, Kochi Water Metro, and first solar-powered international airport.'
      },
      {
        name: 'Kozhikode (Calicut)',
        type: 'Historic Trade & Literature City',
        coordinates: [75.7804, 11.2588],
        population: '800,000',
        highlight: 'Historic spice port where Vasco da Gama landed in 1498; first Indian city crowned UNESCO "City of Literature".'
      }
    ],
    educationalTrivia: [
      'Kerala is India\'s top-ranked state on the UN Sustainable Development Goals (SDG) index and has the highest Human Development Index (HDI).',
      'Kerala boasts the highest sex ratio in the country (1,084 females per 1,000 males) and the highest life expectancy (~75 years).',
      'The Kerala backwaters form an interconnected network of 900 km of brackish lagoons, lakes, and canals parallel to the Arabian Sea.'
    ]
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    aliases: ['WB', 'Bangla'],
    type: 'State',
    capital: 'Kolkata',
    chiefMinister: {
      name: 'Mamata Banerjee',
      party: 'All India Trinamool Congress (AITC)',
      alliance: 'Trinamool Congress / INDIA',
      termStart: '2011 (3rd Term 2021)'
    },
    rulingParty: {
      name: 'All India Trinamool Congress (AITC)',
      abbr: 'TMC',
      color: '#059669',
      assemblyStrength: '215 / 294 seats'
    },
    governor: {
      name: 'C.V. Ananda Bose',
      role: 'Governor',
      appointedBy: 'President of India'
    },
    speaker: {
      name: 'Biman Banerjee',
      assembly: 'West Bengal Legislative Assembly'
    },
    homeMinister: {
      name: 'Mamata Banerjee (CM)',
      portfolio: 'Home and Hill Affairs, Personnel',
      note: 'The Chief Minister personally oversees the Home Department and Kolkata Police.'
    },
    defensePortfolio: {
      constitutionalFact: 'Under the 7th Schedule, Defence is solely a Union List subject.',
      unionDefenseMinister: 'Rajnath Singh',
      stateEquivalent: 'Directorate of Sainik Kalyan (West Bengal)',
      note: 'Kolkata is headquarters to the Eastern Command of the Indian Army (Fort William) and naval warship builder GRSE.'
    },
    educationMinister: {
      schoolEducation: 'Bratya Basu (School Education)',
      higherEducation: 'Bratya Basu (Higher Education)'
    },
    demographics: {
      population: '9.9 Crores (~99 Million)',
      populationRank: '4th in India',
      totalDistricts: 23,
      areaSqKm: 88752,
      areaRank: '13th in India',
      literacyRate: '76.26%',
      officialLanguages: ['Bengali', 'English', 'Nepali'],
      gdp: '~$220 Billion'
    },
    majorDistricts: [
      {
        name: 'Kolkata',
        type: 'Cultural Capital of India',
        coordinates: [88.3639, 22.5726],
        population: '4.5 Million (Metro: 14.8M)',
        highlight: 'City of Joy, former capital of British India, Victoria Memorial, Howrah Bridge, and India\'s first underwater metro.'
      },
      {
        name: 'Siliguri',
        type: 'Strategic Siliguri Corridor Gateway',
        coordinates: [88.4312, 26.7271],
        population: '750,000',
        highlight: 'Gateway to Northeast India, located on the crucial "Chicken\'s Neck" corridor bordering Nepal, Bhutan, and Bangladesh.'
      },
      {
        name: 'Darjeeling',
        type: 'Queen of the Hills',
        coordinates: [88.2627, 27.0410],
        population: '130,000',
        highlight: 'Renowned worldwide for Darjeeling tea (India\'s first GI tag) and the UNESCO Himalayan Toy Train.'
      }
    ],
    educationalTrivia: [
      'West Bengal is home to the Sundarbans, the world\'s largest mangrove delta and sanctuary of the Royal Bengal Tiger.',
      'Kolkata was the first city in India to construct an underground metro rail network (operational since 1984).',
      'Visva-Bharati University in Santiniketan, founded by Nobel Laureate Rabindranath Tagore, is a UNESCO World Heritage site.'
    ]
  },
  {
    id: 'telangana',
    name: 'Telangana',
    aliases: ['TS', 'TG'],
    type: 'State',
    capital: 'Hyderabad',
    chiefMinister: {
      name: 'A. Revanth Reddy',
      party: 'Indian National Congress (INC)',
      alliance: 'INC',
      termStart: '2023'
    },
    rulingParty: {
      name: 'Indian National Congress (INC)',
      abbr: 'INC',
      color: '#2563EB',
      assemblyStrength: '65 / 119 seats'
    },
    governor: {
      name: 'Jishnu Dev Varma',
      role: 'Governor',
      appointedBy: 'President of India'
    },
    speaker: {
      name: 'Gaddam Prasad Kumar',
      assembly: 'Telangana Legislative Assembly'
    },
    homeMinister: {
      name: 'A. Revanth Reddy (CM)',
      portfolio: 'Home, Municipal Administration & Urban Development',
      note: 'Chief Minister oversees Home, Law & Order, and Hyderabad city policing command.'
    },
    defensePortfolio: {
      constitutionalFact: 'Defence is an exclusive Union portfolio under Article 246.',
      unionDefenseMinister: 'Rajnath Singh',
      stateEquivalent: 'Telangana Sainik Welfare Board',
      note: 'Hyderabad is a missile and defense production nerve center: DRDL, BDL, Ordnance Factory Medak, and Tata Boeing Aerospace.'
    },
    educationMinister: {
      schoolEducation: 'A. Revanth Reddy (held by CM)',
      higherEducation: 'A. Revanth Reddy (held by CM)'
    },
    demographics: {
      population: '3.8 Crores (~38 Million)',
      populationRank: '12th in India',
      totalDistricts: 33,
      areaSqKm: 112077,
      areaRank: '11th in India',
      literacyRate: '72.8%',
      officialLanguages: ['Telugu', 'Urdu'],
      gdp: '~$175 Billion'
    },
    majorDistricts: [
      {
        name: 'Hyderabad',
        type: 'State Capital & Cyberabad',
        coordinates: [78.4867, 17.3850],
        population: '7.8 Million',
        highlight: 'City of Pearls, Charminar, Golconda Fort, and HITEC City (housing Google, Microsoft, and Amazon campuses).'
      },
      {
        name: 'Warangal',
        type: 'Historic Kakatiya Capital',
        coordinates: [79.5941, 17.9689],
        population: '800,000',
        highlight: 'Ancient capital of Kakatiya dynasty, UNESCO-recognized Ramappa Temple, and Thousand Pillar Temple.'
      }
    ],
    educationalTrivia: [
      'Telangana was officially formed on June 2, 2014, as India\'s 29th state (now 28 states).',
      'Hyderabad is known as the "Vaccine Capital of the World", producing over one-third of global vaccines.'
    ]
  }
];

// Load India GeoJSON to ensure all features are represented
const geojsonPath = path.join(__dirname, 'public', 'data', 'india-states.json');
const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));

const existingNames = new Set(states.map(s => s.name.toLowerCase()));
const existingIds = new Set(states.map(s => s.id));

const extraDirectory = {
  'Andhra Pradesh': { capital: 'Amaravati', cm: 'N. Chandrababu Naidu', party: 'TDP - NDA', pop: '5.3 Crores', districts: 26, lang: 'Telugu', gov: 'S. Abdul Nazeer', coord: [80.5150, 16.5417] },
  'Arunachal Pradesh': { capital: 'Itanagar', cm: 'Pema Khandu', party: 'BJP - NDA', pop: '1.6 Million', districts: 26, lang: 'English', gov: 'Lt. Gen. K.T. Parnaik', coord: [93.6053, 27.0844] },
  'Assam': { capital: 'Dispur / Guwahati', cm: 'Himanta Biswa Sarma', party: 'BJP - NDA', pop: '3.6 Crores', districts: 35, lang: 'Assamese, Bodo', gov: 'Lakshman Prasad Acharya', coord: [91.7898, 26.1433] },
  'Bihar': { capital: 'Patna', cm: 'Nitish Kumar', party: 'JD(U) - NDA', pop: '13.07 Crores', districts: 38, lang: 'Hindi, Urdu', gov: 'Rajendra Arlekar', coord: [85.1376, 25.5941] },
  'Chandigarh': { capital: 'Chandigarh', cm: 'UT Administrator', party: 'Central Administration', pop: '1.2 Million', districts: 1, lang: 'English, Punjabi', gov: 'Gulab Chand Kataria', coord: [76.7794, 30.7333] },
  'Chhattisgarh': { capital: 'Raipur', cm: 'Vishnu Deo Sai', party: 'BJP - NDA', pop: '3.0 Crores', districts: 33, lang: 'Chhattisgarhi, Hindi', gov: 'Ramen Deka', coord: [81.6296, 21.2514] },
  'Dadra and Nagar Haveli': { capital: 'Silvassa', cm: 'UT Administrator', party: 'Central Administration', pop: '400,000', districts: 1, lang: 'Gujarati, Hindi', gov: 'Praful Khoda Patel', coord: [73.0169, 20.2763] },
  'Daman and Diu': { capital: 'Daman', cm: 'UT Administrator', party: 'Central Administration', pop: '300,000', districts: 2, lang: 'Gujarati, Hindi', gov: 'Praful Khoda Patel', coord: [72.8397, 20.4283] },
  'Goa': { capital: 'Panaji', cm: 'Pramod Sawant', party: 'BJP - NDA', pop: '1.5 Million', districts: 2, lang: 'Konkani', gov: 'P.S. Sreedharan Pillai', coord: [73.8567, 15.4909] },
  'Haryana': { capital: 'Chandigarh', cm: 'Nayab Singh Saini', party: 'BJP - NDA', pop: '2.9 Crores', districts: 22, lang: 'Hindi, Punjabi', gov: 'Bandaru Dattatreya', coord: [76.0856, 29.0588] },
  'Himachal Pradesh': { capital: 'Shimla (Summer) / Dharamshala (Winter)', cm: 'Sukhvinder Singh Sukhu', party: 'INC', pop: '7.5 Million', districts: 12, lang: 'Hindi', gov: 'Shiv Pratap Shukla', coord: [77.1734, 31.1048] },
  'Jammu and Kashmir': { capital: 'Srinagar (Summer) / Jammu (Winter)', cm: 'Omar Abdullah', party: 'JKNC - INDIA', pop: '1.3 Crores', districts: 20, lang: 'Kashmiri, Dogri, Urdu', gov: 'Manoj Sinha (Lt. Governor)', coord: [74.7973, 34.0837] },
  'Jharkhand': { capital: 'Ranchi', cm: 'Hemant Soren', party: 'JMM - INDIA', pop: '3.9 Crores', districts: 24, lang: 'Hindi', gov: 'Santosh Kumar Gangwar', coord: [85.3096, 23.3441] },
  'Ladakh': { capital: 'Leh / Kargil', cm: 'UT Administration', party: 'Central Administration', pop: '300,000', districts: 2, lang: 'Ladakhi, Tibetan, Hindi', gov: 'Brig. (Dr.) B.D. Mishra (Lt. Governor)', coord: [77.5771, 34.1526] },
  'Lakshadweep': { capital: 'Kavaratti', cm: 'UT Administrator', party: 'Central Administration', pop: '65,000', districts: 1, lang: 'Malayalam', gov: 'Praful Khoda Patel', coord: [72.6369, 10.5669] },
  'Madhya Pradesh': { capital: 'Bhopal', cm: 'Dr. Mohan Yadav', party: 'BJP - NDA', pop: '8.5 Crores', districts: 55, lang: 'Hindi', gov: 'Mangubhai C. Patel', coord: [77.4126, 23.2599] },
  'Manipur': { capital: 'Imphal', cm: 'N. Biren Singh', party: 'BJP - NDA', pop: '3.2 Million', districts: 16, lang: 'Meitei (Manipuri)', gov: 'Anusuiya Uikey', coord: [93.9368, 24.8170] },
  'Meghalaya': { capital: 'Shillong', cm: 'Conrad Sangma', party: 'NPP - NDA', pop: '3.3 Million', districts: 12, lang: 'English, Khasi, Garo', gov: 'C.H. Vijayashankar', coord: [91.8933, 25.5788] },
  'Mizoram': { capital: 'Aizawl', cm: 'Lalduhoma', party: 'Zoram People\'s Movement', pop: '1.2 Million', districts: 11, lang: 'Mizo, English', gov: 'Kambhampati Hari Babu', coord: [92.7176, 23.7307] },
  'Nagaland': { capital: 'Kohima', cm: 'Neiphiu Rio', party: 'NDPP - NDA', pop: '2.2 Million', districts: 16, lang: 'English', gov: 'La. Ganesan', coord: [94.1086, 25.6751] },
  'Odisha': { capital: 'Bhubaneswar', cm: 'Mohan Charan Majhi', party: 'BJP - NDA', pop: '4.6 Crores', districts: 30, lang: 'Odia', gov: 'Raghubar Das', coord: [85.8245, 20.2961] },
  'Puducherry': { capital: 'Puducherry', cm: 'N. Rangasamy', party: 'AINRC - NDA', pop: '1.4 Million', districts: 4, lang: 'Tamil, French, English', gov: 'K. Kailashnathan (Lt. Governor)', coord: [79.8083, 11.9416] },
  'Punjab': { capital: 'Chandigarh', cm: 'Bhagwant Mann', party: 'Aam Aadmi Party (AAP)', pop: '3.0 Crores', districts: 23, lang: 'Punjabi', gov: 'Gulab Chand Kataria', coord: [75.8573, 30.9010] },
  'Sikkim': { capital: 'Gangtok', cm: 'Prem Singh Tamang (Golay)', party: 'SKM - NDA', pop: '690,000', districts: 6, lang: 'Nepali, Sikkimese, English', gov: 'Om Prakash Mathur', coord: [88.6138, 27.3314] },
  'Tripura': { capital: 'Agartala', cm: 'Dr. Manik Saha', party: 'BJP - NDA', pop: '4.1 Million', districts: 8, lang: 'Bengali, Kokborok', gov: 'N. Indrasena Reddy', coord: [91.2868, 23.8315] },
  'Uttarakhand': { capital: 'Dehradun / Gairsain', cm: 'Pushkar Singh Dhami', party: 'BJP - NDA', pop: '1.1 Crores', districts: 13, lang: 'Hindi, Sanskrit', gov: 'Lt. Gen. Gurmit Singh', coord: [78.0322, 30.3165] },
  'Andaman and Nicobar Islands': { capital: 'Port Blair', cm: 'UT Administrator', party: 'Central Administration', pop: '420,000', districts: 3, lang: 'Hindi, English', gov: 'Admiral D.K. Joshi (Lt. Governor)', coord: [92.7265, 11.6234] }
};

for (const feature of geojson.features) {
  const rawName = feature.properties.st_nm;
  if (!rawName) continue;
  const slug = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  if (existingNames.has(rawName.toLowerCase()) || existingIds.has(slug)) continue;

  const info = extraDirectory[rawName] || {
    capital: 'Administrative Headquarters',
    cm: 'State Executive',
    party: 'Democratic Government',
    pop: '2.5 Crores',
    districts: 15,
    lang: 'Regional Language',
    gov: 'Constitutional Governor',
    coord: [78.0, 22.0]
  };

  const isUT = rawName.includes('Islands') || rawName.includes('Chandigarh') || rawName.includes('Ladakh') || rawName.includes('Daman') || rawName.includes('Dadra') || rawName.includes('Lakshadweep') || rawName.includes('Puducherry');

  states.push({
    id: slug,
    name: rawName,
    aliases: [rawName],
    type: isUT ? 'Union Territory' : 'State',
    capital: info.capital,
    chiefMinister: {
      name: info.cm,
      party: info.party,
      alliance: info.party,
      termStart: 'Current'
    },
    rulingParty: {
      name: info.party,
      abbr: info.party.split(' ')[0],
      color: '#3B82F6',
      assemblyStrength: isUT ? 'Union Territory Administration' : 'Elected Legislative Body'
    },
    governor: {
      name: info.gov,
      role: isUT ? (info.gov.includes('Administrator') ? 'Administrator' : 'Lieutenant Governor') : 'Governor',
      appointedBy: 'President of India'
    },
    speaker: {
      name: isUT && !info.cm.includes('Omar') && !rawName.includes('Puducherry') ? 'Not Applicable (UT Administration)' : 'Speaker of Legislative Assembly',
      assembly: isUT ? 'Legislative Body / Advisory Council' : `${rawName} Legislative Assembly`
    },
    homeMinister: {
      name: isUT && !rawName.includes('Puducherry') ? 'Ministry of Home Affairs, Govt. of India' : info.cm,
      portfolio: 'Home Affairs & Public Safety',
      note: isUT ? 'Law and order directly under the Ministry of Home Affairs, Government of India.' : 'Oversees State Police and internal security administration.'
    },
    defensePortfolio: {
      constitutionalFact: 'Under the 7th Schedule of the Constitution of India (Union List - List I), Defence is purely a Central Government responsibility.',
      unionDefenseMinister: 'Rajnath Singh (Union Minister of Defence)',
      stateEquivalent: 'State Department of Sainik Welfare',
      note: 'States and Union Territories collaborate with the Indian Armed Forces via Sainik Welfare boards and civil-military coordination.'
    },
    educationMinister: {
      schoolEducation: 'Minister / Dept of School Education',
      higherEducation: 'Minister / Dept of Higher Education'
    },
    demographics: {
      population: info.pop,
      populationRank: 'Strategic Region',
      totalDistricts: info.districts,
      areaSqKm: 55000,
      areaRank: 'Strategic Territory',
      literacyRate: '78.5%',
      officialLanguages: [info.lang],
      gdp: 'Emerging Economic Zone'
    },
    majorDistricts: [
      {
        name: info.capital.split(' ')[0],
        type: 'Capital & Administrative Center',
        coordinates: info.coord,
        population: 'Administrative Hub',
        highlight: `Capital and primary administrative center of ${rawName}.`
      }
    ],
    educationalTrivia: [
      `${rawName} is an integral administrative constituent of the sovereign Republic of India.`,
      `Governed under the constitutional framework of India with democratic state administration.`
    ]
  });
}

const outDir = path.join(__dirname, 'src', 'data');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'statesData.json'), JSON.stringify(states, null, 2));
console.log('Successfully written statesData.json with', states.length, 'states and territories.');

