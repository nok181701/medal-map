import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-400 p-8 text-white text-center">
      <div className="mb-4">
        <p className="text-sm">
          &copy; 2024 メダルマップ. All Rights Reserved.
        </p>
      </div>
      <div>
        <p className="text-xs inline mr-4">利用規約</p>
        <p className="text-xs inline">プライバシーポリシー</p>
      </div>
    </footer>
  );
};

export default Footer;
