import { createContext, useEffect, useState } from "react";
import Tile from "./Tile";
import GroupTile from "./GroupTile";
import SumValue from "./SumValue";
import FilterSection from "./FilterSection";
import useStockFilterContext from "../hooks/useStockFilterContext";

export const TileViewContext = createContext()

const StockList = () => {
    const [symbs, setSymbs] = useState([])
    const [totalStockPrice, setTotalStockPrice] = useState(0)
    const [totalStockChange, setTotalStockChange] = useState(0)
    const [totalStockPercent, setTotalStockPercent] = useState(0)
    const [portInfo, setPortInfo] = useState([])
    const [controlSum, setControlSum] = useState(0)
    const [currentSum, setCurrentSum] = useState(0)
    const [controlChange, setControlChange] = useState(0)
    const [currentChange, setCurrentChange] = useState(0)
    const [controlPercent, setControlPercent] = useState(0)
    const [currentPercent, setCurrentPercent] = useState(0)
    const [stockView, setStockView] = useState(false)
    const [portfolioView, setPortfolioView] = useState(false)
    const [sectorView, setSectorView] = useState(false)
    const [industryView, setIndustryView] = useState(false)
    const [isPriceSorted, setIsPriceSorted] = useState(false)
    const [isNameSorted, setIsNameSorted] = useState(false)
    const [isAddedSorted, setIsAddedSorted] = useState(false)

    const {state} = useStockFilterContext()
    const infoSymbolArr = []



    const sPAInit= localStorage.getItem(`stockPriceArr`)
    const sPAExtract = JSON.parse(sPAInit)
    const stockPriceArr = sPAExtract.info
    console.log(stockPriceArr)

    useEffect(() => {
        const fetchSymbs = async () => {
            const url = 'http://localhost:4000/api/stock/'
            const options = {
                method: 'GET'
            }

            try {
                const response = await fetch(url, options)
                const result = await response.json();
                setSymbs(result);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }

        const portFetchInfo = async () => {
            const url = `http://localhost:4000/api/portfolio/`
            const options = {
                method: 'GET'
            }

            try {
                const response = await fetch(url, options)
                const result = await response.json()
                // console.log(result)
                setPortInfo(result)
            } catch (error) {
            }
        }

        fetchSymbs()
        portFetchInfo()
    }, [])

    const stockTotal = (sum, name, symbol) => {
        console.log(`the sum/price is ${sum} the name/longname ${name} the symbol ${symbol}`)
        const info = {symbol, name, price: sum}

        prepArr(info)

        setControlSum(sum)
    }

    const prepArr = (info) => {
        infoSymbolArr.push(info)
        const data = {info: infoSymbolArr}
        const priceArr = JSON.stringify(data)
        
        console.log(priceArr)

        localStorage.setItem(`stockPriceArr`, `${priceArr}`)
    }

    const stockChange = (change) => {
        setControlChange(change)
    }

    const stockPercent = (percent) => {
        setControlPercent(percent)
    }

    useEffect(() => {
        const priceTotal = () => {
            setCurrentSum(
                (prev) => {
                    const newSum = prev + controlSum;
                    // console.log(`Prev Sum: ${prev} Curr Sum: ${controlSum} new Sum: ${newSum}`)
                    setTotalStockPrice(newSum)
                    return newSum
                }
            )
    
            return currentSum
        }

        const changeTotal = () => {
            setCurrentChange(
                (prev) => {
                    const newChange = prev + controlChange;
                    // console.log(`Prev Change: ${prev} Curr Change: ${controlChange} new Change: ${newChange}`)
                    setTotalStockChange(newChange)
                    return newChange
                }
            )
    
            return currentChange
        }

        const percentTotal = () => {
            setCurrentPercent(
                (prev) => {
                    const newPercent = prev + controlPercent;
                    // console.log(`Prev Percent: ${prev} Curr Percent: ${controlPercent} new Percent: ${newPercent}`)
                    setTotalStockPercent(newPercent)
                    return newPercent
                }
            )
    
            return currentPercent
        }

        priceTotal()
        changeTotal()
        percentTotal()
    }, [controlSum])

    const total_price = totalStockPrice?.toFixed(2)
    const total_change = totalStockChange?.toFixed(2)
    const total_percent = totalStockPercent?.toFixed(2)

    useEffect(() => {
        const tileControl = () => {
            if (state.stockFilter == null) {
                setStockView(true)
                setPortfolioView(false)
                setIndustryView(false)
                setSectorView(false)
            }
            if (state.stockFilter == 'portfolio')  {
                setPortfolioView(true)
                setStockView(false)
                setIndustryView(false)
                setSectorView(false)
            }

            if (state.stockFilter == 'sector')  {
                setSectorView(true)
                setStockView(false)
                setPortfolioView(false)
                setIndustryView(false)
            }

            if (state.stockFilter == 'industry')  {
                setIndustryView(true)
                setStockView(false)
                setPortfolioView(false)
                setSectorView(false)
            }

            // The idea here is that if the current filter selection is on ascending/descending order filters then sort before displaying based on the selected one
            // NOTE: put this into a function I think
            if (state.stockFilter == 'price')  {
                if (isPriceSorted == false) {
                    //ascending order
                    const priceSortedSymbols = [...stockPriceArr].sort((a, b) => a.price - b.price)
                    setSymbs(
                        prevSymbols => {
                            return priceSortedSymbols.map(
                                s => {
                                    const match = prevSymbols.find(symb => symb.symb == s.symbol)
                                    return {
                                        ...match,
                                        symb: s.symbol,
                                        stockName: s.name
                                    }
                                }
                            )
                        }
                    )

                    setIsPriceSorted(true)
                } else {
                    //decending order
                    const priceSortedSymbols = [...stockPriceArr].sort((a, b) => b.price - a.price)
                    setSymbs(
                        prevSymbols => {
                            return priceSortedSymbols.map(
                                s => {
                                    const match = prevSymbols.find(symb => symb.symb == s.symbol)
                                    return {
                                        ...match,
                                        symb: s.symbol,
                                        stockName: s.name
                                    }
                                }
                            )
                        }
                    )

                    setIsPriceSorted(false)
                }
            }

            if (state.stockFilter == 'name') {
                if  (isNameSorted == false) {
                    setSymbs(prevSymbols => prevSymbols.sort((a, b) => a.stockName.localeCompare(b.stockName)))
                    setIsNameSorted(true)
                    console.log(symbs)
                } else {
                    setSymbs(prevSymbols => prevSymbols.sort((a, b) => b.stockName.localeCompare(a.stockName)))
                    setIsNameSorted(false)
                    console.log(symbs)
                }
            }

            if (state.stockFilter == 'added') {
                if (isAddedSorted == false) {
                    setSymbs(prevSymbols => prevSymbols.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)))
                    setIsAddedSorted(true)
                } else {
                    setSymbs(prevSymbols => prevSymbols.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)))
                    setIsAddedSorted(false)
                }
            }

        }

        tileControl()
    }, [state])


    


    return ( 
        <>
        <SumValue 
            total_price={total_price} 
            total_change={total_change}
            total_percent={total_percent}
        />

        <div className="flex w-screen justify-center">
            <div className="tile_case_width flex-col">
                <div className={stockView == true ? "block": "hidden"}>
                    {
                        symbs.map(
                            (symb) => {
                                
                            return (
                                <Tile 
                                    key={symb._id} 
                                    db_symbol={symb.symb} 
                                    stockTotal={stockTotal} 
                                    stockChange={stockChange} 
                                    stockPercent={stockPercent}
                                />
                            )
                        })


                    }
                </div>

                <div className={portfolioView == true ? "block" : "hidden"}>
                    {
                        portInfo.map(
                            (pinfo) => {
                                return (
                                        <GroupTile 
                                        key={pinfo._id} 
                                        port_id={pinfo._id}
                                        port_symbol={pinfo.symbol} 
                                        port_name={pinfo.name}
                                    />
                                )
                            }
                        )
                    }
                </div>

                <div>
                    <TileViewContext.Provider value={{sectorView, industryView}}>
                        <FilterSection />
                    </TileViewContext.Provider>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default StockList;