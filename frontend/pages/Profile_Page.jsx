import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
const Profile_Page = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    return(
        <section className="bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 min-h-screen w-full justify-center items-start flex py-10">
            <div className="w-5xl h-screen">
                <nav className="border-b-1 border-gray-300 h-20 w-full justify-between items-center flex">
                    <h1 className="text-lg text-gray-800 font-bold">Your Profile</h1>
                    <h1 className="text-base text-blue-500 font-bold cursor-pointer" onClick={() => navigate(-1)}>⟵ Back</h1>
                </nav>
                
                <div className="w-full flex flex-col">
                    <div className="w-full justify-center items-center flex">
                        <div className="w-full justify-between items-center flex mt-6">

                            <div className="bg-white w-full justify-start items-start flex rounded-2xl shadow-lg gap-4 p-6">
                            <img src={user?.avatar || "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"} className="h-30 w-30 object-cover rounded-xl border-1 border-gray-300"/>
                             <div className="h-full max-w-100 justify-start items-start flex flex-col gap-1">
                                <h1 className="text-2xl text-gray-800 font-bold mt-4">{user?.firstname} {user?.lastname}</h1>
                                <h1 className="text-base text-gray-500 font-bold">{user?.username}</h1>
                             </div>
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