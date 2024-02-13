import React from "react";
import { Link } from "react-router-dom";
import "src/styles/Footer/Footer.css";

const Footer = () => {
  const imgUrl = process.env.REACT_APP_PUBLIC_URL;
  return (
    <footer className="header-gradient p-8 text-white text-center">
      <div className="mb-4">
        <p className="text-sm">
          &copy; 2024 メダルマップ. All Rights Reserved.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Link to="/terms" className="text-xs inline mr-4">
          利用規約
        </Link>
        <Link to="/privacy" className="text-xs inline mr-4">
          プライバシーポリシー
        </Link>
        <Link
          to="https://twitter.com/medalmap_info"
          target="_blank"
          className="text-xs inline"
        >
          <img
            src={
              process.env.REACT_APP_PUBLIC_URL === "development"
                ? `${imgUrl}/logo-black.png`
                : "/logo-black.png"
            }
            alt=""
            className="w-5 h-5"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
