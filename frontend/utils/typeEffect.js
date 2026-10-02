import { useEffect, useState } from "react";

/**
 * Reveals `text` one character at a time.
 *
 * @param {string} text  the full string to reveal
 * @param {number} speed milliseconds between characters
 * @returns {string} the portion revealed so far
 */
export const useTypeEffect = (text, speed = 18) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index += 1;
      setDisplayText(text.slice(0, index));

      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayText;
};