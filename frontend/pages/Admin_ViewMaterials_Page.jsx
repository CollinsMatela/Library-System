import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/Admin_Sidebar";
import {
  BookOpenText,
  Book,
  ArrowLeft,
  ImageOff,
  LoaderCircle,
} from "lucide-react";
import { toast } from "react-toastify";

/* ------------------------------------------------------------------
   DetailRow
   One label and its value, used for every entry in "Book Details".
   The label never shrinks, and the value wraps instead of pushing
   the label off the row.
------------------------------------------------------------------ */
const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between gap-4 py-2 border-b border-stone-200">
    <span className="text-xs text-stone-500 shrink-0">{label}</span>
    <span className="text-xs text-stone-800 text-right break-words min-w-0">
      {String(value)}
    </span>
  </div>
);

/* ------------------------------------------------------------------
   buildDetailRows
   Turns the book object into the list of rows shown on the page.
   Fields that are empty are dropped here, so the JSX below only has
   to render whatever comes back.
------------------------------------------------------------------ */
const buildDetailRows = (book) => {
  if (!book) return [];

  const allFields = [
    // Basic information
    { label: "Category", value: book.category },
    { label: "Illustrator", value: book.illustrator },
    { label: "Language", value: book.language },
    { label: "Publisher", value: book.publisher },
    { label: "Publication Year", value: book.publication },
    { label: "Copies", value: book.copies },
    { label: "ISBN", value: book.isbn },
    { label: "Edition", value: book.edition },
    { label: "Volume", value: book.volume },

    // Science & Technology
    { label: "Scientific Field", value: book.scientificField },
    { label: "Mathematics Branch", value: book.mathBranch },
    { label: "Technology Field", value: book.technologyField },
    { label: "Engineering Discipline", value: book.engineeringDiscipline },
    { label: "Medical Field", value: book.medicalField },

    // Reference
    { label: "Reference Type", value: book.referenceType },
    { label: "Subject Area", value: book.subjectArea },
    { label: "Dictionary Type", value: book.dictionaryType },
    { label: "Geographic Coverage", value: book.geographicCoverage },

    // Education
    { label: "Subject", value: book.subject },
    { label: "Grade Level", value: book.gradeLevel },

    // Research
    { label: "Research Field", value: book.researchField },
    { label: "Institution", value: book.institution },
    { label: "DOI", value: book.doi },

    // Business & Economics
    { label: "Business Area", value: book.businessArea },
    { label: "Economics Branch", value: book.economicsBranch },
  ];

  return allFields.filter(
    (row) =>
      row.value !== null &&
      row.value !== undefined &&
      row.value !== "" &&
      row.value !== "—"
  );
};

