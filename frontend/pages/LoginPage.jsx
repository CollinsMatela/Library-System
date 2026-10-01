import {useNavigate} from "react-router-dom";
import axios from 'axios'
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";
import {toast} from 'react-toastify'
import NaicLibraryLogo from "../src/assets/NaicLibraryLogo.png"
import { LoaderCircle, Eye, EyeOff, LogIn } from "lucide-react"

const LoginPage = () => {

  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isErrorContainer, setIsErrorContainer] = useState(false);
  const [Message, setIsMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const confirmation = () => {
       if(email === "") {
          toast.warning('Enter login email');
          setIsEmail(true);
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
          email: email,
          password: password
        }

        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, account);
          if(res.data.isSuccess){
            const user = res.data.user;
            const token = res.data.token;
            const role = res.data.role.toLowerCase();

            setAuth(user, token, role);

            if(user.isChangePassword === false){
              navigate(`/change-password`);
            }
            else {
              if (["student", "teacher", "guest"].includes(role)) {
                  navigate("/library");
              }
              else if (role === "admin") {
                  navigate("/admin");
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

  const inputClass = (hasError) =>
    `border ${hasError ? "border-red-400 bg-red-50/50" : "border-stone-200"} bg-white p-3.5 text-sm w-full outline-none rounded-xl transition-all duration-200 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 hover:border-stone-300`;

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-stone-50 via-white to-stone-100">

        <div className="w-80 sm:w-96 bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200/60 shadow-xl shadow-stone-200/40 p-8">

          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="h-14 w-14 rounded-2xl bg-transparent flex items-center justify-center">
              <img src={NaicLibraryLogo} alt="" className="h-10 w-10 rounded-xl"/>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-extrabold text-stone-900 tracking-tight">Naic Municipal Library</h1>
              <p className="text-sm text-stone-400 mt-1">Welcome back! Sign in to explore the library.</p>
            </div>
          </div>

          {/* Error Banner */}
          {isErrorContainer && (
            <div className="bg-red-50 border border-red-200 w-full p-3 rounded-xl mb-5">
              <p className="text-red-500 text-xs text-center">{Message}</p>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-stone-500 mb-1.5 block">Email</label>
            <input type="text" placeholder="Enter your email" className={inputClass(isEmail)}
              value={email} onChange={(e) => {setEmail(e.target.value); if(e.target.value){setIsEmail(false)}}} />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-stone-500 mb-1.5 block">Password</label>
            <div className="relative w-full">
              <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                className={`${inputClass(isPassword)} pr-10`}
                value={password} onChange={(e) => {setPassword(e.target.value); if(e.target.value){setIsPassword(false)}}} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Sign In */}
          <button disabled={isLoading}
            className={`w-full p-3.5 text-sm rounded-xl justify-center items-center flex cursor-pointer outline-none font-semibold transition-all duration-200 ${isLoading ? "bg-stone-200 text-stone-400 cursor-not-allowed" : "bg-stone-800 hover:bg-stone-900 text-white hover:shadow-lg hover:shadow-stone-300 hover:-translate-y-0.5"}`}
            onClick={() => confirmation()}>
            {isLoading ? <LoaderCircle size={20} className="animate-spin"/> : <><LogIn size={16} className="mr-2"/> Sign In</>}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-stone-200"></div>
            <span className="text-xs text-stone-400 font-medium">or</span>
            <div className="flex-1 h-px bg-stone-200"></div>
          </div>

          {/* Register */}
          <button className="w-full p-3.5 text-sm rounded-xl justify-center items-center flex cursor-pointer outline-none font-semibold bg-white hover:bg-stone-200 text-stone-600 border border-stone-200 transition-all duration-200 hover:-translate-y-0.5"
            onClick={() => navigate("/registration")}>
            No Account? Register
          </button>

          <button className="w-full p-3.5 text-sm rounded-xl justify-center items-center flex cursor-pointer outline-none font-semibold bg-white hover:bg-stone-200 mt-3.5 transition-all duration-200 hover:-translate-y-0.5"
            onClick={() => navigate(-1)}>
            <h1 className="text-sm font-semibold text-stone-600">Cancel</h1>
          </button>
          {/* Cancel */}
          
        </div>

        

    </section>
  );
};

export default LoginPage;
