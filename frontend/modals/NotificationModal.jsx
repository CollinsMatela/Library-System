import { ArrowLeft, Info, LoaderCircle, Bell } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import NaicLibraryLogo from "../src/assets/NaicLibraryLogo.png";
import useAuthStore from "../store/useAuthStore";

const NotificationModal = ({ onClose }) => {
    const user = useAuthStore((state) => state.user);
    const [notifications, setNotifications] = useState([]);
    const [filteredNotification, setFilteredNotification] = useState([]);
    const [borrows, setBorrows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([fetchNotifications(), fetchAllBorrow()]);
            } catch (error) {
                toast.error("Failed to load the notifications");
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const UserNotification = notifications
            .filter((notif) => notif.recipient === user._id)
            .reverse();
        const GlobalNotification = notifications
            .filter((notif) => notif.recipient === null)
            .reverse();
        setFilteredNotification([...GlobalNotification, ...UserNotification]);
    }, [notifications]);

    useEffect(() => {
        if (borrows.length > 0) {
            DueNotification(borrows);
        }
    }, [borrows]);

    const DueNotification = async (borrows) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/due-notifications`,
                { borrows: borrows }
            );
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const fetchNotifications = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/fetch-notifications`
            );
            setNotifications(res.data.notifications);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const fetchAllBorrow = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/fetch-all-borrow`
            );
            setBorrows(res.data.borrows);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-2xl shadow-2xl shadow-stone-300/50 border border-stone-200/60 overflow-hidden z-50">
            {/* Header */}
            <div className="w-full flex justify-between items-center p-4 border-b border-stone-200/80 bg-stone-50/50">
                <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-stone-800 flex items-center justify-center">
                        <Bell size={15} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-stone-800">
                            Notifications
                        </h1>
                        <p className="text-[11px] text-stone-400">
                            Stay informed about your library activities.
                        </p>
                    </div>
                </div>
                <button
                    className="cursor-pointer h-8 w-8 rounded-lg flex items-center justify-center hover:bg-stone-100 transition-colors"
                    onClick={onClose}
                >
                    <ArrowLeft size={16} className="text-stone-500" />
                </button>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="p-8 w-full flex justify-center items-center">
                    <LoaderCircle
                        size={20}
                        className="text-stone-400 animate-spin"
                    />
                </div>
            ) : (
                <div className="w-full max-h-80 overflow-y-auto">
                    {filteredNotification.length === 0 && (
                        <div className="m-4 p-4 bg-stone-50 rounded-xl flex justify-center items-center gap-2 border border-stone-200/60">
                            <Info size={16} className="text-stone-400" />
                            <span className="text-xs text-stone-500 font-medium">
                                No Notifications Found.
                            </span>
                        </div>
                    )}

                    {filteredNotification.length > 0 &&
                        filteredNotification.map((notif, index) => (
                            <div
                                key={notif._id || index}
                                className="w-full px-4 py-3 border-b border-stone-100 hover:bg-stone-50 transition-colors cursor-pointer flex gap-3"
                            >
                                <div className="relative h-9 w-9 shrink-0">
                                    <div className="absolute inset-0 bg-stone-100 rounded-full" />
                                    <img
                                        src={NaicLibraryLogo}
                                        alt="library-logo"
                                        className="relative h-9 w-9 rounded-full object-cover"
                                    />
                                </div>
                                <div className="w-full min-w-0">
                                    <h1 className="text-xs font-semibold text-stone-800 truncate">
                                        {notif.title}{" "}
                                        <span className="text-[11px] text-stone-400 font-normal">
                                            • {formatDate(notif.createdAt)}
                                        </span>
                                    </h1>
                                    <p className="text-xs text-stone-400 mt-0.5 line-clamp-2">
                                        {notif.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default NotificationModal;
