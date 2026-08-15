import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";
import Confirmation_Popup from '../popup/Confirmation_Popup'
import { Check } from "lucide-react";

const Change_Password_Page = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user)

    const [isConfirmation, setIsConfirmation] = useState(false)
    const [isPasswordError, setIsPasswordError] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const [isNewPassword, setIsNewPassword] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/;

    const handleConfirmation = () => {
          if(newPassword === ""){setIsNewPassword(true); setIsPasswordError(true); return}
          if(!passwordRegex.test(newPassword)){
            setIsNewPassword(true);
            setIsConfirmPassword(true);
            setIsPasswordError(true);
            return
          }

          if(confirmPassword === ""){setIsConfirmPassword(true); return}
          if(confirmPassword !== newPassword){setIsConfirmPassword(true); return}
          setIsConfirmation(true);
    }

    const handleChangePassword = async () => {
          const passwordDetails = {
                id: user._id,
                role: user.role,
                newPassword: newPassword
          }
          try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/first-password`, passwordDetails);
            if(res.data.isSuccess){
                if(user.role?.toLowerCase() === "user"){
                    navigate("/library")
                } else if (user.role?.toLowerCase() === "administrator"){
                    navigate("/admin")
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
       <section className="bg-stone-50 h-screen w-full justify-center items-center flex">
        {isConfirmation && (<Confirmation_Popup onConfirm={handleChangePassword}
                                                onCancel={() => setIsConfirmation(false)}/>)}
        <div className="max-w-120 bg-white p-6 rounded-xl border border-stone-300">
            <h1 className="text-xl text-stone-800 font-semibold">New Password</h1>
            <h1 className="text-xs text-stone-400 font-semibold mb-4">User are able to change their password</h1>
            <div className="bg-yellow-200 w-full p-2 border border-yellow-500 rounded-xl space-y-2 mb-4">
                <p className="text-sm text-yellow-800 font-semibold">⚠️ Warning: Password Change Required</p>
                <p className="text-xs text-yellow-800">
                    For your security, you must change the default password before continuing.
                    Default passwords are easy to guess and can put your account at risk.
                </p>
            </div>
            
            <h1 className="text-sm text-stone-800 font-semibold mb-2">Name: </h1>
            <input type="password" 
                   placeholder="Enter new password"
                   className={`${isNewPassword ? "border-red-500" : "border-stone-300"} w-full bg-white border p-3 rounded-xl outline-none px-4 mb-4`}
                   value={newPassword}
                   onChange={(e) => {setNewPassword(e.target.value)
                                     if(newPassword){setIsNewPassword(false)}
                   }}
            />
            <input type="password" 
                   placeholder="Enter confirm password"
                   className={`${isConfirmPassword ? "border-red-500" : "border-stone-300"} w-full bg-white border p-3 rounded-xl outline-none px-4 mb-4`}
                   value={confirmPassword}
                   onChange={(e) => {setConfirmPassword(e.target.value)
                                     if(confirmPassword){setIsConfirmPassword(false)}
                   }}
            />
            {/* Error Message Container */}
            <div className={`bg-stone-200 w-full p-3 rounded-xl space-y-2 mb-4`}>
                <p className="text-sm text-stone-800 font-semibold">
                     Password Requirements
                </p>

                <div className="text-xs text-stone-700 list-disc pl-5 space-y-1">
                    <p className={`${newPassword.length >= 12 ? "text-green-500 font-bold" : ""} justify-start items-center flex gap-1`}><Check size={12}/>Minimum of 12 characters</p>
                    <p className={`${/[A-Z]/.test(newPassword) ? "text-green-500 font-bold" : ""} justify-start items-center flex gap-1`}><Check size={12}/>At least one uppercase letter (A–Z)</p>
                    <p className={`${/[0-9]/.test(newPassword) ? "text-green-500 font-bold" : ""} justify-start items-center flex gap-1`}><Check size={12}/>At least one number (0–9)</p>
                    <p className={`${/[!@#$%^&*]/.test(newPassword) ? "text-green-500 font-bold" : ""} justify-start items-center flex gap-1`}><Check size={12}/>At least one special character (@#$%!&*)</p>
                </div>
            </div>

            <button className="bg-stone-800 text-white text-sm font-semibold p-3 w-full rounded-xl cursor-pointer hover:bg-stone-900" onClick={handleConfirmation}>Proceed</button>
        </div>
             
       </section>
    )
}
export default Change_Password_Page;