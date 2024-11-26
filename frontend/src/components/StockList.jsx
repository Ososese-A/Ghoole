import { useEffect, useState } from "react";
import Tile from "./Tile";

const StockList = () => {
    const [symbs, setSymbs] = useState([])

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

        fetchSymbs()
    }, [])

    return ( 
        <>
        <div className="flex w-screen justify-center">
            <div className="tile_case_width flex-col">
                <div>
                    {
                        symbs.map(
                            (symb) => {
                            return (
                                <Tile key={symb._id} symbol={symb.symb} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </>
     );
}
 
export default StockList;