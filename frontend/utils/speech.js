/** Whether this browser exposes the Web Speech API at all. */
export const isSpeechSupported = () =>
  typeof window !== "undefined" && "speechSynthesis" in window;

/**
 * Speaks `text` and returns the utterance so callers can react to `onend` /
 * `onerror`. Returns null when speech is unavailable or the text is empty,
 * which lets callers fall back instead of guessing.
 */
export const speak = (text, options = {}) => {
  const { lang = "en-US", rate = 1, pitch = 1, volume = 1 } = options;

  if (!isSpeechSupported() || !text) return null;

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;

  window.speechSynthesis.cancel(); // Stop any previous speech
  window.speechSynthesis.speak(utterance);

  return utterance;
};

export const pauseSpeech = () => {
  window.speechSynthesis?.pause();
};

export const resumeSpeech = () => {
  window.speechSynthesis?.resume();
};

export const stopSpeech = () => {
  window.speechSynthesis?.cancel();
};

export const isSpeechSpeaking = () => window.speechSynthesis?.speaking ?? false;

export const isSpeechPaused = () => window.speechSynthesis?.paused ?? false;