const Admin_ViewMaterials_Page = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  /* Load the book. The request is written inside the effect so there is
     only one place to read, and the guard stops setState after the
     admin clicks "Back" while the request is still running. */
  useEffect(() => {
    let isMounted = true;

    const loadBook = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-book/${id}`
        );
        if (!isMounted) return;
        setBookDetails(res.data.book);
      } catch (error) {
        if (!isMounted) return;
        // Fall back to a friendly message when the server sends none.
        const message =
          error?.response?.data?.message || "Could not load this book.";
        setErrorMessage(message);
        toast.error(message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadBook();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Only filled fields end up in the details grid.
  const detailRows = buildDetailRows(bookDetails);

  // bookDetails.pages is an array of page entries, not a number.
  const pageCount = Array.isArray(bookDetails?.pages)
    ? bookDetails.pages.length
    : 0;

  const isAvailable = (bookDetails?.copies ?? 0) > 0;

  return (
    <>
      <AdminSidebar />

      <section className="bg-white min-h-screen w-full flex flex-col md:pl-20 lg:pl-60 pb-24 md:pb-10">
        {/* ---------------- Page header ---------------- */}
        <header className="w-full max-w-6xl px-4 sm:px-10 py-3 border-b flex justify-between items-center border-stone-200">

          <div className="mt-1">
            <h1 className="text-sm font-bold text-stone-800">
              Book Information
            </h1>
            <p className="text-xs text-stone-400">
              A read-only view of this library material.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/admin/catalog")}
            className="inline-flex items-center gap-1.5 p-2 -ml-2 rounded-xl text-xs text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to catalog</span>
          </button>
        </header>

        {/* ---------------- Page body ---------------- */}
        <main className="w-full max-w-6xl px-4 sm:px-10 mt-6 flex flex-col gap-5">
          {/* Anything that went wrong while loading */}
          {errorMessage && (
            <div className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-xs text-red-600">{errorMessage}</p>
            </div>
          )}

          {/* Still loading */}
          {isLoading && !errorMessage && (
            <div className="w-full py-16 flex items-center justify-center gap-2 text-stone-400">
              <LoaderCircle size={20} className="animate-spin" />
              <span className="text-xs">Loading book...</span>
            </div>
          )}

          {/* Finished, but nothing came back */}
          {!isLoading && !bookDetails && !errorMessage && (
            <div className="w-full py-12 px-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col items-center justify-center">
              <Book size={24} className="text-stone-300" />
              <p className="text-sm font-medium text-stone-700 mt-2">
                Book not found
              </p>
              <p className="text-xs text-stone-500 mt-1 text-center">
                This material may have been removed.
              </p>
            </div>
          )}

          {/* Loaded successfully */}
          {!isLoading && bookDetails && (
            <div className="w-full flex flex-col md:flex-row gap-6">
              {/* -------- Book cover -------- */}
              <div className="w-full md:w-72 lg:w-96 shrink-0">
                <div className="w-full max-w-80 md:max-w-none bg-stone-100 border border-stone-200 rounded-xl overflow-hidden flex items-center justify-center">
                  {bookDetails?.cover ? (
                    <img
                      src={bookDetails.cover}
                      alt={`Cover of ${bookDetails?.title || "this book"}`}
                      className="w-full aspect-[3/4] object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] flex flex-col items-center justify-center gap-2">
                      <ImageOff size={50} className="text-stone-300" />
                      <p className="text-xs text-stone-400">
                        No cover available
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* -------- Book information -------- */}
              <div className="w-full min-w-0 flex flex-col gap-5">
                {/* Title, author and badges */}
                <div className="flex flex-col gap-3 border-b border-stone-200 pb-4">
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold italic text-stone-800 break-words">
                      {bookDetails?.title || "Untitled book"}
                    </h2>
                    <p className="text-xs text-stone-500 mt-1 break-words">
                      By {bookDetails?.author || "Unknown author"}
                    </p>
                  </div>

                  {/* Wraps to a new line on narrow screens */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                        isAvailable
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-stone-100 text-stone-500 border-stone-200"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isAvailable ? "bg-green-500" : "bg-stone-400"
                        }`}
                      />
                      {isAvailable ? "Available" : "Not Available"}
                    </span>

                    {bookDetails?.category && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-stone-200 text-stone-700">
                        <Book size={14} />
                        {bookDetails.category}
                      </span>
                    )}

                    {pageCount > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-stone-200 text-stone-700">
                        <BookOpenText size={14} />
                        {pageCount} Pages
                      </span>
                    )}
                  </div>
                </div>

                {/* -------- Description -------- */}
                <div className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-stone-800">
                    Description
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed mt-2 whitespace-pre-line break-words">
                    {bookDetails?.description || "No description provided."}
                  </p>
                </div>

                {/* -------- Book details -------- */}
                <div className="w-full">
                  <h3 className="text-sm font-bold text-stone-800 mb-1">
                    Book Details
                  </h3>

                  {detailRows.length === 0 ? (
                    <p className="text-xs text-stone-400 py-2">
                      No extra details were added for this book.
                    </p>
                  ) : (
                    /* One column on phones, two on tablets and up */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                      {detailRows.map((row) => (
                        <DetailRow
                          key={row.label}
                          label={row.label}
                          value={row.value}
                        />
                      ))}
                    </div>
                  )}

                  {/* The ID is handy for support, so it gets its own line */}
                  {bookDetails?._id && (
                    <div className="mt-3 pt-3 border-t border-stone-200 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-stone-400">
                        Book ID
                      </span>
                      <span className="text-[11px] text-stone-600 font-mono break-all">
                        {bookDetails._id}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </section>
    </>
  );
};

export default Admin_ViewMaterials_Page;
