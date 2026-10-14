import { useEffect, useState } from "react"
import Admin_Header from "./Admin_Header"
import Admin_SideBar from "./Admin_Sidebar"
import ReportModal from "../modals/ReportModal"
import axios from "axios"
import { toast } from "sonner"
import { Plus } from "lucide-react"
import useAuthStore from "../store/useAuthStore"
const Admin_Report = () => {
    const user = useAuthStore((state) => state.user)
    const [isSaving, setIsSaving] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [isReportModal, setIsReportModal] = useState(false)

    const [reports, setReports] = useState([])

    let createInitialReportData = () => ({
    month: String(new Date().getMonth() + 1),
    year: new Date().getFullYear(),

    totalCollection: 0,

    pastCollection: {
        books: 0,
        non_books_materials: 0
    },

    pastMaterials: {
        clippings: 0,
        electronics: 0,
        government_publication: 0,
        maps: 0,
        newspaper: 0,
        magazines: 0
    },

    fromNationalLibrary: {
        books: 0,
        non_books: 0
    },

    fromDonations: {
        books: 0,
        non_books: 0
    },

    purchased: {
        books: 0,
        magazines: 0,
        newspaper: 0,
        clippings: 0,
        electronics: 0,
        government_publication: 0,
        maps: 0
    },

    numberOfDays: 0,
    numberOfReader: 0,

    reader_boys: { children: 0, adult: 0 },
    reader_girls: { children: 0, adult: 0 },

    numberOfComputerUser: 0,

    computer_boys: { children: 0, adult: 0 },
    computer_girls: { children: 0, adult: 0 },

    consultedBooks: 0,
    circulatedBooks: 0,
    consultedSerials: 0,
    circulatedSerials: 0,
    consultedClippings: 0,
    circulatedClippings: 0,
    consultedThesis: 0,
    circulatedThesis: 0,

    librarian_name: `${user?.firstname ?? ""} ${user?.lastname ?? ""}`.trim()
});
    
    const [reportData, setReportData] = useState(createInitialReportData);
    const resetForm = () => {
        setReportData(createInitialReportData())
    };

    const reportRequest = async () => {
        setIsSaving(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/submit-report`, { reportData: reportData });
            toast.success(res.data?.message || "Report saved successfully");
            resetForm();
            setIsReportModal(false);
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Request Failed")
        } finally {
            setIsSaving(false);
        }
    }
    const fetchReports = async () => {
          setIsFetching(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-reports`);
            toast.success(res.data?.message || "Report fetched successfully");
            setReports(res.data.reports)

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Request Failed")
        } finally {
            setIsFetching(false);
        }
    }

    useEffect(() => {
        let loadData = async () => {
            setIsFetching(true);

            try {
                await fetchReports();
            } catch (error) {
                toast.error("Failed to load data");
            } finally {
                setIsFetching(false);
            }
        };

        loadData();
    }, []);

    return(
        <>
        {isReportModal && (
             <ReportModal 
             reportData={reportData}
             setReportData={setReportData}
             onClose={() => setIsReportModal(false)}
             onSave={reportRequest}
             isSaving={isSaving}
             />
        )}
        <Admin_SideBar/>
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
            <Admin_Header mainText={'Report'} subText={'Create monthly library report'}/>
            
            {/** Main Container*/}
            <div className="w-full px-4 lg:px-10">
                <div className="w-full justify-end items-end flex">
                <button className="p-2 rounded-lg bg-stone-800 justify-center items-center flex gap-1 hover:bg-stone-900 cursor-pointer"
                onClick={() => setIsReportModal(true)}>
                <Plus size={15} className="text-white"/>
                <h1 className="text-xs text-white">Add Report</h1>
                </button>
                </div>

                {reports.length === 0 && (
                    <p className="text-xs text-stone-400 mt-4">No reports yet.</p>
                )}

                <div className="w-full grid grid-cols-1 gap-4 mt-4">
                    {reports.map((report) => (
                        <div
                            key={report._id}
                            className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-all"
                        >
                            {/** Card header: month name + year */}
                            <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                                <h1 className="text-sm font-bold text-stone-800">
                                    {["January","February","March","April","May","June","July","August","September","October","November","December"][Number(report.month) - 1]} {report.year}
                                </h1>
                                <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 rounded-full px-2 py-0.5">
                                    Monthly Report
                                </span>
                            </div>

                            {/** Card body: report summary */}
                            <div className="flex flex-col gap-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-stone-500">Librarian</span>
                                    <span className="font-medium text-stone-800">{report.librarian_name || "—"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-500">Days of Operation</span>
                                    <span className="font-medium text-stone-800">{report.numberOfDays ?? 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-500">Library Readers</span>
                                    <span className="font-medium text-stone-800">{report.numberOfReader ?? 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-500">Computer Users</span>
                                    <span className="font-medium text-stone-800">{report.numberOfComputerUser ?? 0}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            
        </section>
        </>
    )
}
export default Admin_Report
