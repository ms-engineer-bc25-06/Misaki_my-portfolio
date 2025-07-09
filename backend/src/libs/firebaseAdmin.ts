// backend/src/libs/firebaseAdmin.ts
import * as admin from "firebase-admin";
import path from "path";
import { readFileSync } from "fs";

// 絶対パスで serviceAccountKey.json を読み込む
const serviceAccountPath = path.resolve(
  __dirname,
  "../../serviceAccountKey.json"
);
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth();
