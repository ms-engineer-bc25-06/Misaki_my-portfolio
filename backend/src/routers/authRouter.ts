// backend/src/routers/authRouter.ts（基本情報取得）
import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken";
import { RequestWithUser } from "../types/express"; // 追加

const router = express.Router();

// このルートが `/api/auth/me` の実体です
router.get("/me", verifyFirebaseToken, (req: RequestWithUser, res) => {
  if (!req.user) {
    res.status(401).json({ message: "ユーザー情報が見つかりません" });
    return;
  }

  const { uid, email, name } = req.user;

  res.json({ uid, email, name });
});

export default router;
