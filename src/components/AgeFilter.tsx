import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  ageMin: number | undefined;
  ageMax: number | undefined;
  onChange: (
    filterName: "ageMin" | "ageMax",
    value: number | undefined
  ) => void;
};

const AgeFilter = ({ ageMin, ageMax, onChange }: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className=" w-full text-left rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          Age
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="px-4 py-2">
            <label className="block text-sm font-medium text-gray-700">
              Minimum Age
            </label>
            <input
              type="number"
              value={ageMin || ""}
              onChange={(e) =>
                onChange(
                  "ageMin",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              className="block w-full mt-1 p-2 border rounded"
              placeholder="Min Age"
            />
          </div>
          <div className="px-4 py-2">
            <label className="block text-sm font-medium text-gray-700">
              Maximum Age
            </label>
            <input
              type="number"
              value={ageMax || ""}
              onChange={(e) =>
                onChange(
                  "ageMax",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              className="block w-full mt-1 p-2 border rounded"
              placeholder="Max Age"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AgeFilter;
