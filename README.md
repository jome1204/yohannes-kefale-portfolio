# Yohannes Kefale — Personal Website

MERN portfolio for **Yohannes Kefale**, a full-stack JavaScript developer in Addis Ababa. Content is seeded from the CV and selected public projects.

Featured live apps: [School360](https://school-rho-black.vercel.app), [FinPilot AI](https://finpilot-ai-ten.vercel.app), [EthioHire](https://ethiohire-pied.vercel.app), and [Kraken](https://kraken-real-estate.vercel.app).

- **MongoDB** stores profile, projects, experience, skills, and contact messages
- **Express / Node** serve the REST API
- **React** (Vite + TypeScript) is the public site

No local MongoDB install is required. If `MONGODB_URI` is empty, the API serves seeded data and saves contact messages to `server/data/messages.json` so you can run and test immediately. Set `MONGODB_URI` when you have MongoDB running to use the full MERN path.

## Run in VS Code

1. File → Open Folder → `C:\Users\Administrator\Desktop\pwebsite\myweb-portfolio`
2. Open the Terminal (`Ctrl+`` `)
3. Run:

```bash
npm run setup
npm run dev
```

4. Open **http://localhost:5173** in your browser.

You can also press **F5** and choose **Run portfolio**, or **Terminal → Run Task → Start portfolio (API + site)**.

## Run locally

You need **Node.js 20+**. From this folder:

```bash
npm run setup
npm run dev
```

Then open **http://localhost:5173**

## Deploy

The production server builds the React app and serves it from Express on one URL.

```bash
npm run setup
npm run build
npm start
```

This repo is set up for **Vercel** (`vercel.json`) and **Render** (`render.yaml`).

- Site: http://localhost:5173
- API: http://localhost:5000
- Health: http://localhost:5000/api/health

The site and API start together. Contact submissions are stored by the Express API.

## Optional: real MongoDB

Create `server/.env`:

```
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/yohannes-portfolio
```

## API

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Liveness |
| GET | `/api/profile` | CV profile |
| GET | `/api/skills` | Skill groups |
| GET | `/api/experience` | Work history |
| GET | `/api/projects` | Case studies |
| GET | `/api/projects/:slug` | One case study |
| POST | `/api/contact` | Contact form (saved in MongoDB) |

## Scripts

| Command | What it does |
| --- | --- |
| `npm run setup` | Install root, server, and client dependencies |
| `npm run dev` | Run API + Vite together |
| `npm run dev:server` | API only on port 5000 |
| `npm run dev:client` | Frontend only on port 5173 |
