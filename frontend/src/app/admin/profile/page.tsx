// app/admin/profile/page.tsx
"use client";

import { useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "@/libs/firebase";
import { notFound } from "next/navigation";

export default function AdminProfilePage() {
  const [checked, setChecked] = useState(false);
  const [bio, setBio] = useState(""); // 自己紹介
  const [image, setImage] = useState<File | null>(null); // プロフィール画像

  // 管理者チェック
  useState(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) return notFound();
    user.getIdTokenResult().then((result) => {
      if (result.claims.admin !== true) notFound();
      else setChecked(true);
    });
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bio", bio);
    if (image) formData.append("image", image);

    const idToken = await getAuth(app).currentUser?.getIdToken();

    const res = await fetch("http://localhost:3001/api/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      alert("保存に失敗しました");
    } else {
      alert("保存完了！");
    }
  };

  if (!checked) return null;

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">プロフィール編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 自己紹介 */}
        <div>
          <label className="block font-semibold mb-1">自己紹介</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* プロフィール画像 */}
        <div>
          <label className="block font-semibold mb-1">プロフィール画像</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          保存
        </button>
      </form>
    </main>
  );
}
