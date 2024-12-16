import MuiToolbar from '@mui/material/Toolbar'
import { tabsClasses } from '@mui/material/Tabs'
import { AppBar, Box, Button, Stack, styled, Typography } from '@mui/material'
import StockCard from './StockCard'
import { useStock } from '../hooks/useStock'

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
  const { stocks, stockSymbolInput } = useStock()
  const handleGoToLeftForm = () => {
    if (stockSymbolInput.current) stockSymbolInput.current.focus()
  }
  return (
    <AppBar
      component="header"
      position="fixed"
      sx={{
        display: { xs: 'auto' },
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        top: 'var(--template-frame-height, 0px)',
      }}
    >
      <Toolbar variant="regular">
        {stocks.length ? (
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
              sx={{ justifyContent: 'center', alignItems: 'center', gap: 1, padding: 1, overflowX: 'scroll', whiteSpace: 'nowrap', flexWrap: 'nowrap' }}
            >
              {stocks.map(stock => (
                <StockCard currency={stock.symbol} value={stock.price} alertValue={stock.alertPrice} key={stock.symbol} />
              ))}
            </Stack>
          </Stack>
        ) : (
          <Box sx={{ textAlign: 'center', marginTop: 4, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              No stocks being tracked
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Add stocks to monitor their real-time performance.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoToLeftForm}>
              Add Stock
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
