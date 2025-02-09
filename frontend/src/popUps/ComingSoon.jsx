import settings from "../assets/settings.svg"
import close_btn from "../assets/close.svg"

const ComingSoon = ({closePopUp}) => {

    const PopUpClose = () => {
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
                    <p className="text-gho-blue text-xl" >Settings and other features to be added soon!!!</p>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default ComingSoon;