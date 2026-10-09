# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দাম এক নজরে — a Bangla daily-market price tracker. Browse today's prices for rice, pulses, oil, vegetables, fish, meat, eggs/milk and spices, see which items rose or fell, and compare prices market-by-market across divisions.

**Live:** _add your Vercel link_  ·  **Repo:** _add your GitHub link_

## ✨ Key Features
1. **Live price ticker** – infinite marquee under the navbar (emoji · name · price/unit · ▲▼ %).
2. **Risers & Fallers** – top 6 products whose price went up / down today, plus the full product grid.
3. **Category pages** – skeleton loading, numeric **sort** (default / low→high / high→low) and a friendly empty state.
4. **Protected product details** – min / max / average price and a per-market, per-division price table (login required).
5. **BetterAuth authentication** – email/password, Google & GitHub login, toast feedback, protected-route redirects.
6. **Update profile** (challenge) – change your name from *My Profile → তথ্য আপডেট করুন*.
7. Fully **responsive** (mobile / tablet / desktop), custom 404, Bengali digits and Bangla date.

## 🧰 Technologies
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 + DaisyUI · BetterAuth · MongoDB · react-hot-toast · lucide-react

## 🚀 Getting started
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```
| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string (BetterAuth storage) |
| `BETTER_AUTH_SECRET` | long random string |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` | your site URL (`http://localhost:3000` locally) |
| `GOOGLE_CLIENT_ID` / `_SECRET` | Google OAuth (redirect: `<URL>/api/auth/callback/google`) |
| `GITHUB_CLIENT_ID` / `_SECRET` | GitHub OAuth (redirect: `<URL>/api/auth/callback/github`) |

## 🔌 API
`https://api.api-store.workers.dev/api/bazardor` (fallback `https://api.abcz.workers.dev/api/bazardor`) — `/products`, `/products/:id`, `/products?category=`, `/categories`, `/categories/:slug`.

## ☁️ Deployment (Vercel)
Import the repo, add the env variables above (set `BETTER_AUTH_URL` to the Vercel URL), deploy. Dynamic routes (`/category/[slug]`, `/product/[slug]`) are server-rendered, so refreshing never 404s.
