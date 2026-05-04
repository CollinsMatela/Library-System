import AllIcon from '../src/assets/face-with-spiral-eyes-svgrepo-com.svg'
import AdventureIcon from '../src/assets/cowboy-hat-face-svgrepo-com.svg'
import FantasyIcon from '../src/assets/exploding-head-svgrepo-com.svg'
import RomanceIcon from '../src/assets/smiling-face-with-hearts-svgrepo-com.svg'
import DramaIcon from '../src/assets/astonished-face-svgrepo-com.svg'
import FairyTaleIcon from '../src/assets/star-struck-svgrepo-com.svg'
import ComedyIcon from '../src/assets/grinning-face-with-big-eyes-svgrepo-com.svg'
import HorrorIcon from '../src/assets/face-screaming-in-fear-svgrepo-com.svg'
import MysteryIcon from '../src/assets/face-with-monocle-svgrepo-com.svg'
import SciFiIcon from '../src/assets/smiling-face-with-sunglasses-svgrepo-com.svg'
import EducattionalIcon from '../src/assets/nerd-face-svgrepo-com.svg'

const Lib_Story_Buttons = ({showStories}) => {
    return(
        <div className="my-10 gap-4 flex">
                             <div className="h-25 w-20" onClick={() => showStories("All")}>
                                <button className="shadow-lg h-20 w-20 rounded-full bg-blue-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"><img src={AllIcon} /></button>
                                <h1 className="w-full text-center font-semibold text-sm text-gray-800">All</h1>
                             </div>
        
                             <div className="h-25 w-20" onClick={() => showStories("Adventure")}>
                                <button className="shadow-lg h-20 w-20 rounded-full bg-green-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"><img src={AdventureIcon} /></button>
                                <h1 className="w-full text-center font-semibold text-sm text-gray-800">Adventure</h1>
                             </div>
        
                             <div className="h-25 w-20" onClick={() => showStories("Fantasy")}>
                                <button className="shadow-lg h-20 w-20 rounded-full bg-violet-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"><img src={FantasyIcon} /></button>
                                <h1 className="w-full text-center font-semibold text-sm text-gray-800">Fantasy</h1>
                             </div>
        
                             <div className="h-25 w-20" onClick={() => showStories("Romance")}>
                                <button className="shadow-lg h-20 w-20 rounded-full bg-red-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"><img src={RomanceIcon} /></button>
                                <h1 className="w-full text-center font-semibold text-sm text-gray-800">Romance</h1>
                             </div>
        
                             <div className="h-25 w-20" onClick={() => showStories("Drama")}>
                                <button className="shadow-lg h-20 w-20 rounded-full bg-orange-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"><img src={DramaIcon} /></button>
                                <h1 className="w-full text-center font-semibold text-sm text-gray-800">Drama</h1>
                             </div>
        
                             <div className="h-25 w-20" onClick={() => showStories("Fairy Tale")}>
                                <button className="shadow-lg h-20 w-20 rounded-full bg-emerald-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"><img src={FairyTaleIcon} /></button>
                                <h1 className="w-full text-center font-semibold text-sm text-gray-800">Fairy Tale</h1>
                             </div>
        
                             <div className="h-25 w-20" onClick={() => showStories("Comedy")}>
                                <button className="shadow-lg h-20 w-20 rounded-full bg-amber-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"><img src={ComedyIcon} /></button>
                                <h1 className="w-full text-center font-semibold text-sm text-gray-800">Comedy</h1>
                             </div>
        
                             <div className="h-25 w-20" onClick={() => showStories("Horror")}>
                                <button className="shadow-lg h-20 w-20 rounded-full bg-gray-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"><img src={HorrorIcon} /></button>
                                <h1 className="w-full text-center font-semibold text-sm text-gray-800">Horror</h1>
                             </div>
        
                             <div className="h-25 w-20" onClick={() => showStories("Mystery")}>
                                <button className="shadow-lg h-20 w-20 rounded-full bg-pink-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"><img src={MysteryIcon} /></button>
                                <h1 className="w-full text-center font-semibold text-sm text-gray-800">Mystery</h1>
                             </div>
        
                             <div className="h-25 w-20" onClick={() => showStories("Sci-Fi")}>
                                <button className="shadow-lg h-20 w-20 rounded-full bg-cyan-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"><img src={SciFiIcon} /></button>
                                <h1 className="w-full text-center font-semibold text-sm text-gray-800">Sci-Fi</h1>
                             </div>
        
                             <div className="h-25 w-20" onClick={() => showStories("Educational")}>
                                <button className="shadow-lg h-20 w-20 rounded-full bg-mist-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"><img src={EducattionalIcon} /></button>
                                <h1 className="w-full text-center font-semibold text-sm text-gray-800">Educational</h1>
                             </div>
                         </div>
    )
}
export default Lib_Story_Buttons;