import React, { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 800) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {backToTopButton && (
        <button
          className="fixed flex items-center justify-center w-8 h-8 text-white rounded-full bg-opacity-40 lg:w-12 lg:h-12 right-5 bottom-5 bg-primary lg:right-10 lg:bottom-10"
          onClick={scrollUp}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 lg:w-5 lg:h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
