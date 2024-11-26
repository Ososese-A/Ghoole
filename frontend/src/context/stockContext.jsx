import { createContext, useReducer } from "react";


export const StockContext = createContext()

export const stockReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STOCKS': 
            return {
                stocks: action.payload
            }
        case 'CREATE_STOCK':
            return {
                stocks: [action.payload, ...state.stocks]
            }
        case 'DELETE_STOCK': 
            return {
                stocks: state.stocks.filter((s) => s._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const StockContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        stockReducer, 
        {stocks: null}
    )

    return (
        <StockContext.Provider value={{...state, dispatch}}>
            {children}
        </StockContext.Provider>
    )
}