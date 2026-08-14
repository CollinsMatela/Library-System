import Lib_Navigation from "./Lib_Navigation";
import Footer from "../components/Footer";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useRef } from "react";
import { ArrowUp, Check, Trash } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";


const Lib_MyAccount = () => {
      const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

      const user = useAuthStore((state) => state.user)
      const updateUser = useAuthStore((state) => state.updateUser)

      const [isPersonal, setIsPersonal] = useState(true);
      const [isChangePass, setIsChangePass] = useState(false);
      const [errorMessage, setErrorMessage] = useState('');

      const [currentPassword, setCurrentPassword] = useState('');
      const [newPassword, setNewPassword] = useState('');

      const [profile, setProfile] = useState(null);
      const [previewProfile, setPreviewProfile] = useState('');
      const profileRef = useRef(null);

      const handlePersonalInfo = () => {
            setIsPersonal(true);
            setIsChangePass(false);
      }
      const handleChangePass = () => {
            setIsPersonal(false);
            setIsChangePass(true);
      }

      const handleChangePassword = async () => {

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/;

            if(!passwordRegex.test(newPassword)){
                toast.warning('New Password did not match the requirements.');
                return;
            }
        
            const data = {
                id: user._id,
                currentPassword: currentPassword,
                newPassword: newPassword
            }
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/change-password`, data)
                toast.success(res.data.message);
                setCurrentPassword('');
                setNewPassword('');

            } catch (error) {
                toast.error(error?.response?.data?.message);
                setErrorMessage(error?.response?.data?.message);
            }
      }

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

                if(newProfile){
                    toast.info('Processing the image.')
                }
                const data = {
                    userId: user._id,
                    newProfile: newProfile
                }
                
                const res = await axios.patch(`${import.meta.env.VITE_API_URL}/update-user-avatar`, data)
                toast.success(res.data.message);
                console.log("Response:", res.data);
                console.log("Updated User:", res.data.updatedUser);
                updateUser(res.data.updatedUser) // Zustand
                console.log("after updateUser");
                setProfile(null);
                setPreviewProfile('');
                

            } catch (error) {
                setErrorMessage(error?.response?.data?.message);
                toast.error(error?.response?.data?.message);
            }
      }

      const uploadToCloudinary = async (file, resourceType = "image") => {
            if (!file) {
                toast.warning('The image file is empty');
                return
            };

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
                                    <div className='w-80 justify-start items-start flex flex-col gap-2 border-r border-stone-500 pr-4'>
                                         <button className={`${isPersonal ? 'bg-black' : 'border-b border-stone-300'} w-full cursor-pointer p-2 justify-start items-start flex`} onClick={() => handlePersonalInfo()}>
                                            <h1 className={`${isPersonal ? 'text-white' : 'text-stone-500'} text-xs`}>Personal Information</h1>
                                         </button>
                                         <button className={`${isChangePass ? 'bg-black' : 'border-b border-stone-300'} w-full cursor-pointer p-2 justify-start items-start flex`} onClick={() => handleChangePass()}>
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
                                            : user?.avatar ?
                                            (
                                                <div className="h-10 w-10 rounded-full justify-center items-center flex bg-blue-500 cursor-pointer transition hover:border-2 border-stone-300"
                                                onClick={() => profileRef.current.click()}
                                                title="Change Profile">
                                                    <img src={user?.avatar} className="h-10 w-10 rounded-full hover:border-2 transition border-stone-300 cursor-pointer" title="Change Profile"/>
                                                    <input 
                                                    className="hidden"
                                                    ref={profileRef}
                                                    type="file"
                                                    accept="image/**"
                                                    onChange={ChangeProfile} />
                                                </div>
                                            )
                                            :
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

                                    {isChangePass && (
                                    <div className="w-full bg-white border border-stone-200 rounded-xl p-5">
                                        
                                        {/* Header */}
                                        <div className="border-b border-stone-200 pb-3 mb-4">
                                        <h2 className="text-sm font-semibold text-stone-800">
                                            Change Password
                                        </h2>
                                        <p className="text-xs text-stone-500 mt-1">
                                           Update your password to keep your account secure.
                                        </p>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 mb-4">
                                            <div className="w-full">
                                                <h1 className="text-xs text-stone-400">Current Password</h1>
                                                <input type="password" placeholder="Enter current password" className="p-2  w-full text-xs text-stone-800 outline-none border border-stone-300 rounded-xl"
                                                 onChange={(e) => setCurrentPassword(e.target.value)}
                                                 value={currentPassword}/>
                                            </div>
                                            <div className="w-full">
                                                <h1 className="text-xs text-stone-400">New Password</h1>
                                                <input type="password" placeholder="Enter new password" className="p-2 w-full text-xs text-stone-800 outline-none border border-stone-300 rounded-xl"
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                value={newPassword}/>
                                            </div>
                                        </div>

                                        <div className={` bg-stone-100 w-full p-3 rounded-xl space-y-2 mb-4`}>
                                            <p className="text-sm text-stone-800 font-semibold">
                                                 Password Requirements
                                            </p>

                                            <div className="text-xs text-stone-700 list-disc pl-5 space-y-1">
                                                <p className={`${newPassword.length >= 12 ? 'text-green-500 font-semibold' : ''} flex gap-1`}> <Check size={15}/>Minimum of 12 characters</p>
                                                <p className={`${/[A-Z]/.test(newPassword) ? 'text-green-500 font-semibold' : ''} flex gap-1`}><Check size={15}/>At least one uppercase letter (A–Z)</p>
                                                <p className={`${/[0-9]/.test(newPassword) ? 'text-green-500 font-semibold' : ''} flex gap-1`}><Check size={15}/>At least one number (0–9)</p>
                                                <p className={`${/[!@#$%^&*]/.test(newPassword) ? 'text-green-500 font-semibold' : ''} flex gap-1`}><Check size={15}/>At least one special character (@#$%!&*)</p>
                                            </div>
                                        </div>

                                        <div className="w-full justify-between items-center flex py-4 border-t border-stone-300">
                                            <h1 className="text-xs italic text-stone-400">Do not forget your new password.</h1>
                                            <button className="text-xs bg-black p-2 text-white justify-center items-center flex gap-1 cursor-pointer hover:bg-stone-800"
                                            onClick={() => handleChangePassword()}><Check size={15}/>Save</button>
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