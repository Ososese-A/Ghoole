import { createContext, useReducer } from "react"

export const StockFilterContext = createContext()

export const stockFilterReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILTER_INFO':
            return {
                info: action.payload
            }
        case 'CREATE_FILTER_INFO':
            return {
                info: [action.payload, ...state.info]
            }
        case 'DELETE_FILTER_INFO':
            return {
                info: state.info.filter((i) => i.sector !== action.payload.sector)
            }
        default:
            return state
    }
}

export const StockFilterContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(
        stockFilterReducer,
        {finterInfo: null}
    )

    return (
        <StockFilterContext.Provider value={{...state, dispatch}}>
            {children}
        </StockFilterContext.Provider>
    )
}