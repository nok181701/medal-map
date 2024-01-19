require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const cors = require("cors");

router.use(cors());

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

router.post("/", async (req, res) => {
  try {
    const { centerCoordinates, radiusInMeters } = req.body;

    // 2地点間(サークルの中心座標とその範囲内の店舗)の計算
    const placesInRadius = await searchNearbyPlaces(
      centerCoordinates,
      radiusInMeters
    );

    res.json(placesInRadius);
  } catch (error) {
    console.error("Error searching nearby places:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const searchNearbyPlaces = async (centerCoordinates, radiusInMeters) => {
  try {
    const [rows, fields] = await pool.query(
      "SELECT address, latitude, longitude, name, phone_number, haversineDistance(?, ?, shops.latitude, shops.longitude) AS distance FROM shops HAVING distance <= ?",
      [centerCoordinates.latitude, centerCoordinates.longitude, radiusInMeters]
    );

    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = router;
