import { useEffect, useState } from "react";
import AppBarB from "../components/AppBarB";
import { useParams } from "react-router-dom";
import Tile from "../components/Tile";
import SumValue from "../components/SumValue";
import Search from "../components/Search";
import PageLabel from "../components/PageLabel";
import getPortInfo from "../helpers/getPortInfo"

const StockLisPortfolioPage = () => {
    const {portfolioId: profileID} = useParams()
    const [profielList, setProfileList] = useState([])
    const [labelForPage, setLabelForPage] = useState('')

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
         //get list of stocks in portfolio profile
        const getPortProfile = async () => {
            const initRes = await getPortInfo()
            const portRes = [initRes]
            const portResB = portRes[0]

            const portId = profileID;

            const preStockProfile = portResB.find(prePort => prePort._id == portId);
            // console.log(preStockProfile.name)
            // console.log(preStockProfile.symbol)
            const pageName = `${preStockProfile.name} (${preStockProfile.symbol})`
            setLabelForPage(pageName)
            const stockProfile = preStockProfile.profile
            
            // console.log(`from portfolio page: ${stockProfile}`)
            // console.log(stockProfile)
            getEachProfileSymb(stockProfile)
        }


        const fetchFromDB = async (passedID) => {
            const url = `http://localhost:4000/api/stock/${passedID}`
            const options = {
                method: 'GET'
            }

            try {
                const response = await fetch(url, options)
                const result = await response.json();
                // setSymbs(result);
                // console.log(result);
                return result
            } catch (error) {
                console.error(error);
            }
        }

        //get the each stock symbol from the ids in the profile
        const getEachProfileSymb = (sP) => {
            if (!sP) {
                //return error message
                return
            }

            // console.log(sP)
            // console.log(sP.length)
            const resArray = []
            // console.log(`This is resArray pre loop:`, resArray)
            for (let i = 0; i < sP.length; i++) {
                const fetchID = sP[i]
                // console.log(fetchID)
                const data = fetchFromDB(fetchID)
                resArray.push(data)
                // console.log(data)
            }
            // console.log(`This is resArray post loop:`, resArray)
            Promise.all(resArray)
                .then(ress => {
                    const symbols = ress.map(res => res.symb)
                    // console.log(symbols)
                    setProfileList(symbols)
                })
                .catch (error => console.error(error))
        }

        getPortProfile()
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
                        profielList.map(
                            (sP, index) => {
                                return (
                                    <Tile 
                                        key={index} 
                                        db_symbol={sP} 
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
 
export default StockLisPortfolioPage;