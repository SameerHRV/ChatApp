# ChatApp Backend API

This is a production-grade, highly structured Express + TypeScript backend designed for scalability, security, and performance.

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Validation**: Zod (schema validation for environment variables and requests)
- **Security**: Helmet (security headers), CORS, Express Rate Limit
- **Logging**: Winston & Morgan
- **Real-time**: Socket.io

## Directory Structure

```
backend/
├── src/
│   ├── config/          # Configurations (env validation, db client configs)
│   ├── controllers/     # Route handlers
│   ├── db/              # Database initialization and schemas
│   ├── middleware/      # Global & custom middlewares (auth, errors, rate limiter, validations)
│   ├── routes/          # REST route declarations
│   ├── services/        # Business logic layer
│   ├── types/           # Global or local typescript type extensions
│   ├── utils/           # Utility wrappers and logger config
│   ├── app.ts           # Express Application setup
│   └── index.ts         # Application server runner and db connector
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Update variables inside .env
   ```

### Running the App

- **Development Mode** (with hot reloading via `tsx`):
  ```bash
  npm run dev
  ```

- **Build Production**:
  ```bash
  npm run build
  ```

- **Run Production**:
  ```bash
  npm run start
  ```

- **Lint and Format**:
  ```bash
  npm run lint
  npm run format
  ```
