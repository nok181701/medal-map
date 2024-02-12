import React from "react";
import { Link } from "react-router-dom";
import DarkModeButton from "src/components/Header/DarkModeButton";
import HamburgerMenu from "src/components/Header/HamburgerMenu";
import "src/styles/Header/Header.css";

const Header = () => {
  const imgUrl = process.env.REACT_APP_PUBLIC_URL;

  return (
    <header className="header-gradient p-2 relative z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center cursor-pointer">
          <Link
            to="/"
            className="flex items-center"
            style={{ textDecoration: "none" }}
          >
            <img
              src={
                process.env.REACT_APP_PUBLIC_URL === "development"
                  ? `${imgUrl}/logo.png`
                  : "/logo.png"
              }
              alt="Icon"
              className=""
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <h1 className="text-xl font-bold text-white">メダルマップ</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <DarkModeButton />
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
