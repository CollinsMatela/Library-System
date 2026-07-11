const Catalog_BookInformation = ({
    language,
    setLanguage,
    publication,
    setPublication,
    publisher,
    setPublisher,
    isbn,
    setIsbn,
    ddc,
    setDdc,
    callNumber,
    setCallNumber,
    series,
    setSeries,
    edition,
    setEdition,
    volume,
    setVolume,
}) => {

    const fields = [
        {
            label: "Language",
            value: language,
            set: setLanguage,
            placeholder: "Select language",
            type: "select",
            options: ["English", "Filipino"],
        },
        {
            label: "Publication",
            value: publication,
            set: setPublication,
            placeholder: "Enter publication year",
            type: "number",
        },
        {
            label: "Publisher",
            value: publisher,
            set: setPublisher,
            placeholder: "Enter publisher",
            type: "text",
        },
        {
            label: "ISBN",
            value: isbn,
            set: setIsbn,
            placeholder: "Enter ISBN",
            type: "text",
        },
        {
            label: "DDC",
            value: ddc,
            set: setDdc,
            placeholder: "Enter Dewey Decimal Classification",
            type: "text",
        },
        {
            label: "Call Number",
            value: callNumber,
            set: setCallNumber,
            placeholder: "Enter call number",
            type: "text",
        },
        {
            label: "Series",
            value: series,
            set: setSeries,
            placeholder: "Enter series",
            type: "text",
        },
        {
            label: "Edition",
            value: edition,
            set: setEdition,
            placeholder: "Enter edition",
            type: "text",
        },
        {
            label: "Volume",
            value: volume,
            set: setVolume,
            placeholder: "Enter volume",
            type: "text",
        },
    ];

    return (
        <div className="w-full grid grid-cols-3 gap-4">
            {fields.map((field) => (
                <div key={field.label} className="flex flex-col gap-1">
                    <label className="text-xs text-gray-500">
                        {field.label}
                    </label>

                    {field.type === "select" ? (
                        <select
                            value={field.value}
                            onChange={(e) => field.set(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl outline-none"
                        >
                            <option value="">
                                {field.placeholder}
                            </option>

                            {field.options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            value={field.value}
                            placeholder={field.placeholder}
                            onChange={(e) => field.set(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl outline-none"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Catalog_BookInformation;