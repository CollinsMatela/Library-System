import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
const Profile_Page = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    return(
        <section className="bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 min-h-screen w-full justify-center items-start flex p-4">
            <div className="bg-white min-h-screen shadow-2xl w-full just-center items-center flex flex-col rounded-2xl pb-4">

                <nav className="bg-gradient-to-br from-pink-500 via-blue-500 to-yellow-500 rounded-t-2xl h-20 w-full justify-between items-center flex px-6">
                    <h1 className="text-lg text-white font-bold">Your Profile</h1>
                    <h1 className="text-base text-white font-bold cursor-pointer" onClick={() => navigate(-1)}>⟵ Back</h1>
                </nav>
                
                <div className="w-full flex flex-col">
                    <div className="w-full justify-center items-center flex">
                        <div className="w-full justify-center items-center flex flex-col gap-6 mt-6">

                        <div className="w-5xl justify-between items-start flex rounded-2xl border-1 border-gray-500 gap-4 p-6">
                            
                             <div className="h-full max-w-100 justify-start items-start flex gap-6">
                                <img src={user?.avatar} className="h-20 w-20 object-cover rounded-2xl bg-gray-300 border-1 border-gray-300"/>
                                <div className="w-full justify-start items-start flex flex-col">
                                    <h1 className="text-2xl text-gray-800 font-bold">{user?.role   } {user?.firstname} {user?.lastname}</h1>
                                    <h1 className="text-base text-gray-500 font-bold">{user?.username}</h1>
                                </div>
                             </div>

                             <div className="h-full justify-center items-center flex gap-2">
                                <button className="bg-white border-2 border-gray-300 text-gray-500 hover:bg-blue-500 hover:border-none transition-all duration-300 hover:text-white py-2 px-4 rounded-lg cursor-pointer">Edit Profile</button>
                                <button className="bg-white border-2 border-gray-300 text-gray-500 hover:bg-blue-500 hover:border-none transition-all duration-300 hover:text-white py-2 px-4 rounded-lg cursor-pointer">Change Password</button>
                            </div>
                        </div>

                        <div className="w-5xl justify-between items-start flex rounded-2xl border-1 border-gray-500 gap-4 p-6">
                            <h1 className="text-lg text-gray-500 font-bold">Personal Information</h1>
                        </div>

                            
                             
                             
                        </div>
                    </div>
                    <div className="h-full w-full justify-center items-center flex">
                        <div className="bg-white h-full w-2/3">

                        </div>
                    </div>
                </div>
                

            </div>
        </section>
    )
} 
export default Profile_Page;