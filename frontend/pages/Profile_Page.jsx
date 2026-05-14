import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useRef } from "react";
import axios from "axios";
import { useState } from "react";

const Profile_Page = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const inputAvatarFile = useRef(null);

    const [avatarFile, setAvatarFile] = useState(null);
    
    const AvatarChange = async () => {
          try {
            const formDate = new FormData();
            FormData.append("avatar", avatarFile);

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/set-avatar`, formDate);
          } catch (error) {
            console.log(error)
          }
    }
    const openFileExplorer = (e) => {
        const selected = e.target.files[0];
        setAvatarFile(selected);
        
    }

    return(
        <section className="bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 min-h-screen w-full justify-center items-start flex p-4">
            <div className="bg-white min-h-screen shadow-2xl w-full justify-start items-center flex flex-col rounded-2xl pb-4">

                <nav className="bg-gradient-to-br from-pink-500 via-blue-500 to-yellow-500 rounded-t-2xl h-20 w-full justify-between items-center flex px-6">
                    <h1 className="text-lg text-white font-bold">Your Profile</h1>
                    <h1 className="text-base text-white font-bold cursor-pointer" onClick={() => navigate(-1)}>⟵ Back</h1>
                </nav>
                
               

        <div className="w-5xl justify-start items-start flex flex-col gap-6 my-10">

                <div className="w-5xl justify-between items-start flex border-b-1 border-gray-500 gap-4 py-6">
                    
                    <div className="h-full max-w-100 justify-start items-start flex gap-6">
                        <img src={user?.avatar} className="h-20 w-30 object-cover rounded-2xl bg-gray-300"/>
                        <div className="w-full justify-start items-start flex flex-col">
                            <h1 className="text-2xl text-gray-800 font-bold">{user?.role   } {user?.firstname} {user?.lastname}</h1>
                            <h1 className="text-base text-gray-500 font-bold">{user?.username} • {user?.gradeLevel} • {user?.branch}</h1>
                        </div>
                    </div>

                    <div className="h-full justify-center items-center flex gap-2 bg-white border-2 border-gray-300 text-gray-500 hover:bg-blue-500 hover:border-none transition-all duration-300 hover:text-white py-2 px-4 rounded-lg cursor-pointer" onClick={() => inputAvatarFile.current.click()}>
                        <input ref={inputAvatarFile} type="file" className="hidden" onChange={openFileExplorer}/>
                        Change Avatar 
                    </div>
                </div>

                <h1 className="text-lg text-gray-500 font-bold">Acquired Achievements</h1>
                <div className="w-5xl justify-between items-start flex rounded-2xl border-1 border-gray-500 gap-4 p-6">
                    <div className="bg-gray-200 rounded-xl w-full justify-center items-center flex gap-4">
                        <h1 className="my-6">No Achievements Yet</h1>
                    </div>
                </div>

                <h1 className="text-lg text-gray-500 font-bold">Score Results</h1>
                <div className="w-5xl justify-between items-start flex rounded-2xl border-1 border-gray-500 gap-4 p-6">
                    <div className="bg-gray-200 rounded-xl w-full justify-center items-center flex gap-4">
                        <h1 className="my-6">No Score Results Yet</h1>
                    </div>
                </div>

                <h1 className="text-lg text-gray-500 font-bold">Performance Analytics</h1>
                <div className="w-5xl justify-between items-start flex rounded-2xl border-1 border-gray-500 gap-4 p-6">
                    <div className="bg-gray-200 rounded-xl w-full justify-center items-center flex gap-4">
                        <h1 className="my-6">No Score Results Yet</h1>
                    </div>
                </div>

            
                
                
        
        </div>
                    
              
                

            </div>
        </section>
    )
} 
export default Profile_Page;