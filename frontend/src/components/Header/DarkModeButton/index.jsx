// DarkModeButton.jsx

import { FaMoon } from "react-icons/fa";
import { useSimpleDarkMode } from "src/hooks/DarkMode";
import "src/styles/Header/DarkModeButton.css";

const DarkModeButton = () => {
  const { isDarkMode, toggle } = useSimpleDarkMode();

  return (
    <div className="flex items-center mr-8">
      <FaMoon className="size-4 text-yellow-300 mr-1 darkModeIcon" />
      <button
        className={`darkModeButton ${isDarkMode ? "dark" : ""} `}
        onClick={() => toggle()}
      ></button>
    </div>
  );
};

export default DarkModeButton;
