// app/admin/profile/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/libs/firebase";
import { notFound } from "next/navigation";

export default function AdminProfilePage() {
  const [checked, setChecked] = useState(false);
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("管理者チェック開始");
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("ユーザー未ログインなので notFound() 呼ぶ");
        notFound();
        return;
      }
      user.getIdTokenResult().then((result) => {
        console.log("claims:", result.claims);
        if (result.claims.isAdmin !== true) {
          console.log("admin権限なし");
          notFound();
          return;
        }
        console.log("admin権限あり");
        setChecked(true);
      });
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit 呼ばれた");

    console.log("bio:", bio);
    console.log("image:", image);

    const formData = new FormData();
    formData.append("bio", bio);
    if (image) formData.append("image", image);

    const idToken = await getAuth(app).currentUser?.getIdToken();

    const res = await fetch("http://localhost:3001/api/profile/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        // ※ Content-Type は指定しない！（FormDataが自動で設定）
      },
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      alert("保存に失敗しました: " + errorData.message);
    } else {
      alert("保存完了！");
      setBio("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!checked) return null;

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">プロフィール編集</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">自己紹介</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">プロフィール画像</label>
          <input
            name="image"
            ref={fileInputRef}
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
