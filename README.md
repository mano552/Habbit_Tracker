# Streaks · Habit Tracker

A daily habit tracker with a weekly grid view, streak counters, and full persistence. Built with React + Vite.

---

## 🚀 How to Run

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- npm (comes with Node)

### Steps (fresh machine)

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/habit-tracker.git
cd habit-tracker

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Build for production
```bash
npm run build
npm run preview
```

---

## 🌐 Deployed URL
[https://YOUR-APP.vercel.app](https://YOUR-APP.vercel.app) *(update after deploying)*

---

## Features
- Add, rename, and delete habits
- Weekly grid: 7 days across, habits down the left
- Today's column is always highlighted
- Streak counter per habit (🔥 with forgiving mode)
- Navigate to previous/future weeks
- Past checkmarks persist on reload
- Full keyboard accessibility
- Responsive: works on 360px phones to 1440px desktops
- Empty state with CTA

## Stack
React 18 · Vite · date-fns · localStorage (no backend)
