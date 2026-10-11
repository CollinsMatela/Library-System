import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import NaicLibraryLogo from "../src/assets/NaicLibraryLogo.png";
import NaicImage2 from "../src/assets/NaicImage2.png";
import { LoaderCircle, Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  let savedAccountDetails = {}
  
  try {
   savedAccountDetails = JSON.parse(localStorage.getItem('accountDetails') || "{}")
  } catch (error) {
    localStorage.removeItem('accountDetails')
  }
  
// Form values
  const [email, setEmail] = useState(savedAccountDetails.email || "");
  const [password, setPassword] = useState("");
  // Saved Info
  useEffect(() => {
     localStorage.setItem('accountDetails', JSON.stringify({email: email}))
  }, [email])

  // Small flags used to show red borders / error message
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isErrorContainer, setIsErrorContainer] = useState(false);
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Runs when the form is submitted (button click or pressing Enter)
  const confirmation = () => {
    if (email === "") {
      toast.warning("Enter login email");
      setIsEmail(true);
      return;
    }
    if (password === "") {
      toast.warning("Enter login password");
      setIsPassword(true);
      return;
    }

    loginAccount();
  };

  const loginAccount = async () => {
    setIsLoading(true);

    const account = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, account);

      if (res.data.isSuccess) {
        const user = res.data.user;
        const token = res.data.token;
        const role = res.data.role.toLowerCase();

        setAuth(user, token, role);

        if (user.isChangePassword === false) {
          navigate(`/change-password`);
        } else {
          if (["student", "teacher", "guest"].includes(role)) {
            navigate("/library/home");
          } else if (role === "admin") {
            navigate("/admin");
          }
        }

        toast.success(res.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
      toast.warning(error?.response?.data?.message);
      setIsErrorContainer(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Shared input styling (white theme)
  const inputClass = (hasError) =>
    `w-full p-3.5 pl-10 text-sm rounded-xl bg-white border text-stone-800 placeholder-stone-400 outline-none transition-all duration-200 ${
      hasError
        ? "border-red-400 bg-red-50/50 focus:ring-2 focus:ring-red-200"
        : "border-stone-200 hover:border-stone-300 focus:border-stone-400 focus:ring-2 focus:ring-stone-300"
    }`;

  return (
    <section className="flex h-screen w-full bg-white">
      {/* ============================================================
          LEFT SIDE - IMAGE (full-bleed hero)
          Hidden on small screens, shown on medium screens and up.
      ============================================================ */}
      <div className="relative hidden md:flex md:w-1/2 items-end overflow-hidden bg-stone-100 border-r border-stone-200">
        {/* Background photo fills the whole panel */}
        <img
          src={NaicImage2}
          alt="Naic Municipal Library"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* White bottom fade so the caption stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent"></div>

        {/* White right-edge fade so the image blends into the form panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/80"></div>

        {/* Caption text */}
        <div className="relative z-10 p-10">
          <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
            Naic Municipal Library
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Explore books, learn, and grow with us.
          </p>
        </div>
      </div>

      {/* ============================================================
          RIGHT SIDE - LOGIN FORM
      ============================================================ */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm flex flex-col gap-6">

          {/* Header: logo + titles */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-transparent flex items-center justify-center overflow-hidden">
              <img src={NaicLibraryLogo} alt="Library logo" className="h-10 w-10 object-contain" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-stone-900 tracking-tight">
                Naic Municipal Library
              </h1>
              <p className="text-xs text-stone-400">Member Login</p>
            </div>
          </div>

          {/* Welcome text */}
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-stone-900">Welcome back</h2>
            <p className="text-xs text-stone-400">
              Sign in to explore the library.
            </p>
          </div>

          {/* Error banner (only shows when there is an error) */}
          {isErrorContainer && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-500 text-xs text-center">{message}</p>
            </div>
          )}

          {/* The form allows pressing Enter to sign in */}
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              confirmation();
            }}
          >
            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-500">Email</label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={inputClass(isEmail)}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value) setIsEmail(false);
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-500">Password</label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`${inputClass(isPassword)} pr-11`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value) setIsPassword(false);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-2 w-full p-3.5 text-sm rounded-xl flex items-center justify-center font-semibold outline-none transition-all duration-200 ${
                isLoading
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "bg-stone-800 text-white hover:bg-stone-900 cursor-pointer hover:shadow-lg hover:shadow-stone-300 hover:-translate-y-0.5"
              }`}
            >
              {isLoading ? (
                <LoaderCircle size={20} className="animate-spin" />
              ) : (
                <>
                  <LogIn size={16} className="mr-2" /> Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-stone-200"></div>
            <span className="text-xs text-stone-400 font-medium">or</span>
            <div className="flex-1 h-px bg-stone-200"></div>
          </div>

          {/* Register */}
          <button
            type="button"
            onClick={() => {navigate("/registration"); localStorage.removeItem('accountDetails')}}
            className="w-full p-3.5 text-sm rounded-xl flex items-center justify-center font-semibold bg-white border border-stone-200 text-stone-600 outline-none cursor-pointer transition-all duration-200 hover:bg-stone-100 hover:-translate-y-0.5"
          >
            No Account? Register
          </button>

          {/* Cancel button */}
          <button
            type="button"
            onClick={() => {navigate(-1); localStorage.removeItem('accountDetails')}}
            className="w-full p-3.5 text-sm rounded-xl flex items-center justify-center font-semibold text-stone-500 outline-none cursor-pointer transition-all duration-200 hover:bg-stone-100 hover:text-stone-700"
          >
            Cancel
          </button>

          {/* Footer */}
          <p className="text-[11px] text-stone-400 text-center">
            © Naic Municipal Library
          </p>

        </div>
      </div>
    </section>
  );
};

export default LoginPage;
