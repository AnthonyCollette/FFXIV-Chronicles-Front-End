"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const CheckAuth = async () => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token");

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

    // Passer l'ID comme data-attribute pour que le client puisse le récupérer
    return null
  } catch (error) {
    console.log("Vous n'êtes pas connecté");
    return null;
  }
};

export default CheckAuth;
