


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

    const Pendings = borrowList.filter((request) => request.status === 'Pending').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const Approved = borrowList.filter((request) => request.status === 'Approved').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const Borrowed = borrowList.filter((request) => request.status === 'Borrowed').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const Returned = borrowList.filter((request) => request.status === 'Returned').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    const updateBorrow = async (borrow) => {
          if(!returnDate || !quantity) {
            toast.warning('Please select date and quantity.')
            return;
          }

          const borrowData = {
                id: borrow._id,
                borrowDate: new Date().toISOString().split("T")[0],
                returnDate: returnDate.split("T")[0],
                status: 'Borrowed',
                quantity: quantity,

                bookId: borrow.bookId,
                userId: borrow.userId
          }

          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-borrow`, borrowData);
            toast.success(res.data.message);
            fetchAllBorrow();
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    const approveBorrow = async (borrow) => {
          const data = {
                id: borrow._id,
                status: 'Approved'
          }
          try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/approve-borrow`, data);
            toast.success(res.data.message);
            fetchAllBorrow();
          } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message)
          }
    }

    const deleteBorrow = async (borrow) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-borrow/${borrow._id}`)
            toast.success(res.data.message);
            fetchAllBorrow();
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
                {isPending && (
                    <PendingTable Pendings={Pendings}
                                  approveBorrow={approveBorrow}
                                  deleteBorrow={deleteBorrow}
                    />)}
                {isApproved && (
                    <ApprovedTable Approved={Approved}
                                   returnDate={returnDate}
                                   setReturnDate={setReturnDate}
                                   quantity={quantity}
                                   setQuantity={setQuantity}
                                   updateBorrow={updateBorrow}
                                   deleteBorrow={deleteBorrow}
                    />)}
                {isBorrowed && (
                    <BorrowedTable Borrowed={Borrowed}
                                   ReturnBorrow={ReturnBorrow}
                    />)}
                {isHistory && (<HistoryTable Returned={Returned}/>)}
                
                        
              </div>
        </section>
        </>
      )
}
export default Admin_BorrowBook_Page;