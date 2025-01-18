import { useEffect, useState } from "react"
// import fetchSymbInfoFromYahoo from "../helpers/fetchFromYahoo"
import fetchFromRealTime from "../helpers/fetchFromRealTime"

const OldTile = ({symbol}) => {
    const [yahooStockData, setYahooStockData] = useState({})
    const [realTimeStockData, setRealTimeStockData] = useState({})


    useEffect(() => {
        // fetchSymbInfoFromYahoo(symbol)  
        fetchFromRealTime(symbol, setRealTimeStockData)
    }, [])

    // const symb = yahooStockData.quoteSummary?.result?.[0]?.price?.symbol;
    // const price = yahooStockData.quoteSummary?.result?.[0]?.price?.regularMarketPrice?.raw;
    // const name = yahooStockData.quoteSummary?.result?.[0]?.price?.longName;
    // const percent_change = yahooStockData.quoteSummary?.result?.[0]?.price?.regularMarketChangePercent.fmt;
    // const price_change = yahooStockData.quoteSummary?.result?.[0]?.price?.regularMarketChange.fmt;

    // const marketTime = yahooStockData.quoteSummary?.result?.[0]?.price?.regularMarketTime;
    // const marketDate = marketTime ? new Date(marketTime * 1000).toLocaleDateString() : null
    // const marketHour = marketTime ? new Date(marketTime * 1000).toLocaleTimeString() : null

    const symb = realTimeStockData?.body[0]?.symbol
    const price = realTimeStockData?.body[0]?.regularMarketPrice
    const name = realTimeStockData?.body[0]?.longName
    const percent_change = realTimeStockData?.body[0]?.regularMarketChangePercent
    const price_change = realTimeStockData?.body[0]?.regularMarketChange

    const marketTime = realTimeStockData?.body[0]?.regularMarketTime
    const marketDate = marketTime ? new Date(marketTime * 1000).toLocaleDateString() : null
    const marketHour = marketTime ? new Date(marketTime * 1000).toLocaleTimeString() : null


    return (
        <>
        {/* {yahooStockData} */}
        {realTimeStockData}
        <div className="px-8 my-16">
            <div className="tile_width">
                <div className="border-2 rounded-xl flex items-center justify-between px-8 py-4 space-x-1">
                    <div className="text-2xl space-y-4">
                        <p className="font-bold">{symb == null ? symb : "Symb"}</p>
                        <p>{price.toFixed(2)}</p>
                    </div>
                    <div className="flex-col justify-items-end">
                        <p className="text-xl text-nowrap">{name == undefined ? name : "Name"}</p>
                        {/* <div className="flex text-gho-red space-x-6 justify-end"> */}
                        <div className={
                            percent_change?.toString().charAt(0) == '-' ? 
                            "flex text-gho-red space-x-6 justify-end" :
                            "flex text-gho-green space-x-6 justify-end"
                        }>
                            <p>{percent_change == undefined ? percent_change.toFixed(2) : "Percent_change"}</p><p>{price_change ? price_change.toFixed(2) : "Price_change"}</p>
                        </div>
                        <div className="flex w-40 space-x-6 justify-end">
                            <p className="text-nowrap">{marketDate == undefined ? marketDate : "MarketDate"}</p><p className="text-nowrap">{marketHour == undefined ? marketHour : "MarketHour"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default OldTile