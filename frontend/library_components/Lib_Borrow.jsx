import Lib_Navigation from "./Lib_Navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { CheckCheck, Check, Info, Ellipsis, ClockFading, Trash, BookOpen, LoaderCircle, RefreshCw, ChevronDown, AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useAuthStore from '../store/useAuthStore'
import Confirmation from '../popup/Confirmation_Popup'
import Footer from '../components/Footer'

const STATUS_CONFIG = {
  pending: { icon: Ellipsis, color: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-700", label: "Pending" },
  approved: { icon: Check, color: "bg-blue-600", badge: "bg-blue-100 text-blue-700", label: "Approved" },
  borrowed: { icon: ClockFading, color: "bg-orange-600", badge: "bg-orange-100 text-orange-700", label: "Borrowed" },
  returned: { icon: CheckCheck, color: "bg-green-600", badge: "bg-green-100 text-green-700", label: "Completed" },
}

const STATUS_STEPS = ["Pending", "Approved", "Borrowed", "Returned"]

const formatDate = (dateStr) => {
  if (!dateStr) return "—"
  const d = new Date(dateStr)
  return isNaN(d) ? dateStr.split("T")[0] : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const getDueDateUrgency = (returnDate) => {
  if (!returnDate) return null
  const now = new Date()
  const due = new Date(returnDate)
  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return { label: "Overdue", className: "bg-red-100 text-red-700" }
  if (diffDays <= 3) return { label: `Due in ${diffDays}d`, className: "bg-amber-100 text-amber-700" }
  return null
}

const getInitials = (title) => {
  if (!title) return "?"
  return title.trim().charAt(0).toUpperCase()
}

const SkeletonCard = () => (
  <div className="w-full border border-stone-200 p-4 rounded-xl animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-lg bg-stone-200" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-200 rounded w-1/2" />
      </div>
    </div>
  </div>
)

const EmptyState = ({ message, submessage, showCTA }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full min-h-48 bg-stone-50 border border-stone-200 rounded-xl flex flex-col justify-center items-center gap-3 p-6">
      <div className="w-14 h-14 rounded-full bg-stone-100 flex justify-center items-center">
        <BookOpen size={24} className="text-stone-400" />
      </div>
      <div className="text-center">
        <h1 className="text-sm font-semibold text-stone-700">{message}</h1>
        <p className="text-xs text-stone-400 mt-1">{submessage}</p>
      </div>
      {showCTA && (
        <button
          onClick={() => navigate("/library/catalog")}
          className="mt-2 px-4 py-2 bg-stone-800 text-white text-xs font-medium rounded-lg hover:bg-stone-700 transition cursor-pointer"
        >
          Browse Books
        </button>
      )}
    </div>
  )
}

const StatusTimeline = ({ status }) => {
  const currentIdx = STATUS_STEPS.indexOf(status)
  return (
    <div className="flex items-center gap-1 mt-3">
      {STATUS_STEPS.map((step, i) => {
        const isDone = i <= currentIdx
        return (
          <div key={step} className="flex items-center gap-1">
            <div
              title={step}
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${isDone ? 'bg-green-600' : 'bg-stone-200'}`}
            >
              {isDone && <Check size={11} className="text-white" strokeWidth={3.5} />}
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div className={`w-4 h-0.5 rounded-full transition-colors ${i < currentIdx ? 'bg-green-600' : 'bg-stone-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

const Lib_Borrow = () => {

    const user = useAuthStore((state) => state.user);
    const [showConfirmation, setConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [request, setRequest] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    const [isPending, setIsPending] = useState(true);
    const [isApprove, setIsApprove] = useState(false);
    const [isBorrow, setIsBorrow] = useState(false);
    const [isHistory, setIsHistory] = useState(false);

    const latestOrder = [...request].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const pendingList = latestOrder.filter((z) => z.status.toLowerCase() === 'pending');
    const approveList = latestOrder.filter((z) => z.status.toLowerCase() === 'approved');
    const borrowedList = latestOrder.filter((z) => z.status.toLowerCase() === 'borrowed');
    const historyList = latestOrder.filter((z) => z.status.toLowerCase() === 'returned');

    const fetchBorrow = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-borrow/${user._id}`);
            setRequest(res.data.request);
          } catch (error) {
            toast.error(error?.response?.data?.message);
          }
    }

    const deleteBorrow = async (requestId) => {
          try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-request/${requestId}`);
            toast.success(res.data.message);
            fetchBorrow();
            setConfirmation(false);
          } catch (error) {
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
          }
    }

    const handleConfirmation = (request) => {
          setSelectedRequest(request)
          setConfirmation(true);
    }

    const toggleExpand = (id) => {
      setExpandedId(expandedId === id ? null : id)
    }

    useEffect(() => {
        setIsLoading(true);
            const loadData = async () =>{
                try {
                await fetchBorrow()
                } catch (error) {
                    toast.error('Failed to load the data.')
                } finally {
                    setIsLoading(false);
                }
            }
        loadData();
    },[])

    const handlePending = () => {
    setIsPending(true);
    setIsApprove(false);
    setIsBorrow(false);
    setIsHistory(false);
    };

    const handleApprove = () => {
        setIsPending(false);
        setIsApprove(true);
        setIsBorrow(false);
        setIsHistory(false);
    };

    const handleBorrow = () => {
        setIsPending(false);
        setIsApprove(false);
        setIsBorrow(true);
        setIsHistory(false);
    };

    const handleHistory = () => {
        setIsPending(false);
        setIsApprove(false);
        setIsBorrow(false);
        setIsHistory(true);
    };

    const renderCard = (item, index, showDelete = true) => {
      const config = STATUS_CONFIG[item.status.toLowerCase()] || STATUS_CONFIG.pending;
      const urgency = item.status.toLowerCase() === 'borrowed' ? getDueDateUrgency(item.returnDate) : null
      const isExpanded = expandedId === item._id
      return (
        <div
          key={item._id}
          className="w-full border border-stone-200 rounded-xl hover:shadow-md hover:border-stone-300 transition-all duration-200 animate-[fadeIn_0.3s_ease-out] overflow-hidden"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div
            className="p-4 flex items-center gap-3 cursor-pointer"
            onClick={() => toggleExpand(item._id)}
          >
            <div className="bg-stone-100 w-11 h-11 rounded-lg shrink-0 flex items-center justify-center">
              <BookOpen size={18} className="text-stone-500" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm font-semibold text-stone-800 truncate">{item.title}</h1>
                {item.quantity > 1 && (
                  <span className="text-[10px] font-medium bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                    Qty: {item.quantity}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-xs text-stone-400">
                  Requested — {formatDate(item.createdAt)}
                </span>
                {item.returnDate && (
                  <span className="text-xs text-stone-400">
                    Due — {formatDate(item.returnDate)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {urgency ? (
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${urgency.className}`}>
                  {urgency.label}
                </span>
              ) : (
                <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${config.badge}`}>
                  {config.label}
                </span>
              )}
              <ChevronDown size={14} className={`text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
          </div>

          {isExpanded && (
            <div className="px-4 pb-4 pt-2 border-t border-stone-100 bg-stone-50">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-stone-400">Borrow Date</span>
                  <p className="text-stone-700 font-medium">{formatDate(item.borrowDate)}</p>
                </div>
                <div>
                  <span className="text-stone-400">Return Date</span>
                  <p className="text-stone-700 font-medium">{formatDate(item.returnDate)}</p>
                </div>
                <div>
                  <span className="text-stone-400">Status</span>
                  <p className="text-stone-700 font-medium">{config.label}</p>
                </div>
                <div>
                  <span className="text-stone-400">Quantity</span>
                  <p className="text-stone-700 font-medium">{item.quantity}</p>
                </div>
              </div>
              <StatusTimeline status={item.status} />
              {showDelete && (
                <div className="flex justify-end mt-3 pt-3 border-t border-stone-200">
                  <button
                    onClick={() => handleConfirmation(item)}
                    title="Remove Request"
                    className="px-3 py-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transition-colors cursor-pointer"
                  >
                    <Trash size={13} />
                    Remove Request
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )
    }

    const tabs = [
      { key: "pending", label: "Pending", count: pendingList.length, active: isPending, handler: handlePending },
      { key: "approved", label: "Approved", count: approveList.length, active: isApprove, handler: handleApprove },
      { key: "borrowed", label: "Borrowed", count: borrowedList.length, active: isBorrow, handler: handleBorrow },
      { key: "history", label: "History", count: historyList.length, active: isHistory, handler: handleHistory },
    ]

    return(
        <>
        {showConfirmation &&
        (<Confirmation
        errorMessage={errorMessage}
        message={selectedRequest ? `Delete request for "${selectedRequest.title}"?` : 'Are you sure to delete this request?'}
        onConfirm={() => deleteBorrow(selectedRequest._id)}
        onCancel={() => setConfirmation(false)}
        />)}
        <Lib_Navigation/>
        <section className="min-h-screen w-full justify-center items-start flex bg-white">

                    <div className="w-full max-w-5xl justify-center items-start flex flex-col rounded-2xl px-4 lg:px-0">

                        <header className="w-fit mt-20 bg-white rounded-lg justify-center items-center flex gap-3 mb-4">
                            <div className="border border-stone-800 bg-stone-800 p-2 rounded-lg">
                                <Info size={15} className="text-white"/>
                            </div>
                            <div>
                                <h1 className="text-sm text-stone-800 font-bold">Request Status</h1>
                                <p className="text-stone-500 text-xs">
                                    Oversee and manage your book request
                                </p>
                            </div>
                        </header>

                        <div className="w-full flex flex-row mb-4 gap-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    className={`${tab.active
                                        ? 'border-b-2 border-stone-800 bg-stone-50 text-stone-800 font-bold'
                                        : 'border-b border-stone-200 text-stone-400 hover:text-stone-600 hover:bg-stone-50'}
                                     cursor-pointer px-4 py-2.5 justify-center items-center flex rounded-t transition-all w-full`}
                                    onClick={tab.handler}
                                >
                                    <h1 className="text-xs whitespace-nowrap">
                                        {tab.label}
                                        <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${tab.active ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-500'}`}>
                                            {tab.count}
                                        </span>
                                    </h1>
                                </button>
                            ))}
                        </div>

                        {isLoading ?
                        (
                            <div className="w-full grid grid-cols-1 gap-3">
                                {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        )
                        :
                        (
                        <div className="w-full grid grid-cols-1 gap-3">

                            {isPending && (
                                pendingList.length > 0
                                    ? pendingList.map((pending, i) => renderCard(pending, i))
                                    : <EmptyState message="No Pending Request" submessage="You don't have any pending book requests yet." showCTA />
                            )}

                            {isApprove && (
                                approveList.length > 0
                                    ? approveList.map((approve, i) => renderCard(approve, i))
                                    : <EmptyState message="No Approved Request" submessage="You don't have any approved book requests yet." showCTA />
                            )}

                            {isBorrow && (
                                borrowedList.length > 0
                                    ? borrowedList.map((borrow, i) => renderCard(borrow, i, false))
                                    : <EmptyState message="No Borrowed Book" submessage="You don't have any borrowed book yet." showCTA />
                            )}

                            {isHistory && (
                                historyList.length > 0
                                    ? historyList.map((history, i) => renderCard(history, i, false))
                                    : <EmptyState message="No Borrow History" submessage="You don't have any borrowed history yet." />
                            )}

                        </div>
                        )}

                    </div>

                </section>
        </>
    )
}
export default Lib_Borrow
