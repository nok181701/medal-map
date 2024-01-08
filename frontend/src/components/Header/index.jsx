import "src/styles/Header/Header.css";
import HumbergerMenu from "src/components/Header/ HumbergerMenu";

const Header = () => {
  return (
    <header className="bg-blue-400 p-4 relative">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-bold text-white ml-5">メダルマップ</h1>
        <HumbergerMenu />
      </div>
    </header>
  );
};

export default Header;
