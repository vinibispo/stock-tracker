import { useContext } from "react"
import { StockContextData } from "../typing"
import { StockContext } from "../contexts/StockContext"

export const useStock: () => StockContextData = () => {
  const context = useContext(StockContext)
  if (!context) {
    throw new Error("Cannot use a context outside of the provider")
  }
  return context
}
