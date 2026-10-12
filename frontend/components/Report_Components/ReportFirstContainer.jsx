const ReportFirstContainer = ({ reportData, setReportData }) => {
    // Shared input style so every field looks the same.
    const inputClass =
        "border border-stone-300 px-2 py-1.5 text-xs w-full outline-none rounded-lg transition-all duration-200 focus:ring-2 focus:ring-stone-300 focus:border-stone-400 hover:border-stone-300";

    // Shared label style so every label looks the same.
    const labelClass = "text-xs font-semibold text-stone-500 mb-1 block";

    // Shared section title style so every title looks the same.
    const titleClass = "text-xs font-bold text-stone-700 mb-3 block";

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
    const grandTotalCollection =
        reportData.totalCollection + totalBooks + totalNonBooksMaterials;

    return (
        <div className="w-full p-4 md:p-6">
            {/** Single container holding every section */}
            <div className="w-full bg-white rounded-lg border border-stone-300 shadow-sm">
                {/** Header: collection at the beginning of the month */}
                <div className="p-4 border-b border-stone-300">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                        <div>
                            <h1 className="text-sm font-bold text-stone-800">
                                Collection at the Beginning of the Month
                            </h1>
                            <p className="text-xs text-stone-400 mt-1">
                                Total collection before any new additions.
                            </p>
                        </div>
                        <div className="w-full md:w-40">
                            <h1 className={labelClass}>Total Collection</h1>
                            <input
                                type="number"
                                className={inputClass}
                                value={reportData.totalCollection}
                                onChange={(e) =>
                                    setReportData((prevData) => ({
                                        ...prevData,
                                        totalCollection: Number(e.target.value),
                                    }))
                                }
                            />
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-stone-50 border border-stone-300 rounded-lg p-3">
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Books</p>
                            <p className="text-2xl font-bold text-stone-800 mt-1">{totalBooks}</p>
                        </div>
                        <div className="bg-stone-50 border border-stone-300 rounded-lg p-3">
                            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Non-Books Materials</p>
                            <p className="text-2xl font-bold text-stone-800 mt-1">{totalNonBooksMaterials}</p>
                        </div>
                    </div>

                    <ul className="mt-3 space-y-1 text-xs text-stone-500">
                        <li>Clippings, Pamphlets, etc: {reportData.purchased.clippings}</li>
                        <li>Electronic Resources: {reportData.purchased.electronics}</li>
                        <li>Government Publication: {reportData.purchased.government_publication}</li>
                        <li>Maps: {reportData.purchased.maps}</li>
                        <li>Newspaper / Tabloids: {reportData.purchased.newspaper}</li>
                        <li>Serials / Magazine: {reportData.purchased.magazines}</li>
                    </ul>

                    {/** Grand Total Collection */}
                    <div className="mt-4 bg-stone-800 text-white rounded-lg px-4 py-3 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wide text-stone-300">
                            Grand Total Collection
                        </p>
                        <p className="text-2xl font-bold">{grandTotalCollection}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportFirstContainer;
