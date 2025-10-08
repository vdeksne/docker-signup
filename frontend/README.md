React frontend (Vite)

Quick start (PowerShell on Windows):

```powershell
# from repository root
cd frontend
npm install
npm run dev
```

- Dev server will run at http://localhost:5173 and API requests to `/api/*` are proxied to the Flask backend at http://localhost:5000.
- Make sure your Flask backend (app.py) is running before calling the frontend API.
- If you don't have Node.js installed you can install via winget: `winget install OpenJS.NodeJS.LTS -e` or download from https://nodejs.org/.
