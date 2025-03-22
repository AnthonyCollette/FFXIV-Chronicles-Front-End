"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import baseUrl from "../config";

export async function login(formData) {
  try {
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
    return { success: true, data: data };
  } catch (error) {
    return { error: error.message };
  }
}

export async function deleteToken() {
  try {
    const cookiesStore = await cookies();
    return cookiesStore.delete("token");
  } catch (error) {
    return console.log("Vous n'êtes pas connecté");
  }
}

export const getUser = async () => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token");

    if (!token) {
      return null;
    }

    const { userId } = jwt.verify(token.value, process.env.JWT_SECRET);

    const response = await fetch(`${baseUrl}/api/users/${userId}`);
    if (!response.ok) {
      return console.log("Cet utilisateur n'existe pas");
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
