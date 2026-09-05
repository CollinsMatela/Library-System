
import { Search } from "lucide-react";
import { categories, gradeLevels, subjects, fields } from "../../mockdata";

const inputClassName =
  "mt-1 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-xs text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const AdvancedSearch = ({ filters, onFilterChange, onClear, onSubmit, FindBook }) => {
  return (
    <div className="mb-2 w-full bg-white">
      <form onSubmit={onSubmit} className="w-full overflow-hidden rounded-lg border border-stone-300 bg-white">
        <header className="border-b border-stone-300 p-4">
          <h1 className="text-xs  text-stone-800">Advanced Searching</h1>
          <p className="mt-1 text-xs text-stone-500">
            Fill in any fields below to find your book.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-x-4 gap-y-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-xs  text-stone-500">
            Category
            <select name="category" value={filters.category} onChange={onFilterChange} className={inputClassName}>
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </label>
          <label className="text-xs  text-stone-500">
            Field
            <select name="field" value={filters.field} onChange={onFilterChange} className={inputClassName}>
              <option value="">All fields</option>
              {fields.map((field) => (
                <option key={field.value} value={field.value}>{field.label}</option>
              ))}
            </select>
          </label>
          <label className="text-xs  text-stone-500">
            Grade Level
            <select name="gradeLevel" value={filters.gradeLevel} onChange={onFilterChange} className={inputClassName}>
              <option value="">All grade levels</option>
              {gradeLevels.map((gradeLevel) => (
                <option key={gradeLevel.value} value={gradeLevel.value}>{gradeLevel.label}</option>
              ))}
            </select>
          </label>
          <label className="text-xs  text-stone-500">
            Subject
            <select name="subject" value={filters.subject} onChange={onFilterChange} className={inputClassName}>
              <option value="">All subjects</option>
              {subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>{subject.label}</option>
              ))}
            </select>
          </label>
          <label className="text-xs  text-stone-500">
            Language
            <select name="language" value={filters.language} onChange={onFilterChange} className={inputClassName}>
              <option value="">All Language</option>
              <option value="english">English</option>
              <option value="filipino">Filipino</option>
              <option value="english & filipino">English & filipino</option>
            </select>
          </label>
          <FilterFields label="Author" name="author" value={filters.author} onChange={onFilterChange} placeholder="e.g., Jose Rizal" />
          <FilterFields label="Publisher" name="publisher" value={filters.publisher} onChange={onFilterChange} placeholder="Enter publisher" />
          <FilterFields label="ISBN" name="isbn" value={filters.isbn} onChange={onFilterChange} placeholder="Enter ISBN" />
          <FilterFields label="Publication Year" name="publication" value={filters.publication} onChange={onFilterChange} type="number" placeholder="e.g., 2024" />
          <FilterFields label="Edition" name="edition" value={filters.edition} onChange={onFilterChange} placeholder="e.g., 2nd edition" />
          <FilterFields label="Volume" name="volume" value={filters.volume} onChange={onFilterChange} placeholder="e.g., Volume 1" />
          <FilterFields label="DDC Classification" name="ddc" value={filters.ddc} onChange={onFilterChange} placeholder="e.g., 500" />
          <FilterFields label="Call Number" name="callNumber" value={filters.callNumber} onChange={onFilterChange} placeholder="Enter call number" />
          <FilterFields label="Number of Copies" name="copies" value={filters.copies} onChange={onFilterChange} type="number" min="1" placeholder="e.g., 5" />
          <FilterFields label="Donated From" name="donatedFrom" value={filters.donatedFrom} onChange={onFilterChange} placeholder="Enter donor name" />
          <FilterFields label="Received Date" name="receivedDate" value={filters.receivedDate} onChange={onFilterChange} type="date" />
          <FilterFields label="Illustrator" name="illustrator" value={filters.illustrator} onChange={onFilterChange} placeholder="Enter illustrator" />
          <FilterFields label="Series" name="series" value={filters.series} onChange={onFilterChange} placeholder="Enter series name" />
        </div>

        <footer className="flex items-center justify-end gap-2 border-t border-stone-300 p-4">
          <button type="button" onClick={onClear} className="rounded-lg border border-stone-300 px-3 py-2 text-xs text-stone-500 transition hover:bg-stone-100">Clear</button>
          <button type="submit" className="rounded-lg border border-stone-800 bg-stone-800 px-3 py-2 text-xs text-white transition hover:bg-stone-900 justify-center items-center flex gap-1" onClick={FindBook}>
           <Search size={15}/>
            Find Books
          </button>
        </footer>
      </form>
    </div>
  );
};

const FilterFields = ({ label, name, type = "text", ...props }) => (
  <label className="text-xs  text-stone-500">
    {label}
    <input name={name} type={type} className={inputClassName} {...props} />
  </label>
);

export default AdvancedSearch;
