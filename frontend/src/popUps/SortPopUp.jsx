import filter_b from "../assets/filter_b.svg"
import filtering from "../assets/filtering.svg"
import close_btn from "../assets/close.svg"
import SortToggleItem from "../components/SortToggleItem"
import useStockFilterContext from "../hooks/useStockFilterContext"

const SortPopUp = ({closePopUp}) => {
    const {dispatch} = useStockFilterContext()
    const {state} = useStockFilterContext()

    const PopUpClose = () => {
        closePopUp(false)
    }

    const toggleAllView = () => {
        dispatch({type: ''})
        console.log(state.stockFilter)
        PopUpClose()
    }
    const togglePortfolioView = () => {
        dispatch({type: 'PORTFOLIO'})
        console.log(state.stockFilter)
        PopUpClose()
    }
    const toggleSectorView = () => {
        dispatch({type: 'SECTOR'})
        console.log(state.stockFilter)
        PopUpClose()
    }
    const toggleIndustryView = () => {
        dispatch({type: 'INDUSTRY'})
        console.log(state.stockFilter)
        PopUpClose()
    }
    const togglePriceView = () => {
        dispatch({type: 'PRICE'})
        console.log(state.stockFilter)
        PopUpClose()
    }
    const toggleNameView = () => {
        dispatch({type: 'NAME'})
        console.log(state.stockFilter)
        PopUpClose()
    }
    const toggleAddedView = () => {
        dispatch({type: 'ADDED'})
        console.log(state.stockFilter)
        PopUpClose()
    }

    return (
        <>
        <div className="relative">
            <div className="pop_up">
                <div>
                        <div className="bg-gho-white border-2 rounded-xl w-96 px-8 py-6">
                            <div className="flex items-center justify-end space-x-36 mb-4">
                                <div className="flex space-x-8">
                                    <img src={filter_b} alt="" />
                                    <p className="text-gho-blue text-2xl text-nowrap">Sort By</p> 
                                </div>
                                <img src={close_btn} alt="" onClick={PopUpClose} className="cursor-pointer"/>
                            </div>
                            <div className="mx-auto w-80 text-xl">
                                <div className="flex space-x-10" onClick={toggleAllView}>
                                    <img src={filtering} alt=""/> 
                                    <p className="text-gho-blue py-1 cursor-pointer"> All </p>
                                </div>
                                <div className="flex space-x-10" onClick={togglePortfolioView}>
                                    <img src={filtering} alt=""/> 
                                    <p className="text-gho-blue py-1 cursor-pointer">Portfolio </p>
                                </div>
                                <div className="flex space-x-10" onClick={toggleSectorView}>
                                    <img src={filtering} alt=""/> 
                                    <p className="text-gho-blue py-1 cursor-pointer"> Sector  </p>
                                </div>
                                <div className="flex space-x-10" onClick={toggleIndustryView}>
                                    <img src={filtering} alt=""/> 
                                    <p className="text-gho-blue py-1 cursor-pointer"> Industry </p>
                                </div>
                                <div onClick={togglePriceView}>
                                    <SortToggleItem sortLabel='Price'/>
                                </div>
                                <div onClick={toggleNameView}>
                                    <SortToggleItem sortLabel='Name' />
                                </div>
                                <div onClick={toggleAddedView}>
                                    <SortToggleItem sortLabel='Added' />
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