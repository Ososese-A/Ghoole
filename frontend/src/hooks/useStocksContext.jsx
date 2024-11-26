import { useContext } from "react"
import { StockContext } from "../context/stockContext"

export const useStockContext = () => {
    context = useContext(StockContext)

    if(!context) {
        throw Error('This hook must be used in the context provider')
    }

    return context
}