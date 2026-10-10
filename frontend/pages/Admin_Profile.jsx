import Admin_SideBar from "../components/Admin_Sidebar";
import Admin_Header from "../components/Admin_Header";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { User, Lock, Save } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../utils/cloudinary";
import useAuthStore from "../store/useAuthStore";

/* ------------------------------------------------------------------
   ProfileRow
   A single read-only information row.
   It simply shows a label on the left and its value on the right.
   If there is no value yet, it shows a small dash (—) instead.
------------------------------------------------------------------ */
const ProfileRow = ({ label, value }) => {
    return (
        <div className="justify-between items-center flex border-b border-stone-300 pb-2 gap-3">
            <p className="text-xs text-stone-800">{label}</p>
            <p className="text-xs font-medium text-stone-500 text-end wrapp-break-words">
                {value || "—"}
            </p>
        </div>
    );
};

const Admin_Profile = () => {
    // The admin's id comes from the page URL (for example: /admin/profile/123)
    let { id } = useParams();
    const navigate = useNavigate();
    const updateUser = useAuthStore((state) => state.updateUser)

    /* Ref */
    const avatarRef = useRef()

    /* --- Tab state ---
       isPersonal   = show the Personal Information tab
       isChangePass = show the Change Password tab */
    const [isPersonal, setIsPersonal] = useState(true);
    const [isChangePass, setIsChangePass] = useState(false);
    const [isAvatarChanged, setIsAvatarChanged] = useState(false)

    /* --- Profile state ---
       admin        = the profile information we fetched from the server
       isLoading    = true while we are still loading the data
       errorMessage = shown if the data fails to load */
    const [admin, setAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // When the user clicks the "Personal Information" tab
    const handlePersonalInfo = () => {
        setIsPersonal(true);
        setIsChangePass(false);
    }

    // When the user clicks the "Change Password" tab
    const handleChangePassTab = () => {
        setIsPersonal(false);
        setIsChangePass(true);
    }

    /* --- Fetch the profile information (read-only) --- */
    const FetchAdminProfile = async () => {
        try {
            setIsLoading(true);
            setErrorMessage('');

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin-profile/${id}`);
            setAdmin(res.data.admin);

        } catch (error) {
            setErrorMessage(error?.response?.data?.message || 'Unable to load the profile.');
        } finally {
            setIsLoading(false);
        }
    }

    // Load the profile once when the page opens (or when the id changes)
    useEffect(() => {
        FetchAdminProfile();
    }, [id]);
    
    const [avatarFile, setAvatarFile] = useState(null)
    const handleAvatar = (image) => {
          if(!image) return;
          setAvatarFile(image)
          let preview = URL.createObjectURL(image)
          setAdmin((current) => ({...current, avatar: preview}))
          setIsAvatarChanged(true)
    }
    const saveAvatar = async () => {
          let tempAvatar = avatarFile;
          
          if(!tempAvatar) {
            toast.warning('Temporary Avatar is not existing'); 
            return
          }
          setSaveLoading(true)
          try {
            const convertedAvatar = await uploadToCloudinary(tempAvatar)
            if(!convertedAvatar) {
                toast.warning('Failed to upload to cloudinary')
                return
            }
            const data = {
                avatar: convertedAvatar
            }
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-admin-avatar/${id}`, data)
            console.log(res.data.message)
            toast.success(res.data.message)
            updateUser(res.data.updatedAdmin) // zustand
            setAvatarFile(null)
            setIsAvatarChanged(false)
          } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Failed to change avatar')
          } finally {
            setSaveLoading(false)
          }
    }

    /* --- Render --- */
    return (
        <>  
        {
            <input
            type="file"
            className="hidden"
            ref={avatarRef}
            accept="image/*"
            onChange={(e) => handleAvatar(e.target.files[0] || null)}
            />
        }
            <Admin_SideBar />
            <section className="flex min-h-screen w-full flex-col items-start justify-start bg-white pb-10 md:pl-20 lg:pl-60">
                <Admin_Header mainText={"Your Profile"} subText={'View your personal information'} />

                <div className="w-full px-4 md:px-10">
                    <div className="w-full justify-center items-start flex flex-col">

                        {/* Page Header */}
                        <div className="flex items-center gap-2">
                            <div className="bg-stone-800 p-2 rounded-lg text-white flex items-center justify-center">
                                <User size={20} />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-stone-800">My Account</h1>
                                <p className="text-xs text-stone-400">
                                    View your personal information
                                </p>
                            </div>
                        </div>

                        <div className="w-full justify-center items-center flex flex-col mt-6 rounded-xl">

                            {/* Loading message */}
                            {isLoading && (
                                <p className="w-full text-xs text-stone-500">Loading profile...</p>
                            )}

                            {/* Error message */}
                            {!isLoading && errorMessage && !admin && (
                                <p className="w-full text-xs text-red-500">{errorMessage}</p>
                            )}

                            {!isLoading && admin && (

                                <div className="gap-4 justify-start items-start flex flex-col lg:flex-row w-full">

                                    {/* Left Tabs */}
                                    <div className="w-full lg:w-70 justify-start items-start flex flex-row lg:flex-col lg:border-r border-stone-500 lg:pr-4">
                                        <button
                                            className={`${isPersonal ? 'border-b-3 border-stone-800' : 'border-b border-stone-300'} w-full cursor-pointer p-2 justify-center lg:justify-start items-start flex`}
                                            onClick={() => handlePersonalInfo()}>
                                            <h1 className={`${isPersonal ? 'text-stone-800 font-bold' : 'text-stone-500'} text-xs text-center`}>
                                                Personal Information
                                            </h1>
                                        </button>
                                        <button
                                            className={`${isChangePass ? 'border-b-3 border-stone-800' : 'border-b border-stone-300'} w-full cursor-pointer p-2 justify-center lg:justify-start items-start flex`}
                                            onClick={() => handleChangePassTab()}>
                                            <h1 className={`${isChangePass ? 'text-stone-800 font-bold' : 'text-stone-500'} text-xs`}>
                                                Change Password
                                            </h1>
                                        </button>
                                    </div>

                                    {/* Personal Information (view-only) */}
                                    {isPersonal && (
                                        <div className="w-full border border-stone-200 rounded-lg p-4">

                                            {/* Header */}
                                            <div className="border-b border-stone-200 pb-3 mb-4">
                                                <h2 className="text-xs font-semibold text-stone-800">
                                                    Personal Information
                                                </h2>
                                                <p className="text-xs text-stone-500 mt-1">
                                                    Your personal details and basic information.
                                                </p>
                                            </div>

                                            {/* Information rows */}
                                            <div className="grid grid-cols-1 gap-2">

                                                {/* Avatar (display only) */}
                                                <div className="w-full">
                                                   <div className="justify-between items-center flex border-b border-stone-300 pb-2">
                                                    <p className="text-xs text-stone-800">Profile</p>
                                                    {admin.avatar ? (
                                                        <img
                                                            src={admin.avatar}
                                                            className="h-10 w-10 rounded-full border border-stone-300 object-cover cursor-pointer"
                                                            onClick={() => avatarRef.current.click()}
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full bg-stone-800 flex justify-center items-center cursor-pointer"
                                                        onClick={() => avatarRef.current.click()}>
                                                            <h1 className="text-md font-bold text-white">
                                                                {admin.firstname?.slice(0, 1) || "?"}
                                                            </h1>
                                                        </div>
                                                    )}
                                                    </div>

                                                    {isAvatarChanged && (
                                                        <div className="w-full justify-between items-center flex">
                                                            <h1 className="text-[10px] text-stone-500">The avatar is just temporary. Click save to change</h1>
                                                            <button className={`${saveLoading ? "bg-stone-200 text-stone-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"} text-xs justify-center items-center flex gap-1 p-2 rounded-lg mt-2 cursor-pointer transition`}
                                                            disabled={saveLoading}
                                                            onClick={saveAvatar}>
                                                                <Save size={15}/>
                                                                <h1>{saveLoading ? "...Saving" : "Save"}</h1>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                

                                                {/* Role */}
                                                <div className="justify-between items-center flex border-b border-stone-300 pb-2">
                                                    <p className="text-xs text-stone-800">Role</p>
                                                    <p className="text-xs font-medium text-stone-500 mt-1 uppercase">
                                                        {admin.role || "—"}
                                                    </p>
                                                </div>

                                                {/* Personal details */}
                                                <ProfileRow label="Last Name" value={admin.lastname} />
                                                <ProfileRow label="First Name" value={admin.firstname} />
                                                <ProfileRow label="Middle Name" value={admin.middlename} />
                                                <ProfileRow label="Extension Name" value={admin.suffix} />
                                                <ProfileRow label="Email" value={admin.email} />
                                                <ProfileRow label="Contact" value={admin.contact} />

                                            </div>

                                            {/* View-only note */}
                                            <div className="w-full justify-between items-center flex py-4 border-t border-stone-300">
                                                <h1 className="text-xs italic text-stone-400">
                                                    This page is view-only. Contact an administrator to request changes.
                                                </h1>
                                            </div>
                                        </div>
                                    )}

                                    {/* Change Password */}
                                    {isChangePass && (
                                        <div className="w-full bg-white border border-stone-200 rounded-xl p-5">

                                            {/* Header */}
                                            <div className="border-b border-stone-200 pb-3 mb-4">
                                                <h2 className="text-xs font-semibold text-stone-800">
                                                    Change Password
                                                </h2>
                                                <p className="text-xs text-stone-500 mt-1">
                                                    Update your password to keep your account secure.
                                                </p>
                                            </div>

                                            {/* Simple redirect card */}
                                            <div className="bg-stone-100 w-full p-3 rounded-xl space-y-2 mb-4">
                                                <p className="text-xs text-stone-800 font-semibold">
                                                    Password Security
                                                </p>
                                                <p className="text-xs text-stone-500">
                                                    Update your password on the dedicated Change Password page.
                                                </p>
                                            </div>

                                            <div className="w-full justify-between items-center flex py-4 border-t border-stone-300">
                                                <h1 className="text-xs italic text-stone-400">
                                                    Your password keeps your account safe.
                                                </h1>
                                                <button
                                                    className="text-xs bg-stone-800 p-2 rounded-lg text-white justify-center items-center flex gap-1 cursor-pointer hover:bg-stone-900 transition"
                                                    onClick={() => navigate("/admin-change-password")}>
                                                    <Lock size={15} />
                                                    Change Password
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Admin_Profile
