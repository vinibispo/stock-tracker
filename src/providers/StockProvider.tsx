import { ReactNode, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react"
import { Stock, StockAction, StockActionKind, StockMapData, StockOption } from "../typing"
import { fetchSymbols as fetchStockOptions } from "../services/api"
import { StockContext } from "../contexts/StockContext"
import { MAX_STOCK_CAPACITY } from "../constants"

const initialStocks: StockMapData = new Map()
export function StockProvider({ children }: { children: ReactNode }) {
  const stocksReducer = (state: StockMapData, action: StockAction) => {
    const { type, payload } = action
    const currentState = new Map(state)
    switch (type) {
      case StockActionKind.ADD_STOCK: {
        if (currentState.has(payload.symbol)) {
          const previousEntries = currentState.get(payload.symbol)
          if (!previousEntries) return currentState
          const newEntry = { ...payload, alertPrice: previousEntries[previousEntries.length - 1].alertPrice }
          const updatedEntries = [...previousEntries, newEntry]
          if (updatedEntries.length > MAX_STOCK_CAPACITY) {
            updatedEntries.shift()
          }
          currentState.set(payload.symbol, updatedEntries)
          return currentState
        }
        currentState.set(payload.symbol, [payload])
        return currentState

      }
      default:
        return currentState
    }
  }
  const [stockMap, dispatch] = useReducer(stocksReducer, initialStocks)
  const [stockOptions, setStockOptions] = useState<StockOption[]>([])
  const [symbols, setSymbols] = useState<string[]>([])
  const stockSymbolInput = useRef<HTMLInputElement | null>(null)
  const onAddStock = useCallback((stock: Stock) => {
    dispatch({
      type: StockActionKind.ADD_STOCK,
      payload: stock
    })
    setSymbols(prevState => Array.from(new Set([...prevState, stock.symbol])))
  }, [])

  const onAddStockOnly = useCallback((stock: Stock) => {
    dispatch({
      type: StockActionKind.ADD_STOCK,
      payload: stock
    })
  }, [])

  useEffect(() => {
    fetchStockOptions().then(data => setStockOptions(data))
  }, [])
  const stocks = useMemo(() => {
    return Array.from(stockMap.entries()).map(([, stockValues]) => {
      return stockValues.reduce((latest, stock) => stock.timestamp > latest.timestamp ? stock : latest)
    })
  }, [stockMap])

  return (
    <StockContext.Provider value={{
      onAddStock,
      stocks,
      stockOptions,
      stockSymbolInput,
      symbols,
      onAddStockOnly,
      rawStockData: stockMap
    }}>{children}</StockContext.Provider>
  )
}

