import { CalendarDays } from "lucide-react";

function ReportHeaderContainer({ reportData, setReportData }) {
    const currentYear = reportData?.year ?? new Date().getFullYear();

    const month = reportData?.month ?? String(new Date().getMonth() + 1);

    const updateMonth = (value) => {
        setReportData?.((prev) => ({ ...prev, month: value }));
    };

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    return (
        <div className="w-full px-4 md:px-6 bg-white">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Report Title */}
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                        <CalendarDays size={18} />
                        Library Reports
                    </div>

                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold tracking-tight text-stone-900">
                            Monthly Report
                        </h1>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                            {currentYear}
                        </span>
                    </div>

                    <p className="text-sm text-stone-500">
                        Library operations and usage statistics
                    </p>
                </div>

                {/* Divider (visible on larger screens) */}
                <div className="hidden sm:block h-12 w-px bg-stone-200" />

                {/* Report Filters */}
                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                            Month
                        </label>

                        <select
                            value={month}
                            onChange={(e) => updateMonth(e.target.value)}
                            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            {months.map((name, index) => (
                                <option key={name} value={String(index + 1)}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ReportHeaderContainer;
