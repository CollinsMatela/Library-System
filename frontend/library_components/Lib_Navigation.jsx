import useAuthStore from "../store/useAuthStore";
import defaultProfile from "../src/assets/Student.jpg";
import NaicLibraryLogo from "../src/assets/NaicLibraryLogo.png";
import NotificationModal from "../modals/NotificationModal";
import { useNavigate, useLocation } from "react-router-dom";
import {
    LogOut,
    Blocks,
    BookSearch,
    BellDot,
    User,
    ChevronDown,
    LayoutList,
    Menu,
    X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ConfirmationPopup from "../popup/Confirmation_Popup";

const Lib_Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const [isNotification, setIsNotification] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [isConfirmation, setIsConfirmation] = useState(false);
    const [isMenu, setIsMenu] = useState(false);

    const drawerRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleProfile = () => {
        navigate("/library/profile");
    };

    // Close dropdowns on route change
    useEffect(() => {
        setIsNotification(false);
        setIsProfile(false);
        setIsMenu(false);
    }, [location.pathname]);

    // Close drawer on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setIsMenu(false);
                setIsProfile(false);
                setIsNotification(false);
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenu]);

    const navLinks = [
        { path: "/library", label: "Book Browse", icon: Blocks },
        { path: "/library/catalog", label: "Search & Catalog", icon: BookSearch },
        { path: "/library/borrow-status", label: "Borrow Status", icon: LayoutList },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {isConfirmation && (
                <ConfirmationPopup
                    message={"Do you want to logout?"}
                    onConfirm={() => handleLogout()}
                    onCancel={() => setIsConfirmation(false)}
                />
            )}

            <nav className="fixed z-20 bg-white/70 backdrop-blur-md h-16 w-full flex items-center px-4 border-b border-stone-200/60">
                <div className="w-full lg:w-5xl justify-between items-center flex mx-auto">
                    {/* Logo */}
                    <div className="flex gap-2 items-center">
                        <div
                            className="h-9 w-9 rounded-xl bg-transparent flex items-center justify-center cursor-pointer"
                            onClick={() => navigate("/library")}
                        >
                            <img
                                src={NaicLibraryLogo}
                                alt="Logo"
                                className="h-6 w-6 object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xs text-stone-900 font-bold">
                                Naic Municipal Library
                            </h1>
                            <h1 className="hidden lg:block text-[11px] text-stone-400">
                                Welcome to digital library platform.
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex gap-1 items-center">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <button
                                    key={link.path}
                                    className={`${
                                        isActive(link.path)
                                            ? "bg-stone-100 text-stone-900"
                                            : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
                                    } px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-medium transition-all duration-200 cursor-pointer`}
                                    onClick={() => navigate(link.path)}
                                >
                                    <Icon size={15} />
                                    {link.label}
                                </button>
                            );
                        })}

                        {/* Notification */}
                        <div className="relative">
                            <button
                                className="p-2 flex items-center justify-center rounded-full hover:bg-stone-100 transition-all duration-200 cursor-pointer"
                                onClick={() => setIsNotification((prev) => !prev)}
                            >
                                <BellDot
                                    size={18}
                                    className={`${
                                        isNotification ? "text-stone-900" : "text-stone-500"
                                    }`}
                                />
                            </button>
                            {isNotification && (
                                <NotificationModal
                                    onClose={() => setIsNotification(false)}
                                />
                            )}
                        </div>

                        {/* Profile */}
                        <div
                            className="relative cursor-pointer"
                            onClick={() => setIsProfile((prev) => !prev)}
                        >
                            <div className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full hover:bg-stone-50 transition-all duration-200">
                                {user.avatar ? (
                                    <div className="h-8 w-8 rounded-full border-2 border-stone-200 overflow-hidden">
                                        <img
                                            src={user?.avatar}
                                            alt="user-avatar"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-stone-800 flex items-center justify-center">
                                        <h1 className="text-white text-xs font-bold">
                                            {user.firstname?.slice(0, 1).toUpperCase()}
                                        </h1>
                                    </div>
                                )}
                                <h1 className="text-xs font-semibold text-stone-900">
                                    {user.firstname}
                                </h1>
                                <ChevronDown
                                    size={14}
                                    className={`text-stone-400 transition-transform duration-200 ${
                                        isProfile ? "rotate-180" : ""
                                    }`}
                                />
                            </div>

                            {isProfile && (
                                <div className="absolute w-64 right-0 top-full mt-2 bg-white shadow-xl border border-stone-200 rounded-2xl overflow-hidden">
                                    <div className="w-full flex gap-3 border-b border-stone-100 p-4 bg-stone-50/50">
                                        <div className="h-10 w-10 shrink-0">
                                            {user.avatar ? (
                                                <img
                                                    src={user?.avatar}
                                                    className="object-cover rounded-full h-10 w-10"
                                                />
                                            ) : (
                                                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-stone-800">
                                                    <h1 className="text-white text-sm font-bold">
                                                        {user.firstname?.slice(0, 1).toUpperCase()}
                                                    </h1>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <h1 className="text-xs font-bold text-stone-800">
                                                Hello, {user.firstname} {user.lastname}
                                            </h1>
                                            <h1 className="text-[11px] text-stone-400">
                                                Welcome to the Digital Library.
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-0.5 p-2">
                                        <button
                                            className="px-3 py-2.5 flex items-center gap-2.5 rounded-lg hover:bg-stone-50 transition-colors cursor-pointer"
                                            onClick={() => navigate("/library/my-account")}
                                        >
                                            <User size={15} className="text-stone-500" />
                                            <span className="text-xs text-stone-600 font-medium">
                                                My Account
                                            </span>
                                        </button>
                                        <button
                                            className="px-3 py-2.5 flex items-center gap-2.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                            onClick={() => setIsConfirmation(true)}
                                        >
                                            <LogOut size={15} className="text-stone-500" />
                                            <span className="text-xs text-stone-600 font-medium hover:text-red-500">
                                                Logout
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="block lg:hidden">
                        <button
                            className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer"
                            onClick={() => setIsMenu(true)}
                        >
                            <Menu size={18} className="text-stone-600" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            {isMenu && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
                        onClick={() => setIsMenu(false)}
                    />

                    {/* Drawer */}
                    <div
                        ref={drawerRef}
                        className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col"
                    >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-4 border-b border-stone-100">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-stone-800 flex items-center justify-center">
                                    <img
                                        src={NaicLibraryLogo}
                                        alt="Logo"
                                        className="h-5 w-5 object-cover rounded-md"
                                    />
                                </div>
                                <h1 className="text-sm font-bold text-stone-800">
                                    Naic Library
                                </h1>
                            </div>
                            <button
                                className="p-2 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                                onClick={() => setIsMenu(false)}
                            >
                                <X size={18} className="text-stone-500" />
                            </button>
                        </div>

                        {/* Drawer Menu Items */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-1">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <button
                                        key={link.path}
                                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                                            isActive(link.path)
                                                ? "bg-stone-100 text-stone-900"
                                                : "text-stone-600 hover:bg-stone-50"
                                        }`}
                                        onClick={() => navigate(link.path)}
                                    >
                                        <Icon size={18} />
                                        {link.label}
                                    </button>
                                );
                            })}

                            <div className="h-px bg-stone-100 my-2" />

                            <button
                                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-50 transition-all duration-200 cursor-pointer"
                                onClick={() => {
                                    setIsMenu(false);
                                    setIsNotification(true);
                                }}
                            >
                                <BellDot size={18} />
                                Notifications
                            </button>

                            <button
                                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-50 transition-all duration-200 cursor-pointer"
                                onClick={() => navigate("/library/my-account")}
                            >
                                <User size={18} />
                                My Account
                            </button>

                            <button
                                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                                onClick={() => {
                                    setIsMenu(false);
                                    setIsConfirmation(true);
                                }}
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-4 border-t border-stone-100">
                            <div className="flex items-center gap-3">
                                {user.avatar ? (
                                    <img
                                        src={user?.avatar}
                                        alt="user-avatar"
                                        className="h-9 w-9 rounded-full object-cover border-2 border-stone-200"
                                    />
                                ) : (
                                    <div className="h-9 w-9 rounded-full bg-stone-800 flex items-center justify-center">
                                        <h1 className="text-white text-xs font-bold">
                                            {user.firstname?.slice(0, 1).toUpperCase()}
                                        </h1>
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs font-bold text-stone-800">
                                        {user.firstname} {user.lastname}
                                    </p>
                                    <p className="text-[11px] text-stone-400">
                                        {user.email || "Library Member"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Lib_Navigation;
