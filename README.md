# NutriChild-Seva

> **AI-Powered Child Nutrition & Health Monitoring System**
> Designed for Rural India, Tribal Communities, Low-Literacy Families, ASHA & Anganwadi Workers, Doctors, and Government Health Officers.

---

## 🌟 Overview & Mission

NutriChild+ is a **voice-first, offline-capable modular monolithic healthcare platform** engineered to combat childhood malnutrition, stunting, wasting, severe acute malnutrition (SAM), anemia, and preventable child mortality across rural and tribal districts.

### Core Personas Supported
1. **Parents / Mothers**: Visual audio guidance in regional languages, digital QR health card, vaccine alerts, SOS ambulance shortcut.
2. **ASHA Workers**: Field registration, door-to-door growth assessments (weight, height, MUAC arm tape, hemoglobin), offline sync.
3. **Anganwadi Workers (AWW)**: Poshan Abhiyaan Take-Home Ration (THR) monitoring, hot cooked meal planning, Village Health Sanitation and Nutrition Day (VHSND).
4. **Medical Officers (Doctors)**: Clinical triage, SAM/MAM inpatient referral, Nutrition Rehabilitation Centre (NRC) tracking.
5. **Government Health Officers (CDPO)**: Block/village-level malnutrition heatmaps, stunting/wasting indicators, vaccination coverage analytics.
6. **Administrators**: System auditing, role-based access control, security logs.

---

## 🏛️ Architecture: Modular Monolith

NutriChild+ is built as a single, highly-cohesive **Modular Monolith**:
- **Backend**: Spring Boot 3.4.x (Java 21/24) with Spring Data JPA, Spring Security (JWT / BCrypt), embedded H2 (with PostgreSQL production driver), and WHO Child Growth Standards engine.
- **Frontend**: Progressive Web App (PWA) built with React, Vite, and Tailwind CSS.
- **Offline Storage**: Dexie.js (IndexedDB) with local synchronization queue and automatic retry on network reconnection.
- **Voice Engine**: Web Speech API with regional Indian language voices (Hindi, Odia, Marathi, Bengali, Telugu, Tamil, English).
- **AI Engine**: Google Gemini API-compatible voice assistant and food plate image nutritional analyzer.

```
c:\NutriChild\
├── backend/
│   ├── src/main/java/org/nutrichild/
│   │   ├── config/          # SecurityConfig, JwtTokenProvider, DataInitializer
│   │   ├── model/           # Child, GrowthRecord, VaccinationRecord, User, HealthCenter, GovtScheme
│   │   ├── repository/      # Spring Data JPA Repositories
│   │   ├── service/         # WHO Growth Engine, UIP Vaccines, Nutrition Planner, GPS Locator, Sync
│   │   └── controller/      # REST API Controllers (Auth, Child, Growth, Vaccines, Schemes, Analytics, Sync)
│   ├── pom.xml              # Maven configuration
│   └── mvnw.cmd             # Maven Wrapper
└── frontend/
    ├── src/
    │   ├── components/      # ChildCard, GrowthModal, QRModal, VaccineModal, VoiceModal, CommunityDashboard
    │   ├── data/            # Multilingual dictionaries (Hindi, Odia, Marathi, Telugu, Tamil, Bengali, English)
    │   ├── services/        # Offline Dexie DB, Web Speech STT/TTS, API Client
    │   ├── App.tsx          # Master application layout
    │   └── main.tsx         # Root mounting
    └── vite.config.ts       # Reverse proxy to backend on port 8080
```

---

## 🚦 Traffic Light Health Risk Matrix

NutriChild+ employs an accessible traffic light color system:
- 🟢 **Green (Healthy)**: Normal growth parameters (HAZ, WAZ, WHZ within ±2 SD), timely vaccinations.
- 🟡 **Yellow (Moderate Risk)**: Mild underweight or mild anemia (Hb 10.0-10.9 g/dL).
- 🟠 **Orange (High Risk / MAM)**: Moderate Acute Malnutrition (MUAC 11.5 - 12.4 cm) or moderate anemia (Hb 7.0 - 9.9 g/dL).
- 🔴 **Red (Critical SAM)**: Severe Acute Malnutrition (MUAC < 11.5 cm), bilateral pitting edema (Kwashiorkor), or severe anemia (Hb < 7.0 g/dL) -> **Immediate NRC / Medical Officer Referral**.

---

## 🚀 Running the System Locally

### Prerequisites
- Java 21 or Java 24
- Node.js v20+ and npm

### 1. Start Spring Boot Monolithic Backend (Port 8080)
```powershell
cd c:\NutriChild\backend
$env:JAVA_HOME = "C:\Program Files\Java\jdk-24"
.\mvnw.cmd spring-boot:run
```
*Backend is accessible at `http://localhost:8080` (H2 Console: `http://localhost:8080/h2-console`)*

### 2. Start React PWA Frontend (Port 3000)
```powershell
cd c:\NutriChild\frontend
npm run dev
```
*Frontend is accessible at `http://localhost:3000` (automatically proxies API requests to backend).*

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/children` | List all children with latest WHO growth & vaccine flags |
| `POST` | `/api/v1/children` | Register new child (auto-generates UIP vaccine timeline & QR token) |
| `GET` | `/api/v1/children/qr/{token}` | Instant lookup via QR health card scan |
| `POST` | `/api/v1/growth/assess` | WHO vitals assessment (weight, height, MUAC, Hb, edema) |
| `GET` | `/api/v1/vaccinations/child/{id}` | National Universal Immunization Programme status |
| `POST` | `/api/v1/vaccinations/{id}/administer` | Mark vaccine administered with batch details |
| `GET` | `/api/v1/nutrition/recommend/{childId}`| Culturally tailored nutrition & Take-Home Ration guidance |
| `POST` | `/api/v1/ai/voice-assist` | Gemini AI voice assistant response with safety disclaimers |
| `POST` | `/api/v1/ai/food-analyze` | Visual plate analyzer estimating calories & protein |
| `POST` | `/api/v1/sync/batch` | Idempotent offline batch synchronization engine |
| `GET` | `/api/v1/healthcenters/nearest` | GPS distance locator for Sub-Centres, PHCs, CHCs, and NRCs |
| `GET` | `/api/v1/schemes/check/{childId}` | Matches child against POSHAN 2.0, PMMVY, Anemia Mukt Bharat |
| `GET` | `/api/v1/analytics/dashboard` | Community malnutrition heatmaps for CDPO & Health Officers |

---

## 🔒 Safety and Medical Ethics Rules
- **Non-Diagnostic**: NutriChild+ explicitly states that AI suggestions are educational and aligned with WHO / POSHAN guidelines, never replacing clinical medical diagnosis.
- **Fail-Safe Offline**: If network connectivity drops in deep rural/tribal areas, all registrations and growth records remain encrypted in local IndexedDB and sync automatically upon reconnection.
- **Emergency Shortcut**: 1-tap dialer for 108 Ambulance and 102 Helpline is always visible on every screen.
