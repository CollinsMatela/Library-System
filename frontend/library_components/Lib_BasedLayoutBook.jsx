import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Bold,
  Book,
  BookX,
  FileText,
  Italic,
  Minus,
  Pause,
  Play,
  Plus,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
  VolumeX,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  speak,
  pauseSpeech,
  resumeSpeech,
  stopSpeech,
} from '../utils/speech.js';
import DOMPurify from "dompurify";
import { PROSE_STYLES, QUILL_STYLES, htmlToText } from "../utils/readerHelpers.js";

// Reading preference scales. `textSize` / `textAlignment` are accepted as
// controlled props (the parent owns them) but fall back to local state so the
// reader also works standalone.
const TEXT_SIZE_SCALE = ["xs", "sm", "base", "lg", "xl"];
const DEFAULT_TEXT_SIZE = "base";

const TEXT_SIZE_CLASS = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const ALIGNMENT_CLASS = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const ALIGNMENT_OPTIONS = [
  { value: "left", icon: TextAlignStart, label: "Align left" },
  { value: "center", icon: TextAlignCenter, label: "Align center" },
  { value: "right", icon: TextAlignEnd, label: "Align right" },
  { value: "justify", icon: TextAlignJustify, label: "Justify text" },
];

/**
 * Reads a preference that the parent may or may not own.
 *
 * When a setter is supplied the parent stays the single source of truth,
 * otherwise the value falls back to local state seeded from the initial prop.
 */
const useControlledState = (value, setValue) => {
  const [uncontrolled, setUncontrolled] = useState(value);
  return setValue ? [value, setValue] : [uncontrolled, setUncontrolled];
};

/** Walks up to the nearest scrollable ancestor, falling back to the document. */
const findScrollParent = (node) => {
  let current = node;

  while (current && current !== document.body) {
    const { overflowY } = window.getComputedStyle(current);
    if (overflowY === "auto" || overflowY === "scroll") return current;
    current = current.parentElement;
  }

  return document.scrollingElement || document.documentElement;
};

