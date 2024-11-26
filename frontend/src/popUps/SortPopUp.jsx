import filter_b from "../assets/filter_b.svg"
import filtering from "../assets/filtering.svg"
import close_btn from "../assets/close.svg"
import { useState } from "react"
import sortUp from "../assets/sortUp.svg"
import sortDown from "../assets/sortDown.svg"

const SortPopUp = ({closePopUp}) => {
    const [optionsView, setOptionsView] = useState()
    const [sorticon, setSortIcon] = useState(false)

    const PopUpClose = () => {
        closePopUp(false)
    }

    const toggleSortUpDown = () => {
        sorticon == false ? setSortIcon(true) : setSortIcon(false)
    }

    const toggleAllView = () => {}
    const togglePortfolioView = () => {}
    const toggleSectorView = () => {}
    const toggleIndustryView = () => {}
    const togglePriceView = () => {}
    const toggleNameView = () => {}
    const toggleAddedView = () => {}

    return (
        <>
        <div className="relative">
            <div className="pop_up">
                <div className={optionsView == false ? "hidden" : "block"}>
                        <div className="bg-gho-white border-2 rounded-xl w-96 px-8 py-6">
                            <div className="flex items-center justify-end space-x-36 mb-4">
                                <div className="flex space-x-8">
                                    <img src={filter_b} alt="" />
                                    <p className="text-gho-blue text-2xl text-nowrap">New Addition</p> 
                                </div>
                                <img src={close_btn} alt="" onClick={PopUpClose} className="cursor-pointer"/>
                            </div>
                            <div className="mx-auto w-80 text-xl">
                                <div className="flex space-x-10">
                                    <img src={filtering} alt=""/> 
                                    <p 
                                        className="text-gho-blue py-1 cursor-pointer" 
                                        onClick={toggleAllView}
                                    >
                                        All
                                    </p>
                                </div>
                                <div className="flex space-x-10">
                                    <img src={filtering} alt=""/> 
                                    <p 
                                        className="text-gho-blue py-1 cursor-pointer"
                                        onClick={togglePortfolioView}
                                    >
                                        Portfolio
                                    </p>
                                </div>
                                <div className="flex space-x-10">
                                    <img src={filtering} alt=""/> 
                                    <p 
                                        className="text-gho-blue py-1 cursor-pointer"
                                        onClick={toggleSectorView}
                                    >
                                        Sector
                                    </p>
                                </div>
                                <div className="flex space-x-10">
                                    <img src={filtering} alt=""/> 
                                    <p 
                                        className="text-gho-blue py-1 cursor-pointer"
                                        onClick={toggleIndustryView}
                                    >
                                        Industry
                                    </p>
                                </div>
                                <div className="flex space-x-10">
                                    <img src={filtering} alt=""/> 
                                    <div className="flex space-x-8" onClick={toggleSortUpDown}>
                                        <p 
                                            className="text-gho-blue py-1 cursor-pointer"
                                            onClick={togglePriceView}
                                        >
                                            Price
                                        </p>

                                        <img src={sorticon == false ? sortUp : sortDown} alt=""/>
                                    </div>
                                </div>
                                <div className="flex space-x-10">
                                    <img src={filtering} alt=""/> 
                                    <div className="flex space-x-8" onClick={toggleSortUpDown}>
                                        <p 
                                            className="text-gho-blue py-1 cursor-pointer"
                                            onClick={toggleNameView}
                                        >
                                            Name
                                        </p>

                                        <img src={sorticon == false ? sortUp : sortDown} alt=""/>
                                    </div>
                                </div>
                                <div className="flex space-x-10">
                                    <img src={filtering} alt=""/> 
                                    <div className="flex space-x-8" onClick={toggleSortUpDown}>
                                        <p 
                                            className="text-gho-blue py-1 cursor-pointer"
                                            onClick={toggleAddedView}
                                        >
                                            Added
                                        </p>

                                        <img src={sorticon == false ? sortUp : sortDown} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        </>
    )
}

export default SortPopUp