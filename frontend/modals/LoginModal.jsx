import {useNavigate} from "react-router-dom";
import axios from 'axios'
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";
import LoadingScreen from '../loadings/loading'
import {toast} from 'react-toastify'
import NaicLibraryLogo from "../src/assets/NaicLibraryLogo.png"

const LoginModal = ({ onClose }) => {

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
    <section className="fixed inset-0 flex justify-center items-center z-100">

      <div
        className="absolute inset-0 bg-black/50 z-0"
      ></div>

      <div className="relative z-10 bg-white w-100 justify-center items-center flex flex-col rounded-2xl p-6">

        <div className="w-full justify-center items-center flex flex-col gap-1">
          <img src={NaicLibraryLogo} alt="" className="h-15 w-15 bg-gray-200 p-2 rounded-full"/>
          <h1 className="text-xl font-semibold">Login your Account</h1>
          <h1 className="mb-6 text-xs text-gray-500">Sign up now and discover engaging digital books.</h1>
        </div>
        

        <div className={`${isErrorContainer ? "" : "hidden"} bg-red-100 w-full h-12 p-2 justify-center items-center flex rounded-xl mb-4`}>
            <p className="text-red-500 text-xs">
              {Message}
            </p>
        </div>

        <div className={`w-full justify-center items-start flex flex-col mb-2`}>
          <h1 className="text-xs text-gray-500">Email</h1>
          <input type="text" placeholder="Your Email" className={`${isUsername ? "border-red-500" : "border-gray-300"} border p-2 text-xs w-full rounded-lg outline-none`}
          value={username} onChange={(e) => {setUsername(e.target.value)
                                             if(username){setIsUsername(false)}
          }}/>
        </div>

        <div className="w-full justify-center items-start flex flex-col">
          <h1 className="text-xs text-gray-500">Password</h1>
          <input type="password" placeholder="Your Password" className={`${isPassword ? "border-red-500" : "border-gray-300"} border p-2 text-xs w-full rounded-lg outline-none`}
          value={password} onChange={(e) => {setPassword(e.target.value)
                                             if(password){setIsPassword(false)}
          }}/>
        </div>

        <button 
        className={`p-2 w-full text-white text-sm rounded-full cursor-pointer outline-none hover:bg-blue-700 mt-6 ${isLoading ? 'bg-gray-500' : "bg-blue-600"}`} 
        onClick={() => confirmation()}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <button className="bg-white border border-gray-300 p-2 w-full text-gray-500 text-sm rounded-full cursor-pointer outline-none hover:bg-gray-100 mt-2" onClick={onClose}>Cancel</button>

      </div>
   </section>
  );
};

export default LoginModal;