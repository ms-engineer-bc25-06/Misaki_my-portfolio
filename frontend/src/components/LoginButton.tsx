// frontend/src/components/LoginButton.tsx
"use client";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../libs/firebase";

export function LoginButton() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("ログイン成功:", user);
  };

  const handleLogout = async () => {
    await signOut(auth);
    console.log("ログアウトしました");
  };

  return (
    <>
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handleLogout}>ログアウト</button>
    </>
  );
}
