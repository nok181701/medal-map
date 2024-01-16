import React from "react";
import HumbergerMenu from "src/components/Header/ HumbergerMenu";
import "src/styles/Header/Header.css";

const Header = () => {
  const imgUrl = process.env.REACT_APP_PUBLIC_URL;

  return (
    <header className="header-gradient p-4 relative z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={
              process.env.REACT_APP_PUBLIC_URL === "development"
                ? `${imgUrl}/logo.png`
                : "/logo.png"
            }
            alt="Icon"
            className=""
            style={{ width: "42px", height: "42px", marginRight: "10px" }}
          />
          <h1 className="text-xl font-bold text-white">メダルマップ</h1>
        </div>
        <HumbergerMenu />
      </div>
    </header>
  );
};

export default Header;
