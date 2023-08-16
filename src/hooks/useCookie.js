import { useState } from "react";
import { useCookies } from "react-cookie";

export function useCookie() {
  const [cookies] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token);
  return token;
}
