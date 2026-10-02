import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  BookOpen,
  EarOff,
  Eye,
  EyeOff,
  ImageOff,
  Languages,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DOMPurify from "dompurify";
import {
  isSpeechSupported,
  pauseSpeech,
  resumeSpeech,
  speak,
  stopSpeech,
} from '../utils/speech.js';
import TagalogIntroduction from "../src/assets/audio/Tagalog-Introduction.mp3";
import EnglishIntroduction from "../src/assets/audio/English-Introduction.mp3";
import { useTypeEffect } from "../utils/typeEffect.js";
import { PROSE_STYLES, QUILL_STYLES, htmlToText } from "../utils/readerHelpers.js";

const ADVANCE_DELAY = 2000;
const SWIPE_THRESHOLD = 50;

// Narration badges shown above the artwork.
const NARRATION_LABELS = {
  intro: "Introduction",
  audio: "Recorded audio",
  tts: "Read aloud",
  unavailable: "Read aloud unavailable",
  none: "No audio for this page",
};

// One shared material for every floating surface, so the top pills, the caption
// card and the control pill read as a single set. Dark-tinted rather than white
// so it holds up over bright artwork: at 45% over a white page the narration
// badge's text still lands around 3.4:1, and comfortably past that on any
// normal illustration. There are no scrims behind these, so this tint is the
// only thing carrying contrast.
const GLASS =
  "border border-white/15 bg-wh-900/85 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-black/20";

// Seeking before metadata arrives throws in some browsers.
const rewind = (element) => {
  try {
    if (element) element.currentTime = 0;
  } catch {
    /* not seekable yet */
  }
};

