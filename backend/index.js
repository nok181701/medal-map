const express = require("express");
const cors = require("cors");
const path = require("path"); // path モジュールをインポート
const shopsRouter = require(path.join(__dirname, "routes", "shops")); // ファイルパスを安全に結合

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/shops", shopsRouter); // /places エンドポイントに placesRouter を使用
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`ポート${PORT}で受付中...`);
});
