// backend/src/routers/adminRouter.ts（管理者用）
import { Router, Request, Response } from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken";
import { isAdmin } from "../middleware/isAdmin"; // ← ミドルウェア

const router = Router();

// 管理者だけがアクセスできる秘密のエンドポイント
router.get(
  "/secret",
  verifyFirebaseToken, // 認証チェック
  isAdmin, // 管理者チェック
  (req: Request, res: Response) => {
    res.json({ message: "管理者だけが見れるデータです " });
  }
);

export default router;
