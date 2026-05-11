````md
# ψ POSEIDON

> AI-powered mystical identity & astrology platform built on Solana.  
> Mint your soul on-chain. Built for the Solana Frontier Hackathon.

Poseidon is a cosmic AI oracle that generates astrology readings, palm destiny analysis, daily fortunes, and crypto wallet roasts using Google Gemini and a modern full-stack web architecture.

---

# ✨ Features

- 🌟 AI Astrology Reading (birth chart → zodiac, archetype, aura)
- ✋ Palm Reading (upload hand image → destiny analysis)
- 🔥 Daily Fortune Generator
- 💼 Crypto Wallet Roast (Solana wallet personality analysis)
- 🎴 Cosmic Identity system (NFT-ready structure)
- 🌌 Cosmic dashboard with aura-based UI

---

# 🧰 Tech Stack

- ⚛️ TanStack Start (React + Vite SSR)
- 🎨 Tailwind CSS + custom cosmic theme
- 🧠 Google Gemini API (AI engine)
- 🗄️ Supabase (backend + storage)
- ⛓️ Solana (mock wallet for demo)

---

# 🚀 Getting Started

## 1. Prerequisites

Install:

- Node.js 20+
- Git
- Bun (recommended) or npm

Optional Bun install:
```bash
curl -fsSL https://bun.sh/install | bash
````

---

## 2. Clone repository

```bash
git clone https://github.com/<your-username>/Poseidon_Solana.git
cd Poseidon_Solana
```

---

## 3. Install dependencies

Using Bun:

```bash
bun install
```

OR npm:

```bash
npm install
```

---

## 4. Environment variables

Create a `.env` file in the root:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id

VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

---

## ⚠️ Important

* Never commit `.env` to GitHub
* `.env` is already ignored in `.gitignore`
* Missing keys will break AI features

---

# 🗄️ Supabase Setup

Create a project here:
[https://supabase.com](https://supabase.com)

Copy:

* Project URL
* Anon public key

Add them to `.env`

---

# 🧠 Gemini Setup

Get API key from:
[https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

Enable Gemini access and add:

```bash
VITE_GEMINI_API_KEY=your_key
```

---

# 🚀 Run project

Using Bun:

```bash
bun run dev
```

Using npm:

```bash
npm run dev
```

Open:

[http://localhost:8080](http://localhost:8080)

---

# 🏗 Build

```bash
bun run build
bun run preview
```

---

# 🗂 Project Structure

```
src/
├── routes/              # Pages (TanStack routing)
├── lib/
│   ├── gemini.ts        # Gemini API client
│   ├── poseidon.functions.ts # AI logic
│   ├── wallet.ts        # Mock Solana wallet
├── styles.css           # Cosmic UI system
```

---

# 🧠 AI Architecture

Powered by:

Google Gemini API

Flow:

Frontend → Server Functions → Gemini → Structured JSON → UI

---

# ⛓ Solana Integration

* Mock wallet system for demo
* Ready for real integration using:

  * Solana Wallet Adapter
  * Metaplex UMI

---

# 🧪 Demo Flow

1. Connect wallet (mock)
2. Enter birth details → Astrology reading
3. Upload palm image → Destiny analysis
4. Generate daily fortune
5. Roast wallet address
6. View cosmic dashboard

---

# 🔐 Security Notes

* `.env` is private and ignored by Git
* Never expose API keys publicly
* Supabase anon key is safe for frontend use only
* Gemini API key must remain private

---

# 🙏 Credits

* Google Gemini API
* Supabase
* TanStack Start
* Tailwind CSS
* Solana ecosystem

---

# 📜 License

MIT — build, fork, and create something cosmic 🌌

```
