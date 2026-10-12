import { useState } from "react"
import Admin_Header from "./Admin_Header"
import Admin_SideBar from "./Admin_Sidebar"
import ReportFirstContainer from "./Report_Components/ReportFirstContainer"
const Admin_Report = () => {

    const [reportData, setReportData] = useState({
    totalCollection: 0,

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

    reader_boys: {
        children: 0,
        adult: 0
    },

    reader_girls: {
        children: 0,
        adult: 0
    },

    numberOfComputerUser: 0,

    computer_boys: {
        children: 0,
        adult: 0
    },

    computer_girls: {
        children: 0,
        adult: 0
    },

    consultedBooks: 0,
    circulatedBooks: 0,

    consultedSerials: 0,
    circulatedSerials: 0,

    consultedClippings: 0,
    circulatedClippings: 0,

    consultedThesis: 0,
    circulatedThesis: 0,

    librarian_name: ""
    });

    return(
        <>
        <Admin_SideBar/>
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
            <Admin_Header mainText={'Report'} subText={'Create monthly library report'}/>

            <ReportFirstContainer 
            reportData={reportData}
            setReportData={setReportData}
            />
            
        </section>
        </>
    )
}
export default Admin_Report