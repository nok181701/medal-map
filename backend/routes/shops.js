require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const cors = require("cors");
const { validationResult, check } = require("express-validator");

router.use(cors());

let pool;

if (process.env.NODE_ENV === "production") {
  // 本番環境の接続設定（JawsDB）
  (pool = mysql.createPool(process.env.JAWSDB_URL)),
    {
      connectionLimit: 10,
      waitForConnections: true,
      stringifyObjects: true,
    };
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

router.post(
  "/",
  [
    check("centerCoordinates.latitude").isNumeric(),
    check("centerCoordinates.longitude").isNumeric(),
    check("radiusInMeters").isNumeric(),
  ],
  async (req, res) => {
    // バリデーションエラーのチェック
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { centerCoordinates, radiusInMeters } = req.body;

      // const start = process.hrtime();

      const placesInRadius = await searchNearbyPlaces(
        centerCoordinates,
        radiusInMeters
      );

      // 何らかの処理を行う（例: ループや関数の実行）

      // const end = process.hrtime(start);

      // 処理にかかった時間を表示
      // console.log(
      //   "処理にかかった時間: " + (end[0] * 1e9 + end[1]) / 1e6 + "ミリ秒"
      // );

      const simplifiedPlaces = placesInRadius.map((place) => {
        return {
          type: place.type,
          name: place.name,
          address: place.address,
          phone_number: place.phone_number,
          latitude: place.latitude,
          longitude: place.longitude,
          image: place.image,
          medal_machine_name: place.medal_machine_name,
        };
      });
      console.log(simplifiedPlaces);
      res.json(simplifiedPlaces);
    } catch (error) {
      console.error("Error searching nearby places:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

const searchNearbyPlaces = async (centerCoordinates, radiusInMeters) => {
  try {
    // haversineDistanceを一度計算して変数に保存
    const haversineCondition =
      "haversineDistance(?, ?, shops.latitude, shops.longitude)";

    const query = `
      SELECT
        shops.id,
        shops.type,
        shops.name,
        shops.address,
        shops.phone_number,
        shops.opening_hours,
        shops.latitude,
        shops.longitude,
        shops.place_id,
        shops_images.image,
        medal_machines.name AS medal_machine_name,
        ${haversineCondition} AS distance
      FROM
        shops
      LEFT JOIN
        shops_images ON shops.id = shops_images.shop_id
      LEFT JOIN
        medal_machines ON shops.id = medal_machines.shop_id
      WHERE
        ${haversineCondition} <= ?;
    `;

    const [rows, fields] = await pool.execute(query, [
      centerCoordinates.latitude,
      centerCoordinates.longitude,
      centerCoordinates.latitude,
      centerCoordinates.longitude,
      radiusInMeters,
    ]);
    // console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = router;
