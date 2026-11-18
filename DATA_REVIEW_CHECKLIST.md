# Quarterly Civic & Political Data Review Checklist
**Political Directory of India (rootmap-app.web.app)**  
*Standard Operating Procedure for Editorial & Cartographic Maintenance*

---

## 1. Review Cadence & Schedule

Data reviews are conducted quarterly (or within 48 hours of any State Assembly general election or gubernatorial reshuffle):

| Quarter | Review Window | Primary Focus |
|:---|:---|:---|
| **Q1** | January 1-10 | Republic Day constitutional updates, winter assembly session changes |
| **Q2** | April 1-10 | Spring state assembly election outcomes, fiscal year demographic estimates |
| **Q3** | July 1-10 | Monsoon assembly changes, mid-year UIDAI population updates |
| **Q4** | October 1-10 | Post-election swearing-in ceremonies, annual district gazette reconciliation |

---

## 2. Core Verification Checklist

### A. Executive Leadership (Chief Ministers, Governors & Administrators)
- [ ] **Chief Ministers (28 States + 3 UTs with Legislature: Delhi, Puducherry, Jammu & Kashmir)**:
  - Check official Chief Minister's Office (CMO) portal (`<state>.gov.in`).
  - Verify full official name, political party, and swearing-in date.
  - Record the official swearing-in notification URL from the State Information Commission or Raj Bhavan portal.
  - Update `asOfDate` (format: `YYYY-MM` or `Month YYYY`).
- [ ] **Governors, Lieutenant Governors & Administrators (All 36 Entities)**:
  - Check Rashtrapati Bhavan communique (`rashtrapatibhavan.gov.in`) and Ministry of Home Affairs (`mha.gov.in`).
  - Verify designations:
    - **Governor**: 28 States.
    - **Lieutenant Governor**: Delhi, Puducherry, Jammu & Kashmir, Ladakh, Andaman & Nicobar Islands.
    - **Administrator**: Chandigarh, Dadra and Nagar Haveli and Daman and Diu, Lakshadweep.
  - Verify official source URL and swearing-in / assumption of office date.
- [ ] **Deputy Chief Ministers & Cabinet Ministers**:
  - Reconcile cabinet minister portfolios against the official state council of ministers gazette.
  - Update past chief minister tenure records upon leadership transitions.

### B. Political Alliances & Coalition Classification Rule
- [ ] **Classification Rule**:
  - The ruling alliance reflects the **actual coalition sworn into government**, not merely the single largest party.
  - **NDA**: National Democratic Alliance led administrations.
  - **INDIA**: Indian National Developmental Inclusive Alliance led administrations.
  - **Regional / Other**: Specific governing coalitions (e.g. TVK Coalition in Tamil Nadu, Zoram People's Movement in Mizoram) or non-aligned state administrations.
  - **Central Admin (Hatched)**: Union Territories administered directly under the Ministry of Home Affairs without a legislative assembly.
- [ ] Maintain neutral, non-partisan color badges with small indicator chips and clear text labels. Dominant UI colors must remain editorial neutral.

### C. District Reorganization & Administrative Integrity
- [ ] **Total National Districts Target**:
  - Reconcile against Census of India, Survey of India, and official state government gazettes.
  - Current baseline: **786 Districts across 28 States and 8 Union Territories**.
- [ ] **District Attributes**:
  - District name in English and Hindi.
  - Administrative Headquarters (`hq`).
  - Revenue division or sub-region where applicable.
  - Census 2011 population figure and official specialty / GI tag tag.
  - Ensure zero duplicate district names within any individual state.

### D. Parliamentary Representation & Constitutional Seats
- [ ] **Lok Sabha (House of the People)**:
  - Total allocation must reconcile exactly to **543 directly elected seats**.
- [ ] **Rajya Sabha (Council of States)**:
  - Total elected seats must reconcile exactly to **233 elected seats** (excluding 12 nominated members).
- [ ] **Legislative Assembly (Vidhan Sabha) & Council (Vidhan Parishad)**:
  - Verify assembly seat count and bicameral status (6 states: UP, Bihar, Maharashtra, Karnataka, Andhra Pradesh, Telangana).

### E. Official Sources & Provenance Links
- [ ] Every entity demographic record must link to an official portal (`censusindia.gov.in`, `surveyofindia.gov.in`, `uidai.gov.in`, or `eci.gov.in`).
- [ ] Every leader record must contain `source` (name of official body), `sourceUrl` (valid HTTPS URL), and `asOfDate`.

---

## 3. Automated Validation & Deployment Procedure

Before committing or deploying any quarterly review updates, run the automated test suite:

```bash
# 1. Run strict data integrity validation
npm test

# 2. Re-generate sitemaps, OG images, prerendered pages, and production bundle
npm run build

# 3. Test horizontal overflow across viewports (320px to 2560px)
node scripts/test-all-viewports.cjs

# 4. Deploy to Firebase Hosting
firebase deploy --only hosting

# 5. Verify live deployment
node scripts/verify-live-deployment.cjs
```

---

## 4. Reporting & Incident Handling

- User reports submitted via the "Report a correction" modal are stored and audited during the quarterly cycle.
- Factual corrections affecting active constitutional offices must be verified and published within **24 hours**.
