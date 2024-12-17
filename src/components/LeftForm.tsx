import { useStock } from "../hooks/useStock"
import { fetchQuote } from "../services/api"
import { Autocomplete, Button, Card, CardContent, Container, TextField } from "@mui/material"
import { Stock } from "../typing"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const stockFormSchema = z.object({
  symbol: z.string().nonempty(),
  alertPrice: z.coerce.number().positive()
})
type StockFormInput = z.infer<typeof stockFormSchema>
export default function LeftForm() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<StockFormInput>({
    resolver: zodResolver(stockFormSchema),
    defaultValues: {
      symbol: '',
      alertPrice: 0,
    }
  })
  const { stockOptions: options, onAddStock, stockSymbolInput, stocks } = useStock()
  const handleSubmitStockForm = async (data: StockFormInput) => {
    const { symbol, alertPrice } = data

    const currentStock = stocks.find(stock => stock.symbol == symbol)
    let stock: Stock
    if (!currentStock) {

      const quote = await fetchQuote(symbol)
      stock = { ...quote, symbol, alertPrice }
    } else {
      stock = { ...currentStock, alertPrice }
    }
    onAddStock(stock)
    reset()
  }
  return (
    <Container>
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} component="form" onSubmit={handleSubmit(handleSubmitStockForm)}>
          <Controller
            name="symbol"
            control={control}
            render={({ field }) => {
              const { value, onChange } = field
              return <Autocomplete
                isOptionEqualToValue={(opt, val) => opt.value === val.value}
                renderInput={(params) => <TextField {...params} label="Select Stock" inputRef={stockSymbolInput} error={!!errors.symbol} helperText={errors.symbol?.message} />}
                options={options}
                getOptionLabel={opt => opt.label}
                getOptionKey={opt => opt.value}
                value={value ? options.find(opt => opt.value == value) : null}
                onChange={(_event, newValue) => {
                  onChange(newValue ? newValue.value : null)
                }}
              />
            }}
          />
          <Controller
            name="alertPrice"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Price Alert" error={!!errors.alertPrice} helperText={errors.alertPrice?.message} type="number" />
            )}
          />
          <Button variant="contained" type="submit">Add Stock</Button>
        </CardContent>
      </Card>
    </Container>
  )
}
