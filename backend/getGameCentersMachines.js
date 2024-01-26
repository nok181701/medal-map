//そもそもメダルゲームの店舗数少ないから不要かも
const axios = require("axios");
const cheerio = require("cheerio");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const path = require("path");

const urls = [
  "https:bandainamco-am.co.jp/game_center/loc/akishima/?p=game_info&pp=G03",
];

const desktopPath = path.join(require("os").homedir(), "Documents");

// 非同期関数を定義
async function scrapeAndWrite(url) {
  try {
    // 各URLに対してスクレイピングを実行
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    // console.log(response.data);

    // データが非同期で読み込まれている場合、適切な待機メカニズムを導入する
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1秒待機

    // dd要素のテキストを取得
    const ddElements = $(".matchList dd");
    if (ddElements.length === 0) {
      throw new Error("dd要素が見つかりませんでした");
    }

    const gameTitles = ddElements
      .map((index, element) => $(element).text().trim())
      .get();
    console.log("ゲームのタイトル:", gameTitles);

    // CSVに書き込むデータを作成
    const data = gameTitles.map((title) => ({ title }));

    // CSVファイルに書き込む
    const csvWriter = createCsvWriter({
      path: path.join(
        desktopPath,
        `scraped_data_${url.match(/[^/]+$/)[0]}.csv`
      ), // ファイル名にURLの一部を使用
      header: [
        { id: "title", title: "Title" },
        // 他にも必要なフィールドがあればここに追加
      ],
    });

    await csvWriter.writeRecords(data);
    console.log(`CSVにデータが書き込まれました (${url})`);
  } catch (error) {
    console.error(`スクレイピングエラー (${url}):`, error.message);
  }
}

// 各URLに対して非同期でスクレイピングを実行
const scrapingPromises = urls.map(scrapeAndWrite);

// すべてのスクレイピングが完了するのを待つ
Promise.all(scrapingPromises)
  .then(() => console.log("すべてのスクレイピングが完了しました"))
  .catch((allError) => console.error("スクレイピングエラー (全体):", allError));
