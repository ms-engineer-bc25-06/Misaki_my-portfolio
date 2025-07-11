// app/verify/page.tsx　Firebaseユーザーのメール認証状況の確認・再送処理を行う画面
"use client";

import { useEffect, useState } from "react";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { app } from "@/libs/firebase";

export default function VerifyEmailPage() {
  const [message, setMessage] = useState("");
  const [canSend, setCanSend] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      if (user.emailVerified) {
        setMessage("すでにメール認証が完了しています。");
      } else {
        setCanSend(true);
        setMessage("メールが届いていない場合は、下のボタンから再送できます。");
      }
    } else {
      setMessage("⚠️ ログインしていません。ログインしてください。");
    }
  }, []);

  const handleResend = async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      await sendEmailVerification(user, {
        url: "http://localhost:3000/auth/action", // メールリンクの遷移先
      });
      setMessage("確認メールを再送しました。メールをご確認ください。");
      setCanSend(false);
    }
  };

  return (
    <main className="max-w-md mx-auto py-10 px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">メール確認</h1>
      <p className="mb-6">{message}</p>
      {canSend && (
        <button
          onClick={handleResend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          確認メールを再送する
        </button>
      )}
    </main>
  );
}
