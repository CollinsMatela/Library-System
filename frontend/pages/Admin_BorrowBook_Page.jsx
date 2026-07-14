


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Admin_Sidebar from '../components/Admin_Sidebar'
import { Check, X } from "lucide-react";
import { toast } from "react-toastify";
import PendingTable from "./Borrowing_Components/PendingTable";
import ApprovedTable from "./Borrowing_Components/ApprovedTable";
import BorrowedTable from "./Borrowing_Components/BorrowedTable";
import HistoryTable from "./Borrowing_Components/HistoryTable";

const Admin_BorrowBook_Page = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [borrowList, setBorrowList] = useState([]);

    const Pendings = borrowList.filter((request) => request.status === 'Pending');
    const Approved = borrowList.filter((request) => request.status === 'Approved');
    const Borrowed = borrowList.filter((request) => request.status === 'Borrowed');
    const Returned = borrowList.filter((request) => request.status === 'Returned');

    const [isPending, setIsPending] = useState(true);
    const [isApproved, setIsApproved] = useState(false);
    const [isBorrowed, setIsBorrowed] = useState(false);
    const [isHistory, setIsHistory] = useState(false);

    const [returnDate, setReturnDate] = useState('')
    const [quantity, setQuantity] = useState(0);

    const fetchAllBorrow = async () => {
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-all-borrow`);
            setBorrowList(res.data.borrows);
            toast.success(res.data.message);
          } catch (error) {
            toast.error(error?.response?.dat?.message);
          }
    }

    const updateStatus = async () => {

          const borrowData = {
                borrowDate: new Date().getDate(),
                returnDate: returnDate,
                status: 'Approved',
                quantity: quantity
          }

          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-borrow`, borrowData);
            toast.success(res.data.message);
          } catch (error) {
            toast.error(error?.response?.dat?.message);
          }
    }

    useEffect(() => {
        fetchAllBorrow();
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

      return(
        <>
        <Admin_Sidebar/>
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col py-10 pl-90 pr-10">
              
              <header className="w-full justify-between items-start flex flex-col mb-10 border-b border-gray-300 pb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Borrowing Books Management</h1>
                    <h1 className="text-gray-400 text-md">Manage borrow request from user</h1>
                </div>
                    
              </header>

              <div className="h-20 w-full justify-between items-center flex flex-col rounded-t-xl">

                <div className="w-full justify-between items-start flex">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Borrowing Table</h1>
                        <h1 className="text-gray-400 text-md">Review, approve, and monitor book borrowing requests from library users.</h1>
                    </div>

                    <div className="flex gap-2">
                        <button
                            className={`${
                                isPending ? "bg-black text-white" : "bg-gray-100 text-black"
                            } flex items-center gap-2 px-4 py-2 rounded-xl text-sm hover:-translate-y-1 transition cursor-pointer`}
                            onClick={handlePending}
                        >
                            Pending
                            <span className="font-semibold">{Pendings.length || 0}</span>
                        </button>

                        <button
                            className={`${
                                isApproved ? "bg-black text-white" : "bg-gray-100 text-black"
                            } flex items-center gap-2 px-4 py-2 rounded-xl text-sm hover:-translate-y-1 transition cursor-pointer`}
                            onClick={handleApproved}
                        >
                            Approved
                            <span className="font-semibold">{Approved.length || 0}</span>
                        </button>

                        <button
                            className={`${
                                isBorrowed ? "bg-black text-white" : "bg-gray-100 text-black"
                            } flex items-center gap-2 px-4 py-2 rounded-xl text-sm hover:-translate-y-1 transition cursor-pointer`}
                            onClick={handleBorrowed}
                        >
                            Borrowed
                            <span className="font-semibold">{Borrowed.length || 0}</span>
                        </button>

                        <button
                            className={`${
                                isHistory ? "bg-black text-white" : "bg-gray-100 text-black"
                            } flex items-center gap-2 px-4 py-2 rounded-xl text-sm hover:-translate-y-1 transition cursor-pointer`}
                            onClick={handleHistory}
                        >
                            History
                            <span className="font-semibold">{Returned.length || 0}</span>
                        </button>
                        
                    </div>
                    
                </div>
                
                {/**Tables */}
                {isPending && (<PendingTable Pendings={Pendings}/>)}
                {isApproved && (<ApprovedTable Approved={Approved}/>)}
                {isBorrowed && (<BorrowedTable Borrowed={Borrowed}/>)}
                {isHistory && (<HistoryTable Returned={Returned}/>)}
                
                        
              </div>
        </section>
        </>
      )
}
export default Admin_BorrowBook_Page;