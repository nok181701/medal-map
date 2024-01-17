require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//1/17次やること
//DBに店舗情報を格納することはできた。
//次にその情報をフロント側に返したい。
//shops_imagesテーブルにも情報を入れておきたい。
//medal_machinesテーブルには各店舗のサイトをスクレイピングする？

router.get("/", async (req, res) => {
  try {
    // データベースから何かしらのクエリを実行してみる
    const [rows, fields] = await pool.query("SELECT * FROM shops LIMIT 2");

    // rowsには結果が入っています
    console.log("接続成功:", rows);
    console.log("接続成功:", fields);
    res.send("こんにちは");
  } catch (error) {
    console.error("接続エラー:", error);
    res.status(500).send("データベースへの接続エラー");
  }
});

module.exports = router;
