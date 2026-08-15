import { useState } from "react";
import { MoveRight } from "lucide-react";
import NaicLibraryLogo from "../src/assets/NaicLibraryLogo.png"
import { useNavigate } from "react-router-dom";

const HomePageNavigation = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    return(
        <nav className="bg-white h-20 w-full fixed top-0 z-50 justify-center items-center flex">
                
            <div className="w-6xl justify-between items-center flex">
                <div className="flex gap-2 justify-center items-center">
                    <img src={NaicLibraryLogo} alt="logo" className="h-10 w-10 object-cover" />
                    <h1 className="text-md font-bold text-black">Naic Municipality Library</h1>
             </div>
             
             <div className="bg-blue-600 px-4 py-2 rounded-full text-white text-xs font-md justify-center items-center flex cursor-pointer gap-2 hover:bg-blue-700" onClick={() => navigate('/login')}>Sign in <MoveRight size={20}/></div>
            </div>
             
             
        </nav>
    )
}
export default HomePageNavigation;