import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { urls } from "@/utils/urls";
import { useRouter } from "next/router";

export const UserContext = createContext({
  userData: {},
  isLoading: true,
  isError: false,
});

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [cookies] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token);

  const router = useRouter();
  const { route } = router;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (route.includes("dashboard") && token) {
        try {
          const response = await axios.get(urls.getUser, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching user data", error);
          setError(true);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading,
        isError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
