// backend/src/routes/test.ts
import express from "express";
import { adminAuth } from "../libs/firebaseAdmin";

const router = express.Router();

router.get("/firebase-test", async (req, res) => {
  try {
    const apps = adminAuth.app.options.projectId || "no projectId";
    res.json({ message: "Firebase Admin initialized", projectId: apps });
  } catch (error) {
    res.status(500).json({ message: "Firebase Admin not initialized", error });
  }
});

export default router;
