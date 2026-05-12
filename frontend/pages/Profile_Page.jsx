import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
const Profile_Page = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    return(
        <section className="bg-white h-screen w-full justify-center items-center flex py-10">
            <div className="w-5xl h-full">
                <nav className="h-20 w-full justify-between items-center flex">
                    <h1 className="text-lg text-gray-800 font-semibold">Your Profile</h1>
                    <h1 className="text-base text-blue-500 font-bold cursor-pointer" onClick={() => navigate(-1)}>⟵ Back</h1>
                </nav>

            </div>
        </section>
    )
} 
export default Profile_Page;