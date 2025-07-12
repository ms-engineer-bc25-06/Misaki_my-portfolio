// 変更後: app.tsで設定したExpressインスタンスを読み込んで起動する

import app from "./app";

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
