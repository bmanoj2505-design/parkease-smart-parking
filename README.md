# ParkEase — Smart Parking Management System

A beginner-friendly MERN application for managing parking spaces, vehicles, and reservations. It uses React + Vite + Tailwind CSS, Express, MongoDB/Mongoose, and JWT authentication. All services run locally; there are no paid APIs.

## Project structure

```text
ParkEase/
├── client/                 # React + Vite + Tailwind dashboard
│   └── src/main.jsx        # Screens, API integration, forms
├── server/
│   └── src/
│       ├── index.js        # REST API, validation, authentication
│       ├── models.js       # User, Vehicle, ParkingSlot, Booking
│       ├── middleware.js   # JWT, role checks, error handling
│       └── seed.js         # Admin account and 24 sample spaces
├── package.json            # Root development scripts
└── README.md
```

## Requirements

- Node.js 18.18+ (20 LTS recommended) and npm
- MongoDB Community Server running locally, or a MongoDB connection string

## Setup and run

1. Start MongoDB. For a local installation, the default database is `mongodb://127.0.0.1:27017/parkease`.
2. Copy `server/.env.example` to `server/.env`. Set a long random `JWT_SECRET`. Set `MONGODB_URI` if you use a different MongoDB instance. Change the seed admin password before seeding.
3. From this project directory install dependencies:

   ```bash
   npm install
   npm --prefix server install
   npm --prefix client install
   ```

4. Create the administrator and sample parking layout:

   ```bash
   npm run seed
   ```

   The seed command prints the configured admin email and password. Defaults are `admin@parkease.local` / `ParkEase123!`; change these in `server/.env` before running it. It adds 24 spaces across three zones when the collection is empty.

5. Start API and frontend together:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173). The API listens at [http://localhost:4000](http://localhost:4000); health check: `/api/health`.

For separate terminals use `npm run server:dev` and `npm run client:dev`. To make a production frontend bundle run `npm run build`.

## First use

- Sign in with the seeded administrator to manage spaces and all bookings.
- A regular user can use **Create account**. New registrations receive the `user` role.
- Register a vehicle under **Vehicles**, then reserve an available parking space.
- Select **Release** from an active booking when the vehicle exits. The server records the actual exit time and frees the space.

## Open the four-speaker presentation

Start the Vite app from the project folder with `npm run dev`, then open [http://localhost:5173/presentation.html](http://localhost:5173/presentation.html). The standalone presentation page has speaker navigation, arrow-key controls, a print button, and a short live-demo checklist. You can also open `client/public/presentation.html` directly in VS Code and use the **Open with Live Server** command if that extension is installed.

## API overview

Every route except health, registration, and login requires `Authorization: Bearer <JWT>`.

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register`, `/api/auth/login` | Public | Create account / sign in |
| GET | `/api/auth/me` | Signed in | Current account |
| GET | `/api/slots` | Signed in | List parking spaces |
| POST | `/api/slots` | Admin | Add a space |
| PATCH / DELETE | `/api/slots/:id` | Admin | Update / remove a space |
| GET / POST | `/api/vehicles` | Signed in | List / register vehicles |
| PATCH / DELETE | `/api/vehicles/:id` | Owner or admin | Update / remove vehicle |
| GET | `/api/bookings?status=active&search=ABC` | Signed in | Search/filter booking history |
| POST | `/api/bookings` | Signed in | Book an available space |
| PATCH | `/api/bookings/:id/release` | Owner or admin | Complete a booking and release space |

Booking creation atomically changes a slot from `available` to `occupied` with a conditional MongoDB update. Concurrent attempts for the same space cannot both succeed. Server-side Zod validation checks input, ownership checks limit user data access, and active bookings prevent deletion or manual reopening of their space.

## Environment variables

See `server/.env.example` for the API port, MongoDB URI, JWT secret, frontend origin, and seed administrator credentials. The frontend uses `VITE_API_URL` if supplied; otherwise it calls `http://localhost:4000/api`.

## Notes

- Slot types include Standard, Compact, EV, and Accessible; vehicle types include Car, Motorcycle, EV, and SUV.
- Booking estimate rounds the reserved duration up to the next hour and uses the slot hourly rate.
- Authentication tokens expire after 12 hours. Passwords are stored as bcrypt hashes.
- This starter project intentionally keeps deployment configuration out of the local development flow.
