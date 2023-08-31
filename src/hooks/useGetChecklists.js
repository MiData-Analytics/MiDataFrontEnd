import axios from "axios";
import { useState, useEffect } from "react";
import { useCookie } from "./useCookie";
import { urls } from "@/utils/urls";

export function useGetChecklists() {
  const [checklists, setChecklists] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const { token } = useCookie();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urls.getChecklists, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setChecklists(response.data);
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
    checklists,
    isLoading,
    isError,
  };
}

export function useGetQuestions(id){
  const [questions,setQuestions] = useState([{}])
  const [isLoading,setIsLoading] = useState(true);
  const [isError,setError] = useState(false);

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urls.getAllQuestions}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuestions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions data", error);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  },[])

  return {
    questions,
    isLoading,
    isError
  }
}

export function useGetChecklist(id) {
  const [checklist, setChecklist] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const { token } = useCookie();
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urls.getChecklistById}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.updatedAt !== lastUpdatedAt) {
          setChecklist(response.data);
          setIsLoading(false);
          setLastUpdatedAt(response.data.updatedAt);

          // Cache the checklist and lastUpdatedAt in local storage
          localStorage.setItem(
            `checklist-${response.data.id}`,
            JSON.stringify(response.data)
          );
          localStorage.setItem(
            `checklist-${response.data.id}-lastUpdatedAt`,
            response.data.updatedAt
          );
        } else {
          // If updatedAt hasn't changed, use cached data
          const cachedChecklist = localStorage.getItem(
            `checklist-${id}`
          );
          setChecklist(JSON.parse(cachedChecklist));
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching checklist data", error);
        setError(true);
        setIsLoading(false);
      }
    };

    const cachedLastUpdatedAt = localStorage.getItem(
      `checklist-${id}-lastUpdatedAt`
    );

    if (cachedLastUpdatedAt) {
      setLastUpdatedAt(cachedLastUpdatedAt);
    }

    if (!lastUpdatedAt) {
      fetchData();
    }
  }, []);


  return {
    checklist,
    isLoading,
    isError,
  };
}
