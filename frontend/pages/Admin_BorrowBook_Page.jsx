


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Admin_Sidebar from '../components/Admin_Sidebar'
import { Check, HandHelping, IdCard, IdCardLanyard, Info, X } from "lucide-react";
import { toast } from "react-toastify";
import PendingTable from "./Borrowing_Components/PendingTable";
import ApprovedTable from "./Borrowing_Components/ApprovedTable";
import BorrowedTable from "./Borrowing_Components/BorrowedTable";
import HistoryTable from "./Borrowing_Components/HistoryTable";
import useAuthStore from "../store/useAuthStore";
import Admin_Header from "../components/Admin_Header";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import DepositModal from "../modals/DepositModal";
import DepositListModal from "../modals/DepositsListModal";

const Admin_BorrowBook_Page = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [pendingConfirmation, setPendingConfirmation] = useState(false);
    const [approveConfirmation, setApproveConfirmation] = useState(false);
    const [returnConfirmation, setReturnConfirmation] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [borrowList, setBorrowList] = useState([]);

    const Pendings = borrowList.filter((request) => request.status === 'Pending').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const Approved = borrowList.filter((request) => request.status === 'Approved').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const Borrowed = borrowList.filter((request) => request.status === 'Borrowed').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const Returned = borrowList.filter((request) => request.status === 'Returned').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const [isPending, setIsPending] = useState(true);
    const [isApproved, setIsApproved] = useState(false);
    const [isBorrowed, setIsBorrowed] = useState(false);
    const [isHistory, setIsHistory] = useState(false);
    const [isDeposit, setIsDeposit] = useState(false);
    const [isDepositList, setIsDepositList] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('') 

    const [returnDate, setReturnDate] = useState({})
    const [quantity, setQuantity] = useState({});

    const [idForm, setIdForm] = useState({
        idType: '',
        idNumber: '',
        idName: '',
        receivedBy: user?._id || ''
    });
    const [deposits, setDeposits] = useState([]);
    const [depositLoading, setDepositLoading] = useState(false);
    const DepositRequest = async () => {
        if(!idForm.idType || !idForm.idNumber || !idForm.idName){
            setErrorMessage('Please fill all fields.')
            return;
        }
        try {
          setDepositLoading(true);
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/deposit-id`, idForm);
          console.log(res.data.message);
          toast.success(res.data.message);
          setIsDeposit(false);
          setIdForm({
            idType: '',
            idNumber: '',
            idName: '',
            receivedBy: user?._id || ''
          });
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message);
          setErrorMessage(error?.response?.data?.message)
        } finally {
          setDepositLoading(false);
        }
    }
    const fetchDeposits = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-deposits`);
            console.log(res.data.deposits);
            setDeposits(res.data.deposits);
          } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    const fetchAllBorrow = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-all-borrow`);
            setBorrowList(res.data.borrows);
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    const updateBorrow = async (borrow) => {
          if(!returnDate[borrow._id] || !quantity[borrow._id]) {
            setErrorMessage('Please select date and quantity.')
            return;
          }
     
          const borrowData = {
                id: borrow._id,
                borrowDate: new Date().toISOString().split("T")[0],
                returnDate: returnDate[borrow._id].split("T")[0],
                status: 'Borrowed',
                quantity: quantity[borrow._id],

                bookId: borrow.bookId,
                userId: borrow.userId
          }

          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-borrow`, borrowData);
            toast.success(res.data.message);
            fetchAllBorrow();
            BorrowedNotification(borrow);
            setApproveConfirmation(false)
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    const approveBorrow = async (borrow) => {

          const data = {
                id: borrow._id,
                userId: borrow.userId,
                status: 'Approved'
          }
          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/approve-borrow`, data);
            toast.success(res.data.message);
            fetchAllBorrow();
            ApprovedNotification(borrow);
            setPendingConfirmation(false)
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    const deleteBorrow = async (borrow) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-user-request/${borrow._id}`)
            toast.success(res.data.message);
            fetchAllBorrow();
            RemoveNotification(borrow);
            setDeleteConfirmation(false);
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
        }
    }

    const ReturnBorrow = async (borrow) => {
          const borrowData = {
                id: borrow._id,
                status: 'Returned',
          }

          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/return-borrow`, borrowData);
            toast.success(res.data.message);
            fetchAllBorrow();
            setReturnConfirmation(false)
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    // const DeleteBorrow = async (borrow) => {
    //       const data = {
    //             id: borrow._id,
    //             borrowedDate: new Date().getDate().split('T')[0],
    //             returnDate: returnDate.split('T')[0],
    //             status: 'Borrowed'
    //       }
    //       try {
    //         const res = await axios.put(`${import.meta.env.VITE_API_URL}/borrowed-borrow`, data);
    //         toast.success(res.data.message);
    //         fetchAllBorrow();
    //       } catch (error) {
    //         toast.error(error?.response?.dat?.message);
    //       }
    // }
    const ApprovedNotification = async (borrow) => {
          
          try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/approved-notification`, {userId: borrow.userId})
            console.log(res.data.message);
            
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }
    const RemoveNotification = async (borrow) => {
         try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/removed-notification`, {userId: borrow.userId})
            console.log(res.data.message);
            
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }
    const BorrowedNotification = async (borrow) => {
        
        const data = {
            bookTitle: borrow.title,
            userId: borrow.userId,
            returnDate: returnDate,
            requestId: borrow._id
        }
          try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/borrowed-notification`, data)
            console.log(res.data.message);
            
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    useEffect(() => {
      const loadData = async () => {
      try {
        await Promise.all([fetchAllBorrow(), fetchDeposits()]);
      } catch (error) {
        
      }
    }
      loadData();
    },[])

    const handlePending = () => {
        setIsPending(true);
        setIsApproved(false);
        setIsBorrowed(false);
        setIsHistory(false);
    }
    const handleApproved = () => {
        setIsPending(false);
        setIsApproved(true);
        setIsBorrowed(false);
        setIsHistory(false);
    }
    const handleBorrowed = () => {
        setIsPending(false);
        setIsApproved(false);
        setIsBorrowed(true);
        setIsHistory(false);
    }
    const handleHistory = () => {
        setIsPending(false);
        setIsApproved(false);
        setIsBorrowed(false);
        setIsHistory(true);
    }

    const handleStatus = (status) => {
          setSelectedStatus(status)
          if(status === "pending"){
            handlePending()
          }
          else if (status === "approved"){
            handleApproved()
          }
          else if (status === "borrowed"){
            handleBorrowed()
          }
          else if (status === "history"){
            handleHistory()
          } else {
            toast.warning("Selected status is invalid");
            return
          }
    }

   const confirmationProcess = (request) => {
    setErrorMessage('');
    if (!request) {
        toast.warning("No selected request")
        return
    }
    setSelectedRequest(request)

    if (request.status.toLowerCase() === "pending") {
        setPendingConfirmation(true)
    } else if (request.status.toLowerCase() === "approved") {
        setApproveConfirmation(true)
    } else if (request.status.toLowerCase() === "borrowed") {
        setReturnConfirmation(true)
    } else {
        toast.warning("Invalid request status")
    }
    }
    const deletionProcess = (request) => {
          if(!request){
            toast.warning("No selected request")
            return
          }
          setErrorMessage('');
          setDeleteConfirmation(true)
          setSelectedRequest(request)
    }
      return(
        <>
        {pendingConfirmation && (
          <Confirmation_Popup
          message={'Are you sure to approve this request?'}
          errorMessage={errorMessage}
          onConfirm={() => approveBorrow(selectedRequest)}
          onCancel={() => setPendingConfirmation(false)}/>
        )}
        {approveConfirmation && (
          <Confirmation_Popup
          message={'Are you sure to let borrow this request?'}
          errorMessage={errorMessage}
          onConfirm={() => updateBorrow(selectedRequest)}
          onCancel={() => setApproveConfirmation(false)}/>
        )}
        {returnConfirmation && (
          <Confirmation_Popup
          message={'Confirm the return of this book?'}
          errorMessage={errorMessage}
          onConfirm={() => ReturnBorrow(selectedRequest)}
          onCancel={() => setReturnConfirmation(false)}/>
        )}
        {deleteConfirmation && (
          <Confirmation_Popup
          message={'Are you sure to delete this request?'}
          errorMessage={errorMessage}
          onConfirm={() => deleteBorrow(selectedRequest)}
          onCancel={() => setDeleteConfirmation(false)}/>
        )}
        {isDeposit && (
          <DepositModal
          onConfirm={DepositRequest}
          idForm={idForm}
          setIdForm={setIdForm}
          depositLoading={depositLoading}
          onClose={() => setIsDeposit(false)}
          />
        )}
        {isDepositList && (
          <DepositListModal
          deposits={deposits}
          onClose={() => setIsDepositList(false)}
          />
        )}
        <Admin_Sidebar/>
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
              
              <Admin_Header mainText={'Borrowing Management'} subText={'Manage borrow request from users'}/>

              <div className="w-full justify-between items-center flex flex-col px-4 lg:px-10">

                <div className="w-full justify-between items-start flex flex-col sm:flex-row mb-4 gap-2">

                    <div className="flex items-center justify-start gap-2 w-full ">
                        <div className="bg-stone-800 rounded-lg p-2 text-white justify-center items-center flex">
                            <HandHelping size={20}/>
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-stone-800 rounded-full">Request Information</h1>
                            <p className="text-stone-400 text-[10px]">Manage user borrowing books.</p>
                        </div>
                    </div>

                    <div className="w-full justify-end items-center flex gap-2">
                      <button 
                      title="List of physical ID deposit"
                      className="bg-white p-2 rounded-lg text-stone-800 text-[10px] cursor-pointer hover:bg-stone-200 justify-center items-center flex gap-2"
                      onClick={() => setIsDepositList(true)}>
                        <IdCardLanyard size={15}/>
                      </button>
                      <button 
                      className="bg-stone-800 p-2 rounded-lg text-white text-[10px] cursor-pointer hover:bg-stone-900 justify-center items-center flex gap-2"
                      onClick={() => setIsDeposit(true)}>
                        <IdCard size={15}/>
                        <h1>Deposit Id</h1>
                      </button>
                        <select className="bg-white w-full sm:w-fit outline-none border border-stone-300 rounded-lg p-2 text-[10px] text-stone-500"
                        onChange={(e) => handleStatus(e.target.value)}>
                            <option value="">Select Status</option>
                            <option value="pending">Pending Status</option>
                            <option value="approved">Approved Status</option>
                            <option value="borrowed">Borrowed Status</option>
                            <option value="history">History/Record Status</option>
                        </select>
                    </div>
                        
                    
                    
                </div>

                <div className="w-full justify-start items-center flex gap-2 bg-stone-100 p-4 rounded-xl mb-4">
                  <Info size={12} className="text-stone-800"/>
                  <h1 className="text-xs text-stone-500">
                    Instruction: To be able to borrow a book, the person must present a valid physical ID.
                  </h1>
                </div>
                
                <div className="h-120 w-full border border-stone-300 bg-white rounded-lg p-2">

                  <div className="mb-2 w-full">
                      <div className="flex items-center justify-between rounded-lg border border-stone-300 bg-stone-100 px-4 py-3">
                        <div>
                          <h2 className="text-[10px] font-medium text-stone-700 capitalize">{`${selectedStatus || "Pending"} Request` || 'Select Status'}</h2>
                          <p className="mt-1 text-[10px] text-stone-500">
                            Showing list of request.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className=" h-100 w-full overflow-y-auto">
                      {/**Tables */}
                    {isPending && (
                        <PendingTable Pendings={Pendings}
                                    approveBorrow={confirmationProcess}
                                    deleteBorrow={deletionProcess}
                        />)}
                    {isApproved && (
                        <ApprovedTable Approved={Approved}
                                    returnDate={returnDate}
                                    setReturnDate={setReturnDate}
                                    quantity={quantity}
                                    setQuantity={setQuantity}
                                    updateBorrow={confirmationProcess}
                                    deleteBorrow={deletionProcess}
                        />)}
                    {isBorrowed && (
                        <BorrowedTable Borrowed={Borrowed}
                                    ReturnBorrow={confirmationProcess}
                        />)}
                    {isHistory && (
                      <HistoryTable Returned={Returned}
                      />)}
                    </div>
                    
                </div>
                
                
                        
              </div>
        </section>
        </>
      )
}
export default Admin_BorrowBook_Page;