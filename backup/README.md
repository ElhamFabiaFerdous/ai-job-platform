# 🎯 AI Job Platform — SkillBridge
**SE331 Capstone Project | Group 05 | Spring 2026**

---

## 👥 টিম মেম্বার
| নাম | আইডি | দায়িত্ব |
|-----|------|---------|
| Khondokar Riad | 0242310005341364 | Backend API, Auth, Job Matching |
| Elham Fabia Ferdous | 0242310005341053 | Frontend, Dashboard |
| Asraful Islam | 0242310005341449 | Database, AI Integration |

---

## 🏗️ প্রজেক্ট স্ট্রাকচার

```
ai-job-platform/
├── backend/                  ← FastAPI (Python)
│   ├── main.py               ← App entry point
│   ├── requirements.txt      ← Python packages
│   ├── .env                  ← Environment variables
│   └── app/
│       ├── database.py       ← PostgreSQL connection
│       ├── models/
│       │   └── user.py       ← User database model
│       ├── schemas/
│       │   └── user_schema.py ← Pydantic validators
│       ├── routes/
│       │   ├── auth.py       ← Register & Login API
│       │   └── profile.py    ← Profile CRUD API
│       └── utils/
│           └── auth_utils.py ← JWT & bcrypt helpers
│
└── frontend/                 ← Next.js (React)
    ├── .env.local            ← Frontend env variables
    └── src/app/
        ├── register/page.jsx ← রেজিস্ট্রেশন পেজ
        ├── login/page.jsx    ← লগইন পেজ
        └── profile/page.jsx  ← প্রোফাইল পেজ
```

---

## 🚀 কীভাবে চালাবে (Setup Guide)

### ধাপ ১: PostgreSQL Database তৈরি করো
```sql
CREATE DATABASE ai_job_platform;
```

### ধাপ ২: Backend চালাও
```bash
cd backend

# Python virtual environment তৈরি করো
python -m venv venv
venv\Scripts\activate       # Windows
source venv/bin/activate    # Mac/Linux

# Packages install করো
pip install -r requirements.txt

# .env ফাইলে তোমার database password দাও

# Server চালাও
uvicorn main:app --reload --port 8000
```

Backend চলবে: http://localhost:8000
API Docs: http://localhost:8000/docs

### ধাপ ৩: Frontend চালাও
```bash
cd frontend

# Packages install করো
npm install

# Development server চালাও
npm run dev
```

Frontend চলবে: http://localhost:3000

---

## 📡 API Endpoints (Module 1)

| Method | URL | কাজ |
|--------|-----|-----|
| POST | `/api/auth/register` | নতুন ইউজার রেজিস্ট্রেশন |
| POST | `/api/auth/login` | লগইন → JWT Token |
| GET | `/api/profile/` | প্রোফাইল দেখাও (Token লাগবে) |
| PUT | `/api/profile/update` | প্রোফাইল আপডেট করো |
| DELETE | `/api/profile/delete` | অ্যাকাউন্ট ডিলিট করো |

---

## 🔐 Security Features
- পাসওয়ার্ড **bcrypt** দিয়ে হ্যাশ করা হয়
- **JWT Token** দিয়ে authentication
- Token expire হয় **২৪ ঘণ্টা** পরে
- সব communication **HTTPS** এ (production)

---

## 📦 পরবর্তী Module গুলো
- [ ] Module 2: Resume Upload & AI Skill Extraction
- [ ] Module 3: Job Recommendation & Skill Gap Analysis
- [ ] Module 4: Dashboard & Learning Recommendations
