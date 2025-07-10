// app/login/page.tsx
"use client";

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/libs/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ログイン成功 → 認証済みなら / へ、未認証なら /verify へ
      if (!userCredential.user.emailVerified) {
        setMessage("メールアドレスが未確認です。確認ページへ移動します。");
        router.push("/verify");
        return;
      }

      setMessage("ログイン成功！");
      setTimeout(() => {
        router.push("/");
      }, 1500);
      router.push("/"); // ログイン後にトップページへ遷移
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`ログインエラー: ${error.message}`);
      } else {
        setMessage("不明なエラーが発生しました");
      }
    }
  };

  return (
    <main className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">ログイン</h1>
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
          onClick={handleLogin}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          ログイン
        </button>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </div>
    </main>
  );
}
