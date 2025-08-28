import { useContext } from "react";
import { StockFilterContext } from "../context/StockFilterContext";

export const useStockFilterContext = () => {
    const context = useContext(StockFilterContext)

    if (!context) {
        throw Error('This hook must be in the context provider')
    }

    console.log(context)
    return context;
}
 
export default useStockFilterContext;