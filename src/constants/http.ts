export const API_BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? 'https://tracy-server-devci.up.railway.app/api'
    : 'http://localhost:3001/api';
