// useRoom.ts
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useRoom = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoom = async (roomId: string) => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/room/${roomId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setResults(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchRoom, results, isLoading, error };
};
