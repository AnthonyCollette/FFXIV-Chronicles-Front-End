"use client";

import Link from "next/link";
import { useUser } from "./context/UserProvider";

export default function Home() {
  const { user, logout } = useUser();

  return (
    <div>
      {user && (
        <>
          <h1>Bonjour {user?.username}</h1>
          <p>
            Voici votre id : {user?.id} ainsi que votre adresse e-mail :{" "}
            {user?.email}
          </p>{" "}
          <button onClick={logout}>Se déconnecter</button>
        </>
      )}
      {!user && <Link href="/login">Se connecter</Link>}
    </div>
  );
}
