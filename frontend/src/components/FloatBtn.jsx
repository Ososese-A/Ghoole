import { useState } from "react";
import addition from "../assets/addition.svg";
import refresh from "../assets/refresh.svg";
import AddPopUp from "../popUps/AddPopUp";

const FloatBtn = () => {
    const [visibility, setVisibility] = useState(false)

    const openPopUp = () => {
        visibility == true ? setVisibility(false) : setVisibility(true)
    }

    const closePopUp = (visible) => {
        setVisibility(visible)
    }

    const refreshStocks = () => {
        window.location.reload();
    }

    return ( 
        <>
        <div className={visibility == true ? "block" : "hidden"}>
        <AddPopUp closePopUp={closePopUp} />
        </div>
        <div className="relative">
            <div className="fixed bottom-6 right-1 overflow-hidden">
                <div className="flex space-x-6">
                    <div className="border-2 rounded-full p-4 bg-gho-white cursor-pointer" onClick={openPopUp}>
                        <img src={addition} alt="addition button"/>
                    </div>
                    <div className="border-2 rounded-full p-4 bg-gho-white cursor-pointer">
                        <img src={refresh} alt="refresh button" onClick={refreshStocks}/>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default FloatBtn;