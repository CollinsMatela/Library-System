const Lib_FilterStoryBooks = ({
  storyGenre,
  setStoryGenre,
  storySeries,
  setStorySeries,
  storyVolume,
  setStoryVolume,

}) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2">

      {/* Story Series */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Story Series"
        value={storySeries}
        onChange={(e) => setStorySeries(e.target.value)}
      />

      {/* Volume */}
      <input
        className="border border-gray-300 rounded-xl px-2 h-10"
        placeholder="Volume No."
        value={storyVolume}
        onChange={(e) => setStoryVolume(e.target.value)}
      />

      {/* Genre */}
      <select
        className="bg-gray-100 px-4 py-2 rounded-xl"
        value={storyGenre}
        onChange={(e) => setStoryGenre(e.target.value)}
      >
        <option value="">Genre</option>
        <option value="horror">Horror</option>
        <option value="fantasy">Fantasy</option>
        <option value="adventure">Adventure</option>
        <option value="mystery">Mystery</option>
      </select>

    </div>
  );
};

export default Lib_FilterStoryBooks;