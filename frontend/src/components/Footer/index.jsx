import React from "react";
import { Link } from "react-router-dom";
import "src/styles/Footer/Footer.css";

const Footer = () => {
  return (
    <footer className="header-gradient p-8 text-white text-center">
      <div className="mb-4">
        <p className="text-sm">
          &copy; 2024 メダルマップ. All Rights Reserved.
        </p>
      </div>
      <div>
        <Link to="/terms" className="text-xs inline mr-4">
          利用規約
        </Link>
        <Link to="/privacy" className="text-xs inline">
          プライバシーポリシー
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
