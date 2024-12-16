import { createContext } from "react"
import { StockContextData } from "../typing"
export const StockContext = createContext<StockContextData | null>(null)
