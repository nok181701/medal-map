//Places APIでゲームセンターの店舗情報を取得

require("dotenv").config();
const axios = require("axios");
const mysql = require("mysql2/promise");

// Google Maps APIキー
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// MySQL接続プールの設定
let pool;

if (process.env.NODE_ENV === "production") {
  // 本番環境の接続設定（JawsDB）
  pool = mysql.createPool(process.env.JAWSDB_URL);
} else {
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
}

const getPhotoUrl = async (photoReference) => {
  const photoUrlApi = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
  const response = await axios.get(photoUrlApi);
  return response.request.res.responseUrl; // 画像URLを取得
};

// Place Details リクエストを行う関数
const getPlaceDetails = async (placeId) => {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&language=ja`;

  try {
    const response = await axios.get(detailsUrl);
    const details = response.data.result;

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
    const places = response.data.results.slice(0, 5); // 最初の5件のデータを取得
    // console.log(places);

    // データベースへの挿入例
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      for (const place of places) {
        // ここでデータベースへの挿入処理を行う
        const phoneNumber = await getPlaceDetails(place.place_id);

        const insertShopQuery =
          "INSERT INTO shops (type, name, address, phone_number, latitude, longitude, place_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
        // console.log("取得した電話番号:", phoneNumber);

        const valuesShop = [
          "ゲームセンター",
          place.name,
          place.formatted_address,
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
          // photosが存在し、かつ少なくとも1つ以上の写真がある場合に処理
          const photoReference = place.photos[0].photo_reference;

          // 新しいリクエストを行い、画像URLを取得
          const photoUrl = await getPhotoUrl(photoReference);

          // shops_images テーブルに画像情報を挿入
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
