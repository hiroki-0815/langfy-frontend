import { User } from "@/model/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSortUsers = (page: number = 1, pageSize: number = 10) => {
  const { getAccessTokenSilently } = useAuth0();

  const createSortUsers = async (): Promise<{
    data: User[];
    pagination: { page: number; pages: number };
  }> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${API_BASE_URL}/api/users?page=${page}&limit=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get users");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["sortUsers", page, pageSize],
    createSortUsers,
    {
      keepPreviousData: true,
      retry: 1,
    }
  );

  return { results, isLoading };
};
