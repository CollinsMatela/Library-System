import {useNavigate} from "react-router-dom";
import axios from 'axios'
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";

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

  const loginAccount = async () => {

        if(username === ""){setIsUsername(true); return}
        if(password === ""){setIsPassword(true); return}

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
            const role = res.data.role;
            
            setAuth(user, token, role);
            
            if(user.isChangePassword === false){
              navigate(`/change-password`);
            }
            else {
              if(role.toLowerCase() === "student"){
              navigate(`/library`);
              } 
              else if (role.toLowerCase() === "administrator"){
                navigate(`/admin`);
              }

            }

            
          }
        } catch (error) {
          setIsMessage(
            error.response?.data?.message || "Login failed. Please try again."
          );
          setIsErrorContainer(true);
        }
  }

  return (
    <section className="fixed inset-0 flex justify-center items-center z-50">

      <div
        className="absolute inset-0 bg-white/50 z-0"
        onClick={onClose}
      ></div>

      <div className="relative z-10 bg-white w-[400px] justify-center items-center flex flex-col rounded-xl p-6">
        <h1 className="text-xl font-semibold">Join the Learning Adventure!</h1>
        <h1 className="mb-6 text-xs text-gray-500 mb-6">Sign up now and discover fun stories, games, and activities.</h1>

        <div className={`${isErrorContainer ? "" : "hidden"} bg-red-100 w-full h-12 p-2 justify-center items-center flex rounded-xl mb-4`}>
            <p className="text-red-500 text-xs">
              {Message}
            </p>
        </div>

        <div className={`w-full justify-center items-start flex flex-col mb-2`}>
          <h1 className="text-xs text-gray-500">Username</h1>
          <input type="text" placeholder="Your Username" className={`${isUsername ? "bg-red-100" : "bg-gray-100"} h-12 w-full rounded-xl p-2 outline-none`}
          value={username} onChange={(e) => {setUsername(e.target.value)
                                             if(username){setIsUsername(false)}
          }}/>
        </div>

        <div className="w-full justify-center items-start flex flex-col">
          <h1 className="text-xs text-gray-500">Password</h1>
          <input type="password" placeholder="Your Password" className={`${isPassword ? "bg-red-100" : "bg-gray-100"} h-12 w-full rounded-xl p-2 outline-none`}
          value={password} onChange={(e) => {setPassword(e.target.value)
                                             if(password){setIsPassword(false)}
          }}/>
        </div>

        <button className="bg-pink-500 h-12 w-full text-white font-semibold rounded-xl cursor-pointer outline-none hover:bg-pink-600 mt-6" onClick={loginAccount}>Sign Up</button>

      </div>
   </section>
  );
};

export default LoginModal;