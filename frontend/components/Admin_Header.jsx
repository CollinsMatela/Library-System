import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import Confirmation_Popup from "../popup/Confirmation_Popup";

/* ------------------------------------------------------------------
   ProfileAvatar
   Small helper reused in 2 places (the header button and the menu).
   It shows the user's photo when there is one, otherwise a blue
   circle with the first letter of their first name.
------------------------------------------------------------------ */
const ProfileAvatar = ({ user, size = "h-8 w-8" }) => {
    const initial = user?.firstname?.slice(0, 1).toUpperCase() || "?";

    if (user?.avatar) {
        return (
            <div className={`${size} shrink-0 rounded-full overflow-hidden bg-stone-200`}>
                <img
                    src={user.avatar}
                    alt={`${user?.firstname || "User"} profile`}
                    className="h-full w-full object-cover"
                />
            </div>
        );
    }

    return (
        <div className={`${size} shrink-0 rounded-full bg-stone-800 flex justify-center items-center`}>
            <span className="text-xs font-bold text-white">{initial}</span>
        </div>
    );
};

const Admin_Header = ({ mainText, subText }) => {

    /* --- State --- */
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();
    const location = useLocation();
    const profileRef = useRef(null);

    const [isProfile, setIsProfile] = useState(false);
    const [isLogoutConfirmation, setIsLogoutConfirmation] = useState(false);
    const [lastPathname, setLastPathname] = useState(location.pathname);

    // Close the menu when the page changes.
    // React recommends adjusting state while rendering (not inside an
    // effect), so we compare the route here and reset it right away.
    if (lastPathname !== location.pathname) {
        setLastPathname(location.pathname);
        setIsProfile(false);
    }

    /* --- Effects --- */

    // Close the menu when clicking anywhere outside of it
    useEffect(() => {
        if (!isProfile) return;

        const handleOutsideClick = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfile(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [isProfile]);

    // Close the menu when pressing Escape
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") setIsProfile(false);
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    /* --- Handlers --- */

    const handleLogout = () => {
        setIsLogoutConfirmation(false);
        setIsProfile(false);
        logout();
        localStorage.removeItem("token");
        navigate("/");
    };

    const openLogoutConfirmation = () => {
        setIsProfile(false);
        setIsLogoutConfirmation(true);
    };

    /* --- Render --- */
    return (
        <>
            {isLogoutConfirmation && (
                <Confirmation_Popup
                    message={"Are you sure you want to logout?"}
                    confirmLabel="Logout"
                    onConfirm={handleLogout}
                    onCancel={() => setIsLogoutConfirmation(false)}
                />
            )}

            <header className="w-full bg-white justify-between items-start flex mb-10 border-0 lg:border-b border-stone-300 p-3 px-4 md:px-10">

                {/* Page title */}
                <div>
                    <h1 className="text-sm font-bold text-stone-800">{mainText || "Demo"}</h1>
                    <p className="text-stone-400 text-xs">{subText || "Demo"}</p>
                </div>

                {/* Profile menu */}
                <div ref={profileRef} className="relative">
                    <button
                        type="button"
                        onClick={() => setIsProfile((prev) => !prev)}
                        aria-expanded={isProfile}
                        aria-label="Open account menu"
                        className="flex justify-center items-center gap-1 rounded-full p-1 transition cursor-pointer hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-stone-400"
                    >
                        <ProfileAvatar user={user} />

                        <span className="hidden sm:flex justify-center items-center gap-1">
                            <span className="text-xs text-stone-800 font-medium">{user?.firstname}</span>
                            <ChevronDown
                                size={15}
                                className={`text-stone-500 transition-transform duration-200 ${isProfile ? "rotate-180" : ""}`}
                            />
                        </span>
                    </button>

                    {isProfile && (
                        <div className="absolute z-9999 w-60 right-0 top-full mt-1.5 bg-white flex flex-col justify-start items-start shadow-xl border border-stone-200 rounded-xl gap-1">

                            {/* Who is logged in */}
                            <div className="w-full flex items-center gap-2 p-4 border-b border-stone-300 bg-white rounded-t-xl">
                                <ProfileAvatar user={user} />
                                <div>
                                    <p className="text-xs text-stone-700 font-semibold">
                                        Hello, {user?.firstname} {user?.lastname}
                                    </p>
                                    <p className="text-[10px] text-stone-500 uppercase">
                                        {user?.role}
                                    </p>
                                </div>
                            </div>

                            {/* Logout */}
                            <button
                                type="button"
                                onClick={() => navigate(`/admin/profile/${user._id}`)}
                                className="w-full flex items-center gap-2 text-xs text-stone-500 px-4 py-2 text-start hover:bg-stone-100 transition cursor-pointer mb-1"
                            >
                                <User size={15} />
                                My Account
                            </button>

                            {/* Logout */}
                            <button
                                type="button"
                                onClick={openLogoutConfirmation}
                                className="w-full flex items-center gap-2 text-xs text-stone-500 px-4 py-2 text-start hover:bg-stone-100 hover:text-red-500 transition cursor-pointer mb-1"
                            >
                                <LogOut size={15} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>

            </header>
        </>
    );
};

export default Admin_Header;
