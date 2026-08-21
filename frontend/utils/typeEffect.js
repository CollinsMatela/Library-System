import { useEffect, useState } from "react";

export const typeEffect = (text) => {
    const [displayText, setDisplayText] = useState('')

       useEffect(() => {
       let index = 0;

       setDisplayText('')

      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        index++;

        if (index === text.length) {
        clearInterval(interval);
        }
      }, 50)
      return () => clearInterval(interval);
      }, [text])

      return displayText
}