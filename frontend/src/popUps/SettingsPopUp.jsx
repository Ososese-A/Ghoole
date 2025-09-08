import settings from "../assets/settings.svg"
import close_btn from "../assets/close.svg"
import setting_item from "../assets/setting-item.svg"
import { useState, useEffect } from "react"
import selectState from "../assets/option_selected.svg"
import deselectState from "../assets/option_deselected.svg"

const SettingsPopUp = ({closePopUp}) => {
    const [optionsOnly, setOptionsOnly] = useState(true)


    const [editStockPortfolio, setEditStockPortfolio] = useState(false)
    const [portEditFormSubmitted, setPortEditFormSubmitted] = useState(false)
    const [addToPortSubmitted, setAddToPortSubmitted] = useState(false)
    const [deleteFromPortSubmitted, setDeleteFromPortSubmitted] = useState(false)
    const [PortToEdit, setPortToEdit] = useState('nill')
    const [portToEditError, setPortToEditError] = useState('')


    const [portList, setPortList] = useState([])
    const [stockList, setStockList] = useState([])
    const [stockListOutsidePort, setStockListOutsidePort] = useState([])
    const [stockListwithinPort, setStockListWithinPort] = useState([])


    // const [editOptions, setEditOptions] = useState([
    //     "Add a Stock to the Portfolio",
    //     "Remove a Stock from the Portfolio"
    // ])
    const editOptions = [
        "Add a Stock to the Portfolio",
        "Remove a Stock from the Portfolio"
    ]
    const [selectedIndex, setSelectedIndex] = useState()
    const [addStockToPort, setAddStockToPort] = useState(false)
    const [delStockFromPort, setDelStockFromPort] = useState(false)
    const [stockToEdit, setStockToEdit] = useState('')
    const [symbolToAdd, setSymbolToAdd] = useState('')
    const [symbolToDel, setSymbolToDel] = useState('')


    const [deletePort, setDeletePort] = useState(false)
    const [deletePortSubmitted, setDeletePortSubmitted] = useState(false)
    const [portToDelete, setPortToDelete] = useState("")


    const [deleteStock, setDeleteStock] = useState(false)
    const [deleteStockSubmitted, setDeleteStockSubmitted] = useState(false)
    const [stockToDelete, setStockToDelete] = useState("")


    const [currencySelect, setCurrencySelect] = useState(false)
    const [selectedCurrencySubmitted, setSelectedCurrencySubmitted] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState("")


    const toggleStockPortfolioView = () => {
        optionsOnly == true ? setOptionsOnly(false) : setOptionsOnly(true)
        editStockPortfolio == false ? setEditStockPortfolio(true) : setEditStockPortfolio(false)
    }

    const togglePortfolioDeleteView = () => {
        optionsOnly == true ? setOptionsOnly(false) : setOptionsOnly(true)
        deletePort == false ? setDeletePort(true) : setDeletePort(false)
    }

    const toggleStockDeleteView = () => {
        optionsOnly == true ? setOptionsOnly(false) : setOptionsOnly(true)
        deleteStock == false ? setDeleteStock(true) : setDeleteStock(false)
    }

    const toggleCurrencySelectView = () => {
        optionsOnly == true ? setOptionsOnly(false) : setOptionsOnly(true)
        currencySelect == false ? setCurrencySelect(true) : setCurrencySelect(false)
    }

    const fetchSymbs = async () => {
        const url = 'http://localhost:4000/api/stock/'
        const options = {
            method: 'GET'
        }

        try {
            const response = await fetch(url, options)
            const result = await response.json();
            return result
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditPortSubmit = (e) => {
        e.preventDefault()

        if (PortToEdit.trim() == "nill" || selectedIndex == undefined) {
            setPortToEditError("You need to select a portfolio name and an edit option to go to the next page")
        } else {
            const interim = portList.find(i => i.symbol == PortToEdit)
            const stocksToAddToPort = stockList.filter(j => !(interim.stocks.includes(j._id)))
            const stockToDeleteFromPort = stockList.filter(j => interim.stocks.includes(j._id))
            console.log()
            setStockListOutsidePort(stocksToAddToPort)
            setStockListWithinPort(stockToDeleteFromPort)
            setPortToEditError("")
            setPortEditFormSubmitted(true)
        }
    }

    const handleAddToPortSubmit = (e) => {
        e.preventDefault()

        if (stockToEdit == "") {
            setPortToEditError("You need to select a The stock you would liek to add to this portfolio")
        } else {
            setAddToPortSubmitted(true)
        }
    }

    const handleDeleteFromPortSubmit = (e) => {
        e.preventDefault()

        if (stockToEdit == "") {
            setPortToEditError("You need to select a The stock you would liek to add to this portfolio")
        } else {
            setDeleteFromPortSubmitted(true)
        }
    }

    const handlePortDeleteSubmit = (e) => {
        e.preventDefault()

        if (portToDelete == "") {
            setPortToEditError("You need to select a The stock you would liek to add to this portfolio")
        } else {
            setDeletePortSubmitted(true)
        }
    }

    const handleStockDeleteSubmit = (e) => {
        e.preventDefault()

        if (stockToDelete == "") {
            setPortToEditError("You need to select a The stock you would liek to add to this portfolio")
        } else {
            setDeleteStockSubmitted(true)
        }
    }

    const handleCurrencySelectSubmit = (e) => {
        e.preventDefault()

        if (selectedCurrency == "") {
            setPortToEditError("You need to select a The stock you would liek to add to this portfolio")
        } else {
            setSelectedCurrencySubmitted(true)
        }
    }

    const nextEditPage = () => {
        if (editOptions[selectedIndex] == editOptions[0]) {
            //this is for adding
            setEditStockPortfolio(false)
            setAddStockToPort(true)
        } else if (editOptions[selectedIndex] == editOptions[1]) {
            //this is for removing
            setEditStockPortfolio(false)
            setDelStockFromPort(true)
        } 
    }

    const getPortInfo = async () => {
        const url = 'http://localhost:4000/api/portfolio/'
        const options = {
            method: 'GET'
        }

        try {
            const response = await fetch(url, options)
            const result = await response.json();
            // console.log(result);
            return result
        } catch (error) {
        }
    }

    const addStockToPortService = async () => {
        const portfolioId = PortToEdit.id
        const stock = stockList.find( i => symbolToAdd == i.symb)
        console.log("Stock")
        console.log(stock)
        console.log(stockList)
        console.log(symbolToAdd)
        const stockId = stock._id
        const profileRes = {
            profile : stockId
        }
        console.log(`This log goes before we send it to the DB: ${{portfolioId}}`)

        try {
            //db logic goes here
            await fetch(`http://localhost:4000/api/portfolio/${portfolioId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(profileRes)
            })

            console.log(`This is the id: ${portfolioId} and this is the stock ${stockId}`)

            window.location.reload()
        } catch (err) {
            console.log(err)
        } finally {
            PopUpClose()
        }
    }

    const deleteStockFromPortService = async () => {
        const portfolioId = PortToEdit.id
        const stock = stockList.find( i => symbolToDel == i.symb)
        console.log("Stock")
        console.log(stock)
        console.log(stockList)
        console.log(symbolToDel)
        const stockId = stock._id
        const profileRes = {
            profile : stockId
        }
        try {
           //db logic goes here
            await fetch(`http://localhost:4000/api/portfolio/deleteProfile/${portfolioId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(profileRes)
            })

            console.log(`This is the id: ${portfolioId} and this is the stock ${stockId}`)

            window.location.reload()
        } catch (err) {
            console.log(err)
        } finally {
            PopUpClose()
        }
    }

    const deletePortfolioService = async (portfolioId) => {
        console.log(`This is the id: ${portfolioId}`)

        try {
            //db logic goes here
            await fetch(`http://localhost:4000/api/portfolio/${portfolioId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json'
                },
            })

            window.location.reload()
        } catch (err) {
            console.log(err)
        } finally {
            PopUpClose()
        }
    }

    const deleteStockService = async (stockId) => {
        console.log(`This is the id: ${stockId}`)

        try {
            //db logic goes here
            await fetch(`http://localhost:4000/api/stock/${stockId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json'
                },
            })

            window.location.reload()
        } catch (err) {
            console.log(err)
        } finally {
            PopUpClose()
        }
    }

    const currencyUpdateService = () => {
        try {
            //db logi goes here
            console.log(selectedCurrency)
        } catch (err) {
            console.log(err)
        } finally {
            PopUpClose()
        }
    }

    useEffect(() => {
        const getPortOptions = async () => {
            const initialRes = await getPortInfo()
            const portRes = [initialRes]
            const portResB = portRes[0]
            console.log("This is portResB from Settings")
            console.log(portResB)
            const portOptionsList = portResB.map(item => {
                return {
                    id: item._id,
                    name: item.name,
                    symbol: item.symbol,
                    stocks: item.profile
                }
            })
            console.log("This is portOptionsList from Settings")
            console.log(portOptionsList)
            setPortList(portOptionsList)
        }

        const getStocks = async () => {
            const s = await fetchSymbs()
            setStockList(s)
            console.log("This is S")
            console.log(s)
        }

        try {
            getStocks()
            getPortOptions()
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        const stocksFromPortinterim = portList.map( i => ({
            stocks: stockList.filter(j => i.stocks.includes(j._id))
        }))

        console.log("PortList useEffect")
        console.log(stocksFromPortinterim)
    }, [portList])

    useEffect(() => {
        console.log(PortToEdit)
        console.log(editOptions[selectedIndex])
        console.log("portList")
        console.log(portList)

        if (portEditFormSubmitted == true) {
            const interim = PortToEdit.trim().split("-")
            const portfolio = portList.find((i) => i.symbol == interim[0])
            setPortToEdit(portfolio)
            nextEditPage()
        }
    }, [portEditFormSubmitted])

    useEffect(() => {
        // console.log(stockToEdit)
        if (addToPortSubmitted == true) {
            const interim = stockToEdit.split(" - ")
            setSymbolToAdd(interim[0])
            console.log("PortToEdit")
            console.log(PortToEdit)
        }

    }, [addToPortSubmitted])

    useEffect(() => {
        addStockToPortService()
    }, [symbolToAdd])

    useEffect(() => {
        // console.log(stockToEdit)
        if (deleteFromPortSubmitted == true) {
            const interim = stockToEdit.split(" - ")
            setSymbolToDel(interim[0])
            deleteStockFromPortService()
        }


    }, [deleteFromPortSubmitted])

    useEffect(() => {
        deleteStockFromPortService()
    }, [symbolToDel])

    useEffect(() => {
        if (deletePortSubmitted == true) {
            const interim = portToDelete.trim().split("-")
            const portfolio = portList.find(i => interim == i.symbol)
            const portfolioId = portfolio.id
            console.log(`This is the id: ${portfolioId}`)
            console.log("Above is from the delete Port submitted useEffect")
            deletePortfolioService(portfolioId)
        }
    }, [deletePortSubmitted])

    useEffect(() => {
        if (deleteStockSubmitted == true) {
            const interim = stockToDelete.trim().split("-")
            setStockToDelete(interim[0])
            const stock = stockList.find(i => interim == i.symb)
            const stockId = stock._id
            console.log(`This is the id: ${stockId}`)
            console.log("Above is from the delete delete stock submitted useEffect")
            deleteStockService(stockId)
        }
    }, [deleteStockSubmitted])

    useEffect(() => {
        if (selectedCurrencySubmitted == true) {
            const interim = selectedCurrency.trim().split("-")
            setSelectedCurrency(interim[0])
            currencyUpdateService()
        }
    }, [selectedCurrencySubmitted])


    const PopUpClose = () => {
        // Reset toggles
        setEditStockPortfolio(false)
        setAddStockToPort(false)
        setDelStockFromPort(false)
        setAddToPortSubmitted(false)
        setDeleteFromPortSubmitted(false)
        setPortEditFormSubmitted(false)
        setDeletePortSubmitted(false)
        setDeleteStockSubmitted(false)
        setSelectedCurrencySubmitted(false)
        setDeletePort(false)
        setDeleteStock(false)
        setCurrencySelect(false)
        setOptionsOnly(true)

        closePopUp(false)
    }

    return ( 
        <>
        <div className="relative">
            <div className="fixed top-40 right-8">
                <div className="bg-gho-white border-2 rounded-xl w-96 px-8 py-6">
                    <div className="flex items-center justify-end space-x-36 mb-4">
                        <div className="flex space-x-8">
                            <img src={settings} alt="" />
                            <p className="text-gho-blue text-2xl text-nowrap">Settings</p> 
                        </div>
                        <img src={close_btn} alt="" onClick={PopUpClose} className="cursor-pointer"/>
                    </div>

                    <div className={optionsOnly == false ? "hidden" : "block"}>
                        <div className="mx-auto w-80 text-xl">
                        
                            <div className="flex space-x-10">
                                <img src={setting_item} alt="setting item" />
                                <p className="text-gho-blue py-1 cursor-pointer" onClick={toggleStockPortfolioView}>Edit Portfolio</p>
                            </div>

                            <div className="flex space-x-10">
                                <img src={setting_item} alt="setting item" />
                                <p className="text-gho-blue py-1 cursor-pointer" onClick={togglePortfolioDeleteView}>Delete Portfolio</p>
                            </div>

                            <div className="flex space-x-10">
                                <img src={setting_item} alt="setting item" />
                                <p className="text-gho-blue py-1 cursor-pointer" onClick={toggleStockDeleteView}>Delete Stock</p>
                            </div>

                            <div className="flex space-x-10">
                                <img src={setting_item} alt="setting item" />
                                <p className="text-gho-blue py-1 cursor-pointer" onClick={toggleCurrencySelectView}>Change default currency</p>
                            </div>
                        </div>
                    </div>

                    <div className={editStockPortfolio == false ? "hidden" : "block"}>
                        <form action="" className="text-gho-blue space-y-12 py-4" onSubmit={handleEditPortSubmit}>
                            <div>
                                <label className="text-gho-blue text-2xl text-nowrap">Portfolio Name:</label> <br />
                                <select 
                                    name="portfolios" 
                                    id="portfolios" 
                                    className="border-2 border-gho-blue rounded-lg h-10 w-72"
                                    onChange={(e) => {
                                            setPortToEditError('')   
                                            setPortToEdit(e.target.value)
                                        }
                                    }
                                >
                                    <option value="portfolio_name">[SYMB] - Portfolio Name</option>
                                {
                                    portList.map(
                                        (portfolio, index) => {
                                            return (
                                                <option key={index} value={portfolio.symbol}>[{portfolio.symbol}] - {portfolio.name}</option>
                                            )
                                        }
                                    )
                                }
                                </select>
                                
                            </div>
                            <div>
                                <label className="text-gho-blue text-2xl text-nowrap">What would you like to do?</label> <br />
                                {
                                    editOptions.map(
                                        (option, index) => {
                                            return (
                                                <div key={index} className="flex space-x-4 my-4 cursor-pointer" onClick={() => setSelectedIndex(index)}>
                                                    <img src={selectedIndex == index ? selectState : deselectState} alt="" />
                                                    <p>{option}</p>
                                                </div>
                                            )
                                        }
                                    )
                                }

                                <p className="h-16 text-gho-red my-4">{portToEditError}</p>
                            </div>
                            
                            <div className="w-72 flex justify-end">
                                <input type="submit" value="NEXT" className="border-2 border-gho-blue rounded-lg h-10 w-36"/>
                            </div>
                        </form>
                    </div>

                    <div className={addStockToPort == false ? "hidden" : "block"}>
                        <form action="" className="text-gho-blue space-y-12 py-4" onSubmit={handleAddToPortSubmit}>
                            <div>
                                <label className="text-gho-blue text-2xl text-wrap">Select the Stock you would like to add to this portfolio</label> <br />
                                <select 
                                    name="portfolios" 
                                    id="portfolios" 
                                    className="border-2 border-gho-blue rounded-lg h-10 w-full mt-8"
                                    onChange={(e) => {
                                            setPortToEditError('')   
                                            setStockToEdit(e.target.value)
                                        }
                                    }
                                >
                                    <option value="stock_name">[SYMB] Stock Name</option>
                                {
                                    stockListOutsidePort.map(
                                        (stock, index) => {
                                            const val = `${stock.symb} - ${stock.stockName}`
                                            return (
                                                <option key={index} value={val}>{val}</option>
                                            )
                                        }
                                    )
                                }
                                </select>

                                <p className="h-16 text-gho-red my-4">{portToEditError}</p>
                            </div>
                            
                            <div className="w-full flex justify-end">
                                <input type="submit" value="ADD" className="border-2 border-gho-blue rounded-lg h-10 w-36"/>
                            </div>
                        </form>
                    </div>

                    <div className={delStockFromPort == false ? "hidden" : "block"}>
                        <form action="" className="text-gho-blue space-y-12 py-4" onSubmit={handleDeleteFromPortSubmit}>
                            <div>
                                <label className="text-gho-blue text-2xl text-wrap">Select the Stock you would like to remove from this portfolio</label> <br />
                                <select 
                                    name="portfolios" 
                                    id="portfolios" 
                                    className="border-2 border-gho-blue rounded-lg h-10 w-full mt-8"
                                    onChange={(e) => {
                                            setPortToEditError('')   
                                            setStockToEdit(e.target.value)
                                        }
                                    }
                                >
                                    <option value="stock_name">[SYMB] Stock Name</option>
                                {
                                    stockListwithinPort.map(
                                        (stock, index) => {
                                            const val = `${stock.symb} - ${stock.stockName}`
                                            return (
                                                <option key={index} value={val}>{val}</option>
                                            )
                                        }
                                    )
                                }
                                </select>

                                <p className="h-16 text-gho-red my-4">{portToEditError}</p>
                            </div>
                            
                            <div className="w-full flex justify-end">
                                <input type="submit" value="REMOVE" className="border-2 border-gho-blue rounded-lg h-10 w-36"/>
                            </div>
                        </form>
                    </div>

                    <div className={deletePort == false ? "hidden" : "block"}>
                        <form action="" className="text-gho-blue space-y-12 py-4" onSubmit={handlePortDeleteSubmit}>
                            <div>
                                <label className="text-gho-blue text-2xl text-wrap">Select the Portfolio you would like to delete</label> <br />
                                <select 
                                    name="portfolios" 
                                    id="portfolios" 
                                    className="border-2 border-gho-blue rounded-lg h-10 w-full mt-8"
                                    onChange={(e) => {
                                            setPortToEditError('')   
                                            setPortToDelete(e.target.value)
                                        }
                                    }
                                >
                                    <option value="stock_name">[SYMB] - Port Name</option>
                                {
                                    portList.map(
                                        (portfolio, index) => {
                                            return (
                                                <option key={index} value={portfolio.symbol}>[{portfolio.symbol}] - {portfolio.name}</option>
                                            )
                                        }
                                    )
                                }
                                </select>

                                <p className="h-16 text-gho-red my-4">{portToEditError}</p>
                            </div>
                            
                            <div className="w-full flex justify-end">
                                <input type="submit" value="DELETE" className="border-2 border-gho-red rounded-lg h-10 w-36 text-gho-red"/>
                            </div>
                        </form>
                    </div>

                    <div className={deleteStock == false ? "hidden" : "block"}>
                        <form action="" className="text-gho-blue space-y-12 py-4" onSubmit={handleStockDeleteSubmit}>
                            <div>
                                <label className="text-gho-blue text-2xl text-wrap">Select the Stock you would like to delete</label> <br />
                                <select 
                                    name="portfolios" 
                                    id="portfolios" 
                                    className="border-2 border-gho-blue rounded-lg h-10 w-full mt-8"
                                    onChange={(e) => {
                                            setPortToEditError('')
                                            setStockToDelete(e.target.value)
                                        }
                                    }
                                >
                                    <option value="stock_name">[SYMB] - Stock Name</option>
                                {
                                    stockList.map(
                                        (stock, index) => {
                                            return (
                                                <option key={index} value={stock.symb}>{stock.symb} - {stock.stockName}</option>
                                            )
                                        }
                                    )
                                }
                                </select>

                                <p className="h-16 text-gho-red my-4">{portToEditError}</p>
                            </div>
                            
                            <div className="w-full flex justify-end">
                                <input type="submit" value="DELETE" className="border-2 border-gho-red rounded-lg h-10 w-36 text-gho-red"/>
                            </div>
                        </form>
                    </div>

                    <div className={currencySelect == false ? "hidden" : "block"}>
                        <form action="" className="text-gho-blue space-y-12 py-4" onSubmit={handleCurrencySelectSubmit}>
                            <div>
                                <label className="text-gho-blue text-2xl text-wrap">Currency:</label> <br />
                                <select 
                                    name="portfolios" 
                                    id="portfolios" 
                                    className="border-2 border-gho-blue rounded-lg h-10 w-full mt-8"
                                    onChange={(e) => {
                                            setPortToEditError('')
                                            setSelectedCurrency(e.target.value)
                                        }
                                    }
                                >
                                    <option value="currency_select">Currency Selection</option>
                                    <option value="USD">United States Dollar ($)</option>
                                    <option value="NGN">Nigerian Naira (₦)</option>
                                </select>

                                <p className="h-16 text-gho-red my-4">{portToEditError}</p>
                            </div>
                            
                            <div className="w-full flex justify-end">
                                <input type="submit" value="DONE" className="border-2 border-gho-blue rounded-lg h-10 w-36 text-gho-blue"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default SettingsPopUp;