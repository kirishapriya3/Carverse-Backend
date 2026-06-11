# Carverse 🚗

A MERN stack car finder app. Users describe what they need and get matching car recommendations.

**Live Demo:** [https://glistening-daifuku-af446f.netlify.app](https://glistening-daifuku-af446f.netlify.app)
**Backend API:** [https://carverse-backend.onrender.com](https://carverse-backend.onrender.com)

---

## What did I built and why?

Carverse is a car discovery app that helps users find the right car based on their personal needs — budget, brand, fuel type, number of seats, mileage, and safety preference. The idea came from a real problem: most car comparison sites overwhelm users with specs and filters. Carverse flips that — you just describe what you want in plain language, or fill a short form, and it tells you what fits.

There are two ways to search:
- **Natural language search** — type something like "SUV under 15 lakhs" or "7 seater diesel" and get matching results
- **Customize panel** — pick your brand, budget, family size, mileage priority, and safety importance, and get your top 3 scored recommendations with a plain-English explanation for each

### What was deliberately cut

- **User accounts / login** — not needed for the core use case. Finding a car doesn't require authentication.
- **Real-time car pricing** — prices are seeded static data. Integrating a live API would add complexity without changing the core experience.
- **Car comparison side-by-side** — useful feature but out of scope for this version.
- **Pagination** — the seed data is small enough that all results fit on one screen.
- **Car detail page** — cards show all the key info. A dedicated detail page adds clicks without much value at this stage.

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React + Vite | Fast dev experience, component-based UI, Vite's HMR makes iteration quick |
| Styling | Plain CSS | No extra dependency. Full control over layout without fighting a framework |
| Backend | Node.js + Express | Lightweight, fast to set up, matches well with a MongoDB data layer |
| Database | MongoDB + Mongoose | Flexible schema for car data, easy to query with filters, hosted free on Atlas |
| HTTP client | Axios | Cleaner API than fetch, built-in error response handling |
| Frontend deploy | Netlify | Free tier, auto-deploy from GitHub, supports redirect rules for proxying |
| Backend deploy | Render | Free tier, straightforward Node.js hosting, environment variable management |

---

## What was delegated to AI vs. done manually

### AI handled
- Boilerplate setup — folder structure, Express server, Mongoose connection, Vite config
- All CSS — component styles, light theme, responsive grid, animations
- The scoring engine logic in `carController.js` — weighted criteria, breakdown generation, explanation text
- Seed data — 15 cars with realistic specs
- Deployment config —  CORS setup across environments
- Debugging build errors — missing imports, wrong file paths, Rolldown bundler issues

### Done manually
- Deciding the product — what the app does, what gets cut, what the UX flow is
- All design decisions — two-mode search (natural language + customize panel), what fields matter to users, card layout without images
- Reviewing every piece of generated code before it went in
- Deployment debugging — diagnosing why Netlify was sending requests to itself instead of the backend, fixing the base directory mismatch, handling the OneDrive + git lock issue

### Where AI helped most
Setting up the scoring and recommendation engine was the highest-value assist. Writing a weighted multi-criteria scoring function with breakdown logging and plain-English explanations manually would have taken a couple of hours. It came out correct on the first pass and needed no changes.

CSS was the other big win — going from a blank component to a polished, themed UI in seconds instead of minutes per component.

### Where AI got in the way
Deployment. The AI confidently suggested a Vite proxy setup that only works in local dev — it doesn't run on Netlify. This caused the "Unable to connect to server" error in production. The fix (hardcoding the backend URL and using `netlify.toml` redirects) was straightforward once the root cause was clear, but it took a few back-and-forth cycles to get there.

Stray import lines (`import API from "./api"`) were added to files that never used them, which caused clean local builds to fail in production. Small issue, but it shows that AI-generated code needs to be read, not just accepted.

---

## If I had another 4 hours

1. **Fix the backend cold start** — Render's free tier spins down after inactivity. The first request after idle takes 30–60 seconds. A simple keep-alive ping or upgrading to a paid tier would fix this.

2. **Add more cars to the database** — 15 cars is enough to demo the concept but too few to feel like a real product. I'd add 50–100 cars across more brands and price ranges.

3. **Improve the search parser** — the current regex-based parser misses combinations like "automatic petrol SUV under 20 lakhs with good mileage". Replacing it with a lightweight NLP approach or structured query builder would make search much more powerful.

4. **Car detail modal** — clicking a card could expand it to show a full spec sheet, pros/cons, and a "similar cars" section.

5. **Compare mode** — let users pin 2–3 cards and compare specs side by side. The data model already supports it.

---

## Running locally

### Backend
```bash
cd Backend
npm install
cp .env.example .env   # add your MONGO_URI
npm run dev
```

### Frontend
```bash
cd Frontend/frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, 
Backend runs on `http://localhost:5000`.
