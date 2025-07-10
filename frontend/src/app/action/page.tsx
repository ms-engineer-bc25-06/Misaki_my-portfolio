"use client";

import { useEffect, useState } from "react";
import { getAuth, applyActionCode } from "firebase/auth";
import { app } from "@/libs/firebase";
import { useSearchParams } from "next/navigation";

export default function AuthActionPage() {
  const [message, setMessage] = useState("処理中...");
  const searchParams = useSearchParams();

  useEffect(() => {
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    if (mode === "verifyEmail" && oobCode) {
      const auth = getAuth(app);
      applyActionCode(auth, oobCode)
        .then(() => {
          setMessage("メールアドレスが確認されました！");
        })
        .catch(() => {
          setMessage("リンクの処理に失敗しました。");
        });
    } else {
      setMessage("不正なリンクです。");
    }
  }, [searchParams]);

  return (
    <main className="max-w-md mx-auto py-10 px-4 text-center">
      <h1 className="text-2xl font-bold mb-6">メール確認</h1>
      <p>{message}</p>
    </main>
  );
}
