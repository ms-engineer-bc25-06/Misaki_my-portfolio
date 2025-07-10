// backend/src/app.ts
import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter";
import adminRouter from "./routers/adminRouter";

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

export default app;
