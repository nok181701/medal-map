import { FaMoon } from "react-icons/fa";
import { useSimpleDarkMode } from "src/hooks/DarkMode";
import "src/styles/Header/DarkModeButton.css";

const DarkModeButton = ({ HamburgerMenu }) => {
  const { isDarkMode, toggle } = useSimpleDarkMode();

  return (
    <>
      {/* HamburgerMenuメニューが渡された時、ダークモードを動的に表示 */}
      {!HamburgerMenu ? (
        <div className="flex items-center mr-8 ">
          <FaMoon className="size-4 text-yellow-300 mr-1 darkModeIcon" />
          <button
            className={`darkModeButton ${isDarkMode ? "dark" : ""} `}
            onClick={() => toggle()}
          ></button>
        </div>
      ) : (
        <div className="flex items-center justify-end mt-3">
          <FaMoon className="size-4 text-yellow-300 mr-1 darkModeIconBysm" />
          <button
            className={`darkModeButtonBySm ${isDarkMode ? "dark" : ""} `}
            onClick={() => toggle()}
          ></button>
        </div>
      )}
    </>
  );
};

export default DarkModeButton;
