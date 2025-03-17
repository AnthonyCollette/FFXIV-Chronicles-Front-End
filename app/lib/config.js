const isServer = true;
// const isServer = typeof window === "undefined";

const baseUrl = isServer
  ? process.env.NEXT_PUBLIC_API_URL
  : window.location.origin;

export default baseUrl;