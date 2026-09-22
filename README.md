# Banking System API

A simple banking system REST API built with **Node.js**, **Express**, **Zod** (validation),
**CORS**, **express-rate-limit**, and an **in-memory dummy database** (no real DB required).

> Data is stored in plain JS arrays in memory (`src/data/stores.js`). It resets every time
> the server restarts and is not shared across multiple instances/processes. Swap it for a
> real database later without touching controllers or routes — just reimplement the functions
> re-exported from `src/data/db.js`.

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

## Architecture note

Feature logic is split into focused one-function modules. A few barrels
(`db.js`, `userController.js`, `hash.js`, `authSchema.js`) re-export related modules so
callers can import a stable facade where that helps.

## Project structure

```
banking-system-task/
├── package.json
├── .env.example
└── src/
    ├── server.js                          # entrypoint
    ├── serverHandlers/
    │   └── onUnhandledRejection.js
    ├── app.js                             # express app: middleware + route mounting
    ├── data/
    │   ├── stores.js                      # in-memory users + transactions arrays
    │   ├── generateAccountNumber.js
    │   ├── createUser.js
    │   ├── findUserByEmail.js
    │   ├── findUserById.js
    │   ├── findUserByAccountNumber.js
    │   ├── searchUsers.js
    │   ├── createTransaction.js
    │   ├── getTransactionsForUser.js
    │   ├── transferFunds.js
    │   ├── users.js                       # barrel: user store + user functions
    │   ├── transactions.js                # barrel: tx store + tx functions
    │   └── db.js                          # barrel: full data API facade
    ├── schemas/
    │   ├── auth/
    │   │   ├── registerSchema.js
    │   │   ├── loginSchema.js
    │   │   ├── createPinSchema.js
    │   │   └── updatePinSchema.js
    │   ├── transaction/
    │   │   ├── transferSchema.js
    │   │   └── searchQuerySchema.js
    │   └── authSchema.js                  # barrel
    ├── middlewares/
    │   ├── authenticate.js
    │   ├── authorize.js
    │   ├── validate.js
    │   ├── errorHandler.js
    │   ├── corsOrigin.js
    │   └── limiters/
    │       ├── generalLimiter.js
    │       ├── authLimiter.js
    │       └── transferLimiter.js
    ├── controllers/
    │   ├── auth/
    │   │   ├── register.js
    │   │   └── login.js
    │   ├── user/
    │   │   ├── getMe.js
    │   │   ├── getBalance.js
    │   │   ├── createPin.js
    │   │   ├── updatePin.js
    │   │   └── search.js
    │   ├── transaction/
    │   │   ├── transfer.js
    │   │   └── history.js
    │   └── userController.js              # barrel
    ├── routes/
    │   ├── authRoutes.js
    │   ├── userRoutes.js
    │   └── transactionRoutes.js
    └── utils/
        ├── hash/
        │   ├── hashPassword.js
        │   ├── comparePassword.js
        │   ├── hashPin.js
        │   └── comparePin.js
        ├── hash.js                        # barrel
        ├── signToken.js
        └── toPublicUser.js
```

## Setup

```bash
npm install
cp .env.example .env      # then edit JWT_SECRET, ALLOWED_ORIGINS, etc.
npm run dev                # or: npm start
```

Server boots on `http://localhost:PORT` by default. No database setup step — the dummy
store is ready as soon as the process starts.

## API reference

All request bodies are JSON. All protected routes require `Authorization: Bearer <token>`.

### Health

| Method | Route     | Notes                |
|--------|-----------|----------------------|
| GET    | `/health` | Liveness check (`OK`) |

### Auth

| Method | Route                | Body                         | Notes                                      |
|--------|----------------------|------------------------------|--------------------------------------------|
| POST   | `/api/auth/register` | `fullName, email, password`  | Password needs upper/lower/digit, 8+ chars |
| POST   | `/api/auth/login`    | `email, password`            | Returns `{ user, token }`                  |

### Users (protected)

| Method | Route                   | Body / Query                            | Notes                                         |
|--------|-------------------------|-----------------------------------------|-----------------------------------------------|
| GET    | `/api/users/me`         | —                                       | Current user profile                          |
| GET    | `/api/users/balance`    | —                                       | `{ balance, accountNumber }`                  |
| GET    | `/api/users/search?q=`  | query: `q` (required), `limit` (opt)    | Search users by name/email/account number     |
| POST   | `/api/users/pin`        | `pin` (4 digits)                        | Create PIN (only if none set yet)             |
| PATCH  | `/api/users/pin`        | `currentPin, newPin`                    | Update existing PIN                           |

### Transactions (protected)

| Method | Route                        | Body                                | Notes                                              |
|--------|------------------------------|-------------------------------------|----------------------------------------------------|
| POST   | `/api/transactions/transfer` | `toAccountNumber, amount, pin, note?` | Debits sender, credits recipient, requires PIN   |
| GET    | `/api/transactions/history`  | —                                   | All transactions involving the current user        |

## How a transfer stays consistent without a real DB

`transferFunds()` in `src/data/transferFunds.js` (re-exported via `src/data/db.js`) reads
both balances, validates them, and writes both updates in one synchronous block — no
`await` in between. Since Node runs your JS on a single thread, no other request can
interleave mid-transfer, so both balances update together or not at all (e.g. if the
sender has insufficient funds, nothing is written).

## Swapping in a real database later

Everything outside `src/data/` talks to `db.js`'s exported functions
(`createUser`, `findUserByEmail`, `transferFunds`, etc.), not to a raw array. To move to
Postgres/Mongo/etc., reimplement those one-function modules against your real DB (making
`transferFunds` a proper DB transaction) — controllers and routes don't need to change.
