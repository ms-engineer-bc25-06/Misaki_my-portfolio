import { Response, NextFunction } from "express";
import { adminAuth } from "../libs/firebaseAdmin";
import { RequestWithUser } from "../types/express"; // 型インポート

export const verifyFirebaseToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid token" });
    return;
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    req.user = decodedToken; // user に decodedTokenを丸ごとセット
    req.uid = decodedToken.uid; // uidも必要ならセット

    next();
  } catch {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};
