import { useState } from "react";
import LoginModal from "../modals/LoginModal";
const HomePageNavigation = () => {

    const [isLogin, setIsLogin] = useState(false);

    return(
        <nav className="bg-white h-20 w-full fixed top-0 z-50 justify-between items-center flex px-20">
             <h1>Online Library System</h1>
             <div className="bg-black p-2 rounded-full w-20 text-white justify-center items-center flex cursor-pointer" onClick={() => setIsLogin(true)}>Login →</div>
             {isLogin && (<LoginModal onClose={() => setIsLogin(false)}/>)}
        </nav>
    )
}
export default HomePageNavigation;