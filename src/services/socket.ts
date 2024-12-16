const token = import.meta.env.VITE_FINNHUB_API_KEY
const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`)
