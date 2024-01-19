//Places APIでゲームセンターの店舗情報を取得

require("dotenv").config();
const axios = require("axios");
const mysql = require("mysql2/promise");

// Google Maps APIキー
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// MySQL接続プールの設定
const pool = mysql.createPool({
  host:
    // process.env.NODE_ENV === "development"
    //   ? process.env.DB_HOST || "process.env.DB_HOST"
    process.env.AWS_DB_HOST,
  user:
    // process.env.NODE_ENV === "development"
    //   ? process.env.DB_USER || "process.env.DB_USER"
    process.env.AWS_DB_USER,
  password:
    // process.env.NODE_ENV === "development"
    //   ? process.env.DB_PASSWORD || "process.env.DB_PASSWORD"
    process.env.AWS_DB_PASSWORD,
  database:
    // process.env.NODE_ENV === "development"
    //   ? process.env.DB_DATABASE || "process.env.DB_DATABASE"
    process.env.AWS_DB_DATABASE,
  port:
    // process.env.NODE_ENV === "development"
    //   ? process.env.DB_PORT || "process.env.DB_PORT"
    process.env.AWS_DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Place Details リクエストを行う関数
const getPlaceDetails = async (placeId) => {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=ja`;

  try {
    const response = await axios.get(detailsUrl);
    const details = response.data.result;
    console.log("取得したdetails:", details);

    // detailsオブジェクトから必要な情報を抽出する
    const phoneNumber = details.formatted_phone_number;

    return phoneNumber;
  } catch (error) {
    console.error("Place Details リクエストエラー:", error);
    return null; // エラーが発生した場合はnullを返す
  }
};

const getGameCenters = async () => {
  try {
    // Places APIの検索エンドポイント
    const query = "ゲームセンター"; // 検索クエリ
    const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${apiKey}&language=ja`;

    // Places APIにリクエストを送信
    const response = await axios.get(apiUrl);
    const places = response.data.results.slice(0, 10); // 最初の10件のデータを取得

    console.log("APIのレスポンス:", response.data); // レスポンス全体をログに出力
    console.log("取得した店舗情報:", places);

    // データベースへの挿入例
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      for (const place of places) {
        // ここでデータベースへの挿入処理を行う
        const phoneNumber = await getPlaceDetails(place.place_id);

        const insertQuery =
          "INSERT INTO shops (type, name, address, phone_number, latitude, longitude, place_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
        console.log("取得した電話番号:", phoneNumber);

        const values = [
          "ゲームセンター",
          place.name,
          place.formatted_address,
          phoneNumber,
          parseFloat(place.geometry.location.lat),
          parseFloat(place.geometry.location.lng),
          place.place_id,
        ];
        await connection.query(insertQuery, values);
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("エラー:", error);
  }
};

// ファイルが直接実行されたときに関数を呼び出す
getGameCenters();

module.exports = getGameCenters;
