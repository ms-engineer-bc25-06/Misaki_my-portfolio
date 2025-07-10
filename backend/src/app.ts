// backend/src/app.ts
import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter";
import adminRouter from "./routers/adminRouter";
import adminProfileRouter from "./routers/adminProfileRouter";

const app = express();
// フロントエンドの http://localhost:3000 を許可
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Cookie や Authorization ヘッダーの送信を許可
  })
);

app.use(express.json());

app.use("/api/auth", authRouter); // ← ここで /me が /api/auth/me にマウントされる
app.use("/api/admin", adminRouter);
app.use("/api/admin", adminProfileRouter);
app.use("/uploads", express.static("uploads")); // ← 画像アクセス用

export default app;
