// backend/src/middleware/isAdmin.ts（管理者か判断）
import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as { user?: DecodedIdToken }).user;

  if (user?.isAdmin) {
    next(); // 管理者 → 通過
  } else {
    res.status(403).json({ message: "管理者権限がありません" });
  }
};
