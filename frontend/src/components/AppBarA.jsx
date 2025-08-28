import logout from "../assets/logout.svg"
import logo from "../assets/logo.svg"
import settings from "../assets/settings.svg"
import { useState } from "react"
import ComingSoon from "../popUps/ComingSoon"
import SettingsPopUp from "../popUps/SettingsPopUp"

const AppBarA = () => {
    const [visibility, setVisibility] = useState(false)

    const openPopUp = () => {
        visibility == true ? setVisibility(false) : setVisibility(true)
    }

    const closePopUp = (visible) => {
        setVisibility(visible)
    }

    const logoutFunc = () => {
        window.close();
    }

    return ( 
        <>
        <nav className="flex items-center justify-around sticky top-0 bg-gho-white w-screen  py-10 rounded-b-xl cursor-pointer">
            <div className="flex md:space-x-4 text-gho-blue" onClick={logoutFunc}>
                <p className="hidden l:hidden md:block text-3xl">Logout</p>
                <img src={logout} alt="" />
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
        <SettingsPopUp closePopUp={closePopUp} />
        </div>
        </>
     );
}
 
export default AppBarA;