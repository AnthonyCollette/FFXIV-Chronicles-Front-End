// src/context/UserProvider.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { deleteToken, getUser } from "../lib/actions/auth-actions";

const UserContext = createContext(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUser doit être utilisé à l'intérieur d'un UserProvider"
    );
  }
  return context;
}

export function UserProvider({ children, initialData = null }) {
  const [user, setUser] = useState(initialData);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      fetchUserData();
    }
  }, [initialData]);

  async function fetchUserData() {
    try {
      setLoading(true);
      const response = await getUser();
      if (!response)
        throw new Error(
          "Erreur lors de la récupération des données utilisateur"
        );
      setUser({
        id: response.id,
        username: response.username,
        email: response.email,
      });
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const refreshUser = () => fetchUserData();

  const logout = () => {
    setUser(null);
    deleteToken();
  };

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
