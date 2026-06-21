const Lib_FilterReferenceBooks = ({
  referenceType,
  setReferenceType,
  referenceSubjectArea,
  setReferenceSubjectArea,
  referenceEdition,
  setReferenceEdition,
  referenceVolume,
  setReferenceVolume,

}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2">

      {/* Reference Type */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Reference Type"
        value={referenceType}
        onChange={(e) => setReferenceType(e.target.value)}
      />

      {/* Subject Area */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Subject Area"
        value={referenceSubjectArea}
        onChange={(e) => setReferenceSubjectArea(e.target.value)}
      />

      {/* Edition */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Edition"
        value={referenceEdition}
        onChange={(e) => setReferenceEdition(e.target.value)}
      />

      {/* Volume */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Volume"
        value={referenceVolume}
        onChange={(e) => setReferenceVolume(e.target.value)}
      />

    </div>
  );
};

export default Lib_FilterReferenceBooks;