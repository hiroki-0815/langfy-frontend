import { useState } from "react";
import UserCard from "@/components/UserCard";
import { useSortUsers } from "@/api/AllUsersApi";
import PaginationSelector from "./PaginationSlector";

const UserList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { results, isLoading } = useSortUsers(page, pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) {
    return <div className="text-center text-blue-400">Loading users...</div>;
  }

  if (!results?.data?.length) {
    return <div className="text-center text-gray-600">No users found.</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mt-6 grid grid-cols-1 gap-4">
        {results.data.map((user: any) => (
          <UserCard
            key={user._id}
            name={user.name}
            age={user.age}
            nativeLanguage={user.nativeLanguage}
            nationality={user.nationality}
            country={user.country}
            selfIntroduction={user.selfIntroduction}
            imageUrl={user.imageUrl}
            onStartChat={() => alert(`Chat with ${user.name}`)}
          />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UserList;
