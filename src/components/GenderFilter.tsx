import { GENDERS } from "@/model/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslation } from "react-i18next";

type Props = {
  onChange: (gender: string) => void;
};

const GenderFilter = ({ onChange }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full text-left rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
          {t("genderLabel")} {/* ✅ Translated dropdown label */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
          <DropdownMenuItem onClick={() => onChange("")}>
            {t("all")}
          </DropdownMenuItem>
          {GENDERS.map((gender) => (
            <DropdownMenuItem key={gender} onClick={() => onChange(gender)}>
              {t(`genders.${gender}`)} {/* ✅ Translated gender options */}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default GenderFilter;
