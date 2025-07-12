// app/signup/page.tsx 新規登録ページ
"use client";

import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { app } from "@/libs/firebase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    const auth = getAuth(app);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // メール認証リンクを送信（ローカル用URLを指定）
      await sendEmailVerification(userCredential.user, {
        url: "http://localhost:3000/auth/action",
      });

      setMessage("確認メールを送信しました。メールを確認してください。");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`登録エラー: ${error.message}`);
      } else {
        setMessage("不明なエラーが発生しました");
      }
    }
  };

  return (
    <main className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">新規登録</h1>
      <div className="space-y-4">
        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          登録する
        </button>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </div>
    </main>
  );
}