const Lib_StoryLayoutBook = ({
  book,
  isEnd,
  pageIndex,
  nextPage,
  prevPage,
  goToPage,
  exitSummary,
  onClose,
}) => {
  const introRef = useRef(null);
  const pageAudioRef = useRef(null);
  const advanceTimerRef = useRef(null);
  const touchStartRef = useRef(null);

  const [isIntroDone, setIsIntroDone] = useState(false);
  const [narration, setNarration] = useState({ source: null, status: "idle" });
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  // Tracks which image the lightbox was opened for. Storing the source rather
  // than a boolean means a page change or the summary closes it for free, and it
  // can never end up showing artwork from a page that is no longer on screen.
  const [zoomedImage, setZoomedImage] = useState(null);

  // Image loading status is tracked against the source it describes, so a page
  // change implicitly returns to "loading" without an extra effect.
  const [imageStatus, setImageStatus] = useState({ src: null, state: "loading" });

  const [summaryStatus, setSummaryStatus] = useState("idle");
  const [skipSummary, setSkipSummary] = useState(false);

  const pages = book?.pages ?? [];
  const totalPages = pages.length;
  const page = pages[pageIndex];

  const pageImage = page?.pageImage;
  const pageAudio = page?.pageAudio;
  const pageText = page?.pageText;

  const language = (book?.language || "").toLowerCase();
  const isFilipino = language === "filipino";
  const narrationLang = isFilipino ? "fil-PH" : "en-US";
  const introSrc = isFilipino ? TagalogIntroduction : EnglishIntroduction;

  const isFirst = pageIndex <= 0;

  const imageState = !pageImage
    ? "error"
    : imageStatus.src === pageImage
      ? imageStatus.state
      : "loading";

  // Fresh summary state each time the summary is opened.
  const [wasAtEnd, setWasAtEnd] = useState(isEnd);
  if (wasAtEnd !== isEnd) {
    setWasAtEnd(isEnd);
    setSummaryStatus("idle");
    setSkipSummary(false);
  }

  const isZoomed = zoomedImage !== null && zoomedImage === pageImage && !isEnd;

  const safeHtml = useMemo(
    () => (pageText ? DOMPurify.sanitize(pageText) : ""),
    [pageText],
  );

  const summary = book?.moral || "";
  const typedSummary = useTypeEffect(isEnd && !skipSummary ? summary : "");
  const shownSummary = skipSummary ? summary : typedSummary;
  const isTypingSummary = isEnd && !skipSummary && typedSummary.length < summary.length;

  const speechAvailable = isSpeechSupported();

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const scheduleAdvance = useCallback(() => {
    if (!autoAdvance) return;
    clearAdvanceTimer();
    advanceTimerRef.current = setTimeout(() => {
      advanceTimerRef.current = null;
      nextPage?.();
    }, ADVANCE_DELAY);
  }, [autoAdvance, clearAdvanceTimer, nextPage]);

  /**
   * Plays narration for the current page.
   *
   * Recorded audio is preferred. When it is missing, fails to load, or is
   * unsupported the page text is read aloud instead, so a page is never left
   * silently stranded with no way forward.
   */
  const startPageNarration = useCallback(
    ({ skipAudio = false } = {}) => {
      clearAdvanceTimer();
      stopSpeech();

      const audioEl = pageAudioRef.current;

      if (!skipAudio && pageAudio && audioEl) {
        setNarration({ source: "audio", status: "playing" });
        rewind(audioEl);
        audioEl.play().catch(() => {
          // Autoplay refused before a user gesture - wait for a manual press.
          setNarration({ source: "audio", status: "idle" });
        });
        return;
      }

      const speech = pageText ? htmlToText(pageText) : "";

      if (!speech) {
        setNarration({ source: null, status: "idle" });
        return;
      }

      if (!speechAvailable) {
        setNarration({ source: "tts", status: "unavailable" });
        return;
      }

      const utterance = speak(speech, { lang: narrationLang });

      if (!utterance) {
        setNarration({ source: "tts", status: "unavailable" });
        return;
      }

      setNarration({ source: "tts", status: "playing" });
    },
    [clearAdvanceTimer, pageAudio, pageText, speechAvailable, narrationLang],
  );

  const handleAudioEnded = useCallback(() => {
    setNarration((prev) => ({ ...prev, status: "ended" }));
    scheduleAdvance();
  }, [scheduleAdvance]);

  // A broken or unsupported audio file should not end the page - read it.
  const handleAudioError = useCallback(() => {
    startPageNarration({ skipAudio: true });
  }, [startPageNarration]);

  // The introduction blocking playback must never trap the reader.
  const handleIntroEnded = useCallback(() => {
    setIsIntroDone(true);
  }, []);

  // Restart narration for whichever page is showing.
// This effect exists to synchronise playback with the page, so the setState
// inside startPageNarration is reporting an external system (the media
// element / speech synthesiser) rather than deriving render state.
  useEffect(() => {
    stopSpeech();
    clearAdvanceTimer();

    if (!isIntroDone) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    startPageNarration();
  }, [pageIndex, isIntroDone, clearAdvanceTimer, startPageNarration]);

  // Tear everything down when the reader closes.
  useEffect(() => {
    return () => {
      clearAdvanceTimer();
      stopSpeech();
    };
  }, [clearAdvanceTimer]);

  // Reaching the summary ends the page narration.
  useEffect(() => {
    if (!isEnd) return;
    clearAdvanceTimer();
    stopSpeech();
  }, [isEnd, clearAdvanceTimer]);

  const narrationBadge = !isIntroDone
    ? NARRATION_LABELS.intro
    : narration.status === "unavailable"
      ? NARRATION_LABELS.unavailable
      : narration.source
        ? narration.source === "tts"
          ? NARRATION_LABELS.tts
          : NARRATION_LABELS.audio
        : NARRATION_LABELS.none;

  // The introduction plays on its own, so it counts as "playing" regardless of
// the page-narration state.
const isPlayingAudio = !isIntroDone || narration.status === "playing";

  const handleToggleNarration = () => {
    clearAdvanceTimer();

    // The introduction is a plain media element.
    if (!isIntroDone) {
      const el = introRef.current;
      if (!el) return;
      if (el.paused) {
        el.play().catch(() => {});
        setNarration({ source: "audio", status: "playing" });
      } else {
        el.pause();
        setNarration({ source: "audio", status: "paused" });
      }
      return;
    }

    if (narration.status === "unavailable") return;

    if (narration.status === "playing") {
      if (narration.source === "tts") pauseSpeech();
      else pageAudioRef.current?.pause();
      setNarration((prev) => ({ ...prev, status: "paused" }));
      return;
    }

    if (narration.source === "tts") {
      resumeSpeech();
    } else if (narration.source === "audio") {
      pageAudioRef.current?.play().catch(() => {});
    } else {
      // Nothing loaded for this page yet - start it now.
      startPageNarration();
      return;
    }

    setNarration((prev) => ({ ...prev, status: "playing" }));
  };

  const handleReplay = () => {
    clearAdvanceTimer();

    if (isIntroDone && narration.source === "tts") {
      startPageNarration({ skipAudio: true });
      return;
    }

    const el = isIntroDone ? pageAudioRef.current : introRef.current;
    if (!el) return;

    rewind(el);
    el.play().catch(() => {});
    setNarration({ source: "audio", status: "playing" });
  };

  const handleSummarySpeak = () => {
    if (summaryStatus === "playing") {
      stopSpeech();
      setSummaryStatus("idle");
      return;
    }

    const speech = htmlToText(summary);
    const utterance = speechAvailable ? speak(speech, { lang: narrationLang }) : null;

    if (!utterance) {
      setSummaryStatus("unavailable");
      return;
    }

    utterance.onend = () => setSummaryStatus("ended");
    utterance.onerror = () => setSummaryStatus("unavailable");
    setSummaryStatus("playing");
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      if (
        isEnd ||
        isZoomed ||
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
      } else if (event.key === " ") {
        event.preventDefault();
        handleToggleNarration();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  // Escape closes the full-screen illustration.
  useEffect(() => {
    if (!isZoomed) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setZoomedImage(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isZoomed]);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current;
    if (!start) return;
    touchStartRef.current = null;

    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    // Ignore short drags and anything that is mostly vertical.
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

    if (deltaX < 0) nextPage?.();
    else prevPage?.();
  };

  // With the prev/next arrows gone, the progress bar is the explicit way to
  // reach a page. goToPage already clamps, so no bounds check is needed here.
  const handleSeek = (event) => {
    if (totalPages < 2) return;

    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width) return;

    const ratio = (event.clientX - rect.left) / rect.width;
    const target = Math.round(ratio * (totalPages - 1));

    goToPage?.(target);
  };

  const handleSeekKeyDown = (event) => {
    const jumpFirst = event.key === "Home";
    const jumpLast = event.key === "End";
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;

    // Claim only the keys this control actually handles. The global window
    // handler also turns pages on the arrow keys and does not exclude a
    // focusable div, so without this a focused slider would advance two pages
    // per press - once here, once again as the event bubbles up. Space has to
    // keep passing through, since that is the global narration toggle.
    if (!jumpFirst && !jumpLast && !step) return;

    event.preventDefault();
    event.stopPropagation();

    if (jumpFirst) goToPage?.(0);
    else if (jumpLast) goToPage?.(totalPages - 1);
    else goToPage?.(pageIndex + step);
  };

  const controlButton =
    "inline-flex p-2 shrink-0 items-center justify-center rounded-xl text-stone-200 transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:pointer-events-none disabled:opacity-30";

  const playButton = isPlayingAudio
    ? "bg-white text-stone-900 hover:bg-white/90"
    : "bg-white/10 text-white hover:bg-white/20";

  // The introduction is always playable; afterwards a page needs either recorded
  // audio or readable text before there is anything to hear.
  const canPlayNarration = !isIntroDone || narration.source !== null;

  const hasImage = Boolean(pageImage) && imageState !== "error";
  const progress = totalPages
    ? Math.min(100, Math.round(((pageIndex + 1) / totalPages) * 100))
    : 0;

  if (isEnd) {
    return (
      <div className="flex h-dvh w-full flex-col bg-stone-950 text-stone-100">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 px-5 py-10 sm:px-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-yellow-500/15 px-3 py-1.5 text-[11px] font-bold tracking-wide text-yellow-400 uppercase">
            <Sparkles size={13} aria-hidden="true" />
            The End
          </span>

          <div className="space-y-1">
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              {book?.title || "Story Summary"}
            </h1>
            <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
              Summary &amp; moral
            </p>
          </div>

          <div className="relative min-h-40">
            <p className="text-sm leading-relaxed text-stone-300 sm:text-base">
              {shownSummary || "A summary is not available yet."}
            </p>

            {isTypingSummary && (
              <button
                type="button"
                onClick={() => setSkipSummary(true)}
                className="absolute -top-9 right-0 text-[11px] font-semibold text-stone-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
              >
                Skip
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {summary && (
              <button
                type="button"
                onClick={handleSummarySpeak}
                disabled={summaryStatus === "unavailable"}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:pointer-events-none disabled:opacity-40"
              >
                {summaryStatus === "playing" ? (
                  <Pause size={15} aria-hidden="true" />
                ) : (
                  <Play size={15} aria-hidden="true" />
                )}
                {summaryStatus === "playing" ? "Stop reading" : "Read summary aloud"}
              </button>
            )}

            {summaryStatus === "unavailable" && (
              <span className="text-[11px] text-stone-500">
                Read aloud is unavailable in this browser.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 border-t border-stone-800 pt-6 sm:flex-row sm:flex-wrap">
            {exitSummary && (
              <button
                type="button"
                onClick={exitSummary}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-stone-800 px-4 py-2.5 text-xs font-semibold text-stone-200 transition-colors hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                Back to the last page
              </button>
            )}

            {goToPage && totalPages > 1 && (
              <button
                type="button"
                onClick={() => goToPage(0)}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-stone-800 px-4 py-2.5 text-xs font-semibold text-stone-200 transition-colors hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
              >
                <RotateCcw size={15} aria-hidden="true" />
                Read from the start
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold text-stone-400 transition-colors hover:bg-stone-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500"
            >
              Return to library
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-fit rounded-3xl w-full max-w-3xl bg-stone-950 justify-center items-center text-stone-100">
      {/* Narration audio. Hidden because the controls live in the floating header. */}
      {!isIntroDone && (
        <audio
          ref={introRef}
          src={introSrc}
          autoPlay
          onEnded={handleIntroEnded}
          onError={handleIntroEnded}
          className="hidden"
        />
      )}

      <audio
        ref={pageAudioRef}
        src={pageAudio || undefined}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        className="hidden"
      />

      <article
        className={`${GLASS} overflow-hidden rounded-2xl sm:rounded-3xl`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative aspect-[4/3] sm:aspect-[3/2]">
          {hasImage ? (
            <>
              {imageState === "loading" && (
                <div className="absolute inset-0 animate-pulse bg-stone-800/60" />
              )}

              {/* Fills any letterbox so the margin reads as intentional rather
                  than broken. object-cover is right here: filling and blurring
                  is the intent. */}
              <img
                src={pageImage}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
              />

              <img
                key={pageImage}
                src={pageImage}
                alt={`Illustration for page ${pageIndex + 1} of ${totalPages}`}
                draggable={false}
                onLoad={() => setImageStatus({ src: pageImage, state: "loaded" })}
                onError={() => setImageStatus({ src: pageImage, state: "error" })}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
                  imageState === "loaded" ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-black/40">
                <ImageOff size={28} className="text-stone-400" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-stone-200">
                  {pageImage
                    ? "This illustration could not be loaded"
                    : "No illustration for this page"}
                </p>
                <p className="text-xs text-stone-400">
                  {pageImage
                    ? "The image file may have been removed. The page text is still available below."
                    : "You can keep reading with the text below."}
                </p>
              </div>
            </div>
          )}

          {/* Tap zones sit on the illustration itself. The card's dead space
              around it is padding, not a page-turn surface. */}
          <button
            type="button"
            onClick={prevPage}
            disabled={isFirst}
            aria-label="Previous page"
            className="group absolute inset-y-0 left-0 z-10 w-1/3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
          >
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/45 p-2 text-stone-200 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              <ArrowLeft size={16} aria-hidden="true" />
            </span>
          </button>

          <button
            type="button"
            onClick={nextPage}
            aria-label="Next page"
            className="group absolute inset-y-0 right-0 z-10 w-2/3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
          >
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/45 p-2 text-stone-200 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </button>

          {/* Caption, over the artwork like the text at the foot of a picture
              book page. The gradient is sized to the text rather than laid over
              the whole reader, and the padding above lets it fade in. */}
          {showCaption && (
            <div
              className="absolute inset-x-0 bottom-0 z-20 max-h-[9rem] overflow-y-auto bg-gradient-to-t from-stone-950 via-stone-950/85 to-transparent px-5 pt-12 pb-4 sm:max-h-[11rem] sm:px-8 sm:pb-5"
            >
              {safeHtml ? (
                <div
                  className={[
                    "text-sm leading-relaxed break-words text-stone-100 [overflow-wrap:anywhere] sm:text-base",
                    PROSE_STYLES,
                    QUILL_STYLES,
                    "[&_blockquote]:border-white/20 [&_blockquote]:text-stone-300 [&_pre]:bg-black/40 [&_code]:bg-black/40 [&_code]:text-stone-200 [&_hr]:border-white/15",
                  ].join(" ")}
                  dangerouslySetInnerHTML={{ __html: safeHtml }}
                />
              ) : (
                <p className="text-sm text-stone-400">There is no text on this page.</p>
              )}
            </div>
          )}

          {/* Header, floating over the art. The pills opt back into pointer
              events so taps in the gaps still fall through to the tap zones. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-wrap items-start gap-2 p-2">
            <div
              className={`pointer-events-auto flex items-center gap-1 p-1`}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close book"
                className={`${controlButton} rounded-full`}
              >
                <X size={17} aria-hidden="true" />
              </button>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1.5 text-xs font-semibold text-stone-100">
                {narrationBadge === NARRATION_LABELS.tts ? (
                  <Languages size={13} aria-hidden="true" />
                ) : narrationBadge === NARRATION_LABELS.audio ||
                  narrationBadge === NARRATION_LABELS.intro ? (
                  <AudioLines size={13} aria-hidden="true" />
                ) : (
                  <EarOff size={13} aria-hidden="true" />
                )}
                {/* Icon-only on phones: the longest label would eat a third of
                    the frame, and the icon still carries the meaning. sr-only
                    rather than hidden, so the text stays in the accessibility
                    tree instead of relying on aria-label, which generic
                    elements do not expose reliably. */}
                <span className="sr-only sm:not-sr-only">{narrationBadge}</span>
              </span>

              <button
                type="button"
                onClick={handleToggleNarration}
                disabled={narration.status === "unavailable" || !canPlayNarration}
                aria-label={isPlayingAudio ? "Pause narration" : "Play narration"}
                className={`${controlButton} ${playButton} rounded-full`}
              >
                {isPlayingAudio ? (
                  <Pause size={17} aria-hidden="true" />
                ) : (
                  <Play size={17} aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={handleReplay}
                disabled={!canPlayNarration}
                aria-label="Replay narration"
                className={`${controlButton} rounded-full`}
              >
                <RotateCcw size={15} aria-hidden="true" />
              </button>
            </div>

            <div
              className={`pointer-events-auto ml-auto flex items-center gap-1 rounded-full p-1`}
            >
              <button
                type="button"
                onClick={() => setAutoAdvance((prev) => !prev)}
                aria-label="Auto-advance to the next page"
                aria-pressed={autoAdvance}
                className={`inline-flex p-2 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                  autoAdvance ? "bg-white/20 text-white" : "text-stone-300 hover:bg-white/10"
                }`}
              >
                <BookOpen size={14} aria-hidden="true" />
                Auto
              </button>

              <button
                type="button"
                onClick={() => setShowCaption((prev) => !prev)}
                aria-label={showCaption ? "Hide caption" : "Show caption"}
                aria-pressed={!showCaption}
                className={`${controlButton} rounded-full`}
              >
                {showCaption ? (
                  <EyeOff size={16} aria-hidden="true" />
                ) : (
                  <Eye size={16} aria-hidden="true" />
                )}
              </button>

              {hasImage && (
                <button
                  type="button"
                  onClick={() => setZoomedImage(pageImage)}
                  aria-label="View illustration full screen"
                  className={`${controlButton} rounded-full`}
                >
                  <Maximize2 size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress, inline below the artwork. Doubles as the page picker, since
            the prev/next arrows are gone. */}
        {totalPages > 0 && (
          <div className="px-4 py-4 sm:px-6 sm:py-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="truncate text-xs font-semibold text-stone-100">
                Page {Math.min(pageIndex + 1, totalPages)} of {totalPages}
              </span>
              <span className="shrink-0 text-xs font-medium text-stone-300">
                {progress}%
              </span>
            </div>

            <div
              role="slider"
              tabIndex={0}
              aria-label="Go to page"
              aria-valuemin={1}
              aria-valuemax={totalPages}
              aria-valuenow={Math.min(pageIndex + 1, totalPages)}
              aria-valuetext={`Page ${Math.min(pageIndex + 1, totalPages)} of ${totalPages}`}
              onClick={handleSeek}
              onKeyDown={handleSeekKeyDown}
              className="h-2 w-full cursor-pointer touch-none overflow-hidden rounded-full bg-white/20 transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <div
                className="h-full rounded-full bg-white/90 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </article>

      {/* Full-screen illustration. Detached from the controls, so it carries its
          own close affordance and page counter. */}
      {isZoomed && pageImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Illustration for page ${pageIndex + 1} of ${totalPages}`}
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <img
            src={pageImage}
            alt={`Illustration for page ${pageIndex + 1} of ${totalPages}`}
            draggable={false}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
          />

          <button
            type="button"
            onClick={() => setZoomedImage(null)}
            aria-label="Close full screen illustration"
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1.5 text-[11px] font-semibold text-stone-200 tabular-nums backdrop-blur-sm">
            {Math.min(pageIndex + 1, totalPages)} / {totalPages}
          </span>
        </div>
      )}
    </div>
  );
};

export default Lib_StoryLayoutBook;
