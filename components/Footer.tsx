import {FaWhatsapp} from "react-icons/fa";


const Footer = () => {
    return (
        <div className={"text-gray-300 text-center py-4 flex flex-col items-center justify-center space-y-2 mt-10 text-xs w-full relative bottom-2 left-0"}>
            <p>Designed & Powered By Donadex Technology Limited</p>
            <div className={"text-gray-300 flex items-center justify-center gap-2"}>
                <FaWhatsapp /> +2347036168688
            </div>
        </div>
    )
}
export default Footer
