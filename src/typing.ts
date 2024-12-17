import { MutableRefObject } from "react"

export type StockOption = {
  label: string
  value: string
}
export type Stock = {
  symbol: string
  price: number
  alertPrice: number
  timestamp: number
}
export type StockMapData = Map<string, Stock[]>
export type StockContextData = {
  onAddStock: (stock: Stock) => void
  onAddStockOnly: (stock: Stock) => void
  stockOptions: StockOption[]
  stocks: Stock[]
  stockSymbolInput: MutableRefObject<HTMLInputElement | null>
  symbols: string[]
  rawStockData: StockMapData
}

export enum StockActionKind {
  ADD_STOCK,
}
export type StockAction = { type: StockActionKind, payload: Stock }
