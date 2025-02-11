import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import getPortProfile from "../helpers/getPortProfile"
import getStockSymbs from "../helpers/getStockSymbs"
import processFetchedData from "../helpers/processFetchesData"


const GroupTile = ({port_symbol, port_name, port_id}) => {
    const now = new Date()
    const currentDate = now.toLocaleDateString()
    const currentTime = now.toLocaleTimeString()
    const navigate = useNavigate();



    const [sumedValues, setSumedValues] = useState({})



    useEffect(() => {

        //find out which portfolio this is 
        const getCurrentPortAndProfile = async () => {
            const stockProfile = await getPortProfile(port_id)
            // console.log(stockProfile)
            await fetchProfileData(stockProfile)
        }

        //fetch all of values we need from the stocks in the portfolio
        const fetchProfileData = async (stockProfile) => {
            if (stockProfile.length > 0) {
                const data = await getStockSymbs();
                const profileSymbols = [];
        
                for (const stockId of stockProfile) {
                    for (const item of data) {
                        if (item._id == stockId) {
                            const fetched = await processFetchedData(item.symb);
                            const profileItemData = [item.symb, fetched];
                            profileSymbols.push(profileItemData);
                        }
                    }
                }
        
                console.log('profileSymbols:', profileSymbols);
                getTheSumation(profileSymbols);
            } else {
                // console.log(`It works but it is less than zero ${stockProfile.length}`);
            }
        };




        //sum it all up and set the values
        const getTheSumation = (profileSymbols) => {
            // console.log(profileSymbols)
            let totalPrice = 0
            let totalPriceChange = 0
            let totalPricePercent = 0

            // console.log(!Array.isArray(profileSymbols))
            // console.log(!Array.isArray(pS))
            // console.log(profileSymbols)

            profileSymbols.forEach(item => {
                // console.log('hello')
                const {price, price_change, price_percent} = item[1];

                    totalPrice += parseFloat(price)

                    totalPriceChange += parseFloat(price_change)

                    totalPricePercent += parseFloat(price_percent)
            })

            const finalTotalPrice = parseFloat(totalPrice).toFixed(2)
            const finalPriceChange = parseFloat(totalPriceChange).toFixed(2)
            const finalPricePercent = parseFloat(totalPricePercent).toFixed(2)

            const res = {
                finalTotalPrice,
                finalPriceChange,
                finalPricePercent
            }

            // console.log(res)
            setSumedValues(res)
        }


        getCurrentPortAndProfile()

    }, [])

    return ( 
        <>
        <div 
            className="px-8 my-16 cursor-pointer"  
            onClick={() => {
                navigate(`/portfolio/${port_id}`)
            }}
        >
            <div className="tile_width">
                <div className="border-2 rounded-xl flex items-center justify-between px-8 py-4 space-x-1">
                    <div className="text-2xl space-y-4">
                        <p className="font-bold">{port_symbol}</p>
                        <p>{sumedValues.finalTotalPrice ? sumedValues.finalTotalPrice : '0.00'}</p>
                    </div>
                    <div className="flex-col justify-items-end">
                        <p className="text-xl text-nowrap">{port_name}</p>
                        <div className={
                            sumedValues.finalPricePercent?.toString().charAt(0) == '-' ? 
                            "flex text-gho-red space-x-6 justify-end" :
                            "flex text-gho-green space-x-6 justify-end"
                        }>
                            <p>{sumedValues.finalPricePercent ? `${sumedValues.finalPricePercent}%` : "0.00"}</p>
                            <p>{sumedValues.finalPriceChange ? sumedValues.finalPriceChange : "0.00"}</p>
                        </div>
                        <div className="flex w-40 space-x-6 justify-end">
                        <p className="text-nowrap">{currentDate}</p><p className="text-nowrap">{currentTime}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default GroupTile;