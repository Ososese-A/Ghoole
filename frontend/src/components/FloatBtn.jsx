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

    return ( 
        <>
        <div className={visibility == true ? "block" : "hidden"}>
        <AddPopUp closePopUp={closePopUp} />
        </div>
        <div className="relative">
            <div className="fixed bottom-6 right-1 overflow-hidden">
                <div className="flex space-x-6">
                    <div className="border-2 rounded-full p-4 bg-gho-white">
                        <img src={addition} alt="" onClick={openPopUp} className="cursor-pointer"/>
                    </div>
                    <div className="border-2 rounded-full p-4 bg-gho-white">
                        <img src={refresh} alt="" />
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default FloatBtn;