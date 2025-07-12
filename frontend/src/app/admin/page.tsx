"use client"; //管理者のみ

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "@/libs/firebase"; // 既存のfirebase初期化モジュール
import { notFound } from "next/navigation";
import Link from "next/link";

// 例：プロフィール編集へのリンク
<Link href="/admin/profile">
  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    編集ページへ
  </button>
</Link>;

export default function AdminPage() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      console.log("未ログイン → notFound()");
      notFound(); // ログインしてない人は 404
      return;
    }

    user.getIdTokenResult().then((idTokenResult) => {
      const isAdmin = idTokenResult.claims.admin === true;
      console.log(" クレーム:", idTokenResult.claims);
      if (!isAdmin) {
        console.log("管理者ではありません → notFound()");
        notFound(); // 管理者じゃない人も 404
      } else {
        setChecked(true); // 管理者 OK
        //  idToken 出力（curl用など）
        user.getIdToken().then((token) => {
          console.log(" idToken:", token);
        });
      }
    });
  }, []);

  if (!checked) return null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">管理者専用ページ</h1>

      {/* セクション：プロフィール */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2 border-b pb-1">
          プロフィール編集
        </h2>
        <p className="text-gray-600 mb-2">
          自己紹介、アイコン画像などを編集できます。
        </p>
        <Link href="/admin/profile"></Link>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          編集ページへ
        </button>
      </section>

      {/* セクション：実績 */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2 border-b pb-1">実績管理</h2>
        <p className="text-gray-600 mb-2">
          実績の一覧、追加、編集、削除ができます。
        </p>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          実績管理ページへ
        </button>
      </section>

      {/* セクション：スキル */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-2 border-b pb-1">スキル管理</h2>
        <p className="text-gray-600 mb-2">
          スキルの一覧、追加、編集ができます。
        </p>
        <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
          スキル管理ページへ
        </button>
      </section>

      <p>ここには管理者だけが見られる情報が表示されます。</p>
    </main>
  );
}
