# Technical Test: Mobile Store

## Mobile Store
A mobile online store made with React. It allows you to view product details, add to cart and navigate through the application with a smooth experience.
The application has two views:

1. **Home**: Product list
2. **Detail**: Product details page

## Technologies
- **Framework**: React
- **Package**: Vite
- **Routing**: React DOM Router
- **Lint**: ESLint
- **Testing**: Vitest + Testing Library

## Scripts
- `npm start` — Starts the application in development mode (local server with hot reload)
- `npm run build` — Builds for production (output in `dist/`)
- `npm test` — Runs unit tests
- `npm run lint` — Checks code style and quality with ESLint

## Requeriments
For the application to work properly, you must configure the environment variables. Use the `.env.example` file as a reference.

1. Copy the `.env.example` file and rename it to .env:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and replace the example URL with the correct one:
   ```
   # Antes:
   VITE_API_URL=https://set-your-api-url.com/api
   VITE_CACHE_DURATION_MILLIS=3600000

   # Después:
   VITE_API_URL=https://itx-frontend-test.onrender.com/api
   VITE_CACHE_DURATION_MILLIS=3600000
   ```
3. Save the file.

## Install and execute the aplication

1. Clone the repository
```bash
   git clone https://github.com/Dedevnull/mobile-store.git
   cd mobile-store
```
2. Install dependencies
```bash
   npm install
```
3. Execute aplication
```bash
   npm start
```
4. Open your browser and go to [http://localhost:5173](http://localhost:5173/)
