import { useEffect, useState } from "react";
import Tile from "./Tile";
import GroupTile from "./GroupTile";
import SumValue from "./SumValue";

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
                console.log(result)
                setPortInfo(result)
            } catch (error) {
            }
        }

        fetchSymbs()
        portFetchInfo()
    }, [])

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

    const total_price = totalStockPrice?.toFixed(2)
    const total_change = totalStockChange?.toFixed(2)
    const total_percent = totalStockPercent?.toFixed(2)

    return ( 
        <>
        <SumValue 
            total_price={total_price} 
            total_change={total_change}
            total_percent={total_percent}
        />

        <div className="flex w-screen justify-center">
            <div className="tile_case_width flex-col">
                <div>
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

                <div>
                    {
                        portInfo.map(
                            (pinfo) => {
                                return (
                                    <GroupTile 
                                        key={pinfo._id} 
                                        port_symbol={pinfo.symbol} 
                                        port_name={pinfo.name}
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
 
export default StockList;