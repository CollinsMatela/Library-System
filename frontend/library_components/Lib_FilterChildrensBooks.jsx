const Lib_FilterChildrensBooks = ({
  childrensStoryType,
  setChildrensStoryType,
  childrensReadingLevel,
  setChildrensReadingLevel,

}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2">

      {/* Story Type */}
      <select
        className="bg-gray-100 px-4 py-2 rounded-xl"
        value={childrensStoryType}
        onChange={(e) => setChildrensStoryType(e.target.value)}
      >
        <option value="">Story Type</option>
        <option value="fairy_tale">Fairy Tale</option>
        <option value="adventure">Adventure</option>
        <option value="educational">Educational</option>
      </select>

      {/* Reading Level */}
      <select
        className="bg-gray-100 px-4 py-2 rounded-xl"
        value={childrensReadingLevel}
        onChange={(e) => setChildrensReadingLevel(e.target.value)}
      >
        <option value="">Reading Level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

    </div>
  );
};

export default Lib_FilterChildrensBooks;