
import { useState } from "react";
import { Check } from "lucide-react";

const Account_Conformation = ({newAccountDetails, closeAccountConfirmation}) => {

    return (
        <section className="flex items-center justify-center h-screen">
            
                <div className="fixed inset-0 z-150 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
                    
                    <div className="bg-white rounded-2xl w-lg shadow-xl border border-stone-300">
                        <h1 className="text-lg text-stone-800 font-bold p-4 border-b border-stone-300">
                         Save this account
                        </h1>
                        
                        <div className="p-4">
                             <div className="bg-yellow-100 border border-yellow-500 rounded-xl p-4">
                            <h1 className="text-lg font-bold text-yellow-800 mb-2">
                                 Important Notice
                            </h1>

                            <p className="text-xs text-yellow-700 mb-3">
                                This is the <span className="font-semibold">only time</span> you will see the account password number.
                            </p>

                            <p className="text-xs text-yellow-700 mb-3">
                                Please make sure to <span className="font-semibold">save or copy it now</span>. 
                                You will not be able to view this PIN again after closing this window.
                            </p>

                            <p className="text-xs text-yellow-700">
                                If the PIN is lost, the account will need to be reset by an administrator.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl w-full mt-4 px-4">
                            <h1 className="text-sm font-bold text-stone-800 mb-2">
                                Account Details
                            </h1>
                            <h1 className="text-xs text-stone-500">Name: {newAccountDetails?.role || "—"} {newAccountDetails?.name || "—"}</h1>
                            <h1 className="text-xs text-stone-500">Username: {newAccountDetails?.username || "—"}</h1>
                            <h1 className="text-xs text-stone-500">Password: {newAccountDetails?.password || "—"}</h1>
                        </div>
                        </div>
                       

                        <div className="w-full justify-end items-end flex p-4 border-t border-stone-300">
                            <button 
                                onClick={() => {
                                    closeAccountConfirmation();
                                }}
                                className="p-2 bg-stone-800 hover:bg-stone-900 text-white text-xs cursor-pointer justify-center items-center flex gap-2"
                            >
                                <Check size={15}/> Confirm
                            </button>
                        </div>
                    </div>

                </div>
            

        </section>
    );
};

export default Account_Conformation;