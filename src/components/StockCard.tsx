import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Card as MuiCard, CardContent, Typography, Box, useTheme } from '@mui/material'
type StockCardProps = {
  currency: string,
  value: number,
  alertValue?: number
}
export default function StockCard({ currency, value, alertValue = 0 }: StockCardProps) {
  let percentage = (value - alertValue) / value * 100
  if (value == 0) {
    percentage = 0
  }
  return (
    <MuiCard sx={{ width: { xs: '100%', sm: 220, minWidth: 220 } }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', alignItems: 'center' }} flexDirection={{md: 'row', xs: 'column'  }}>
          <Typography component="span" variant='subtitle1'>{currency}</Typography>
          <Typography component="span" variant='subtitle1'>{value.toFixed(2)}</Typography>
        </Box>
        <Percentage percentage={percentage} alertValue={alertValue} />
      </CardContent>
    </MuiCard>
  )
}

function Percentage({percentage, alertValue }: { percentage: number, alertValue: number }) {
  const theme = useTheme()
  const isGreaterThanZero = percentage > 0
  const color = isGreaterThanZero ? theme.palette.success.main : theme.palette.error.main 
  const icon = isGreaterThanZero ? <ExpandLess /> : <ExpandMore />
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', color }}>
      {icon}
      <Typography variant='body2'>
        {percentage == 0 ? '-'  : percentage.toFixed(2)}%{' '}
        <Typography component="span" variant='caption'>({alertValue.toFixed(2)})</Typography>
      </Typography>
    </Box>
  )
}
