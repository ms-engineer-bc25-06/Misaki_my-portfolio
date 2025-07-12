// backend/src/app.ts
import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter";
import adminProfileRouter from "./routers/adminProfileRouter";

const app = express();
// フロントエンドの http://localhost:3000 を許可
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Cookie や Authorization ヘッダーの送信を許可
  })
);
app.use("/uploads", express.static("uploads")); // ← 画像アクセス用

app.use(express.json()); // JSON専用API向けのjsonパーサーは先に置く

app.use("/api/auth", authRouter); // ← ここで /me が /api/auth/me にマウントされる

app.use("/api/profile", adminProfileRouter); // multer使うアップロードAPIは最後に置く

export default app;
