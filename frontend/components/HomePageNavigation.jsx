import { useState } from "react";
import { MoveRight } from "lucide-react";
import NaicLibraryLogo from "../src/assets/NaicLibraryLogo.png"
import { useNavigate } from "react-router-dom";

const HomePageNavigation = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    return(
        <nav className="bg-stone-900 h-15 w-full fixed top-0 z-50 justify-center items-center flex">
                
            <div className="w-6xl justify-between items-center flex">
                <div className="flex gap-2 justify-center items-center">
                    <div className="h-8 w-8 rounded-full bg-white">
                        <img src={NaicLibraryLogo} alt="logo" className="object-cover" />
                    </div>
                    <h1 className="text-sm font-bold text-stone-200">Naic Municipality Library</h1>
                </div>
             
             <div className="justify-center items-center flex gap-1">
                 <button className="bg-transparent p-2 rounded-lg text-white text-xs justify-center items-center flex cursor-pointer gap-1 hover:bg-stone-700" 
                onClick={() => navigate('/registration')}>
                    <h1>Register</h1>
                </button>
                <button className="bg-stone-800 p-2 rounded-lg text-white text-xs justify-center items-center flex cursor-pointer gap-1 hover:bg-stone-700" 
                onClick={() => navigate('/login')}>
                    <h1>Sign In</h1>
                </button>
             </div>
            
            </div>
             
             
        </nav>
    )
}
export default HomePageNavigation;