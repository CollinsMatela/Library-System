import { useState } from "react"
import useAuthStore from "../store/useAuthStore"
import Confirmation_Popup from "../popup/Confirmation_Popup"
const Admin_Header = ({mainText, subText}) => {

    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const [isProfile, setIsProfile] = useState(false)
    const [isLogoutConfirmation, setIsLogoutConfirmation] = useState(false)

    const HandleLogout = () => {
         logout()
         localStorage.removeItem("token");
    }
    return(
        <>
        {isLogoutConfirmation && (
          <Confirmation_Popup
          message={"Are you sure to logout?"}
          onConfirm={HandleLogout}
          onCancel={() => setIsLogoutConfirmation(false)}
          />
        )}
        <header className="w-full bg-white justify-between items-start flex mb-10 border-0 lg:border-b border-stone-300 p-3 px-4 md:px-10">
          <div>
            <h1 className="text-sm font-bold text-stone-800">{mainText}</h1>
            <h1 className="text-stone-400 text-xs">{subText}</h1> 
          </div>

          <div>
            {user.avatar ?
            (
                <div className="justify-center items-center flex gap-2">
                   <div className="h-8 w-8 rounded-full bg-white">
                    <img src={user.avatar} className="object-cover" />
                  </div>
                  <div className="hidden sm:block">
                     <h1 className="text-xs text-stone-700 font-bold">{user.firstname} {user.lastname}</h1>
                     <h1 className="text-xs text-stone-500 font-bold">{user.role.toUpperCase()}</h1>
                  </div>
                 
                </div>
                
            )
            :
            (
                

                <div className="relative cursor-pointer" onClick={() => setIsProfile(prev => !prev)}>
                  <div className="justify-center items-center flex gap-1">
                    <div className={`h-8 w-8 rounded-full justify-center items-center flex border-2 border-stone-300 cursor-pointer ${!user ? "bg-blue-600" : "bg-emerald-500"}`}>
                    <h1 className="text-xs font-bold text-white">{user?.firstname?.slice(0,1).toUpperCase() || "AD"}</h1>
                    </div>
                    <div className="hidden sm:block">
                      <h1 className="text-xs text-stone-700 font-semibold">{user.firstname} {user.lastname}</h1>
                      <h1 className="text-xs text-stone-500">{user?.role?.toUpperCase() || "Admin"}</h1>
                    </div>
                  </div>
                  {isProfile && (
                    <div className="absolute w-50 right-0 bg-white flex flex-col justify-start items-start border border-stone-300 rounded-lg gap-1 p-2">
                       <button className="w-full text-xs text-stone-500 p-1 text-start hover:bg-red-100 hover:text-red-500 hover:border-red-500 transition border-b border-stone-300 cursor-pointer"
                       onClick={() => setIsLogoutConfirmation(true)}>Logout</button>
                    </div>
                  )}

                 
                </div>
            )}
          </div>
                            
        </header>
        </>
    )
}
export default Admin_Header