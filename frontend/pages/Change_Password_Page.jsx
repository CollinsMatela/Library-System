import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";
import Confirmation_Popup from '../popup/Confirmation_Popup'

const Change_Password_Page = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user)

    const [isConfirmation, setIsConfirmation] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const [isNewPassword, setIsNewPassword] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    const handleConfirmation = () => {
          if(newPassword === ""){setIsNewPassword(true); setIsPasswordError(true); return}
          if(newPassword.length < 12){setIsNewPassword(true); setIsPasswordError(true); return}

          if(confirmPassword === ""){setIsConfirmPassword(true); return}
          if(confirmPassword !== newPassword){setIsConfirmPassword(true); return}
          setIsConfirmation(true);
    }

    const handleChangePassword = async () => {
          const passwordDetails = {
                id: user.id,
                role: user.role,
                newPassword: newPassword
          }
          try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/change-password`, passwordDetails);
            if(res.data.isSuccess){
                if(user.role?.toLowerCase() === "student" || user.role?.toLowerCase() === "teacher"){
                    navigate("/library")
                } else if (user.role?.toLowerCase() === "administrator"){
                    navigate("/admin-page")
                } else {
                    console.log(res.data.message)
                }
            }
            console.log(res.data.message)
          } catch (error) {
            console.log(error)
          }
    }

    return(
       <section className="bg-gradient-to-tr from-gray-100 to-gray-300 h-screen w-full justify-center items-center flex">
        {isConfirmation && (<Confirmation_Popup onConfirm={handleChangePassword}
                                                onCancel={() => setIsConfirmation(false)}/>)}
        <div className="max-w-120 bg-white p-4 rounded-xl">
            <h1 className="text-xl text-gray-800 font-semibold">Change Password</h1>
            <h1 className="text-xs text-gray-400 font-semibold mb-4">User are able to change their password</h1>
            <div className="bg-yellow-200 w-full p-2 border border-yellow-500 rounded-xl space-y-2 mb-4">
                <p className="text-sm text-yellow-800 font-semibold">⚠️ Warning: Password Change Required</p>
                <p className="text-xs text-yellow-800">
                    For your security, you must change the default password before continuing.
                    Default passwords are easy to guess and can put your account at risk.
                </p>
            </div>
            
            <h1 className="text-sm text-gray-800 font-semibold mb-2">Name: </h1>
            <input type="password" 
                   placeholder="Enter new password"
                   className={`${isNewPassword ? "bg-red-200" : null} w-full bg-gray-200 h-12 rounded-md outline-none px-4 mb-4`}
                   value={newPassword}
                   onChange={(e) => {setNewPassword(e.target.value)
                                     if(newPassword){setIsNewPassword(false)}
                   }}
            />
            <input type="password" 
                   placeholder="Enter confirm password"
                   className={`${isConfirmPassword ? "bg-red-200" : null} w-full bg-gray-200 h-12 rounded-md outline-none px-4 mb-4`}
                   value={confirmPassword}
                   onChange={(e) => {setConfirmPassword(e.target.value)
                                     if(confirmPassword){setIsConfirmPassword(false)}
                   }}
            />
            {/* Error Message Container */}
            <div className={`${isPasswordError ? "" : "hidden"} bg-gray-200 w-full p-2 rounded-xl space-y-2 mb-4`}>
                <p className="text-sm text-gray-800 font-semibold">❗ Password Requirements</p>
                <ul className="text-xs text-gray-800 list-disc pl-5">
                <li>Minimum of 12 characters (modern security standard)</li>
                <li>All types of characters are allowed (e.g. a–z, 0–9 or @#*...)</li>
                <li>Passwords must match</li>
                </ul>
            </div>
            <button className="bg-blue-600 text-white font-semibold h-12 w-full rounded-md cursor-pointer hover:bg-blue-700" onClick={handleConfirmation}>Save</button>
        </div>
             
       </section>
    )
}
export default Change_Password_Page;