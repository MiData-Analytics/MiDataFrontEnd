import axios from "axios";
import { useState, useEffect } from "react";
import { useCookie } from "./useCookie";
import { urls } from "@/utils/urls";

export function useGetMonitors() {
  const [monitors, setMonitors] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const { token } = useCookie();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urls.getMonitorList, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMonitors(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    monitors,
    isLoading,
    isError,
  };
}
