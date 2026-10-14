// ========== SHARED STYLES ==========

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

const ReportThirdContainer = ({ reportData, setReportData }) => {

    const groupTitleClass = "text-xs font-bold text-stone-700 mb-2 block";

    // ========== UPDATE HANDLER ==========

    const updateField = (key, value) => {
        setReportData((prev) => ({ ...prev, [key]: value }));
    };

    // ========== FIELD GROUPS ==========

    const groups = [
        {
            title: "Books",
            fields: [
                { label: "No. of books consulted:", key: "consultedBooks" },
                { label: "No. of books circulated:", key: "circulatedBooks" },
            ]
        },
        {
            title: "Serials",
            fields: [
                { label: "No. of serials consulted:", key: "consultedSerials" },
                { label: "No. of serials circulated:", key: "circulatedSerials" },
            ]
        },
        {
            title: "Clippings",
            fields: [
                { label: "No. of clippings consulted:", key: "consultedClippings" },
                { label: "No. of clippings circulated:", key: "circulatedClippings" },
            ]
        },
        {
            title: "Thesis",
            fields: [
                { label: "No. of thesis consulted:", key: "consultedThesis" },
                { label: "No. of thesis circulated:", key: "circulatedThesis" },
            ]
        },
    ];

    // ========== RENDER ==========

    return (
        <div className="w-full rounded-lg px-4 md:px-6">
            <div className="w-full border border-stone-200 shadow-sm rounded-lg">

                {/* ===== HEADER ===== */}
                <div className="p-4 border-b border-stone-300">
                    <h1 className="text-sm font-bold text-stone-800">
                        Library Collection Usage Report
                    </h1>
                    <p className="text-xs text-stone-400 mt-1">
                        Record the usage of books, serials, clippings, and thesis for the reporting period.
                    </p>
                </div>

                {groups.map((group, gi) => (
                    <div key={group.title} className={`p-4 ${gi < groups.length - 1 ? "border-b border-stone-300" : ""}`}>
                        <h2 className={groupTitleClass}>{group.title}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {group.fields.map((field) => (
                                <NumberInput
                                    key={field.key}
                                    label={field.label}
                                    value={reportData[field.key]}
                                    onChange={(val) => updateField(field.key, val)}
                                />
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ReportThirdContainer;
