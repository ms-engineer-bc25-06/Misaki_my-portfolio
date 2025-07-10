// backend/src/routers/adminProfileRouter.ts
import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken";
import { isAdmin } from "../middleware/isAdmin";

const router = Router();

// アップロード先とファイル名を設定
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

// プロフィール保存（画像＋自己紹介）POST /api/profile
router.post(
  "/profile",
  verifyFirebaseToken,
  isAdmin,
  upload.single("image"),
  async (req: Request, res: Response) => {
    const { bio } = req.body;
    const image = req.file?.filename;

    if (!bio || !image) {
      res.status(400).json({ message: "bio または image が不足しています。" });
      return;
    }
    const profileData = {
      bio,
      imagePath: `/uploads/${image}`,
    };

    const outputPath = path.resolve(__dirname, "../../data/profile.json");
    fs.writeFileSync(outputPath, JSON.stringify(profileData, null, 2), "utf8");

    res
      .status(200)
      .json({ message: "プロフィールを保存しました", profile: profileData });
    return;
  }
);
// プロフィール取得 GET /api/profile
router.get("/profile", (req: Request, res: Response) => {
  const profilePath = path.resolve(__dirname, "../../data/profile.json");

  if (!fs.existsSync(profilePath)) {
    res.status(404).json({ message: "プロフィールが未登録です" });
    return;
  }

  const data = fs.readFileSync(profilePath, "utf-8");
  const profile = JSON.parse(data);
  res.json(profile);
});

export default router;
