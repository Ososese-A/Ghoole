import filtering from "../assets/filtering.svg"
import sortUp from "../assets/sortUp.svg"
import sortDown from "../assets/sortDown.svg"
import { useState } from "react"

const SortToggleItem = ({sortLabel}) => {
    const [sorticon, setSortIcon] = useState(false)

    const toggleSortUpDown = () => {
        sorticon == false ? setSortIcon(true) : setSortIcon(false)
    }

    return ( 
        <>
        <div className="flex space-x-10">
        <img src={filtering} alt=""/> 
        <div className="flex space-x-8" onClick={toggleSortUpDown}>
            <p 
                className="text-gho-blue py-1 cursor-pointer"
            >
                {sortLabel}
            </p>

            <img src={sorticon == false ? sortUp : sortDown} alt=""/>
        </div>
    </div>
        </>
     );
}
 
export default SortToggleItem;