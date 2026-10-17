import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/Admin_Sidebar";
import { BookOpenText, Book, ArrowLeft, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import EmptyState from "../components/EmptyState";

/* ------------------------------------------------------------------
   InfoRow
   One label and its value.
   If the value is empty, the row renders nothing at all.
------------------------------------------------------------------ */
const InfoRow = ({ label, value }) => {
  const isEmpty =
    value === null || value === undefined || value === "" || value === "—";

  if (isEmpty) return null;

  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-xs text-stone-500 shrink-0">{label}</span>
      <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
        {String(value)}
      </span>
    </div>
  );
};

/* ------------------------------------------------------------------
   InfoSection
   A titled group of rows inside the "Book Information" card.
   The whole section hides itself when every row is empty.
------------------------------------------------------------------ */
const InfoSection = ({ title, rows }) => {
  const hasRows = rows.some(
    (row) =>
      row.value !== null &&
      row.value !== undefined &&
      row.value !== "" &&
      row.value !== "—"
  );

  if (!hasRows) return null;

  return (
    <div className="py-2 border-t border-stone-200">
      <h2 className="text-[11px] font-semibold text-stone-600 mb-2">{title}</h2>
      <div className="flex flex-col divide-y divide-stone-100">
        {rows.map((row) => (
          <InfoRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </div>
  );
};

const Admin_ViewMaterials_Page = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  /* Load the book when the page opens. */
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

  // bookDetails.pages is an array of page entries, not a number.
  const pageCount = Array.isArray(bookDetails?.pages)
    ? bookDetails.pages.length
    : 0;

  const isAvailable = (bookDetails?.copies ?? 0) > 0;

  /* The groups shown inside the "Book Information" card.
     InfoRow hides empty values, and InfoSection hides empty groups. */
  const basicInformationRows = [
    { label: "Category", value: bookDetails?.category },
    { label: "Language", value: bookDetails?.language },
    { label: "Publisher", value: bookDetails?.publisher },
    { label: "Publication Year", value: bookDetails?.publication },
    { label: "ISBN", value: bookDetails?.isbn },
    { label: "Edition", value: bookDetails?.edition },
    { label: "Volume", value: bookDetails?.volume },
    { label: "Copies", value: bookDetails?.copies },
    { label: "Pages", value: pageCount > 0 ? `${pageCount} pages` : null },
  ];

  const classificationRows = [
    { label: "Call Number", value: bookDetails?.callNumber },
    { label: "DDC", value: bookDetails?.ddc },
  ];

  const additionalInformationRows = [
    { label: "Illustrator", value: bookDetails?.illustrator },
    { label: "Series", value: bookDetails?.series },
    { label: "Moral", value: bookDetails?.moral },
    { label: "Field", value: bookDetails?.field },
    { label: "Subject", value: bookDetails?.subject },
    { label: "Grade Level", value: bookDetails?.gradeLevel },
    { label: "Donated From", value: bookDetails?.donatedFrom },
    {
      label: "Received Date",
      value: bookDetails?.receivedDate
        ? new Date(bookDetails.receivedDate).toLocaleDateString()
        : null,
    },
  ];

  return (
    <>
      <AdminSidebar />

      <section className="bg-white min-h-screen w-full flex flex-col md:pl-20 lg:pl-60 pb-24 md:pb-10">
        {/* ---------------- Page header ---------------- */}
        <header className="w-full bg-white justify-between items-center border-b border-stone-300 flex p-3 px-4">
          <div className="mt-1">
            <h1 className="text-sm font-semibold text-stone-800">
              Book Information
            </h1>
            <p className="text-[10px] text-stone-400">
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
        <main className="w-full max-w-6xl px-4 mt-4 flex flex-col gap-5">
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
            <div className="h-fit w-80 bg-black">
              <EmptyState
                title="No Book Found"
                description="This book is not available."
              />
            </div>
          )}

          {/* Loaded successfully */}
          {!isLoading && bookDetails && (
            <div className="w-full flex flex-col lg:flex-row gap-4">
              {/* -------- Book cover (left) -------- */}
              <div className="bg-white w-full lg:w-80 shrink-0 flex flex-col gap-4">
                {bookDetails?.cover ? (
                  <img
                    src={bookDetails.cover}
                    alt={`Cover of ${bookDetails?.title || "this book"}`}
                    className="bg-stone-100 h-100 w-full max-w-80 object-cover object-top rounded-lg"
                  />
                ) : (
                  <div className="h-fit w-full lg:w-80 border border-stone-300 rounded-xl">
                    <EmptyState
                      title="No Cover Found"
                      description="This book does not have a cover image yet."
                    />
                  </div>
                )}
              </div>

              {/* -------- Book information (right) -------- */}
              <div className="w-full min-w-0 flex flex-col gap-5">
                {/* Title, author and badges */}
                <div className="w-full flex flex-col gap-2 border-stone-300 border-b pb-4">
                  <h1 className="text-stone-800 text-xl font-bold wrap-break-words">
                    {bookDetails?.title || "Untitled book"}
                  </h1>
                  <p className="text-xs text-stone-500 wrap-break-words">
                    {bookDetails?.author || "Unknown Author"}
                  </p>

                  {/* Wraps to a new line on narrow screens */}
                  <div className="flex flex-wrap items-center gap-2 mt-1">
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

                {/* -------- Book information card -------- */}
                <div className="w-full flex flex-col gap-2 border border-stone-300 rounded-lg overflow-hidden">
                  <div className="w-full bg-white border-b border-stone-300 p-3">
                    <h1 className="text-xs text-stone-600 font-bold">
                      Book Information
                    </h1>
                    <p className="text-[11px] text-stone-500">
                      Quick preview of the book's key details
                    </p>
                  </div>

                  <div className="w-full px-3 pb-2 flex flex-col gap-2">
                    <InfoSection
                      title="Basic Information"
                      rows={basicInformationRows}
                    />
                    <InfoSection
                      title="Classification"
                      rows={classificationRows}
                    />
                    <InfoSection
                      title="Additional Information"
                      rows={additionalInformationRows}
                    />

                    {/* Description */}
                    {bookDetails?.description && (
                      <div className="py-2 border-t border-stone-200">
                        <h2 className="text-[11px] font-semibold text-stone-600 mb-2">
                          Description
                        </h2>
                        <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">
                          {bookDetails.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* The ID is handy for support, so it gets its own line */}
                {bookDetails?._id && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-stone-400">Book ID</span>
                    <span className="text-[11px] text-stone-600 font-mono break-all">
                      {bookDetails._id}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </section>
    </>
  );
};

export default Admin_ViewMaterials_Page;
