import back from "../assets/back.svg"
import logo from "../assets/logo.svg"
import settings from "../assets/settings.svg"
import { useState } from "react"
import ComingSoon from "../popUps/ComingSoon"

const AppBarB = () => {
    const [visibility, setVisibility] = useState(false)
    
    const openPopUp = () => {
        visibility == true ? setVisibility(false) : setVisibility(true)
    }

    const closePopUp = (visible) => {
        setVisibility(visible)
    }

    const backButton = () => {
        window.history.back()
    }

    return ( 
        <>
        <nav className="flex items-center justify-around sticky top-0 bg-gho-white w-screen  py-10 rounded-b-xl">
            <div className="flex md:space-x-4 text-gho-blue cursor-pointer" onClick={backButton}>
                <p className="hidden l:hidden md:block text-3xl">Back</p>
                <img src={back} alt="" />
            </div>

            <div className="mx-16">
                <img src={logo} alt="" />
            </div>

            <div className="flex md:space-x-4 text-gho-blue cursor-pointer" onClick={openPopUp}>
                <p className="hidden l:hidden md:block text-3xl">Settings</p>
                <img src={settings} alt="" />
            </div>
        </nav>

        <div className={visibility == true ? "block" : "hidden"}>
        <ComingSoon closePopUp={closePopUp} />
        </div>
        </>
     );
}
 
export default AppBarB;