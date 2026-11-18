const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/statesData.json');
const states = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

// Dictionary of famous monikers and custom special things for key districts
const famousMonikers = {
  // Andhra Pradesh
  "Alluri Sitharama Raju": { moniker: "Coffee & Tribal Valleys", cat: "Nature & Wildlife", tags: ["Araku Valley Coffee", "Borra Caves", "Tribal Handicrafts"] },
  "Anakapalli": { moniker: "Jaggery Capital of Andhra", cat: "Agriculture & GI", tags: ["Bojjannakonda Buddhist Site", "Jaggery Trade Market", "Sarada River"] },
  "Ananthapuramu": { moniker: "Groundnut Heart of Rayalaseema", cat: "Agriculture & GI", tags: ["Lepakshi Veerabhadra Temple", "Thimmamma Marrimanu Banyan", "Dharmavaram Silk (GI)"] },
  "Annamayya": { moniker: "Birthplace of Saint Annamacharya", cat: "Heritage & History", tags: ["Tallapaka Heritage", "Rajampet Agricultural Belt", "Horsley Hills Gateway"] },
  "Bapatla": { moniker: "Suryalanka Coast & Agricultural Hub", cat: "Coastal & Maritime", tags: ["Suryalanka Beach", "Agricultural University", "Bhavanarayana Swamy Temple"] },
  "Chittoor": { moniker: "Mango & Granite Trade Hub", cat: "Agriculture & GI", tags: ["Totapuri Mango Orchards", "Horsley Hills Hill Station", "Kanipakam Vinayaka Temple"] },
  "Dr. B.R. Ambedkar Konaseema": { moniker: "Godavari Delta Coconut Island", cat: "Nature & Wildlife", tags: ["Godavari Backwaters", "Amalapuram Green Coconut Groves", "Antarvedi Beach Temple"] },
  "East Godavari": { moniker: "Cultural Heart of Andhra", cat: "Heritage & History", tags: ["Rajamahendravaram Cultural Capital", "Godavari Arch Bridge", "Sir Arthur Cotton Barrage"] },
  "Eluru": { moniker: "Wool Carpets & Kolleru Bird Sanctuary", cat: "Nature & Wildlife", tags: ["Kolleru Lake Wetland", "Handmade Wool-pile Carpets (GI)", "Guntupalli Buddhist Caves"] },
  "Guntur": { moniker: "Asia's Largest Red Chili Capital", cat: "Agriculture & GI", tags: ["Asia's Largest Chili Yard", "Amaravati Buddhist Stupa", "Kondaveedu Fort"] },
  "Kakinada": { moniker: "Deepwater Port & Kakinada Khaja", cat: "Coastal & Maritime", tags: ["Deepwater Seaport", "Kakinada Khaja Sweet", "Coringa Mangrove Wildlife Sanctuary"] },
  "Krishna": { moniker: "Historic Port & Kalamkari Craft", cat: "Heritage & History", tags: ["Machilipatnam Kalamkari (GI)", "Manginapudi Black Soil Beach", "Bandar Laddu (GI)"] },
  "Kurnool": { moniker: "First Capital of Andhra State (1953)", cat: "Strategic & Administrative", tags: ["Belum Caves (Second Longest in India)", "Yaganti Temple", "Oravakallu Rock Garden"] },
  "Nandyal": { moniker: "Land of Nine Nandi Temples", cat: "Spiritual & Pilgrimage", tags: ["Nava Nandi Temples", "Srisailam Sanctuary Foothills", "Mahanandi Water Springs"] },
  "NTR": { moniker: "Commercial Capital of Andhra", cat: "Industry & Tech", tags: ["Vijayawada Prakasam Barrage", "Kanaka Durga Temple", "Kondapalli Toys (GI)"] },
  "Palnadu": { moniker: "Historic Battleground of Palnadu", cat: "Heritage & History", tags: ["Kotappakonda Hill Temple", "Palnadu Limestone Reserves", "Nagarjuna Sagar Right Bank"] },
  "Parvathipuram Manyam": { moniker: "Eastern Ghats Cashew & Forest Belt", cat: "Nature & Wildlife", tags: ["Dense Sal & Teak Reserves", "Cashew Processing Units", "Janjhavati Reservoir"] },
  "Prakasam": { moniker: "Home of the Ongole Bull & Galaxy Granite", cat: "Agriculture & GI", tags: ["World-Famous Ongole Cattle Breed", "Chimakurthy Galaxy Granite", "Kothapatnam Beach"] },
  "Sri Potti Sriramulu Nellore": { moniker: "Spaceport of India & Aquaculture Hub", cat: "Strategic & Administrative", tags: ["ISRO Satish Dhawan Space Centre (Sriharikota)", "Pulicat Lake Bird Sanctuary", "Nellore Rice & Shrimp Farming"] },
  "Sri Sathya Sai": { moniker: "Global Spiritual Center & Lepakshi", cat: "Spiritual & Pilgrimage", tags: ["Prasanthi Nilayam (Puttaparthi)", "Lepakshi Monolithic Nandi & Hanging Pillar", "Penukonda Fort"] },
  "Srikakulam": { moniker: "Arasavalli Sun Temple & Khadi Land", cat: "Heritage & History", tags: ["Arasavalli Sun God Temple", "Ponduru Fine Khadi (GI)", "Nagavali River Basin"] },
  "Tirupati": { moniker: "Spiritual Epicenter of Venkateswara", cat: "Spiritual & Pilgrimage", tags: ["Tirumala Venkateswara Temple", "Chandragiri Fort", "Electronic Manufacturing Cluster"] },
  "Visakhapatnam": { moniker: "The Jewel of the East Coast", cat: "Coastal & Maritime", tags: ["Eastern Naval Command HQ", "Visakhapatnam Port & Steel Plant", "Kailasagiri & Rishikonda Beach"] },
  "Vizianagaram": { moniker: "City of Victory & Classical Music", cat: "Heritage & History", tags: ["Vizianagaram Fort & Moti Mahal", "Classical Music Gurukulam", "Bobbili Veena (GI)"] },
  "West Godavari": { moniker: "Aquaculture Capital of India", cat: "Agriculture & GI", tags: ["Bhimavaram Aqua Export Hub", "Somarama Pancharama Temple", "Fertile Paddy Tracts"] },
  "YSR Kadapa": { moniker: "Grand Canyon of India & Barytes Hub", cat: "Heritage & History", tags: ["Gandikota Gorge (Grand Canyon of India)", "Mangampeta Barytes Mines", "Ameen Peer Dargah"] },

  // Karnataka
  "Bengaluru Urban": { moniker: "Silicon Valley of India", cat: "Industry & Tech", tags: ["Global IT & Aerospace Hub", "Lalbagh Botanical Garden", "Vidhana Soudha"] },
  "Bengaluru Rural": { moniker: "Kempegowda International Gateway", cat: "Industry & Tech", tags: ["Kempegowda Airport Corridor", "Devanahalli Fort", "Nandi Valley Wine Estates"] },
  "Chikkamagaluru": { moniker: "Coffee Land of India", cat: "Agriculture & GI", tags: ["Birthplace of Indian Coffee (Bababudan)", "Mullayanagiri (Highest Peak in Karnataka)", "Kudremukh National Park"] },
  "Kodagu": { moniker: "Scotland of India", cat: "Nature & Wildlife", tags: ["Talakaveri (Kaveri River Source)", "Coorg Arabica Coffee (GI)", "Nagarhole Tiger Reserve"] },
  "Mysuru": { moniker: "Heritage & Cultural Capital", cat: "Heritage & History", tags: ["Mysore Palace (UNESCO Heritage)", "Mysore Silk & Sandalwood Oil (GI)", "Chamundi Hill & Dasara"] },
  "Hassan": { moniker: "Cradle of Hoysala Architecture", cat: "Heritage & History", tags: ["Belur & Halebeedu Hoysala Temples (UNESCO)", "Shravanabelagola Gommateshwara", "ISRO Master Control Facility"] },
  "Bagalkot": { moniker: "Cradle of Temple Architecture", cat: "Heritage & History", tags: ["Pattadakal (UNESCO World Heritage)", "Badami Rock-cut Cave Temples", "Ilkal Saree (GI)"] },
  "Ballari": { moniker: "Monolithic Rock Fort & Iron City", cat: "Industry & Tech", tags: ["Ballari Monolithic Rock Fort", "Toranagallu JSW Steel Plant", "Iron Ore Belts"] },
  "Belagavi": { moniker: "Second Legislative Capital & Foundry Hub", cat: "Strategic & Administrative", tags: ["Suvarna Vidhana Soudha", "Gokak Falls", "Belagavi Kunda Sweet"] },
  "Bidar": { moniker: "Crown of Karnataka & Bidriware Hub", cat: "Heritage & History", tags: ["Bidar Fort & Bahmani Tombs", "Bidriware Metal Inlay (GI)", "Guru Nanak Jhira Sahib"] },
  "Chitradurga": { moniker: "Fort of Seven Rounds (Kallina Kote)", cat: "Heritage & History", tags: ["Chitradurga Seven-tiered Fort", "Wind Energy Windmills", "Chandravalli Caves"] },
  "Dakshina Kannada": { moniker: "Cradle of Indian Banking", cat: "Coastal & Maritime", tags: ["New Mangalore Port", "Panambur Beach", "Birthplace of 4 Major Banks"] },
  "Davanagere": { moniker: "Manchester of Karnataka", cat: "Industry & Tech", tags: ["Davanagere Benne Dosa (Iconic)", "Cotton & Textile Mills", "Harihar Harihareshwara Temple"] },
  "Dharwad": { moniker: "Cultural Twin City & Educational Capital", cat: "Heritage & History", tags: ["Dharwad Peda (GI)", "Karnataka University", "Hubballi Railway Junction"] },
  "Gadag": { moniker: "Western Chalukyan Temple Hub", cat: "Heritage & History", tags: ["Trikuteshwara Temple", "Lakkundi Temple Complex", "Birthplace of Co-operative Movement"] },
  "Haveri": { moniker: "Land of Byadgi Chilies", cat: "Agriculture & GI", tags: ["Byadgi Red Chili (GI)", "Saint Shishunala Sharif Heritage", "Chaudayyadanapura Temple"] },
  "Kalaburagi": { moniker: "Tur Dal Capital & Sufi Heritage", cat: "Spiritual & Pilgrimage", tags: ["Gulbarga Fort & Jama Masjid", "Khwaja Bande Nawaz Dargah", "Kalaburagi Red Gram (GI)"] },
  "Kolar": { moniker: "Land of Gold & Silk", cat: "Industry & Tech", tags: ["Historic Kolar Gold Fields (KGF)", "Major Mulberry Silk Producer", "Kolaramma Temple"] },
  "Koppal": { moniker: "Rice City & Kinhal Woodcraft", cat: "Heritage & History", tags: ["Kinhal Wooden Toys (GI)", "Anegundi (Pre-Hampi Cradle)", "Tungabhadra Dam Canal"] },
  "Mandya": { moniker: "Sugar City of Karnataka", cat: "Agriculture & GI", tags: ["KRS Dam & Brindavan Gardens", "Ranganathittu Bird Sanctuary", "Sugar Mills & Jaggery"] },
  "Raichur": { moniker: "Doab of Krishna and Tungabhadra", cat: "Heritage & History", tags: ["Raichur Thermal Power Station", "Historic Raichur Fort", "Cotton & Paddy Doab"] },
  "Ramanagara": { moniker: "Silk City & Sholay Rock Hills", cat: "Nature & Wildlife", tags: ["Ramanagara Boulders (Sholay Film Site)", "Asia's Largest Silk Cocoon Market", "Janapada Loka Folk Museum"] },
  "Shivamogga": { moniker: "Gateway to the Western Ghats", cat: "Nature & Wildlife", tags: ["Jog Falls (Second Highest Plunge in India)", "Sharavathi Valley Reserve", "Kuvempu Kuppalli Memorial"] },
  "Tumakuru": { moniker: "Kalpataru Nadu (Land of Coconuts)", cat: "Agriculture & GI", tags: ["Devarayanadurga Hill Shrine", "Siddaganga Matha", "Industrial Smart City"] },
  "Udupi": { moniker: "Temple Town & Krishna Mutt", cat: "Spiritual & Pilgrimage", tags: ["Udupi Sri Krishna Temple", "St. Mary's Island Basaltic Rocks", "Malpe Beach & Port"] },
  "Uttara Kannada": { moniker: "Gokarna Coast & Dandeli Forests", cat: "Nature & Wildlife", tags: ["Gokarna Om Beach & Mahabaleshwar", "Dandeli River Rafting Reserve", "Kaiga Nuclear Power Station"] },
  "Vijayanagara": { moniker: "Cradle of the Vijayanagara Empire", cat: "Heritage & History", tags: ["Hampi UNESCO World Heritage Site", "Virupaksha Temple & Stone Chariot", "Tungabhadra River Basin"] },
  "Yadgir": { moniker: "Land of Vast Limestone Reserves", cat: "Industry & Tech", tags: ["Yadgir Hill Fort", "Shorapur Fort & British Treaty Site", "Wadi Cement Cluster"] },

  // Maharashtra
  "Mumbai City": { moniker: "Financial Capital of India", cat: "Industry & Tech", tags: ["Bombay Stock Exchange (BSE)", "Gateway of India", "Marine Drive & Colaba"] },
  "Mumbai Suburban": { moniker: "Bollywood & Suburban Metropolis", cat: "Industry & Tech", tags: ["Sanjay Gandhi National Park & Kanheri Caves", "Film City (Bollywood)", "Bandra-Worli Sea Link"] },
  "Pune": { moniker: "Oxford of the East & IT Engine", cat: "Industry & Tech", tags: ["Shaniwar Wada & Aga Khan Palace", "Automotive SEZ & Hinjawadi IT Park", "Sinhagad Fort"] },
  "Nagpur": { moniker: "Orange City & Zero Mile Center", cat: "Agriculture & GI", tags: ["Nagpur Mandarin Oranges (GI)", "Zero Mile Stone (Geographical Center)", "Deekshabhoomi Buddhist Monument"] },
  "Nashik": { moniker: "Wine Capital of India & Kumbh Mela", cat: "Spiritual & Pilgrimage", tags: ["Trimbakeshwar Jyotirlinga", "Panchavati & Godavari Ghats", "Sula Vineyards & Nashik Grapes (GI)"] },
  "Chhatrapati Sambhajinagar": { moniker: "Tourism Capital of Maharashtra", cat: "Heritage & History", tags: ["Ajanta & Ellora Caves (UNESCO World Heritage)", "Bibi Ka Maqbara (Taj of Deccan)", "Daulatabad Fort & Himroo Shawls"] },
  "Kolhapur": { moniker: "City of Wrestlers & Mahalaxmi", cat: "Heritage & History", tags: ["Shri Ambabai Mahalaxmi Temple", "Kolhapuri Chappal (GI)", "Panhala Hill Fort"] },
  "Solapur": { moniker: "Textile Capital & Pandharpur Gateway", cat: "Industry & Tech", tags: ["Solapuri Chaddar & Towels (GI)", "Pandharpur Vitthal Temple", "Great Indian Bustard Sanctuary"] },
  "Thane": { moniker: "City of Lakes & Industrial Hub", cat: "Industry & Tech", tags: ["Upvan Lake & Masunda Lake", "First Passenger Railway Terminus (1853)", "Wagle Industrial Estate"] },
  "Raigad": { moniker: "Capital of Chhatrapati Shivaji Maharaj", cat: "Heritage & History", tags: ["Raigad Hill Fort (Coronation Site)", "Alibaug Coastal Beaches", "Jawaharlal Nehru Port (JNPT)"] },
  "Ratnagiri": { moniker: "Alphonso Mango Capital", cat: "Coastal & Maritime", tags: ["Hapus (Alphonso Mango GI)", "Ganpatipule Beach Temple", "Thibaw Palace & Jaigad Fort"] },
  "Sindhudurg": { moniker: "First Tourism District of Maharashtra", cat: "Coastal & Maritime", tags: ["Sindhudurg Ocean Fort (Built by Shivaji)", "Tarkarli Coral Reef Scuba", "Sawantwadi Wooden Toys (GI)"] },
  "Satara": { moniker: "Valley of Flowers of the Deccan", cat: "Nature & Wildlife", tags: ["Kaas Plateau (UNESCO Biosphere)", "Mahabaleshwar & Panchgani Hill Stations", "Ajinkyatara Fort"] },
  "Ahmednagar": { moniker: "Largest District & Shirdi Shrine", cat: "Spiritual & Pilgrimage", tags: ["Shirdi Sai Baba Temple", "Ahmednagar Fort", "Asia's First Cooperative Sugar Mill"] },
  "Chandrapur": { moniker: "City of Black Gold & Tiger Capital", cat: "Nature & Wildlife", tags: ["Tadoba-Andhari Tiger Reserve", "Major Coalfields & Thermal Power", "Ballarpur Paper Mills"] },
  "Jalgaon": { moniker: "Banana City & Gold City of India", cat: "Agriculture & GI", tags: ["Jalgaon Banana (GI)", "Gold Jewellery Market", "Ajanta Gateway"] },
  "Amravati": { moniker: "Cotton City of Vidarbha & Melghat", cat: "Nature & Wildlife", tags: ["Melghat Tiger Reserve", "Historic Ambadevi Temple", "Chikhaldara Hill Station"] },

  // Uttar Pradesh
  "Agra": { moniker: "UNESCO World Heritage Epicenter", cat: "Heritage & History", tags: ["Taj Mahal (UNESCO Wonder)", "Agra Fort & Fatehpur Sikri", "Agra Petha & Leather Footwear (GI)"] },
  "Aligarh": { moniker: "Lock City of India", cat: "Industry & Tech", tags: ["Aligarh Locks & Hardware (GI)", "Aligarh Muslim University (AMU)", "Historic Aligarh Fort"] },
  "Prayagraj": { moniker: "Triveni Sangam & Maha Kumbh Capital", cat: "Spiritual & Pilgrimage", tags: ["Triveni Sangam (Ganga-Yamuna-Saraswati)", "Maha Kumbh Mela (UNESCO)", "Allahabad High Court & Fort"] },
  "Varanasi": { moniker: "Spiritual Capital of India", cat: "Spiritual & Pilgrimage", tags: ["Kashi Vishwanath Jyotirlinga", "Banarasi Silk Sarees (GI)", "Dashashwamedh Ghat & Ganga Aarti"] },
  "Lucknow": { moniker: "City of Nawabs & Chikankari", cat: "Heritage & History", tags: ["Bara Imambara & Rumi Darwaza", "Chikankari Embroidery (GI)", "State Administrative Secretariat"] },
  "Kanpur Nagar": { moniker: "Leather City of the World", cat: "Industry & Tech", tags: ["Leather Processing & Footwear Hub", "IIT Kanpur", "Historic Bithoor & Ganges Ghats"] },
  "Mathura": { moniker: "Braj Bhoomi & Krishna Janmabhoomi", cat: "Spiritual & Pilgrimage", tags: ["Krishna Janmabhoomi Temple", "Vrindavan Banke Bihari Shrine", "Goverdhan Parikrama & Mathura Peda"] },
  "Ayodhya": { moniker: "Ram Janmabhoomi & Holy Saryu", cat: "Spiritual & Pilgrimage", tags: ["Shri Ram Janmabhoomi Mandir", "Saryu River Ghats", "Hanuman Garhi & Kanak Bhawan"] },
  "Gorakhpur": { moniker: "Nath Tradition Seat & Gita Press", cat: "Heritage & History", tags: ["Gorakhnath Math", "Gita Press (World's Largest Publisher of Hindu Texts)", "Longest Railway Platform in India"] },
  "Firozabad": { moniker: "Glass City of India (Suhag Nagari)", cat: "Industry & Tech", tags: ["Glass Bangles & Glassware (GI)", "Chandelier & Handicraft Units", "Historic Jain Temples"] },
  "Kannauj": { moniker: "Perfume Capital of India (Attar City)", cat: "Agriculture & GI", tags: ["Kannauj Rose & Clay Attar (GI)", "Ancient Imperial Capital of Harsha", "Archaeological Museum"] },
  "Moradabad": { moniker: "Brass City of India (Peetal Nagari)", cat: "Industry & Tech", tags: ["Moradabad Brass Handicrafts (GI)", "Global Metalware Export Hub", "Historic Jama Masjid"] },
  "Meerut": { moniker: "Sports Goods Capital & 1857 Revolt", cat: "Industry & Tech", tags: ["Sports Equipment & Cricket Bats (GI)", "1857 Sepoy Mutiny Memorial", "Scissors Industry (GI)"] },
  "Varanasi": { moniker: "Spiritual Capital of India", cat: "Spiritual & Pilgrimage", tags: ["Kashi Vishwanath Jyotirlinga", "Banarasi Silk Sarees (GI)", "Sarnath Buddhist Deer Park"] },
  "Jhansi": { moniker: "Gateway to Bundelkhand & Rani Laxmibai", cat: "Heritage & History", tags: ["Historic Jhansi Fort", "Rani Mahal Museum", "1857 Freedom Struggle Epicenter"] },
  "Saharanpur": { moniker: "Wood Carving Capital of India", cat: "Heritage & History", tags: ["Wood Carving Handicrafts (GI)", "Shakumbhari Devi Shrine", "Paper & Agro Mills"] },
  "Mirzapur": { moniker: "Carpet City & Vindhyavasini Dham", cat: "Industry & Tech", tags: ["Mirzapur Handmade Carpets (GI)", "Maa Vindhyavasini Temple", "Chunar Stone Fort"] },
  "Bhadohi": { moniker: "Carpet City of South Asia", cat: "Industry & Tech", tags: ["Hand-knotted Mirzapur-Bhadohi Carpets (GI)", "Woolen Weaving Looms", "Export Oriented Clusters"] },

  // Tamil Nadu
  "Chennai": { moniker: "Detroit of South Asia & Cultural Capital", cat: "Industry & Tech", tags: ["Automobile Manufacturing Belt", "Marina Beach (Second Longest in World)", "UNESCO Creative City for Music"] },
  "Madurai": { moniker: "Temple City of Tamil Nadu (Athens of the East)", cat: "Spiritual & Pilgrimage", tags: ["Meenakshi Amman Temple", "Thirumalai Nayakkar Mahal", "Madurai Malli Jasmine (GI)"] },
  "Coimbatore": { moniker: "Manchester of South India", cat: "Industry & Tech", tags: ["Textile Machinery & Wet Grinder (GI)", "Isha Yoga Centre & Adiyogi", "Siruvani River (Sweetest Water)"] },
  "Kanchipuram": { moniker: "City of Thousand Temples & Silk", cat: "Spiritual & Pilgrimage", tags: ["Kanchipuram Pure Silk Sarees (GI)", "Ekambareswarar & Kailasanathar Temples", "Varadharaja Perumal Temple"] },
  "Thanjavur": { moniker: "Rice Bowl of Tamil Nadu & Chola Cradle", cat: "Heritage & History", tags: ["Brihadeeswarar Temple (UNESCO Great Living Chola)", "Tanjore Paintings & Art Plates (GI)", "Kaveri Delta Rice Granary"] },
  "Tiruchirappalli": { moniker: "Rockfort City & Kaveri Heartland", cat: "Heritage & History", tags: ["Rockfort Ucchi Pillayar Temple", "Sri Ranganathaswamy Temple Srirangam", "BHEL & NIT Trichy"] },
  "Salem": { moniker: "Steel City & Mango Capital of TN", cat: "Industry & Tech", tags: ["Salem Steel Plant (SAIL)", "Salem Malgova Mango", "Yercaud Shevaroy Hills"] },
  "Tirunelveli": { moniker: "City of Halwa & Nellaiappar", cat: "Agriculture & GI", tags: ["Tirunelveli Wheat Halwa (GI)", "Nellaiappar Temple Musical Pillars", "Manimuthar & Courtallam Falls"] },
  "Kanniyakumari": { moniker: "Land's End & Southernmost Tip of Mainland India", cat: "Coastal & Maritime", tags: ["Vivekananda Rock Memorial & Thiruvalluvar Statue", "Triveni Sangam of 3 Seas", "Sunset and Sunrise Point"] },
  "Nilgiris": { moniker: "Blue Mountains & Queen of Hill Stations", cat: "Nature & Wildlife", tags: ["Nilgiri Mountain Railway (UNESCO Toy Train)", "Nilgiri Orthodox Tea (GI)", "Ooty & Mudumalai Tiger Reserve"] },
  "Ramanathapuram": { moniker: "Sacred Island of Rameswaram", cat: "Spiritual & Pilgrimage", tags: ["Ramanathaswamy Jyotirlinga (Longest Corridor)", "Pamban Sea Bridge", "Dhanushkodi (Ghost Town & Ram Setu)"] },
  "Erode": { moniker: "Turmeric City & Textile Hub", cat: "Agriculture & GI", tags: ["Erode Turmeric (GI)", "Powerloom Textile Fabric", "Bhavani Sangameshwarar Temple"] },
  "Dindigul": { moniker: "Lock City & Biryani Capital", cat: "Industry & Tech", tags: ["Dindigul Handcrafted Locks (GI)", "Thalappakatti Biryani Origin", "Kodaikanal Princess of Hill Stations"] },

  // Rajasthan
  "Jaipur": { moniker: "Pink City & UNESCO World Heritage", cat: "Heritage & History", tags: ["Hawa Mahal & Amber Palace", "Jantar Mantar (UNESCO)", "Blue Pottery & Kundan Jewellery (GI)"] },
  "Jodhpur": { moniker: "Blue City & Sun City of India", cat: "Heritage & History", tags: ["Mehrangarh Fort Monolith", "Umaid Bhawan Palace", "Jaswant Thada & Marwar Craft"] },
  "Udaipur": { moniker: "City of Lakes & Venice of the East", cat: "Heritage & History", tags: ["Lake Pichola & City Palace", "Jag Mandir & Fateh Sagar", "Saheliyon-ki-Bari"] },
  "Jaisalmer": { moniker: "Golden City of Thar Desert", cat: "Heritage & History", tags: ["Jaisalmer Living Fort (Sonar Qila)", "Sam Sand Dunes Camel Safari", "Yellow Sandstone Havelis"] },
  "Bikaner": { moniker: "Camel Country & Bhujia Capital", cat: "Heritage & History", tags: ["Junagarh Unconquered Fort", "Bikaneri Bhujia & Rasgulla (GI)", "National Research Centre on Camel"] },
  "Ajmer": { moniker: "Holy City of Sufism & Pushkar Brahma", cat: "Spiritual & Pilgrimage", tags: ["Dargah Sharif of Khwaja Moinuddin Chishti", "Pushkar Lake & Brahma Temple", "Mayo College & Taragarh Fort"] },
  "Kota": { moniker: "Coaching Capital of India & Doria Silk", cat: "Industry & Tech", tags: ["Kota Doria Sarees (GI)", "Chambal Riverfront & Seven Wonders", "National Coaching Hub"] },
  "Sawai Madhopur": { moniker: "Tiger Capital of Rajasthan", cat: "Nature & Wildlife", tags: ["Ranthambore National Park & Tiger Reserve", "UNESCO Ranthambore Fort", "Trinetra Ganesha Temple"] },
  "Alwar": { moniker: "Tiger Reserve & Historic Forts", cat: "Heritage & History", tags: ["Sariska Tiger Reserve", "Historic Bhangarh Fort", "Neemrana Palace Fort"] },
  "Chittorgarh": { moniker: "Citadel of Rajput Valour", cat: "Heritage & History", tags: ["Chittorgarh Fort (India's Largest Fort)", "Vijay Stambha (Tower of Victory)", "Rani Padmini Palace"] },

  // Gujarat
  "Ahmedabad": { moniker: "Manchester of India & UNESCO World Heritage City", cat: "Heritage & History", tags: ["First UNESCO World Heritage City in India", "Sabarmati Ashram (Mahatma Gandhi)", "Atal Bridge & Riverfront"] },
  "Surat": { moniker: "Diamond & Textile Capital of India", cat: "Industry & Tech", tags: ["Cuts & Polishes 90% of World's Diamonds", "Surat Diamond Bourse (World's Largest Office)", "Zari Embroidery & Textile SEZ"] },
  "Vadodara": { moniker: "Cultural Capital of Gujarat (Sanskari Nagari)", cat: "Heritage & History", tags: ["Laxmi Vilas Palace (4x Size of Buckingham Palace)", "MS University of Baroda", "Statue of Unity Gateway"] },
  "Kachchh": { moniker: "Largest District in India & White Rann", cat: "Nature & Wildlife", tags: ["Great Rann of Kutch Salt Desert", "Rann Utsav Cultural Extravaganza", "Kutch Rogan Art & Embroidery (GI)"] },
  "Anand": { moniker: "Milk Capital of India (White Revolution)", cat: "Agriculture & GI", tags: ["Headquarters of AMUL & NDDB", "Cradle of the White Revolution", "National Dairy Development Board"] },
  "Jamnagar": { moniker: "Oil City & Brass Parts Capital", cat: "Industry & Tech", tags: ["World's Largest Oil Refining Complex (Reliance)", "Marine National Park (Coral Reefs)", "Brass Component Foundries"] },
  "Junagadh": { moniker: "Only Abode of Asiatic Lions in the World", cat: "Nature & Wildlife", tags: ["Gir National Park & Asiatic Lions", "Girnar Sacred Hill (9,999 Steps)", "Uparkot Ancient Fort"] },
  "Bhavnagar": { moniker: "Ship Recycling & Jain Temple Gateway", cat: "Coastal & Maritime", tags: ["Alang (World's Largest Ship Recycling Yard)", "Palitana Shatrunjaya Jain Temples", "Velavadar Blackbuck National Park"] },
  "Morbi": { moniker: "Ceramic Capital of India", cat: "Industry & Tech", tags: ["Produces 80%+ of India's Ceramic Tiles", "Ajanta Wall Clocks", "Machchhu River Suspension Heritage"] },
  "Patan": { moniker: "Rani Ki Vav & Patola Silk City", cat: "Heritage & History", tags: ["Rani Ki Vav Stepwell (UNESCO World Heritage)", "Double Ikat Patan Patola Silk (GI)", "Ancient Capital of Chavda Kings"] },

  // West Bengal
  "Kolkata": { moniker: "City of Joy & Cultural Capital of India", cat: "Heritage & History", tags: ["Victoria Memorial & Howrah Bridge", "Durga Puja (UNESCO Intangible Heritage)", "Mother House & Kalighat"] },
  "Darjeeling": { moniker: "Queen of the Hills & Champagne of Tea", cat: "Nature & Wildlife", tags: ["Darjeeling Himalayan Railway (UNESCO Toy Train)", "Darjeeling Tea (First GI Tag of India)", "Tiger Hill Kanchenjunga Sunrise"] },
  "South 24 Parganas": { moniker: "Sundarbans Delta & Royal Bengal Tigers", cat: "Nature & Wildlife", tags: ["Sundarbans Mangrove Biosphere (UNESCO)", "Royal Bengal Tiger Habitat", "Gangasagar Pilgrimage Mela"] },
  "Murshidabad": { moniker: "Historic Capital of the Bengal Nawabs", cat: "Heritage & History", tags: ["Hazarduari Palace (Palace with 1,000 Doors)", "Historic Battle of Plassey Site", "Murshidabad Silk Sarees"] },
  "Purba Medinipur": { moniker: "Digha Coast & Haldia Industrial Port", cat: "Coastal & Maritime", tags: ["Digha & Mandarmani Beaches", "Haldia Petrochemical Seaport", "Tamluk Ancient Copper Port (Tamralipta)"] },
  "Birbhum": { moniker: "Land of Red Soil & Shantiniketan", cat: "Heritage & History", tags: ["Santiniketan (Rabindranath Tagore's UNESCO Site)", "Tarapith Tantric Shrine", "Baul Folk Music Tradition"] },

  // Kerala
  "Alappuzha": { moniker: "Venice of the East & Backwaters", cat: "Coastal & Maritime", tags: ["Vembanad Lake Backwater Houseboats", "Nehru Trophy Snake Boat Race", "Coir Carpet Industry"] },
  "Wayanad": { moniker: "Spice Garden & Neolithic Edakkal Caves", cat: "Nature & Wildlife", tags: ["Edakkal Prehistoric Rock Engravings", "Banasura Sagar Dam (Largest Earthen Dam)", "Wayanad Robusta Coffee (GI)"] },
  "Idukki": { moniker: "Spice Hills & Arch Dam Wonder", cat: "Nature & Wildlife", tags: ["Idukki Hydroelectric Arch Dam", "Eravikulam National Park (Nilgiri Tahr)", "Munnar Tea Estates & Anamudi Peak"] },
  "Thrissur": { moniker: "Cultural Capital of Kerala", cat: "Heritage & History", tags: ["Thrissur Pooram (Mother of all Festivals)", "Vadakkunnathan Temple", "Kerala Kalamandalam Performing Arts"] },
  "Kozhikode": { moniker: "City of Spices & UNESCO City of Literature", cat: "Heritage & History", tags: ["First UNESCO City of Literature in India", "Kappad Beach (Vasco da Gama Landed 1498)", "Kozhikode Halwa & Malabar Cuisine"] },
  "Kollam": { moniker: "Cashew Capital of the World", cat: "Industry & Tech", tags: ["Ashtamudi Lake (Gateway to Backwaters)", "World's Premier Cashew Processing Hub", "Historic Port of Quilon"] },
  "Thiruvananthapuram": { moniker: "Capital City & Padmanabhaswamy Treasury", cat: "Spiritual & Pilgrimage", tags: ["Sree Padmanabhaswamy Temple (Richest Shrine)", "Kovalam Beach", "Vikram Sarabhai Space Centre (VSSC)"] }
};

