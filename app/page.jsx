"use client"

import { useEffect, useState } from "react";
import { isAuth, logout } from "./lib/actions/auth-actions";

export default function Home() {
  const [auth, setAuth] = useState(false);
  const handleLogout = async () => {
    try {
      const deleteToken = await logout()
    } catch (error) {
      console.log("Vous n'êtes pas connecté");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const res = await isAuth()
      setAuth(res)
    }
    checkAuth()
  }, [])

  return (
    <div>
      {auth && <button onClick={handleLogout}>Se déconnecter</button>}
    </div>
  );
}
