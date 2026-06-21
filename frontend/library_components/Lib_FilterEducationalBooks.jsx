
const Lib_FilterEducationalBooks = ({
  educationalSubject,
  setEducationalSubject,
  educationalEdition,
  setEducationalEdition,
}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2">

      {/* Subject */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Subject"
        value={educationalSubject}
        onChange={(e) => setEducationalSubject(e.target.value)}
      />

      {/* Edition */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Edition"
        value={educationalEdition}
        onChange={(e) => setEducationalEdition(e.target.value)}
      />

    </div>
  );
};

export default Lib_FilterEducationalBooks;