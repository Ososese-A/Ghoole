import back from "../assets/back.svg"
import logo from "../assets/logo.svg"
import settings from "../assets/settings.svg"

const AppBarB = () => {
    return ( 
        <>
        <nav className="flex items-center justify-around sticky top-0 bg-gho-white w-screen  py-10 rounded-b-xl">
            <div className="flex md:space-x-4 text-gho-blue">
                <p className="hidden l:hidden md:block text-3xl">Logout</p>
                <img src={back} alt="" />
            </div>

            <div className="mx-16">
                <img src={logo} alt="" />
            </div>

            <div className="flex md:space-x-4 text-gho-blue">
                <p className="hidden l:hidden md:block text-3xl">Settings</p>
                <img src={settings} alt="" />
            </div>
        </nav>
        </>
     );
}
 
export default AppBarB;