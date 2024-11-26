import search from "../assets/search.svg"
import filter from "../assets/filter.svg"
import { useState } from "react"
import SortPopUp from "../popUps/SortPopUp";

const Search = () => {
    const [visible, setVisible] = useState(false)

    const openPopUp = () => {
        visible == true ? setVisible(false) : setVisible(true)
    }

    const closePopUp = (visible) => {
        setVisible(visible)
    }

    return ( 

        <>
        <div className="w-screen py-6 px-4">
            <div className="flex items-center justify-center space-x-10">
                <input type="text" name="" id="stock_search" className="border-2 border-gho-white rounded-xl h-12 w-72 bg-gho-black" />
                <div className="flex space-x-4">
                    <img src={search} alt="" className="w-8 cursor-pointer" />
                    <img src={filter} alt="" onClick={openPopUp} className="w-8 cursor-pointer" />
                </div>
            </div>
        </div>

        <div className={visible == true ? "block" : "hidden"}>
            <SortPopUp closePopUp={closePopUp} />
        </div>
        </>
     );
}
 
export default Search;