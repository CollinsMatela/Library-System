import { useState } from "react";
import LoginModal from "../modals/LoginModal";
const HomePageNavigation = () => {

    const [isLogin, setIsLogin] = useState(false);

    return(
        <nav className="bg-white h-20 w-full fixed top-0 z-50 justify-between items-center flex px-20">
             <h1>Online Library System</h1>
             <div className="bg-pink-500 px-4 py-2 rounded-full text-white font-bold justify-center items-center flex cursor-pointer" onClick={() => setIsLogin(true)}>Login →</div>
             {isLogin && (<LoginModal onClose={() => setIsLogin(false)}/>)}
        </nav>
    )
}
export default HomePageNavigation;