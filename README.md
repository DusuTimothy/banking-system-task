# Banking System API

A simple banking system REST API built with **Node.js**, **Express**, **Zod** (validation),
**CORS**, **express-rate-limit**, and an **in-memory dummy database** (no real DB required).

> ⚠️ Data is stored in a plain JS array in memory (`src/data/db.js`). It resets every time
> the server restarts and is not shared across multiple instances/processes. Swap it for a
> real database later without touching controllers or routes — just reimplement the functions
> exported from `src/data/db.js`.

## Features

- Register / Login with JWT auth
- View balance
- Create & update a 4-digit transaction PIN (bcrypt-hashed, separate from the login password)
- Search for other users (by name, email, or account number) to send money to
- Transfer funds to another user — balances update on both sides atomically
- Transaction history
- CORS (configurable allowed origins)
- Rate limiting (general, stricter on auth endpoints, stricter still on transfers)
- Zod request validation on every input-accepting route
- Centralized error handling

## Project structure

```
banking-system/
├── package.json
├── .env.example
└── src/
    ├── server.js               # entrypoint
    ├── app.js                  # express app: middleware + route mounting
    ├── data/
    │   └── db.js                # dummy in-memory "database" + transfer logic
    ├── schemas/
    │   ├── authSchema.js         # zod: register, login, create/update pin
    │   └── transactionSchema.js  # zod: transfer, search query
    ├── middlewares/
    │   ├── validate.js           # generic zod-validation middleware
    │   ├── authentication.js     # JWT identity verification
    │   ├── authorization.js      # access-control (role) checks
    │   ├── rateLimiter.js        # general / auth / transfer limiters
    │   └── errorHandler.js       # 404 + centralized error handler
    ├── controllers/
    │   ├── authController.js     # register, login
    │   ├── userController.js     # me, balance, pin, search
    │   └── transactionController.js # transfer, history
    ├── routes/
    │   ├── authRoutes.js
    │   ├── userRoutes.js
    │   └── transactionRoutes.js
    └── utils/
        ├── jwt.js                # sign JWT
        ├── hash.js                # bcrypt password/pin hashing
        └── serialize.js           # strip password/pin hashes before responding
```

## Setup

```bash
npm install
cp .env.example .env      # then edit JWT_SECRET, ALLOWED_ORIGINS, etc.
npm run dev                # or: npm start
```

Server boots on `http://localhost:5000` by default. No database setup step — the dummy
store is ready as soon as the process starts.

## API reference

All request bodies are JSON. All protected routes require `Authorization: Bearer <token>`.

### Auth

| Method | Route              | Body                                      | Notes                        |
|--------|---------------------|--------------------------------------------|-------------------------------|
| POST   | `/api/auth/register` | `fullName, email, password`                | Password needs upper/lower/digit, 8+ chars |
| POST   | `/api/auth/login`    | `email, password`                          | Returns `{ user, token }`    |

### Users (protected)

| Method | Route                | Body / Query                     | Notes                                   |
|--------|------------------------|-----------------------------------|-------------------------------------------|
| GET    | `/api/users/me`         | —                                  | Current user profile                     |
| GET    | `/api/users/balance`    | —                                  | `{ balance, accountNumber }`             |
| GET    | `/api/users/search?q=`  | query: `q` (required), `limit` (opt) | Search users by name/email/account number |
| POST   | `/api/users/pin`        | `pin` (4 digits)                  | Create PIN (only if none set yet)         |
| PATCH  | `/api/users/pin`        | `currentPin, newPin`              | Update existing PIN                       |

### Transactions (protected)

| Method | Route                       | Body                                              | Notes                                    |
|--------|-------------------------------|-----------------------------------------------------|---------------------------------------------|
| POST   | `/api/transactions/transfer`   | `toAccountNumber, amount, pin, note?`               | Debits sender, credits recipient, requires PIN |
| GET    | `/api/transactions/history`    | —                                                    | All transactions involving the current user |

## How a transfer stays consistent without a real DB

`db.transferFunds()` in `src/data/db.js` reads both balances, validates them, and writes
both updates in one synchronous block — no `await` in between. Since Node runs your JS on
a single thread, no other request can interleave mid-transfer, so both balances update
together or not at all (e.g. if the sender has insufficient funds, nothing is written).

## Swapping in a real database later

Everything outside `src/data/db.js` talks to that module's exported functions
(`createUser`, `findUserByEmail`, `transferFunds`, etc.), not to a raw array. To move to
Postgres/Mongo/etc., reimplement those functions against your real DB (making
`transferFunds` a proper DB transaction) — controllers and routes don't need to change.
# banking-system-task
