import { API_KEY } from "../constants";
import { StockOption } from "../typing";

const baseUrl = "https://finnhub.io/api/v1" 
const defaultQueryString = `token=${API_KEY}`
type FetchQuoteResponse = {
  price: number
  timestamp: number
}

export const fetchQuote: (symbol: string) => Promise<FetchQuoteResponse> = async(symbol) => {
  const data = await fetch(`${baseUrl}/quote?symbol=${symbol}&${defaultQueryString}`, {
  }).then(res => res.json())

  const stock: FetchQuoteResponse = {
    price: data.c,
    timestamp: data.t
  }
  return stock
}

export const fetchSymbols: () => Promise<StockOption[]> = async() => {
  const data = await fetch(
    `${baseUrl}/stock/symbol?exchange=US&currency=USD&${defaultQueryString}`,
    {
      method: "GET",
    }
  ).then(res => res.json())

  const stockOptions: StockOption[] = []

  for (const response of data) {
    stockOptions.push({
      label: response.description,
      value: response.symbol
    })
  }
  return stockOptions
}
