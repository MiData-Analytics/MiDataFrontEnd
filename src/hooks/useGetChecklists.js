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
  const { token } = useCookie();

  const [checklist, setChecklist] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urls.getChecklistById}${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setChecklist(response.data);
          setIsLoading(false);

          // Cache the checklist and updatedAt in local storage
          localStorage.setItem(
            `checklist-${id}`,
            JSON.stringify(response.data)
          );
          localStorage.setItem(
            `checklist-${id}-updatedAt`,
            response.data.updatedAt
          );
        }
      } catch (error) {
        console.error("Error fetching checklist data", error);
        setError(true);
        setIsLoading(false);
      }
    };

    const cachedChecklist = localStorage.getItem(`checklist-${id}`);
    const cachedUpdatedAt = localStorage.getItem(`checklist-${id}-updatedAt`);

    if (cachedChecklist && cachedUpdatedAt) {
      setChecklist(JSON.parse(cachedChecklist));
      setIsLoading(false);

      fetchData(); // Fetch in the background to update the cache
    } else {
      fetchData();
    }
  }, [id, token]);

  return {
    checklist,
    isLoading,
    isError,
  };
}