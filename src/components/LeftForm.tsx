import { FormEventHandler } from "react"
import { useStock } from "../hooks/useStock"
import { fetchQuote } from "../services/api"
import { Autocomplete, Button, Card, CardContent, Container, TextField } from "@mui/material"
import { Stock } from "../typing"

export default function LeftForm() {
  const { stockOptions : options, onAddStock, stockSymbolInput, stocks } = useStock()
  const handleAddStock: FormEventHandler<HTMLFormElement> = async(event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const symbol = formData.get('symbol')
    const alertPriceStr = formData.get('alertPrice')
    if (!symbol) {
      event.currentTarget.focus()
      return
    }
    if (!alertPriceStr) return
    if (symbol instanceof File || alertPriceStr instanceof File) return

    const alertPrice = Number(alertPriceStr)
    const currentStock = stocks.find(stock => stock.symbol == symbol)
    let stock: Stock
    if (!currentStock) {
    
    const quote = await fetchQuote(symbol)
    stock  = {...quote, symbol, alertPrice }
  } else {
    stock = {...currentStock, alertPrice } 
  }
    onAddStock(stock)
    if (form) form.reset()
  }
  return (
    <Container>
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} component="form" onSubmit={handleAddStock}>
          <Autocomplete renderInput={(params) => <TextField {...params} label="Select Stock" name="symbol" inputRef={stockSymbolInput} />}
            options={options}
          />
          <TextField label="Price Alert" name="alertPrice" />
          <Button variant="contained" type="submit">Add Stock</Button>
        </CardContent>
      </Card>
    </Container>
  )
}
