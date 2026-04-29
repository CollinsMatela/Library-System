
import { useState } from "react";

const Account_Conformation = ({newAccountDetails, closeAccountConfirmation}) => {

    return (
        <section className="flex items-center justify-center h-screen">
            
                <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-50" onClick={closeAccountConfirmation}>
                    
                    <div className="bg-white rounded-2xl p-6 w-[500px] shadow-xl">
                        <h2 className="text-xl text-emerald-800 font-bold mb-3">
                            ‼️ Save this account
                        </h2>

                        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4">
                            <h1 className="text-lg font-bold text-yellow-800 mb-2">
                                ⚠️ Important Notice
                            </h1>

                            <p className="text-sm text-yellow-700 mb-3">
                                This is the <span className="font-semibold">only time</span> you will see the account PIN number.
                            </p>

                            <p className="text-sm text-yellow-700 mb-3">
                                Please make sure to <span className="font-semibold">save or copy it now</span>. 
                                You will not be able to view this PIN again after closing this window.
                            </p>

                            <p className="text-sm text-yellow-700">
                                If the PIN is lost, the account will need to be reset by an administrator.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl w-full mt-4">
                            <h1 className="text-lg font-bold text-emerald-800 mb-2">
                                Account Details
                            </h1>
                            <h1 className="text-md font-semibold text-gray-500">Name: {newAccountDetails.role} {newAccountDetails.name}</h1>
                            <h1 className="text-md font-semibold text-gray-500">Username: {newAccountDetails.username}</h1>
                            <h1 className="text-md font-semibold text-gray-500">Password: {newAccountDetails.password}</h1>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => {
                                    alert("Confirmed!");
                                    closeAccountConfirmation;
                                }}
                                className="px-4 py-2 bg-emerald-500 text-white rounded-lg mt-4 cursor-pointer"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>

                </div>
            

        </section>
    );
};

export default Account_Conformation;