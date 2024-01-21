import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "src/styles/Header/Header.css";
import { FaHandPaper, FaHome, FaMedapps, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

const MENUITEMS = [
  { text: "トップへ", link: "/", icon: () => <FaHome /> },
  { text: "アプリについて", icon: () => <FaMedapps /> },
  { text: "利用規約", link: "/terms", icon: () => <FaPaperPlane /> },
  { text: "プライバシーポリシー", link: "/", icon: () => <FaHandPaper /> },
];

const HumbergerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggleBodyScroll = (disableScroll) => {
      const body = document.querySelector("body");
      if (body) {
        body.style.overflow = disableScroll ? "hidden" : "auto";
      }
    };

    toggleBodyScroll(isOpen);

    return () => {
      toggleBodyScroll(false);
    };
  }, [isOpen]);

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
        <ul className="absolute top-0 left-0 bg-contentsBg p-4 h-screen xl:w-3/12">
          {MENUITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link to={item.link} key={item.text}>
                <ul className="flex items-center ">
                  {IconComponent && <IconComponent />}
                  <li className="cursor-pointer p-2 ">{item.text}</li>
                </ul>
                <hr></hr>
              </Link>
            );
          })}
        </ul>
      </CSSTransition>
      {isOpen && (
        <div className="menu-overlay active" onClick={closeMenu}></div>
      )}
    </>
  );
};

export default HumbergerMenu;
