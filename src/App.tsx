import { Box, Grid2 as Grid } from "@mui/material"
import TopCards from "./components/TopCards"
import LeftForm from "./components/LeftForm"
import { useEffect } from "react"
import { useStock } from "./hooks/useStock"
import { API_KEY } from "./constants"
import StockCharts from "./components/StockCharts"

type TradeWebSocketMessage = {
  s: string
  t: number
  p: number
}
function App() {

  const { symbols, onAddStockOnly } = useStock()
  useEffect(() => {
    const token = API_KEY
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`)
    socket.addEventListener("open", () => {
      console.log("WebSocket connected")
      symbols.forEach(symbol =>
        socket.send(JSON.stringify({ type: "subscribe", symbol }))
      )

    })

    socket.addEventListener("message", (event) => {
      const { type, data } = JSON.parse(event.data)
      switch (type) {
        case 'trade': {
          data.forEach((trade: TradeWebSocketMessage) => {
            onAddStockOnly({
              symbol: trade.s,
              timestamp: trade.t,
              price: trade.p,
              alertPrice: 0
            })
          })
        }
      }
    })

    return () => {
      symbols.forEach(symbol => socket.send(JSON.stringify({ type: "unsubscribe", symbol })))
      socket.close()
    }
  }, [onAddStockOnly, symbols])

  return (
    <Box sx={{ display: 'flex', width: '100%' }} flexDirection='column'>
      <TopCards />
      <Grid container spacing={2} sx={{ marginTop: 30 }}>
        <Grid size={3}>
          <LeftForm />
        </Grid>
        <Grid size={9}>
          <StockCharts />
        </Grid>
      </Grid>
    </Box>
  )
}



export default App
