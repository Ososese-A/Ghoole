import close_btn from "../assets/close.svg"
import add_btn from "../assets/addPopUp.svg"
import back from "../assets/back.svg"
import { useEffect, useState } from "react"


const AddPopUp = ({closePopUp}) => {
    const [optionsView, setOptionsView] = useState(true)
    const [stockOnly, setStockOnly] = useState(false)
    const [portfolioOnly, setPortfolioOnly] = useState(false)
    const [stockPortfolio, setStockPortfolio] = useState(false)
    const [symbCheck, setSymbCheck] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [symb, setSymb] = useState('')
    const [stockName, setStockName] = useState('')
    const [addStockError, setAddStockError] = useState('')
    const [addPortNameError, setAddPortNameError] = useState('')
    const [addPortSymbError, setAddPortSymbError] = useState('')

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

    const addPortToDB = async (e) => {
        e.preventDefault()
        const portResFromDb = await getPortInfo()
        const portResTemp = [portResFromDb]
        const portRes = portResTemp[0]
        const portToCheckFor = portRes.map(item => item.symbol)

        if (portToCheckFor.includes(symbCheck)) {
            setAddPortSymbError(`Portfolio Already added!`)
        } else {
            await addToPortDB()
            PopUpClose()
        }
    }

    const addToPortDB = async () => {
        const portRes = {
            symbol: symbCheck,
            //We are deleting synbName Check so this should be portfolio name while we create stockName usestate variable
            // name: symbNameCheck
        }
        console.log(portRes)

        await fetch('http://localhost:4000/api/portfolio/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(portRes)
        })

        window.location.reload()
    }

    const getPortInfo = async () => {
        const url = 'http://localhost:4000/api/portfolio/'
        const options = {
            method: 'GET'
        }

        try {
            const response = await fetch(url, options)
            const result = await response.json();
            return result
        } catch (error) {
        }
    }

    const handleAddStockSubmit = (e) => {
        e.preventDefault()
        setFormSubmitted(true)
    }

    


    useEffect(() => {
        const secondStockCheck = async (stockToDb) => {
            const yahooUrl = `https://yahoo-finance-api-data.p.rapidapi.com/search/symbol?keyword=${stockToDb}&limit=10`;
            const initialRes = await fetchSymbs()
            const postRes = [initialRes]
            const postResB = postRes[0]
            const symbToCheckFor = postResB.map(item => item.symb)
            const yahooOptions = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'bd6e6d157amshf36e3d1c4bbb870p1f530ejsnd25bf5616122',
                'x-rapidapi-host': 'yahoo-finance-api-data.p.rapidapi.com'
            }
            };
    
            try {
                const yahooResponse = await fetch(yahooUrl, yahooOptions);
                const yahooResult = await yahooResponse.json();
                // setSymbNameCheck(yahooResult.data[0].longname)
    
    
                
                const addToDBSymb = yahooResult.data[0].symbol
                const addToDBStockName = yahooResult.data[0].longname
                // setSymbCheck(addToDBSymb)
                // setStockName(addToDBStockName)
                console.log(`This is from the second stock to check function ${addToDBStockName}`);
    
                if (yahooResponse.ok) {
                    if (yahooResponse.status === 200) {
                        if (symbToCheckFor.includes(symbCheck)) {
                            setAddStockError(`Stock Already added!`)
                        } else {
                            await addToDB(addToDBSymb, addToDBStockName)
                            PopUpClose()
                        }
                    }
                }
    
    
    
            } catch (error) {
                console.error(error);
                setAddStockError("Stock not found")
            }
        }


        const addStockToDB = async () => {
            const initialRes = await fetchSymbs()
            const postRes = [initialRes]
            const postResB = postRes[0]
            const symbToCheckFor = postResB.map(item => item.symb)
            console.log(symbCheck)
            console.log(symbToCheckFor.includes(symbCheck))
            console.log(symbToCheckFor)
    
            const url = `https://realstonks.p.rapidapi.com/stocks/${symbCheck}/advanced`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'bd6e6d157amshf36e3d1c4bbb870p1f530ejsnd25bf5616122',
                    'x-rapidapi-host': 'realstonks.p.rapidapi.com'
                }
            };
    
            try {
                const response = await fetch(url, options)
    
                const result = await response.json();
                // setSymbNameCheck(result.symbolName)
                
    
                const addToDBSymb = result.symbol
                const addToDBStockName = result.symbolName
                // setSymbCheck(addToDBSymb)
                // setStockName(addToDBStockName)
                console.log(`This is from the addStock DB function ${addToDBStockName}`) 
    
                if (response.ok) {
                    if (response.status === 200) {
                        if (symbToCheckFor.includes(symbCheck)) {
                            setAddStockError(`Stock Already added!`)
                        } else {
                            await addToDB(addToDBSymb, addToDBStockName)
                            PopUpClose()
                        }
                    }
                }
            } catch (error) {
                console.error("Fetch error: ", error)
                console.log("An error occured from the submission")
                secondStockCheck(symbCheck)
            }
        }


        const addToDB = async  (symb, stockName) => {
            const symbRes = 
            {
                symb,
                stockName}
            console.log(`This log goes before we send it to the DB: ${{symbRes}}`)
    
            await fetch('http://localhost:4000/api/stock/', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(symbRes)
            })
    
            window.location.reload()
        }


        if (formSubmitted) {
            addStockToDB()
            setFormSubmitted(false)
        }


    }, [formSubmitted]);

    

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


                            <form action="" className="text-gho-blue space-y-12 py-4" onSubmit={handleAddStockSubmit}>
                                <div>
                                    <label className="text-gho-blue text-2xl text-nowrap">Stock Symbol:</label> <br />
                                    <input 
                                        type="text" 
                                        name="" id="text_field_space" 
                                        className="border-2 border-gho-blue rounded-lg h-10 w-72" 
                                        onChange={(e) => setSymbCheck(e.target.value)}
                                    />
                                    <p className="h-16 text-gho-red">{addStockError}</p>
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

                            <form action="" className="text-gho-blue space-y-12 py-4" onSubmit={addPortToDB}>
                                <div>
                                    <label className="text-gho-blue text-2xl text-nowrap">Portfolio Name:</label> <br />
                                    <input 
                                        type="text" 
                                        name="" 
                                        id="text_field_space" 
                                        className="border-2 border-gho-blue rounded-lg h-10 w-72"
                                        //We are deleting synbName Check so this should be portfolio name while we create stockName usestate variable
                                        // onChange={(e) => setSymbNameCheck(e.target.value)}
                                    />
                                    <p className="h-16 text-gho-red">{addPortNameError}</p>
                                </div>
                                <div>
                                    <label className="text-gho-blue text-2xl text-nowrap">Portfolio Symbol:</label> <br />
                                    <input 
                                        type="text" 
                                        name="" 
                                        id="text_field_space" 
                                        className="border-2 border-gho-blue rounded-lg h-10 w-72" 
                                        onChange={(e) => setSymbCheck(e.target.value)}
                                    />
                                    <p className="h-16 text-gho-red">{addPortSymbError}</p>
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