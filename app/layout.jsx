import localFont from "next/font/local";
import "./assets/styles/style.css";
import { UserProvider } from "./context/UserProvider";

const roboto = localFont({
  src: "./fonts/Roboto/Roboto-Regular.ttf",
  variable: "--font-roboto",
  weight: "500",
});
const robotoLight = localFont({
  src: "./fonts/Roboto/Roboto-Light.ttf",
  variable: "--font-roboto-light",
  weight: "500",
});
const robotoBold = localFont({
  src: "./fonts/Roboto/Roboto-Bold.ttf",
  variable: "--font-roboto-bold",
  weight: "500",
});
const jupiter = localFont({
  src: "./fonts/Jupiter/Jupiter Pro.otf",
  variable: "--font-jupiter",
  weight: "500",
});
const jupiterBold = localFont({
  src: "./fonts/Jupiter/Jupiter Pro Bold.otf",
  variable: "--font-jupiter-bold",
  weight: "500",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={
        roboto.variable +
        " " +
        robotoLight.variable +
        " " +
        robotoBold.variable +
        " " +
        jupiter.variable +
        " " +
        jupiterBold.variable
      }
      suppressHydrationWarning
    >
      <body
        className="font-[family-name:var(--font-roboto)] text-black text-md bg-black"
        suppressHydrationWarning
      >
        <UserProvider>
          <div className="container">{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
