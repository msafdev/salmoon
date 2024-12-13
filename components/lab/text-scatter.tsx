"use client";

const TextScatter = () => {
  const text = "hover over me!";

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const wordIndex = e.currentTarget.getAttribute("data-index");
    const characters = document.querySelectorAll(`.word-${wordIndex} .char`);

    characters.forEach((char) => {
      if (char instanceof HTMLElement) {
        const randomX = Math.random() * 4;
        const randomY = Math.random() * 4 * -0.7;
        const randomRotate = Math.random() * 10;

        char.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
      }
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const wordIndex = e.currentTarget.getAttribute("data-index");
    const characters = document.querySelectorAll(`.word-${wordIndex} .char`);

    characters.forEach((char) => {
      if (char instanceof HTMLElement) {
        char.style.transform = "";
      }
    });
  };

  return (
    <h1 className="cursor-default text-base font-medium">
      {text.split(" ").map((word, wordIndex) => (
        <span
          key={wordIndex}
          data-index={wordIndex}
          className={`group relative inline-block text-muted-foreground transition-all duration-300 ease-in-out hover:text-foreground word-${wordIndex}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="char relative inline-block transition-transform duration-200"
            >
              {char}
            </span>
          ))}
          {wordIndex < text.split(" ").length - 1 && "\u00A0"}
        </span>
      ))}
    </h1>
  );
};

export default TextScatter;
