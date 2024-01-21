require("dotenv").config();
const axios = require("axios");
const mysql = require("mysql2/promise");

// Google Maps APIキー
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// MySQL接続プールの設定
let pool;

// if (process.env.NODE_ENV === "production") {
//   // 本番環境の接続設定（JawsDB）
// pool = mysql.createPool(process.env.JAWSDB_URL);
// } else {
// 開発環境の接続設定
pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
// }

const getPhotoUrl = async (photoReference) => {
  const photoUrlApi = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  const response = await axios.get(photoUrlApi);
  return response.request.res.responseUrl; // 画像URLを取得
};

const getPlaceDetails = async (placeId) => {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=ja`;

  try {
    const response = await axios.get(detailsUrl);
    const details = response.data.result;

    const phoneNumber = details.formatted_phone_number;

    return phoneNumber;
  } catch (error) {
    console.error("Place Details リクエストエラー:", error);
    return null;
  }
};

const getGameCenters = async () => {
  try {
    // 中心の緯度経度を指定（東京駅周辺）
    const centerLocation = "35.9064,139.6239";
    const radius = 5000; // 半径（メートル）

    // Places APIの近くの検索エンドポイント (Nearby Search)
    const query = "ゲームセンター"; // 検索クエリ
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${centerLocation}&radius=${radius}&keyword=${encodeURIComponent(
      query
    )}&key=${apiKey}&language=ja`;

    // Places APIにリクエストを送信
    const response = await axios.get(apiUrl);
    const places = response.data.results;

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      for (const place of places) {
        const phoneNumber = await getPlaceDetails(place.place_id);

        const insertShopQuery =
          "INSERT INTO shops (type, name, address, phone_number, latitude, longitude, place_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

        const valuesShop = [
          "ゲームセンター",
          place.name,
          place.vicinity, // Nearby Searchではformatted_addressではなくvicinityを使用
          phoneNumber,
          parseFloat(place.geometry.location.lat),
          parseFloat(place.geometry.location.lng),
          place.place_id,
        ];

        const [shopResult] = await connection.query(
          insertShopQuery,
          valuesShop
        );

        if (place.photos && place.photos.length > 0 && shopResult.insertId) {
          const photoReference = place.photos[0].photo_reference;

          const photoUrl = await getPhotoUrl(photoReference);

          const insertImageQuery =
            "INSERT INTO shops_images (image, shop_id) VALUES (?, ?)";
          const valuesImage = [photoUrl, shopResult.insertId];
          await connection.query(insertImageQuery, valuesImage);
        }
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
