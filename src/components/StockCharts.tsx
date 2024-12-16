import { Container, Grid2 as Grid, Typography } from "@mui/material"
import { LineChart } from "@mui/x-charts"
import { useStock } from "../hooks/useStock"
import { useMemo } from "react"

export default function StockCharts() {
  const { rawStockData } = useStock()
  const dataToChartInSeries = useMemo(() => {
    const array: { data: { x: number, y: number }[], id: string }[] = []
    rawStockData.forEach((stocks, key) => {
      array.push({ data: stocks.map(stock => ({ x: stock.timestamp, y: stock.price })), id: key })
    })
    return array
  }, [rawStockData])

  return (
    <Container>
      <Grid container>
        {dataToChartInSeries.map(data => (
          <Grid size={12} key={data.id}>
            <Typography>{data.id}</Typography>
            <LineChart series={[{ dataKey: 'y' }]} dataset={data.data} xAxis={[{ dataKey: 'x', scaleType: 'time', valueFormatter(value, _) {
                return new  Date(value).toLocaleString()
            }, }]} height={300} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
