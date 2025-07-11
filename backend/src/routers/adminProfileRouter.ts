import { Router, Response, Request } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken";
import { isAdmin } from "../middleware/isAdmin";
import prisma from "../libs/prismaClient";

// Requestの型拡張（認証済みUIDを保持）
interface AuthenticatedRequest extends Request {
  uid?: string; // verifyFirebaseTokenでセットされる想定
}

const router = Router();

// multer設定: 画像をuploadsフォルダに保存
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, "../../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile${ext}`);
  },
});
const upload = multer({ storage });

// POST /api/profile プロフィール作成・更新（画像＋bio）
router.post(
  "/profile",
  verifyFirebaseToken,
  isAdmin,
  upload.single("image"),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { bio } = req.body;
      const image = req.file?.filename;
      const uid = req.uid;

      if (!bio || !image || !uid) {
        res.status(400).json({
          message: "bio、image、またはユーザー情報が不足しています。",
        });
        return;
      }

      const user = await prisma.user.findUnique({ where: { uid } });
      if (!user) {
        res.status(404).json({ message: "ユーザーが見つかりません。" });
        return;
      }

      const existingProfile = await prisma.profile.findUnique({
        where: { userId: user.id },
      });

      if (existingProfile) {
        const updated = await prisma.profile.update({
          where: { userId: user.id },
          data: {
            bio,
            imageUrl: `/uploads/${image}`,
          },
        });
        res.json({
          message: "プロフィールを更新しました",
          profile: updated,
        });
      } else {
        const created = await prisma.profile.create({
          data: {
            bio,
            imageUrl: `/uploads/${image}`,
            userId: user.id,
          },
        });
        res.json({
          message: "プロフィールを作成しました",
          profile: created,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "サーバーエラー" });
    }
  }
);

// GET /api/profile プロフィール取得
router.get(
  "/profile",
  verifyFirebaseToken,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const uid = req.uid;
      if (!uid) {
        res.status(401).json({ message: "認証されていません" });
        return;
      }

      const user = await prisma.user.findUnique({ where: { uid } });
      if (!user) {
        res.status(404).json({ message: "ユーザーが見つかりません" });
        return;
      }

      const profile = await prisma.profile.findUnique({
        where: { userId: user.id },
      });

      if (!profile) {
        res.status(404).json({ message: "プロフィールが未登録です" });
        return;
      }

      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "サーバーエラー" });
    }
  }
);

export default router;
