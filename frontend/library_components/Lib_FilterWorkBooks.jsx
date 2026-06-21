const Lib_FilterWorkBooks = ({
  workbookTopic,
  setWorkbookTopic,
  workbookSubject,
  setWorkbookSubject,
  workbookType,
  setWorkbookType,
  workbookEdition,
  setWorkbookEdition,

}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2">

      {/* Topic */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Topic"
        value={workbookTopic}
        onChange={(e) => setWorkbookTopic(e.target.value)}
      />

      {/* Subject */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Subject"
        value={workbookSubject}
        onChange={(e) => setWorkbookSubject(e.target.value)}
      />

      {/* Workbook Type */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Workbook Type"
        value={workbookType}
        onChange={(e) => setWorkbookType(e.target.value)}
      />

      {/* Edition */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Edition"
        value={workbookEdition}
        onChange={(e) => setWorkbookEdition(e.target.value)}
      />

    </div>
  );
};

export default Lib_FilterWorkBooks;