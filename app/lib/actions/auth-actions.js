"use server";

import { cookies } from "next/headers";
import baseUrl from "../config";

export async function login(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    console.log(response);
    console.error("Erreur lors de la requête :", response.status);
    return { error: "Erreur lors de la requête" };
  }
  const data = await response.json();
  const cookiesStore = await cookies();
  cookiesStore.set("token", data.token);
}

export async function logout() {
  try {
    const cookiesStore = await cookies();
    return cookiesStore.delete("token");
  } catch (error) {
    return console.log("Vous n'êtes pas connecté");
  }
}

export async function isAuth() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token");

    if (!token) {
      return false;
    }
    return true
  } catch (error) {
    return false
  }
}