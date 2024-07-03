// src/mocks/handlers.js
import { http, HttpResponse, RequestHandler } from 'msw'
// import type { Account } from '@/services/types/Account'
// import { API_URL } from '@/lib/constants/api'
const accounts: Record<string, any> = {
  '1': { id: '1', accountNumber: 'ACC1', balance: 1000, currency: 'USD' },
  '2': { id: '2', accountNumber: 'ACC2', balance: 200, currency: 'USD' },
}

const handlers: RequestHandler[] = []

export { handlers }
