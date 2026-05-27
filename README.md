# PatternForge

PatternForge is a full-stack DSA revision assistant for tracking solved coding problems, finding weak problem-solving patterns, planning revision, and generating personalized mock tests from previously solved problems.

## Tech Stack

- Frontend: React, React Router, Tailwind CSS, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Auth: JWT and bcrypt

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/patternforge
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

3. Seed demo data:

```bash
npm run seed --prefix server
```

Demo login:

- Email: `demo@patternforge.dev`
- Password: `password123`

4. Start both apps:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Main API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET|POST /api/problems`
- `GET|PUT|DELETE /api/problems/:id`
- `GET|POST /api/profiles`
- `PUT|DELETE /api/profiles/:id`
- `GET /api/analytics/overview`
- `GET /api/analytics/patterns`
- `GET /api/analytics/weak-areas`
- `GET /api/revision/recommended`
- `PUT /api/revision/:problemId/mark-revised`
- `POST /api/tests/generate`
- `GET /api/tests`
- `GET /api/tests/:id`
- `POST /api/tests/:id/submit`

## Project Structure

```text
/client
  /src/components
  /src/pages
  /src/routes
  /src/context
  /src/services
  /src/utils
/server
  /config
  /controllers
  /middleware
  /models
  /routes
  /utils
```

PatternForge is intentionally modular so real platform sync APIs and AI mentor features can be added later without rewriting the core revision engine.

