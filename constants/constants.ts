const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';
const API_PORT = process.env.NEXT_PUBLIC_API_PORT;

export const API_URL = API_PORT 
  ? `${API_URL_BASE}:${API_PORT}` 
  : API_URL_BASE;

export const GOOGLE_CALENDAR_URL = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_URL || '';
