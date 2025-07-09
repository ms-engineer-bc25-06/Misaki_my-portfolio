"use client";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "@/libs/firebase"; // あなたが作ったfirebase.tsの初期化ファイル
import Image from "next/image";

export default function Home() {
  const [apiResult, setApiResult] = useState<{
    uid: string;
    email: string;
    name?: string;
  } | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const currentUser = auth.currentUser;

    if (currentUser) {
      currentUser.getIdToken().then((idToken) => {
        // IDトークン付きでAPIリクエスト
        fetch("http://localhost:3001/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => setApiResult(data))
          .catch((err) => console.error("APIエラー:", err));
      });
    }
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* プロフィール */}
      <section className="text-center mb-12">
        <Image
          src="/easy-peasy_pZ6yYdmjyL.png" // public フォルダに配置したイラスト
          alt="プロフィールイラスト"
          width={120}
          height={120}
          className="mx-auto rounded-full"
        />
        <h1 className="text-3xl font-bold mt-4">MISAKI OKINO</h1>
        <p className="text-gray-600">フルスタックエンジニア </p>
      </section>

      {/* 実績 */}
      <section className="mb-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">実績</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800 inline-block text-left">
          <li>ポートフォリオサイトの開発（Next.js + Firebase）</li>
          <li>家計簿アプリ（React + Express + MySQL）</li>
        </ul>
      </section>

      {/* スキル */}
      <section className="mb-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">スキル</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS",
            "Firebase",
            "MySQL",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 問い合わせ */}
      <section className="text-center">
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          お問い合わせはこちら
        </a>
      </section>

      {/* APIのテスト結果（ログイン状態確認用） */}
      {apiResult && (
        <div className="mt-12 text-sm text-gray-500">
          <p>ログインユーザー情報：</p>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(apiResult, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
