#プロジェクト概要

ポートフォリオサイトです。

```
my-portfolio/
├── frontend/                     # フロントエンド（Next.js + TypeScript）
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx         # トップページ
│   │   │   ├── login/page.tsx   # ログインページ
│   │   │   ├── signup/page.tsx  # サインアップ
│   │   │   ├── verify/page.tsx  # メール認証
│   │   │   ├── admin/           # 管理画面（認証必要）
│   │   │   │   ├── page.tsx
│   │   │   │   ├── profile/page.tsx
│   │   │   │   └── works/page.tsx
│   │   └── layout.tsx           # 共通レイアウト
│   ├── libs/
│   │   └── firebase.ts          # Firebase 初期化
│   ├── components/
│   │   └── LoginButton.tsx
│   └── public/                  # ローカル画像（FirebaseStorageに移行予定）

├── backend/                     # バックエンド（Express + TypeScript）
│   ├── src/
│   │   ├── index.ts             # エントリーポイント
│   │   ├── routers/
│   │   │   ├── authRouter.ts           # /api/auth/me など
│   │   │   ├── adminRouter.ts          # 管理用ルート
│   │   │   └── adminProfileRouter.ts   # プロフィール管理API
│   │   ├── middleware/
│   │   │   ├── verifyFirebaseToken.ts  # Firebaseトークン検証
│   │   │   └── isAdmin.ts              # 管理者チェック
│   │   ├── libs/
│   │   │   ├── firebaseAdmin.ts        # Firebase Admin SDK 初期化
│   │   │   └── prismaClient.ts         # Prisma 初期化
│   │   └── types/
│   │       └── express/index.d.ts      # Request拡張型定義
│   ├── scripts/
│   │   └── setAdminClaim.ts            # UIDにadminクレーム付与
│   └── prisma/
│       ├── schema.prisma               # Prismaモデル
│       └── migrations/                 # マイグレーション履歴

├── docker-compose.yml          # MySQL DB起動用コンテナ構成
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
