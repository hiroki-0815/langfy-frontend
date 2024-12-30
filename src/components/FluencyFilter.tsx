import { FLUENCY_LEVELS } from "@/model/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  onChange: (fluencyLevel: string) => void;
};

const FluencyFilter = ({ onChange }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full text-left rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          Fluency
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
          <DropdownMenuItem onClick={() => onChange("")}>All</DropdownMenuItem>
          {FLUENCY_LEVELS.map((level) => (
            <DropdownMenuItem key={level} onClick={() => onChange(level)}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FluencyFilter;
