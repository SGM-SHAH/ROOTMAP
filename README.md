# Political Directory of India (ROOTMAP)
*A Non-Partisan Administrative Atlas & Civic Reference of the Republic of India*

[![Live Production](https://img.shields.io/badge/Production-rootmap--app.web.app-blue.svg)](https://rootmap-app.web.app/)
[![License: Data.gov.in](https://img.shields.io/badge/License-OGD_India-green.svg)](https://data.gov.in/)
[![Integrity Validation](https://img.shields.io/badge/Data_Integrity-100%25_Reconciled-emerald.svg)](scripts/validate-data.cjs)

An editorial-quality, non-partisan administrative atlas and civic directory documenting the **28 States and 8 Union Territories** of India. Built with React 19, Tailwind CSS, Vite, and D3 Geo, providing verified constitutional profiles, executive leadership records, 786 administrative districts, and demographic metrics compiled directly from official government sources.

---

## Key Highlights

- **28 States & 8 Union Territories**: Derived dynamically from official records (Census of India, Survey of India, and Election Commission of India).
- **Interactive Choropleth India Map**: Built with D3 Geo and responsive SVG. Supports metric coloring by Ruling Alliance, Population, Area, and Literacy Rate, plus a high-contrast Enclaves/Islands Inset panel.
- **786 Administrative Districts**: Full roster of all 786 districts with official headquarters, division/zone categorization, specialty/GI tags, and localized search.
- **Executive Leadership & Cabinets**: Chief Ministers, Governors, Lt. Governors, Administrators, and Council of Ministers with official swearing-in dates, per-field source URLs, and "as of" dates.
- **Side-by-Side State Comparison**: Pick 2-3 states or UTs for side-by-side comparative analysis of demographics, legislature size, and representation.
- **Bilingual Interface**: Seamless instant toggle between English and Hindi (हिन्दी) across all 36 entities, tabs, and filters.
- **Crawlable SEO & Social Sharing**: Pre-rendered crawlable entry URLs (`/state/:slug` and `/ut/:slug`) with JSON-LD structured data (`Place` & `GovernmentOrganization`) and auto-generated 1200x630 Open Graph preview cards.
- **Accessible & Responsive**: Fully responsive across mobile (320px), tablet (768px), desktop (1280px-1920px), and ultrawide (2560px), with keyboard navigation, screen reader table alternative, and light/dark theme contrast.

---

## Project Structure

```
ROOTMAP/
├── public/                      # Static assets served as-is
│   ├── data/
│   │   └── india-states.json    # India boundary GeoJSON
│   ├── og/                      # Pre-generated 1200x630 OG preview cards
│   ├── favicon.svg              # Vector Ashoka Chakra icon
│   ├── robots.txt               # Crawler directives
│   ├── sitemap.xml              # 36 entity + index XML sitemap
│   └── sw.js                    # Service worker for offline caching & instant updates
├── src/
│   ├── components/
│   │   ├── Header.jsx           # Editorial header, search, bilingual toggle, trust modal
│   │   ├── IndiaMapView.jsx     # SVG choropleth map, color-by, legend & UT insets
│   │   ├── StateList.jsx        # Categorized master list (States vs UTs) with filter pills
│   │   ├── StateDetailView.jsx  # Dossier with tabs (Districts, Cabinet, Demographics, Notes)
│   │   ├── CompareModal.jsx     # Side-by-side 2-3 state comparative analysis matrix
│   │   ├── TrustModals.jsx      # Methodology, Changelog, and Report a Correction modals
│   │   ├── ConstitutionalModal.jsx # Seventh Schedule educational explainer (Union/State/Concurrent)
│   │   ├── DistrictSpecialModal.jsx# District specialty and GI tag modal
│   │   └── MobileBottomNav.jsx  # Thumb-friendly mobile navigation bar
│   ├── data/
│   │   └── statesData.json      # Typed database of all 36 entities, 786 districts & leaders
│   ├── App.jsx                  # Root state management, hash/slug routing & view switching
│   └── main.jsx                 # Entry point with StrictMode and error boundary
├── scripts/
│   ├── validate-data.cjs        # Strict automated test suite (npm test)
│   ├── generate-og-images.cjs   # Headless Chrome script generating 1200x630 cards
│   ├── generate-prerendered-pages.cjs # Generates static HTML for /state and /ut routes
│   ├── generate-sitemap.cjs     # Updates XML sitemap
│   └── test-all-viewports.cjs   # Chrome CDP test across 32 viewport/zoom combinations
├── DATA_REVIEW_CHECKLIST.md     # Quarterly editorial audit standard operating procedure
└── standalone.html              # Portable offline bundle
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
git clone <repo-url>
cd ROOTMAP
npm install
```

### Development Server
```bash
npm run dev
```
Starts Vite local server at `http://localhost:3000`.

### Data Integrity Validation
```bash
npm test
```
Validates entity counts (28 States, 8 UTs, 786 Districts), parliamentary seats (543 Lok Sabha, 233 Rajya Sabha), and enforces that every leader entry has a valid HTTPS source URL and `asOfDate`.

### Production Build
```bash
npm run build
```
Executes the full pipeline:
1. Generates `sitemap.xml`
2. Pre-renders 1200x630 Open Graph preview images
3. Vite bundle minification and tree shaking
4. Pre-renders crawlable static HTML files for all 36 entities
5. Creates the single-file offline bundle `standalone.html`

### Deployment
```bash
npm run deploy
```
Runs data validation, executes production build, and deploys to Firebase Hosting.

---

## Data Provenance & Methodology

All statistical, demographic, and constitutional figures are reconciled against official Government of India repositories:

- **Demographics & Literacy**: Census of India, Office of the Registrar General & Census Commissioner.
- **Population Projections**: Unique Identification Authority of India (UIDAI) 2024 Estimates.
- **Cartographic Boundaries & Areas**: Survey of India, Department of Science & Technology.
- **Parliamentary & Assembly Allocations**: Delimitation Commission & Election Commission of India (ECI).
- **Executive Leadership & Gazettes**: Chief Minister's Offices (CMO), Raj Bhavan portals, Rashtrapati Bhavan communiques, and Ministry of Home Affairs (MHA).

See [DATA_REVIEW_CHECKLIST.md](DATA_REVIEW_CHECKLIST.md) for the quarterly audit cycle.

---

## License

Code is open source under the MIT License. Data and administrative demarcations compiled from Government of India open data sources under the Open Government Data (OGD) Platform India.
