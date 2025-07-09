// backend/src/routers/authRouter.ts
import express from "express";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken";
import { DecodedIdToken } from "firebase-admin/auth";

const router = express.Router();

// このルートが `/api/auth/me` の実体です
router.get("/me", verifyFirebaseToken, (req, res) => {
  const user = (req as { user?: DecodedIdToken }).user!; //!は絶対にあると言い切る
  res.json({ uid: user.uid, email: user.email, name: user.name });
});

export default router;
