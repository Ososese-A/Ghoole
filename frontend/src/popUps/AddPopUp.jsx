import close_btn from "../assets/close.svg"
import add_btn from "../assets/addPopUp.svg"
import back from "../assets/back.svg"
import { useState } from "react"

const AddPopUp = ({closePopUp}) => {
    const [optionsView, setOptionsView] = useState(true)
    const [stockOnly, setStockOnly] = useState(false)
    const [portfolioOnly, setPortfolioOnly] = useState(false)
    const [stockPortfolio, setStockPortfolio] = useState(false)

    const PopUpClose = () => {
        closePopUp(false)
    }

    const toggleStockOnlyView = () => {
        optionsView == true ? setOptionsView(false) : setOptionsView(true)
        stockOnly == false ? setStockOnly(true) : setStockOnly(false)
    }

    const togglePortfolioOnlyView = () => {
        optionsView == true ? setOptionsView(false) : setOptionsView(true)
        portfolioOnly == false ? setPortfolioOnly(true) : setPortfolioOnly(false)
    }

    const toggleStockPortfolioView = () => {
        optionsView == true ? setOptionsView(false) : setOptionsView(true)
        stockPortfolio == false ? setStockPortfolio(true) : setStockPortfolio(false)
    }

    return (
        <>
            <div className="relative">
                <div className="pop_up">
                    <div className={optionsView == false ? "hidden" : "block"}>
                        <div className="bg-gho-white border-2 rounded-xl w-96 px-8 py-6">
                            <div className="flex items-center justify-end space-x-36 mb-4">
                                <p className="text-gho-blue text-2xl">New Addition</p> 
                                <img src={close_btn} alt="" onClick={PopUpClose} className="cursor-pointer"/>
                            </div>
                            <div className="mx-auto w-80 text-xl">
                                <div className="flex space-x-10">
                                    <img src={add_btn} alt=""/> 
                                    <p 
                                        className="text-gho-blue py-1 cursor-pointer" 
                                        onClick={toggleStockOnlyView}
                                    >
                                        Add a new Stock
                                    </p>
                                </div>
                                <div className="flex space-x-10">
                                    <img src={add_btn} alt=""/> 
                                    <p 
                                        className="text-gho-blue py-1 cursor-pointer"
                                        onClick={togglePortfolioOnlyView}
                                    >
                                        Add a new Portfolio
                                    </p>
                                </div>
                                <div className="flex space-x-10">
                                    <img src={add_btn} alt=""/> 
                                    <p 
                                        className="text-gho-blue py-1 cursor-pointer"
                                        onClick={toggleStockPortfolioView}
                                    >
                                        Add a new Stock to a Portfolio
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={stockOnly == false ? "hidden" : "block"}>
                        <div className="bg-gho-white border-2 rounded-xl w-96 px-8 py-6">
                            <div className="flex items-center justify-end space-x-28 mb-4">
                                <div className="flex space-x-6">
                                    <img src={back} alt="" onClick={toggleStockOnlyView} className="cursor-pointer"/>
                                    <p className="text-gho-blue text-2xl text-nowrap">Add a New Stock</p>
                                </div>
                                <img src={close_btn} alt="" onClick={PopUpClose} className="cursor-pointer"/>
                            </div>

                            <form action="" className="text-gho-blue space-y-12 py-4">
                                <div>
                                    <label className="text-gho-blue text-2xl text-nowrap">Stock Name:</label> <br />
                                    <input type="text" name="" id="text_field_space" className="border-2 border-gho-blue rounded-lg h-10 w-72" />
                                    <p className="h-16">Error messages go here</p>
                                </div>
                                <div>
                                    <label className="text-gho-blue text-2xl text-nowrap">Stock Symbol:</label> <br />
                                    <input type="text" name="" id="text_field_space" className="border-2 border-gho-blue rounded-lg h-10 w-72" />
                                    <p className="h-16">Error messages go here</p>
                                </div>
                                <div className="w-72 flex justify-end">
                                    <input type="submit" value="ADD" className="border-2 border-gho-blue rounded-lg h-10 w-36"/>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={portfolioOnly == false ? "hidden" : "block"}>
                        <div className="bg-gho-white border-2 rounded-xl w-96 px-8 py-6">
                            <div className="flex items-center justify-end space-x-20 mb-4">
                                <div className="flex space-x-6">
                                    <img src={back} alt="" onClick={togglePortfolioOnlyView} className="cursor-pointer"/>
                                    <p className="text-gho-blue text-2xl text-nowrap">Add a New Portfolio</p>
                                </div>
                                <img src={close_btn} alt="" onClick={PopUpClose} className="cursor-pointer"/>
                            </div>

                            <form action="" className="text-gho-blue space-y-12 py-4">
                                <div>
                                    <label className="text-gho-blue text-2xl text-nowrap">Portfolio Name:</label> <br />
                                    <input type="text" name="" id="text_field_space" className="border-2 border-gho-blue rounded-lg h-10 w-72" />
                                    <p className="h-16">Error messages go here</p>
                                </div>
                                <div>
                                    <label className="text-gho-blue text-2xl text-nowrap">Portfolio Symbol:</label> <br />
                                    <input type="text" name="" id="text_field_space" className="border-2 border-gho-blue rounded-lg h-10 w-72" />
                                    <p className="h-16">Error messages go here</p>
                                </div>
                                <div className="w-72 flex justify-end">
                                    <input type="submit" value="ADD" className="border-2 border-gho-blue rounded-lg h-10 w-36"/>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={stockPortfolio == false ? "hidden" : "block"}>
                        <div className="bg-gho-white border-2 rounded-xl w-96 px-8 py-6">
                            <div className="flex items-center justify-end space-x-28 mb-4">
                                <div className="flex space-x-6">
                                    <img src={back} alt="" onClick={toggleStockPortfolioView} className="cursor-pointer"/>
                                    <p className="text-gho-blue text-2xl text-nowrap">Add a New Stock</p>
                                </div>
                                <img src={close_btn} alt="" onClick={PopUpClose} className="cursor-pointer"/>
                            </div>

                            <form action="" className="text-gho-blue space-y-12 py-4">
                                <div>
                                    <label className="text-gho-blue text-2xl text-nowrap">Portfolio Name:</label> <br />
                                    <select name="portfolios" id="portfolios" className="border-2 border-gho-blue rounded-lg h-10 w-72">
                                        <option value="portfolio_1">Portfolio 1</option>
                                        <option value="portfolio_2">Portfolio 2</option>
                                        <option value="portfolio_3">Portfolio 3</option>
                                        <option value="portfolio_4">Portfolio 4</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gho-blue text-2xl text-nowrap">Stock Name:</label> <br />
                                    <input type="text" name="" id="text_field_space" className="border-2 border-gho-blue rounded-lg h-10 w-72" />
                                    <p className="h-16">Error messages go here</p>
                                </div>
                                <div>
                                    <label className="text-gho-blue text-2xl text-nowrap">Stock Symbol:</label> <br />
                                    <input type="text" name="" id="text_field_space" className="border-2 border-gho-blue rounded-lg h-10 w-72" />
                                    <p className="h-16">Error messages go here</p>
                                </div>
                                <div className="w-72 flex justify-end">
                                    <input type="submit" value="ADD" className="border-2 border-gho-blue rounded-lg h-10 w-36"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddPopUp;