#プロジェクト概要

ポートフォリオサイトです。

```
📦 my-portfolio/
├── frontend/
│ ├── src/
│ └── public/
├── backend/
│ ├── prisma/
│ └── src/
└── README.md
```

## システム構成図

```
ユーザー
|
▼
ブラウザ（http://localhost:3000）
|　
▼
フロントエンド(Next.js,TypeScript)
| ❶ ログイン・サインアップ作業
▼
Firebase Authentication
| ❷ 認証処理（Google）
| ❸ ID トークン取得
▼
フロントエンド
| ❹ APIリクエスト時にIDトークンをAuthorizationヘッダー
▼
バックエンド(Express.js,TypeScript)(@http://localhost:3001)
| ❺ Firebase AdminSDK で ID トークン検証
| ❻ ユーザー情報取得・認可判定
| ❼ データー操作リクエスト
▼
Prisma ORM
| ❽ 生成・実行
▼
MySQL(データ保存)
```
