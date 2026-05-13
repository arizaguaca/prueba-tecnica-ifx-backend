# IFX VM Management Backend

Technical test for VM management using Node.js, Express, and TypeScript.

## Architecture

This project follows **Clean Architecture** principles:

- **src/domain**: Core business logic, entities, and repository interfaces.
- **src/application**: Use cases and service implementations.
- **src/infrastructure**: Data persistence (repositories, database config) and external services.
- **src/api**: HTTP layer (routes, controllers, middlewares).
- **src/config**: Environment variables and global configurations.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Security**: Helmet, CORS
- **Linter/Formatter**: ESLint, Prettier
- **Environment**: Dotenv

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

### Running the project

- **Development**:
  ```bash
  npm run dev
  ```

- **Build**:
  ```bash
  npm run build
  ```

- **Production**:
  ```bash
  npm start
  ```

- **Linting**:
  ```bash
  npm run lint
  npm run format
  ```