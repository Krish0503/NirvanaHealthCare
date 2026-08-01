# 🧘‍♂️ Nirvana HealthCare

**Nirvana HealthCare** is a modern, full-stack AI-powered telemedicine and healthcare management web platform. It connects patients with healthcare providers, enables real-time symptom analysis using machine learning, manages patient records & appointments, facilitates virtual consultations, and helps locate nearby medical centers.

---

## 🌐 Live Application Links

- 🚀 **Frontend Application (Vercel):** [https://nirvana-healthcare.vercel.app/](https://nirvana-healthcare.vercel.app/)
- ⚡ **Backend REST API (Render):** [https://nirvana-backend-z68n.onrender.com](https://nirvana-backend-z68n.onrender.com)
- 📦 **GitHub Repository:** [https://github.com/Krish0503/NirvanaHealthCare](https://github.com/Krish0503/NirvanaHealthCare)

---

## 🛠️ Complete Tech Stack

### **Frontend**
- **Framework & Core:** React 18 (Hooks, React Router v6, State Management)
- **Styling & UI:** Modern Vanilla CSS & Tailwind CSS utilities (Responsive Grid, Glassmorphism UI)
- **Maps & Geolocation:** Leaflet.js / OpenStreetMap & Google Maps Integration
- **HTTP Client:** Axios for REST API communication
- **Telehealth Stream:** WebRTC / HTML5 MediaDevices API for webcam stream

### **Backend**
- **Framework:** Flask (Python RESTful API Architecture)
- **ORM & Database:** SQLAlchemy with SQLite (local development) & MySQL support
- **CORS Management:** `Flask-CORS` with strict origin permissions for production & local dev
- **Production Server:** Gunicorn WSGI HTTP Server

### **Machine Learning & Data Science**
- **Model:** `scikit-learn` Classifier serialized with `joblib`
- **Data Processing:** Pandas & NumPy for feature vectorization across 130+ medical symptoms
- **Exploratory Data Analysis:** Jupyter Notebook (`ml/EDA.ipynb`) with Matplotlib & Seaborn visualizations

---

## ✨ Key Features & Modules

1. 🔐 **Patient Authentication System (`/login`)**
   - Secure Sign Up & Login with encrypted password validation
   - Global session state integrated with the Navigation Bar and local storage persistence

2. 🤖 **AI-Powered ML Symptom Checker (`/symptom-checker`)**
   - Categorized symptom selector (130+ symptoms across General, Respiratory, Neurological, Digestive, Skin, Cardiovascular, Musculoskeletal)
   - Real-time scikit-learn model inference predicting probable conditions, confidence levels, and precautions

3. 🩺 **Doctor Discovery & Appointment Booking (`/doctors`)**
   - Filterable list of certified medical specialists by rating, experience, and fee
   - Interactive appointment slot booking modal connected directly to the backend database

4. 📁 **Patient Medical Records & Export (`/patient-records`)**
   - Centralized appointment history with status indicators (Confirmed, Pending, Completed)
   - Real-time search filter by doctor name or patient name
   - One-click JSON medical record export feature

5. 📹 **Telehealth Video Consultation (`/video-call`)**
   - Real-time webcam & microphone stream integration for virtual doctor visits
   - Interactive controls (Camera toggle, Microphone mute, Call termination)

6. 💊 **Medicine Reminder Tracker (`/dashboard`)**
   - Daily medication schedule (Morning, Afternoon, Evening dosage)
   - Interactive status toggles and real-time adherence progress bar

7. 📍 **Hospital & Emergency Locator (`/hospital-locator`)**
   - GPS-enabled interactive map locating nearby clinics, emergency centers, and blood banks
   - One-touch hotline dialing for emergency assistance

---

## 📁 Repository Architecture

```text
NirvanaHealthCare/
├── backend/                  # Flask REST API Application
│   ├── app.py                # Application entrypoint & CORS setup
│   ├── config.py             # Database URIs & Environment configuration
│   ├── Procfile              # Deployment web process manager (Gunicorn)
│   ├── requirements.txt      # Python dependencies
│   ├── nirvana.db            # SQLite Database
│   ├── seed.py               # Initial doctor & user database seeder
│   ├── model.joblib          # Trained Machine Learning Model artifact
│   ├── models/               # SQLAlchemy ORM Models (User, Doctor, Appointment)
│   └── routes/               # Blueprint API Routes (auth, doctors, appointments, predict)
│
├── frontend/                 # React Single Page Application (SPA)
│   ├── package.json          # Node dependencies & build scripts
│   ├── vercel.json           # Vercel SPA routing rewrite rules
│   ├── public/               # Static assets & index.html
│   └── src/
│       ├── App.js            # React Router v6 setup
│       ├── components/       # Reusable components (Navbar, Footer, ScrollToTop)
│       ├── pages/            # Application Pages (Home, Dashboard, DoctorList, etc.)
│       └── styles/           # CSS stylesheets
│
└── ml/                       # Machine Learning Training & EDA
    ├── EDA.ipynb             # Jupyter Notebook for EDA & model training
    └── dataset.csv           # Medical symptom-disease dataset
```

---

## 🚀 Recent Deployment & Infrastructure Updates

- **Separated Deployment Architecture:**
  - **Frontend:** Deployed on **Vercel** with client-side SPA routing (`vercel.json`).
  - **Backend:** Deployed on **Render** using **Gunicorn** process manager (`Procfile`).
- **Production API Integration:**
  - Dynamically pointed all frontend HTTP services to `https://nirvana-backend-z68n.onrender.com`.
- **CORS Security Enhancement:**
  - Configured Flask-CORS in `backend/app.py` to allow cross-origin requests from `https://nirvana-healthcare.vercel.app` and `http://localhost:3000`.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v16+)
- Python 3.9+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/Krish0503/NirvanaHealthCare.git
cd NirvanaHealthCare
```

### 2. Backend Setup (Flask)
```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python seed.py           # Seed database with sample doctor profiles
python app.py            # Runs on http://localhost:5000
```

### 3. Frontend Setup (React)
```bash
cd ../frontend
npm install
npm start                # Runs on http://localhost:3000
```

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
