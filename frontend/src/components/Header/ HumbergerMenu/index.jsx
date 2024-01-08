import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "src/styles/Header/Header.css";

const HumbergerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  const menuIconClass = isOpen ? "menu-icon open" : "menu-icon close";
  return (
    <>
      <div
        className={`cursor-pointer text-white  mr-5 text-3xl ${menuIconClass}`}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>

      <CSSTransition in={isOpen} timeout={300} classNames="menu" unmountOnExit>
        <div className="absolute top-0 left-0 bg-white p-4 h-screen xl:w-3/12">
          <div className="cursor-pointer ">メニューアイテム1</div>
          <div className="cursor-pointer">メニューアイテム2</div>
          <div className="cursor-pointer">メニューアイテム3</div>
        </div>
      </CSSTransition>
      {isOpen && (
        <div className="menu-overlay active" onClick={closeMenu}></div>
      )}
    </>
  );
};

export default HumbergerMenu;