// Auto category detection rules based on keywords
function detectCategory(name, highlight) {
  const text = (name + " " + highlight).toLowerCase();
  
  if (text.includes('temple') || text.includes('shrine') || text.includes('dargah') || text.includes('pilgrim') || text.includes('spiritual') || text.includes('jyotirlinga') || text.includes('kumbh') || text.includes('gurudwara') || text.includes('monastery') || text.includes('buddhist')) {
    return "Spiritual & Pilgrimage";
  }
  if (text.includes('unesco') || text.includes('heritage') || text.includes('fort') || text.includes('palace') || text.includes('historic') || text.includes('ancient') || text.includes('monument') || text.includes('chola') || text.includes('mughal') || text.includes('dynasty') || text.includes('archaeolog')) {
    return "Heritage & History";
  }
  if (text.includes('national park') || text.includes('tiger') || text.includes('wildlife') || text.includes('sanctuary') || text.includes('lake') || text.includes('river') || text.includes('valley') || text.includes('hills') || text.includes('falls') || text.includes('cave') || text.includes('forest') || text.includes('biosphere') || text.includes('peak')) {
    return "Nature & Wildlife";
  }
  if (text.includes('port') || text.includes('coastal') || text.includes('beach') || text.includes('naval') || text.includes('seaport') || text.includes('maritime') || text.includes('island')) {
    return "Coastal & Maritime";
  }
  if (text.includes('industry') || text.includes('steel') || text.includes('refinery') || text.includes('power') || text.includes('textile') || text.includes('mining') || text.includes('coal') || text.includes('cement') || text.includes('plant') || text.includes('it ') || text.includes('lock') || text.includes('brass') || text.includes('glass') || text.includes('leather')) {
    return "Industry & Tech";
  }
  if (text.includes('coffee') || text.includes('tea') || text.includes('chili') || text.includes('paddy') || text.includes('mango') || text.includes('spices') || text.includes('cotton') || text.includes('silk') || text.includes('sugar') || text.includes('agricultur') || text.includes('produce') || text.includes('orange') || text.includes('turmeric') || text.includes('jute')) {
    return "Agriculture & GI";
  }
  return "Strategic & Administrative";
}

