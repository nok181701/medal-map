// ScrollToTopButton.js
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "src/styles/Main/ScrollToTopButton/ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsVisible(scrollPosition > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-to-top-button ${isVisible ? "visible" : ""}`}
    >
      <FaArrowUp className=" size-7" />
    </button>
  );
};

export default ScrollToTopButton;