const IconButton = ({
  label,
  onClick,
  theme,
  active = false,
  pressed,
  disabled = false,
  children,
}) => {
  const resting = theme
    ? "text-stone-400 hover:bg-stone-800 hover:text-stone-100"
    : "text-stone-500 hover:bg-stone-100 hover:text-stone-800";
  const activeTone = theme
    ? "bg-stone-700 text-white"
    : "bg-stone-900 text-white";
  const focusRing = theme
    ? "focus-visible:ring-stone-500 focus-visible:ring-offset-stone-900"
    : "focus-visible:ring-stone-400 focus-visible:ring-offset-white";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 ${focusRing} ${
        active ? activeTone : resting
      }`}
    >
      {children}
    </button>
  );
};

const PreferenceGroup = ({ theme, children }) => (
  <div
    className={`flex items-center gap-0.5 rounded-lg p-0.5 ${
      theme ? "bg-stone-800/60" : "bg-stone-100"
    }`}
  >
    {children}
  </div>
);

const Lib_BasedLayoutBook = ({
  book,
  showText,
  textSize,
  setTextSize,
  textAlignment,
  setTextAlignment,
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  theme,
  pageIndex,
  nextPage,
  prevPage,
}) => {
  const rootRef = useRef(null);

  const [size, setSize] = useControlledState(textSize, setTextSize);
  const [alignment, setAlignment] = useControlledState(
    textAlignment,
    setTextAlignment,
  );
  const [bold, setBold] = useControlledState(isBold, setIsBold);
  const [italic, setItalic] = useControlledState(isItalic, setIsItalic);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const pages = book?.pages ?? [];
  const totalPages = pages.length;
  const page = pages[pageIndex];
  const pageText = page?.pageText;

  const isFirst = pageIndex <= 0;
  const isLast = pageIndex >= totalPages - 1;
  const isOutOfRange = totalPages > 0 && pageIndex >= totalPages;

  const safeHtml = useMemo(
    () => (pageText ? DOMPurify.sanitize(pageText) : ""),
    [pageText],
  );

  const speechText = useMemo(
    () => (pageText ? htmlToText(pageText) : ""),
    [pageText],
  );

  const progress = totalPages
    ? Math.min(100, Math.round(((pageIndex + 1) / totalPages) * 100))
    : 0;

  const activeAlignment = ALIGNMENT_CLASS[alignment] ? alignment : "left";
  const isSmallestSize = size === TEXT_SIZE_SCALE[0];
  const isLargestSize = size === TEXT_SIZE_SCALE[TEXT_SIZE_SCALE.length - 1];

  // Stop narration whenever the page changes so a stale page is never read.
  useEffect(() => {
    return () => stopSpeech();
  }, [pageIndex]);

  // Return to the top of the reader on every page turn.
  useEffect(() => {
    findScrollParent(rootRef.current)?.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageIndex]);

  // `speak()` does not expose the utterance, so speech state is mirrored from
  // the synthesizer itself.
  useEffect(() => {
    const id = window.setInterval(() => {
      const synth = window.speechSynthesis;
      if (!synth) return;
      setIsSpeaking(synth.speaking);
      setIsPaused(synth.paused);
    }, 250);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      if (
        target?.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName ?? "")
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextPage?.();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevPage?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextPage, prevPage]);

  const stepTextSize = (direction) => {
    const index = TEXT_SIZE_SCALE.indexOf(size);
    const from = index === -1 ? TEXT_SIZE_SCALE.indexOf(DEFAULT_TEXT_SIZE) : index;
    const next = Math.min(
      TEXT_SIZE_SCALE.length - 1,
      Math.max(0, from + direction),
    );
    setSize(TEXT_SIZE_SCALE[next]);
  };

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      setIsPaused(false);
      return;
    }

    if (!speechText) return;
    speak(speechText);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handlePauseToggle = () => {
    if (!isSpeaking) return;
    if (isPaused) resumeSpeech();
    else pauseSpeech();
    setIsPaused((prev) => !prev);
  };

  const navResting = theme
    ? "text-stone-300 hover:bg-stone-800"
    : "text-stone-700 hover:bg-stone-100";

  const renderNavButton = (direction) => {
    const isPrev = direction === "prev";
    const atBound = isPrev ? isFirst : isLast;
    const Icon = isPrev ? ArrowLeft : ArrowRight;

    return (
      <button
        type="button"
        // Kept enabled at the bounds so the parent's toast feedback still fires.
        onClick={isPrev ? prevPage : nextPage}
        aria-label={isPrev ? "Previous page" : "Next page"}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
          theme
            ? "focus-visible:ring-stone-500 focus-visible:ring-offset-stone-900"
            : "focus-visible:ring-stone-400 focus-visible:ring-offset-white"
        } ${navResting} ${atBound ? "opacity-40" : ""}`}
      >
        <Icon size={15} aria-hidden="true" />
        <span className="hidden sm:inline">
          {isPrev ? "Prev" : "Next"}
        </span>
      </button>
    );
  };

  const showEmptyState = !showText || !pageText;

  return (
    <div
      ref={rootRef}
      className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pt-24 pb-32 sm:px-6 sm:pt-28 sm:pb-28"
    >
      {showEmptyState ? (
        <div
          className={`flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed px-6 py-20 text-center transition-colors duration-300 ${
            theme
              ? "border-stone-800 bg-stone-950"
              : "border-stone-300 bg-white/60"
          }`}
        >
          <span
            className={`flex size-14 items-center justify-center rounded-full ${
              theme ? "bg-stone-900 text-stone-600" : "bg-stone-100 text-stone-400"
            }`}
          >
            {showText ? (
              <BookX size={24} aria-hidden="true" />
            ) : (
              <FileText size={24} aria-hidden="true" />
            )}
          </span>

          <div className="space-y-1">
            <p
              className={`text-sm font-semibold ${
                theme ? "text-stone-200" : "text-stone-700"
              }`}
            >
              {showText ? "This page has no text yet" : "Text view is turned off"}
            </p>
            <p
              className={`mx-auto max-w-sm text-xs leading-relaxed ${
                theme ? "text-stone-500" : "text-stone-400"
              }`}
            >
              {showText
                ? "There is nothing to display on this page. Keep turning pages to continue reading."
                : "Switch the view back to text to continue reading this book."}
            </p>
          </div>

          {isOutOfRange && (
            <button
              type="button"
              onClick={prevPage}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 ${
                theme
                  ? "bg-stone-800 text-stone-200 hover:bg-stone-700 focus-visible:ring-stone-500"
                  : "bg-stone-900 text-white hover:bg-stone-700 focus-visible:ring-stone-400"
              }`}
            >
              <ArrowLeft size={15} aria-hidden="true" />
              Go back
            </button>
          )}
        </div>
      ) : (
        <article
          className={`flex w-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-colors duration-300 ${
            theme ? "border-stone-800 bg-stone-950" : "border-stone-200 bg-white"
          }`}
        >
          <header
            className={`flex flex-col gap-3 border-b px-4 py-3 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between ${
              theme
                ? "border-stone-800 bg-stone-900/40"
                : "border-stone-200 bg-stone-50/70"
            }`}
          >
            <div className="flex items-center justify-between gap-2 sm:justify-start">
              <span
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  theme
                    ? "bg-stone-800 text-stone-200"
                    : "bg-stone-100 text-stone-600"
                }`}
              >
                <Book size={13} aria-hidden="true" />
                Page {pageIndex + 1} of {totalPages}
              </span>

              <div className="flex items-center gap-1">
                <IconButton
                  label={
                    isSpeaking ? "Stop reading aloud" : "Read this page aloud"
                  }
                  onClick={handleSpeakToggle}
                  theme={theme}
                  active={isSpeaking}
                  pressed={isSpeaking}
                  disabled={!speechText}
                >
                  {isSpeaking ? (
                    <VolumeX size={15} aria-hidden="true" />
                  ) : (
                    <AudioLines size={15} aria-hidden="true" />
                  )}
                </IconButton>
                <IconButton
                  label={isPaused ? "Resume reading" : "Pause reading"}
                  onClick={handlePauseToggle}
                  theme={theme}
                  disabled={!isSpeaking}
                >
                  {isPaused ? (
                    <Play size={15} aria-hidden="true" />
                  ) : (
                    <Pause size={15} aria-hidden="true" />
                  )}
                </IconButton>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-1.5">
              <PreferenceGroup theme={theme}>
                <IconButton
                  label="Decrease text size"
                  onClick={() => stepTextSize(-1)}
                  theme={theme}
                  disabled={isSmallestSize}
                >
                  <Minus size={15} aria-hidden="true" />
                </IconButton>
                <span
                  className={`w-8 text-center text-[10px] font-bold tracking-wide uppercase ${
                    theme ? "text-stone-400" : "text-stone-500"
                  }`}
                >
                  {size}
                </span>
                <IconButton
                  label="Increase text size"
                  onClick={() => stepTextSize(1)}
                  theme={theme}
                  disabled={isLargestSize}
                >
                  <Plus size={15} aria-hidden="true" />
                </IconButton>
              </PreferenceGroup>

              <PreferenceGroup theme={theme}>
                {ALIGNMENT_OPTIONS.map((option) => (
                  <IconButton
                    key={option.value}
                    label={option.label}
                    onClick={() => setAlignment(option.value)}
                    theme={theme}
                    active={activeAlignment === option.value}
                    pressed={activeAlignment === option.value}
                  >
                    <option.icon size={15} aria-hidden="true" />
                  </IconButton>
                ))}
              </PreferenceGroup>

              <PreferenceGroup theme={theme}>
                <IconButton
                  label="Bold text"
                  onClick={() => setBold(!bold)}
                  theme={theme}
                  active={bold}
                  pressed={bold}
                >
                  <Bold size={15} aria-hidden="true" />
                </IconButton>
                <IconButton
                  label="Italic text"
                  onClick={() => setItalic(!italic)}
                  theme={theme}
                  active={italic}
                  pressed={italic}
                >
                  <Italic size={15} aria-hidden="true" />
                </IconButton>
              </PreferenceGroup>
            </div>
          </header>

          <div
            className={`px-5 py-6 transition-colors duration-300 sm:px-8 sm:py-10 ${
              theme ? "bg-stone-950 text-stone-100" : "bg-white text-stone-800"
            }`}
          >
            <div
              className={[
                "leading-relaxed break-words [overflow-wrap:anywhere]",
                TEXT_SIZE_CLASS[size] ?? TEXT_SIZE_CLASS[DEFAULT_TEXT_SIZE],
                ALIGNMENT_CLASS[activeAlignment],
                PROSE_STYLES,
                QUILL_STYLES,
                bold ? "[&_strong]:font-bold [&_em]:font-bold" : "",
                italic ? "[&_em]:italic [&_strong]:italic" : "",
                theme
                  ? "[&_blockquote]:border-stone-700 [&_blockquote]:text-stone-400 [&_pre]:bg-stone-900 [&_code]:bg-stone-800 [&_code]:text-stone-200 [&_hr]:border-stone-800"
                  : "[&_blockquote]:border-stone-300 [&_blockquote]:text-stone-600 [&_pre]:bg-stone-50 [&_code]:bg-stone-100 [&_code]:text-stone-700 [&_hr]:border-stone-200",
              ]
                .filter(Boolean)
                .join(" ")}
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />
          </div>
        </article>
      )}

      {/* Page controls */}
      {totalPages > 0 && (
        <div className="fixed bottom-4 left-1/2 z-20 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 px-3 sm:px-4">
          <div
            className={`flex items-center gap-2 rounded-2xl border px-2 py-2 shadow-lg backdrop-blur-md transition-colors duration-300 sm:gap-3 sm:px-3 ${
              theme
                ? "border-stone-700 bg-stone-900/85"
                : "border-stone-200 bg-white/85"
            }`}
          >
            {renderNavButton("prev")}

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span
                  className={`truncate text-[11px] font-semibold ${
                    theme ? "text-stone-300" : "text-stone-600"
                  }`}
                >
                  Page {Math.min(pageIndex + 1, totalPages)} of {totalPages}
                </span>
                <span
                  className={`shrink-0 text-[11px] font-medium ${
                    theme ? "text-stone-500" : "text-stone-400"
                  }`}
                >
                  {progress}%
                </span>
              </div>

              <div
                role="progressbar"
                aria-label="Reading progress"
                aria-valuemin={1}
                aria-valuemax={totalPages}
                aria-valuenow={Math.min(pageIndex + 1, totalPages)}
                className={`h-1.5 w-full overflow-hidden rounded-full ${
                  theme ? "bg-stone-800" : "bg-stone-200"
                }`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    theme ? "bg-stone-300" : "bg-stone-800"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {renderNavButton("next")}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lib_BasedLayoutBook;