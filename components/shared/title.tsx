"use client";

const Title = () => {
  const text = "creative mind for a more unique perspective.";

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const wordIndex = e.currentTarget.getAttribute("data-index");
    const characters = document.querySelectorAll(`.word-${wordIndex} .char`);

    characters.forEach((char) => {
      if (char instanceof HTMLElement) {
        const randomX = Math.random() * 8;
        const randomY = Math.random() * 8 * -1.4;
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
    <h1 className="cursor-default text-balance text-xl font-bold leading-7 xs:text-2xl xs:leading-8 sm:text-3xl sm:leading-[36px]">
      {text.split(" ").map((word, wordIndex) => (
        <span
          key={wordIndex}
          data-index={wordIndex}
          className={`group relative inline-block word-${wordIndex}`}
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
          {/* Non-breaking space */}
        </span>
      ))}
    </h1>
  );
};

export default Title;
