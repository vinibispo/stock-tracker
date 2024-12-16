import MuiToolbar from '@mui/material/Toolbar'
import { tabsClasses } from '@mui/material/Tabs'
import { AppBar, Stack, styled } from '@mui/material'
import StockCard from './StockCard'

const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
})

export default function TopCards() {
  const token: string = import.meta.env.VITE_FINNHUB_API_KEY
  console.log(token)
  // const socketRef = useRef(new WebSocket(`wss://ws.finnhub.io?token=${token}`))

  // useEffect(() => {
  //   const socket = socketRef.current
  //   socket.addEventListener("open", (event) => {
  //     socket.send(JSON.stringify({ type: "subscribe", symbol: "BTC-USD" }))
  //   })
  //
  //   socket.addEventListener("message", event => {
  //     const parsedJSON = JSON.parse(event.data)
  //     console.log(parsedJSON.type)
  //   })
  // }, [])

  const stocks = [
    {
      name: "BTC-USD",
      percentage: 1.88,
      value: 103342.2,
      alertValue: 1968.84
    },
    {
      name: "ETH-USD",
      percentage: 0.86,
      value: 3903.69,
      alertValue: 33.51
    },
    {
      name: "EUR/USD",
      percentage: 0.34,
      value: 1.0502,
      alertValue: 0.0036
    },
    {
      name: "GBP/USD",
      percentage: -0.42,
      value: 1.262,
      alertValue: 0
    },
    {
      name: "AAPL",
      percentage: 0.07,
      value: 248.13,
      alertValue: 0.17,
    }
  ]
  return (
    <AppBar
      component="header"
      position="fixed"
      sx={{
        display: { xs: 'auto'},
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        top: 'var(--template-frame-height, 0px)',
      }}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            flexGrow: 1,
            width: '100%',
            gap: 1,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: 'center', alignItems: 'center', gap: 1, padding: 1, overflowX: { xs: 'scroll', md: 'hidden' } }}
          >
            {stocks.map(stock => (
              <StockCard currency={stock.name} value={stock.value} percentage={stock.percentage} alertValue={stock.alertValue} key={stock.name} />
            ))}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
