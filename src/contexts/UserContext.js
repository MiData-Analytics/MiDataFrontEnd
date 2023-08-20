import React, { createContext, useEffect, useState } from "react";
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
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [cookies] = useCookies(["token"]);
  const [token, setToken] = useState(cookies.token);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null); // Store last updatedAt timestamp

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

          // Check if updatedAt has changed before updating the userData and cache
          if (response.data.updatedAt !== lastUpdatedAt) {
            setUserData(response.data);
            setIsLoading(false);
            setLastUpdatedAt(response.data.updatedAt);

            // Cache the user data and lastUpdatedAt in local storage
            localStorage.setItem("userData", JSON.stringify(response.data));
            localStorage.setItem("lastUpdatedAt", response.data.updatedAt);
          } else {
            // If updatedAt hasn't changed, use cached data
            const cachedUserData = localStorage.getItem("userData");
            setUserData(JSON.parse(cachedUserData));
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data", error);
          setError(true);
          setIsLoading(false);
        }
      }
    };

    // Check if lastUpdatedAt is cached in local storage
    const cachedLastUpdatedAt = localStorage.getItem("lastUpdatedAt");
    if (cachedLastUpdatedAt) {
      setLastUpdatedAt(cachedLastUpdatedAt);
    }

    // Fetch data if lastUpdatedAt is not available or has changed
    if (!lastUpdatedAt || (route.includes("dashboard") && token)) {
      fetchData();
    }
  }, []); // Re-fetch when lastUpdatedAt changes

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
