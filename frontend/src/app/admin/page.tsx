"use client"; //管理者のみ

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "@/libs/firebase";
import { notFound } from "next/navigation";

export default function AdminPage() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
      notFound(); // ログインしてない人は 404
      return;
    }

    user.getIdTokenResult().then((idTokenResult) => {
      const isAdmin = idTokenResult.claims.admin === true;
      if (!isAdmin) {
        notFound(); // 管理者じゃない人も 404
      } else {
        setChecked(true); // 管理者 OK
      }
    });
  }, []);

  if (!checked) return null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">管理者専用ページ</h1>
      <p>ここには管理者だけが見られる情報が表示されます。</p>
    </main>
  );
}
