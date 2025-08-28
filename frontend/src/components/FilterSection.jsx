import { useContext, useEffect, useState } from "react";
import getFilterSymbol from "../helpers/getFilterSymbol";
import getStockSymbs from "../helpers/getStockSymbs";
import processFetchedData from "../helpers/processFetchesData";
import SectorFilterTile from "./SectorFilterTile";
import IndustryFilterTile from "./IndustryFilterTile";
import useStockFilterContext from "../hooks/useStockFilterContext";
import { TileViewContext } from "./StockList";


const FilterSection = () => {
    const now = new Date()
    const currentDate = now.toLocaleDateString()
    const currentTime = now.toLocaleTimeString()


    // const [sectors, setSectors] = useState([])
    // const [industry, setIndustry] = useState([])
    // const [symboldBySector, setSymbolBySector] = useState([])
    // const [symboldByIndustry, setSymbolByIndustry] = useState([])
    const [sectorTileValues, setSectorTileValues] = useState([])
    const [industryTileValues, setIndustryTileValues] = useState([])
    


    useEffect(() => {
        //get all the sectors/industries
        const getStocksSectors = async() => {
            const stocks = await getStockSymbs()
    
            const sectorsArr = new Set()
            
            stocks.forEach(stock => {
                if (stock.sector) {
                    sectorsArr.add(stock.sector)
                }
            });
            
            // return Array.from(sectorsArr);
            // setSectors(sectorsArr)
            // console.log(stocks)
            // console.log(sectorsArr)
            // getSymbolsBySector(stocks, sectorsArr)
            sortBeforeget(sectorsArr, stocks)
        }

        //get the get all the stock from each of the industries 
        const getSymbolsBySector = (stocks, sector) => {
            const symbols = stocks
            .filter(stock => stock.sector === sector)
            .map(stock => stock.symb)
            
            const symbSectorRes = [sector, symbols]
            // return symbols
            // console.log(sector)
            // console.log(symbols)
            // console.log(symbSectorRes)
            // setSymbolBySector(symbSectorRes)
            return symbSectorRes
        }

        const sortBeforeget = (sortSector, stocks) => {
            const sortedRes = []
            // console.log("From the sortBeforeget", sortSector)
            sortSector.forEach( sec => {
                // console.log(`from the foreach ${sec}`)
                sortedRes.push(getSymbolsBySector(stocks, sec)) 
            }) 

            // console.log("This is from the sortedREs", sortedRes)
            getSectorValues(sortedRes)
        }



        //get the price, change and percent from each of those industries and do the summation
        const getSectorValues = async (sortedRes) => {
            const resValues = [];
        
            for (const arr of sortedRes) {
                const resValueSector = arr[0];
        
                const stockPromises = arr[1].map(async (stock) => {
                    const fetched = await processFetchedData(stock);
                    return [stock, fetched];
                });
        
                const resolvedStocks = await Promise.all(stockPromises);
                const intermediaryData = [resValueSector, resolvedStocks];
                resValues.push(intermediaryData);
            }
        
            getSectorSummation(resValues);
        };
        
        const getSectorSummation = (resValues) => {
            // console.log("resValues:", resValues)
            const resValuesArr = []
            for (const res of resValues) {
                // console.log("values of res:", res)
                // console.log("values of res:", res[0])
                // console.log("values of res[1]:", res[1])
                // console.log("length of res[1]:", res[1].length)
                let totalPrice = 0
                let totalPriceChange = 0
                let totalPricePercent = 0
                let sectorStocks = []
                for (const es of res[1]) {
                    // console.log("values of es:", es)
                    // console.log("values of es[1] :", es[1])
                        const {price, price_change, price_percent} = es[1]

                        totalPrice += parseFloat(price)

                        totalPriceChange += parseFloat(price_change)

                        totalPricePercent += parseFloat(price_percent)

                        // console.log(es[0])
                        sectorStocks.push(es[0])
                }

                const theSector = res[0]
                const theSectorSymb = getFilterSymbol(theSector)
                const finalTotalPrice = parseFloat(totalPrice).toFixed(2)
                const finalTotalPriceChange = parseFloat(totalPriceChange).toFixed(2)
                const finalTotalPricePercnet = parseFloat(totalPricePercent).toFixed(2)
                const stocksInSector = sectorStocks

                const dataRes = {
                    theSector,
                    theSectorSymb,
                    finalTotalPrice,
                    finalTotalPriceChange,
                    finalTotalPricePercnet,
                    stocksInSector
                }

                // console.log(dataRes)
                resValuesArr.push(dataRes)
            }
            // console.log( "This it what we just added",resValuesArr)
            setSectorTileValues(resValuesArr)
        }


        getStocksSectors()
    }, [])


    useEffect(() => {
        //get all the sectors/industries
        const getStocksIndustry = async() => {
            const stocks = await getStockSymbs()
    
            const industryArr = new Set()
            
            stocks.forEach(stock => {
                if (stock.industry) {
                    industryArr.add(stock.industry)
                }
            });
            
            // return Array.from(sectorsArr);
            // setIndustry(industryArr)
            // console.log(stocks)
            // console.log(sectorsArr)
            // getSymbolsBySector(stocks, sectorsArr)
            sortBeforegetIndustry(industryArr, stocks)
        }

        //get the get all the stock from each of the industries 
        const getSymbolsByIndustry = (stocks, industry) => {
            const symbols = stocks
            .filter(stock => stock.industry === industry)
            .map(stock => stock.symb)
            
            const symbIndustryRes = [industry, symbols]
            // return symbols
            // console.log(sector)
            // console.log(symbols)
            // console.log(symbSectorRes)
            // setSymbolByIndustry(symbIndustryRes)
            return symbIndustryRes
        }

        const sortBeforegetIndustry = (sortIndustry, stocks) => {
            const sortedRes = []
            // console.log("From the sortBeforeget", sortSector)
            sortIndustry.forEach( ind => {
                // console.log(`from the foreach ${sec}`)
                sortedRes.push(getSymbolsByIndustry(stocks, ind)) 
            }) 

            // console.log("This is from the sortedREs", sortedRes)
            getIndustryValues(sortedRes)
        }



        //get the price, change and percent from each of those industries and do the summation
        const getIndustryValues = async (sortedRes) => {
            const resValues = [];
        
            for (const arr of sortedRes) {
                const resValueIndustry = arr[0];
        
                const stockPromises = arr[1].map(async (stock) => {
                    const fetched = await processFetchedData(stock);
                    return [stock, fetched];
                });
        
                const resolvedStocks = await Promise.all(stockPromises);
                const intermediaryData = [resValueIndustry, resolvedStocks];
                resValues.push(intermediaryData);
            }
        
            getIndustrySummation(resValues);
        };
        
        const getIndustrySummation = (resValues) => {
            // console.log("resValues:", resValues)
            const resValuesArr = []
            for (const res of resValues) {
                // console.log("values of res:", res)
                // console.log("values of res:", res[0])
                // console.log("values of res[1]:", res[1])
                // console.log("length of res[1]:", res[1].length)
                let totalPrice = 0
                let totalPriceChange = 0
                let totalPricePercent = 0
                let industryStocks = []
                for (const es of res[1]) {
                    // console.log("values of es:", es)
                    // console.log("values of es[1] :", es[1])
                        const {price, price_change, price_percent} = es[1]

                        totalPrice += parseFloat(price)

                        totalPriceChange += parseFloat(price_change)

                        totalPricePercent += parseFloat(price_percent)

                        // console.log(es[0])
                        industryStocks.push(es[0])
                }

                const theIndustry = res[0]
                const theIndustrySymb = getFilterSymbol(theIndustry)
                const finalTotalPrice = parseFloat(totalPrice).toFixed(2)
                const finalTotalPriceChange = parseFloat(totalPriceChange).toFixed(2)
                const finalTotalPricePercnet = parseFloat(totalPricePercent).toFixed(2)
                const stocksInIndustry = industryStocks

                const dataRes = {
                    theIndustry,
                    theIndustrySymb,
                    finalTotalPrice,
                    finalTotalPriceChange,
                    finalTotalPricePercnet,
                    stocksInIndustry
                }

                // console.log(dataRes)
                resValuesArr.push(dataRes)
            }
            // console.log( "This it what we just added",resValuesArr)
            setIndustryTileValues(resValuesArr)
        }


        getStocksIndustry()
    }, [])


    const {sectorView, industryView} = useContext(TileViewContext)



    return ( 
        <>
                    <div className={sectorView == true ? "block" : "hidden"}>
                        {
                            sectorTileValues.map((values, index) => {
                                return (
                                    <SectorFilterTile 
                                        key={index}
                                        sector={values.theSector} 
                                        symbol={values.theSectorSymb} 
                                        price={values.finalTotalPrice}
                                        change={values.finalTotalPriceChange}
                                        percent={values.finalTotalPricePercnet}
                                        date={currentDate}
                                        time={currentTime}
                                        stocksArr={values.stocksInSector}
                                    />
                                )
                            })
                        }
                    </div>

                    <div className={industryView == true ? "block" : "hidden"}>
                        {
                            industryTileValues.map((values, index) => {
                                return (
                                    <IndustryFilterTile 
                                        // key={values.theIndustry}
                                        key={index}
                                        industry={values.theIndustry} 
                                        symbol={values.theIndustrySymb} 
                                        price={values.finalTotalPrice}
                                        change={values.finalTotalPriceChange}
                                        percent={values.finalTotalPricePercnet}
                                        date={currentDate}
                                        time={currentTime}
                                        stocksArr={values.stocksInIndustry}
                                    />
                                )
                            })
                        }
                    </div>
        </>
     );
}
 
export default FilterSection;