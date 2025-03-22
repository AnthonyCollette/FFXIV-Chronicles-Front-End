"use client";

import Image from "next/image";
import mailIcon from "../assets/images/envelope-solid.svg";
import cadenas from "../assets/images/cadenas.svg";
import chocobo from "../assets/images/chocobo-login.png";
import kweh from "../assets/images/kweh.png";
import { motion } from "framer-motion";
import { buttonStyles } from "../assets/styles/classes";
import { useEffect, useState } from "react";
import { login } from "../lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserProvider";

export default function Login() {
  const inputStyle =
    "border-2 border-yellow-2 rounded-xl bg-brown-2/50 pl-[50px] py-4 pr-[15px] text-white text-[18px] w-full leading-none";
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { user, loading, refreshUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const res = await login(formData);
    if (res.error) {
      console.log(res.error)
      return
    }
    refreshUser()
  };

  useEffect(() => {
    if (!loading && user) {
      router.push("/")
    }
  }, [loading])


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[640px] bg-black-2 py-[30px] px-[75px] border-2 border-yellow rounded-2xl relative">
        <motion.div
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="absolute bottom-[calc(100%+100px)] left-1/4"
        >
          <Image src={kweh} alt="Kweh" />
        </motion.div>
        <Image
          src={chocobo}
          alt="Chocobo salue l'utilisateur"
          className="absolute bottom-[calc(100%+2px)] left-1/2 translate-x-[-50%]"
        />
        <h1 className="uppercase text-yellow font-[family-name:var(--font-jupiter)] text-[30px] text-center mb-[40px]">
          Connexion
        </h1>
        <form onSubmit={handleLogin}>
          <div className="relative mb-[15px]">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className={inputStyle}
              onChange={(e) => setMail(e.target.value)}
            />
            <Image
              src={mailIcon}
              alt="Icône d'enveloppe"
              className="absolute top-[50%] left-[15px] translate-y-[-50%]"
              height={24}
            />
          </div>
          <div className="relative mb-[15px]">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              required
              className={inputStyle}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Image
              src={cadenas}
              alt="Icône de cadenas"
              className="absolute top-[50%] left-[5px] translate-y-[-50%]"
              height={24}
            />
          </div>
          <div className="flex justify-between items-center">
            <button className="text-yellow-2 mr-0 ml-auto hover:text-yellow">
              Mot de passe oublié ?
            </button>
          </div>
          <button
            type="submit"
            className={buttonStyles.default + " mx-auto block mt-[30px]"}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
