import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IndustryFilterTile = ({industry, symbol, price, change, percent, date, time, stocksArr}) => {
    const navigate = useNavigate();
    const stockListPageInfo = {industry, symbol, stocksArr}

    useEffect(() => {
        // console.log(stockListPageInfo)
        localStorage.setItem(`${industry}`, JSON.stringify(stockListPageInfo))
        // console.log(localStorage.getItem(`${industry}`))
    }, [])


    return ( 
        <>
        <div 
            className="px-8 my-16 cursor-pointer"  
            onClick={() => {
                navigate(`/industry/${industry}`)
            }}
        >
            <div className="tile_width">
                <div className="border-2 rounded-xl flex items-center justify-between px-8 py-4 space-x-1">
                    <div className="text-2xl space-y-4">
                        <p className="font-bold">{symbol}</p>
                        <p>{price ? price : '0.00'}</p>
                    </div>
                    <div className="flex-col justify-items-end">
                        <p className="text-xl text-nowrap">{industry}</p>
                        <div className={
                            percent?.toString().charAt(0) == '-' ? 
                            "flex text-gho-red space-x-6 justify-end" :
                            "flex text-gho-green space-x-6 justify-end"
                        }>
                            <p>{percent ? `${percent}%` : "0.00"}</p>
                            <p>{change ? change : "0.00"}</p>
                        </div>
                        <div className="flex w-40 space-x-6 justify-end">
                        <p className="text-nowrap">{date}</p><p className="text-nowrap">{time}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}

export default IndustryFilterTile;