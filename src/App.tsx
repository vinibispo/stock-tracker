import { Box, Container, Typography, Grid2 as Grid, Autocomplete, TextField, Card, CardContent, Button } from "@mui/material"
import TopCards from "./components/TopCards"
import { LineChart } from "@mui/x-charts"

function App() {

  return (
    <Box sx={{ display: 'flex', width: '100%' }} flexDirection='column'>
      <TopCards />
      <Grid container spacing={2} sx={{ marginTop: 10 }}>
        <Grid size={3}>
          <LeftForm />
        </Grid>
        <Grid size={9}>
          <Charts />
        </Grid>
      </Grid>
    </Box>
  )
}

function LeftForm() {
  const options = [{ label: 'My Currency' }]
  return (
    <Container>
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Autocomplete renderInput={(params) => <TextField {...params} label="Select Stock" />}
            options={options}
          />
          <TextField label="Price Alert" />
          <Button variant="contained">Add Stock</Button>
        </CardContent>
      </Card>
    </Container>
  )
}

function Charts() {
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <LineChart xAxis={[{ data: [10, 20, 30, 40, 50]}]} series={[{ data: [1, 2, 3, 5, 4] }]} height={400} width={300} />
      </Box>
    </Container>
  )
}

export default App
