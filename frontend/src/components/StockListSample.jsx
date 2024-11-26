import { useEffect, useState } from "react";
import TileSample from "./TileSample"

const StockListSample = () => {
    const listings = [ 
        { 
            "Symb": "WBD", 
            "price": 8.36, 
            "name": "Warner Bros Discovery Inc.", 
            "percent_change": -1.76, 
            "price_change": -0.05, 
            "date": "11/16/2024", 
            "time": "12:31" 
        }, 
        { 
            "Symb": "WKHS", 
            "price": 0.77, 
            "name": "Workhorse Group Inc.", 
            "percent_change": -0.54, 
            "price_change": -0.01, 
            "date": "11/16/2024", 
            "time": "12:31" 
        }, 
        { 
            "Symb": "UA", 
            "price": 7.60, 
            "name": "Under Armour Inc.", 
            "percent_change": 0.11, 
            "price_change": 1.47, 
            "date": "11/16/2024", 
            "time": "12:31" 
        }, 
        { 
            "Symb": "AVGO", 
            "price": 169.62, 
            "name": "Broadcom Inc.", 
            "percent_change": 1.31, 
            "price_change": 2.20, 
            "date": "11/16/2024", 
            "time": "12:31" 
        }, 
        { 
            "Symb": "AMZN", 
            "price": 171.17, 
            "name": "Amazon.com Inc.", 
            "percent_change": -0.38, 
            "price_change": -1.89, 
            "date": "11/16/2024", 
            "time": "12:32" 
        }, 
        { 
            "Symb": "ORCL", 
            "price": 115.74, 
            "name": "Oracle Corporation", 
            "percent_change": -0.74, 
            "price_change": -0.04, 
            "date": "11/16/2024", 
            "time": "12:31" 
        } 
    ]

    const [allSix, setAllSix] = useState({})
    const [symb, setSymb] = useState([])

    useEffect(() => {

        const fetchSymb = async () => {
            const url = 'http://localhost:4000/api/stock/'
            const options = {
                method: 'GET'
            }

            try {
                const response = await fetch(url, options)
                const result = await response.json();
                setSymb(result);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSymb()

        const sampleFetch = async () => {
            const url = 'https://yahoo-finance166.p.rapidapi.com/api/stock/get-price?region=US&symbol=WBD';
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
                setAllSix(result)
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }

        sampleFetch()
    },[])

    // const price = allSix.quoteSummary.result[0].price.regularMarketPrice.raw;
    const price = allSix.quoteSummary?.result?.[0]?.price?.regularMarketPrice?.raw;
    const symbol = allSix.quoteSummary?.result?.[0]?.price?.symbol; 
    const name = allSix.quoteSummary?.result?.[0]?.price?.longName;
    const change = allSix.quoteSummary?.result?.[0]?.price?.regularMarketChange.fmt;
    const percentChange = allSix.quoteSummary?.result?.[0]?.price?.regularMarketChangePercent.fmt;

    const marketTime = allSix.quoteSummary?.result?.[0]?.price?.regularMarketTime; 
    // Convert Unix timestamp to a readable date 
    const marketDate = marketTime ? new Date(marketTime * 1000).toLocaleDateString() : null; 
    const marketHour = marketTime ? new Date(marketTime * 1000).toLocaleTimeString() : null;

    const s = symb[0]?.symb
    const t = symb[1]?.symb
    const u = symb[2]?.symb
    const v = symb[3]?.symb

    return (
        <>
        {price} <br />
        {symbol} <br />
        {name} <br />
        {change} <br />
        {percentChange} <br />
        {marketDate} <br />
        {marketHour} <br />
        {s} <br />
        {t} <br />
        {u} <br />
        {v} <br />
        {symb.length}
        <div className="flex w-screen justify-center">
            <div className="tile_case_width flex-col">
                <div> 
                {
                    listings.map(
                        (listing, index) => {
                            return (
                                <TileSample 
                                    key={index} 
                                    symb={listing.Symb} 
                                    price={listing.price} 
                                    stock_name={listing.name} 
                                    percent_change={listing.percent_change}
                                    price_change={listing.price_change}
                                    date={listing.date}
                                    time={listing.time}
                                />
                            )
                        }
                    )
                }
                </div>
            </div>
        </div>
        </>
    )
}

export default StockListSample