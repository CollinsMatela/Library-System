import useAuthStore from "../store/useAuthStore"
const Admin_Header = ({mainText, subText}) => {

    const user = useAuthStore((state) => state.user)

    return(
        <>
        <header className="w-full justify-between items-start flex mb-10 border-0 lg:border-b border-stone-300 p-3 px-4 md:px-10">
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
                

                <div className="justify-center items-center flex gap-2">
                  <div className="h-8 w-8 rounded-full justify-center items-center flex bg-blue-600">
                    <h1 className="text-xs font-bold text-white">{user.firstname.slice(0,1).toUpperCase()}</h1>
                  </div>
                  <div className="hidden sm:block">
                     <h1 className="text-xs text-stone-700 font-semibold">{user.firstname} {user.lastname}</h1>
                     <h1 className="text-xs text-stone-500">{user.role.toUpperCase()}</h1>
                  </div>
                 
                </div>
            )}
          </div>
                            
        </header>
        </>
    )
}
export default Admin_Header