import { useState } from "react";
import LoginModal from "../modals/LoginModal";
import { MoveRight } from "lucide-react";
const HomePageNavigation = () => {

    const [isLogin, setIsLogin] = useState(false);

    return(
        <nav className="bg-white h-20 w-full fixed top-0 z-50 justify-center items-center flex">
            {isLogin && (<LoginModal onClose={() => setIsLogin(false)}/>)}
            <div className="w-6xl justify-between items-center flex">
                    <div className="flex gap-4 justify-center items-center flex">
                <div className="h-10 w-10 bg-gray-200 rounded-2xl">
                    {/* <img src={LittleMeLogo} alt="logo" className="h-full w-full object-cover" /> */}
                </div>
                
                <h1 className="text-lg font-bold text-black">Digital Library Platform</h1>
             </div>
             
             <div className="bg-blue-600 px-4 py-2 rounded-lg text-white text-sm font-md justify-center items-center flex cursor-pointer gap-2" onClick={() => setIsLogin(true)}>Sign in <MoveRight size={20}/></div>
            </div>
             
             
        </nav>
    )
}
export default HomePageNavigation;