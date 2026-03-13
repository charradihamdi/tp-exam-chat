# TP Exam Chat

A mini chat application with a React frontend and Express backend.

## Project Structure

```
tp-exam-chat
├── frontend/          # React app
├── backend/           # Node.js API
├── docker-compose.yml
└── .github/workflows/ # CI/CD
```

## Local Development

### Backend

```bash
cd backend
npm install
node server.js
```

Runs on `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on `http://localhost:3000` (use port 3001 if backend is on 3000). Set `REACT_APP_API_URL` if the backend uses a different URL.

### Docker

```bash
docker-compose up --build
```

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3000`

## API

| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| GET    | /api/messages      | List all messages  |
| POST   | /api/messages      | Create a message   |

POST body: `{ "author": "string", "content": "string" }`

## Deployment

### Auto Deploy

Both Vercel and Render support automatic deployments when connected to GitHub. Every push to `main` triggers a new deployment.

#### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the GitHub repo
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `REACT_APP_API_URL` = `https://your-backend.onrender.com` (your Render URL)
5. Deploy

#### Backend → Render

1. Go to [render.com](https://render.com) → **New → Blueprint**
2. Connect the GitHub repo (Render reads `render.yaml` and creates the backend service)
3. Deploy

Or create manually: **New → Web Service**, then configure:

- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

### Environment Variables

| Service  | Variable              | Description                          |
|----------|-----------------------|--------------------------------------|
| Frontend | `REACT_APP_API_URL`   | Backend base URL (no trailing path) |
| Backend  | `PORT`                | Set by Render automatically          |

### Connect Frontend to Backend

1. Deploy the backend on Render and copy its URL (e.g. `https://tp-exam-chat-api.onrender.com`)
2. In Vercel project settings, add `REACT_APP_API_URL` = that URL
3. Redeploy the frontend so the new variable is used

## CI/CD

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and:

- Installs backend dependencies
- Builds the frontend
- Builds Docker images for frontend and backend

**Auto deploy**: Connect this repo to [Vercel](https://vercel.com) and [Render](https://render.com). Both platforms deploy automatically on every push to `main`. No extra configuration needed.
