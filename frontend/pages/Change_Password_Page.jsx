import useAuthStore from "../store/useAuthStore";
const Change_Password_Page = () => {
    const user = useAuthStore((state) => state.user)

    return(
       <section className="bg-gradient-to-tr from-gray-100 to-gray-300 h-screen w-full justify-center items-center flex">
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
                   className="w-full bg-gray-200 h-12 rounded-md outline-none px-4 mb-4"
            />
            <input type="password" 
                   placeholder="Enter confirm password"
                   className="w-full bg-gray-200 h-12 rounded-md outline-none px-4 mb-4"
            />
            <button className="bg-blue-600 text-white font-semibold h-12 w-full rounded-md cursor-pointer hover:bg-blue-700">Save</button>
        </div>
             
       </section>
    )
}
export default Change_Password_Page;