// Extract smart clean tags from highlight
function extractSpecialties(districtName, highlight) {
  if (!highlight) return [districtName + " Administrative Center"];

  // Split clauses
  const chunks = highlight.split(/[,;]| and /)
    .map(c => c.trim().replace(/\.$/, ''))
    .filter(c => c.length > 3 && !c.toLowerCase().startsWith('carved in') && !c.toLowerCase().startsWith('created in'));

  // Clean chunks into crisp readable tag strings
  let tags = [];
  chunks.forEach(chunk => {
    let clean = chunk.replace(/^home to /i, '')
                     .replace(/^famous for /i, '')
                     .replace(/^known for /i, '')
                     .replace(/^renowned for /i, '')
                     .replace(/^birthplace of /i, 'Birthplace of ')
                     .replace(/^seat of /i, 'Seat of ');
    clean = clean.charAt(0).toUpperCase() + clean.slice(1);
    if (clean.length > 4 && clean.length < 65 && !tags.includes(clean)) {
      tags.push(clean);
    }
  });

  if (tags.length === 0) {
    tags.push(districtName + " HQ & Administrative Division");
  }

  return tags.slice(0, 3);
}

// Generate an engaging, authentic "special things" moniker or superlative
function generateMoniker(districtName, hq, division, category, highlight, stateName) {
  const hLower = (highlight || '').toLowerCase();

  if (hLower.includes('unesco')) return "UNESCO World Heritage Site";
  if (hLower.includes('tiger reserve') || hLower.includes('national park')) return "Wildlife & Tiger Conservation Belt";
  if (hLower.includes('capital')) return `${stateName} Administrative Hub`;
  if (hLower.includes('first sunrise')) return "First Sunrise in India (Dong)";
  if (hLower.includes('least densely')) return "Least Densely Populated District (1/km²)";
  if (hLower.includes('largest district')) return "Largest District by Area";
  if (hLower.includes('smallest district')) return "Smallest District by Area";
  if (hLower.includes('tea')) return "Tea Cultivation & Estate Valley";
  if (hLower.includes('coffee')) return "Coffee Plantation Hills";
  if (hLower.includes('silk')) return "Traditional Silk Weaving Center";
  if (hLower.includes('port')) return "Maritime Port & Trade Gateway";
  if (hLower.includes('dam')) return "Hydroelectric & Irrigation Dam Hub";
  if (hLower.includes('caves')) return "Ancient Rock-Cut Caves";
  if (hLower.includes('falls')) return "Waterfalls & Highland Tourism";
  if (hLower.includes('temple')) return "Historic Pilgrimage & Temple Center";
  if (hLower.includes('fort')) return "Historic Hilltop Fort & Citadel";
  if (hLower.includes('border') || hLower.includes('line of control') || hLower.includes('frontier')) return "Strategic Frontier & Border District";
  if (hLower.includes('coal') || hLower.includes('iron') || hLower.includes('mineral')) return "Mineral Wealth & Resource Hub";
  if (hLower.includes('textile') || hLower.includes('cotton')) return "Textile & Handloom Craft Center";

  // Category based defaults
  switch (category) {
    case 'Spiritual & Pilgrimage': return "Spiritual Heritage & Pilgrimage Shrine";
    case 'Heritage & History': return "Historic Architecture & Cultural Heritage";
    case 'Nature & Wildlife': return "Natural Forest Reserves & Biodiversity";
    case 'Coastal & Maritime': return "Coastal Heartland & Maritime Fishery";
    case 'Industry & Tech': return "Industrial & Manufacturing Hub";
    case 'Agriculture & GI': return "Fertile Agricultural & Cash Crop Belt";
    default: return `${division || stateName} Administrative Heartland`;
  }
}

let enrichedCount = 0;
let customMonikerCount = 0;

states.forEach(state => {
  const stateName = state.name;
  if (!state.districts) return;

  state.districts.forEach(d => {
    enrichedCount++;
    const known = famousMonikers[d.name];

    if (known) {
      customMonikerCount++;
      d.category = known.cat;
      d.knownAs = known.moniker;
      d.specialties = known.tags;
    } else {
      d.category = detectCategory(d.name, d.highlight || '');
      d.knownAs = generateMoniker(d.name, d.hq, d.division, d.category, d.highlight || '', stateName);
      d.specialties = extractSpecialties(d.name, d.highlight || '');
    }

    // Add a curated specialSummary
    d.specialSummary = `${d.knownAs}: ${d.highlight || `${d.name} is a key administrative district headquartered at ${d.hq}.`}`;
  });
});

console.log(`Enriched ${enrichedCount} districts across ${states.length} states/UTs.`);
console.log(`Applied custom premium monikers to ${customMonikerCount} major districts.`);

// Save back to statesData.json
fs.writeFileSync(dataFilePath, JSON.stringify(states, null, 2), 'utf8');
console.log('Saved updated statesData.json successfully!');
