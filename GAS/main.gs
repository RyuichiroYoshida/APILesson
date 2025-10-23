// ユーザー情報の初期オブジェクト
const user = {
	id: 0,
	name: "",
	score: 0,
};

// スクリプトプロパティからスプレッドシートIDを取得
const id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
// スプレッドシートのシート名
const sheetName = "Sheet1";

// GETリクエストを受け取ったときに呼ばれる関数
function doGet(e) {
	// スプレッドシートの全データをJSONで返す
	return getRecordsAsJson();
}

// POSTリクエストを受け取ったときに呼ばれる関数
function doPost(e) {
	// POSTで渡されたJSONをスプレッドシートに書き込む
	const sheet = SpreadsheetApp.openById(id).getSheetByName(sheetName);
	let data;
	try {
		// 受け取ったデータをJSONとしてパース
		data = JSON.parse(e.postData.contents);
	} catch (err) {
		// JSONが不正な場合はエラーを返す
		return ContentService.createTextOutput(JSON.stringify({ error: "Invalid JSON" })).setMimeType(ContentService.MimeType.JSON);
	}

	// ヘッダー取得
	const headers = sheet.getDataRange().getValues()[0];

	// dataが配列でなければ配列化
	if (!Array.isArray(data)) {
		data = [data];
	}

	// 各行を書き込み（ヘッダー順に値を並べる）
	data.forEach(function (rowObj) {
		// ヘッダー順に値を配列化
		const row = headers.map(function (key) {
			return rowObj[key];
		});
		sheet.appendRow(row);
	});
	// 書き込み後の全データを返す
	return getRecordsAsJson();
}

// スプレッドシートの全レコードをJSON形式で返す関数
function getRecordsAsJson() {
	// スプレッドシートから全レコードを取得
	function getRecords() {
		const sheet = SpreadsheetApp.openById(id).getSheetByName(sheetName);
		const rows = sheet.getDataRange().getValues();
		// 1行目をキー（ヘッダー）として取得
		const keys = rows.splice(0, 1)[0];

		// 各行をオブジェクトに変換
		return rows.map(function (row) {
			var obj = {};
			row.map(function (item, index) {
				obj[keys[index]] = item;
			});
			return obj;
		});
	}
	let records = getRecords();
	// 取得したレコードをログ出力
	console.log(records);
	// JSON形式で返却
	return ContentService.createTextOutput('{"records":' + JSON.stringify(records, null, 2) + "}").setMimeType(ContentService.MimeType.JSON);
}
