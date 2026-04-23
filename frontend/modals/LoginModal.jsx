import {useNavigate} from "react-router-dom";
import axios from 'axios'
import { useState } from "react";

const LoginModal = ({ onClose }) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const ErrorChecker = () =>{
        let hasError = false;

        if(username === "") {
          setIsUsername(true)
          return hasError = true;       
        } else {
          setIsUsername(false);
        }
        if(password === "") {
          setIsPassword(true)
          return hasError = true;       
        } else {
          setIsPassword(false);
        }
        return hasError;
  }

  const loginAccount = async () => {
        let itHasError = ErrorChecker();
        if(itHasError) return;

        const account = {
          username: username,
          password: password
        }

        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, account);
          console.log(res.data.error);
        } catch (error) {
          console.log(error)
        }
  }

  return (
    <section className="fixed inset-0 flex justify-center items-center z-50">

      <div
        className="absolute inset-0 bg-black/50 z-0"
        onClick={onClose}
      ></div>

      <div className="relative z-10 bg-white w-[400px] justify-center items-center flex flex-col rounded-xl p-6">
        <h1 className="text-2xl">Login your Account</h1>
        <h1 className="mb-6 text-xs">Welcome Students! please sign-up your account.</h1>

        <div className="w-full mb-2">
          <h1 className="text-xs">Username</h1>
          <input type="text" placeholder="Your Username" className="bg-gray-100 h-12 w-full rounded-xl p-2"/>
        </div>

        <div className="w-full">
          <h1 className="text-xs">Password</h1>
          <input type="password" placeholder="Your Password" className="bg-gray-100 h-12 w-full rounded-xl p-2"/>
        </div>

        <button className="bg-black h-12 w-full text-white rounded-xl cursor-pointer mt-6" onClick={() => loginAccount}>Sign Up</button>

      </div>
   </section>
  );
};

export default LoginModal;