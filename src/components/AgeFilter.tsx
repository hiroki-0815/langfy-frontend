import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslation } from "react-i18next";

type Props = {
  ageMin: number | undefined;
  ageMax: number | undefined;
  onChange: (
    filterName: "ageMin" | "ageMax",
    value: number | undefined
  ) => void;
};

const AgeFilter = ({ ageMin, ageMax, onChange }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full text-left rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          {t("ageLabel")}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="px-4 py-2">
            <label className="block text-sm font-medium text-gray-700">
              {t("ageMinLabel")}
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
              placeholder={t("ageMinPlaceholder")}
            />
          </div>
          <div className="px-4 py-2">
            <label className="block text-sm font-medium text-gray-700">
              {t("ageMaxLabel")}
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
              placeholder={t("ageMaxPlaceholder")}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AgeFilter;
