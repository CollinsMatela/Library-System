import { useEffect } from "react";

const ReportFirstContainer = ({ reportData, setReportData }) => {
    // Shared input style so every field looks the same.
    const inputClass =
        "border border-stone-300 px-2 py-1.5 text-xs w-full outline-none rounded-lg transition-all duration-200 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 hover:border-stone-300";
    
    // Shared label style so every label looks the same.
    const labelClass = "text-xs font-semibold text-stone-500 mb-1 block";

    // Shared section title style so every title looks the same.
    const titleClass = "text-xs font-bold text-stone-700 mb-3 block";

    const pastMaterialsTotal = 
        reportData.pastMaterials.clippings +
        reportData.pastMaterials.electronics +
        reportData.pastMaterials.government_publication +
        reportData.pastMaterials.maps +
        reportData.pastMaterials.newspaper +
        reportData.pastMaterials.magazines;
    const pastBooks = reportData.pastCollection.books;
    const pastMaterials = reportData.pastCollection.non_books_materials;
    const TotalOfPastCollection = pastBooks + pastMaterials;
    useEffect(() => {
        setReportData((current) => ({
            ...current, pastCollection: {...current.pastCollection, non_books_materials: pastMaterialsTotal}
        }))
    }, [pastMaterialsTotal])

    // Add up the totals. Simple addition only.
    const totalBooks =
        reportData.fromNationalLibrary.books +
        reportData.fromDonations.books +
        reportData.purchased.books;

    const totalNonBooks =
        reportData.fromNationalLibrary.non_books +
        reportData.fromDonations.non_books;

    const totalOtherCollection =
        reportData.purchased.clippings +
        reportData.purchased.electronics +
        reportData.purchased.government_publication +
        reportData.purchased.maps +
        reportData.purchased.newspaper +
        reportData.purchased.magazines;
    
    // Non-Books Materials is every non-book item: the two Non-Books inputs
    // plus all the purchased non-book items.
    const totalNonBooksMaterials = totalNonBooks + totalOtherCollection;

    // Grand Total Collection = current collection (beginning of month)
    // plus the newly added items (Books + Non-Books Materials).
    const newBooks = reportData.fromNationalLibrary.books + reportData.fromDonations.books + reportData.purchased.books;
    const newMaterials = totalOtherCollection
    const grandTotalCollection = TotalOfPastCollection + newBooks + newMaterials + reportData.fromNationalLibrary.non_books + reportData.fromDonations.non_books;

    return (
        <div className="w-full px-4 md:px-6 bg-white">
            {/** Single container holding every section */}
            <div className="w-full bg-white rounded-lg border border-stone-300 shadow-sm">
                {/** Header: collection at the beginning of the month */}
                <div className="p-4 border-b border-stone-300">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-sm font-bold text-stone-800">
                                Collection at the Beginning of the Month (Past Record)
                            </h1>
                            <p className="text-xs text-stone-400 mt-1">
                                Manually encode the past record of books and non-books materials before adding new data.
                            </p>
                        </div>

                        {/* Past record inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <h1 className={labelClass}>Past Books</h1>
                                <input
                                    type="number"
                                    className={inputClass}
                                    placeholder="0"
                                    value={reportData.pastCollection?.books ?? 0}
                                    onChange={(e) =>
                                        setReportData((prevData) => ({
                                            ...prevData,
                                            pastCollection: {
                                                ...prevData.pastCollection,
                                                books: Number(e.target.value),
                                            },
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <h1 className={labelClass}>Past Non-Books Materials</h1>
                                <input
                                    type="number"
                                    className={`${inputClass} bg-stone-100 cursor-not-allowed`}
                                    placeholder="0"
                                    value={pastMaterialsTotal ?? 0}
                                    
                                />
                            </div>
                        </div>

                        {/* Past purchased breakdown */}
                        <div>
                            <h1 className={labelClass}>Materials Breakdown</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <div>
                                    <label className="text-[11px] text-stone-500 block mb-1">
                                        Clippings, Pamphlets, etc
                                    </label>
                                    <input
                                        type="number"
                                        className={inputClass}
                                        placeholder="0"
                                        value={reportData.pastMaterials?.clippings ?? 0}
                                        onChange={(e) =>
                                            setReportData((prevData) => ({
                                                ...prevData,
                                                pastMaterials: {
                                                    ...prevData.pastMaterials,
                                                    clippings: Number(e.target.value),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] text-stone-500 block mb-1">
                                        Electronic Resources
                                    </label>
                                    <input
                                        type="number"
                                        className={inputClass}
                                        placeholder="0"
                                        value={reportData.pastMaterials?.electronics ?? 0}
                                        onChange={(e) =>
                                            setReportData((prevData) => ({
                                                ...prevData,
                                                pastMaterials: {
                                                    ...prevData.pastMaterials,
                                                    electronics: Number(e.target.value),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] text-stone-500 block mb-1">
                                        Government Publication
                                    </label>
                                    <input
                                        type="number"
                                        className={inputClass}
                                        placeholder="0"
                                        value={reportData.pastMaterials?.government_publication ?? 0}
                                        onChange={(e) =>
                                            setReportData((prevData) => ({
                                                ...prevData,
                                                pastMaterials: {
                                                    ...prevData.pastMaterials,
                                                    government_publication: Number(e.target.value),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] text-stone-500 block mb-1">
                                        Maps
                                    </label>
                                    <input
                                        type="number"
                                        className={inputClass}
                                        placeholder="0"
                                        value={reportData.pastMaterials?.maps ?? 0}
                                        onChange={(e) =>
                                            setReportData((prevData) => ({
                                                ...prevData,
                                                pastMaterials: {
                                                    ...prevData.pastMaterials,
                                                    maps: Number(e.target.value),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] text-stone-500 block mb-1">
                                        Newspaper / Tabloid
                                    </label>
                                    <input
                                        type="number"
                                        className={inputClass}
                                        placeholder="0"
                                        value={reportData.pastMaterials?.newspaper ?? 0}
                                        onChange={(e) =>
                                            setReportData((prevData) => ({
                                                ...prevData,
                                                pastMaterials: {
                                                    ...prevData.pastMaterials,
                                                    newspaper: Number(e.target.value),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] text-stone-500 block mb-1">
                                        Serials / Magazine
                                    </label>
                                    <input
                                        type="number"
                                        className={inputClass}
                                        placeholder="0"
                                        value={reportData.pastMaterials?.magazines ?? 0}
                                        onChange={(e) =>
                                            setReportData((prevData) => ({
                                                ...prevData,
                                                pastMaterials: {
                                                    ...prevData.pastMaterials,
                                                    magazines: Number(e.target.value),
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Computed past total */}
                        <div className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 flex justify-between items-center">
                            <span className="text-xs font-semibold text-stone-600">
                                Past Total Collection (Computed)
                            </span>
                            <span className="text-xs font-bold text-stone-800">
                                {TotalOfPastCollection}
                            </span>
                        </div>
                    </div>
                </div>

                {/** Allocation from the National Library of Phils */}
                <div className="p-4 border-b border-stone-300">
                    <h1 className={titleClass}>
                        Allocation from the National Library of Phils
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <h1 className={labelClass}>Books</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.fromNationalLibrary.books}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        fromNationalLibrary: {
                                            ...prevData.fromNationalLibrary,
                                            books: Number(e.target.value),
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <h1 className={labelClass}>Non-Books</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.fromNationalLibrary.non_books}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        fromNationalLibrary: {
                                            ...prevData.fromNationalLibrary,
                                            non_books: Number(e.target.value),
                                        },
                                    }))
                                }
                            />
                        </div>
                    </div>
                </div>

                {/** Allocation from Donations */}
                <div className="p-4 border-b border-stone-300">
                    <h1 className={titleClass}>Allocation from Donations</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <h1 className={labelClass}>Books</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.fromDonations.books}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        fromDonations: {
                                            ...prevData.fromDonations,
                                            books: Number(e.target.value),
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <h1 className={labelClass}>Non-Books</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.fromDonations.non_books}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        fromDonations: {
                                            ...prevData.fromDonations,
                                            non_books: Number(e.target.value),
                                        },
                                    }))
                                }
                            />
                        </div>
                    </div>
                </div>

                {/** Purchased from local funds / in-house preparation */}
                <div className="p-4 border-b border-stone-300">
                    <h1 className={titleClass}>
                        Purchased from Local Funds / In-House Preparation
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <h1 className={labelClass}>Books</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.purchased.books}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        purchased: {
                                            ...prevData.purchased,
                                            books: Number(e.target.value),
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <h1 className={labelClass}>Clippings, Pamphlets, etc</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.purchased.clippings}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        purchased: {
                                            ...prevData.purchased,
                                            clippings: Number(e.target.value),
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <h1 className={labelClass}>Electronic Resources</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.purchased.electronics}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        purchased: {
                                            ...prevData.purchased,
                                            electronics: Number(e.target.value),
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <h1 className={labelClass}>Government Publication</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.purchased.government_publication}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        purchased: {
                                            ...prevData.purchased,
                                            government_publication: Number(e.target.value),
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <h1 className={labelClass}>Maps</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.purchased.maps}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        purchased: {
                                            ...prevData.purchased,
                                            maps: Number(e.target.value),
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <h1 className={labelClass}>Newspaper / Tabloid</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.purchased.newspaper}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        purchased: {
                                            ...prevData.purchased,
                                            newspaper: Number(e.target.value),
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <h1 className={labelClass}>Serials / Magazine</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.purchased.magazines}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        purchased: {
                                            ...prevData.purchased,
                                            magazines: Number(e.target.value),
                                        },
                                    }))
                                }
                            />
                        </div>
                    </div>
                </div>

                {/** Total Collections (last section, no border-b) */}
                <div className="p-4">
                    <h1 className={titleClass}>Total Collections</h1>
                    <p className="text-xs text-stone-400 mb-3">
                        Summary of all collected materials.
                    </p>

                    {/* Helper to format numbers nicely */}
                    {(() => {
                        const formatNumber = (num) => {
                            // Show 0 if the value is empty or not a number
                            const value = Number(num) || 0;
                            return value.toLocaleString("en-PH");
                        };

                        return (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* CURRENT COLLECTION - Collection at the beginning of the month */}
                                <div className="bg-stone-50 border border-stone-300 rounded-lg p-3">
                                    <h2 className="text-xs font-bold text-stone-700 mb-2">
                                        Current Collection (Beginning of Month)
                                    </h2>
                                    <div className="justify-between items-center flex mb-1.5">
                                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                                            Books
                                        </p>
                                        <p className="text-xs font-medium text-stone-800">
                                            {formatNumber(pastBooks) ?? 0}
                                        </p>
                                    </div>

                                    <div className="justify-between items-center flex mb-1.5">
                                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                                            Non-Books Materials
                                        </p>
                                        <p className="text-xs font-medium text-stone-800">
                                            {formatNumber(pastMaterials) ?? 0}
                                        </p>
                                    </div>
                                    {/* Past breakdown of purchased non-book items */}
                                    <div className="mt-2 mb-2">
                                        <p className="text-[11px] font-semibold text-stone-600 mb-1">
                                            Breakdown
                                        </p>
                                        <ul className="space-y-0.5 text-[11px] text-stone-500">
                                            <li className="flex justify-between">
                                                <span>Clippings, Pamphlets, etc:</span>
                                                <span>{formatNumber(reportData.pastMaterials.clippings)}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Electronic Resources:</span>
                                                <span>{formatNumber(reportData.pastMaterials.electronics)}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Government Publication:</span>
                                                <span>{formatNumber(reportData.pastMaterials.government_publication)}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Maps:</span>
                                                <span>{formatNumber(reportData.pastMaterials.maps)}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Newspaper / Tabloids:</span>
                                                <span>{formatNumber(reportData.pastMaterials?.newspaper ?? 0)}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Serials / Magazine:</span>
                                                <span>{formatNumber(reportData.pastMaterials?.magazines ?? 0)}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="justify-between items-center flex pt-2 border-t border-stone-300 mt-2">
                                        <p className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                                            Past Total Collection
                                        </p>
                                        <p className="text-xs font-bold text-stone-800">
                                            {formatNumber(TotalOfPastCollection ?? 0)}
                                        </p>
                                    </div>
                                </div>

                                {/* UPDATED COLLECTION - Newly added items this month */}
                                <div className="bg-stone-50 border border-stone-300 rounded-lg p-3">
                                    <h2 className="text-xs font-bold text-stone-700 mb-2">
                                        Updated Collection (New Additions)
                                    </h2>
                                    <div className="justify-between items-center flex mb-1.5">
                                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                                            Books 
                                        </p>
                                        <p className="text-xs font-medium text-stone-800">
                                            {formatNumber(totalBooks)}
                                        </p>
                                    </div>

                                    <div className="justify-between items-center flex mb-1.5">
                                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                                            Non-Books Materials 
                                        </p>
                                        <p className="text-xs font-medium text-stone-800">
                                            {formatNumber(totalNonBooksMaterials)}
                                        </p>
                                    </div>

                                    {/* Breakdown of purchased non-book items */}
                                    <div className="mt-2 mb-2">
                                        <p className="text-[11px] font-semibold text-stone-600 mb-1">
                                            Breakdown
                                        </p>
                                        <ul className="space-y-0.5 text-[11px] text-stone-500">
                                            <li className="flex justify-between">
                                                <span>Clippings, Pamphlets, etc:</span>
                                                <span>{formatNumber(reportData.purchased.clippings)}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Electronic Resources:</span>
                                                <span>{formatNumber(reportData.purchased.electronics)}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Government Publication:</span>
                                                <span>{formatNumber(reportData.purchased.government_publication)}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Maps:</span>
                                                <span>{formatNumber(reportData.purchased.maps)}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Newspaper / Tabloids:</span>
                                                <span>{formatNumber(reportData.purchased?.newspaper ?? 0)}</span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Serials / Magazine:</span>
                                                <span>{formatNumber(reportData.purchased?.magazines ?? 0)}</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="justify-between items-center flex pt-2 border-t border-stone-300 mt-2">
                                        <p className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                                            Grand Total Collection
                                        </p>
                                        <p className="text-xs font-bold text-stone-800">
                                            {formatNumber(grandTotalCollection ?? 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
};

export default ReportFirstContainer;
