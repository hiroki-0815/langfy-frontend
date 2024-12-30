import { LANGUAGES } from "@/model/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  onChange: (language: string) => void;
};

const LearningLanguageFilter = ({ onChange }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full text-left rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          Learning
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
          <DropdownMenuItem onClick={() => onChange("")}>All</DropdownMenuItem>
          {LANGUAGES.map((language) => (
            <DropdownMenuItem key={language} onClick={() => onChange(language)}>
              {language}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LearningLanguageFilter;
