import React, { useEffect, useState } from "react";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Main from "src/components/Main";
import MaintenancePage from "src/components/Maintenance";

const Home = () => {
  const [isMaintenance, setIsMaintenance] = useState(false);
  useEffect(() => {
    // バックエンドの状態をチェックするAPIリクエスト
    const checkBackendStatus = async () => {
      try {
        const response = await fetch("/api/status"); // バックエンドの状態を確認するエンドポイント
        if (response.ok) {
          const data = await response.json();
          setIsMaintenance(data.maintenanceMode); // レスポンスの状態に応じて更新
        } else {
          // APIリクエストが失敗した場合
          setIsMaintenance(true);
        }
      } catch (error) {
        // エラーが発生した場合
        setIsMaintenance(true);
      }
    };

    checkBackendStatus();
  }, []);

  return (
    <>
      {isMaintenance ? (
        <MaintenancePage />
      ) : (
        <>
          <Header />
          <Main />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
