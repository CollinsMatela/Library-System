import { useEffect, useState } from "react"
import Admin_Header from "./Admin_Header"
import Admin_SideBar from "./Admin_Sidebar"
import ReportModal from "../modals/ReportModal"
import axios from "axios"
import { toast } from "sonner"
import { Calendar, FileText, LoaderCircle, Pencil, Plus, Printer, Trash2 } from "lucide-react"
import useAuthStore from "../store/useAuthStore"
import Confirmation_Popup from "../popup/Confirmation_Popup"
import NaicLogo from '../src/assets/NaicLibraryLogo.png'
import EmptyState from "../components/EmptyState"
import '../src/index.css'

const Admin_Report = () => {
    const user = useAuthStore((state) => state.user)
    const [errorMessage, setErrorMessage] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isReportModal, setIsReportModal] = useState(false)

    const [showDeleteConfirmation, setIsShowDeleteConformation] = useState(false)

    const [reports, setReports] = useState([])
    const [selectedReport, setSelectedReport] = useState(null)

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
            fetchReports()
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response?.data?.message || "Request Failed")
            toast.error(error.response?.data?.message || "Request Failed")
        } finally {
            setIsSaving(false);
        }
    }

    const deleteRequest = async () => {
          setIsDeleting(true);
        try {
            alert(selectedReport._id)
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-report/${selectedReport._id}`);
            toast.success(res.data?.message || "Report deleted successfully");
            fetchReports()
            setIsShowDeleteConformation(false)
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response?.data?.message || "Request Failed")
            toast.error(error.response?.data?.message || "Delete Failed")
        } finally {
            setIsDeleting(false);
        }
    }
    const fetchReports = async () => {
          setIsFetching(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-reports`);
            setReports(res.data.reports)

        } catch (error) {
            console.log(error)
            setErrorMessage(error.response?.data?.message || "Request Failed")
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

    let currentYear = new Date().getFullYear();
    let [selectedYear, setSelectedYear] = useState(currentYear);
    let years = Array.from(
        { length: currentYear - 2000 + 1 },
        (_, index) => currentYear - index
    );
    let months = [
    { label: "Jan", value: 1 },
    { label: "Feb", value: 2 },
    { label: "Mar", value: 3 },
    { label: "Apr", value: 4 },
    { label: "May", value: 5 },
    { label: "Jun", value: 6 },
    { label: "Jul", value: 7 },
    { label: "Aug", value: 8 },
    { label: "Sept", value: 9 },
    { label: "Oct", value: 10 },
    { label: "Nov", value: 11 },
    { label: "Dec", value: 12 }
];

    let monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const filterHelper = (month, year) => {
    if (!month || !year) {
        toast.warning("Select month and year");
        return;
    }

    let report = reports.find((report) => {
        return (
            String(report.month) === String(month) &&
            Number(report.year) === Number(year)
        );
    });

    setSelectedReport(report || null);
};

    // Values used by the printable (formal) report.
    const report = selectedReport ?? {};
    const monthLabel = monthNames[Number(report.month) - 1] ?? "";

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
        {showDeleteConfirmation && (
            <Confirmation_Popup
            errorMessage={errorMessage || ""}
            message={'Do you want to delete this report?'}
            onCancel={() => {setIsShowDeleteConformation(false); setErrorMessage('')}}
            onConfirm={deleteRequest}
            isLoading={isDeleting}
            confirmLabel="Delete"
            />
        )}
        <div className="no-print">
            <Admin_SideBar/>
        </div>
        <section className="no-print bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60 pb-10">
            <Admin_Header mainText={'Report'} subText={'Create monthly library report'}/>
            
            {/** Main Container*/}
            <div className="w-full px-4 lg:px-10">

                    
             
                {/**Filter by month and year container */}
                <div className="w-full py-2 border-b border-stone-300 justify-center items-center flex">
                    <div className="w-full justify-start items-center flex gap-2">
                        <h1 className="text-[11px] text-stone-500">Filter by months</h1>
                    
                    </div>
                    <div className="flex gap-2">
                         <div className="w-fit justify-center items-center flex border border-stone-300 rounded-full p-2">
                          <Calendar size={12} className="text-stone-500"/>
                    <select
                        defaultValue=""
                        onChange={(e) => filterHelper(Number(e.target.value), selectedYear)}
                        className=" bg-white text-stone-500 outline-none text-[11px]"
                    >
                        <option value="" disabled>
                            Month
                        </option>

                        {months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                    </div>
                    <div className="w-fit justify-center items-center flex border border-stone-300 rounded-full p-2">
                        <Calendar size={12} className="text-stone-500"/>
                        <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className=" bg-white text-stone-500 outline-none text-[11px] px-2"
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    </div>
                    </div>


                    <div className="w-full justify-end items-end flex">
                    <button className="py-2 px-4 rounded-full bg-stone-800 justify-center items-center flex gap-1 hover:bg-stone-900 cursor-pointer"
                    onClick={() => setIsReportModal(true)}>
                    <Plus size={15} className="text-white"/>
                    <h1 className="text-[10px] text-white">Add Report</h1>
                    </button>
                    </div>
                   
                    
                </div>

                

                

                <div className="w-full grid grid-cols-1 gap-4 mt-4">
                    {!selectedReport || selectedReport.length === 0 ? 
                    (
                        <EmptyState title="No Monthly Report" description="No existing report in selected month and year" action={() => setIsReportModal(true)} actionName={"Create Report"}/>
                    )
                    :
                    (
                     <div className="flex flex-col gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">

                        {/* Card header */}
                        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                            <h1 className="text-sm font-bold text-stone-800">
                                {[
                                    "January", "February", "March", "April",
                                    "May", "June", "July", "August",
                                    "September", "October", "November", "December"
                                ][Number(selectedReport.month) - 1]}{" "}
                                {selectedReport.year}
                            </h1>

                            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-500">
                                Monthly Report
                            </span>
                        </div>

                        {/* Card body */}
                        <div className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">

                            {/* Collection */}
                            <div>
                                <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">Collection</h2>
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Total Collection</span>
                                        <span className="font-medium text-stone-800">{selectedReport.totalCollection ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Past Books & Non-Book Materials</span>
                                        <span className="font-medium text-stone-800">{(selectedReport.pastCollection?.books ?? 0) + (selectedReport.pastCollection?.non_books_materials ?? 0)}</span>
                                    </div>
                                    
                                </div>
                            </div>

                            {/* Past Materials */}
                            <div>
                                <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">Past Materials</h2>
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Clippings</span>
                                        <span className="font-medium text-stone-800">{selectedReport.pastMaterials?.clippings ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Electronics</span>
                                        <span className="font-medium text-stone-800">{selectedReport.pastMaterials?.electronics ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Government Publication</span>
                                        <span className="font-medium text-stone-800">{selectedReport.pastMaterials?.government_publication ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Maps</span>
                                        <span className="font-medium text-stone-800">{selectedReport.pastMaterials?.maps ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Newspaper</span>
                                        <span className="font-medium text-stone-800">{selectedReport.pastMaterials?.newspaper ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Magazines</span>
                                        <span className="font-medium text-stone-800">{selectedReport.pastMaterials?.magazines ?? 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* National Library */}
                            <div>
                                <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">From National Library</h2>
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Books</span>
                                        <span className="font-medium text-stone-800">{selectedReport.fromNationalLibrary?.books ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Non-Books</span>
                                        <span className="font-medium text-stone-800">{selectedReport.fromNationalLibrary?.non_books ?? 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Donations */}
                            <div>
                                <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">From Donations</h2>
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Books</span>
                                        <span className="font-medium text-stone-800">{selectedReport.fromDonations?.books ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Non-Books</span>
                                        <span className="font-medium text-stone-800">{selectedReport.fromDonations?.non_books ?? 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Purchased */}
                            <div>
                                <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">Purchased</h2>
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Books</span>
                                        <span className="font-medium text-stone-800">{selectedReport.purchased?.books ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Magazines</span>
                                        <span className="font-medium text-stone-800">{selectedReport.purchased?.magazines ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Newspaper</span>
                                        <span className="font-medium text-stone-800">{selectedReport.purchased?.newspaper ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Clippings</span>
                                        <span className="font-medium text-stone-800">{selectedReport.purchased?.clippings ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Electronics</span>
                                        <span className="font-medium text-stone-800">{selectedReport.purchased?.electronics ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Government Publication</span>
                                        <span className="font-medium text-stone-800">{selectedReport.purchased?.government_publication ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Maps</span>
                                        <span className="font-medium text-stone-800">{selectedReport.purchased?.maps ?? 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Operations */}
                            <div>
                                <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">Operations</h2>
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Days of Operation</span>
                                        <span className="font-medium text-stone-800">{selectedReport.numberOfDays ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Library Readers</span>
                                        <span className="font-medium text-stone-800">{selectedReport.numberOfReader ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Computer Users</span>
                                        <span className="font-medium text-stone-800">{selectedReport.numberOfComputerUser ?? 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Readers */}
                            <div>
                                <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">Readers Breakdown</h2>
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Boys — Children</span>
                                        <span className="font-medium text-stone-800">{selectedReport.reader_boys?.children ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Boys — Adult</span>
                                        <span className="font-medium text-stone-800">{selectedReport.reader_boys?.adult ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Girls — Children</span>
                                        <span className="font-medium text-stone-800">{selectedReport.reader_girls?.children ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Girls — Adult</span>
                                        <span className="font-medium text-stone-800">{selectedReport.reader_girls?.adult ?? 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Computer Users Breakdown */}
                            <div>
                                <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">Computer Users Breakdown</h2>
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Boys — Children</span>
                                        <span className="font-medium text-stone-800">{selectedReport.computer_boys?.children ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Boys — Adult</span>
                                        <span className="font-medium text-stone-800">{selectedReport.computer_boys?.adult ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Girls — Children</span>
                                        <span className="font-medium text-stone-800">{selectedReport.computer_girls?.children ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Girls — Adult</span>
                                        <span className="font-medium text-stone-800">{selectedReport.computer_girls?.adult ?? 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Usage */}
                            <div>
                                <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">Usage Statistics</h2>
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Consulted Books</span>
                                        <span className="font-medium text-stone-800">{selectedReport.consultedBooks ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Circulated Books</span>
                                        <span className="font-medium text-stone-800">{selectedReport.circulatedBooks ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Consulted Serials</span>
                                        <span className="font-medium text-stone-800">{selectedReport.consultedSerials ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Circulated Serials</span>
                                        <span className="font-medium text-stone-800">{selectedReport.circulatedSerials ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Consulted Clippings</span>
                                        <span className="font-medium text-stone-800">{selectedReport.consultedClippings ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Circulated Clippings</span>
                                        <span className="font-medium text-stone-800">{selectedReport.circulatedClippings ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Consulted Thesis</span>
                                        <span className="font-medium text-stone-800">{selectedReport.consultedThesis ?? 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Circulated Thesis</span>
                                        <span className="font-medium text-stone-800">{selectedReport.circulatedThesis ?? 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Librarian */}
                            <div>
                                <h2 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">Librarian</h2>
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-1 last:border-0">
                                        <span className="text-stone-500">Prepared By</span>
                                        <span className="font-medium text-stone-800">{selectedReport.librarian_name || "—"}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Card footer */}
                        <div className="flex items-center justify-between gap-2 border-t border-stone-200 pt-3">
                            <p className="text-[10px] text-stone-400">Report actions</p>
                            <div className="flex items-center gap-2">
                                {/* <button
                                    type="button"
                                    onClick={() => toast.info("Edit report coming soon")}
                                    className="flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-[11px] font-medium text-stone-600 transition cursor-pointer hover:bg-stone-100"
                                >
                                    <Pencil size={13} />
                                    Edit
                                </button> */}
                                <button
                                    type="button"
                                    onClick={() => setIsShowDeleteConformation(true)}
                                    disabled={isDeleting}
                                    className={`${isDeleting ? "border border-stone-200 bg-stone-100 text-stone-500" : "border border-red-200 bg-white text-red-600"} flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-medium transition cursor-pointer hover:bg-red-50`}
                                >
                                    {isDeleting ? (<LoaderCircle size={13} className="animate-spin"/>) : (<Trash2 size={13} />)}
                                    <h1>{isDeleting ? "...Deleting" : "Delete"}</h1>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="flex items-center gap-1 rounded-lg bg-stone-800 px-3 py-1.5 text-[11px] font-medium text-white transition cursor-pointer hover:bg-stone-900"
                                >
                                    <Printer size={13} />
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>
                    )
                    }
                </div>
            </div>
        </section>

        {/* Formal print layout — shown only when printing */}
        {selectedReport && (
            <div className="print-report">
                {/* Letterhead */}
                <header className="report-header">
                    <img src={NaicLogo} alt="Naic Municipal Library logo" className="report-logo" />

                    <div className="report-heading">
                        <h1 className="report-org">NAIC MUNICIPAL LIBRARY</h1>
                        <h2 className="report-doc-title">MONTHLY LIBRARY REPORT</h2>
                        <p className="report-period">For the Month of {monthLabel} {report.year}</p>
                    </div>
                </header>

                {/* I. Collection */}
                <h3 className="report-section-title">I. COLLECTION</h3>

                <table className="report-table">
                    <tbody>
                        <tr className="report-group">
                            <td colSpan={2}>Collection at the Beginning of the Month</td>
                        </tr>
                        <tr>
                            <td>Books</td>
                            <td className="report-value">{report.pastCollection?.books ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Non-Book Materials</td>
                            <td className="report-value">{report.pastCollection?.non_books_materials ?? 0}</td>
                        </tr>
                        <tr className="report-subtotal">
                            <td>Subtotal — Past Collection</td>
                            <td className="report-value">
                                {(report.pastCollection?.books ?? 0) + (report.pastCollection?.non_books_materials ?? 0)}
                            </td>
                        </tr>

                        <tr className="report-group">
                            <td colSpan={2}>From the National Library</td>
                        </tr>
                        <tr>
                            <td>Books</td>
                            <td className="report-value">{report.fromNationalLibrary?.books ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Non-Books</td>
                            <td className="report-value">{report.fromNationalLibrary?.non_books ?? 0}</td>
                        </tr>

                        <tr className="report-group">
                            <td colSpan={2}>From Donations</td>
                        </tr>
                        <tr>
                            <td>Books</td>
                            <td className="report-value">{report.fromDonations?.books ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Non-Books</td>
                            <td className="report-value">{report.fromDonations?.non_books ?? 0}</td>
                        </tr>

                        <tr className="report-group">
                            <td colSpan={2}>Purchased from Local Funds / In-House Preparation</td>
                        </tr>
                        <tr>
                            <td>Books</td>
                            <td className="report-value">{report.purchased?.books ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Clippings, Pamphlets, etc.</td>
                            <td className="report-value">{report.purchased?.clippings ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Electronic Resources</td>
                            <td className="report-value">{report.purchased?.electronics ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Government Publication</td>
                            <td className="report-value">{report.purchased?.government_publication ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Maps</td>
                            <td className="report-value">{report.purchased?.maps ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Newspaper / Tabloid</td>
                            <td className="report-value">{report.purchased?.newspaper ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Serials / Magazine</td>
                            <td className="report-value">{report.purchased?.magazines ?? 0}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr className="report-total">
                            <td>Total Collection</td>
                            <td className="report-value">{report.totalCollection ?? 0}</td>
                        </tr>
                    </tfoot>
                </table>

                {/* II. Library Operations */}
                <h3 className="report-section-title">II. LIBRARY OPERATIONS</h3>

                <table className="report-table">
                    <tbody>
                        <tr>
                            <td>Number of Days of Operation</td>
                            <td className="report-value">{report.numberOfDays ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Total Number of Library Readers</td>
                            <td className="report-value">{report.numberOfReader ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Total Number of Computer Users</td>
                            <td className="report-value">{report.numberOfComputerUser ?? 0}</td>
                        </tr>
                    </tbody>
                </table>

                {/* III. Readers and Computer Users */}
                <h3 className="report-section-title">III. READERS AND COMPUTER USERS</h3>

                <table className="report-table">
                    <thead>
                        <tr>
                            <th>Library Readers</th>
                            <th>Children</th>
                            <th>Adult</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Boys</td>
                            <td className="report-value">{report.reader_boys?.children ?? 0}</td>
                            <td className="report-value">{report.reader_boys?.adult ?? 0}</td>
                            <td className="report-value">{(report.reader_boys?.children ?? 0) + (report.reader_boys?.adult ?? 0)}</td>
                        </tr>
                        <tr>
                            <td>Girls</td>
                            <td className="report-value">{report.reader_girls?.children ?? 0}</td>
                            <td className="report-value">{report.reader_girls?.adult ?? 0}</td>
                            <td className="report-value">{(report.reader_girls?.children ?? 0) + (report.reader_girls?.adult ?? 0)}</td>
                        </tr>
                        <tr className="report-total">
                            <td>Total</td>
                            <td className="report-value" colSpan={2}></td>
                            <td className="report-value">{report.numberOfReader ?? 0}</td>
                        </tr>
                    </tbody>
                </table>

                <table className="report-table">
                    <thead>
                        <tr>
                            <th>Computer Users</th>
                            <th>Children</th>
                            <th>Adult</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Boys</td>
                            <td className="report-value">{report.computer_boys?.children ?? 0}</td>
                            <td className="report-value">{report.computer_boys?.adult ?? 0}</td>
                            <td className="report-value">{(report.computer_boys?.children ?? 0) + (report.computer_boys?.adult ?? 0)}</td>
                        </tr>
                        <tr>
                            <td>Girls</td>
                            <td className="report-value">{report.computer_girls?.children ?? 0}</td>
                            <td className="report-value">{report.computer_girls?.adult ?? 0}</td>
                            <td className="report-value">{(report.computer_girls?.children ?? 0) + (report.computer_girls?.adult ?? 0)}</td>
                        </tr>
                        <tr className="report-total">
                            <td>Total</td>
                            <td className="report-value" colSpan={2}></td>
                            <td className="report-value">{report.numberOfComputerUser ?? 0}</td>
                        </tr>
                    </tbody>
                </table>

                {/* IV. Collection Usage */}
                <h3 className="report-section-title">IV. COLLECTION USAGE</h3>

                <table className="report-table">
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Consulted</th>
                            <th>Circulated</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Books</td>
                            <td className="report-value">{report.consultedBooks ?? 0}</td>
                            <td className="report-value">{report.circulatedBooks ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Serials</td>
                            <td className="report-value">{report.consultedSerials ?? 0}</td>
                            <td className="report-value">{report.circulatedSerials ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Clippings</td>
                            <td className="report-value">{report.consultedClippings ?? 0}</td>
                            <td className="report-value">{report.circulatedClippings ?? 0}</td>
                        </tr>
                        <tr>
                            <td>Thesis</td>
                            <td className="report-value">{report.consultedThesis ?? 0}</td>
                            <td className="report-value">{report.circulatedThesis ?? 0}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Signature */}
                <div className="report-signature">
                    <p className="report-sign-caption">Prepared by:</p>
                    <p className="report-sign-name">{report.librarian_name || "\u00A0"}</p>
                </div>
            </div>
        )}
        </>
    )
}
export default Admin_Report
