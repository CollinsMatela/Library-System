import {useNavigate} from "react-router-dom";
import axios from 'axios'
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";
import LoadingScreen from '../loadings/loading'
import {toast} from 'react-toastify'
import NaicLibraryLogo from "../src/assets/NaicLibraryLogo.png"
import { LoaderCircle } from "lucide-react" 

const LoginPage = () => {

  const setAuth = useAuthStore((state) => state.setAuth);

  const thisUser = useAuthStore((state) => state.user);
  const thisToken = useAuthStore((state) => state.token);
  const thisRole = useAuthStore((state) => state.role);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isErrorContainer, setIsErrorContainer] = useState(false);
  const [Message, setIsMessage ] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const confirmation = () => {
       if(username === "") {
          toast.warning('Enter login username');
          setIsUsername(true);
          return
       }
       if(password === "") {
          toast.warning('Enter login password');
          setIsPassword(true);
          return
       }

       loginAccount();
  }

  const loginAccount = async () => {
        setIsLoading(true);

        const account = {
          username: username,
          password: password
        }

        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, account);
          console.log(res.data.message);
          if(res.data.isSuccess){
            console.log(res.data.message);
            
            const user = res.data.user;
            const token = res.data.token;
            const role = res.data.role.toLowerCase();
            
            setAuth(user, token, role);
            
            if(user.isChangePassword === false){
              navigate(`/change-password`);
            }
            else {
              if(role.toLowerCase() === "user"){
              navigate(`/library`);
              } 
              else if (role.toLowerCase() === "admin"){
                navigate(`/admin`);
              }

            }

          toast.success(res.data.message);
          }
          
        } catch (error) {
          setIsMessage(error.response?.data?.message || "Login failed. Please try again.");
          toast.warning(error?.response?.data?.message);
          setIsErrorContainer(true);
        } finally {
          setIsLoading(false);
        }
  }

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center bg-stone-50">
     


        <div className="w-80 justify-center items-center flex flex-col mb-4 gap-1">
          <div className="justify-center items-center flex gap-2 w-full">
              <img src={NaicLibraryLogo} alt="" className="h-8 w-8 rounded-full"/>
              <h1 className="text-lg font-extrabold text-stone-900">Naic Municipal Library</h1>
          </div>
          <h1 className="text-sm font-medium text-center text-stone-500">Welcome back enter your account and explore the library.</h1>
        </div>
        

        <div className={`${isErrorContainer ? "" : "hidden"} bg-red-100 w-80 p-3 justify-center items-center flex rounded-xl mb-4`}>
            <p className="text-red-500 text-xs">
              {Message}
            </p>
        </div>

        <div className={`w-80 justify-center items-start flex flex-col mb-2 gap-1`}>
          <h1 className="text-sm text-stone-500 font-semibold">Email</h1>
          <input type="text" className={`${isUsername ? "border-red-500" : "border-stone-300"} bg-white border p-3 text-xs w-full rounded-xl outline-none`}
          value={username} onChange={(e) => {setUsername(e.target.value)
                                             if(username){setIsUsername(false)}
          }}/>
        </div>

        <div className="w-80 justify-center items-start flex flex-col gap-1">
          <h1 className="text-sm text-stone-500 font-semibold">Password</h1>
          <input type="password" className={`${isPassword ? "border-red-500" : "border-stone-300"} bg-white border p-3 text-xs w-full rounded-xl outline-none`}
          value={password} onChange={(e) => {setPassword(e.target.value)
                                             if(password){setIsPassword(false)}
          }}/>
        </div>

        <button
        disabled={isLoading}
        className={`p-3 w-80 text-sm rounded-xl justify-center items-center flex cursor-pointer outline-none mt-4 ${isLoading ? 'bg-stone-200 text-stone-500 cursor-not-allowed' : "bg-stone-800 hover:bg-stone-900 text-white"}`} 
        onClick={() => confirmation()}>
          <h1 className="font-semibold">
            {isLoading ? <LoaderCircle size={20} className="text-stone-500 animate-spin"/> : `Sign In`}
          </h1>
          
        </button>
        <button className="bg-white border border-stone-300 p-3 w-80 text-stone-500 text-sm rounded-xl mt-4 cursor-pointer outline-none hover:bg-stone-100" onClick={() => navigate(-1)}>
          <h1>Cancel</h1>
        </button>

      
   </section>
  );
};

export default LoginPage;