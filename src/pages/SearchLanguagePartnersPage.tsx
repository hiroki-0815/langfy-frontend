import { useState } from "react";
import LanguageFilterSidebar from "@/components/LanguageFilterSidebar";
import Fliters from "@/components/Fliters";
import PaginationSelector from "@/components/PaginationSlector";
import { useSortUsers } from "@/api/AllUsersApi";
import { User } from "@/model/types";
import UserCard from "@/components/UserCard";

const SearchLanguagePartnersPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { results, isLoading } = useSortUsers(page, pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-[100px] px-4">
      <aside className="col-span-1 bg-lime-200">
        <h2 className="text-lg font-bold mb-4">Filter By Learning Language</h2>
        <LanguageFilterSidebar />
      </aside>
      <main>
        <div className="mb-6 bg-emerald-400">
          <Fliters />
        </div>
        {isLoading ? (
          <div className="text-center text-blue-400">Loading users...</div>
        ) : results?.data?.length ? (
          <div>
            <div className="grid grid-cols-1 gap-6">
              {results.data.map((user: User) => (
                <UserCard
                  name={user.name}
                  gender={user.gender}
                  age={user.age}
                  nativeLanguage={user.nativeLanguage}
                  countryOrigin={user.originCountry}
                  selfIntroduction={user.selfIntroduction}
                  imageUrl={user.imageUrl}
                  motivation={user.motivation}
                  country={user.country}
                  learningLanguage={user.learningLanguage}
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
        ) : (
          <div className="text-center text-gray-600">No users found.</div>
        )}
      </main>
    </div>
  );
};

export default SearchLanguagePartnersPage;
