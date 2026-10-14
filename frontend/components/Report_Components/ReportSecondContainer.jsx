import { useEffect } from "react";

// ========== SHARED STYLES ==========
// These keep every input, label, and title looking the same.

const inputClass =
    "border border-stone-300 px-2 py-1.5 text-xs w-full outline-none rounded-lg transition-all duration-200 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 hover:border-stone-300";

const labelClass = "text-xs font-semibold text-stone-500 mb-1 block";

// ========== HELPER: Create a simple number input ==========
// Kept at module scope so its component identity stays stable across
// renders. An inner component would be re-created every render, causing
// React to remount the input and lose focus after each keystroke.
const NumberInput = ({ label, value, onChange }) => (
    <div>
        <label className={labelClass}>{label}</label>
        <input
            type="number"
            className={inputClass}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
        />
    </div>
);

const ReportSecondContainer = ({ reportData, setReportData }) => {

    const titleClass = "text-xs font-bold text-stone-700 mb-3 block";

    // ========== LIBRARY READERS ==========
    

    // Update the total number of readers
    useEffect(() => {
    let totalChildrenBoys = reportData.reader_boys.children
    let totalAdultBoys = reportData.reader_boys.adult

    let totalChildrenGirls = reportData.reader_girls.children
    let totalAdultGirls = reportData.reader_girls.adult

    let overallComputation = totalChildrenBoys + totalAdultBoys + totalAdultGirls + totalChildrenGirls;
    setReportData((prev) => ({ ...prev, numberOfReader: overallComputation }));
    }, [reportData.reader_boys, reportData.reader_girls])

    // Update boys children OR boys adult
    const updateReaderBoys = (field, value) => {
        setReportData((prev) => ({
            ...prev,
            reader_boys: { ...prev.reader_boys, [field]: value },
        }));
    };

    // Update girls children OR girls adult
    const updateReaderGirls = (field, value) => {
        setReportData((prev) => ({
            ...prev,
            reader_girls: { ...prev.reader_girls, [field]: value },
        }));
    };

    // ========== COMPUTER USERS ==========

    // Update the total number of computer users
    useEffect(() => {
    let totalChildrenBoys = reportData.computer_boys.children
    let totalAdultBoys = reportData.computer_boys.adult

    let totalChildrenGirls = reportData.computer_girls.children
    let totalAdultGirls = reportData.computer_girls.adult

    let overallComputation = totalChildrenBoys + totalAdultBoys + totalAdultGirls + totalChildrenGirls;
    setReportData((prev) => ({ ...prev, numberOfComputerUser: overallComputation }));
    }, [reportData.computer_boys, reportData.computer_girls])

    // Update boys children OR boys adult
    const updateComputerBoys = (field, value) => {
        setReportData((prev) => ({
            ...prev,
            computer_boys: { ...prev.computer_boys, [field]: value },
        }));
    };

    // Update girls children OR girls adult
    const updateComputerGirls = (field, value) => {
        setReportData((prev) => ({
            ...prev,
            computer_girls: { ...prev.computer_girls, [field]: value },
        }));
    };

    // ========== NUMBER OF DAYS ==========

    const updateDays = (value) => {
        setReportData((prev) => ({ ...prev, numberOfDays: value }));
    };

    // ========== RENDER ==========

    return (
        <>
            <div className="w-full rounded-lg px-4 md:px-6">
                <div className="w-full border border-stone-200 shadow-sm rounded-lg">

                    {/* ===== HEADER ===== */}
                    <div className="p-4 border-b border-stone-300">
                        <h1 className="text-sm font-bold text-stone-800">
                            Library Operations and Usage Report
                        </h1>
                        <p className="text-xs text-stone-400 mt-1">
                            Record the library's operational days and service usage for the reporting period.
                        </p>
                    </div>

                    {/* ===== NO. OF DAYS (LIBRARY OPERATION) ===== */}
                    <div className="p-4 border-b border-stone-300">
                        <h1 className={titleClass}>No. of Days (Library Operation)</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <NumberInput
                                label="Number of Days"
                                value={reportData.numberOfDays}
                                onChange={updateDays}
                            />
                        </div>
                    </div>

                    {/* ===== NO. OF LIBRARY READERS ===== */}
                    <div className="p-4 border-b border-stone-300">
                        <h1 className={titleClass}>No. of Library Readers</h1>

                        <div className="gap-3">
                            {/* Total Computer Users */}
                            <div className="flex gap-2 bg-stone-200 w-fit rounded-lg px-4 py-1">
                                <h1 className="text-xs text-stone-800 font-semibold">Total Readers</h1>
                                <h1 className="text-xs text-stone-800 font-semibold">{reportData.numberOfReader}</h1>
                            </div>
                        </div>

                        {/* Boys Section */}
                        <div className="mt-4">
                            <h1 className={labelClass}>
                                Boys — Total: {reportData.reader_boys.children + reportData.reader_boys.adult}
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <NumberInput
                                    label="Children"
                                    value={reportData.reader_boys.children}
                                    onChange={(val) => updateReaderBoys("children", val)}
                                />
                                <NumberInput
                                    label="Adult"
                                    value={reportData.reader_boys.adult}
                                    onChange={(val) => updateReaderBoys("adult", val)}
                                />
                            </div>
                        </div>

                        {/* Girls Section */}
                        <div className="mt-4">
                            <h1 className={labelClass}>
                                Girls — Total: {reportData.reader_girls.children + reportData.reader_girls.adult}
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <NumberInput
                                    label="Children"
                                    value={reportData.reader_girls.children}
                                    onChange={(val) => updateReaderGirls("children", val)}
                                />
                                <NumberInput
                                    label="Adult"
                                    value={reportData.reader_girls.adult}
                                    onChange={(val) => updateReaderGirls("adult", val)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ===== NO. OF COMPUTER USERS ===== */}
                    <div className="p-4 border-b border-stone-300">
                        <h1 className={titleClass}>No. of Computer Users</h1>

                        <div className="gap-3">
                            {/* Total Computer Users */}
                            <div className="flex gap-2 bg-stone-200 w-fit rounded-lg px-4 py-1">
                                <h1 className="text-xs text-stone-800 font-semibold">Total Computer User</h1>
                                <h1 className="text-xs text-stone-800 font-semibold">{reportData.numberOfComputerUser}</h1>
                            </div>
                        </div>

                        {/* Boys Section */}
                        <div className="mt-4">
                            <h1 className={labelClass}>
                                Boys — Total: {reportData.computer_boys.children + reportData.computer_boys.adult}
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <NumberInput
                                    label="Children"
                                    value={reportData.computer_boys.children}
                                    onChange={(val) => updateComputerBoys("children", val)}
                                />
                                <NumberInput
                                    label="Adult"
                                    value={reportData.computer_boys.adult}
                                    onChange={(val) => updateComputerBoys("adult", val)}
                                />
                            </div>
                        </div>

                        {/* Girls Section */}
                        <div className="mt-4">
                            <h1 className={labelClass}>
                                Girls — Total: {reportData.computer_girls.children + reportData.computer_girls.adult}
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <NumberInput
                                    label="Children"
                                    value={reportData.computer_girls.children}
                                    onChange={(val) => updateComputerGirls("children", val)}
                                />
                                <NumberInput
                                    label="Adult"
                                    value={reportData.computer_girls.adult}
                                    onChange={(val) => updateComputerGirls("adult", val)}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ReportSecondContainer;
