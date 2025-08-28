import { useEffect, useState } from "react"
import fetchFromRealTime from "../helpers/fetchFromRealTime"

const Tile = ({db_symbol, stockTotal, stockChange, stockPercent}) => {
    const [realTimeStockData, setRealTimeStockData] = useState({})

    useEffect(() => {

        fetchFromRealTime(db_symbol)
            .then(
            data => {
                // console.log(data.body[0])
                setRealTimeStockData(data.body[0])
                const symbolName = data.body[0]?.longName
                const symbolsymb = data.body[0]?.symbol
                const total = parseFloat(data.body[0]?.regularMarketPrice)
                const total_change = parseFloat(data.body[0]?.regularMarketChange)
                const total_percent = parseFloat(data.body[0]?.regularMarketChangePercent)
                stockTotal(total, symbolName, symbolsymb)
                // console.log(`This is the total from tile ${total}`)
                stockChange(total_change)
                // console.log(`This is the total change from tile ${total_change}`)
                stockPercent(total_percent)
                // console.log(`This is the total percent from tile ${total_percent}`)
            }
        ).catch (
            (error) => {
                console.log(error)
            }
        )

    }, [])

    const stockSymbol = realTimeStockData?.symbol
    const stockPrice = realTimeStockData?.regularMarketPrice
    const stockName = realTimeStockData?.longName
    const stockPercentChange = realTimeStockData?.regularMarketChangePercent
    const stockPriceChange = realTimeStockData?.regularMarketChange

    const stockMarketUnixTime = realTimeStockData?.regularMarketTime
    const stockMarketDate = stockMarketUnixTime ? new Date(stockMarketUnixTime * 1000).toLocaleDateString() : null
    const stockMarketTime = stockMarketUnixTime ? new Date(stockMarketUnixTime * 1000).toLocaleTimeString() : null

    return (
        <>
        <div className="px-8 my-16">
            <div className="tile_width">
                <div className="border-2 rounded-xl flex items-center justify-between px-8 py-4 space-x-1">
                    <div className="text-2xl space-y-4">
                        <p className="font-bold">{stockSymbol ? stockSymbol : "S_SYMB"}</p>
                        <p>{stockPrice}</p>
                    </div>
                    <div className="flex-col justify-items-end">
                        <p className="text-xl text-nowrap">{stockName ? stockName : "S_NAME"}</p>
                        <div className={
                            stockPercentChange?.toString().charAt(0) == '-' ? 
                            "flex text-gho-red space-x-6 justify-end" :
                            "flex text-gho-green space-x-6 justify-end"
                        }>
                            <p>{stockPercentChange ? `${stockPercentChange.toFixed(2)}%` : "Percent_change"}</p><p>{stockPriceChange ? stockPriceChange.toFixed(2) : "Price_change"}</p>
                        </div>
                        <div className="flex w-40 space-x-6 justify-end">
                            <p className="text-nowrap">{stockMarketDate ? stockMarketDate : "Market_date"}</p><p className="text-nowrap">{stockMarketTime ? stockMarketTime : "Market_time"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Tile