import { useEffect, useState } from "react"

const Tile = ({symbol}) => {
    const [stockData, setStockData] = useState({})


    useEffect(() => {
        const fetchSymbInfo = async (symbol) => {
            const url = `https://yahoo-finance166.p.rapidapi.com/api/stock/get-price?region=US&symbol=${symbol}`;
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'bd6e6d157amshf36e3d1c4bbb870p1f530ejsnd25bf5616122',
                        'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com'
                    }
                };
    
                try {
                    const response = await fetch(url, options);
                    const result = await response.json();
                    console.log(result);
                    setStockData(result);
                } catch (error) {
                    console.error(error);
                }
        }


        fetchSymbInfo(symbol)
    }, [])

    const symb = stockData.quoteSummary?.result?.[0]?.price?.symbol;
    const price = stockData.quoteSummary?.result?.[0]?.price?.regularMarketPrice?.raw;
    const name = stockData.quoteSummary?.result?.[0]?.price?.longName;
    const percent_change = stockData.quoteSummary?.result?.[0]?.price?.regularMarketChangePercent.fmt;
    const price_change = stockData.quoteSummary?.result?.[0]?.price?.regularMarketChange.fmt;

    const marketTime = stockData.quoteSummary?.result?.[0]?.price?.regularMarketTime;
    const marketDate = marketTime ? new Date(marketTime * 1000).toLocaleDateString() : null
    const marketHour = marketTime ? new Date(marketTime * 1000).toLocaleTimeString() : null


    return (
        <>
        {/* {stockData} */}
        <div className="px-8 my-16">
            <div className="tile_width">
                <div className="border-2 rounded-xl flex items-center justify-between px-8 py-4 space-x-1">
                    <div className="text-2xl space-y-4">
                        <p className="font-bold">{symb}</p>
                        <p>{price}</p>
                    </div>
                    <div className="flex-col justify-items-end">
                        <p className="text-xl text-nowrap">{name}</p>
                        {/* <div className="flex text-gho-red space-x-6 justify-end"> */}
                        <div className={
                            percent_change?.toString().charAt(0) == '-' ? 
                            "flex text-gho-red space-x-6 justify-end" :
                            "flex text-gho-green space-x-6 justify-end"
                        }>
                            <p>{percent_change}</p><p>{price_change}</p>
                        </div>
                        <div className="flex w-40 space-x-6 justify-end">
                            <p className="text-nowrap">{marketDate}</p><p className="text-nowrap">{marketHour}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Tile