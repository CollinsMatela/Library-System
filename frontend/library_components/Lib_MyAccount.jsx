import Lib_Navigation from "./Lib_Navigation";
import Footer from "../components/Footer";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useRef } from "react";
import { ArrowUp, Check, Trash } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";


const Lib_MyAccount = () => {
    const user = useAuthStore((state) => state.user)
      const [isPersonal, setIsPersonal] = useState(true);
      const [isChangePass, setIsChangePass] = useState(false);
      const [errorMessage, setErrorMessage] = useState('');

      const [profile, setProfile] = useState(null);
      const [previewProfile, setPreviewProfile] = useState('');
      const profileRef = useRef(null);

      const ChangeProfile = (e) => {
            const file = e.target.files[0];

            if(!file){
                toast.warning('No Profile Picture Added.')
                return;
            }

            if(previewProfile){
                URL.revokeObjectURL(previewProfile)
            }
            setProfile(file);
            setPreviewProfile(URL.createObjectURL(file));
      }
      const removePreviewProfile = () => {
           setProfile(null);
           setPreviewProfile('');
      }

      const SaveProfile = async () => {
            try {
                if(!profile){
                    toast.warning('Please Select a Profile Picture.')
                    return;
                }

                const newProfile = await uploadToCloudinary(profile)

                const data = {
                    UserId: user._id,
                    Avatar: newProfile
                }

                const res = await axios.patch(`${import.meta.env.VITE_API_URL}/update-user-avatar`, data)
                toast.success(res.data.message);
                setProfile(null);
                setPreviewProfile('');

            } catch (error) {
                setErrorMessage(error?.response?.data?.message);
                toast.error(error?.response?.data?.message);
            }
      }

      const uploadToCloudinary = async (file, resourceType = "image") => {
            if (!file) return "";

            const formData = new FormData();

            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
                formData
            );

            return response.data.secure_url;
        };

      return(
        <>

                <Lib_Navigation/>
                <section className="min-h-screen w-full justify-start items-center flex flex-col bg-stone-50 pb-10">
        
                    <header className="w-5xl mt-20">
                            <h1 className="text-xl font-bold">My Account</h1>
                            <p className="mt-2 text-gray-600 text-xs">
                                Browse educational resources, fiction, and non-fiction books available in the library.
                            </p>
                    </header>
        
                    <div className="w-5xl justify-center items-center flex flex-col mt-6 rounded-xl">                   
                            
                                <div className='gap-4 justify-start items-start flex w-full'>
                                    <div className='w-80 justify-start items-start flex flex-col gap-2 border-r border-ston-300 pr-4'>
                                         <button className={`${isPersonal ? 'bg-black' : 'border-b border-stone-300'} w-full cursor-pointer rounded-xl p-2 justify-start items-start flex`}>
                                            <h1 className={`${isPersonal ? 'text-white' : 'text-stone-500'} text-xs`}>Personal Information</h1>
                                         </button>
                                         <button className={`${isChangePass ? 'bg-black' : 'border-b border-stone-300'} w-full cursor-pointer rounded-xl p-2 justify-start items-start flex`}>
                                            <h1 className={`${isChangePass ? 'text-white' : 'text-stone-500'} text-xs`}>Change Password</h1>
                                         </button>
                                    </div>
        
                                    {isPersonal && (
                                    <div className="w-full bg-white border border-stone-200 rounded-xl p-5">
                                        
                                        {/* Header */}
                                        <div className="border-b border-stone-200 pb-3 mb-4">
                                        <h2 className="text-sm font-semibold text-stone-800">
                                            Personal Information
                                        </h2>
                                        <p className="text-xs text-stone-500 mt-1">
                                            Your personal details and basic information.
                                        </p>
                                        </div>

                                        {/* Information */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        
                                        {/* Avatar */}
                                        <div>
                                            <p className="text-xs text-stone-500">Profile</p>
                                            {previewProfile ? 
                                            (
                                                <div className="justify-between items-center flex gap-1">
                        
                                                <img src={previewProfile} className="h-10 w-10 rounded-full hover:border-2 transition border-stone-300 cursor-pointer" title="Change Profile"/>
                                                <div className="w-fit justify-center items-center flex gap-1">
                                                    <button className="justify-start items-center flex gap-1 h-fit w-fit p-2 text-white bg-green-600 rounded-lg cursor-pointer hover:bg-green-700 hover:-translate-y-0.5 transition" onClick={() => SaveProfile()}>
                                                        <Check size={15}/>
                                                        <h1 className="text-xs">Save</h1>
                                                    </button>
                                                    <button className="justify-start items-center flex gap-1 h-fit w-fit p-2 text-red-500 bg-white rounded-lg cursor-pointer hover:-translate-y-0.5 transition" title="Remove Prview Profile" onClick={removePreviewProfile}>
                                                        <Trash size={15}/>
                                                    </button>
                                                </div>
                                                </div>
                                            )
                                            :
                                            (
                                                <img src={user?.avatar} className="h-10 w-10 rounded-full hover:border-2 transition border-stone-300 cursor-pointer" title="Change Profile"/>
                                            )
                                            ?
                                            (
                                                <div className="h-10 w-10 rounded-full justify-center items-center flex bg-blue-500 cursor-pointer transition hover:border-2 border-stone-300"
                                                onClick={() => profileRef.current.click()}
                                                title="Change Profile">
                                                    <h1 className="text-md font-bold text-white">{user.firstname.slice(0, 1)}</h1>
                                                    <input 
                                                    className="hidden"
                                                    ref={profileRef}
                                                    type="file"
                                                    accept="image/**"
                                                    onChange={ChangeProfile} />
                                                </div>
                                            ) 
                                            :
                                            (null)
                                            }
                                        </div>

                                        {/* Last Name */}
                                        <div>
                                            <p className="text-xs text-stone-500">Last Name</p>
                                            <p className="text-sm font-medium text-stone-800 mt-1">
                                            {user.lastname}
                                            </p>
                                        </div>

                                        {/* First Name */}
                                        <div>
                                            <p className="text-xs text-stone-500">First Name</p>
                                            <p className="text-sm font-medium text-stone-800 mt-1">
                                            {user.firstname}
                                            </p>
                                        </div>

                                        {/* Middle Name */}
                                        <div>
                                            <p className="text-xs text-stone-500">Middle Name</p>
                                            <p className="text-sm font-medium text-stone-800 mt-1">
                                            {user.middlename}
                                            </p>
                                        </div>

                                        {/* Extension Name */}
                                        <div>
                                            <p className="text-xs text-stone-500">Extension Name</p>
                                            <p className="text-sm font-medium text-stone-800 mt-1">
                                            {user.extensionname || "—"}
                                            </p>
                                        </div>

                                        {/* Date of Birth */}
                                        <div>
                                            <p className="text-xs text-stone-500">Date of Birth</p>
                                            <p className="text-sm font-medium text-stone-800 mt-1">
                                            {user.month} {user.day}, {user.year}
                                            </p>
                                        </div>

                                        {/* Age */}
                                        <div>
                                            <p className="text-xs text-stone-500">Age</p>
                                            <p className="text-sm font-medium text-stone-800 mt-1">
                                            {user.age}
                                            </p>
                                        </div>

                                        {/* Sex */}
                                        <div>
                                            <p className="text-xs text-stone-500">Sex</p>
                                            <p className="text-sm font-medium text-stone-800 mt-1">
                                            {user.sex}
                                            </p>
                                        </div>

                                        </div>
                                    </div>
                                    )}
                            
                                </div>
                     </div>
                    
                </section>
                <Footer/>
                 </>
      )
}
export default Lib_MyAccount;