# 🚀 DevDirectory

An internal engineering portal built with **React 18, React Router v6 and Axios**.
Search developers, read their publications, and publish team bulletins under a protected (mock) session.

Data source: [JSONPlaceholder](https://jsonplaceholder.typicode.com)

## ✨ Features
- Real-time debounced search (by name **or** company)
- Dynamic profile page `/users/:id` with the developer's posts
- Mock login + **ProtectedRoute** that redirects back to the page you originally wanted
- Controlled form with validation, live character counters & `201 Created` success banner
- Skeleton loaders, dismissible error banners with **Retry**, friendly 404 page
- Dark / Light theme toggle, fully responsive (mobile hamburger menu)
- Single Axios instance (`src/services/api.js`) — no `fetch` anywhere

## 🛠️ Run locally (VS Code)
```bash
npm install
npm run dev            # http://localhost:5173
```

### Production check (required by the lab)
```bash
npm run build
npm run preview
```

## 🗂️ Folder structure
```
src/
├── assets/        styles.css
├── components/    Navbar, UserCard, ProtectedRoute, SkeletonLoader, AlertBanner
├── context/       AuthContext
├── hooks/         useDebounce, useFetch
├── pages/         Home, UserDirectory, UserProfile, AddPost, Login, NotFound
├── services/      api.js, postService.js
├── App.jsx
└── main.jsx
```

## 📦 Push to GitHub
```bash
git init
git add .
git commit -m "feat: initial DevDirectory setup"
git branch -M main
git remote add origin https://github.com/<username>/bca-frontend-devdirectory-<RollNumber>.git
git push -u origin main
```

## 🌐 Deploy
**Vercel:** import the repo → Framework *Vite* → Deploy (`vercel.json` already handles SPA routing).
**Netlify:** build command `npm run build`, publish directory `dist` (`public/_redirects` handles SPA routing).

## 🔐 Login
Any name + valid email works (simulated), or click **Continue as demo manager**.
