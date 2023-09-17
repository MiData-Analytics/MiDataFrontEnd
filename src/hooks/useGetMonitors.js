import axios from "axios";
import { useState, useEffect } from "react";
import { useCookie } from "./useCookie";
import { urls } from "@/utils/urls";

export function useGetMonitors() {
  const [monitors, setMonitors] = useState();
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

export function useGetMonitor() {
  const [monitor, setMonitor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const { token } = useCookie();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urls.getMonitorProfile, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMonitor(response.data);
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
    monitor,
    isLoading,
    isError,
  };
}

export function useGetQuestions(id) {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(true);
  const { token } = useCookie();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urls.monitorGetQuestion}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuestions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  return {
    questions,
    isLoading,
    isError,
  };
}
