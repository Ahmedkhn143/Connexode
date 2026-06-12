

# Connexode — Virtual Internship & Learning Platform

Connexode is a modern, premium task-based virtual internship platform designed to empower students to build real-world skills, submit GitHub projects, receive interactive mentor grading, and earn industry-verified certificates.

---

## 🚀 Key Features

### 👤 Role-Based Portals & Dashboards
- **Student Dashboard**: 
  - Dynamic profile page showing points, streak stats, earned skill badges, and active projects.
  - Interactive Task Workspace to review assignments and submit github/deployment URLs.
  - Dedicated **8-Week Track Roadmap** view providing a comprehensive week-by-week curriculum outline.
  - Profile customization modal supporting direct avatar upload (restricted to **≤ 1MB** file size) and bio editing. Student enrolled track changes are securely locked.
  - Simulated ATS Resume generator exporting verified scores, badges, and project highlights into a custom PDF.
- **Mentor Panel**:
  - Comprehensive custom left-sidebar navigation.
  - Full **Grading Queue** allowing mentors to review, comment on, and approve/reject student task submissions.
  - Isolation of AI task reviewer capabilities specifically for mentors.
- **Admin Control Center**:
  - Global control layout panel.
  - **Mentor Application Queue** to review new mentor signups, vetting profile details, social handles, and approving or rejecting them.
  - **Campus Ambassador Queue** to audit and process applications from users applying to be regional brand ambassadors.
  - Audit logging system displaying historical action feeds.

### 🛡️ File Size Validation & LocalStorage State
- Strict **1MB size limits** enforced on all image uploads (such as user profile avatars).
- Fully interactive client-side simulation engine powered by `localStorage` persistence (`connexode_dynamic_users`, `connexode_ambassador_applications`, etc.), keeping state updates responsive and persistent.

---

## 🛠️ Tech Stack & Tools

- **Core Framework**: React 19, Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Vanilla CSS custom gradients, glassmorphism cards, and radial glow accents
- **Icons**: Lucide React
- **Validation**: Client-side validations for URLs, input constraints, and file sizes

---

## 📂 Project Structure

```bash
├── app/
│   ├── admin/           # Admin panel layout & application approval queues
│   ├── ambassador/      # Campus Ambassador registration pages
│   ├── dashboard/       # Student dashboard & Task view controller
│   ├── mentor/          # Mentor panel & student grading system
│   ├── profile/         # Mock static student profiles (e.g. /profile/ali-raza)
│   ├── u/[username]/    # Dynamic student profiles fetching from localStorage
│   └── globals.css      # Core style definitions and custom animations
├── components/
│   ├── auth/            # Sign In / Sign Up Forms (including Mentor Application flow)
│   ├── layout/          # Navbar, Sidebars, and layout configurations
│   ├── profile/         # Profile headers and stats cards
│   └── task/            # Interactive tasks lists and submission forms
└── lib/
    └── mock-data.ts     # In-memory mock structures, interfaces, and helper functions
```

---

## ⚙️ Getting Started & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

---

## 📝 Credentials for Local Simulation

To quickly test the dashboards, you can use the following default mock accounts:

| Role | Username / Email | Password |
| :--- | :--- | :--- |
| **Student** | `alex@example.com` | *Any value* (uses default user profile) |
| **Mentor** | `mentor@connexode.pk` | `mentor123` |
| **Admin** | `admin@connexode.pk` | `admin123` |

---

## 🤝 Contributing & Standards

1. **Upload Constraints**: Any file upload handler must enforce the standard `file.size <= 1024 * 1024` restriction.
2. **State Management**: Keep standard client interactions synced with matching `localStorage` keys to maintain live simulation integrity.
