# Crowdfund 🚀

A full-stack crowdfunding platform where **Creators** launch campaigns, **Supporters** back them with credits, and an **Admin** keeps the whole platform running smoothly. Built as a role-based system with real-time progress tracking, Stripe-powered credit purchases, and a notification system that keeps everyone in the loop.

---

## 🌐 Live Links

|                        | URL                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| **Live Site (Client)** | [https://crowdfund-client-drab.vercel.app](https://crowdfund-client-drab.vercel.app)     |
| **Live API (Server)**  | [https://crowdfund-server-jple.onrender.com](https://crowdfund-server-jple.onrender.com) |
| **Client Repository**  | [github.com/tanzid-48/crowdfund-client](https://github.com/tanzid-48/crowdfund-client)   |
| **Server Repository**  | [github.com/tanzid-48/crowdfund-server](https://github.com/tanzid-48/crowdfund-server)   |

> ⚠️ The server is hosted on Render's free tier — if it hasn't been visited in a while, the first request may take **30–50 seconds** to wake up. This is expected behavior, not a bug.

---

## 🔑 Demo Admin Access

```
Email:    admin@gmail.com
Password: [use the password set for this account]
```

You can also register your own account as a **Supporter** or **Creator** directly from the live site to explore those roles.

---

## ✨ Key Features

- 🔐 **Role-based authentication** (Supporter / Creator / Admin) with BetterAuth, JWT-based API authorization, and Google Sign-In
- 💳 **Credit economy** — Supporters buy credits via Stripe (10 credits = $1), Creators withdraw earnings as cash (20 credits = $1)
- 📊 **Live campaign tracking** — real-time funding progress bars, days-left countdowns, and category filtering
- ✅ **Full campaign lifecycle** — submission → admin approval → contribution → creator review (approve/reject) → automatic credit refunds on rejection
- 💰 **Stripe-powered checkout** for purchasing credits, with a real card-entry form (number, expiry, CVC)
- 🏦 **Withdrawal system** with minimum-credit enforcement and admin payout approval
- 🔔 **Notification system** with a live-updating bell icon, unread counts, and click-to-navigate
- 📈 **Analytics dashboards** for every role — bar charts, donut charts, and stat cards built with Recharts
- 🛡️ **Ownership-based authorization** — every sensitive action (approve, reject, update, delete, withdraw) is verified server-side against the authenticated user's identity, not just their role
- 📱 **Fully responsive** — dedicated mobile card layouts for every data table, alongside the desktop table views
- 🌓 **Dark/light theme** toggle with system-preference detection
- 🖼️ **Cloudinary image uploads** for campaign cover photos
- 🚩 **Reporting system** — supporters can flag campaigns for admin review, suspension, or dismissal
- 🎨 **Custom design system** — a cohesive color/typography language (Ink, Paper, Spark, Grow Green) applied consistently across every screen

---

## 🛠️ Tech Stack

**Frontend**

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (animation) · Swiper (carousels) · Recharts (charts)
- Zustand (client state) · React Hook Form + Zod (forms & validation)
- BetterAuth (Bearer + JWT plugins) · Stripe.js

**Backend**

- Express.js + TypeScript
- MongoDB (native driver)
- BetterAuth JWKS verification via `jose`
- Stripe (Payment Intents API)
- Cloudinary (image hosting)

**Infrastructure**

- Client deployed on **Vercel**
- Server deployed on **Render**
- Database on **MongoDB Atlas**

---

## 📂 Repository Structure

This project is split across two repositories:

- **`crowdfund-client`** — Next.js frontend (this repo)
- **`crowdfund-server`** — Express backend API

Both need to be running (or both pointed at their respective live deployments) for the app to function fully.

---

## 🚀 Running Locally

### Client

```bash
git clone https://github.com/tanzid-48/crowdfund-client.git
cd crowdfund-client
npm install
# create a .env.local file with the required variables (see below)
npm run dev
```

### Server

```bash
git clone https://github.com/tanzid-48/crowdfund-server.git
cd crowdfund-server
npm install
# create a .env file with the required variables (see below)
npm run dev
```

### Required Environment Variables

**Client (`.env.local`)**

```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
NEXT_PUBLIC_STRIPE_PK=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
MONGO_URI=
DB_NAME=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Server (`.env`)**

```
PORT=
MONGO_URI=
DB_NAME=
STRIPE_SECRET_KEY=
CLIENT_URL=
```

---

## 👥 Roles at a Glance

| Role          | What they can do                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------- |
| **Supporter** | Browse campaigns, contribute credits, purchase credits via Stripe, track contribution history      |
| **Creator**   | Launch campaigns, review incoming contributions, request withdrawals, track earnings               |
| **Admin**     | Approve/reject campaigns, process withdrawals, manage users and roles, moderate reported campaigns |

---

## 📝 License

Built as an academic/portfolio project. Feel free to explore the code for learning purposes.
