import axios from "axios";
import { useState, useEffect } from "react";
import { useCookie } from "./useCookie";
import { urls } from "@/utils/urls";

export function useGetProfile() {
  const [userData, setUserData] = useState({});
  const { token } = useCookie();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(urls.getUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    };

    const cachedLastUpdatedAt = localStorage.getItem("lastUpdatedAt");
    if (cachedLastUpdatedAt) {
      setLastUpdatedAt(cachedLastUpdatedAt);
    }

    // Fetch data if lastUpdatedAt is not available or has changed
    if (!lastUpdatedAt) {
      fetchData();
    }
  }, []);

  return {
    userData,
    isLoading,
    isError,
  };
}
