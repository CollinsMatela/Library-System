
export const speak = (text) => {
  if (!("speechSynthesis" in window)) {
    alert("Your browser does not support Text-to-Speech.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.cancel(); // Stop any previous speech
  window.speechSynthesis.speak(utterance);
};

export const pauseSpeech = () => {
  window.speechSynthesis.pause();
};

export const resumeSpeech = () => {
  window.speechSynthesis.resume();
};

export const stopSpeech = () => {
  window.speechSynthesis.cancel();
};