require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const cors = require("cors");

router.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.post("/", async (req, res) => {
  try {
    const { centerCoordinates, radiusInMeters } = req.body;
    // 2地点間(サークルの中心座標とその範囲内の店舗)の計算
    const placesInRadius = await searchNearbyPlaces(
      centerCoordinates,
      radiusInMeters
    );

    // プロパティを非表示にする処理を追加
    const sanitizedPlaces = placesInRadius.map((place) => {
      // 不要なプロパティを除外する例
      const { distance, id, opening_hours, place_id, type, ...sanitizedPlace } =
        place;
      return sanitizedPlace;
    });

    res.json(sanitizedPlaces);
  } catch (e) {
    console.error("Error searching nearby places:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const searchNearbyPlaces = async (centerCoordinates, radiusInMeters) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT *, haversineDistance(?, ?, shops.latitude, shops.longitude) AS distance FROM shops HAVING distance <= ?",
      [centerCoordinates.latitude, centerCoordinates.longitude, radiusInMeters]
    );

    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = router;