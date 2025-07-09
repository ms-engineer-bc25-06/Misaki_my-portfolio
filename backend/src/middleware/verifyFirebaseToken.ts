// backend/src/middleware/verifyFirebaseToken.ts
import { Request, Response, NextFunction } from "express";
import { adminAuth } from "../libs/firebaseAdmin";
import { DecodedIdToken } from "firebase-admin/auth"; // ← 追加（型）

//ミドルウェア関数定義 ルーティングの前に実行され、next()が呼ばれれば次の処理へ進む
export const verifyFirebaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //トークンの存在と形式チェックしなければエラー
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid token" });
    return;
  }
  //トークン取り出し
  const idToken = authHeader.split("Bearer ")[1];
  //Firebase Admin SDKでトークン検証
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    console.log("Authenticated user:", decodedToken.uid); //検証されたらログにユーザーのUIDを出す

    (req as { user?: DecodedIdToken }).user = decodedToken; // ユーザー情報をreqに追加

    next();
    //エラーハンドリング（トークンが無効な場合）
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};
