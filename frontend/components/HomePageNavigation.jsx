import { useState } from "react";
import LoginModal from "../modals/LoginModal";
import LittleMeLogo from "../public/LMLC.png"
const HomePageNavigation = () => {

    const [isLogin, setIsLogin] = useState(false);

    return(
        <nav className="bg-white h-20 w-full fixed top-0 z-50 justify-between items-center flex px-20">
             <div className="flex gap-4 justify-center items-center flex">
                <div className="h-10 w-10 bg-white rounded-2xl">
                    <img src={LittleMeLogo} alt="logo" className="h-full w-full object-cover" />
                </div>
                
                <h1 className="text-lg font-bold text-pink-500">Little Me Library</h1>
             </div>
             
             <div className="bg-pink-500 px-4 py-2 rounded-full text-white font-bold justify-center items-center flex cursor-pointer" onClick={() => setIsLogin(true)}>Login →</div>
             {isLogin && (<LoginModal onClose={() => setIsLogin(false)}/>)}
        </nav>
    )
}
export default HomePageNavigation;