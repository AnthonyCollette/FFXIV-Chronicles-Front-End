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
    credentials: "include"
  });

  if (!response.ok) {
    console.log(response);
    console.error("Erreur lors de la requête :", response.status);
    return { error: "Erreur lors de la requête" };
  }
  const data = await response.json();

  cookies().set("token", data.token, {
    httpOnly: true,
  })
  console.log(cookies().get("token"))

  console.log(data)
//   cookies.set("token", data.token)
//   console.log(cookies.get("token"))

  
}

export async function checkAuth() {
  const response = await fetch(`${baseUrl}/api/check-auth`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    console.error("Erreur lors de la requête :", response.status);
    return { error: "Erreur lors de la requête" };
  }

  const data = await response.json();

  return data;
}
