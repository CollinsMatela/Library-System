import { useState } from "react";
import { MoveRight } from "lucide-react";
import NaicLibraryLogo from "../src/assets/NaicLibraryLogo.png"
import { useNavigate } from "react-router-dom";

const HomePageNavigation = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    const [isHome, setIsHome] = useState(false);
    const [isAbout, setIsAbout] = useState(false);
    const [isFeatures, setIsFeatures] = useState(false);

    const Sliding = (page) => {

    if (page === "home") {
        setIsHome(true);
        setIsAbout(false);
        setIsFeatures(false);

    } else if (page === "about") {
        setIsHome(false);
        setIsAbout(true);
        setIsFeatures(false);

    } else if (page === "features") {
        setIsHome(false);
        setIsAbout(false);
        setIsFeatures(true);
    }

};
    return(
        <nav className="fixed top-0 z-50 flex h-15 w-full items-center justify-center bg-white/50 px-4 backdrop-blur-[2px]">
    
    <div className="flex h-full w-full max-w-6xl items-center justify-between">
        
        {/* Logo + Name */}
        <div className="flex items-center gap-2">
            
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                <img
                    src={NaicLibraryLogo}
                    alt="Naic Municipal Library logo"
                    className="h-full w-full object-cover"
                />
            </div>

            <h1 className="hidden text-sm font-bold text-stone-800 sm:block">
                Naic Municipal Library
            </h1>

        </div>


        {/* Navigation Links */}
        <div className="hidden h-full items-center gap-2 sm:flex">
            
            <a href={"#home"} className={`${isHome ? "border-b-2 border-stone-800" : ""} cursor-pointer p-4 text-[10px] text-stone-700`}
            onClick={() => Sliding('home')}>
                Home
            </a>

            <a href={"#about"} className={`${isAbout ? "border-b-2 border-stone-800" : ""} cursor-pointer p-4 text-[10px] text-stone-700`}
             onClick={() => Sliding('about')}>
                About
            </a>

            <a href={"#features"} className={`${isFeatures ? "border-b-2 border-stone-800" : ""} cursor-pointer p-4 text-[10px] text-stone-700`}
             onClick={() => Sliding('features')}>
                Features
            </a>

        </div>


        {/* Authentication Buttons */}
        <div className="flex items-center gap-1">
            
            <button
                className="flex cursor-pointer items-center justify-center rounded-lg bg-stone-200 px-3 py-2 text-[10px] text-stone-600 hover:bg-stone-300 sm:px-4"
                onClick={() => navigate('/registration')}
            >
                Register
            </button>

            <button
                className="flex cursor-pointer items-center justify-center rounded-lg bg-stone-800 px-3 py-2 text-[10px] text-white hover:bg-stone-700 sm:px-4"
                onClick={() => navigate('/login')}
            >
                Sign In
            </button>

        </div>

    </div>

</nav>
    )
}
export default HomePageNavigation;