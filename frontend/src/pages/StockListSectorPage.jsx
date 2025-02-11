import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppBarB from "../components/AppBarB";
import Search from "../components/Search";
import PageLabel from "../components/PageLabel";
import SumValue from "../components/SumValue";
import Tile from "../components/Tile";

const StockLisSectorPage = () => {
    const {sectorId} = useParams()
    const [sectorData, setSectorData] = useState({})
    const [sectorStockList, setSectorStockList] = useState([])

    const [totalStockPrice, setTotalStockPrice] = useState(0)
    const [totalStockChange, setTotalStockChange] = useState(0)
    const [totalStockPercent, setTotalStockPercent] = useState(0)
    const [controlSum, setControlSum] = useState(0)
    const [currentSum, setCurrentSum] = useState(0)
    const [controlChange, setControlChange] = useState(0)
    const [currentChange, setCurrentChange] = useState(0)
    const [controlPercent, setControlPercent] = useState(0)
    const [currentPercent, setCurrentPercent] = useState(0)

    useEffect(() => {
        const res = localStorage.getItem(`${sectorId}`)
        const result = JSON.parse(res)
        // console.log(JSON.parse(res))
        setSectorData(result)
        setSectorStockList(result.stocksArr)
    }, [])

    // console.log(sectorData)
    // console.log(sectorData.sector)
    // console.log(sectorData.symbol)
    // console.log(sectorData.stocksArr)
    // console.log(sectorStockList)

    const stockTotal = (sum) => {
        setControlSum(sum)
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

    const labelForPage = `${sectorData.sector} (${sectorData.symbol})`




    const total_price = totalStockPrice?.toFixed(2)
    const total_change = totalStockChange?.toFixed(2)
    const total_percent = totalStockPercent?.toFixed(2)



    return ( 
        <>
            <AppBarB />

            <Search />

            <PageLabel pageLabel={labelForPage} />

            <SumValue
                total_price={total_price} 
                total_change={total_change}
                total_percent={total_percent}
            />



            <div className="flex w-screen justify-center">
                <div className="tile_case_width flex-col">
                    <div>
                        {
                            //pass in the symbols array to be mapped
                            sectorStockList.map(
                                (s, index) => {
                                    return (
                                        <Tile 
                                            key={index} 
                                            db_symbol={s}
                                            stockTotal={stockTotal} 
                                            stockChange={stockChange} 
                                            stockPercent={stockPercent}
                                        />
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default StockLisSectorPage;