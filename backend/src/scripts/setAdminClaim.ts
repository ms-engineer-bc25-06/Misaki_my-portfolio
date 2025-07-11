// backend/scripts/setAdminClaim.ts
import { adminAuth } from "../libs/firebaseAdmin";

// 管理者にしたいユーザーのUIDを指定
const uid = "CasgF9IfZkWLTwfBXsjcoRcM7d63";

async function setAdminClaim() {
  try {
    await adminAuth.setCustomUserClaims(uid, { admin: true });
    console.log(`UID ${uid} に admin: true を設定しました`);
  } catch (error) {
    console.error("カスタムクレームの設定に失敗:", error);
  }
}

setAdminClaim();
