import { useAuth0, User } from "@auth0/auth0-react";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSortUsers = (
  page: number = 1,
  pageSize: number = 10,
  filters: Record<string, string | number | undefined> = {}
) => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchSortedUsers = async (): Promise<{
    data: User[];
    pagination: { total: number; page: number; limit: number; pages: number };
  }> => {
    const accessToken = await getAccessTokenSilently();

    const queryParams = new URLSearchParams();

    queryParams.set("page", page.toString());
    queryParams.set("limit", pageSize.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        queryParams.set(key, value.toString());
      }
    });

    const response = await fetch(
      `${API_BASE_URL}/api/users?${queryParams.toString()}`,
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

  const {
    data: results,
    isLoading,
    error,
  } = useQuery(["sortUsers", page, pageSize, filters], fetchSortedUsers, {
    keepPreviousData: true,
    retry: 1,
  });

  return { results, isLoading, error };
};
