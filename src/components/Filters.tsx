import AgeFilter from "./AgeFilter";
import FluencyFilter from "./FluencyFilter";
import GenderFilter from "./GenderFilter";
import LearningLanguageFilter from "./LearningLanguageFilter";
import MotivationFilter from "./MotivationFilter";

type FilterType = {
  gender: string;
  learningLanguage: string;
  fluencyLevel: string;
  motivation: string;
  ageMin: number | undefined;
  ageMax: number | undefined;
};

type Props = {
  filters: FilterType;
  onFilterChange: (filterName: keyof FilterType, value: any) => void;
};

const Filters = ({ filters, onFilterChange }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
      <GenderFilter onChange={(value) => onFilterChange("gender", value)} />
      <LearningLanguageFilter
        onChange={(value) => onFilterChange("learningLanguage", value)}
      />
      <FluencyFilter
        onChange={(value) => onFilterChange("fluencyLevel", value)}
      />
      <MotivationFilter
        onChange={(value) => onFilterChange("motivation", value)}
      />
      <AgeFilter
        ageMin={filters.ageMin}
        ageMax={filters.ageMax}
        onChange={(filterName, value) => onFilterChange(filterName, value)}
      />
    </div>
  );
};

export default Filters;
