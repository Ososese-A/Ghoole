import { useContext } from "react"
import { StockFilterContext } from "../context/StockFilterContext"

export const useStockFilterContext = () => {
    context = useContext(StockFilterContext)

    return context
}