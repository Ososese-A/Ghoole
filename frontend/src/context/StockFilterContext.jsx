import { createContext, useReducer } from "react";

export const StockFilterContext = createContext()

export const stockFilterContextReducer = (state, action) => {
    switch (action.type) {
        case 'PORTFOLIO':
            return {stockFilter: 'portfolio'}
        case 'SECTOR':
            return {stockFilter: 'sector'}
        case 'INDUSTRY':
            return {stockFilter: 'industry'}
        case 'PRICE':
            return {stockFilter: 'price'}
        case 'NAME':
            return {stockFilter: 'name'}
        case 'ADDED':
            return {stockFilter: 'added'}
        default:
            return {stockFilter: null}
    }
}

export const StockFilterContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(
        stockFilterContextReducer,
        {stockFilter: null}
    )

    return ( 
        <StockFilterContext.Provider value={{state, dispatch}}>
            {children}
        </StockFilterContext.Provider>
     );
}
 
export default StockFilterContextProvider;