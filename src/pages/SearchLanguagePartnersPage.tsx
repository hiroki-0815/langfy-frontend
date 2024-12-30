import { useState } from "react";
import LanguageFilterSidebar from "@/components/LanguageFilterSidebar";
import Filters from "@/components/Filters";
import { useSortUsers } from "@/api/AllUsersApi";
import { User } from "@/model/types";
import UserCard from "@/components/UserCard";
import {
  Language,
  Gender,
  OriginCountry,
  FluencyLevel,
  Motivation,
} from "@/model/constants";
import PaginationSelector from "@/components/PaginationSlector";
import UserCardSkeleton from "@/skeletons/UserCardSkeleton";

const SearchLanguagePartnersPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const DEFAULT_FILTERS: {
    nativeLanguage: Language | "";
    gender: Gender | "";
    country: string | "";
    originCountry: OriginCountry | "";
    ageMin: number | undefined;
    ageMax: number | undefined;
    fluencyLevel: FluencyLevel | "";
    motivation: Motivation | "";
    learningLanguage: Language | "";
  } = {
    nativeLanguage: "",
    gender: "",
    country: "",
    originCountry: "",
    ageMin: undefined,
    ageMax: undefined,
    fluencyLevel: "",
    motivation: "",
    learningLanguage: "",
  };

  const [filters, setFilters] = useState<{
    nativeLanguage: Language | "";
    gender: Gender | "";
    country: string | "";
    originCountry: OriginCountry | "";
    ageMin: number | undefined;
    ageMax: number | undefined;
    fluencyLevel: FluencyLevel | "";
    motivation: Motivation | "";
    learningLanguage: Language | "";
  }>(DEFAULT_FILTERS);

  const { results, isLoading } = useSortUsers(page, pageSize, filters);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (filterName: keyof typeof filters, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 py-3 px-5 md:py-6 md:px-16 bg-slate-50">
      <aside className="col-span-1 px-4">
        <LanguageFilterSidebar
          selectedLanguage={filters.nativeLanguage}
          onLanguageChange={(language) =>
            handleFilterChange("nativeLanguage", language)
          }
        />
      </aside>
      <main>
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <Filters filters={filters} onFilterChange={handleFilterChange} />
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm bg-blue-400 text-white hover:bg-blue-500 transition rounded-md"
          >
            Reset Filters
          </button>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6">
            {[...Array(5)].map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </div>
        ) : results?.data?.length ? (
          <div>
            <div className="grid grid-cols-1 gap-6">
              {results.data
                ?.filter(
                  (user: User) =>
                    user.name &&
                    user.nativeLanguage &&
                    user.learningLanguage &&
                    user.motivation
                )
                .map((user: User) => (
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
