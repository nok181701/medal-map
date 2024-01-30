import { Link } from "react-router-dom";
import Footer from "src/components/Footer";
import Header from "src/components/Header";

const About = () => {
  const imgUrl = process.env.REACT_APP_PUBLIC_URL;
  const isDevelopment = process.env.NODE_ENV === "development";
  const ITEMS = [
    {
      text: "GoogleMapをスワイプすることでサークル内で自動検索がかかります",
      link: "/searchByCircle.gif",
    },
    {
      text: "地名を入力しても検索することができます",
      link: "/searchByText.gif",
    },
  ];
  return (
    <>
      <Header />
      <div className="bg-contentsBg p-8">
        <article>
          <div className="w-5/6 md:w-2/3 m-auto border-y-2 border-blue-400 p-10">
            <h1 className="text-3xl font-bold  text-center">メダルマップ</h1>
            <p className="text-center mt-5">
              ゲームセンターが大好きな人のための検索サービスです（関東圏のみ）
            </p>
          </div>
          <h1 className="text-center font-bold mt-20 text-2xl mb-5">
            メダルマップでできること（検索方法）
          </h1>
          <div className="flex flex-wrap justify-center">
            {ITEMS.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mb-5 mx-4 w-80"
              >
                <p className="text-center p-3">{item.text}</p>
                <img
                  src={isDevelopment ? item.link : `${imgUrl}/${item.link}`}
                  alt="GIF"
                  className="object-contain m-auto"
                />
              </div>
            ))}
          </div>
          <div className="w-5/6 md:w-2/3 m-auto border-y-2 border-blue-400 p-10 mt-8 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center">
              近くのゲームセンターを探してみましょう！
            </h1>
            <Link to={"/"}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full mt-4">
                検索してみる
              </button>
            </Link>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
};

export default About;
