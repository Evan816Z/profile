import { useState, useEffect } from "react";

export default function TypeWriter({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex] || "";
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 60 : 110
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts]);

  return <span className="typewriter-cursor">{displayText}</span>;
}
